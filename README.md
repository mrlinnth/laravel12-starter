# Laravel 12 starter template

## Requirements

- php 8.2 and above
- composer 2.8.1 and above
- node 22.14.0 and above lts
- pnpm
- mysql
- apache/nginx

## Installation

1. clone this repo `git@github.com:mrlinnth/laravel12-starter.git`
1. create database
1. change to project directory
1. copy `.env.example` to `.env`
1. update `.env` with correct settings
1. run `composer install`
1. run `php artisan key:generate`
1. run `php artisan migrate:refresh --seed`
1. run `corepack enable pnpm`
1. run `pnpm install`
1. run `pnpm build` or `pnpm dev`

## Use

- [Laravel v12](https://laravel.com/docs/12.x)
- [Inertia v2](https://inertiajs.com)
- [React JS v19](https://react.dev/reference/react)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Shadcn UI](https://ui.shadcn.com/docs)

### Laravel Packages

- [Blueprint](https://blueprint.laravelshift.com)
- [Laravel Debugbar](https://github.com/barryvdh/laravel-debugbar)
- [Laravel Excel](https://docs.laravel-excel.com/3.1/getting-started/installation.html)
- [Laravel File Geneator](https://github.com/skyronic/laravel-file-generator)
- [Laravel Pint](https://laravel.com/docs/12.x/pint)
- [Laravel Sanctum](https://laravel.com/docs/12.x/sanctum)
- [Laravel Telescope](https://laravel.com/docs/12.x/telescope)
- [Orion](https://orion.tailflow.org/)
- [Spatie - Laravel Activity Log](https://spatie.be/docs/laravel-activitylog/v4/introduction)
- [Spatie - Laravel Media Library](https://spatie.be/docs/laravel-medialibrary/v11/introduction)
- [Spatie - Laravel Permission](https://spatie.be/docs/laravel-permission/v6/introduction)
- [Spatie - Laravel Query Builder](https://spatie.be/docs/laravel-query-builder/v6/introduction)
- [Ziggy](https://github.com/tightenco/ziggy)

### Node Packages

- [React DayPicker](https://daypicker.dev/)
- [Recharts](https://recharts.org/en-US/guide/installation)
- [Sonner](https://sonner.emilkowal.ski/)
- [Tanstack Table](https://tanstack.com/table)

## Tips

### Default user

```txt
login email: admin@mail.com
password: password
```

### Basic CRUD workflow

1. Generate migration, seeder, model, controller, request files using blueprint for your entity (refer to `draft.yaml.example` and create your own `draft.yaml`)
1. Delete blueprint generated view files
1. Update blueprint generated controller file to return `Inertia::render` instead of blade `view`
1. Update `routes/web.php`
1. Make changes to other blueprint generated files if necessary
1. Generate react crud files using `php artisan make:shadcn-crud` (custom artisan command which uses Laravel File Generator package)
1. Update `resources/js/types/index.ts` with new interface for your entity
1. Make necessary changes to generated react crud files
1. Run `php artisan migrate:refresh --seed`
