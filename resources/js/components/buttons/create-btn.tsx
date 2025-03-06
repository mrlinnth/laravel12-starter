import { Button } from '@/components/ui/button';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';

export function CreateBtn({ route }: { route: string }) {
    const { auth } = usePage<SharedData>().props;
    const { is_super_admin, can_do } = auth.user;

    function hasAccess() {
        if (is_super_admin) {
            return false;
        }

        return can_do.includes('create');
    }
    return (
        <Button asChild hidden={!hasAccess()}>
            <Link href={route}>
                <PlusIcon />
                Create
            </Link>
        </Button>
    );
}
