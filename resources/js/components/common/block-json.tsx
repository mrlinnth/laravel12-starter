export function BlockJson({ data }: { data: any }) {
    return (
        <pre className="bg-secondary p-5 text-xs">
            {JSON.stringify({ data })}
        </pre>
    );
}
