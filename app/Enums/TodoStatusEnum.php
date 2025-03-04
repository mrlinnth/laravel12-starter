<?php

namespace App\Enums;

enum TodoStatusEnum: string
{
    case PENDING = 'pending';
    case WIP = 'wip';
    case COMPLETED = 'completed';
}
