"use client";
import { useEffect, useState } from "react";
import EventModal from "./components/EventModal/EventModal";
import { createEvents, deleteEvents, editEvents, getAllEvents } from "@/lib/events";

export default function EventDashboard() {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editEvent, setEditEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const data = await getAllEvents();
    setEvents(data);
  };

  const handleAddClick = () => {
    setEditEvent(null);
    setModalOpen(true);
  };

  const handleEdit = (event) => {
    setEditEvent(event);
    setModalOpen(true);
  };

  const handleSubmit = async (data) => {
    if (editEvent) {
      await editEvents(editEvent.id, data);
    } else {
      await createEvents(data);
    }
    setModalOpen(false);
    fetchEvents();
  };

  const handleDelete = async (id) => {
    await deleteEvents(id);
    fetchEvents();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Events Dashboard</h1>
      <button onClick={handleAddClick} className="bg-green-500 text-white px-4 py-2 rounded mb-4">
        Add Event
      </button>
      <div className="grid gap-4">
        {events.map((event) => (
          <div key={event.id} className="border p-4 rounded shadow">
            <img src={event.image} alt={event.title} className="w-full h-48 object-cover rounded" />
            <h2 className="text-xl font-bold">{event.title}</h2>
            <p className="text-sm text-gray-600">{event.tagline}</p>
            <p className="text-sm">{event.description}</p>
            <p className="text-xs text-gray-400">{event.date}</p>
            <div className="flex gap-2 mt-2">
              <button onClick={() => handleEdit(event)} className="px-3 py-1 bg-blue-500 text-white rounded">Edit</button>
              <button onClick={() => handleDelete(event.id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
      <EventModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editEvent}
      />
    </div>
  );
}
