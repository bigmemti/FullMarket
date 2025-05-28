import { Button } from '@/components/ui/button';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Menu, ShoppingCart, LogIn, Instagram, Home } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="FullMarket">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div>
                <nav className='border-b border-accent px-4 lg:py-4'>
                    <div className='lg:container lg:mx-auto'>
                        <div className='flex items-center justify-between py-3 border-b border-accent lg:border-none'>
                            <Button variant='ghost' size='icon' className='cursor-pointer lg:hidden'>
                                <Menu  />
                            </Button>
                            <div className='flex items-center gap-2'>
                                <Link href={route('home')} className='text-lg font-medium'>FullMarket</Link>
                                <Input type='text' placeholder='Search' className='hidden lg:block w-auto'/>
                            </div>
                            <div className='flex items-center gap-2'>
                                <Button variant='ghost' size='icon' className='cursor-pointer relative'>
                                    <ShoppingCart />
                                    <Badge variant="destructive" className='absolute -bottom-2 -right-2'>0</Badge>
                                </Button>
                                <span className='hidden lg:block text-muted-foreground'>|</span>
                                <Button variant='ghost' size='icon' className='cursor-pointer hidden lg:flex'>
                                    <LogIn />
                                </Button>
                            </div>
                        </div>
                        <div className='hidden lg:block'>
                            <ul className='flex items-center gap-2 text-sm text-muted-foreground'>
                                <li>
                                    <Link href={route('home')}>
                                        <p>صفحه اصلی</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('home')}>
                                        <p>صفحه اصلی</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('home')}>
                                        <p>صفحه اصلی</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('home')}>
                                        <p>صفحه اصلی</p>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className='py-3 flex items-center gap-2 lg:hidden'>
                            <Input type='text' placeholder='Search' />
                            <Button variant='outline' size='icon' className='cursor-pointer'>
                                <LogIn />
                            </Button>
                        </div>
                    </div>
                </nav>
                <header className='p-4 grid gap-4 md:grid-cols-4 md:grid-rows-2 md:items-stretch container mx-auto'>
                    <img src='https://zagros.market/uploads/slidezagros-1.jpg' className='w-full object-cover rounded-lg col-span-3 row-span-2'/>
                    <img src='https://zagros.market/uploads/banerchaei.jpg' className='w-full object-cover rounded-lg col-span-1'/>
                    <img src='https://zagros.market/uploads/banermaye.jpg' className='w-full object-cover rounded-lg col-span-1'/>
                </header>
                <main className='container mx-auto'>
                    <section className='p-4'>
                        <Carousel className='cursor-grab bg-purple-400'>
                            <CarouselContent>
                                <CarouselItem className="basis-48 h-40 border">1</CarouselItem>
                                <CarouselItem className="basis-48 h-40 border">2</CarouselItem>
                                <CarouselItem className="basis-48 h-40 border">3</CarouselItem>
                                <CarouselItem className="basis-48 h-40 border">4</CarouselItem>
                                <CarouselItem className="basis-48 h-40 border">5</CarouselItem>
                                <CarouselItem className="basis-48 h-40 border">6</CarouselItem>
                            </CarouselContent>
                        </Carousel>
                    </section>
                    <section className='p-4'>
                        <h2 className='text-2xl font-medium text-center mb-4'>Categories</h2>
                        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 lg:grid-cols-6'>
                            <div className='border p-4 rounded-lg'>
                                <h3 className='text-lg font-medium'>Category 1</h3>
                            </div>
                            <div className='border p-4 rounded-lg'>
                                <h3 className='text-lg font-medium'>Category 2</h3>
                            </div>
                            <div className='border p-4 rounded-lg'>
                                <h3 className='text-lg font-medium'>Category 3</h3>
                            </div>
                            <div className='border p-4 rounded-lg'>
                                <h3 className='text-lg font-medium'>Category 4</h3>
                            </div>
                            <div className='border p-4 rounded-lg'>
                                <h3 className='text-lg font-medium'>Category 5</h3>
                            </div>
                            <div className='border p-4 rounded-lg'>
                                <h3 className='text-lg font-medium'>Category 6</h3>
                            </div>
                            <div className='border p-4 rounded-lg'>
                                <h3 className='text-lg font-medium'>Category 7</h3>
                            </div>
                            <div className='border p-4 rounded-lg'>
                                <h3 className='text-lg font-medium'>Category 8</h3>
                            </div>
                        </div>
                    </section>
                    <section className='p-4'>
                        <Carousel className='cursor-grab bg-amber-600'>
                            <CarouselContent>
                                <CarouselItem className="basis-48 h-40 border">1</CarouselItem>
                                <CarouselItem className="basis-48 h-40 border">2</CarouselItem>
                                <CarouselItem className="basis-48 h-40 border">3</CarouselItem>
                                <CarouselItem className="basis-48 h-40 border">4</CarouselItem>
                                <CarouselItem className="basis-48 h-40 border">5</CarouselItem>
                                <CarouselItem className="basis-48 h-40 border">6</CarouselItem>
                            </CarouselContent>
                        </Carousel>
                    </section>
                    <section className='p-4 grid gap-4 md:grid-cols-2'>
                        <img className='w-full object-cover rounded-lg' src="https://zagros.market/uploads/بنر-محصولات-صبحانه.jpg" alt="" />
                        <img className='w-full object-cover rounded-lg' src="https://zagros.market/uploads/بنر-محصولات-پروتئین.jpg" alt="" />
                        <img className='w-full object-cover rounded-lg' src="https://zagros.market/uploads/%D8%AE%D9%86%DA%A9-%D8%A8%D9%86%D9%88%D8%B4.jpg" alt="" />
                        <img className='w-full object-cover rounded-lg' src="https://zagros.market/uploads/%D9%88%D8%B3%D8%A7%DB%8C%D9%84-%D9%86%D8%B8%D8%A7%D9%81%D8%AA-%D9%85%D9%86%D8%B2%D9%84.jpg" alt="" />
                    </section>
                    <section className='p-4'>
                        <Carousel className='cursor-grab bg-gray-200'>
                            <CarouselContent>
                                <CarouselItem className="basis-48 h-40 border">1</CarouselItem>
                                <CarouselItem className="basis-48 h-40 border">2</CarouselItem>
                                <CarouselItem className="basis-48 h-40 border">3</CarouselItem>
                                <CarouselItem className="basis-48 h-40 border">4</CarouselItem>
                                <CarouselItem className="basis-48 h-40 border">5</CarouselItem>
                                <CarouselItem className="basis-48 h-40 border">6</CarouselItem>
                            </CarouselContent>
                        </Carousel>
                    </section>
                    <section className='p-4'>
                        <img src="https://zagros.market/uploads/%D8%AE%D8%B4%DA%A9%D8%A8%D8%A7%D8%B1.jpg" alt="" className='w-full object-cover rounded-lg' />
                    </section>
                    <section className='p-4'>
                        <Carousel className='cursor-grab bg-gray-200'>
                            <CarouselContent>
                                <CarouselItem className="basis-48 h-40 border">1</CarouselItem>
                                <CarouselItem className="basis-48 h-40 border">2</CarouselItem>
                                <CarouselItem className="basis-48 h-40 border">3</CarouselItem>
                                <CarouselItem className="basis-48 h-40 border">4</CarouselItem>
                                <CarouselItem className="basis-48 h-40 border">5</CarouselItem>
                                <CarouselItem className="basis-48 h-40 border">6</CarouselItem>
                            </CarouselContent>
                        </Carousel>
                    </section>
                    <section className='p-4'>
                        <Carousel className='cursor-grab'>
                            <CarouselContent>
                                <CarouselItem className="basis-48 h-40 border-e">1</CarouselItem>
                                <CarouselItem className="basis-48 h-40 border-e">2</CarouselItem>
                                <CarouselItem className="basis-48 h-40 border-e">3</CarouselItem>
                                <CarouselItem className="basis-48 h-40 border-e">4</CarouselItem>
                                <CarouselItem className="basis-48 h-40 border-e">5</CarouselItem>
                                <CarouselItem className="basis-48 h-40 border-e">6</CarouselItem>
                            </CarouselContent>
                        </Carousel>
                    </section>
                </main>
                <footer className='mt-8 grid gap-4'>
                    <section className='grid gap-4 border-b border-accent pb-2 px-4'>                        
                        <div className='flex flex-col gap-4 items-center justify-between bg-blue-950 p-4 rounded-lg lg:hidden'>
                            <div className='font-medium'>
                                نصب وب اپلیکشن      
                            </div>
                            <div className='flex items-center gap-2'>
                                <button className='bg-white text-black px-4 py-2 rounded-md'>وب اپلیکشن ios</button>
                                <button className='bg-white text-black px-4 py-2 rounded-md'>وب اپلیکشن اندروید</button>
                            </div>
                        </div>
                    </section>
                    <section className='px-4 border-b border-accent pb-2'>
                        <span>آدرس: | تلفن:  | پست الکترونیک:</span>
                        <div className='grid grid-cols-2 gap-4 md:grid-cols-4 container mx-auto'>
                            <div className=' p-4 rounded-lg flex flex-col items-center justify-center'>
                                <img src="https://zagros.market/uploads/8f570b58.png" alt="" className='w-24'/>
                                <p>تحویل پیک</p>
                            </div>
                            <div className=' p-4 rounded-lg flex flex-col items-center justify-center'>
                                <img src="https://zagros.market/uploads/a9286d2f.png" alt="" className='w-20'/>
                                <p>پشتیبانی همه روزه</p>
                            </div>
                            <div className=' p-4 rounded-lg flex flex-col items-center justify-center'>
                                <img src="https://zagros.market/uploads/22414818.png" alt="" className='w-20'/>
                                <p>پرداخت سریع و راحت</p>
                            </div>
                            <div className=' p-4 rounded-lg flex flex-col items-center justify-center'>
                                <img src="https://zagros.market/uploads/fdb293e6.png" alt="" className='w-18'/>
                                <p>ضمانت اصل بودن کالا</p>
                            </div>
                        </div>
                    </section>
                    <section className='px-4 pb-2 border-b border-accent'>
                        <div className='grid grid-cols-2 gap-4 md:grid-cols-4 container mx-auto'>
                            <div className='flex flex-col gap-2'>
                                <h3>فول مارکت</h3>
                                <a href="">فرصت‌های شغلی</a>
                                <a href="">تماس با ما</a>
                                <a href="">درباره ما</a>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <h3>خدمات مشتریان</h3>
                                <a href="">سوالات متداول</a>
                                <a href="">رویه‌های بازگرداندن کالا</a>
                                <a href="">حریم خصوصی</a>
                                <a href="">قوانین و مقررات</a>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <h3>راهنمای خرید</h3>
                                <a href="">نحوه ثبت سفارش</a>
                                <a href="">شیوه های پرداخت</a>
                                <a href="">رویه ارسال سفارش</a>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <h3>با ما همراه باشید</h3>
                                <a href="">
                                    <Instagram />
                                </a>
                            </div>
                        </div>
                    </section>
                    <section className='grid gap-4 md:grid-cols-3 px-4 pb-2 border-b border-accent'>
                        <div className='flex flex-col gap-2 md:col-span-2'>
                            <h3>فول مارکت</h3>
                            <p className='text-xs text-muted-foreground'>فروشگاه بزرگ زاگرس جهت رفاه حال مشتریان عزیز خود اقدام به راه اندازی سیستم ثبت سفارش به صورت آنلاین کرده است</p>
                            <p className='text-xs text-muted-foreground'>آدرس : خیابان شهیدان نیرنگ(مسجدالرضا) جنب مسجدالرضا | تلفن : 38347772-035</p>
                        </div>
                        <div>

                        </div>
                    </section>
                    <section className='text-xs text-muted-foreground text-center'>
                    ©
                    تمامی حقوق این سایت متعلق به زاگرس مارکت می باشد. |  طراحی و کد نویسی: سپکام سیستم اجرا و توسعه :آژانس دیجیتال مارکتینگ سپتا
                    </section>
                </footer>
            </div>
        </>
    );
}
