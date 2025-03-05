import { DeleteBtn } from "@/components/buttons/delete-btn";
import { EditBtn } from "@/components/buttons/edit-btn";
import { DetailListItem } from "@/components/common/detail-list-item";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import { Employee, PageProps } from "@/types";
import { useState } from "react";

export default function EmployeeShow({
    employee,
    isDelete,
}: PageProps<{
    employee: Employee;
    isDelete: boolean;
}>) {
    const [openDelete, setOpenDelete] = useState(isDelete);

    return (
        <AuthenticatedLayout title="Employee Details">
            <Card className="w-full md:w-1/2">
                <CardHeader>
                    <CardTitle>Employee Info</CardTitle>
                </CardHeader>
                <CardContent>
                    <dl className="-my-3 divide-y divide-gray-100 text-sm">
                        <DetailListItem label="name" value={employee.name} />
                        <DetailListItem
                            label="location"
                            value={employee.location}
                        />
                        <DetailListItem label="role" value={employee.role} />
                        <DetailListItem
                            label="gender"
                            value={employee.gender}
                        />
                        <DetailListItem label="phone" value={employee.phone} />
                        <DetailListItem label="email" value={employee.email} />
                        <DetailListItem
                            label="address"
                            value={employee.address}
                        />
                        <DetailListItem
                            label="employed at"
                            value={employee.employedAt?.toString()}
                        />
                        <DetailListItem
                            label="resigned at"
                            value={employee.resignedAt?.toString()}
                        />
                    </dl>
                </CardContent>
                <Separator />
                <CardHeader>
                    <CardTitle>Emergency Contact</CardTitle>
                </CardHeader>
                <CardContent>
                    <dl className="-my-3 divide-y divide-gray-100 text-sm">
                        <DetailListItem label="name" value={employee.ecName} />
                        <DetailListItem
                            label="phone"
                            value={employee.ecPhone}
                        />
                        <DetailListItem
                            label="address"
                            value={employee.ecAddress}
                        />
                    </dl>
                </CardContent>
                <Separator />
                <CardHeader>
                    <CardTitle>User Account</CardTitle>
                </CardHeader>
                <CardContent>
                    {employee.userId === null ? (
                        <p>Not found.</p>
                    ) : (
                        <dl className="-my-3 divide-y divide-gray-100 text-sm">
                            <DetailListItem
                                label="login email"
                                value={employee.user?.email}
                            />
                        </dl>
                    )}
                </CardContent>
                <CardFooter className="flex flex-row justify-between">
                    <EditBtn
                        route={route("employees.edit", {
                            employee: employee,
                        })}
                    />
                    <DeleteBtn
                        route={route("employees.destroy", {
                            employee: employee,
                        })}
                        item={employee.name}
                        open={openDelete}
                        setOpen={setOpenDelete}
                    />
                </CardFooter>
            </Card>
        </AuthenticatedLayout>
    );
}
