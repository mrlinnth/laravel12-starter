# Laravel 12 starter template

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
- [Sonner](https://sonner.emilkowal.ski/)

## Tips

### Basic CRUD workflow

1. Generate migration, seeder, model, controller, request files using blueprint for your entity (refer to `draft.yaml.example` and create your own `draft.yaml`)
1. Delete blueprint generated view files
1. Update blueprint generated controller file to return `Inertia::render` instead of blade `view`
1. Update `routes/web.php`
1. Make changes to other blueprint generated files if necessary
1. Generate react crud files using `php artisan make:shadcn-crud` (custom artisan command which uses Laravel File Generator package)
1. Update `resources/js/types/index.ts` with new interface for your entity
1. Make necessary changes to generated react crud files
