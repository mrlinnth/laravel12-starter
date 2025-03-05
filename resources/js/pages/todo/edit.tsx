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
type Todo = {
    id?: number;
    name: string;
    created_at?: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Todo',
        href: route('todos.index'),
    },
    {
        title: 'Edit',
        href: '#',
    },
];

export default function TodoEdit({ todo }: { todo: Todo; }) {
    const { data, setData, patch, reset, errors, processing } = useForm<Todo>({
        name: todo.name,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('todos.update', { todo: todo.id }), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create - Todo" />
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
