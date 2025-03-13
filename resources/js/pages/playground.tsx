import { BlockJson } from '@/components/common/block-json';
import Heading from '@/components/heading';
import CountrySelect from '@/components/inputs/country-select';
import DatePicker from '@/components/inputs/date-picker';
import SimpleSelect from '@/components/inputs/simple-select';
import SmartSelect from '@/components/inputs/smart-select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Option, User } from '@/types';
import { Head } from '@inertiajs/react';
import React from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Playground',
        href: '#',
    },
];

export default function Playground({ users, roles }: { users: User[]; roles: string[] }) {
    const [role, setRole] = React.useState<string>('');
    const [user, setUser] = React.useState<Option | undefined>();
    const [date, setDate] = React.useState<Date | undefined>();
    const [country, setCountry] = React.useState<string>('MMR');
    const [hasPhone, setHasPhone] = React.useState<boolean>(false);
    const [phone, setPhone] = React.useState<string>('');

    const userOptions = users.map((obj) => ({
        value: obj.id?.toString() ?? '',
        label: obj.name,
    }));

    const handlehasPhone = (v: boolean) => {
        setHasPhone(v);
        if (v) {
            toast.info('Hey, thanks for sharing your number!');
        } else {
            setPhone('');
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Playground" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Tabs defaultValue="experiment" className="">
                    <TabsList>
                        <TabsTrigger value="experiment">Experiment</TabsTrigger>
                        {/* <TabsTrigger value="cards">Cards</TabsTrigger> */}
                    </TabsList>
                    <TabsContent value="experiment">
                        <div className="grid grid-cols-3 gap-10">
                            <div className="box">
                                <Heading title="SimpleSelect" description="Example select input with array of string values" />
                                <SimpleSelect options={roles} item={role} setItem={setRole} />
                                <BlockJson data={role} />
                            </div>
                            <div className="box">
                                <Heading title="SmartSelect" description="Example select input with array of {value, label} objects" />
                                <SmartSelect options={userOptions} item={user} setItem={(v) => setUser(v)} />
                                <BlockJson data={user} />
                            </div>
                            <div className="box">
                                <Heading title="CountrySelect" description="Example select input with REST API values" />
                                <CountrySelect item={country} setItem={setCountry} />
                                <BlockJson data={country} />
                            </div>
                            <div className="box">
                                <Heading title="DatePicker" description="Example date picker input" />
                                <DatePicker date={date} setDate={(v) => setDate(v)} />
                                <BlockJson data={date?.toDateString()} />
                            </div>
                            <div className="box">
                                <Heading title="Switcher" description="Example switcher input which show an input and a sooner toast" />
                                <div className="flex items-center space-x-2">
                                    <Switch id="show-help" checked={hasPhone} onCheckedChange={handlehasPhone} />
                                    <Label htmlFor="show-help">Share Phone Number</Label>
                                </div>
                                {hasPhone && (
                                    <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter phone number" />
                                )}
                                <BlockJson data={{ hasPhone, phone }} />
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="cards">{/* <CardsDemo /> */}</TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
