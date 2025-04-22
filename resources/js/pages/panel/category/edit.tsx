import { FormEventHandler } from "react";
import AppLayout from "@/layouts/app-layout";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Head, useForm } from "@inertiajs/react";
import InputError from "@/components/input-error";
import { BreadcrumbItem, Category } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import DashboardHeader from "@/components/dashboard/header";
import { TextInput, FileInput, Form, FormContainer, ProgressBar } from "@/components/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
                        
                    <Label htmlFor="parent_id">Parent</Label>
                    <Select disabled={!(categories.length - 1)} defaultValue={data.parent_id?.toString() ?? undefined} onValueChange={e => setData('parent_id', parseInt(e))}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Parent" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value=" ">None</SelectItem>
                            {categories.map(parent => (
                                parent.id !== category.id && (
                                    <SelectItem key={parent.id} value={parent.id.toString()}>{parent.name}</SelectItem>
                                )
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.parent_id && <InputError message={errors.parent_id} />}

                    <FileInput label="Image" name="image" onChange={e => setData('image', e.target.files?.[0] ?? null)} errors={errors.image} />

                    {progress && <ProgressBar progress={progress.percentage ?? 0} />}

                    <div className="flex items-center space-x-3">
                        <Checkbox id="is_active" name="is_active" checked={!!data.is_active} onClick={() => setData('is_active', !data.is_active)} />
                        <Label htmlFor="is_active">Is Active</Label>
                    </div>

                    <Button disabled={processing} className="cursor-pointer mt-4 w-full">{processing ? 'Updating ...' : 'Update'}</Button>
                </Form>
            </FormContainer>
        </AppLayout>
    )
}