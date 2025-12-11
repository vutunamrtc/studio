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
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppLogo } from '@/components/app-logo';
import NavLinks from '@/components/shared/nav-links';
import Header from '@/components/shared/header';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { LogOut } from 'lucide-react';

export const metadata: Metadata = {
  title: 'QLCT',
  description: 'Theo dõi thu nhập và chi tiêu của bạn một cách dễ dàng.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userAvatar = PlaceHolderImages.find((p) => p.id === 'user-avatar');

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
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap"
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
                  QLCT
                </h1>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <NavLinks />
            </SidebarContent>
          </Sidebar>
          <SidebarInset>
            <div className="flex flex-col h-full">
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
