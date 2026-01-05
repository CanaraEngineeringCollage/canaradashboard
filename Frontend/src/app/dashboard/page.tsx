"use client";

import { useState, useEffect } from "react";
import { PageTitle } from "@/components/page-title";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { UsersRound, ShieldCheck, GraduationCap, Brain, LayoutDashboard, PartyPopper, Video, Briefcase, Images } from "lucide-react";
import { getAllFaculty, getFacultyCount } from "@/lib/faculty";
import { getGalleryCount } from "@/lib/gallery";
import { getGrievances } from "@/lib/grievance";
import { getScStGrievances } from "@/lib/scstGrievances";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { decryptToken } from "@/lib/encrypt";
import { getToken } from "@/lib/token";
import { apiFetch } from "@/lib/client";

export default function DashboardPage() {
  const [facultyCount, setFacultyCount] = useState<number | null>(null);
  const [grievanceCount, setGrievanceCount] = useState<number | null>(null);
  const [scstGrievanceCount, setScstGrievanceCount] = useState<number | null>(null);
  const [counsellingCount, setCounsellingCount] = useState<number | null>(null);
  const [alumniCount, setAlumniCount] = useState<number | null>(null);
  const [eventsCount, setEventsCount] = useState<number | null>(null);
  const [buzzCount, setBuzzCount] = useState<number | null>(null);
  const [placementCount, setPlacementCount] = useState<number | null>(null);
  const [podcastCount, setPodcastCount] = useState<number | null>(null);
  const [admissionCount, setAdmissionCount] = useState<number | null>(null);
  const [galleryCount, setGalleryCount] = useState<number | null>(null);

  const router = useRouter();

  useEffect(() => {
    const encrypted = localStorage.getItem("token");

    if (!encrypted) {
      router.push("/login");
      return;
    }

    try {
      const decrypted = decryptToken(encrypted);

      // Token invalid or empty → logout
      if (!decrypted || decrypted.length < 10) {
        localStorage.removeItem("token");
        router.push("/login");
      }
    } catch {
      localStorage.removeItem("token");
      router.push("/login");
    }
  }, []);

  const fetchAllData = async () => {
    try {
      const res = await getFacultyCount();
      setFacultyCount(res.count);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchGrievanceCounts = async () => {
    try {
      const grievances = await getGrievances();
      setGrievanceCount(grievances.length);

      const scstGrievances = await getScStGrievances();
      setScstGrievanceCount(scstGrievances.length);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBuzzCounts = async () => {
    const token = getToken();
    if (!token) return router.push("/login");
    try {
      const data = await apiFetch("/buzz/count", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBuzzCount(data.count);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEventsCounts = async () => {
    const token = getToken();
    if (!token) return router.push("/login");
    try {
      const data = await apiFetch("/events/count", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEventsCount(data.count);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCounsellingCount = async () => {
    const token = getToken();
    if (!token) return router.push("/login");
    try {
      const data = await apiFetch("/counselling/count", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCounsellingCount(data.count);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAlumniCount = async () => {
    const token = getToken();
    if (!token) return router.push("/login");
    try {
      const data = await apiFetch("/alumni/count", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAlumniCount(data.count);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPlacementCount = async () => {
    const token = getToken();
    if (!token) return router.push("/login");
    try {
      const data = await apiFetch("/placement/count", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPlacementCount(data.count);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPodcastCount = async () => {
    const token = getToken();
    if (!token) return router.push("/login");
    try {
      const data = await apiFetch("/alumni/podcast/count", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPodcastCount(data.count);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAdmissionCount = async () => {
    const token = getToken();
    if (!token) return router.push("/login");
    try {
      const data = await apiFetch("/admission-enquiries/count", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmissionCount(data.count);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchGalleryCount = async () => {
    try {
      const data = await getGalleryCount();
      setGalleryCount(data.count);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllData();
    fetchGrievanceCounts();
    fetchCounsellingCount();
    fetchAlumniCount();
    fetchEventsCounts();
    fetchBuzzCounts();
    fetchPlacementCount();
    fetchPodcastCount();
    fetchAdmissionCount();
    fetchGalleryCount();
  }, []);

  // 🔹 Reusable card with skeleton
  const StatCard = ({ title, icon: Icon, count, description }: { title: string; icon: any; count: number | null; description: string }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {count === null ? (
          <>
            <Skeleton className="h-8 w-16 mb-2" />
            <Skeleton className="h-3 w-40" />
          </>
        ) : (
          <>
            <div className="text-2xl font-bold">{count}</div>
            <p className="text-xs text-muted-foreground">{description}</p>
          </>
        )}
      </CardContent>
    </Card>
  );

  return (
    <>
      <PageTitle title="Dashboard" icon={LayoutDashboard} />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Total Faculty" icon={UsersRound} count={facultyCount} description="Number of faculty members currently active" />
        {/* <StatCard
          title="SC/ST Grievance Received"
          icon={ShieldCheck}
          count={scstGrievanceCount}
          description="Grievances submitted by SC/ST category users"
        /> */}
        <StatCard title="Events" icon={PartyPopper} count={eventsCount} description="Number of Events" />
        <StatCard title="Gallery" icon={Images} count={galleryCount} description="Total images in gallery" />
        <StatCard title="Buzz" icon={Brain} count={buzzCount} description="Number of Buzz" />
        <StatCard title="Admission Enquiries" icon={UsersRound} count={admissionCount} description="Total admission enquiries received" />

        <StatCard title="Counselling Received" icon={Brain} count={counsellingCount} description="Requests for counselling sessions from visitors" />
        <StatCard title="Alumni Received" icon={GraduationCap} count={alumniCount} description="Total queries received from alumni" />
        <StatCard title="Placement Received" icon={Briefcase} count={placementCount} description="Total placements received" />
        <StatCard title="Alumni Podcast" icon={Video} count={podcastCount} description="Total alumni podcasts" />
      </div>
    </>
  );
}
