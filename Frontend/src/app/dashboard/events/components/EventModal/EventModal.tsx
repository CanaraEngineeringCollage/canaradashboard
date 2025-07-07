"use client";

import { createEvents } from "@/lib/events";
import React, { useState, ChangeEvent } from "react";

const EventFormModal = () => {
  const [form, setForm] = useState({
    title: "",
    tagline: "",
    date: "",
    description: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // for preview
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("tagline", form.tagline);
    formData.append("date", form.date);
    formData.append("description", form.description);
    if (imageFile) formData.append("image", imageFile);

    try {
      await createEvents(formData);
      alert("Event created successfully!");
      // Reset form if needed
    } catch (err) {
      alert("Failed to create event");
      console.error(err);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow max-w-md mx-auto">
      <input type="text" name="title" placeholder="Title" onChange={handleChange} className="mb-2 w-full border p-2" />
      <input type="text" name="tagline" placeholder="Tagline" onChange={handleChange} className="mb-2 w-full border p-2" />
      <input type="date" name="date" onChange={handleChange} className="mb-2 w-full border p-2" />
      <textarea name="description" placeholder="Description" onChange={handleChange} className="mb-2 w-full border p-2" />
      
      <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2 w-full" />

      {imagePreview && <img src={imagePreview} alt="Preview" className="mb-2 max-h-40 rounded" />}

      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
    </div>
  );
};

export default EventFormModal;
