<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // create super admin role and user
        $this->createSuperAdmin();

        // create manager role and user
        $this->createManager();

        // create test user
        $this->createTestUser();

        // seed dummy data
        $this->call([
            TodoSeeder::class,
        ]);
    }

    // super admin user with super admin role and all permissions
    protected function createSuperAdmin(): void
    {
        // Create super admin role
        Role::create(['name' => config('project.super_admin')]);

        // create user and assign role
        $user = User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@mail.com',
            'password' => Hash::make('password'),
        ]);
        $user->assignRole(config('project.super_admin'));

    }

    // manager role and CRUD permissions
    // assign user to manager role for indirect CRUD permissions
    protected function createManager(): void
    {
        $roleName = 'manager';

        // Create role
        $role = Role::create(['name' => $roleName]);

        // create CRUD permissions and assign to role
        $crud = ['create', 'read', 'update', 'delete'];
        foreach ($crud as $p) {
            Permission::firstOrCreate(['name' => $p]);
        }
        $permissions = Permission::get()->pluck('name');
        $role->syncPermissions($permissions);

        // create user and assign role
        $user = User::factory()->create([
            'name' => 'Manager User',
            'email' => 'manager@mail.com',
            'password' => Hash::make('password'),
        ]);
        $user->assignRole($roleName);
    }

    // user with direct read permission
    protected function createTestUser(): void
    {
        // create user
        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'user@mail.com',
            'password' => Hash::make('password'),
        ]);

        $user->givePermissionTo('read');
    }
}
