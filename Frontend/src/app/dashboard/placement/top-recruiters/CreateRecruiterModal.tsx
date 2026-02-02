"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiFetch } from "@/lib/client";
import { decryptToken } from "@/lib/encrypt";

interface CreateRecruiterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const CreateRecruiterModal: React.FC<CreateRecruiterModalProps> = ({ open, onOpenChange, onSuccess }) => {
  const [companyName, setCompanyName] = useState("");
  const [mode, setMode] = useState("");
  const [type, setType] = useState("");
  const [packageLpa, setPackageLpa] = useState("");
  const [count, setCount] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const encrypted = localStorage.getItem("token");
      const token = encrypted ? decryptToken(encrypted) : null;

      await apiFetch("/placement/top-recruiters", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName,
          mode,
          type,
          package: packageLpa,
          count: parseInt(count, 10),
          year,
        }),
      });

      onOpenChange(false);
      // Reset form
      setCompanyName("");
      setMode("");
      setType("");
      setPackageLpa("");
      setCount("");
      setYear("");
      onSuccess();
    } catch (error) {
      console.error("Error creating recruiter:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Top Recruiter</DialogTitle>
          <DialogDescription>Add a new recruiter to the top recruiters list.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="companyName-create" className="text-right">
                Company
              </Label>
              <input
                id="companyName-create"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="col-span-3 border rounded p-2 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="mode-create" className="text-right">
                Mode
              </Label>
              <select
                id="mode-create"
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="col-span-3 border rounded p-2 outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>
                  Select Mode
                </option>
                <option value="On Campus">On Campus</option>
                <option value="Pool Drive">Pool Drive</option>
                <option value="Off Campus">Off Campus</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type-create" className="text-right">
                Type
              </Label>
              <input
                id="type-create"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="col-span-3 border rounded p-2 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. IT"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="package-create" className="text-right">
                Package
              </Label>
              <input
                id="package-create"
                value={packageLpa}
                onChange={(e) => setPackageLpa(e.target.value)}
                className="col-span-3 border rounded p-2 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. 4LPA"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="count-create" className="text-right">
                Count
              </Label>
              <input
                id="count-create"
                type="number"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                className="col-span-3 border rounded p-2 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="year-create" className="text-right">
                Year
              </Label>
              <select
                id="year-create"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="col-span-3 border rounded p-2 outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>
                  Select Year
                </option>
                {Array.from({ length: new Date().getFullYear() - 2022 + 1 }, (_, i) => 2022 + i).map((y) => (
                  <option key={y} value={y.toString()}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRecruiterModal;
