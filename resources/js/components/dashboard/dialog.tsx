import { Dialog, DialogFooter, DialogDescription, DialogTitle, DialogHeader, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Button } from "../ui/button";

interface ImageDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    data: { name: string, image: string } | null;
}

function ImageDialog({ isOpen, onOpenChange, data }: ImageDialogProps) {
    if (!data) return null;
    return (
        <Dialog open={isOpen} onOpenChange={(open) => onOpenChange(open)}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{data.name}</DialogTitle>
                    <DialogDescription>
                        Brand image preview
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center justify-center p-6">
                    <img 
                    src={`/storage/${data.image}`} 
                    alt={data.name}
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
    )
}

interface ConfirmDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onDelete: () => void;
    processing: boolean;
}

function ConfirmDialog({ isOpen, onOpenChange, onDelete, processing }: ConfirmDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => onOpenChange(open)}>
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
                    <Button disabled={processing} className="cursor-pointer" variant="destructive" onClick={() => onDelete()}>
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export { ImageDialog, ConfirmDialog }