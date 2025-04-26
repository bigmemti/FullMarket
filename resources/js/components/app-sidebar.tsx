import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, List } from 'lucide-react';
import AppLogo from './app-logo';


const platformNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
];

const adminNavItems: NavItem[] = [
    {
        title: 'Panel',
        href: '/panel',
        icon: LayoutGrid,
    },
    {
        title: 'Brand',
        href: '/panel/brand',
        icon: List,
    },
    {
        title: 'Category',
        href: '/panel/category',
        icon: List,
    },
    {
        title: 'Product',
        href: '/panel/product',
        icon: List,
    },
    {
        title: 'Order',
        href: '/panel/order',
        icon: List,
    },
    {
        title: 'User',
        href: '/panel/user',
        icon: List,
    },
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    const page = usePage<SharedData>();
    const { auth } = page.props;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            
            <SidebarContent>
                {auth.user.role ? (
                    <NavMain items={platformNavItems} label='Platform' />
                ) : (
                    <NavMain items={adminNavItems} label='Panel Admin' />
                )}
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
