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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export const metadata: Metadata = {
  title: 'PaisaPal',
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
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader>
              <div className="flex items-center gap-2">
                <AppLogo className="size-8 text-primary" />
                <h1 className="text-xl font-headline font-semibold">PaisaPal</h1>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <NavLinks />
            </SidebarContent>
            <SidebarFooter>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <Avatar className="size-8">
                    <AvatarImage src={userAvatar?.imageUrl} alt="User Avatar" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-sm font-medium truncate">Người dùng</span>
                    <span className="text-xs text-muted-foreground truncate">
                      user@email.com
                    </span>
                  </div>
                </div>
                 <Button variant="ghost" size="icon" className="size-7">
                    <LogOut className="size-4" />
                  </Button>
              </div>
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
