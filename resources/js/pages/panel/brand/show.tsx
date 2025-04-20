import { DialogClose, DialogHeader, DialogTitle, DialogTrigger, Dialog, DialogContent, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { Brand, BreadcrumbItem } from "@/types";
import { Head, Link } from "@inertiajs/react";
import dayjs from "dayjs";
import { Pencil, Trash } from "lucide-react";


export default function Show({ brand }: { brand: Brand }) {
    const breadcrumb: BreadcrumbItem[] =[
        {
            title: 'Panel',
            href: route('panel'),
        },
        {
            title: 'Brand',
            href: route('panel.brand.index'),
        },
        {
            title: brand.name,
            href: route('panel.brand.show', {brand}),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumb}>
            <Head title="Brand Show" />
            <div>
                <div className="p-4 flex justify-between">
                    <div className="text-2xl font-bold">Brand Show</div>
                </div>
            </div>
            <div className="p-4">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <div className="text-sm font-medium">Name</div>
                        <div className="text-sm">{brand.name}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-sm font-medium">Image</div>
                        <img src={brand.image ? `/storage/${brand.image}` : '/images/default-image.png'} alt={brand.name} className="w-16 h-16 rounded-md" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-sm font-medium">Created At</div>
                        <div className="text-sm">{dayjs(brand.created_at).format('YYYY/MM/DD H:m')}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-sm font-medium">Updated At</div>
                        <div className="text-sm">{dayjs(brand.updated_at).format('YYYY/MM/DD H:m')}</div>
                    </div>
                    <div className="flex gap-2">
                        <Link href={route('panel.brand.edit', {brand})} className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground p-3">
                            <Pencil className="w-4 h-4" />
                        </Link>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input dark:border-none dark:bg-destructive dark:text-destructive-foreground  dark:hover:bg-destructive/85 p-3 cursor-pointer bg-red-500 hover:bg-red-600 text-black">
                                    <Trash className="w-4 h-4" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Confirm Deletion</DialogTitle>
                                    <DialogDescription>
                                        Are you sure you want to delete this brand? This action cannot be undone.
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline" className="mr-2 cursor-pointer">
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                    <Button className="cursor-pointer" variant="destructive">
                                        Delete
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
