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

                    <Label htmlFor="parent_id">Parent</Label>
                    <Select disabled={!categories.length} defaultValue={data.parent_id?.toString() ?? undefined} onValueChange={e => setData('parent_id', parseInt(e))}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Parent" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value=" ">None</SelectItem>
                            {categories.map(category => (
                                <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.parent_id && <InputError message={errors.parent_id} />}

                    <FileInput label="Image" name="image" onChange={e => setData('image', e.target.files?.[0] ?? null)} errors={errors.image} />

                    {progress && <ProgressBar progress={progress.percentage ?? 0} />}

                    <div className="flex items-center space-x-3">
                        <Checkbox id="is_active" name="is_active" checked={data.is_active} onClick={() => setData('is_active', !data.is_active)} />
                        <Label htmlFor="is_active">Is Active</Label>
                    </div>

                    <Button disabled={processing} className="cursor-pointer mt-4 w-full">{processing ? 'Creating ...' : 'Create'}</Button>
                </Form>
            </FormContainer>
        </AppLayout>
    )
}