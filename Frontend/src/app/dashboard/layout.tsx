"use client";
import { useEffect, type ReactNode } from "react";
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SidebarNavItems } from "@/components/sidebar-nav-items";
import { LogOut, Bell } from "lucide-react";
import axios from "axios";
import { toast, useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useAuth } from "@/utils/useAuth";
export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
   const { toast } = useToast();

  const admin = useSelector((state: any) => state.admin);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const logoutHandler = async () => {
    const token = localStorage.getItem("token");
    localStorage.removeItem("token"); // ✅ clear JWT
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/logout`, {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ send JWT in headers
      },
    });
      toast({
          title: "Success",
          description: "Logged out successfully.",
         
        });
    router.push("/login");
  };

  return (
    <SidebarProvider defaultOpen>
      <Sidebar collapsible="icon" variant="sidebar" side="left" className="border-r">
        <SidebarHeader className="h-16 flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/navIcon.png" alt="Admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <h1 className="text-lg font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">Canara Engineering College</h1>
          </div>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarNavItems />
        </SidebarContent>
        <SidebarFooter className="p-4 group-data-[collapsible=icon]:p-2">
          <div className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/canaraLogo.svg" alt="Admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-sidebar-foreground">{admin.name}</span>
              <span className="text-xs text-sidebar-foreground/70">{admin.email}</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 group-data-[collapsible=icon]:flex hidden mx-auto text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-6 backdrop-blur-md">
          <SidebarTrigger className="md:hidden" />
          <div className="flex items-center gap-4 ml-auto">
            {/* <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button> */}
            <Avatar className="h-9 w-9">
              <AvatarImage src="/canaraLogo.svg" alt="Admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <Button onClick={logoutHandler} variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Log Out</span>
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
