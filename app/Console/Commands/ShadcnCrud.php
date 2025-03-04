<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class ShadcnCrud extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:shadcn-crud {entity}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate React CRUD files for a given entity using Shadcn UI';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $entity = $this->argument('entity');
        $this->call('generate', ['type' => 'react:index', 'name' => $entity]);
        $this->call('generate', ['type' => 'react:create', 'name' => $entity]);
    }
}
