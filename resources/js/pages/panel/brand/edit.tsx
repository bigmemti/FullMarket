import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

    const { data, setData, post, errors, processing, progress } = useForm({
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
            <div className="w-lg mx-auto mt-12">
                <h3>Brand Edit Form</h3>
                <form onSubmit={submit} encType="multipart/form-data">
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
                        onChange={(e) => setData('image', e.target.files[0])}
                    />
                    {errors.image && (
                        <p className="text-sm text-red-500">{errors.image}</p>
                    )}
                    {progress && (
                        <progress className="w-full mt-2" value={progress.percentage} max="100">
                            {progress.percentage}%
                        </progress>
                    )}

                    <Button disabled={processing} className="cursor-pointer mt-4 w-full">{processing ? 'Updating ...' : 'Update'}</Button>
                </form>
            </div>
        </AppLayout>
    )
}