'use client';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ArrowRightLeft,
  Shapes,
  BarChart,
  BrainCircuit,
} from 'lucide-react';
import Link from 'next/link';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/transactions', label: 'Transactions', icon: ArrowRightLeft },
  { href: '/categories', label: 'Categories', icon: Shapes },
  { href: '/reports', label: 'Reports', icon: BarChart },
  { href: '/budgeting', label: 'Budgeting', icon: BrainCircuit },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href}>
            <SidebarMenuButton
              isActive={
                item.href === '/'
                  ? pathname === item.href
                  : pathname.startsWith(item.href)
              }
            >
              <item.icon />
              <span>{item.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
