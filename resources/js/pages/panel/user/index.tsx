import { ListHeader, ResponsiveList, SmallHeaderCell, AutoHeaderCell, ActionHeaderCell, WideHeaderCell, ListItem, SmallInfoCell, AutoInfoCell, WideInfoCell, ActionCell, EditButton, DeleteButton, ShowButton } from "@/components/dashboard/responsive-list";
import AppLayout from "@/layouts/app-layout";
import { Head, router } from "@inertiajs/react";
import { BreadcrumbItem, User } from "@/types";
import DashboardHeader from "@/components/dashboard/header";
import { useState } from "react";
import { ConfirmDialog } from "@/components/dashboard/dialog";
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Panel',
        href: route('panel'),
    },
    {
        title: 'Users',
        href: route('panel.user.index'),
    },
];

export default function Index({ users }: { users: User[] }) {
    const [deleteDialog, setDeleteDialog] = useState<Partial<{
        open: boolean;
        id: number | null;
        processing: boolean;
    }>>({
        open: false,
        id: null,
        processing: false,
    });

    const deleteUser = (): void => {
        setDeleteDialog({ processing: true });
        router.delete(route('panel.user.destroy', { user: deleteDialog.id }), {
            preserveScroll: true,
            onSuccess: () => {
                setDeleteDialog({ processing: false, open: false, id: null });
            },
        });
    }

    const openDeleteDialog = (id: number): void => {
        setDeleteDialog({ open: true, id });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User List" />

            <DashboardHeader title="User List" href={route('panel.user.create')} />

            <ResponsiveList>
                <ListHeader>
                    <SmallHeaderCell>ID</SmallHeaderCell>
                    <AutoHeaderCell>Name</AutoHeaderCell>
                    <AutoHeaderCell>Email</AutoHeaderCell>
                    <WideHeaderCell>Role</WideHeaderCell>
                    <ActionHeaderCell>Actions</ActionHeaderCell>
                </ListHeader>

                {users.map((user) => (
                    <ListItem key={user.id}>
                        <SmallInfoCell label="ID" value={user.id.toString()} />
                        <AutoInfoCell label="Name" value={user.name} />
                        <AutoInfoCell label="Email" value={user.email} />
                        <WideInfoCell label="Role" value={user.role? 'User' : 'Admin'} />
                        <ActionCell>
                            <ShowButton href={route('panel.user.show', user.id)} />
                            <EditButton href={route('panel.user.edit', user.id)} />
                            {user.role !== 0 && <DeleteButton onClick={() => openDeleteDialog(user.id)} />}
                        </ActionCell>
                    </ListItem>
                ))}
            </ResponsiveList>

            
            <ConfirmDialog 
                isOpen={deleteDialog.open || false} 
                onOpenChange={(open) => setDeleteDialog({ open })} 
                onDelete={() => deleteUser()} 
                processing={deleteDialog.processing || false} 
                model="user"
            />
        </AppLayout>
    );
}
