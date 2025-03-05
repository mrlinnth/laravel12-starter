import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { PlusIcon } from "lucide-react";

export function CreateBtn({ route }: { route: string }) {
    return (
        <Button asChild>
            <Link href={route}>
                <PlusIcon />
                Create
            </Link>
        </Button>
    );
}
