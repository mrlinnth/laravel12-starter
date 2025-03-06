import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

// Dummy interface
// Update your types file and import from it
type User = {
    name: string;
    email: string;
    password: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User',
        href: route('users.index'),
    },
    {
        title: 'Create',
        href: '#',
    },
];

export default function UserCreate() {
    const { data, setData, post, reset, errors, processing } = useForm<User>({
        name: '',
        email: '',
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('users.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create - User" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <form onSubmit={submit} className="md:max-w-xl">
                    <div className="space-y-6">
                        <div className="grid grid-flow-row gap-2">
                            <Label htmlFor="name">Name*</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                placeholder="Moe Moe"
                                autoFocus={true}
                            />
                            <InputError className="mt-2" message={errors.name} />
                        </div>
                        <div className="grid grid-flow-row gap-2">
                            <Label htmlFor="name">Email*</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                placeholder="moemoe@mail.com"
                            />
                            <InputError className="mt-2" message={errors.email} />
                        </div>
                        <div className="grid grid-flow-row gap-2">
                            <Label htmlFor="password">Password*</Label>
                            <Input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                required
                                placeholder="A long and secure password"
                            />
                            <InputError className="mt-2" message={errors.password} />
                        </div>
                        <div className="flex justify-end gap-4">
                            <Button variant="secondary" type="reset" disabled={processing}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing}>
                                Save
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
