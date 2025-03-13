import { snakeToText } from '@/lib/utils';

export function DetailListImage({ label, value }: { label: string; value: string }) {
    return (
        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-bold capitalize">{snakeToText(label)}</dt>
            <dd className="sm:col-span-2">
                <a href={value} target="_blank">
                    <img src={value} alt="" className="size-36" />
                </a>
            </dd>
        </div>
    );
}
