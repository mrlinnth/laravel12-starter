import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { EditIcon } from "lucide-react";

export function EditBtn({ route }: { route: string }) {
    return (
        <Button asChild>
            <Link href={route}>
                <EditIcon />
                Edit
            </Link>
        </Button>
    );
}
