"use client";
import { useState } from "react";
import { createEvent } from "@/lib/api/events";

export default function EventFormModal({ onSuccess }: { onSuccess: () => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    tagline: "",
    date: "",
    description: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (image) fd.append("image", image);

    try {
      await createEvent(fd);
      setOpen(false);
      onSuccess();
      setForm({ title: "", tagline: "", date: "", description: "" });
      setImage(null);
      setPreview("");
    } catch (err) {
      console.error(err);
      alert("Failed to create event.");
    }
  };

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Add Event
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Create Event</h2>

            <input
              name="title"
              placeholder="Title"
              onChange={handleChange}
              value={form.title}
              className="block mb-2 w-full p-2 border rounded"
            />

            <input
              name="tagline"
              placeholder="Tagline"
              onChange={handleChange}
              value={form.tagline}
              className="block mb-2 w-full p-2 border rounded"
            />

            <input
              type="date"
              name="date"
              onChange={handleChange}
              value={form.date}
              className="block mb-2 w-full p-2 border rounded"
            />

            <textarea
              name="description"
              placeholder="Description"
              onChange={handleChange}
              value={form.description}
              className="block mb-2 w-full p-2 border rounded"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="block mb-2"
            />

            {preview && (
              <img src={preview} className="mb-2 h-32 object-cover rounded" />
            )}

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded border"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
