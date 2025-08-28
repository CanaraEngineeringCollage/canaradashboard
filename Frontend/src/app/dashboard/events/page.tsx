"use client";
import React, { useEffect, useState } from "react";
import EventModal from "./components/EventModal/EventModal";
import { PageTitle } from "@/components/page-title";
import { LandPlot, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Event } from "@/lib/types";
import {  createEvent, deleteEvent, editEvent, getAllEvents } from "@/lib/events";

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Partial<Event>>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const fetchEvents = async () => {
    const res = await getAllEvents();
    setEvents(res);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteEvent(id)
    fetchEvents();
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("title", selectedEvent.title || "");
  formData.append("tagline", selectedEvent.tagline || "");
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

    // Reset state and refresh
    setShowModal(false);
    setSelectedEvent({});
    setSelectedFile(null);
    setPreviewUrl(null);
    setIsEdit(false);
    fetchEvents();
  } catch (err) {
    console.error("Error submitting event:", err);
  }
};

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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

  const categories = ["All", ...Array.from(new Set(events.map(e => e.category)))];

  const filteredEvents = selectedCategory === "All"
    ? events
    : events.filter(e => e.category === selectedCategory);

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
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="border rounded px-3 py-2"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
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
                <th className="px-4 py-2 text-left">Tagline</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((event) => (
                <tr  key={event.id} className="border-t border-gray-200 hover:bg-gray-50">
                   <td className="px-4 py-2">{event.date}</td>
                  <td className="px-4 py-2"> <img
              src={bufferToBase64(event.image)}
              alt={event.title}
              className="w-32 h-20 object-cover rounded ml-4"
            /></td>
                  <td className="px-4 py-2">{event.title}</td>
                  <td className="px-4 py-2">{event.tagline}</td>
                  <td className="px-4 py-2">{event.description}</td>
                  <td className="px-4 py-2">{event.category}</td>
                 
                  <td className="px-4 py-2">     <button
              className="px-4 py-1 rounded bg-red-100 text-red-700 border border-red-300 hover:bg-red-200"
              onClick={() => handleDelete(event.id)}
            >
              Delete
            </button>  <button
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
            </button></td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
     

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