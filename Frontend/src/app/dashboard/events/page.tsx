"use client";
import { useEffect, useState } from "react";
import EventFormModal from "./components/EventModal/EventModal";


export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);

  const loadEvents = async () => {
    try {
      const data = await getAllEvents();
      setEvents(data);
    } catch (err) {
      console.error("Failed to fetch events", err);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    await deleteEvent(id);
    loadEvents();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Events</h1>

      <EventFormModal onSuccess={loadEvents} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((e) => (
          <div
            key={e.id}
            className="border p-4 rounded-lg shadow bg-white relative"
          >
            <img
              src={`/uploads/events/${e.image}`}
              alt={e.title}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h2 className="text-lg font-bold">{e.title}</h2>
            <p className="text-sm text-gray-500">{e.date}</p>
            <p className="text-gray-700 mb-2">{e.description}</p>
            <button
              className="text-red-600"
              onClick={() => handleDelete(e.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
