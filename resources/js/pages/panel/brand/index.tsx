import dayjs from 'dayjs';
import { useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { Brand, BreadcrumbItem } from "@/types";
import { Head, router } from "@inertiajs/react";
import DashboardHeader from "@/components/dashboard/header";
import { ActionHeaderCell, AutoHeaderCell, ListHeader, ResponsiveList, SmallHeaderCell, WideHeaderCell, ListItem, SmallInfoCell, AutoInfoCell, WideInfoCell, ActionCell, DeleteButton, EditButton, ShowButton, ImageCell } from "@/components/dashboard/responsive-list";
import { ConfirmDialog, ImageDialog } from '@/components/dashboard/dialog';

const breadcrumb: BreadcrumbItem[] =[
    {
        title: 'Panel',
        href: route('panel'),
    },
    {
        title: 'Brand',
        href: route('panel.brand.index'),
    },
];

export default function Index({ brands } : { brands: Brand[] }) {
    const [deleteDialog, setDeleteDialog] = useState<Partial<{
        open: boolean;
        id: number | null;
        processing: boolean;
    }>>({
        open: false,
        id: null,
        processing: false,
    });
    
    const [imageDialog, setImageDialog] = useState<Partial<{
        open: boolean;
        brand: Brand | null;
    }>>({
        open: false,
        brand: null,
    });

    const deleteBrand = (): void => {
        setDeleteDialog({ processing: true });
        router.delete(route('panel.brand.destroy', { brand: deleteDialog.id }), {
            preserveScroll: true,
            onSuccess: () => {
                setDeleteDialog({ processing: false, open: false, id: null });
            },
        });
    }

    const openDeleteDialog = (id: number): void => {
        setDeleteDialog({ open: true, id });
    }

    const openImageDialog = (brand: Brand): void => {
        setImageDialog({ open: true, brand });
    }

    return(
        <AppLayout breadcrumbs={breadcrumb}>
            <Head title="Brand List" />

            <DashboardHeader 
                title="Brand List" 
                href={route('panel.brand.create')} 
            />

            <ResponsiveList>
                <ListHeader>
                    <SmallHeaderCell>ID</SmallHeaderCell>
                    <SmallHeaderCell>Image</SmallHeaderCell>
                    <AutoHeaderCell>Name</AutoHeaderCell>
                    <WideHeaderCell>Created At</WideHeaderCell>
                    <WideHeaderCell>Updated At</WideHeaderCell>
                    <ActionHeaderCell>Actions</ActionHeaderCell>
                </ListHeader>

                {brands.map((brand) => (
                    <ListItem key={brand.id}>
                        <SmallInfoCell label="ID" value={brand.id.toString()} />
                        <ImageCell image={brand.image} onClick={() => openImageDialog(brand)} />
                        <AutoInfoCell label="Name" value={brand.name} />
                        <WideInfoCell label="Created At" value={dayjs(new Date(brand.created_at)).format('YYYY/MM/DD H:m')} />
                        <WideInfoCell label="Updated At" value={dayjs(new Date(brand.updated_at)).format('YYYY/MM/DD H:m')} />
                        <ActionCell> 
                            <ShowButton href={route('panel.brand.show', {brand})} />
                            <EditButton href={route('panel.brand.edit', {brand})} />
                            <DeleteButton onClick={() => openDeleteDialog(brand.id)} />
                        </ActionCell>
                    </ListItem>
                ))}  
            </ResponsiveList>

            <ConfirmDialog 
                isOpen={deleteDialog.open || false} 
                onOpenChange={(open) => setDeleteDialog({ open })} 
                onDelete={() => deleteBrand()} 
                processing={deleteDialog.processing || false} 
            />
            <ImageDialog 
                isOpen={imageDialog.open || false} 
                onOpenChange={(open) => setImageDialog({ open })} 
                data={imageDialog.brand || null} 
            />
        </AppLayout>
    );
}