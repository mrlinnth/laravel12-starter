<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use DateTimeInterface;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, HasRoles, LogsActivity, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * The accessors to append to the model's array form.

     *

     * @var array
     */
    protected $appends = ['is_super_admin', 'main_role', 'can_do'];

    /**
     * Determine if the user is super admin.
     */
    protected function isSuperAdmin(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->hasRole(config('project.super_admin')),
        );
    }

    /**
     * Get the user's first role.
     */
    protected function mainRole(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->getRoleNames()->first(),
        );
    }

    /**
     * Get the user's permissions.
     */
    protected function canDo(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->getAllPermissions()->pluck('name'),
        );
    }

    protected function serializeDate(DateTimeInterface $date): string
    {
        return $date->format('Y/m/d');
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults();
    }
}
