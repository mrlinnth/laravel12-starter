import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

// Dummy interface
// Update your types file and import from it
type Todo = {
    name: string;
    content: string;
    document?: File | null;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Todo',
        href: route('todos.index'),
    },
    {
        title: 'Create',
        href: '#',
    },
];

export default function TodoCreate() {
    const { data, setData, post, reset, errors, processing } = useForm<Todo>({
        name: '',
        content: '',
        document: null,
    });

    const handleFileSelect = (files: FileList | null) => {
        const doc = files ? files[0] : null;

        if (doc) {
            setData('document', doc);
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('todos.store'), {
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
                                placeholder="Buy egg"
                                autoFocus={true}
                            />
                            <InputError className="mt-2" message={errors.name} />
                        </div>
                        <div className="grid grid-flow-row gap-2">
                            <Label htmlFor="name">Content</Label>
                            <Textarea
                                id="content"
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                placeholder="Need 4 or 5 eggs for tomorrow breakfast"
                            />
                            <InputError className="mt-2" message={errors.content} />
                        </div>
                        <div className="grid grid-flow-row gap-2">
                            <Label htmlFor="document">Upload</Label>
                            <Input id="document" type="file" onChange={(e) => handleFileSelect(e.target.files)} />
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
