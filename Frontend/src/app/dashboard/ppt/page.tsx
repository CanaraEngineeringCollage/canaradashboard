"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { PageTitle } from "@/components/page-title";
import { FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { decryptToken } from "@/lib/encrypt";
import Link from "next/link";

export default function UpdatePptPage() {
  const { toast } = useToast();
  const [link, setLink] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchLink = async () => {
      try {
        const token = getToken();
        if (!token) {
          setIsLoading(false);
          return;
        }

        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/ppt`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data?.link) {
          setLink(res.data.link);
        }
      } catch (error) {
        console.error("Failed to load PPT link", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLink();
  }, []);

  const getToken = () => {
    if (typeof window === "undefined") return null;
    const encrypted = localStorage.getItem("token");
    if (!encrypted) return null;

    try {
      return decryptToken(encrypted);
    } catch {
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = getToken();
    if (!token) {
      toast({
        title: "Missing token",
        description: "Please login again to continue.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSaving(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/ppt`,
        { link },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast({
        title: "PPT updated",
        description: "Your PPT link has been saved.",
      });

      if (res.data?.link) {
        setLink(res.data.link);
      }
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error?.response?.data?.message || "Unable to save the PPT link.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <PageTitle title="Update PPT" icon={FileText} />
      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>Add your presentation link</CardTitle>
          <CardDescription>Paste the Flipbook/Heyzine link for the latest update.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://your-flipbook-link.com"
                type="url"
                disabled={isLoading || isSaving}
                required
              />
              <p className="text-sm text-muted-foreground">
                Upload the PDF of your PPT to any flipbook maker like <Link   href="https://heyzine.com/" target="_blank"> Heyzine </Link>and paste the public link here.
              </p>
            </div>
            <Button type="submit" disabled={isLoading || isSaving}>
              {isSaving ? "Saving..." : "Save PPT Link"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className=" text-[#1D1D1F] pb-20">
      <h1 className="text-center text-3xl text-[#1D1D1F] pt-20 pb-16 md:text-[40px] lg2:text-5xl xl:text-6xl font-bold">Glimpses of CEC</h1>
      <iframe src={link}  className="w-[100%] h-[60vh] md:h-[100vh]"></iframe>
    </div>
    </>
  );
}

