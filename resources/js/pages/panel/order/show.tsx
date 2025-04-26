import DashboardHeader from "@/components/dashboard/header";
import { DeleteButton } from "@/components/dashboard/responsive-list";
import { EditButton } from "@/components/dashboard/responsive-list";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, Order } from "@/types";
import { useState } from "react";
import { ConfirmDialog } from "@/components/dashboard/dialog";
import { router } from "@inertiajs/react";

export default function Show({ order }: { order: Order }) {
    const [deleteDialog, setDeleteDialog] = useState<boolean>(false);

    const openDeleteDialog = () => {
        setDeleteDialog(true);
    };

    const deleteOrder = () => {
        router.delete(route('panel.order.destroy', { order }), {
            onSuccess: () => {
                setDeleteDialog(false);
            },
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            'title' : 'Panel',
            'href' : route('panel')
        },
        {
            'title' : 'Order',
            'href' : route('panel.order.index')
        },
        {
            'title' : `ID ${order.id}`,
            'href' : route('panel.order.show', { order })
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <DashboardHeader title={`${order.user?.name} Order ID ${order.id}`} />

            <div className="container mx-auto px-4 py-8">
                <div className="shadow-md rounded-lg p-6">
                    <h2 className="text-lg font-medium mb-4">Order Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <p className="text-sm text-gray-500">Order ID</p>
                            <p className="text-base font-medium">{order.id}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm text-gray-500">User</p>
                            <p className="text-base font-medium">{order.user?.name}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm text-gray-500">Total</p>
                            <p className="text-base font-medium">{order.total}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm text-gray-500">Status</p>
                            <p className="text-base font-medium">{order.status}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm text-gray-500">Description</p>
                            <p className="text-base font-medium">{order.description}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm text-gray-500">Products</p>
                            <div className="flex flex-wrap gap-2">
                                {order.products?.map((product) => (
                                    <div key={product.id} className="bg-gray-100 p-2 rounded-md">
                                        <p className="text-sm text-gray-500">{product.name}</p>
                                        <p className="text-sm text-gray-500">{product.pivot?.price}</p>
                                        <p className="text-sm text-gray-500">{product.pivot?.quantity}</p>
                                        <p className="text-sm text-gray-500">{product.pivot?.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm text-gray-500">Created At</p>
                            <p className="text-base font-medium">{order.created_at}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm text-gray-500">Updated At</p>
                            <p className="text-base font-medium">{order.updated_at}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm text-gray-500">Actions</p>
                            <div className="flex flex-wrap gap-2">
                                <EditButton href={route('panel.order.edit', { order })} />
                                <DeleteButton onClick={openDeleteDialog} />
                            </div>
                        </div>

                        <ConfirmDialog
                            isOpen={deleteDialog}
                            onOpenChange={setDeleteDialog}
                            onDelete={deleteOrder}
                            processing={false}
                            model="order"
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
