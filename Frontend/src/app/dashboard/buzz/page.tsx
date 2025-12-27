"use client";

import { useState, useEffect } from "react";
import { parse } from "node-html-parser";
import { PageTitle } from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { PlusCircle, Megaphone } from "lucide-react";
import { BuzzEditor } from "./components/buzz-editor";
import TablePagination from "@/components/ui/TablePagination";
import { useToast } from "@/hooks/use-toast";
import {
  createBuzz,
  deleteBuzz,
  editBuzz,
  getAllBuzz,
  getCategories,
} from "@/lib/buzz";
import { useRouter } from "next/navigation";
import { decryptToken } from "@/lib/encrypt";

interface Buzz {
  id: string;
  content: string;
  design: object;
  category?: string;
  eventDate?: string;
  createdAt: string;
  updatedAt: string;
  eventName?: string;
}

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  id: string | null;
  onClose: () => void;
  onConfirm: (id: string) => void;
  itemName?: string;
}

const extractContent = (html: string) => {
  try {
    const root = parse(html);
    const firstHeading = root.querySelector("h1,h2,h3,h4,h5,h6")?.text?.trim();
    const firstP = root.querySelector("p")?.text?.trim();
    const firstImg = root.querySelector("img")?.getAttribute("src");

    return {
      title: firstHeading || "No Title",
      excerpt: firstP || "No description available",
      image: firstImg || "/placeholder.jpg",
    };
  } catch {
    return {
      title: "Invalid HTML",
      excerpt: "",
      image: "/placeholder.jpg",
    };
  }
};

function DeleteConfirmationModal({
  isOpen,
  id,
  onClose,
  onConfirm,
  itemName = "this item",
}: DeleteConfirmationModalProps) {
  if (!isOpen || !id) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Confirm Delete
        </h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <strong>{itemName}</strong>? This
          action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-sm bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(id)}
            className="px-4 py-2 rounded-md text-sm bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BuzzPage() {
  const [buzzes, setBuzzes] = useState<Buzz[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingBuzz, setEditingBuzz] = useState<Buzz | null>(null);
  const [deleteBuzzId, setDeleteBuzzId] = useState<string | null>(null);

  const [category, setCategory] = useState<string>(""); // filter category
  const [search, setSearch] = useState<string>(""); // search text
  const [categories, setCategories] = useState<string[]>([]); // dropdown options
  

  const { toast } = useToast();
  const router = useRouter();

  // ✅ Auth check (your existing logic)
  useEffect(() => {
    const encrypted = localStorage.getItem("token");

    if (!encrypted) {
      router.push("/login");
      return;
    }

    try {
      const decrypted = decryptToken(encrypted);
      if (!decrypted || decrypted.length < 10) {
        localStorage.removeItem("token");
        router.push("/login");
      }
    } catch (err) {
      localStorage.removeItem("token");
      router.push("/login");
    }
  }, [router]);

  // ✅ Fetch categories (for dropdown)
  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast({
        title: "Error",
        description: "Failed to load categories.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ✅ Fetch buzz list (with filters)
  useEffect(() => {
    fetchBuzzes(currentPage, limit, category, search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, limit, category, search]);

  const fetchBuzzes = async (
    page: number,
    limit: number,
    categoryFilter: string,
    searchTerm: string
  ) => {
    try {
      const response = await getAllBuzz(page, limit, categoryFilter, searchTerm);
      setBuzzes(response.data);
      setTotalPages(response.meta.totalPages);
    } catch (error) {
      console.error("Error fetching buzzes:", error);
      toast({
        title: "Error",
        description: "Failed to load buzzes. Please try again.",
        variant: "destructive",
      });
    }
  };

  const DeleteBuzz = async (id: string) => {
    try {
      await deleteBuzz(id);
      await fetchBuzzes(currentPage, limit, category, search);
      await fetchCategories(); // Refresh categories
      toast({
        title: "Success",
        description: "Buzz deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting buzz:", error);
      toast({
        title: "Error",
        description: "Failed to delete buzz. Please try again.",
        variant: "destructive",
      });
    }
    setDeleteBuzzId(null);
  };

  const handleAddBuzz = () => {
    setEditingBuzz(null);
    setIsEditorOpen(true);
    
  };

  const handleEditBuzz = (buzz: Buzz) => {
    setEditingBuzz(buzz);
    setIsEditorOpen(true);
  };


  console.log(buzzes);
  return (
    <>
      <PageTitle
        title="Manage Buzz"
        icon={Megaphone}
        action={
          <Button onClick={handleAddBuzz}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Buzz
          </Button>
        }
      />

      {/* ✅ Filters row */}
   <div className="mt-6 mb-4 flex flex-wrap items-center gap-4 w-full">

        {/* Category Dropdown */}
          <div className="flex w-[40%]">
          <input
            type="text"
            placeholder="Search buzz (content / event name)..."
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          
          <select
            className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Search Bar */}
      
      </div>

      <div className="space-y-6">
        {buzzes.map((buzz) => {
          const { title, excerpt, image } = extractContent(buzz.content);

          return (
            <div
              key={buzz.id}
              className="rounded-lg border bg-card p-6 shadow-sm"
            >
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2">Image</th>
                    <th className="border border-gray-300 p-2">Name</th>
                    <th className="border border-gray-300 p-2">Description</th>
                    <th className="border border-gray-300 p-2">Category</th>
                    <th className="border border-gray-300 p-2">Event Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">
                      {image && (
                        <img
                          src={image}
                          alt={title}
                          className="w-32 h-20 object-cover rounded-md"
                        />
                      )}
                    </td>
                    <td className="border border-gray-300 p-2 align-top">
                      <h2 className="text-lg font-semibold">{buzz.eventName}</h2>
                    </td>
                    <td className="border border-gray-300 p-2 align-top">
                      <p className="text-sm text-muted-foreground">
                        {excerpt}
                      </p>
                    </td>
                    <td className="border border-gray-300 p-2 align-top">
                      <p className="text-sm text-muted-foreground">
                        {buzz.category || "-"}
                      </p>
                    </td>
                    <td className="border border-gray-300 p-2 align-top">
                      <p className="text-sm text-muted-foreground">
                        {buzz.eventDate
                          ? new Date(buzz.eventDate).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-4 flex justify-between items-center text-sm text-muted-foreground">
                <div>
                  Last updated:{" "}
                  {new Date(buzz.updatedAt).toLocaleDateString()}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDeleteBuzzId(buzz.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditBuzz(buzz)}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          );
        })}

        {buzzes.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No buzz items found. Try changing filters or click &quot;Add Buzz&quot; to
            create one.
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="mt-6">
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          rowsPerPage={limit}
          onPageChange={setCurrentPage}
          onRowsPerPageChange={(rows) => {
            setLimit(rows);
            setCurrentPage(1);
          }}
        />
      </div>

      <DeleteConfirmationModal
        isOpen={!!deleteBuzzId}
        id={deleteBuzzId}
        onClose={() => setDeleteBuzzId(null)}
        onConfirm={DeleteBuzz}
        itemName="this buzz"
      />

      <BuzzEditor
        isOpen={isEditorOpen}
        onClose={() => {
          setIsEditorOpen(false);
          setEditingBuzz(null);
        }}
        isEditing={editingBuzz}
        initialDesign={editingBuzz?.design}
        initialCategory={editingBuzz?.category}
        initialEventDate={editingBuzz?.eventDate}
        initalEventName={editingBuzz?.eventName}
        onSave={async (html, design, categoryValue, eventDate, eventName) => {
          try {
            if (editingBuzz) {
              await editBuzz(
                editingBuzz.id,
                html,
                design,
                categoryValue,
                eventDate,
                eventName
              );
              setEditingBuzz(null);
              setIsEditorOpen(false);
            } else {
              await createBuzz(
                html,
                design,
                categoryValue,
                eventDate,
                eventName
              );
              setEditingBuzz(null);
              setIsEditorOpen(false);
            }

            // ✅ Refresh with current filters
            await fetchBuzzes(currentPage, limit, category, search);
            await fetchCategories(); // Refresh categories
            
            toast({
              title: "Success",
              description: `${
                editingBuzz ? "Updated" : "Created"
              } buzz successfully.`,
            });
          } catch (error) {
            console.error(
              `Error ${editingBuzz ? "updating" : "creating"} buzz:`,
              error
            );
            toast({
              title: "Error",
              description: `${
                editingBuzz ? "Update" : "Create"
                } buzz failed. Please try again.`,
              variant: "destructive",
            });
          }
        }}
      />
    </>
  );
}
