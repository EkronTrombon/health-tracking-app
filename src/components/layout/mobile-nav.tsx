"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Utensils,
  Dumbbell,
  TrendingUp,
  Bot,
  Menu,
  Heart,
  Calendar,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Nutrition", href: "/nutrition", icon: Utensils },
  { label: "Workouts", href: "/workouts", icon: Dumbbell },
  { label: "Progress", href: "/progress", icon: TrendingUp },
  { label: "AI Assistant", href: "/ai", icon: Bot },
  { label: "Habits", href: "/habits", icon: Calendar },
  { label: "Profile", href: "/profile", icon: User },
] as const;

export function MobileNav() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden h-8 w-8">
          <Menu className="w-4 h-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0 bg-[var(--sidebar)] text-[var(--sidebar-foreground)]">
        <SheetHeader className="px-4 py-5 border-b border-[var(--sidebar-border)]">
          <SheetTitle className="flex items-center gap-2 text-[var(--sidebar-foreground)]">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
              <Heart className="w-4 h-4 text-primary-foreground" />
            </div>
            HealthTrack
          </SheetTitle>
        </SheetHeader>
        <nav className="p-2 space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[var(--sidebar-accent)] text-[var(--sidebar-accent-foreground)]"
                    : "hover:bg-[var(--sidebar-accent)] text-[var(--sidebar-foreground)]"
                )}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
