# Laravel 12 starter template

> ⚠️ **ATTENTION** This is a starter template. Clone or fork this repo. Develop and commit in a new repo. Do not commit to this repo. ‼️

## Requirements

- php 8.2 or 8.3
- composer 2.8.1
- node 22.14.0
- pnpm [install guide](https://pnpm.io/installation#using-corepack)
- mysql
- apache/nginx

## Installation

1. clone or fork `git@github.com:mrlinnth/laravel12-starter.git`
1. create database
1. change to project directory
1. copy `.env.example` to `.env`
1. update `.env` with correct settings
1. run `composer install`
1. run `php artisan key:generate`
1. run `php artisan migrate:refresh --seed`
1. run `pnpm install`
1. run `pnpm dev` for local development or `pnpm build` for deployment

> 🆘 **WARNING** Repo is still work in progress. Check the to-do list for current status. ‼️

## To Do

- [x] generate basic React CRUD pages
- [x] to do CRUD with spatie media upload
- [x] role CRUD
- [x] user CRUD with role
- [x] example for Authorization based on role and permission
- [ ] prefix sub-directory (eg: admin, frontend) with generate commands
- [ ] one command to generate both backend and frontend files
- [ ] impersonate as a user
- [ ] example REST api endpoint and usage in React code

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

### Project Structure

```txt
laravel12-starter
├── app
│   ├── Console
│   │   └── Commands
│   │       └── ShadcnCrud.php _(Custom command to generate React CRUD pages)_
│   ├── Enums
│   ├── Exports
│   ├── Http
│   │   ├── Controllers
│   │   │   ├── Auth
│   │   │   ├── Settings
│   │   │   └── PlaygroundController.php
│   │   └── Requests
│   ├── Models
│   ├── Policies
│   └── Providers
├── bootstrap
├── config
├── database
│   ├── factories
│   ├── migrations
│   └── seeders
├── public
├── resources
│   ├── boilerplates _(Templates for custom file generate)_
│   ├── css
│   ├── js
│   │   ├── components
│   │   │   └── ui _(Shadcn components)_
│   │   ├── hooks
│   │   ├── layouts
│   │   ├── lib
│   │   ├── pages
│   │   │   ├── auth
│   │   │   ├── settings
│   │   │   ├── dashboard.tsx
│   │   │   └── welcome.tsx
│   │   ├── types
│   │   └── app.tsx
│   └── views
├── routes
│   └── web.php
└── storage
```

### Default users

| Name         | Login Email      | Password | Role    | Permissions               |
|--------------|------------------|----------|---------|---------------------------|
| Super Admin  | <admin@mail.com>   | password | god     | *                         |
| Manager User | <manager@mail.com> | password | manager | create,read,update,delete |
| User         | <user@mail.com>    | password |         |                           |

### File Upload

- Use [Spatie - Laravel Media Library](https://spatie.be/docs/laravel-medialibrary/v11/introduction) to associate file to model
- Check sample code in Todo CRUD files

### Basic Workflow

> 💡 **Advice** Copy and paste existing file/directory. Find and replace. Voila.

#### Backend - For new entity (eg: Comment)

1. Generate migration, seeder, model, controller, request files using blueprint for your entity (refer to `draft.yaml.example` and create your own `draft.yaml`)
1. Delete blueprint generated view direcotry under `resources/views`
1. Update blueprint generated controller file to return `Inertia::render` instead of blade `view`
1. Update `routes/web.php`
1. Make changes to other blueprint generated files if necessary
1. Run `php artisan migrate:refresh --seed`

#### Frontend - For new entity (eg: Comment)

1. Generate react crud files using `php artisan make:shadcn-crud comment` (custom artisan command which uses Laravel File Generator package)
1. Make necessary changes to generated react crud files
1. Update `resources/js/components/app-sidebar.tsx` with new route

#### If you already have migration file (eg: Role)

1. Create factory and seeder (optional)
1. If model not exist, create and extends `BaseModel`
1. If controller not exist, create a resource controller
1. If request not exist, create a form request
1. Update web.php with new route(s)
1. Generate react crud files using `php artisan make:shadcn-crud role`
1. Make necessary changes to generated react crud files
1. Run `php artisan migrate:refresh --seed`
1. Update `resources/js/components/app-sidebar.tsx` with new route

### Authorization

- Refer to [Spatie - Laravel Permission](https://spatie.be/docs/laravel-permission/v6/introduction)
- check `database/seeders/DatabaseSeeder.php` DatabaseSeeder class for how to create role, permission and assign to user
- `app/Models/User.php` User model has `is_super_admin`, `main_role`, `can_do` custom  attributes
- for frontend authorization, check `resources/js/components/buttons/create-btn.tsx`, Create button is hidden for user without `create` permission
- for backend authorization, check `app/Policies/TodoPolicy.php` TodoPolicy class `update` method and `app/Http/Controllers/TodoController.php` TodoController class `edit` and `update` methods
- `secret` route in `routes/web.php` is available only to super admin user
