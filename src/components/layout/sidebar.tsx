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
  Settings,
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
        "flex flex-col h-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border sidebar-transition",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border">
        <div className="shrink-0 animate-glow-pulse">
          <svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="100%" stopColor="#16a34a" />
              </linearGradient>
            </defs>
            <rect width="32" height="32" rx="8" fill="url(#logoGrad)" />
            <path
              d="M16 25C16 25 5 17.5 5 11.5C5 8.2 7.8 5.5 11 5.5C12.9 5.5 14.6 6.5 16 8.2C17.4 6.5 19.1 5.5 21 5.5C24.2 5.5 27 8.2 27 11.5C27 17.5 16 25 16 25Z"
              fill="white"
              opacity="0.92"
            />
            <path
              d="M8 14L11 14L13 10.5L15.5 17.5L17.5 12L19 14L24 14"
              stroke="#166534"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {!collapsed && (
          <span className="font-extrabold text-base tracking-tight">
            <span className="text-sidebar-foreground">Health</span>
            <span className="text-primary">Track</span>
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
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium nav-item-transition",
                  isActive
                    ? "nav-active bg-sidebar-accent text-sidebar-accent-foreground"
                    : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground"
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 shrink-0",
                    isActive ? item.color : "text-(--sidebar-muted)"
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
      <div className="py-3 px-2 border-t border-sidebar-border">
        <Separator className="mb-3 bg-sidebar-border" />
        <nav className="space-y-1">
          {bottomItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            const linkContent = (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium nav-item-transition",
                  isActive
                    ? "nav-active bg-sidebar-accent text-sidebar-accent-foreground"
                    : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground"
                )}
              >
                <Icon className="w-5 h-5 shrink-0 text-(--sidebar-muted)" />
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
