@servers(['localhost' => ['127.0.0.1']])

@task('deploy', ['on' => 'localhost'])
    git restore .
    git pull
    composer install
    php artisan migrate --force
    pnpm install
    pnpm build
    php artisan optimize:clear
@endtask

# for runcloud web apps use correct full php bin bath (eg: /RunCloud/Packages/php83rc/bin/php)
