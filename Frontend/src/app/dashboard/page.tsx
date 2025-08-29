"use client";

import { useState, useEffect } from "react";
import { PageTitle } from "@/components/page-title";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { UsersRound, Newspaper, FileText, LayoutDashboard, ShieldCheck, GraduationCap, Brain } from "lucide-react";
import { initialFaculties, initialBuzzItems, initialInquiries } from "@/lib/data";
import type { Faculty, Buzz, Inquiry } from "@/lib/types";
import { getAllBuzz } from "@/lib/buzz";
import { getAllFaculty } from "@/lib/faculty";
import axios from "axios";
import { getGrievances } from "@/lib/grievance";
import { getScStGrievances } from "@/lib/scstGrievances";


export default function DashboardPage() {
  const [facultyCount, setFacultyCount] = useState(0);
  const [buzzCount, setBuzzCount] = useState(0);
  const [inquiryCount, setInquiryCount] = useState(0);
  const [grievanceCount, setGrievanceCount] = useState(0);
  const [scstGrievanceCount, setScstGrievanceCount] = useState(0);
  const [counsellingCount, setCounsellingCount] = useState(0);
  const [alumniCount, setAlumniCount] = useState(0);

  // Load Faculty & Buzz counts
  const fetchAllData = async () => {
    try {
      const buzz = await getAllBuzz();
      const faculties = await getAllFaculty();
      setBuzzCount(buzz.length);
      setFacultyCount(faculties.length);
    } catch (error) {
      console.error(error);
    }
  };

  // Load Grievance counts
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

  // Load Counselling count
  const fetchCounsellingCount = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/counselling`);
      const data = await res.json();
      setCounsellingCount(data.length);
    } catch (error) {
      console.error(error);
    }
  };

  // Load Alumni count
  const fetchAlumniCount = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/alumni`);
      const data = await res.json();
      setAlumniCount(data.length);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllData();
    fetchGrievanceCounts();
    fetchCounsellingCount();
    fetchAlumniCount();

    // fallback initial data
    setFacultyCount(initialFaculties.length);
    setBuzzCount(initialBuzzItems.length);
    setInquiryCount(initialInquiries.length);
  }, []);
  

  return (
    <>
      <PageTitle title="Dashboard" icon={LayoutDashboard} />
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Total Faculty</CardTitle>
      <UsersRound className="h-5 w-5 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{facultyCount}</div>
      <p className="text-xs text-muted-foreground">Number of faculty members currently active</p>
    </CardContent>
  </Card>

  

  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">SC/ST Grievance Received</CardTitle>
      <ShieldCheck className="h-5 w-5 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{scstGrievanceCount}</div>
      <p className="text-xs text-muted-foreground">Grievances submitted by SC/ST category users</p>
    </CardContent>
  </Card>

  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Counselling Received</CardTitle>
      <Brain className="h-5 w-5 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{counsellingCount}</div>
      <p className="text-xs text-muted-foreground">Requests for counselling sessions from visitors</p>
    </CardContent>
  </Card>

  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Alumni Received</CardTitle>
      <GraduationCap className="h-5 w-5 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{alumniCount}</div>
      <p className="text-xs text-muted-foreground">Total queries received from alumni</p>
    </CardContent>
  </Card>
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Grievance Received</CardTitle>
      <ShieldCheck className="h-5 w-5 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{grievanceCount}</div>
      <p className="text-xs text-muted-foreground">Total grievances submitted by website visitors</p>
    </CardContent>
  </Card>
</div>

    
    </>
  );
}
