import React from "react";
import { Event } from "@/lib/types";

type Props = {
  isOpen: boolean;
  isEdit: boolean;
  eventData: Partial<Event>;
  imagePreview?: string | null;
  onClose: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
};

const EventModal: React.FC<Props> = ({ isOpen, isEdit, eventData, imagePreview, onClose, onChange, onSubmit }) => {
  if (!isOpen) return null;

  // Drag-and-drop handler for dd/mm/yyyy or dd-mm-yyyy
  const handleDateDrop = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.dataTransfer.getData("text").trim();

    const parts = text.includes("/") ? text.split("/") : text.split("-");
    if (parts.length === 3) {
      const [day, month, year] = parts.map(Number);
      if (!isNaN(day) && !isNaN(month) && !isNaN(year) && day >= 1 && day <= 31 && month >= 1 && month <= 12) {
        const formatted = `${year.toString().padStart(4, "0")}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
        onChange({
          target: { name: "date", value: formatted },
        } as any);
        return;
      }
    }

    alert("Invalid date! Use dd/mm/yyyy or dd-mm-yyyy format.");
  };

  const handleDateDragOver = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  // Image drag-and-drop & paste handlers
  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      onChange({
        target: { name: "image", files },
      } as any);
    }
  };

  const handleImagePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          onChange({
            target: { name: "image", files: [file] },
          } as any);
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex overflow-y-auto items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg mt-20 mb-10 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">{isEdit ? "Update Event" : "Create Event"}</h2>
        <form onSubmit={onSubmit} className="space-y-4" encType="multipart/form-data">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={eventData.title || ""}
            onChange={onChange}
            className="w-full p-2 border rounded"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={eventData.description || ""}
            onChange={onChange}
            className="w-full p-2 border rounded"
            required
            rows={8}
          />

          <select name="category" value={eventData.category || ""} onChange={onChange} className="w-full p-2 border rounded" required>
            <option value="">Select Category</option>
            <option value="Computer Science & Engineering">Computer Science & Engineering</option>
            <option value="Information Science & Engineering">Information Science & Engineering</option>
            <option value="Electronics & Communication Engineering">Electronics & Communication Engineering</option>
            <option value="Computer Science & Design">Computer Science & Design</option>
            <option value="Computer Science & Business System">Computer Science & Business System</option>
            <option value="Artificial Intelligence & Machine Learning">Artificial Intelligence & Machine Learning</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
            <option value="Science & Humanities">Science & Humanities</option>
            <option value="Student Welfare Department">Student Welfare Department</option>
            <option value="Alumni">Alumni</option>
          </select>

          <input
            type="date"
            name="date"
            value={eventData.date || ""}
            onChange={onChange}
            onDrop={handleDateDrop}
            onDragOver={handleDateDragOver}
            className="w-full p-2 border rounded"
            required
          />

          {/* Image drag-and-drop/paste input */}
          <div
            onDrop={handleImageDrop}
            onDragOver={(e) => e.preventDefault()}
            onPaste={handleImagePaste}
            className="w-full p-2 border rounded flex items-center justify-center cursor-pointer text-gray-500 relative"
          >
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={onChange}
              className="w-full h-full opacity-0 absolute cursor-pointer"
              required={!imagePreview && !isEdit}
            />
            <span className="text-gray-500 pointer-events-none select-none">Upload Image</span>
          </div>

          {imagePreview && <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover rounded border mt-2" />}

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">
              Cancel
            </button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              {isEdit ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
