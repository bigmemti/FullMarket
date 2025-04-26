import AppLayout from "@/layouts/app-layout";
import DashboardHeader from "@/components/dashboard/header";
import { Head, useForm } from "@inertiajs/react";
import { Form, FormContainer, NumberInput, SelectInput, TextareaInput } from "@/components/form";
import { FormEventHandler, useEffect } from "react";
import { BreadcrumbItem, Product, User } from "@/types";
import { Button } from "@/components/ui/button";
import { v4 as uuid } from 'uuid';  

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
        'title' : 'Create',
        'href' : route('panel.order.create')
    },
];

interface OrderForm{
    user_id: number | null;
    status: number | null;
    total: number | null;
    products: {
        product_id: number | null;
        quantity: number | null;
        price: number | null;
        description: string | null;
        _key: string;
    }[];
    description: string | null;
}

const orderStatuses = [
    { label: 'Cart', value: 0 },
    { label: 'Success', value: 1 },
    { label: 'Failed', value: 2 },
];

export default function Create({ products, users }: { products: Product[], users: User[] }) {
    const { post, data, setData, errors, processing } = useForm<Required<OrderForm>>({
        user_id: null,
        status: null,
        total: null,
        description: null,
        products: [],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('panel.order.store'), {
            onError: () => {
                console.log(errors);
            },
        });
    }

    useEffect(() => {
        const total = data.products.reduce((acc, item) => {
          const quantity = item.quantity ?? 0;
          const price = item.price ?? 0;
          return acc + (price * quantity);
        }, 0);
      
        setData('total', total ?? null);
      }, [data.products, setData]);

      const removeProductAtIndex = (index: number) => {
        const updated = [...data.products];
        updated.splice(index, 1);
        setData('products', updated);
      };
      
      
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Order" />

            <DashboardHeader title="Create Order" />

            <FormContainer className="!w-full px-12">
                <Form onSubmit={submit}>
                    <SelectInput 
                        label="User" 
                        name="user_id" 
                        value={data.user_id?.toString() ?? ''} 
                        onChange={(e) => setData('user_id', parseInt(e))} 
                        errors={errors.user_id} 
                        options={users.map((user) => ({ label: user.name, value: user.id.toString() }))} 
                    />

                    <SelectInput 
                        label="Status" 
                        name="status" 
                        value={data.status?.toString() ?? ''} 
                        onChange={(e) => setData('status', parseInt(e))} 
                        errors={errors.status} 
                        options={orderStatuses.map((status) => ({ label: status.label, value: status.value.toString() }))} 
                    />

                    <Button className="w-full" type="button" onClick={() => setData('products', [...data.products, { product_id: null, quantity: null, price: null, description: null, _key: uuid() }])}>Add Product</Button>

                    {errors.products && <div className="text-red-500">{errors.products}</div>}

                    {data.products.map((product, index) => (
                        <div className="flex gap-2 justify-between items-center" key={product._key}>
                            <SelectInput 
                                className="flex-auto"
                                label={`Product`} 
                                name={`products[${index}]`} 
                                value={product.product_id?.toString() ?? ''} 
                                onChange={(e) => {
                                    const productId = parseInt(e);
                                    const selectedProduct = products.find(p => p.id === productId);
                                    setData({ 
                                        ...data, 
                                        products: data.products.map((p, i) => 
                                            i === index ? { 
                                                ...p, 
                                                product_id: productId,
                                                price: selectedProduct ? selectedProduct.price : null
                                            } : p
                                        ) 
                                    });
                                }} 
                                errors={errors[`products.${index}.product_id` as keyof typeof errors] as string} 
                                options={products.map((p) => ({ label: p.name, value: p.id.toString() }))} 
                            />

                            <NumberInput 
                                label={`Price`} 
                                name={`products[${index}].price`} 
                                value={product.price ?? null} 
                                onChange={(e) => setData({ ...data, products: data.products.map((p, i) => i === index ? { ...p, price: parseInt(e.target.value) } : p) })} 
                                errors={errors[`products.${index}.price` as keyof typeof errors] as string} 
                            />

                            <NumberInput 
                                label={`Quantity`} 
                                name={`products[${index}].quantity`} 
                                value={product.quantity ?? null} 
                                onChange={(e) => setData({ ...data, products: data.products.map((p, i) => i === index ? { ...p, quantity: parseInt(e.target.value) } : p) })} 
                                errors={errors[`products.${index}.quantity` as keyof typeof errors] as string} 
                            />

                            <TextareaInput 
                                label={`Description`} 
                                name={`products[${index}].description`} 
                                value={product.description ?? ''} 
                                onChange={(e) => setData({ ...data, products: data.products.map((p, i) => i === index ? { ...p, description: e.target.value } : p) })} 
                                errors={errors[`products.${index}.description` as keyof typeof errors] as string} 
                            />

                            <Button type="button" onClick={() => removeProductAtIndex(index)}>Remove Product</Button>
                        </div>
                    ))}

                    <TextareaInput 
                        label={`Description`} 
                        name={`description`} 
                        value={data.description ?? ''} 
                        onChange={(e) => setData(`description`, e.target.value)} 
                        errors={errors.description} 
                    />

                    <NumberInput 
                        label={`Total`} 
                        name={`total`} 
                        value={data.total ?? null} 
                        onChange={(e) => setData(`total`, parseInt(e.target.value))} 
                        errors={errors.total} 
                    />

                    <Button className="w-full" type="submit" disabled={processing}>{processing ? 'Processing...' : 'Create Order'}</Button>
                </Form>
            </FormContainer>
        </AppLayout>
    )
}
