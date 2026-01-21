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
  refreshNotifications: () => Promise<void>;
  markAsViewed: (type: NotificationType, timestamp: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [totalNotifications, setTotalNotifications] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lastViewedMap, setLastViewedMap] = useState<Record<string, number>>({});

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

        return { count: newCount, latest: latestTime };
      }
    } catch (e) {
      console.error(`Failed to fetch ${endpoint}`, e);
    }
    return { count: 0, latest: 0 };
  };

  const fetchStatus = async () => {
    try {
      const encrypted = localStorage.getItem("token");
      const token = encrypted ? decryptToken(encrypted) : null;
      if (!token) return {};

      const result = await apiFetch("/admin/notifications/status", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      // Map backend fields to our map
      const statusMap: Record<string, number> = {};
      if (result) {
        statusMap["Admission"] = Number(result.admissionLastViewed || 0);
        statusMap["Alumni"] = Number(result.alumniLastViewed || 0);
        statusMap["Placement"] = Number(result.placementLastViewed || 0);
        statusMap["Counselling"] = Number(result.counsellingLastViewed || 0);
      }
      return statusMap;
    } catch (e) {
      console.error("Failed to fetch notification status", e);
      return {};
    }
  };

  const markAsViewed = async (type: NotificationType, timestamp: number) => {
    // Optimistic update
    setLastViewedMap((prev) => ({ ...prev, [type]: timestamp }));

    // Trigger refresh immediately to clear badge locally
    // Logic: checkNotifications uses lastViewedMap state.
    // Wait, checkNotifications is async and inside it reads state?
    // State updates might be slow. We should pass the updated map to checkNotifications or let the next poll pick it up.
    // Better: Update state, then call API.
    // Since checkNotifications depends on `lastViewedMap`, we should probably wrap checkNotifications in useEffect dependent on lastViewedMap?
    // No, that might cause loops.
    // Let's just update the API and let the next poll (or manual refresh) handle it.
    // For immediate UI feedback, we can manually filter the displayed notifications list.

    setNotifications((prev) => prev.filter((n) => n.type !== type));
    setTotalNotifications((prev) => {
      const removed = notifications.find((n) => n.type === type);
      return prev - (removed?.count || 0);
    });

    try {
      const encrypted = localStorage.getItem("token");
      const token = encrypted ? decryptToken(encrypted) : null;
      if (token) {
        await apiFetch("/admin/notifications/status", {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: JSON.stringify({ type, timestamp }),
        });
      }
    } catch (e) {
      console.error("Failed to update status", e);
    }
  };

  const checkNotifications = async () => {
    // First fetch latest status from DB to ensure sync across devices
    const currentStatusMap = await fetchStatus();
    setLastViewedMap(currentStatusMap);

    // We will check all 4 endpoints
    const endpoints: { url: string; type: NotificationType }[] = [
      { url: "/admission-enquiries", type: "Admission" },
      { url: "/alumni", type: "Alumni" },
      { url: "/placement", type: "Placement" },
      { url: "/counselling", type: "Counselling" },
    ];

    const results: NotificationItem[] = [];
    let grandTotal = 0;

    for (const ep of endpoints) {
      const lastViewed = currentStatusMap[ep.type] || 0;
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
        markAsViewed,
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
