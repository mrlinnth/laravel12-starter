import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Secret',
        href: '#',
    },
];

export default function Secret() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Secret" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="box">
                    <p>Shhhhh......</p>
                    <p>Only super admin user can access this route and page.</p>
                </div>
            </div>
        </AppLayout>
    );
}
