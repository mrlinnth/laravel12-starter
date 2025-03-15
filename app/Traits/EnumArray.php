<?php

namespace App\Traits;

trait EnumArray
{
    public static function names(): array
    {
        return array_column(self::cases(), 'name');
    }

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    public static function array(): array
    {
        return array_column(self::cases(), 'value', 'name');
    }
}
