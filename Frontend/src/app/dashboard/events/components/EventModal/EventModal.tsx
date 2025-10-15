import React from "react";
import { Event } from "@/lib/types";

type Props = {
  isOpen: boolean;
  isEdit: boolean;
  eventData: Partial<Event>;
  imagePreview?: string | null;
  onClose: () => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
};

const EventModal: React.FC<Props> = ({
  isOpen,
  isEdit,
  eventData,
  imagePreview,
  onClose,
  onChange,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {isEdit ? "Update Event" : "Create Event"}
        </h2>
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
          {/* <input
            type="text"
            name="tagline"
            placeholder="Tagline"
            value={eventData.tagline || ""}
            onChange={onChange}
            className="w-full p-2 border rounded"
            required
          /> */}
          <textarea
            name="description"
            placeholder="Description"
            value={eventData.description || ""}
            onChange={onChange}
            className="w-full p-2 border rounded"
            required
            rows={8}
          />
            <select
            name="category"
            value={eventData.category || ""}
            onChange={onChange}
            className="w-full p-2 border rounded"
            required
          >
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

            {/* <option value="College Event">College Event</option> */}
          </select>
          <input
            type="date"
            name="date"
            value={eventData.date || ""}
            onChange={onChange}
            className="w-full p-2 border rounded"
            required
          />

        

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={onChange}
            className="w-full p-2 border rounded"
            required={!isEdit}
          />

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-40 object-cover rounded border mt-2"
            />
          )}

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {isEdit ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
