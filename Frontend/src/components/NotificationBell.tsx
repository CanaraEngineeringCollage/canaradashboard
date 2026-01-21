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
  const { notifications, totalNotifications, refreshNotifications } = useNotifications();
  const router = useRouter();

  const handleClick = (type: string) => {
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
    // Ideally we would also "mark as read" here, which would involve updating
    // the local storage timestamp for that specific type to the current time
    // or the notification's latestTimestamp.
    // For now, let's update the localStorage basic "lastViewed" map.
    const lastViewedMapStr = localStorage.getItem("notificationLastViewed");
    const lastViewedMap = lastViewedMapStr ? JSON.parse(lastViewedMapStr) : {};

    // Find the notification of this type
    const notif = notifications.find((n) => n.type === type);
    if (notif) {
      lastViewedMap[type] = notif.latestTimestamp;
      localStorage.setItem("notificationLastViewed", JSON.stringify(lastViewedMap));
      refreshNotifications(); // Re-run check to clear the badge
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
          <Bell className="h-5 w-5" />
          {totalNotifications > 0 && <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-600" />}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <div className="p-2 text-sm text-center text-muted-foreground">No new notifications</div>
        ) : (
          notifications.map((notif) => (
            <DropdownMenuItem key={notif.type} onClick={() => handleClick(notif.type)} className="cursor-pointer">
              <div className="flex flex-col">
                <span className="font-medium">{notif.type}</span>
                <span className="text-xs text-muted-foreground">New submission received</span>
              </div>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
