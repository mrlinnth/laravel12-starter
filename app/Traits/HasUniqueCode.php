<?php

/**
 * HasUniqueCode trait to use with Models
 * Model database table must have $table->string('code')->unique() column
 * Can override the codePrefix() method in the model with desired prefix, default prefix is blank string
 *
 * Base trait class is based on
 * https://github.com/monurakkaya/laravel-unique-code-generator/blob/main/src/Traits/HasUniqueCode.php
 */

namespace App\Traits;

use Exception;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

trait HasUniqueCode
{
    protected static function supportedUniqueCodeTypes()
    {
        return [
            'random_uppercase',
            'random_lowercase',
            'uuid',
            'numeric',
        ];
    }

    /**
     * @throws UniqueCodeNotSupportedException
     */
    private static function checkUniqueCodeIsSupported()
    {
        if (! in_array(self::uniqueCodeType(), self::supportedUniqueCodeTypes())) {
            throw new Exception(
                self::uniqueCodeType().' is not supported. Code types must be one of followings '.implode(', ', self::supportedUniqueCodeTypes())
            );
        }
    }

    protected static function bootHasUniqueCode()
    {
        static::creating(function ($model) {
            if (! $model->isDirty(self::uniqueCodeColumnName())) {
                $model->{self::uniqueCodeColumnName()} = self::generateCode($model);
            }
        });
    }

    /**
     * @throws UniqueCodeNotSupportedException
     */
    public static function generateCode(Model $model)
    {
        self::checkUniqueCodeIsSupported();
        $code = self::{'generate'.Str::studly(self::uniqueCodeType()).'UniqueCode'}();

        $query = self::query();

        if (in_array(SoftDeletes::class, class_uses_recursive($model))) {
            $query->withTrashed();
        }

        if ($query->where(self::uniqueCodeColumnName(), $code)->exists()) {
            return self::generateCode($model);
        }

        return $code;
    }

    protected static function generateRandomUppercaseUniqueCode()
    {
        return Str::upper(
            Str::random(
                self::uniqueCodeLength()
            )
        );
    }

    protected static function generateRandomLowercaseUniqueCode()
    {
        return Str::lower(
            Str::random(
                self::uniqueCodeLength()
            )
        );
    }

    protected static function generateNumericUniqueCode()
    {
        return random_int(
            pow(10, self::uniqueCodeLength() - 1),
            (pow(10, self::uniqueCodeLength()) - 1)
        );
    }

    protected static function generateUuidUniqueCode()
    {
        return Str::uuid()->toString();
    }

    protected static function uniqueCodeLength()
    {
        return 6;
    }

    protected static function uniqueCodeType()
    {
        return 'random_uppercase';
    }

    protected static function uniqueCodeColumnName()
    {
        return 'code';
    }

    /**
     * Add prefix to generated code for accessor method.
     * Default is empty string.
     */
    protected static function codePrefix()
    {
        return '';
    }

    protected function code(): Attribute
    {
        $prefix = self::codePrefix();

        return Attribute::make(
            get: fn ($value) => $prefix.$value,
        );
    }
}
