"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UsersRound,
  Newspaper,
  FileText,
  UserCog,
  type LucideIcon,
  ShieldCheck,
  BookOpenCheck,
  Brain,
  GraduationCap,
  Video,
} from "lucide-react";

import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/faculty", label: "Faculty", icon: UsersRound },
  { href: "/dashboard/events", label: "Events", icon: UserCog },
  //  { href: "/dashboard/exam-timetable", label: "Exam Timetable", icon: BookOpenCheck },

  { href: "/dashboard/buzz", label: "Buzz", icon: Newspaper },
  { href: "/dashboard/alumni", label: "alumni", icon: GraduationCap },
    { href: "/dashboard/alumni-podcasts", label: "Alumni Podcast", icon: Video },
  { href: "/dashboard/counselling", label: "Counselling", icon: Brain },
  { href: "/dashboard/ppt", label: "Update PPT", icon: FileText },
  // { href: "/dashboard/grievance-redressal-cell", label: "Grievance Redressal Cell", icon: ShieldCheck },
  // { href: "/dashboard/sc-st-grievance", label: "SC/ST Grievance", icon: ShieldCheck },
  // { href: "/dashboard/inquiries", label: "Inquiries", icon: FileText },
  { href: "/dashboard/profile", label: "Profile", icon: UserCog },

];

export function SidebarNavItems() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} passHref legacyBehavior>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.href || (item.href !== "/dashboard" && pathname===item.href)}
              className={cn(
                "justify-start",
                pathname === item.href || (item.href !== "/dashboard" && "/dashboard" && pathname===item.href)
                  ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                  : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
              tooltip={item.label}
            >
              <a>
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </a>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
