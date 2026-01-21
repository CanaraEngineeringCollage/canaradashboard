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

  const fetchEndpoint = async (endpoint: string, key: NotificationType, lastViewedTime: number) => {
    try {
      const encrypted = localStorage.getItem("token");
      const token = encrypted ? decryptToken(encrypted) : null;
      if (!token) return { count: 0, latest: 0 };

      // Fetch page 1, limit 1000 to get the latest batch
      const result = await apiFetch(`${endpoint}?page=1&limit=1000`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = result.data || [];
      if (data.length > 0) {
        const latestItem = data[0];
        const latestTime = new Date(latestItem.createdAt).getTime();

        // Calculate count of new items
        // If latestTime <= lastViewedTime, then 0 new
        if (latestTime <= lastViewedTime) {
          return { count: 0, latest: latestTime };
        }

        // Count how many are newer than lastViewedTime
        let newCount = 0;
        for (const item of data) {
          if (new Date(item.createdAt).getTime() > lastViewedTime) {
            newCount++;
          } else {
            break; // Since it's sorted desc, once we hit an old one, all remaining are old
          }
        }

        // If we filled the batch (20) and all were new, we might have more.
        // But for UI "standard", just showing "20+" or the actual number up to 20 is fine.
        return { count: newCount, latest: latestTime };
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
      const lastViewed = lastViewedMap[ep.type] || 0;
      const res = await fetchEndpoint(ep.url, ep.type, lastViewed);

      if (res.count > 0) {
        results.push({ type: ep.type, count: res.count, latestTimestamp: res.latest });
        grandTotal += res.count;
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
