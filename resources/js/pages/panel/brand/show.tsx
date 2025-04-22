import AppLayout from "@/layouts/app-layout";
import { Brand, BreadcrumbItem } from "@/types";
import { Head, router } from "@inertiajs/react";
import dayjs from "dayjs";
import { EditButton, DeleteButton } from "@/components/dashboard/responsive-list";
import { useState } from "react";
import { ConfirmDialog } from "@/components/dashboard/dialog";
import DashboardHeader from "@/components/dashboard/header";
export default function Show({ brand }: { brand: Brand }) {
    const breadcrumb: BreadcrumbItem[] =[
        {
            title: 'Panel',
            href: route('panel'),
        },
        {
            title: 'Brand',
            href: route('panel.brand.index'),
        },
        {
            title: brand.name,
            href: route('panel.brand.show', {brand}),
        },
    ];

    const [deleteDialog, setDeleteDialog] = useState<Partial<{
        open: boolean;
        processing: boolean;
    }>>({
        open: false,
        processing: false,
    });
    
    const openDeleteDialog = (): void => {
        setDeleteDialog({ open: true });
    }
    
    const deleteBrand = (): void => {
        setDeleteDialog({ processing: true });
        router.delete(route('panel.brand.destroy', { brand: brand.id }), {
            preserveScroll: true,
            onSuccess: () => {
                setDeleteDialog({ processing: false, open: false });
            },
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumb}>
            <Head title="Brand Show" />
            
            <DashboardHeader title={`Brand ${brand.name}`} />

            <div className="p-4">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <div className="text-sm font-medium">Name</div>
                        <div className="text-sm">{brand.name}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-sm font-medium">Slug</div>
                        <div className="text-sm">{brand.slug}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-sm font-medium">Image</div>
                        <img src={brand.image ? `/storage/${brand.image}` : '/images/default-image.png'} alt={brand.name} className="w-16 h-16 rounded-md" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-sm font-medium">Active</div>
                        <div className="text-sm">{brand.is_active ? 'Yes' : 'No'}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-sm font-medium">Created At</div>
                        <div className="text-sm">{dayjs(brand.created_at).format('YYYY/MM/DD H:m')}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-sm font-medium">Updated At</div>
                        <div className="text-sm">{dayjs(brand.updated_at).format('YYYY/MM/DD H:m')}</div>
                    </div>
                    <div className="flex gap-2">
                        <EditButton href={route('panel.brand.edit', {brand})} />
                        <DeleteButton onClick={openDeleteDialog} />
                    </div>
                </div>
            </div>

            <ConfirmDialog 
                isOpen={deleteDialog.open || false} 
                onOpenChange={(open) => setDeleteDialog({ open })} 
                onDelete={() => deleteBrand()} 
                processing={deleteDialog.processing || false} 
            />
        </AppLayout>
    );
}
