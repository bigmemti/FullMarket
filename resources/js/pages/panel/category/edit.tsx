import { FormEventHandler } from "react";
import AppLayout from "@/layouts/app-layout";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Head, useForm } from "@inertiajs/react";
import { BreadcrumbItem, Category } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import DashboardHeader from "@/components/dashboard/header";
import { TextInput, FileInput, Form, FormContainer, ProgressBar, SelectInput, CheckboxInput } from "@/components/form";

interface CategoryForm {
    name: string;
    slug: string;
    image: File | null;
    parent_id: number | null;
    is_active: boolean;
    _method: string;
}

export default function Create({categories, category}: {categories: Category[], category: Category}){
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
            'title' : category.name,
            'href' : route('panel.category.show', { category: category.id })
        },
        {
            'title' : 'Edit',
            'href' : route('panel.category.edit', { category: category.id })
        },
    ];
    const { post, data, setData, errors, processing, progress } = useForm<Required<CategoryForm>>({
        name: category.name, 
        slug: category.slug,
        image: null,
        parent_id: category.parent_id,
        is_active: category.is_active,
        _method: 'PUT',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('panel.category.update', { category: category.id }));
    }

    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Category" />
            
            <DashboardHeader title="Create Category" />

            <FormContainer>
                <Form onSubmit={submit}>
                    <TextInput label="Name" name="name" value={data.name} onChange={e => setData('name', e.target.value)} errors={errors.name} />
                    
                    <TextInput label="Slug" name="slug" value={data.slug} onChange={e => setData('slug', e.target.value)} errors={errors.slug} />
                        
                    <SelectInput 
                        label="Parent" 
                        name="parent_id" 
                        options={categories.map(parent => parent.id !== category.id ? { label: parent.name, value: parent.id.toString() } : null).filter(Boolean) as { label: string; value: string }[]} 
                        onChange={e => setData('parent_id', parseInt(e))} 
                        errors={errors.parent_id} 
                        value={data.parent_id?.toString() ?? ''} 
                        disabled={!(categories.length - 1)}
                    />

                    <FileInput label="Image" name="image" onChange={e => setData('image', e.target.files?.[0] ?? null)} errors={errors.image} />

                    <CheckboxInput label="Is Active" name="is_active" checked={!!data.is_active} onChange={() => setData('is_active', !data.is_active)} />

                    {progress && <ProgressBar progress={progress.percentage ?? 0} />}

                    <Button disabled={processing} className="cursor-pointer mt-4 w-full">{processing ? 'Updating ...' : 'Update'}</Button>
                </Form>
            </FormContainer>
        </AppLayout>
    )
}