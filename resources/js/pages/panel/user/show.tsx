import DashboardHeader from "@/components/dashboard/header";
import { DeleteButton, EditButton } from "@/components/dashboard/responsive-list";
import { ConfirmDialog } from "@/components/dashboard/dialog";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, User } from "@/types";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";

export default function Show({ user }: { user: User }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Panel',
            href: route('panel'),
        },
        {
            title: 'Users',
            href: route('panel.user.index'),
        },
        {
            title: user.name,
            href: route('panel.user.show', user.id),
        },
    ];
    const [deleteDialog, setDeleteDialog] = useState<boolean>(false);

    const openDeleteDialog = () => {
        setDeleteDialog(true);
    };

    const deleteUser = () => {
        router.delete(route('panel.user.destroy', { user }), {
            onSuccess: () => {
                setDeleteDialog(false);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Show User" />

            <DashboardHeader title="Show User" />

            <div className="container mx-auto px-4 py-8">
                <div className="shadow-md rounded-lg p-6">
                    <h2 className="text-lg font-medium mb-4">User Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <p className="text-sm text-gray-500">Name</p>
                            <p className="text-base font-medium">{user.name}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="text-base font-medium">{user.email}</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="text-sm text-gray-500">Role</p>
                        <p className="text-base font-medium">{user.role ? 'User' : 'Admin'}</p>
                    </div>
                    <div className="mt-4">
                        <p className="text-sm text-gray-500">Created At</p>
                        <p className="text-base font-medium">{user.created_at}</p>
                    </div>
                    <div className="mt-4">
                        <p className="text-sm text-gray-500">Updated At</p>
                        <p className="text-base font-medium">{user.updated_at}</p>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                        <EditButton href={route('panel.user.edit', user.id)} />
                        {user.role !== 0 && <DeleteButton onClick={openDeleteDialog} />}
                    </div>
                </div>
            </div>
            <ConfirmDialog
                isOpen={deleteDialog}
                onOpenChange={setDeleteDialog}
                onDelete={deleteUser}
                processing={false}
                model="user"
            />
        </AppLayout>
    );
}
