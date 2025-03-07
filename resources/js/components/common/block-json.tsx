export function BlockJson({ data }: { data: unknown }) {
    return <pre className="bg-secondary p-5 text-xs">{JSON.stringify({ data })}</pre>;
}
