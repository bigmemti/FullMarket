import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import DashboardHeader from "@/components/dashboard/header";
import { Form, FormContainer, TextInput, EmailInput } from "@/components/form";
import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Panel',
        href: route('panel'),
    },
    {
        title: 'Users',
        href: route('panel.user.index'),
    },
    {
        title: 'Create User',
        href: route('panel.user.create'),
    },
];

export default function Create() {
    const { data, setData, post, errors, processing } = useForm({
        name: '',
        email: '',
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('panel.user.store'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create User" />

            <DashboardHeader title="Create User" />

            <FormContainer>
                <Form onSubmit={submit}>
                    <TextInput label="Name" name="name" value={data.name} onChange={(e) => setData('name', e.target.value)} errors={errors.name} />
                    
                    <EmailInput label="Email" name="email" value={data.email} onChange={(e) => setData('email', e.target.value)} errors={errors.email} />
                    
                    <Button className="mt-4 w-full cursor-pointer" type="submit" disabled={processing}>{processing ? 'Processing...' : 'Create'}</Button>
                </Form>
            </FormContainer>
        </AppLayout>
    );
}
