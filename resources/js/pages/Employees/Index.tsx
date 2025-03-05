import { CreateBtn } from "@/components/buttons/create-btn";
import { DataTable, DataTableActions } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import { Employee, PageProps } from "@/types";
import { Link } from "@inertiajs/react";
import { Checkbox } from "@radix-ui/react-checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

export const columns: ColumnDef<Employee>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <Link
                className="text-link"
                href={route("employees.show", {
                    employee: row.original.id,
                })}
            >
                {row.getValue("name")}
            </Link>
        ),
    },
    {
        accessorKey: "location",
        header: "Location",
        cell: ({ row }) => <div className="">{row.getValue("location")}</div>,
    },
    {
        accessorKey: "gender",
        header: "Gender",
        cell: ({ row }) => <div className="">{row.getValue("gender")}</div>,
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => <div className="">{row.getValue("role")}</div>,
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => <div className="">{row.getValue("email")}</div>,
    },
    {
        accessorKey: "phone",
        header: "Phone",
        cell: ({ row }) => <div className="">{row.getValue("phone")}</div>,
    },
    {
        accessorKey: "address",
        header: "Address",
        cell: ({ row }) => <div className="">{row.getValue("address")}</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const param = { employee: row.original.id };

            return (
                <DataTableActions routePrefix="employees" routeParam={param} />
            );
        },
    },
];

export default function EmployeeList({
    employees,
    message,
}: PageProps<{
    employees: Employee[];
    message?: string;
}>) {
    useEffect(() => {
        if (message) toast.info(message);
    }, [message]);
    return (
        <AuthenticatedLayout title="Employee List">
            <div className="flex flex-row justify-between">
                <h1 className="text-xl font-semibold">Employee List</h1>
                <CreateBtn route={route("employees.create")} />
                {/* <ExportBtn route={route("employees.export")} /> */}
            </div>
            {/* <Separator /> */}
            <DataTable data={employees} columns={columns} />
        </AuthenticatedLayout>
    );
}
