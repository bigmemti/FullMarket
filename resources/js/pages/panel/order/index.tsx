
import DashboardHeader from "@/components/dashboard/header";
import AppLayout from "@/layouts/app-layout";
import { ActionCell, ActionHeaderCell, AutoHeaderCell, AutoInfoCell, DeleteButton, EditButton, ListHeader, ListItem, ShowButton, SmallHeaderCell, SmallInfoCell, WideCell, WideHeaderCell, WideInfoCell } from "@/components/dashboard/responsive-list";
import { ResponsiveList } from "@/components/dashboard/responsive-list";
import { Order } from "@/types";
import { useState } from "react";
import { ConfirmDialog } from "@/components/dashboard/dialog";
import { Head, router } from "@inertiajs/react";
import { BreadcrumbItem } from "@/types";
import dayjs from "dayjs";
import { SelectInput } from "@/components/form";

const breadcrumbs: BreadcrumbItem[] = [
    {
        'title' : 'Panel',
        'href' : route('panel')
    },
    {
        'title' : 'Order',
        'href' : route('panel.order.index')
    },
];

export default function Index({ orders }: { orders: Order[] }) {
    const [deleteDialog, setDeleteDialog] = useState<Partial<{
        open: boolean;
        id: number | null;
        processing: boolean;
    }>>({
        open: false,
        id: null,
        processing: false,
    });

    const deleteOrder = (): void => {
        setDeleteDialog({ processing: true });
        router.delete(route('panel.order.destroy', { order: deleteDialog.id }), {
            preserveScroll: true,
            onSuccess: () => {
                setDeleteDialog({ processing: false, open: false, id: null });
            },
        });
    }

    const openDeleteDialog = (id: number): void => {
        setDeleteDialog({ open: true, id });
    }

    const orderStatuses = [
        { label: 'Cart', value: 0 },
        { label: 'Success', value: 1 },
        { label: 'Failed', value: 2 },
    ];

    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Order List" />

            <DashboardHeader title="Order List" href={route('panel.order.create')} />

            <ResponsiveList>
                <ListHeader>
                    <SmallHeaderCell>ID</SmallHeaderCell>
                    <AutoHeaderCell>User</AutoHeaderCell>
                    <WideHeaderCell>Total</WideHeaderCell>
                    <WideHeaderCell>Status</WideHeaderCell>
                    <WideHeaderCell>Created At</WideHeaderCell>
                    <WideHeaderCell>Updated At</WideHeaderCell>
                    <ActionHeaderCell>Actions</ActionHeaderCell>
                </ListHeader>

                {orders.map((order) => (
                    <ListItem key={order.id}>
                        <SmallInfoCell label="ID" value={order.id.toString()} />
                        <AutoInfoCell label="User" value={order.user?.name ?? ''} />
                        <WideInfoCell label="Total" value={order.total.toString()} />
                        <WideCell>
                            <SelectInput 
                                className="w-full p-2 border rounded"
                                value={order.status.toString()}
                                onChange={(e) => router.put(route('panel.order.update', { order: order.id }), {status: parseInt(e)}, {preserveScroll: true})}
                                options={orderStatuses.map((status) => ({ label: status.label, value: status.value.toString() }))}
                                errors={undefined}
                            />
                        </WideCell>
                        <WideInfoCell label="Created At" value={dayjs(new Date(order.created_at)).format('YYYY/MM/DD H:m')} />
                        <WideInfoCell label="Updated At" value={dayjs(new Date(order.updated_at)).format('YYYY/MM/DD H:m')} />
                        <ActionCell>
                            <ShowButton href={route('panel.order.show', { order })} />
                            <EditButton href={route('panel.order.edit', { order })} />
                            <DeleteButton onClick={() => openDeleteDialog(order.id)} />
                        </ActionCell>
                    </ListItem>
                ))}
            </ResponsiveList>


            <ConfirmDialog 
                isOpen={deleteDialog.open || false} 
                onOpenChange={(open) => setDeleteDialog({ open })} 
                onDelete={() => deleteOrder()} 
                processing={deleteDialog.processing || false} 
                model="order"
            />
        </AppLayout>
    )
}
