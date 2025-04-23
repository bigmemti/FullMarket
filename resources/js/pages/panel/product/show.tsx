import AppLayout from "@/layouts/app-layout";
import { Head, router } from "@inertiajs/react";
import { BreadcrumbItem, Product } from "@/types";
import DashboardHeader from "@/components/dashboard/header";
import { EditButton } from "@/components/dashboard/responsive-list";
import { ConfirmDialog } from "@/components/dashboard/dialog";
import { DeleteButton } from "@/components/dashboard/responsive-list";
import dayjs from "dayjs";
import { useState } from "react";

export default function Show({ product }: { product: Product }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Panel',
            href: route('panel'),
        },
        {
            title: 'Product',
            href: route('panel.product.index'),
        },
        {
            title: product.name,
            href: route('panel.product.show', { product: product.id }),
        },
    ];

    const [deleteDialog, setDeleteDialog] = useState<Partial<{
        open: boolean;
        processing: boolean;
        id: number | null;
    }>>({
        open: false,
        processing: false,
        id: null,
    });

    const openDeleteDialog = (): void => {
        setDeleteDialog({
            open: true,
            processing: false,
            id: product.id,
        });
    };

    const deleteProduct = (): void => {
        router.delete(route('panel.product.destroy', { product: product.id }), {
            preserveScroll: true,
            onSuccess: () => {
                setDeleteDialog({
                    open: false,
                    processing: false,
                    id: null,
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product" />

            <DashboardHeader
                title={product.name}
            />

            <div className="p-4">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <div className="text-sm font-medium">ID</div>
                        <div className="text-sm">{product.id}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-sm font-medium">Name</div>
                        <div className="text-sm">{product.name}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-sm font-medium">Image</div>
                        <img src={product.image ? `/storage/${product.image}` : '/images/default-image.png'} alt={product.name} className="w-16 h-16 rounded-md" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-sm font-medium">Slug</div>
                        <div className="text-sm">{product.slug}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-sm font-medium">SKU</div>
                        <div className="text-sm">{product.sku}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-sm font-medium">Brand</div>
                        <div className="text-sm">{product.brand ? product.brand.name : 'None'}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-sm font-medium">Category</div>
                        <div className="text-sm">{product.category ? product.category.name : 'None'}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-sm font-medium">Description</div>
                        <div className="text-sm">{product.description}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-sm font-medium">Price</div>
                        <div className="text-sm">{product.price}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-sm font-medium">Discount Price</div>
                        <div className="text-sm">{product.discount_price}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-sm font-medium">Stock</div>
                        <div className="text-sm">{product.stock}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-sm font-medium">Is Active</div>
                        <div className="text-sm">{product.is_active ? 'Yes' : 'No'}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-sm font-medium">Created At</div>
                        <div className="text-sm">{dayjs(product.created_at).format('YYYY/MM/DD H:m')}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-sm font-medium">Updated At</div>
                        <div className="text-sm">{dayjs(product.updated_at).format('YYYY/MM/DD H:m')}</div>
                    </div>
                    <div className="flex gap-2">
                        <EditButton href={route('panel.product.edit', {product})} />
                        <DeleteButton onClick={openDeleteDialog} />
                    </div>
                </div>
            </div>

            <ConfirmDialog 
                isOpen={deleteDialog.open || false} 
                onOpenChange={(open) => setDeleteDialog({ open })} 
                onDelete={() => deleteProduct()} 
                processing={deleteDialog.processing || false} 
                model="product"
            />
        </AppLayout>
    );
}
