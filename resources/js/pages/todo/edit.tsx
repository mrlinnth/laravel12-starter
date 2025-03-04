import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'To Do',
        href: '/todos',
    },
    {
        title: 'Edit',
        href: '/todos/edit/#',
    },
];

export default function TodoEdit() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit - To Do" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <p>todo.edit page</p>
            </div>
        </AppLayout>
    );
}
