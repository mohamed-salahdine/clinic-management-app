<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RoleAndAdminSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create Roles
        $adminRole = Role::create(['name' => 'admin']);
        $doctorRole = Role::create(['name' => 'doctor']);
        $patientRole = Role::create(['name' => 'patient']);

        // Create a Super Admin User
        $admin = User::firstOrCreate(
            ['email' => 'admin@clinic.com'],
            [
                'first_name' => 'Super',
                'last_name' => 'Admin',
                'password' => Hash::make('password'), // Default password
                'is_active' => true,
            ]
        );

        // Assign the role to the user
        $admin->assignRole($adminRole);
    }
}
