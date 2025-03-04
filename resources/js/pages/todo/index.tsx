import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'To Do',
        href: '/todos',
    },
];

export default function TodoIndex() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="To Do" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <p>todo.index page</p>
            </div>
        </AppLayout>
    );
}
