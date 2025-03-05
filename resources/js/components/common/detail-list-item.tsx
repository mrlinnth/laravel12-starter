export function DetailListItem({
    label,
    value,
}: {
    label: string;
    value: string | number | undefined | null;
}) {
    return (
        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-bold capitalize">{label}</dt>
            <dd className="sm:col-span-2">{value}</dd>
        </div>
    );
}
