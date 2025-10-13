"use client";
import React, { useEffect, useState } from "react";
import EventModal from "./components/EventModal/EventModal";
import { PageTitle } from "@/components/page-title";
import { LandPlot, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Event } from "@/lib/types";
import { createEvent, deleteEvent, editEvent, getAllEvents } from "@/lib/events";
import { useToast } from "@/hooks/use-toast";
interface DeleteConfirmationModalProps {
  isOpen: boolean;
  id: string | null;
  onClose: () => void;
  onConfirm: (id: string) => void;
  itemName?: string;
}

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Partial<Event>>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isLoading,setIsLoading]=useState(false);
    const { toast } = useToast();

  console.log(events, "events");

  const fetchEvents = async () => {
    setIsLoading(true);
    const res = await getAllEvents();

    // Sort by createdAt descending (recent first)
    const sortedEvents = res.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setEvents(sortedEvents);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteEvent(id);
      setEvents((prev) => prev.filter((e) => e.id !== id));
       toast({
            title: "Success",
            description: "Event deleted successfully.",
          });

    } catch (err) {
      console.error("Error deleting event:", err);
        toast({
            title: "Error",
            description: "Failed to delete event.",
              variant: "destructive",
          });
    } finally {
      setDeleteModalOpen(false);
      setDeleteId(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", selectedEvent.title || "");
    // formData.append("tagline", selectedEvent.tagline || "");
    formData.append("description", selectedEvent.description || "");
    formData.append("date", selectedEvent.date || "");
    formData.append("category", selectedEvent.category || "");

    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      if (isEdit && selectedEvent.id) {
        await editEvent(selectedEvent.id, formData);
      } else {
        await createEvent(formData);
      }
        toast({
            title: "Success",
            description: "Event submitted successfully.",
          });


      setShowModal(false);
      setSelectedEvent({});
      setSelectedFile(null);
      setPreviewUrl(null);
      setIsEdit(false);
      fetchEvents();
    } catch (err) {
      console.error("Error submitting event:", err);
        toast({
            title: "Error",
            description: "Failed to submit event.",
              variant: "destructive",
          });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (name === "image" && files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setSelectedEvent({
        ...selectedEvent,
        [name]: value,
      });
    }
  };

  const bufferToBase64 = (buffer: { type: string; data: number[] }) => {
    const binary = buffer.data.reduce((acc, byte) => acc + String.fromCharCode(byte), "");
    const base64 = btoa(binary);
    return `data:image/jpeg;base64,${base64}`;
  };

  const categories = ["All", ...Array.from(new Set(events.map((e) => e.category)))];

  const filteredEvents = selectedCategory === "All" ? events : events.filter((e) => e.category === selectedCategory);

  return (
    <div className="p-6">
      <PageTitle
        title="Manage Events"
        icon={LandPlot}
        action={
          <Button
            onClick={() => {
              setIsEdit(false);
              setSelectedEvent({});
              setSelectedFile(null);
              setPreviewUrl(null);
              setShowModal(true);
            }}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Events
          </Button>
        }
      />

      <div className="flex items-center mb-4 gap-4">
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="border rounded px-3 py-2">
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((event) => (
              <tr key={event.id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-2">
                  {(() => {
                    const d = new Date(event.date);
                    const day = String(d.getDate()).padStart(2, "0"); // 2-digit day
                    const month = String(d.getMonth() + 1).padStart(2, "0"); // 2-digit month
                    const year = d.getFullYear();
                    return `${day}/${month}/${year}`;
                  })()}
                </td>
                <td className="px-4 py-2">
                  <img src={bufferToBase64(event.image)} alt={event.title} className="w-32 h-20 object-cover rounded ml-4" />
                </td>
                <td className="px-4 py-2">{event.title}</td>
                <td className="px-4 py-2">{event.description}</td>
                <td className="px-4 py-2">{event.category}</td>
                <td className="px-4 py-2 ">
                    <div className="flex items-center justify-center">

                  <button
                    className="px-4 py-1 rounded bg-red-100 text-red-700 border border-red-300 hover:bg-red-200 mr-2"
                    onClick={() => {
                      setDeleteId(event.id);
                      setDeleteModalOpen(true);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="px-4 py-1 rounded bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
                    onClick={() => {
                      setIsEdit(true);
                      setSelectedEvent(event);
                      setSelectedFile(null);
                      setPreviewUrl(bufferToBase64(event.image));
                      setShowModal(true);
                    }}
                  >
                    Edit
                  </button>
                   </div>
                </td>
              </tr>
            ))}
               {isLoading ? (
  <tr>
    <td colSpan={9} className="border px-4 py-6 text-center text-gray-600">
      Loading Events...
    </td>
  </tr>
) : filteredEvents.length === 0 && (
  <tr>
    <td colSpan={9} className="px-4 py-6 text-center text-gray-500">
      No Events found.
    </td>
  </tr>
) 
}

          </tbody>
        </table>
      </div>

      {/* Event Modal */}
      <EventModal
        isOpen={showModal}
        isEdit={isEdit}
        eventData={selectedEvent}
        imagePreview={previewUrl}
        onClose={() => {
          setShowModal(false);
          setIsEdit(false);
          setSelectedEvent({});
          setSelectedFile(null);
          setPreviewUrl(null);
        }}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        id={deleteId || ""}
        itemName="this event"
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default EventsPage;

function DeleteConfirmationModal({ isOpen, id, onClose, onConfirm, itemName = "this item" }: DeleteConfirmationModalProps) {
  if (!isOpen || !id) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirm Delete</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <strong>{itemName}</strong>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-md text-sm bg-gray-200 hover:bg-gray-300">
            Cancel
          </button>
          <button onClick={() => onConfirm(id)} className="px-4 py-2 rounded-md text-sm bg-red-600 text-white hover:bg-red-700">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
