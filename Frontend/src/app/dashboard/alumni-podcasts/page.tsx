"use client";
import { PageTitle } from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { decryptToken } from "@/lib/encrypt";
import { api } from "@/lib/axiosClient";
import { Video, Loader2, Trash2, Pencil, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AlumniPodcast {
  id: number;
  title: string;
  url: string;
  createdAt: string;
}

const AlumniPodcastsPage = () => {
  const [podcasts, setPodcasts] = useState<AlumniPodcast[]>([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = () => {
      const encrypted = localStorage.getItem("token");
      if (!encrypted) {
        router.push("/login");
        return null;
      }
      try {
        const decrypted = decryptToken(encrypted);
        if (!decrypted || decrypted.length < 10) {
          localStorage.removeItem("token");
          router.push("/login");
          return null;
        }
        return decrypted;
      } catch (err) {
        localStorage.removeItem("token");
        router.push("/login");
        return null;
      }
    };

    checkAuth();
    fetchData();
  }, [router]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const encrypted = localStorage.getItem("token");
      const token = encrypted ? decryptToken(encrypted) : null;

      const res = await api.get("/alumni/podcast", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPodcasts(res.data);
    } catch (error) {
      console.error("Failed to fetch podcasts", error);
      toast({
        title: "Error",
        description: "Failed to fetch podcasts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || !title) return;

    setSubmitting(true);
    try {
      const encrypted = localStorage.getItem("token");
      const token = encrypted ? decryptToken(encrypted) : null;

      if (editingId) {
        await api.patch(
          `/alumni/podcast/${editingId}`,
          { title, url },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast({ title: "Success", description: "Podcast updated successfully" });
      } else {
        await api.post(
          "/alumni/podcast",
          { title, url },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast({ title: "Success", description: "Podcast uploaded successfully" });
      }

      handleCancelEdit();
      fetchData();
    } catch (error) {
      console.error("Failed to save podcast", error);
      toast({
        title: "Error",
        description: `Failed to ${editingId ? "update" : "upload"} podcast`,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (podcast: AlumniPodcast) => {
    setTitle(podcast.title);
    setUrl(podcast.url);
    setEditingId(podcast.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setTitle("");
    setUrl("");
    setEditingId(null);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const encrypted = localStorage.getItem("token");
      const token = encrypted ? decryptToken(encrypted) : null;

      await api.delete(`/alumni/podcast/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast({ title: "Success", description: "Podcast deleted successfully" });
      fetchData();
    } catch (error) {
      console.error("Failed to delete podcast", error);
      toast({
        title: "Error",
        description: "Failed to delete podcast",
        variant: "destructive",
      });
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <PageTitle title="Alumni Podcasts" icon={Video} />

      <div className="bg-white p-6 rounded-lg shadow border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{editingId ? "Edit Podcast" : "Upload New Podcast"}</h2>
          {editingId && (
            <Button variant="ghost" size="sm" onClick={handleCancelEdit}>
              <X className="h-4 w-4 mr-2" /> Cancel Edit
            </Button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-4 items-end">
          <div className="flex-1 space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              placeholder="Podcast Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={submitting}
            />
          </div>
          <div className="flex-1 space-y-2">
            <label htmlFor="url" className="text-sm font-medium">
              YouTube URL
            </label>
            <Input
              id="url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={submitting}
            />
          </div>
          <Button type="submit" disabled={submitting || !url || !title}>
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {editingId ? "Updating..." : "Uploading..."}
              </>
            ) : editingId ? (
              "Update"
            ) : (
              "Upload"
            )}
          </Button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border">
        <h2 className="text-lg font-semibold mb-4">Existing Podcasts</h2>
        {loading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
          </div>
        ) : podcasts.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No podcasts found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded At</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {podcasts.map((podcast) => (
                  <tr key={podcast.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{podcast.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:underline truncate max-w-md">
                      <a href={podcast.url} target="_blank" rel="noopener noreferrer">
                        {podcast.url}
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(podcast.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(podcast)} className="text-blue-600 hover:text-blue-900">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteId(podcast.id)} className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone. This will permanently delete the podcast.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AlumniPodcastsPage;
