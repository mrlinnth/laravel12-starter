import { FormGrid } from "@/components/common/form-grid";
import InputError from "@/components/InputError";
import DatePicker from "@/components/inputs/date-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import { Employee } from "@/types";
import { useForm } from "@inertiajs/react";
import React, { FormEventHandler } from "react";

export default function EmployeeCreate({
    locations,
    genders,
    roles,
}: {
    locations: [];
    genders: [];
    roles: [];
}) {
    const [createUser, setCreateUser] = React.useState(false);

    const { data, setData, post, reset, errors, processing } =
        useForm<Employee>({
            name: "",
            location: "",
            gender: "",
            role: "",
            phone: "",
            email: "",
            address: "",
            employedAt: undefined,
            resignedAt: undefined,
            ecName: "",
            ecPhone: "",
            ecAddress: "",
            userEmail: "",
            userPassword: "",
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("employees.store"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };
    return (
        <AuthenticatedLayout title="Create Employee">
            <h2 className="text-2xl font-bold tracking-tight">
                Create Employee
            </h2>
            <Separator />
            <form onSubmit={submit} className="">
                <FormGrid
                    title="Employee Info"
                    description="Lorem ipsum dolor sit amet consectetur adipisicing
                            elit."
                >
                    <div className="space-y-6">
                        <div className="grid grid-flow-row gap-2">
                            <Label htmlFor="name">Name*</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                                placeholder="Moe Moe"
                                autoFocus={true}
                            />
                            <InputError
                                className="mt-2"
                                message={errors.name}
                            />
                        </div>
                        <div className="grid grid-flow-row gap-2">
                            <Label htmlFor="role">Location*</Label>
                            <Select
                                value={data.location}
                                onValueChange={(v) => setData("location", v)}
                            >
                                <SelectTrigger className="">
                                    <SelectValue placeholder="Select location" />
                                </SelectTrigger>
                                <SelectContent className="max-h-60">
                                    {locations.map((item: string) => (
                                        <SelectItem value={item} key={item}>
                                            {item}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError
                                className="mt-2"
                                message={errors.location}
                            />
                        </div>
                        <div className="grid grid-flow-row gap-2">
                            <Label htmlFor="gender">Gender*</Label>
                            <RadioGroup
                                defaultValue={data.gender}
                                onValueChange={(v) => setData("gender", v)}
                                className="flex gap-4"
                            >
                                {genders.map((item: string) => (
                                    <div
                                        key={item}
                                        className="flex items-center space-x-2"
                                    >
                                        <RadioGroupItem
                                            value={item}
                                            id={item}
                                        />
                                        <Label htmlFor={item}>{item}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                            <InputError
                                className="mt-2"
                                message={errors.gender}
                            />
                        </div>
                        <div className="grid grid-flow-row gap-2">
                            <Label htmlFor="role">Role*</Label>
                            <Select
                                value={data.role}
                                onValueChange={(v) => setData("role", v)}
                            >
                                <SelectTrigger className="">
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent className="max-h-60">
                                    {roles.map((item: string) => (
                                        <SelectItem value={item} key={item}>
                                            {item}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError
                                className="mt-2"
                                message={errors.role}
                            />
                        </div>
                        <div className="grid grid-flow-row gap-2">
                            <Label htmlFor="phone">Phone*</Label>
                            <Input
                                id="phone"
                                value={data.phone}
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                                required
                                type="tel"
                                placeholder="09123456789"
                            />
                            <InputError
                                className="mt-2"
                                message={errors.phone}
                            />
                        </div>
                        <div className="grid grid-flow-row gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                type="email"
                                placeholder="customer@mail.com"
                            />
                            <InputError
                                className="mt-2"
                                message={errors.email}
                            />
                        </div>
                        <div className="grid grid-flow-row gap-2">
                            <Label htmlFor="address">Address*</Label>
                            <Textarea
                                id="address"
                                value={data.address}
                                onChange={(e) =>
                                    setData("address", e.target.value)
                                }
                                required
                                placeholder="No. 1A, 3 Street, EFG Township, X City"
                            />
                            <InputError
                                className="mt-2"
                                message={errors.address}
                            />
                        </div>
                        <div className="grid grid-flow-col gap-2">
                            <div className="grid grid-flow-row gap-2">
                                <Label htmlFor="employedAt">
                                    Employed Date
                                </Label>
                                <DatePicker
                                    date={data.employedAt}
                                    setDate={(v) => setData("employedAt", v)}
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.employedAt}
                                />
                            </div>
                            <div className="grid grid-flow-row gap-2">
                                <Label htmlFor="resignedAt">
                                    Resigned Date
                                </Label>
                                <DatePicker
                                    date={data.resignedAt}
                                    setDate={(v) => setData("resignedAt", v)}
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.resignedAt}
                                />
                            </div>
                        </div>
                    </div>
                </FormGrid>
                <Separator className="my-8" />
                <FormGrid title="Emergency Contact">
                    <div className="space-y-6">
                        <div className="grid grid-flow-row gap-2">
                            <Label htmlFor="ecName">Name*</Label>
                            <Input
                                id="ecName"
                                value={data.ecName}
                                onChange={(e) =>
                                    setData("ecName", e.target.value)
                                }
                                required
                                placeholder="Moe Moe"
                            />
                            <InputError
                                className="mt-2"
                                message={errors.ecName}
                            />
                        </div>
                        <div className="grid grid-flow-row gap-2">
                            <Label htmlFor="ecPhone">Phone*</Label>
                            <Input
                                id="ecPhone"
                                value={data.ecPhone}
                                onChange={(e) =>
                                    setData("ecPhone", e.target.value)
                                }
                                required
                                type="tel"
                                placeholder="09123456789"
                            />
                            <InputError
                                className="mt-2"
                                message={errors.ecPhone}
                            />
                        </div>
                        <div className="grid grid-flow-row gap-2">
                            <Label htmlFor="ecAddress">Address*</Label>
                            <Textarea
                                id="ecAddress"
                                value={data.ecAddress}
                                onChange={(e) =>
                                    setData("ecAddress", e.target.value)
                                }
                                required
                                placeholder="No. 1A, 3 Street, EFG Township, X City"
                            />
                            <InputError
                                className="mt-2"
                                message={errors.ecAddress}
                            />
                        </div>
                    </div>
                </FormGrid>
                <Separator className="my-8" />
                <FormGrid title="User Account">
                    <div className="space-y-6">
                        <div className="grid grid-flow-row gap-2">
                            <Label htmlFor="createUser">
                                Create a user account?
                            </Label>
                            <Switch
                                id="createUser"
                                checked={createUser}
                                onCheckedChange={setCreateUser}
                            />
                        </div>
                        {createUser && (
                            <div className="grid grid-flow-col gap-2">
                                <div className="grid grid-flow-row gap-2">
                                    <Label htmlFor="userEmail">
                                        Login Email*
                                    </Label>
                                    <Input
                                        id="userEmail"
                                        defaultValue={data.email}
                                        onChange={(e) =>
                                            setData("userEmail", e.target.value)
                                        }
                                        required
                                        placeholder="Enter an email to use for log in"
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.userEmail}
                                    />
                                </div>
                                <div className="grid grid-flow-row gap-2">
                                    <Label htmlFor="userPassword">
                                        Login Password*
                                    </Label>
                                    <Input
                                        id="userPassword"
                                        value={data.userPassword}
                                        onChange={(e) =>
                                            setData(
                                                "userPassword",
                                                e.target.value
                                            )
                                        }
                                        type="password"
                                        required
                                        placeholder="Enter a secure password"
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.userPassword}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </FormGrid>
                <Separator className="my-8" />
                <div className="flex justify-end gap-4">
                    <Button
                        variant="secondary"
                        type="reset"
                        disabled={processing}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={processing}>
                        Save
                    </Button>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
