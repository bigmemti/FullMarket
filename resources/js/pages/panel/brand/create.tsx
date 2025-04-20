import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

export default function Create(){
    const { post, data, setData, errors, processing, progress } = useForm({
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
            <div className="w-lg mx-auto mt-12">
                <h3>Brand Create Form</h3>
                <form onSubmit={submit}>
                    <Label htmlFor="name" >Name</Label>
                    <Input
                        id="name"
                        value={data.name}
                        onChange={(event) => {setData('name', event.target.value)}}
                    />
                    {errors.name && (
                        <p className="text-sm text-red-500">{errors.name}</p>
                    )}
                    
                    <Label htmlFor="image" >Image</Label>
                    <Input
                        id="image"
                        type="file"
                        onChange={e => setData('image', e.target.files[0])}
                    />
                    {errors.image && (
                        <p className="text-sm text-red-500">{errors.image}</p>
                    )}
                    {progress && (
                        <progress className="w-full mt-2 rounded-lg" value={progress.percentage} max="100">
                            {progress.percentage}%
                        </progress>
                    )}

                    <Button disabled={processing} className="cursor-pointer mt-4 w-full">{processing ? 'Creating ...' : 'Create'}</Button>
                </form>
            </div>
        </AppLayout>
    )
}