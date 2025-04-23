import AppLayout from "@/layouts/app-layout";
import { Head, router } from "@inertiajs/react";
import DashboardHeader from "@/components/dashboard/header";
import { BreadcrumbItem, Product } from "@/types";
import { ActionCell, ActionHeaderCell, AutoHeaderCell, AutoInfoCell, EditButton, ImageCell, ListHeader, ResponsiveList, SmallHeaderCell, WideHeaderCell, WideInfoCell, ShowButton, DeleteButton } from "@/components/dashboard/responsive-list";
import { ListItem, SmallInfoCell, CheckboxCell } from "@/components/dashboard/responsive-list";
import dayjs from "dayjs";
import { useState } from "react";
import { ConfirmDialog, ImageDialog } from "@/components/dashboard/dialog";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Panel',
        href: route('panel'),
    },
    {
        title: 'Product',
        href: route('panel.product.index'),
    },
];

export default function Index({ products }: { products: Product[] }) {
    const [deleteDialog, setDeleteDialog] = useState<Partial<{
        open: boolean;
        processing: boolean;
        id: number | null;
    }>>({
        open: false,
        processing: false,
        id: null,
    });

    const openDeleteDialog = (id: number) => {
        setDeleteDialog({
            open: true,
            processing: false,
            id,
        });
    };

    const deleteProduct = () => {
        router.delete(route('panel.product.destroy', { product: deleteDialog.id }), {
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

    const openImageDialog = (product: Product) => {
        setImageDialog({
            open: true,
            product,
        });
    };
    
    const [imageDialog, setImageDialog] = useState<Partial<{
        open: boolean;
        product: Product | null;
    }>>({
        open: false,
        product: null,
    });
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products List" />

            <DashboardHeader
                title="Products List"
                href={route('panel.product.create')}
            />

            <ResponsiveList>
                <ListHeader>
                    <SmallHeaderCell>ID</SmallHeaderCell>
                    <SmallHeaderCell>Active</SmallHeaderCell>
                    <SmallHeaderCell>Image</SmallHeaderCell>
                    <AutoHeaderCell>Name</AutoHeaderCell>
                    <AutoHeaderCell>Slug</AutoHeaderCell>
                    <WideHeaderCell>Category</WideHeaderCell>
                    <WideHeaderCell>Brand</WideHeaderCell>
                    <WideHeaderCell>Created At</WideHeaderCell>
                    <WideHeaderCell>Updated At</WideHeaderCell>
                    <ActionHeaderCell>Actions</ActionHeaderCell>
                </ListHeader>

                {products.map((product) => (
                    <ListItem key={product.id}>
                        <SmallInfoCell label="ID" value={product.id.toString()} />
                        <CheckboxCell checked={!!product.is_active} onClick={() => { router.put(route('panel.product.update', { product: product.id }), { is_active: !product.is_active})}} />
                        <ImageCell image={product.image} onClick={() => openImageDialog(product)} />
                        <AutoInfoCell label="Name" value={product.name} />
                        <AutoInfoCell label="Slug" value={product.slug} />
                        <WideInfoCell label="Category" value={product.category?.name || 'None'} />
                        <WideInfoCell label="Brand" value={product.brand?.name || 'None'} />
                        <WideInfoCell label="Created At" value={dayjs(new Date(product.created_at)).format('YYYY/MM/DD H:m')} />
                        <WideInfoCell label="Updated At" value={dayjs(new Date(product.updated_at)).format('YYYY/MM/DD H:m')} />
                        <ActionCell>
                            <ShowButton href={route('panel.product.show', {product})} />
                            <EditButton href={route('panel.product.edit', {product})} />
                            <DeleteButton onClick={() => openDeleteDialog(product.id)} />
                        </ActionCell>
                    </ListItem>
                ))}
            </ResponsiveList>

            <ConfirmDialog
                isOpen={deleteDialog.open ?? false}
                onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}
                onDelete={deleteProduct}
                processing={deleteDialog.processing ?? false}
                model="product"
            />

            <ImageDialog
                isOpen={imageDialog.open ?? false}
                onOpenChange={(open) => setImageDialog({ ...imageDialog, open })}
                data={imageDialog.product ?? null}
                model="product"
            />
        </AppLayout>
    );
}