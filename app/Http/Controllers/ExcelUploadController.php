<?php

namespace App\Http\Controllers;

use App\Imports\VehiclesImport;
use App\Models\Vehicle;
use App\Models\Geocode;
use App\Services\GeocodingService;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExcelUploadController extends Controller
{
    protected $geocodingService;

    public function __construct(GeocodingService $geocodingService)
    {
        $this->geocodingService = $geocodingService;
    }

    public function create()
    {
        return Inertia::render('Vehicles/Upload');
    }

    public function store(Request $request)
    {
        $request->validate([
            'excel_file' => 'required|file|mimes:xlsx,xls,csv|max:2048',
        ]);

        try {
            Log::info('Excel dosyası yükleme işlemi başlatıldı.');

            // Excel dosyasını işle ve veritabanına kaydet
            Excel::import(new VehiclesImport, $request->file('excel_file'));

            Log::info('Excel dosyası başarıyla yüklendi ve veritabanına kaydedildi.');
            return redirect()->route('vehicles.index')->with('success', 'Excel data imported successfully.');
        } catch (\Exception $e) {
            Log::error('Excel dosyası yükleme işlemi sırasında hata oluştu.', ['error' => $e->getMessage()]);
            return back()->withErrors(['error' => 'Error importing Excel data: ' . $e->getMessage()]);
        }
    }

    public function processGeocoding()
    {
        Log::info('Geocoding işlemi başlatıldı.');

        $vehicles = Vehicle::all();

        foreach ($vehicles as $vehicle) {
            try {
                Log::info('Geocoding için adres alınıyor', ['vehicle_id' => $vehicle->id, 'start_address' => $vehicle->start_address, 'end_address' => $vehicle->end_address]);

                // Başlangıç ve bitiş adreslerini coğrafi koordinatlara dönüştür
                $startCoordinates = $this->geocodingService->getCoordinates($vehicle->start_address);
                $endCoordinates = $this->geocodingService->getCoordinates($vehicle->end_address);

                if ($startCoordinates && $endCoordinates) {
                    Log::info('Başlangıç ve bitiş koordinatları alındı', [
                        'vehicle_id' => $vehicle->id,
                        'start_latitude' => $startCoordinates['latitude'],
                        'start_longitude' => $startCoordinates['longitude'],
                        'end_latitude' => $endCoordinates['latitude'],
                        'end_longitude' => $endCoordinates['longitude'],
                    ]);

                    // Geocode tablosunu güncelle veya yeni bir kayıt oluştur
                    Geocode::updateOrCreate(
                        ['vehicle_id' => $vehicle->id],
                        [
                            'start_latitude' => $startCoordinates['latitude'],
                            'start_longitude' => $startCoordinates['longitude'],
                            'end_latitude' => $endCoordinates['latitude'],
                            'end_longitude' => $endCoordinates['longitude'],
                        ]
                    );

                    Log::info('Geocode kaydı güncellendi veya oluşturuldu', ['vehicle_id' => $vehicle->id]);
                } else {
                    Log::warning('Geocoding işlemi için koordinatlar alınamadı', ['vehicle_id' => $vehicle->id]);
                }
            } catch (\Exception $e) {
                Log::error('Geocoding işlemi sırasında hata oluştu', [
                    'vehicle_id' => $vehicle->id,
                    'error' => $e->getMessage()
                ]);
            }
        }

        Log::info('Geocoding işlemi başarıyla tamamlandı.');
        return redirect()->back()->with('success', 'Geocoding işlemi başarıyla tamamlandı.');
    }

    public function processChatGPT()
    {
        Log::info('ChatGPT API ile adres düzenleme işlemi başlatıldı.');

        $vehicles = Vehicle::all();
        $folderPath = storage_path('app/chatgpt_responses');

        if (!file_exists($folderPath)) {
            mkdir($folderPath, 0777, true);
            Log::info('Yanıtların kaydedileceği klasör oluşturuldu.', ['path' => $folderPath]);
        }

        foreach ($vehicles as $vehicle) {
            try {
                $prompt = "Aşağıdaki adresleri geocode API'sine uygun formata çevir:\n" .
                    "Başlangıç adresi: {$vehicle->start_address}\n" .
                    "Bitiş adresi: {$vehicle->end_address}";

                Log::info('ChatGPT API isteği oluşturuluyor', ['vehicle_id' => $vehicle->id, 'prompt' => $prompt]);

                $formattedAddresses = $this->sendChatGPTRequest($prompt);

                $fileName = $folderPath . "/formatted_address_vehicle_{$vehicle->id}.json";

                file_put_contents($fileName, json_encode($formattedAddresses));

                Log::info('ChatGPT yanıtı dosyaya kaydedildi', ['vehicle_id' => $vehicle->id, 'file' => $fileName]);

                Log::info('Geocode API’ye uygun adresler alındı', [
                    'vehicle_id' => $vehicle->id,
                    'start_address_formatted' => $formattedAddresses['start_address'],
                    'end_address_formatted' => $formattedAddresses['end_address'],
                ]);

                $startAddressFormatted = $formattedAddresses['start_address'];
                $endAddressFormatted = $formattedAddresses['end_address'];



            } catch (\Exception $e) {
                Log::error('ChatGPT API isteği sırasında hata oluştu', [
                    'vehicle_id' => $vehicle->id,
                    'error' => $e->getMessage()
                ]);
            }
        }

        Log::info('ChatGPT API ile adres düzenleme işlemi başarıyla tamamlandı.');
        return response()->json(['message' => 'ChatGPT API ile adres düzenleme işlemi başarıyla tamamlandı.']);
    }

    protected function sendChatGPTRequest($prompt)
    {
        $apiUrl = 'https://api.openai.com/v1/completions';
        $apiKey = env('CHATGPT_API_KEY');

        $formattedPrompt = $prompt . "\nLütfen yanıtı şu formatta verin: {\"start_address\": \"Düzenlenmiş Başlangıç Adresi\", \"end_address\": \"Düzenlenmiş Bitiş Adresi\"}";

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $apiKey,
        ])->post($apiUrl, [
            'model' => 'text-davinci-003',
            'prompt' => $formattedPrompt,
            'max_tokens' => 100,
        ]);

        if ($response->successful()) {
            $text = $response->json()['choices'][0]['text'] ?? null;

            if ($this->isValidJson($text)) {
                return json_decode($text, true);
            }

            Log::warning('ChatGPT yanıtı beklenen JSON formatında değil, düzenleniyor.', ['response_text' => $text]);

            $correctedJson = $this->attemptJsonCorrection($text);
            return $correctedJson;
        }

        throw new \Exception('ChatGPT API isteği başarısız oldu.');
    }

    protected function attemptJsonCorrection($text)
    {
        $start = strpos($text, '{');
        $end = strrpos($text, '}');
        if ($start !== false && $end !== false) {
            $jsonString = substr($text, $start, $end - $start + 1);
            if ($this->isValidJson($jsonString)) {
                return json_decode($jsonString, true);
            }
        }
        Log::error('Yanıt JSON formatına dönüştürülemedi', ['response_text' => $text]);
        return null;
    }

    protected function isValidJson($string)
    {
        json_decode($string);
        return json_last_error() === JSON_ERROR_NONE;
    }



}
