"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { logout } from "@/actions/auth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  MapPin,
  Store,
  Newspaper,
  Image as ImageIcon,
  Home,
  BookOpen,
  BarChart3,
  LogOut,
  TreePine,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Beranda & Kontak", href: "/admin/homepage", icon: Home },
  { name: "Profil Desa", href: "/admin/profil", icon: BookOpen },
  { name: "Statistik Desa", href: "/admin/statistik", icon: BarChart3 },
  { name: "Destinasi Wisata", href: "/admin/wisata", icon: MapPin },
  { name: "UMKM Lokal", href: "/admin/umkm", icon: Store },
  { name: "Berita & Info", href: "/admin/berita", icon: Newspaper },
  { name: "Galeri Foto", href: "/admin/gallery", icon: ImageIcon },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Topbar */}
      <div className="flex h-16 items-center justify-between border-b border-border/50 bg-card px-4 lg:hidden sticky top-0 z-40">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={24} height={24} className="object-contain" />
          <span className="font-bold">Admin Panel</span>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 -mr-2 text-muted-foreground hover:text-foreground"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar (Desktop & Mobile) */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 transform flex-col justify-between border-r border-border/50 bg-card transition-transform duration-300 lg:static lg:flex lg:translate-x-0",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Image src="/logo.png" alt="Logo" width={20} height={20} className="object-contain" />
            </div>
            <span className="text-lg font-bold">Admin Balesari</span>
          </div>
          
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <div className="text-xs font-semibold leading-6 text-muted-foreground uppercase tracking-wider mb-2">
                  Menu Utama
                </div>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            isActive
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-colors"
                          )}
                        >
                          <item.icon
                            className={cn(
                              isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
                              "h-5 w-5 shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ul>
          </nav>
        </div>

        <div className="border-t border-border/50 p-4">
          <form action={logout}>
            <Button variant="ghost" className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Keluar
            </Button>
          </form>
        </div>
      </div>

      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden" 
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
