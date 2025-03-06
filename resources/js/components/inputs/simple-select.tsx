import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React from 'react';

export default function SimpleSelect({ options, item, setItem }: { options: string[]; item: string | undefined; setItem: React.Dispatch<string> }) {
    return (
        <Select onValueChange={setItem} defaultValue={item}>
            <SelectTrigger className="max-w-xl">
                <SelectValue placeholder="Select item" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {options.map((option, index) => (
                        <SelectItem key={index} value={option}>
                            {option}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
