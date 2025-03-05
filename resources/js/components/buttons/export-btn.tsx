import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";

export function ExportBtn({ route }: { route: string }) {
    return (
        <Button variant="secondary" className="w-fit" asChild>
            <a target="_blank" href={route}>
                <DownloadIcon />
                Export
            </a>
        </Button>
    );
}
