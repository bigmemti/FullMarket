import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import DashboardHeader from "@/components/dashboard/header";
import { Form, FormContainer, TextInput, EmailInput } from "@/components/form";
import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { BreadcrumbItem, User } from "@/types";

export default function Edit({ user }: { user: User }) {
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
            title: user.name,
            href: route('panel.user.show', user.id),
        },
        {
            title: 'Edit',
            href: route('panel.user.edit', user.id),
        },
    ];

    const { data, setData, put, errors, processing } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(route('panel.user.update', user.id));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit User" />

            <DashboardHeader title="Edit User" />

            <FormContainer>
                <Form onSubmit={submit}>
                    <TextInput label="Name" name="name" value={data.name} onChange={(e) => setData('name', e.target.value)} errors={errors.name} />
                    
                    <EmailInput label="Email" name="email" value={data.email} onChange={(e) => setData('email', e.target.value)} errors={errors.email} />
                    
                    <Button className="mt-4 w-full cursor-pointer" type="submit" disabled={processing}>{processing ? 'Processing...' : 'Update'}</Button>
                </Form>
            </FormContainer>
        </AppLayout>
    );
}
