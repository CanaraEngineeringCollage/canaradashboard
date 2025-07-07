// EventsPage.tsx
"use client";
import React, { useEffect, useState } from "react";
import EventModal from "./components/EventModal/EventModal";
import { PageTitle } from "@/components/page-title";
import { LandPlot, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Event } from "@/lib/types";

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Partial<Event>>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fetchEvents = async () => {
    const res = await fetch("http://localhost:3000/events");
    const data = await res.json();
    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id: string) => {
    await fetch(`http://localhost:3000/events/${id}`, { method: "DELETE" });
    fetchEvents();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", selectedEvent.title || "");
    formData.append("tagline", selectedEvent.tagline || "");
    formData.append("description", selectedEvent.description || "");
    formData.append("date", selectedEvent.date || "");
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    const method = isEdit ? "PUT" : "POST";
    const url = isEdit
      ? `http://localhost:3000/events/${selectedEvent.id}`
      : "http://localhost:3000/events";

    await fetch(url, {
      method,
      body: formData,
    });

    setShowModal(false);
    setSelectedEvent({});
    setSelectedFile(null);
    setPreviewUrl(null);
    setIsEdit(false);
    fetchEvents();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

      {events.map((event) => (
        <div
          key={event.id}
          className="bg-white border border-gray-200 shadow-sm rounded p-4 mb-4"
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold mb-1">{event.title}</h2>
              <p className="text-sm text-gray-600 italic">{event.tagline}</p>
              <p className="mt-2 text-gray-800">{event.description}</p>
              <p className="text-sm text-gray-500 mt-3">
                Event Date: {event.date}
              </p>
            </div>
            <img
              src={bufferToBase64(event.image)}
              alt={event.title}
              className="w-32 h-20 object-cover rounded ml-4"
            />
          </div>

          <div className="flex justify-end mt-4 gap-2">
            <button
              className="px-4 py-1 rounded bg-red-100 text-red-700 border border-red-300 hover:bg-red-200"
              onClick={() => handleDelete(event.id)}
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
        </div>
      ))}

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
    </div>
  );
};

export default EventsPage;