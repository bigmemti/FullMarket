import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    role: number;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Brand{
    id: number;
    name: string;
    slug: string;
    image: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface Category{
    id: number;
    parent_id: number;
    name: string;
    slug: string;
    image: string;
    is_active: boolean;
    parent: Category | null;
    children: Category[] | null;
    created_at: string;
    updated_at: string;
}

export interface Product{
    id: number;
    name: string;
    slug: string;
    sku: string;
    category_id: number;
    category?: Category;
    brand_id: number;
    brand?: Brand;
    image: string;
    description: string;
    price: number;
    discount_price: number;
    stock: number;
    is_active: boolean;
    pivot?: {
        price: number;
        quantity: number;
        description: string;
        created_at: string;
        updated_at: string;
    };
    created_at: string;
    updated_at: string;
}

export interface Order{
    id: number;
    user_id: number;
    user?: User;
    total: number;
    status: number;
    description: string;
    products?: Product[];
    created_at: string;
    updated_at: string;
}