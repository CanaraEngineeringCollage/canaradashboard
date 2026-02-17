"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiFetch } from "@/lib/client";
import { decryptToken } from "@/lib/encrypt";
import { TopRecruiter } from "./page";

interface EditRecruiterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: TopRecruiter | null;
  onSuccess: () => void;
}

const EditRecruiterModal: React.FC<EditRecruiterModalProps> = ({ open, onOpenChange, data, onSuccess }) => {
  const [companyName, setCompanyName] = useState("");
  const [mode, setMode] = useState("On Campus");
  const [type, setType] = useState("IT");
  const [packageLpa, setPackageLpa] = useState("");
  const [studentsRecruited, setStudentsRecruited] = useState("");
  const [year, setYear] = useState("2022");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setCompanyName(data.companyName);
      setMode(data.mode);
      setType(data.type);
      setPackageLpa(data.package);
      setStudentsRecruited(data.studentsRecruited.toString());
      setYear(data.year);
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;

    setLoading(true);
    try {
      const encrypted = localStorage.getItem("token");
      const token = encrypted ? decryptToken(encrypted) : null;

      await apiFetch(`/placement/top-recruiters/${data.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName,
          mode,
          type,
          package: packageLpa,
          studentsRecruited: parseInt(studentsRecruited, 10),
          year,
        }),
      });

      onOpenChange(false);
      onSuccess();
    } catch (error) {
      console.error("Error updating recruiter:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Top Recruiter</DialogTitle>
          <DialogDescription>Edit the details of the top recruiter.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="companyName-edit" className="text-right">
                Company
              </Label>
              <input
                id="companyName-edit"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="col-span-3 border rounded p-2 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="mode-edit" className="text-right">
                Mode
              </Label>
              <select
                id="mode-edit"
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="col-span-3 border rounded p-2 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="On Campus">On Campus</option>
                <option value="Pool Drive">Pool Drive</option>
                <option value="Off Campus">Off Campus</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type-edit" className="text-right">
                Type
              </Label>
              <input
                id="type-edit"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="col-span-3 border rounded p-2 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. IT"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="package-edit" className="text-right">
                Package
              </Label>
              <input
                id="package-edit"
                value={packageLpa}
                onChange={(e) => setPackageLpa(e.target.value)}
                className="col-span-3 border rounded p-2 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. 4LPA"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="studentsRecruited-edit" className="text-right">
                Students Recruited
              </Label>
              <input
                id="studentsRecruited-edit"
                type="number"
                value={studentsRecruited}
                onChange={(e) => setStudentsRecruited(e.target.value)}
                className="col-span-3 border rounded p-2 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="year-edit" className="text-right">
                Year
              </Label>
              <select
                id="year-edit"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="col-span-3 border rounded p-2 outline-none focus:ring-2 focus:ring-blue-500"
              >
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

export default EditRecruiterModal;
