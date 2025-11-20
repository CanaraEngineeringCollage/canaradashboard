"use client";

import { useState, useEffect } from "react";
import { PageTitle } from "@/components/page-title";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { UsersRound, ShieldCheck, GraduationCap, Brain, LayoutDashboard, PartyPopper } from "lucide-react";
import { getAllFaculty, getFacultyCount } from "@/lib/faculty";
import { getGrievances } from "@/lib/grievance";
import { getScStGrievances } from "@/lib/scstGrievances";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [facultyCount, setFacultyCount] = useState<number | null>(null);
  const [grievanceCount, setGrievanceCount] = useState<number | null>(null);
  const [scstGrievanceCount, setScstGrievanceCount] = useState<number | null>(null);
  const [counsellingCount, setCounsellingCount] = useState<number | null>(null);
  const [alumniCount, setAlumniCount] = useState<number | null>(null);
  const [eventsCount, setEventsCount] = useState<number | null>(null);
  const [buzzCount, setBuzzCount] = useState<number | null>(null);


const router = useRouter();

useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

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
     const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/buzz/count`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setBuzzCount(data.count);
  } catch (error) {
    console.error(error);
  }
  };

    const fetchEventsCounts = async () => {
    const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/count`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setEventsCount(data.count);
  } catch (error) {
    console.error(error);
  }
  };

const fetchCounsellingCount = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/counselling/count`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setCounsellingCount(data.count);
  } catch (error) {
    console.error(error);
  }
};


  const fetchAlumniCount = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/alumni/count`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setAlumniCount(data.count);
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
  }, []);

  // 🔹 Reusable card with skeleton
  const StatCard = ({
    title,
    icon: Icon,
    count,
    description,
  }: {
    title: string;
    icon: any;
    count: number | null;
    description: string;
  }) => (
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
        <StatCard
          title="Total Faculty"
          icon={UsersRound}
          count={facultyCount}
          description="Number of faculty members currently active"
        />
        {/* <StatCard
          title="SC/ST Grievance Received"
          icon={ShieldCheck}
          count={scstGrievanceCount}
          description="Grievances submitted by SC/ST category users"
        /> */}
        <StatCard
          title="Events"
          icon={PartyPopper}
          count={eventsCount}
          description="Number of Events"
        />
          <StatCard
          title="Buzz"
          icon={Brain}
          count={buzzCount}
          description="Number of Buzz"
        />
            <StatCard
          title="Counselling Received"
          icon={Brain}
          count={counsellingCount}
          description="Requests for counselling sessions from visitors"
        />
        <StatCard
          title="Alumni Received"
          icon={GraduationCap}
          count={alumniCount}
          description="Total queries received from alumni"
        />
        {/* <StatCard
          title="Grievance Received"
          icon={ShieldCheck}
          count={grievanceCount}
          description="Total grievances submitted by website visitors"
        /> */}
      </div>
    </>
  );
}
