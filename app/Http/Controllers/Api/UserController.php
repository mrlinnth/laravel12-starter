<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Orion\Concerns\DisableAuthorization;
use Orion\Http\Controllers\Controller;

class UserController extends Controller
{
    use DisableAuthorization;

    protected $model = User::class;
}
