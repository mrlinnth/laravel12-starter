import { CardsDemo } from '@/components/cards';
import { BlockJson } from '@/components/common/block-json';
import DatePicker from '@/components/inputs/date-picker';
import SmartSelect from '@/components/inputs/smart-select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Option, User } from '@/types';
import { Head } from '@inertiajs/react';
import React from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Playground',
        href: '#',
    },
];

export default function Playground({ users }: { users: User[] }) {
    const [item, setItem] = React.useState<Option | undefined>();
    const [date, setDate] = React.useState<Date | undefined>();

    const userOptions = users.map((obj) => ({
        value: obj.id?.toString() ?? '',
        label: obj.name,
    }));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Playground" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Tabs defaultValue="experiment" className="">
                    <TabsList>
                        <TabsTrigger value="experiment">Experiment</TabsTrigger>
                        <TabsTrigger value="cards">Cards</TabsTrigger>
                    </TabsList>
                    <TabsContent value="experiment">
                        <div className="grid grid-cols-3 gap-10">
                            <div className="box">
                                <SmartSelect options={userOptions} item={item} setItem={setItem} />
                                <BlockJson data={item} />
                            </div>
                            <div className="box">
                                <DatePicker date={date} setDate={(v) => setDate(v)} />
                                <BlockJson data={date?.toDateString()} />
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="cards">
                        <CardsDemo />
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
