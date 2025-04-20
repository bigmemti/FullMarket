import { Button } from "@/components/ui/button";
import { Dialog, DialogFooter, DialogDescription, DialogTitle, DialogHeader, DialogContent, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import AppLayout from "@/layouts/app-layout";
import { Brand, BreadcrumbItem } from "@/types";
import { Head, Link, router, useForm } from "@inertiajs/react";
import dayjs from 'dayjs';
import { Eye, ImageOff, Pencil, Trash } from "lucide-react";
import { useState } from "react";

const breadcrumb: BreadcrumbItem[] =[
    {
        title: 'Panel',
        href: route('panel'),
    },
    {
        title: 'Brand',
        href: route('panel.brand.index'),
    },
];

export default function Index({ brands } : { brands: Brand[] }) {
    const [processing, setProcessing] = useState(false);
    
    const deleteBrand = (id: number): void => {
        setProcessing(true);
        router.delete(route('panel.brand.destroy', { brand: id }), {
            preserveScroll: true,
            onSuccess: () => {
                setProcessing(false);
            },
        });
    }

    return(
        <AppLayout breadcrumbs={breadcrumb}>
            <Head title="Brand Index" />
            <div>
                <div className="p-4 flex justify-between">
                    <div className="text-2xl font-bold">Brand List</div>
                    <div>
                        <Link className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-green-500 hover:bg-green-600 text-white p-3 dark:bg-green-600 dark:hover:bg-green-700" href={route('panel.brand.create')}>Create +</Link>
                    </div>
                </div>
                <div className="space-y-2 md:space-y-0 p-2 grid grid-cols-2 gap-2 md:block">
                    <div className="hidden md:flex p-2 md:border md:gap-2">
                        <div className="w-16">ID</div>
                        <div className="w-16">Image</div>
                        <div className="flex-auto">Name</div>
                        <div className="w-48">Created At</div>
                        <div className="w-48">Updated At</div>
                        <div className="w-48 text-end">Actions</div>
                    </div>
                    {brands.map((brand) => (
                        <div className="border p-2 rounded-xl md:rounded-none flex flex-col md:flex-row md:items-center md:gap-2" key={brand.id}>
                            <div className="md:w-16">
                                <span className="md:hidden">ID: </span>
                                <span className="text-muted-foreground whitespace-nowrap">{brand.id}</span>
                            </div>
                            <div className="md:w-16 order-first mb-3 md:mb-0 md:order-none grid md:place-items-center">
                                {brand.image ? (
                                  <>
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <button className="cursor-pointer">
                                          <img src={brand.image ? `/storage/${brand.image}` : '/images/default-image.png'} className="w-full rounded-md md:w-12 md:h-12" />
                                        </button>
                                      </DialogTrigger>
                                      <DialogContent className="sm:max-w-md">
                                        <DialogHeader>
                                          <DialogTitle>{brand.name}</DialogTitle>
                                          <DialogDescription>
                                            Brand image preview
                                          </DialogDescription>
                                        </DialogHeader>
                                        <div className="flex items-center justify-center p-6">
                                          <img 
                                            src={`/storage/${brand.image}`} 
                                            alt={brand.name}
                                            className="max-h-[70vh] max-w-full object-contain"
                                          />
                                        </div>
                                        <DialogFooter>
                                          <DialogClose asChild>
                                            <Button type="button" variant="secondary">
                                              Close
                                            </Button>
                                          </DialogClose>
                                        </DialogFooter>
                                      </DialogContent>
                                    </Dialog>
                                  </>
                                ) : (
                                    <img src={'/images/default-image.png'} className="w-full rounded-md md:w-12 md:h-12" />
                                )}
                            </div>
                            <div className="md:flex-auto">
                                <span className="md:hidden">Name: </span>
                                <span className="text-muted-foreground whitespace-nowrap">{brand.name}</span>
                            </div>
                            <div className="md:w-48">
                                <span className="md:hidden">Created At: </span>
                                <span className="text-muted-foreground whitespace-nowrap">{dayjs(new Date(brand.created_at)).format('YYYY/MM/DD H:m')}</span>
                            </div>
                            <div className="md:w-48">
                                <span className="md:hidden">Updated At: </span>
                                <span className="text-muted-foreground whitespace-nowrap">{dayjs(new Date(brand.updated_at)).format('YYYY/MM/DD H:m')}</span>
                            </div>
                            <div className="mt-2 md:mt-0 md:w-48 text-end space-x-2 rtl:space-x-reverse"> 
                                <Link href={route('panel.brand.show', {brand})} className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground p-3">
                                    <Eye className="w-4 h-4" />
                                </Link>
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
                                            <Button disabled={processing} className="cursor-pointer" variant="destructive" onClick={() => deleteBrand(brand.id)}>
                                                Delete
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}