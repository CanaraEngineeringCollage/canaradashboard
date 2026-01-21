"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { apiFetch } from "@/lib/client";
import { decryptToken } from "@/lib/encrypt";

type NotificationType = "Admission" | "Alumni" | "Placement" | "Counselling";

export interface NotificationItem {
  type: NotificationType;
  count: number;
  latestTimestamp: number;
}

interface NotificationContextType {
  notifications: NotificationItem[];
  totalNotifications: number;
  loading: boolean;
  refreshNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [totalNotifications, setTotalNotifications] = useState(0);
  const [loading, setLoading] = useState(true);

  // Helper to fetch counts
  // Since the APIs are paginated, we just check the latest item's timestamp
  // against a locally stored "lastChecked" timestamp to determine "new" items.
  // However, for simplicity and "alert" behaviour, we might initially just check if there are *any* items
  // created after the last time the user "cleared" or "viewed" notifications.
  // BUT, the requirement is "form submission happened the notficaiton thing want to works".
  // So let's store the latest ID or timestamp we've seen in localStorage.

  const fetchEndpoint = async (endpoint: string, key: NotificationType) => {
    try {
      const encrypted = localStorage.getItem("token");
      const token = encrypted ? decryptToken(encrypted) : null;
      if (!token) return { count: 0, latest: 0 };

      // Fetch page 1, limit 1 to get the latest
      const result = await apiFetch(`${endpoint}?page=1&limit=1`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = result.data || [];
      if (data.length > 0) {
        const latestItem = data[0];
        const latestTime = new Date(latestItem.createdAt).getTime();

        // This is a naive implementation: we are just getting the latest time.
        // To show a "badge count", we need to compare this with what user has "seen".
        // For now, we'll return the latest timestamp.
        return { count: 1, latest: latestTime };
      }
    } catch (e) {
      console.error(`Failed to fetch ${endpoint}`, e);
    }
    return { count: 0, latest: 0 };
  };

  const checkNotifications = async () => {
    // We will check all 4 endpoints
    const endpoints: { url: string; type: NotificationType }[] = [
      { url: "/admission-enquiries", type: "Admission" },
      { url: "/alumni", type: "Alumni" },
      { url: "/placement", type: "Placement" },
      { url: "/counselling", type: "Counselling" },
    ];

    const results: NotificationItem[] = [];
    let grandTotal = 0;

    // Get last viewed timestamp from local storage
    const lastViewedMapStr = localStorage.getItem("notificationLastViewed");
    const lastViewedMap: Record<string, number> = lastViewedMapStr ? JSON.parse(lastViewedMapStr) : {};

    for (const ep of endpoints) {
      // We really need to know HOW MANY are new.
      // But the API only gives us paginated lists.
      // Doing a count of everything > lastViewedTime would require fetching until we hit that time.
      // For polling efficiency, let's just fetch the latest one.
      // If latest > lastViewed, we show a notification (maybe just "1+" or a dot).

      const res = await fetchEndpoint(ep.url, ep.type);
      if (res.latest > (lastViewedMap[ep.type] || 0)) {
        // It's new!
        results.push({ type: ep.type, count: 1, latestTimestamp: res.latest });
        grandTotal++;
      }
    }

    setNotifications(results);
    setTotalNotifications(grandTotal);
    setLoading(false);
  };

  useEffect(() => {
    checkNotifications();
    const interval = setInterval(checkNotifications, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        totalNotifications,
        loading,
        refreshNotifications: checkNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};
