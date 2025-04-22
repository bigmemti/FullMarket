import dayjs from 'dayjs';
import { useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { Category, BreadcrumbItem } from "@/types";
import { Head, router } from "@inertiajs/react";
import DashboardHeader from "@/components/dashboard/header";
import { ActionHeaderCell, AutoHeaderCell, ListHeader, ResponsiveList, SmallHeaderCell, WideHeaderCell, ListItem, SmallInfoCell, AutoInfoCell, WideInfoCell, ActionCell, DeleteButton, EditButton, ShowButton, ImageCell, CheckboxCell } from "@/components/dashboard/responsive-list";
import { ConfirmDialog, ImageDialog } from '@/components/dashboard/dialog';

const breadcrumb: BreadcrumbItem[] =[
    {
        title: 'Panel',
        href: route('panel'),
    },
    {
        title: 'Category',
        href: route('panel.category.index'),
    },
];

export default function Index({ categories } : { categories: Category[] }) {
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
        category: Category | null;
    }>>({
        open: false,
        category: null,
    });

    const deleteCategory = (): void => {
        setDeleteDialog({ processing: true });
        router.delete(route('panel.category.destroy', { category: deleteDialog.id }), {
            preserveScroll: true,
            onSuccess: () => {
                setDeleteDialog({ processing: false, open: false, id: null });
            },
        });
    }

    const openDeleteDialog = (id: number): void => {
        setDeleteDialog({ open: true, id });
    }

    const openImageDialog = (category: Category): void => {
        setImageDialog({ open: true, category });
    }

    return(
        <AppLayout breadcrumbs={breadcrumb}>
            <Head title="Category List" />

            <DashboardHeader 
                title="Category List" 
                href={route('panel.category.create')} 
            />

            <ResponsiveList>
                <ListHeader>
                    <SmallHeaderCell>ID</SmallHeaderCell>
                    <SmallHeaderCell>Active</SmallHeaderCell>
                    <SmallHeaderCell>Image</SmallHeaderCell>
                    <AutoHeaderCell>Name</AutoHeaderCell>
                    <AutoHeaderCell>Slug</AutoHeaderCell>
                    <WideHeaderCell>Parent</WideHeaderCell>
                    <WideHeaderCell>Created At</WideHeaderCell>
                    <WideHeaderCell>Updated At</WideHeaderCell>
                    <ActionHeaderCell>Actions</ActionHeaderCell>
                </ListHeader>

                {categories.map((category) => (
                    <ListItem key={category.id}> 
                        <SmallInfoCell label="ID" value={category.id.toString()} />
                        <CheckboxCell checked={!!category.is_active} onClick={() => { router.put(route('panel.category.update', { category: category.id }), { is_active: !category.is_active})}} />
                        <ImageCell image={category.image} onClick={() => openImageDialog(category)} />
                        <AutoInfoCell label="Name" value={category.name} />
                        <AutoInfoCell label="Slug" value={category.slug} />
                        <WideInfoCell label="Parent" value={category.parent?.name || 'None'} />
                        <WideInfoCell label="Created At" value={dayjs(new Date(category.created_at)).format('YYYY/MM/DD H:m')} /> 
                        <WideInfoCell label="Updated At" value={dayjs(new Date(category.updated_at)).format('YYYY/MM/DD H:m')} />
                        <ActionCell> 
                            <ShowButton href={route('panel.category.show', {category})} />
                            <EditButton href={route('panel.category.edit', {category})} />
                            <DeleteButton onClick={() => openDeleteDialog(category.id)} />
                        </ActionCell>
                    </ListItem>
                ))}  
            </ResponsiveList>

            <ConfirmDialog 
                isOpen={deleteDialog.open || false} 
                onOpenChange={(open) => setDeleteDialog({ open })} 
                onDelete={() => deleteCategory()} 
                processing={deleteDialog.processing || false} 
            />
            
            <ImageDialog 
                isOpen={imageDialog.open || false} 
                onOpenChange={(open) => setImageDialog({ open })} 
                data={imageDialog.category || null} 
            />
        </AppLayout>
    );
}