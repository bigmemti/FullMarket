import DashboardHeader from "@/components/dashboard/header";
import { TextInput, FileInput, Form, FormContainer, ProgressBar } from "@/components/form";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

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
        'title' : 'Create',
        'href' : route('panel.brand.create')
    },
];

interface BrandForm {
    name: string;
    image: File | null;
}

export default function Create(){
    const { post, data, setData, errors, processing, progress } = useForm<Required<BrandForm>>({
        name: '', 
        image: null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('panel.brand.store'));
    }

    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Brand" />
            
            <DashboardHeader title="Create Brand" />

            <FormContainer>
                <Form onSubmit={submit}>
                    <TextInput label="Name" name="name" value={data.name} onChange={e => setData('name', e.target.value)} errors={errors.name} />
                    
                    <FileInput label="Image" name="image" onChange={e => setData('image', e.target.files?.[0] ?? null)} errors={errors.image} />

                    {progress && <ProgressBar progress={progress.percentage ?? 0} />}

                    <Button disabled={processing} className="cursor-pointer mt-4 w-full">{processing ? 'Creating ...' : 'Create'}</Button>
                </Form>
            </FormContainer>
        </AppLayout>
    )
}