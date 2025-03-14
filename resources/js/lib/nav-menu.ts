import { NavGroup, NavItem } from '@/types';
import { BookOpen, Folder, LayoutGrid, ListCheck, Settings2, TerminalSquare, Users } from 'lucide-react';

export const navMain: NavGroup[] = [
    {
        title: 'Dashboard',
        url: route('dashboard'),
        icon: LayoutGrid,
    },
    {
        title: 'Users',
        url: route('users.index'),
        icon: Users,
    },
    {
        title: 'Settings',
        url: '#',
        icon: Settings2,
        subItems: [
            {
                title: 'Platform Configuration',
                url: '#',
            },
            {
                title: 'Roles',
                url: route('roles.index'),
            },
        ],
    },
];

export const navFooter: NavItem[] = [
    {
        title: 'Playground',
        url: route('playground'),
        icon: TerminalSquare,
    },
    {
        title: 'To Dos',
        url: route('todos.index'),
        icon: ListCheck,
    },
    {
        title: 'Repository',
        url: 'https://github.com/mrlinnth/laravel12-starter',
        icon: Folder,
    },
    {
        title: 'Help',
        url: '#',
        icon: BookOpen,
    },
];
