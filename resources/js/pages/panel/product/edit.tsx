import DashboardHeader from "@/components/dashboard/header";
import { FileInput, Form, FormContainer, TextInput, CheckboxInput, ProgressBar, SelectInput } from "@/components/form";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AppLayout from "@/layouts/app-layout";
import { Category, Brand, BreadcrumbItem, Product } from "@/types";
import { Textarea } from "@/components/ui/textarea";
import { Head } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";

interface ProductForm {
    name: string;
    slug: string;
    sku: string;
    category_id: number | null;
    brand_id: number | null;
    image: File | null;
    description: string;
    price: string;
    discount_price: string;
    stock: string;
    is_active: boolean;
    _method: 'PUT';
}

export default function Edit({ product, categories, brands }: { product: Product, categories: Category[], brands: Brand[] }) {
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
        {
            title: 'Edit',
            href: route('panel.product.edit', { product: product.id }),
        },
    ];

    const { data, setData, post, errors, processing, progress } = useForm<Required<ProductForm>>({
        name: product.name,
        slug: product.slug,
        sku: product.sku,
        category_id: product.category_id,
        brand_id: product.brand_id,
        image: null,
        description: product.description,
        price: product.price.toString(),
        discount_price: product.discount_price.toString(),
        stock: product.stock.toString(),
        is_active: product.is_active,
        _method: 'PUT',
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('panel.product.update', { product: product.id }), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Product" />

            <DashboardHeader
                title="Edit Product"
            />

            <FormContainer className="mb-4">
                <Form onSubmit={submit}>
                    <TextInput label="Name" name="name" value={data.name} onChange={e => setData('name', e.target.value)} errors={errors.name} autoFocus />

                    <TextInput label="Slug" name="slug" value={data.slug} onChange={e => setData('slug', e.target.value)} errors={errors.slug} />

                    <TextInput label="SKU" name="sku" value={data.sku} onChange={e => setData('sku', e.target.value)} errors={errors.sku} />

                    <SelectInput
                        label="Category"
                        name="category_id"
                        value={data.category_id?.toString() ?? ''}
                        options={categories.map((category) => ({
                            label: category.name,
                            value: category.id.toString(),
                        }))}
                        onChange={(e) => setData('category_id', parseInt(e))}
                        errors={errors.category_id}
                    />

                    <SelectInput
                        label="Brand"
                        name="brand_id"
                        value={data.brand_id?.toString() ?? ''}
                        options={brands.map((brand) => ({
                            label: brand.name,
                            value: brand.id.toString(),
                        }))}
                        onChange={(e) => setData('brand_id', parseInt(e))}
                        errors={errors.brand_id}
                    />
                    
                    <FileInput label="Image" name="image" onChange={e => setData('image', e.target.files?.[0] ?? null)} errors={errors.image} />

                    <div className="flex flex-col gap-2">
                        <Label>Description</Label>
                        <Textarea
                            name="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        />
                        <InputError message={errors.description} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Price</Label>
                        <Input
                            name="price"
                            type="number"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                        />
                        <InputError message={errors.price} />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <Label>Discount Price</Label>
                        <Input
                            name="discount_price"
                            type="number"
                            value={data.discount_price}
                            onChange={(e) => setData('discount_price', e.target.value)}
                        />
                        <InputError message={errors.discount_price} />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <Label>Stock</Label>
                        <Input
                            name="stock"
                            type="number"
                            value={data.stock}
                            onChange={(e) => setData('stock', e.target.value)}
                        />
                        <InputError message={errors.stock} />
                    </div>

                    <CheckboxInput label="Is Active" name="is_active" checked={!!data.is_active} onChange={() => setData('is_active', !data.is_active)} />

                    {progress && <ProgressBar progress={progress.percentage ?? 0} />}

                    <Button disabled={processing} className="cursor-pointer mt-4 w-full">{processing ? 'Updating ...' : 'Update'}</Button>
                </Form>
            </FormContainer>
        </AppLayout>
    );
}
