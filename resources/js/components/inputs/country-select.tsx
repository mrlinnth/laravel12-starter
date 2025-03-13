import Loading from '@/components/common/loading';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { fetcher } from '@/lib/utils';
import React from 'react';
import useSWR from 'swr';

type Country = {
    name: {
        common: string;
    };
    cca3: string;
};

export default function CountrySelect({ item, setItem }: { item: string | undefined; setItem: React.Dispatch<string> }) {
    const { data: res, isLoading } = useSWR('https://restcountries.com/v3.1/all?fields=name,cca3', fetcher);

    if (isLoading) return <Loading />;

    return (
        <Select onValueChange={setItem} defaultValue={item}>
            <SelectTrigger className="max-w-xl">
                <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {res.map((option: Country, index: number) => (
                        <SelectItem key={index} value={option.cca3}>
                            {option.name.common}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
