<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Institution;

class InstitutionSeeder extends Seeder
{
    public function run()
    {
        // Ana Kurumlar
        $corp1 = Institution::create(['name' => 'Alpha Group']);
        $corp2 = Institution::create(['name' => 'Beta Holdings']);
        $corp3 = Institution::create(['name' => 'Gamma Enterprises']);

        // Alpha Group'un altındaki kurumlar
        $alphaTech = Institution::create(['name' => 'Alpha Tech', 'parent_id' => $corp1->id]);
        $alphaHealth = Institution::create(['name' => 'Alpha Health', 'parent_id' => $corp1->id]);
        $alphaEnergy = Institution::create(['name' => 'Alpha Energy', 'parent_id' => $corp1->id]);

        // Beta Holdings'in altındaki kurumlar
        $betaRetail = Institution::create(['name' => 'Beta Retail', 'parent_id' => $corp2->id]);
        $betaFinance = Institution::create(['name' => 'Beta Finance', 'parent_id' => $corp2->id]);
        $betaConsulting = Institution::create(['name' => 'Beta Consulting', 'parent_id' => $corp2->id]);

        // Gamma Enterprises'ın altındaki kurumlar
        $gammaLogistics = Institution::create(['name' => 'Gamma Logistics', 'parent_id' => $corp3->id]);
        $gammaManufacturing = Institution::create(['name' => 'Gamma Manufacturing', 'parent_id' => $corp3->id]);
        $gammaMarketing = Institution::create(['name' => 'Gamma Marketing', 'parent_id' => $corp3->id]);

        // Alt Kurumların altındaki daha fazla kurum (Alpha Tech'in altındakiler)
        Institution::create(['name' => 'Alpha Innovations', 'parent_id' => $alphaTech->id]);
        Institution::create(['name' => 'Alpha AI Labs', 'parent_id' => $alphaTech->id]);
        Institution::create(['name' => 'Alpha Robotics', 'parent_id' => $alphaTech->id]);

        // Alt Kurumların altındaki daha fazla kurum (Alpha Health'in altındakiler)
        Institution::create(['name' => 'Alpha Pharma', 'parent_id' => $alphaHealth->id]);
        Institution::create(['name' => 'Alpha Wellness', 'parent_id' => $alphaHealth->id]);

        // Alt Kurumların altındaki daha fazla kurum (Beta Retail'in altındakiler)
        Institution::create(['name' => 'Beta Fashion', 'parent_id' => $betaRetail->id]);
        Institution::create(['name' => 'Beta Electronics', 'parent_id' => $betaRetail->id]);
        Institution::create(['name' => 'Beta Groceries', 'parent_id' => $betaRetail->id]);

        // Alt Kurumların altındaki daha fazla kurum (Gamma Logistics'in altındakiler)
        Institution::create(['name' => 'Gamma Air Transport', 'parent_id' => $gammaLogistics->id]);
        Institution::create(['name' => 'Gamma Sea Shipping', 'parent_id' => $gammaLogistics->id]);
        Institution::create(['name' => 'Gamma Land Freight', 'parent_id' => $gammaLogistics->id]);

        // Daha alt seviyede eklemeler (Gamma Manufacturing'in altındakiler)
        $manufacturingSub1 = Institution::create(['name' => 'Gamma Automotive', 'parent_id' => $gammaManufacturing->id]);
        $manufacturingSub2 = Institution::create(['name' => 'Gamma Electronics Manufacturing', 'parent_id' => $gammaManufacturing->id]);
        Institution::create(['name' => 'Gamma Plastics', 'parent_id' => $gammaManufacturing->id]);

        // Daha alt seviyede eklemeler (Gamma Automotive'in altındakiler)
        Institution::create(['name' => 'Gamma Cars', 'parent_id' => $manufacturingSub1->id]);
        Institution::create(['name' => 'Gamma Trucks', 'parent_id' => $manufacturingSub1->id]);

        // Daha alt seviyede eklemeler (Gamma Electronics Manufacturing'in altındakiler)
        Institution::create(['name' => 'Gamma Phones', 'parent_id' => $manufacturingSub2->id]);
        Institution::create(['name' => 'Gamma Computers', 'parent_id' => $manufacturingSub2->id]);
    }
}
