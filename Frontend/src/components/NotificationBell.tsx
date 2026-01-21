"use client";

import React from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNotifications } from "@/context/NotificationContext";
import { useRouter } from "next/navigation";

export function NotificationBell() {
  const { notifications, totalNotifications, refreshNotifications, markAsViewed } = useNotifications();
  const router = useRouter();

  const handleClick = (type: any) => {
    // Navigate to the respective page
    switch (type) {
      case "Admission":
        router.push("/dashboard/admission-enquiries");
        break;
      case "Alumni":
        router.push("/dashboard/alumni");
        break;
      case "Placement":
        router.push("/dashboard/placement");
        break;
      case "Counselling":
        router.push("/dashboard/counselling");
        break;
    }

    // Find the notification of this type
    const notif = notifications.find((n) => n.type === type);
    if (notif) {
      markAsViewed(type, notif.latestTimestamp);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-muted-foreground hover:text-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <Bell className="h-5 w-5" />
          {totalNotifications > 0 && (
            <span className="absolute -top-1 -right-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-600 px-1 text-[9px] font-bold text-white shadow-sm">
              {totalNotifications > 99 ? "99+" : totalNotifications}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0 shadow-lg border rounded-lg">
        <div className="flex items-center justify-between p-4 border-b bg-muted/30">
          <DropdownMenuLabel className="p-0 text-sm font-semibold">Notifications</DropdownMenuLabel>
          {totalNotifications > 0 && <span className="text-xs text-muted-foreground">{totalNotifications} Unread</span>}
        </div>

        <div className="max-h-[300px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              <div className="mb-2 flex justify-center">
                <Bell className="h-8 w-8 text-muted-foreground/30" />
              </div>
              No new notifications
            </div>
          ) : (
            notifications.map((notif) => (
              <DropdownMenuItem
                key={notif.type}
                onClick={() => handleClick(notif.type)}
                className="cursor-pointer gap-3 p-3 focus:bg-accent/50 group border-b last:border-0"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary  transition-colors">
                  <Bell className="h-4 w-4" />
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">{notif.type}</span>
                    <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold text-white bg-red-600 rounded-full">
                      {notif.count > 99 ? "99+" : notif.count}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground mt-0.5">
                    {notif.count === 1 ? "1 new submission" : `${notif.count} new submissions`}
                  </span>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
