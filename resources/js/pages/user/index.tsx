import { CreateBtn } from '@/components/buttons/create-btn';
import { DataTable, DataTableActions } from '@/components/tables/data-table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, LogInIcon } from 'lucide-react';

// Dummy interface
// Update your types file and import from it
type User = {
    id?: number;
    name: string;
    email: string;
    created_at?: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User',
        href: route('users.index'),
    },
];

const columns: ColumnDef<User>[] = [
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
                href={route('users.show', {
                    user: row.original.id,
                })}
            >
                {row.getValue('name')}
            </Link>
        ),
    },
    {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ row }) => <div className="">{row.getValue('email')}</div>,
    },
    {
        accessorKey: 'main_role',
        header: 'Role',
        cell: ({ row }) => <div className="">{row.getValue('main_role')}</div>,
    },
    {
        accessorKey: 'impersonate',
        header: 'Impersonate',
        cell: ({ row }) =>
            !row.original.is_super_admin && (
                <Button variant="outline" asChild>
                    <Link href={route('impersonate', { id: row.original.id })}>
                        <LogInIcon />
                    </Link>
                </Button>
            ),
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const param = { user: row.original.id };

            return !row.original.is_super_admin && <DataTableActions routePrefix="users" routeParam={param} />;
        },
    },
];

export default function UserIndex({ users }: { users: User[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex flex-row justify-between">
                    <CreateBtn route={route('users.create')} />
                </div>
                <DataTable data={users} columns={columns} />
            </div>
        </AppLayout>
    );
}
