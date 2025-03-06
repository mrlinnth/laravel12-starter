import { DeleteBtn } from '@/components/buttons/delete-btn';
import { EditBtn } from '@/components/buttons/edit-btn';
import { DetailListItem } from '@/components/common/detail-list-item';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, User } from '@/types';
import { Head } from '@inertiajs/react';
import React from 'react';

// Dummy interface
// Update your types file and import from it
type Todo = {
    id?: number;
    name: string;
    content: string;
    status: string;
    creator: User;
    completed_at?: string;
    created_at?: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Todo',
        href: route('todos.index'),
    },
    {
        title: 'Detail',
        href: '#',
    },
];

export default function TodoShow({ todo, media, isDelete }: { todo: Todo; media: string; isDelete: boolean }) {
    const [openDelete, setOpenDelete] = React.useState(isDelete);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Detail - Todo" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card className="md:max-w-xl">
                    <CardHeader>
                        <CardTitle>Info</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <dl className="-my-3 divide-y divide-gray-100 text-sm">
                            <DetailListItem label="name" value={todo.name} />
                            <DetailListItem label="status" value={todo.status} />
                            <DetailListItem label="completed at" value={todo.completed_at} />
                            <DetailListItem label="content" value={todo.content} />
                            <DetailListItem label="created by" value={todo.creator.name} />
                            <DetailListItem label="created at" value={todo.created_at} />
                            <DetailListItem label="file" value={media} />
                        </dl>
                    </CardContent>
                    <CardFooter className="flex flex-row justify-between">
                        <EditBtn
                            route={route('todos.edit', {
                                todo: todo,
                            })}
                        />
                        <DeleteBtn
                            route={route('todos.destroy', {
                                todo: todo,
                            })}
                            item={todo.name}
                            open={openDelete}
                            setOpen={setOpenDelete}
                        />
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
}
