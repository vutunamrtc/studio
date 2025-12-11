import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { AppLogo } from '@/components/app-logo';
import NavLinks from '@/components/shared/nav-links';
import Header from '@/components/shared/header';

export const metadata: Metadata = {
  title: 'PaisaPal',
  description: 'Theo dõi thu nhập và chi tiêu của bạn một cách dễ dàng.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <SidebarProvider>
          <Sidebar collapsible="icon">
            <SidebarHeader className="p-2 flex items-center justify-center">
              <div className="flex items-center gap-2 w-full">
                <AppLogo className="size-8 min-w-8 text-primary" />
                <h1 className="text-xl font-headline font-semibold truncate group-data-[collapsible=icon]:hidden">
                  PaisaPal
                </h1>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <NavLinks />
            </SidebarContent>
            <SidebarFooter>
              {/* User info moved to header */}
            </SidebarFooter>
          </Sidebar>
          <SidebarInset>
            <div className='flex flex-col h-full'>
              <Header />
              <main className="p-4 sm:p-6 lg:p-8 flex-1 bg-background">
                {children}
              </main>
            </div>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
