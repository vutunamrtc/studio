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
  { href: '/', label: 'Bảng điều khiển', icon: LayoutDashboard },
  { href: '/transactions', label: 'Giao dịch', icon: ArrowRightLeft },
  { href: '/categories', label: 'Danh mục', icon: Shapes },
  { href: '/reports', label: 'Báo cáo', icon: BarChart },
  { href: '/budgeting', label: 'Ngân sách', icon: BrainCircuit },
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
