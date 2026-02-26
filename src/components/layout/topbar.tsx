"use client";

import { Bell, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TopbarProps {
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  pageTitle?: string;
  mobileNav?: React.ReactNode;
}

export function Topbar({
  sidebarCollapsed,
  onToggleSidebar,
  pageTitle,
  mobileNav,
}: TopbarProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b bg-card">
      <div className="flex items-center gap-3">
        {/* Mobile nav (hamburger) — only visible on small screens */}
        <div className="md:hidden">{mobileNav}</div>

        {/* Sidebar toggle — only visible on desktop */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="hidden md:flex h-8 w-8"
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? (
            <PanelLeftOpen className="w-4 h-4" />
          ) : (
            <PanelLeftClose className="w-4 h-4" />
          )}
        </Button>

        {pageTitle && (
          <h1 className="text-base font-semibold text-foreground">{pageTitle}</h1>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Notifications">
          <Bell className="w-4 h-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                  JD
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col gap-0.5">
                <span className="font-semibold text-sm">John Doe</span>
                <span className="text-xs text-muted-foreground">john@example.com</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
