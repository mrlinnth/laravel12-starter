<?php

namespace App\Enums;

use App\Traits\EnumArray;

enum TodoStatusEnum: string
{
    use EnumArray;

    case PENDING = 'pending';
    case WIP = 'wip';
    case COMPLETED = 'completed';

    public static function default(): self
    {
        return self::PENDING;
    }
}
