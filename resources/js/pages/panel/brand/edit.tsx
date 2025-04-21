import { FileInput, TextInput, Form, FormContainer, ProgressBar } from "@/components/form";
import DashboardHeader from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { Brand, BreadcrumbItem } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";


export default function Edit({brand}: {brand: Brand}){
    const breadcrumbs: BreadcrumbItem[] = [
        {
            'title' : 'Panel',
            'href' : route('panel')
        },
        {
            'title' : 'Brand',
            'href' : route('panel.brand.index')
        },
        {
            'title' : brand.name,
            'href' : route('panel.brand.show', {brand: brand.id})
        },
        {
            'title' : 'Edit',
            'href' : route('panel.brand.edit', {brand: brand.id})
        },
    ];

    interface BrandForm {
        name: string;
        image: File | null;
        _method: string;
    }

    const { data, setData, post, errors, processing, progress } = useForm<Required<BrandForm>>({
        name: brand.name, 
        image: null,
        _method: 'PUT',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('panel.brand.update', {brand: brand.id}));
    }

    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Brand"/>
            <DashboardHeader title="Edit Brand" />
            <FormContainer>
                <Form onSubmit={submit}>
                    <TextInput label="Name" name="name" value={data.name} onChange={e => setData('name', e.target.value)} errors={errors.name} />
                    
                    <FileInput label="Image" name="image" onChange={e => setData('image', e.target.files?.[0] ?? null)} errors={errors.image} />

                    {progress && <ProgressBar progress={progress.percentage ?? 0} />}

                    <Button disabled={processing} className="cursor-pointer mt-4 w-full">{processing ? 'Updating ...' : 'Update'}</Button>
                </Form>
            </FormContainer>
        </AppLayout>
    )
}