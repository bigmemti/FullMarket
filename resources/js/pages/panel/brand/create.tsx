import DashboardHeader from "@/components/dashboard/header";
import { TextInput, FileInput, Form, FormContainer, ProgressBar, CheckboxInput } from "@/components/form";
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
    slug: string;
    image: File | null;
    is_active: boolean;
}

export default function Create(){
    const { post, data, setData, errors, processing, progress } = useForm<Required<BrandForm>>({
        name: '', 
        slug: '',
        image: null,
        is_active: true,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('panel.brand.store'));
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData('name', e.target.value);
        setData('slug', e.target.value.toLowerCase().replace(/ /g, '-'));
    }

    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Brand" />
            
            <DashboardHeader title="Create Brand" />

            <FormContainer>
                <Form onSubmit={submit}>
                    <TextInput label="Name" name="name" value={data.name} onChange={handleNameChange} errors={errors.name} />

                    <TextInput label="Slug" name="slug" value={data.slug} disabled={!errors.slug} onChange={e => setData('slug', e.target.value)} errors={errors.slug} />
                    
                    <FileInput label="Image" name="image" onChange={e => setData('image', e.target.files?.[0] ?? null)} errors={errors.image} />

                    <CheckboxInput label="Is Active" name="is_active" checked={data.is_active} onChange={() => setData('is_active', !data.is_active)} />

                    {progress && <ProgressBar progress={progress.percentage ?? 0} />}

                    <Button disabled={processing} className="cursor-pointer mt-4 w-full">{processing ? 'Creating ...' : 'Create'}</Button>
                </Form>
            </FormContainer>
        </AppLayout>
    )
}