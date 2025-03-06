import { CreateBtn } from '@/components/buttons/create-btn';
import { ExportBtn } from '@/components/buttons/export-btn';
import { DataTable, DataTableActions } from '@/components/tables/data-table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, User } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

// Dummy interface
// Update your types file and import from it
type Todo = {
    id?: number;
    name: string;
    status: string;
    creator: User;
    created_at?: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Todo',
        href: route('todos.index'),
    },
];

const columns: ColumnDef<Todo>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <Link
                className="text-link"
                href={route('todos.show', {
                    todo: row.original.id,
                })}
            >
                {row.getValue('name')}
            </Link>
        ),
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => <div className="">{row.getValue('status')}</div>,
    },
    {
        accessorKey: 'creator',
        header: 'Created By',
        cell: ({ row }) => <div className="">{row.getValue<User>('creator').name}</div>,
    },
    {
        accessorKey: 'created_at',
        header: 'Created At',
        cell: ({ row }) => <div className="">{row.getValue('created_at')}</div>,
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const param = { todo: row.original.id };

            return <DataTableActions routePrefix="todos" routeParam={param} />;
        },
    },
];

export default function TodoIndex({ todos }: { todos: Todo[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Todo" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex flex-row justify-between">
                    <CreateBtn route={route('todos.create')} />
                    <ExportBtn route={route('todos.export')} />
                </div>
                <DataTable data={todos} columns={columns} />
            </div>
        </AppLayout>
    );
}
