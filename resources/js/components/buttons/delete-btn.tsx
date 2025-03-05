import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "@inertiajs/react";
import { TrashIcon } from "lucide-react";
import { Dispatch, FormEventHandler, SetStateAction } from "react";

export function DeleteBtn({
    open,
    setOpen,
    route,
    item,
}: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    route: string;
    item: string;
}) {
    const { delete: destroy } = useForm();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        destroy(route);
    };
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="destructive">
                    <TrashIcon />
                    Delete
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <form onSubmit={submit}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will delete
                            <code className="mx-2 text-primary">{item}</code>
                            from the system.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction type="submit">
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
