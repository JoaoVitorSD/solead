"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sun } from "lucide-react";

export function Navigation() {
  const pathname = usePathname();

  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Sun className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold text-gray-900">Solead</span>
          </Link>

          <nav className="flex items-center space-x-4">
            <Link href="/simulacao">
              <Button
                variant={pathname === "/simulacao" ? "default" : "ghost"}
                className="text-sm font-medium"
              >
                Simulação
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                variant={pathname === "/dashboard" ? "default" : "ghost"}
                className="text-sm font-medium"
              >
                Dashboard do Vendedor
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
