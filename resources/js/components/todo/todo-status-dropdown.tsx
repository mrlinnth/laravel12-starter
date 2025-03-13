import { ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import Loading from '@/components/common/loading';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SidebarMenuButton } from '@/components/ui/sidebar';
import { fetcher } from '@/lib/utils';
import { toast } from 'sonner';
import useSWR from 'swr';

export function TodoStatusDropdown({ id, status }: { id: number; status: string }) {
    const [activeStatus, setActiveStatus] = React.useState(status);
    const { data: res, isLoading } = useSWR(route('api.todos.statuses.index'), fetcher);

    const handleSwitch = (v: string) => {
        setActiveStatus(v);
        const params = {
            todo: id,
            status: v,
        };
        fetch(route('api.todos.statuses.update', params), {
            method: 'POST',
        }).then(function (response) {
            if (response.status === 200) {
                toast.success('Status successfully updated.');
            } else {
                toast.error('There is an issue with status update. Try again.');
            }
        });
    };

    if (isLoading) return <Loading />;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="bg-sidebar-accent text-sidebar-accent-foreground">
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate">{activeStatus}</span>
                    </div>
                    <ChevronsUpDown className="ml-auto" />
                </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" align="start" sideOffset={4}>
                <DropdownMenuLabel className="text-muted-foreground text-xs">Status</DropdownMenuLabel>
                {res.data.map((item: string, index: number) => (
                    <DropdownMenuItem key={index} onClick={() => handleSwitch(item)}>
                        {item}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
