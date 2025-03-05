import { PropsWithChildren } from "react";

export function FormGrid({
    children,
    title,
    description,
}: PropsWithChildren<{
    title: string;
    description?: string;
}>) {
    return (
        <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="space-y-4 max-w-md">
                <h3 className="text-lg">{title}</h3>
                {description && (
                    <p className="text-gray-500 text-sm">{description}</p>
                )}
            </div>
            <div className="grow max-w-xl md:max-w-2xl">{children}</div>
        </div>
    );
}
