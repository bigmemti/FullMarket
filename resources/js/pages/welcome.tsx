import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-4xl lg:flex-row">
                        <div className="flex-1 rounded-br-lg rounded-bl-lg bg-white p-6 pb-12 text-[13px] leading-[20px] shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-tl-lg lg:rounded-br-none lg:p-20 dark:bg-[#161615] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                            <h1 className="mb-4 text-3xl font-bold">Welcome to Our Shop</h1>
                            <p className="mb-6 text-lg text-[#706f6c] dark:text-[#A1A09A]">
                                Discover amazing products at great prices.
                                <br />
                                Start shopping with these popular categories:
                            </p>
                            <ul className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
                                <li className="group rounded-lg border border-gray-200 p-4 transition-all hover:border-[#f53003] dark:border-gray-800">
                                    <a href="/category/electronics" className="flex items-center space-x-3">
                                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fff2f2] dark:bg-[#1D0002]">
                                            <svg className="h-6 w-6 text-[#f53003]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                        </span>
                                        <span className="font-medium group-hover:text-[#f53003]">Electronics</span>
                                    </a>
                                </li>
                                <li className="group rounded-lg border border-gray-200 p-4 transition-all hover:border-[#f53003] dark:border-gray-800">
                                    <a href="/category/fashion" className="flex items-center space-x-3">
                                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fff2f2] dark:bg-[#1D0002]">
                                            <svg className="h-6 w-6 text-[#f53003]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                        </span>
                                        <span className="font-medium group-hover:text-[#f53003]">Fashion</span>
                                    </a>
                                </li>
                            </ul>
                            <div className="flex flex-wrap gap-4">
                                <a
                                    href="/shop"
                                    className="inline-flex items-center rounded-lg bg-[#f53003] px-6 py-3 text-base font-medium text-white transition-colors hover:bg-[#d62a02] dark:bg-[#FF4433] dark:hover:bg-[#E63E2E]"
                                >
                                    Start Shopping
                                    <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </a>
                                <a
                                    href="/deals"
                                    className="inline-flex items-center rounded-lg border border-[#f53003] px-6 py-3 text-base font-medium text-[#f53003] transition-colors hover:bg-[#fff2f2] dark:border-[#FF4433] dark:text-[#FF4433] dark:hover:bg-[#1D0002]"
                                >
                                    View Deals
                                </a>
                            </div>
                        </div>
                        <div className="relative -mb-px aspect-[335/376] w-full shrink-0 overflow-hidden rounded-t-lg bg-[#fff2f2] lg:mb-0 lg:-ml-px lg:aspect-auto lg:w-[438px] lg:rounded-t-none lg:rounded-r-lg dark:bg-[#1D0002]">
                            <img 
                                src="/images/shopping-banner.jpg"
                                alt="Shopping Banner"
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                <h2 className="mb-2 text-2xl font-bold">Summer Sale</h2>
                                <p className="text-lg">Up to 50% off on selected items</p>
                            </div>
                        </div>
                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
