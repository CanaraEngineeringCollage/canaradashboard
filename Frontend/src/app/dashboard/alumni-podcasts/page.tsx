"use client";
import { PageTitle } from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { decryptToken } from "@/lib/encrypt";
import { api } from "@/lib/axiosClient";
import { Video, Loader2, Trash2, Pencil, X, Upload } from "lucide-react";
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
  thumbnailUrl?: string; // Newly added URL column
  createdAt: string;
}

const AlumniPodcastsPage = () => {
  const [podcasts, setPodcasts] = useState<AlumniPodcast[]>([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || !title) return;

    setSubmitting(true);
    try {
      const encrypted = localStorage.getItem("token");
      const token = encrypted ? decryptToken(encrypted) : null;

      const formData = new FormData();
      formData.append("title", title);
      formData.append("url", url);
      if (selectedImage) {
        formData.append("thumbnail", selectedImage);
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      if (editingId) {
        await api.patch(`/alumni/podcast/${editingId}`, formData, { headers });
        toast({ title: "Success", description: "Podcast updated successfully" });
      } else {
        await api.post("/alumni/podcast", formData, { headers });
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
    setSelectedImage(null);
    setImagePreview(getThumbnailSrc(podcast));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setTitle("");
    setUrl("");
    setSelectedImage(null);
    setImagePreview(null);
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

  const getThumbnailSrc = (podcast: AlumniPodcast) => {
    if (podcast.thumbnailUrl) {
      return `${api.defaults.baseURL}/alumni/file/${podcast.thumbnailUrl}`;
    }
    return null;
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input id="title" placeholder="Podcast Title" value={title} onChange={(e) => setTitle(e.target.value)} disabled={submitting} />
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
          </div>

          <div className="space-y-2">
            <label htmlFor="thumbnail" className="text-sm font-medium">
              Thumbnail Image
            </label>

            <div
              className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setIsDragging(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                const file = e.dataTransfer.files?.[0];
                if (file) {
                  const event = { target: { files: [file] } } as unknown as React.ChangeEvent<HTMLInputElement>;
                  handleImageChange(event);
                }
              }}
              onClick={() => document.getElementById("thumbnail")?.click()}
            >
              <Upload className={`h-10 w-10 mb-2 ${isDragging ? "text-blue-500" : "text-gray-400"}`} />
              <p className="text-sm text-gray-600 font-medium">{isDragging ? "Drop the image here" : "Drag & drop image or click to browse"}</p>
              <p className="text-xs text-gray-400 mt-1">Supports: JPG, PNG, GIF</p>
              <Input id="thumbnail" type="file" accept="image/*" onChange={handleImageChange} disabled={submitting} className="hidden" />
            </div>

            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Preview:</p>
                <div className="relative h-40 w-fit shrink-0 rounded-md overflow-hidden border shadow-sm">
                  <img src={imagePreview} alt="Preview" className="h-full w-auto object-cover" />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6 rounded-full"
                    onClick={() => {
                      setSelectedImage(null);
                      setImagePreview(null);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          <Button type="submit" disabled={submitting || !url || !title || (!editingId && !selectedImage)} className="w-full md:w-auto self-start">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {podcasts.map((podcast) => (
              <div key={podcast.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gray-100 relative">
                  {podcast.thumbnailUrl ? (
                    <img src={getThumbnailSrc(podcast) || ""} alt={podcast.title} className="w-full h-[300px] object-fit" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Video className="h-12 w-12" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg line-clamp-1" title={podcast.title}>
                    {podcast.title}
                  </h3>
                  <a
                    href={podcast.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline mt-1 block truncate"
                  >
                    Watch on YouTube
                  </a>
                  <p className="text-xs text-gray-500 mt-2">{new Date(podcast.createdAt).toLocaleDateString("en-GB")}</p>

                  <div className="mt-4 flex justify-end space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(podcast)}>
                      <Pencil className="h-4 w-4 mr-2" /> Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeleteId(podcast.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-2" /> Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
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