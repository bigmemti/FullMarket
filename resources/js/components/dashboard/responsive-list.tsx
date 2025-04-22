import LinkButton from "@/components/link-button";
import { Eye, Pencil, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

function ResponsiveList({ children }: { children: React.ReactNode }) {
    return (
        <div className="space-y-2 md:space-y-0 p-2 grid grid-cols-2 gap-2 md:block">
            {children}
        </div>
    )
}

function ListHeader({ children }: { children: React.ReactNode }) {
    return (
        <div className="hidden md:flex p-2 md:border md:gap-2">
            {children}
        </div>
    )
}

function SmallHeaderCell({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-16">
            {children}
        </div>
    )
}

function AutoHeaderCell({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex-auto">
            {children}
        </div>
    )
}

function WideHeaderCell({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-48">
            {children}
        </div>
    )
}

function ActionHeaderCell({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-48 text-end">
            {children}
        </div>
    )
}

function ListItem({ children }: { children: React.ReactNode }) {
    return (
        <div className="border p-2 rounded-xl md:rounded-none flex flex-col md:flex-row md:items-center md:gap-2">
            {children}
        </div>
    )
}

function SmallCell({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-16">
            {children}
        </div>
    )
}

function SmallInfoCell({ label, value }: { label: string, value: string }) {
    return (
        <SmallCell>
            <span className="md:hidden">{label}: </span>
            <span className="text-muted-foreground whitespace-nowrap">{value}</span>
        </SmallCell>
    )
}

function AutoCell({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex-auto">
            {children}
        </div>
    )
}

function AutoInfoCell({ label, value }: { label: string, value: string }) {
    return (
        <AutoCell>
            <span className="md:hidden">{label}: </span>
            <span className="text-muted-foreground whitespace-nowrap">{value}</span>
        </AutoCell>
    )
}

function WideCell({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={`w-48 ${className}`}>
            {children}
        </div>
    )
}

function WideInfoCell({ label, value }: { label: string, value: string }) {
    return (
        <WideCell>
            <span className="md:hidden">{label}: </span>
            <span className="text-muted-foreground whitespace-nowrap">{value}</span>
        </WideCell>
    )
}

function ActionCell({ children }: { children: React.ReactNode }) {
    return (
        <WideCell  className="mt-2 md:mt-0 w-full md:w-48 md:text-end space-x-2 rtl:space-x-reverse">
            {children}
        </WideCell>
    )
}

function ShowButton({ href }: { href: string }) {
    return (
        <LinkButton href={href} variant='outline'>
            <Eye className="w-4 h-4" />
        </LinkButton>
    )
}

function EditButton({href}: {href: string}) {
    return (
        <LinkButton href={href} variant='outline'>
            <Pencil className="w-4 h-4" />
        </LinkButton>
    )
}

function DeleteButton({onClick}:{onClick: () => void}){
    return(
        <Button onClick={onClick} variant="destructive" className="cursor-pointer">
            <Trash className="w-4 h-4" />
        </Button>
    )
}

function ImageCell({ image, onClick }: { image: string, onClick: () => void }) {
    return (
        <div className="md:w-16 order-first mb-3 md:mb-0 md:order-none grid md:place-items-center">
            <div className="relative">
                <img 
                    src={image ? `/storage/${image}` : '/images/default-image.png'} 
                    className="w-full rounded-md md:w-12 md:h-12" 
                />
                {image && (
                    <button 
                        className="hidden md:block absolute inset-0 bg-transparent bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 rounded-md cursor-pointer" 
                        onClick={onClick}
                    />
                )}
            </div>
        </div>
    )
}

function CheckboxCell({ checked, onClick }: { checked: boolean, onClick: () => void }) {
    return (
        <SmallCell>
            <Checkbox  onClick={onClick} checked={checked} className='cursor-pointer'/>
        </SmallCell>
    )
}

export { 
    ResponsiveList, 
    ListHeader, 
    SmallHeaderCell, 
    AutoHeaderCell, 
    WideHeaderCell, 
    ActionHeaderCell, 
    ListItem, 
    SmallCell, 
    SmallInfoCell, 
    AutoCell, 
    AutoInfoCell, 
    WideCell, 
    WideInfoCell, 
    ActionCell, 
    ShowButton, 
    EditButton, 
    DeleteButton,
    ImageCell,
    CheckboxCell
}