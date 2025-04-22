import AppLayout from "@/layouts/app-layout";
import { Category, BreadcrumbItem } from "@/types";
import { Head, router } from "@inertiajs/react";
import dayjs from "dayjs";
import { EditButton, DeleteButton } from "@/components/dashboard/responsive-list";
import { useState } from "react";
import { ConfirmDialog } from "@/components/dashboard/dialog";
import DashboardHeader from "@/components/dashboard/header";
export default function Show({ category }: { category: Category }) {
    const breadcrumb: BreadcrumbItem[] =[
        {
            title: 'Panel',
            href: route('panel'),
        },
        {
            title: 'Category',
            href: route('panel.category.index'),
        },
        {
            title: category.name,
            href: route('panel.category.show', {category}),
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
    
    const deleteCategory = (): void => {
        setDeleteDialog({ processing: true });
        router.delete(route('panel.category.destroy', { category: category.id }), {
            preserveScroll: true,
            onSuccess: () => {
                setDeleteDialog({ processing: false, open: false });
            },
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumb}>
            <Head title="Category Show" />
            
            <DashboardHeader title={`Category ${category.name}`} />

            <div className="p-4">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <div className="text-sm font-medium">Name</div>
                        <div className="text-sm">{category.name}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-sm font-medium">Image</div>
                        <img src={category.image ? `/storage/${category.image}` : '/images/default-image.png'} alt={category.name} className="w-16 h-16 rounded-md" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-sm font-medium">Slug</div>
                        <div className="text-sm">{category.slug}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-sm font-medium">Parent</div>
                        <div className="text-sm">{category.parent ? category.parent.name : 'None'}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-sm font-medium">Is Active</div>
                        <div className="text-sm">{category.is_active ? 'Yes' : 'No'}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-sm font-medium">Created At</div>
                        <div className="text-sm">{dayjs(category.created_at).format('YYYY/MM/DD H:m')}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-sm font-medium">Updated At</div>
                        <div className="text-sm">{dayjs(category.updated_at).format('YYYY/MM/DD H:m')}</div>
                    </div>
                    <div className="flex gap-2">
                        <EditButton href={route('panel.category.edit', {category})} />
                        <DeleteButton onClick={openDeleteDialog} />
                    </div>
                </div>
            </div>

            <ConfirmDialog 
                isOpen={deleteDialog.open || false} 
                onOpenChange={(open) => setDeleteDialog({ open })} 
                onDelete={() => deleteCategory()} 
                processing={deleteDialog.processing || false} 
            />
        </AppLayout>
    );
}
