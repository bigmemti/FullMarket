import { FormEventHandler } from "react";
import AppLayout from "@/layouts/app-layout";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Head, useForm } from "@inertiajs/react";
import InputError from "@/components/input-error";
import { BreadcrumbItem, Category } from "@/types";
import DashboardHeader from "@/components/dashboard/header";
import { TextInput, FileInput, Form, FormContainer, ProgressBar, CheckboxInput, SelectInput } from "@/components/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const breadcrumbs: BreadcrumbItem[] = [
    {
        'title' : 'Panel',
        'href' : route('panel')
    },
    {
        'title' : 'Category',
        'href' : route('panel.category.index')
    },
    {
        'title' : 'Create',
        'href' : route('panel.category.create')
    },
];

interface CategoryForm {
    name: string;
    slug: string;
    image: File | null;
    parent_id: number | null;
    is_active: boolean;
}

export default function Create({categories}: {categories: Category[]}){
    const { post, data, setData, errors, processing, progress } = useForm<Required<CategoryForm>>({
        name: '', 
        slug: '',
        image: null,
        parent_id: null,
        is_active: true,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('panel.category.store'));
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData('name', e.target.value);
        const slug = e.target.value.toLowerCase().replace(/\s+/g, '-');
        const cleanSlug = slug.endsWith('-') ? slug.slice(0, -1) : slug;
        setData('slug', cleanSlug);
    }

    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Category" />
            
            <DashboardHeader title="Create Category" />

            <FormContainer>
                <Form onSubmit={submit}>
                    <TextInput label="Name" name="name" value={data.name} onChange={handleNameChange} errors={errors.name} />
                    
                    <TextInput label="Slug" name="slug" value={data.slug} disabled={!errors.slug} onChange={e => setData('slug', e.target.value)} errors={errors.slug} />

                    <SelectInput 
                        label="Parent" 
                        name="parent_id" 
                        options={categories.map(category => ({ label: category.name, value: category.id.toString() }))} 
                        onChange={e => setData('parent_id', parseInt(e))} 
                        errors={errors.parent_id} 
                        value={data.parent_id?.toString() ?? ''} 
                        disabled={!categories.length}
                    />

                    <FileInput label="Image" name="image" onChange={e => setData('image', e.target.files?.[0] ?? null)} errors={errors.image} />

                    <CheckboxInput label="Is Active" name="is_active" checked={data.is_active} onChange={() => setData('is_active', !data.is_active)} />

                    {progress && <ProgressBar progress={progress.percentage ?? 0} />}

                    <Button disabled={processing} className="cursor-pointer mt-4 w-full">{processing ? 'Creating ...' : 'Create'}</Button>
                </Form>
            </FormContainer>
        </AppLayout>
    )
}