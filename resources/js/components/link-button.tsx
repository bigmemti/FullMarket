import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";

export default function LinkButton({ href, children, variant = 'default', className }: { href: string, children: React.ReactNode, variant?: 'default' | 'link' | 'destructive' | 'outline' | 'secondary' | 'ghost', className?: string }) {
    return (
        <Link href={href}>
            <Button variant={variant} className={cn({className, 'cursor-pointer' : true})}>
                {children}
            </Button>
        </Link>
    )
}
