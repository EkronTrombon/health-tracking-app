"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Utensils,
  Dumbbell,
  TrendingUp,
  Bot,
  Calendar,
  User,
  Droplets,
  Settings,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    color: "text-primary",
  },
  {
    label: "Nutrition",
    href: "/nutrition",
    icon: Utensils,
    color: "text-[var(--nutrition)]",
  },
  {
    label: "Workouts",
    href: "/workouts",
    icon: Dumbbell,
    color: "text-[var(--workout)]",
  },
  {
    label: "Progress",
    href: "/progress",
    icon: TrendingUp,
    color: "text-[var(--progress-accent)]",
  },
  {
    label: "AI Assistant",
    href: "/ai",
    icon: Bot,
    color: "text-[var(--ai-accent)]",
  },
  {
    label: "Habits",
    href: "/habits",
    icon: Calendar,
    color: "text-muted-foreground",
  },
] as const;

const bottomItems = [
  { label: "Profile", href: "/profile", icon: User },
  { label: "Settings", href: "/settings", icon: Settings },
] as const;

interface SidebarProps {
  collapsed?: boolean;
}

export function Sidebar({ collapsed = false }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex flex-col h-full bg-[var(--sidebar)] text-[var(--sidebar-foreground)] border-r border-[var(--sidebar-border)] transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-[var(--sidebar-border)]">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary shrink-0">
          <Heart className="w-4 h-4 text-primary-foreground" />
        </div>
        {!collapsed && (
          <span className="font-bold text-lg text-[var(--sidebar-foreground)]">
            HealthTrack
          </span>
        )}
      </div>

      {/* Main nav */}
      <ScrollArea className="flex-1 py-3">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;

            const linkContent = (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[var(--sidebar-accent)] text-[var(--sidebar-accent-foreground)]"
                    : "hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-accent-foreground)] text-[var(--sidebar-foreground)]"
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 shrink-0",
                    isActive ? item.color : "text-[var(--sidebar-muted,_oklch(0.55_0.02_250))]"
                  )}
                />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );

            if (collapsed) {
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                  <TooltipContent side="right">{item.label}</TooltipContent>
                </Tooltip>
              );
            }

            return linkContent;
          })}
        </nav>
      </ScrollArea>

      {/* Bottom nav */}
      <div className="py-3 px-2 border-t border-[var(--sidebar-border)]">
        <Separator className="mb-3 bg-[var(--sidebar-border)]" />
        <nav className="space-y-1">
          {bottomItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            const linkContent = (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[var(--sidebar-accent)] text-[var(--sidebar-accent-foreground)]"
                    : "hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-accent-foreground)] text-[var(--sidebar-foreground)]"
                )}
              >
                <Icon className="w-5 h-5 shrink-0 text-[var(--sidebar-muted,_oklch(0.55_0.02_250))]" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );

            if (collapsed) {
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                  <TooltipContent side="right">{item.label}</TooltipContent>
                </Tooltip>
              );
            }

            return linkContent;
          })}
        </nav>
      </div>
    </aside>
  );
}
