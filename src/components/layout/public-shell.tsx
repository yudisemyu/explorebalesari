"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { FloatingScrollButton } from "@/components/ui/floating-scroll-button";

export function PublicShell({ 
  children, 
  footer 
}: { 
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      {footer}
      <FloatingScrollButton />
    </>
  );
}
