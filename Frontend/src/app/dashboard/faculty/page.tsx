"use client";

import { PageTitle } from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { LandPlot, PlusCircle } from "lucide-react";
import React, { useState, useEffect, useCallback } from "react";
import TablePagination from "@/components/ui/TablePagination";
import { useRouter } from "next/navigation";

// Interfaces
interface Achievement {
  id: string;
  heading: string;
  descriptions: string[];
}

interface Faculty {
  id: string;
  name: string;
  designation: string;
  department: string;
  subDepartment?: string; // New field for sub-department
  email?: string;
  priority: number | null;
  joiningDate: string;
  experience: string;
  employmentType: "Regular" | "Contract" | "Visiting";
  type: "Teaching Staff" | "Technical Staff";
  qualifications: Qualification[];
  avatar?: { type: string; data: number[] } | null;
  achievements?: Achievement[];
  bookChapters?: BookChapter[];
  certifications?: Certification[];
  internationalJournalPublications?: JournalPublication[];
  internationalConferencePublications?: ConferencePublication[];
}

interface Qualification {
  id: string;
  degree: string;
  passingYear: string;
  college: string;
  nameOfDigree: string;
  specialization: string;
}

interface BookChapter {
  id: string;
  heading: string;
  descriptions: string[];
}

interface Certification {
  id: string;
  heading: string;
  descriptions: string[];
}

interface JournalPublication {
  id: string;
  publicationsData: string;
}

interface ConferencePublication {
  id: string;
  conferencePublications: string;
}

interface FacultyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (faculty: Faculty, avatarFile: File | null) => void;
  mode: "add" | "edit";
  facultyToEdit?: Faculty;
  facultyList?: Faculty[];
  API_BASE_URL: string;
}

const departments = [
  "Computer Science & Engineering",
  "Information Science & Engineering",
  "Electronics & Communication Engineering",
  "Computer Science & Design",
  "Computer Science & Business System",
  "Artificial Intelligence & Machine Learning",
  "Mechanical Engineering",
  "Science & Humanities",
  "Placement Team",
];

const subDepartments = ["Chemistry", "Physics", "Mathematics", "Humanities & Management", "Computintg Science", "Engineering Science", "Civil"];

const bufferToBase64 = (buffer: { type: string; data: number[] }) => {
  const binary = buffer.data.reduce((acc, byte) => acc + String.fromCharCode(byte), "");
  const base64 = btoa(binary);
  return `data:image/jpeg;base64,${base64}`;
};

const FacultyModal: React.FC<FacultyModalProps> = ({ isOpen, onClose, onSubmit, mode, facultyToEdit, API_BASE_URL, facultyList }) => {
  const [step, setStep] = useState(1);
  const [availablePriorities, setAvailablePriorities] = useState<(number | null)[]>([null]);
  const [isLoadingPriorities, setIsLoadingPriorities] = useState(false);
  const initialFaculty: Faculty = {
    id: Math.random().toString(36).substr(2, 9),
    name: "",
    designation: "",
    department: "",
    subDepartment: "", // Initialize new field
    email: "",
    joiningDate: "",
    experience: "",
    employmentType: "Regular",
    type: "Teaching Staff",
    priority: null,
    qualifications: [],
    avatar: null,
    achievements: [],
    bookChapters: [],
    certifications: [],
    internationalJournalPublications: [],
    internationalConferencePublications: [],
  };
  const [faculty, setFaculty] = useState<Faculty>(initialFaculty);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const loadAvailablePriorities = async () => {
      if (!faculty.department) {
        setAvailablePriorities([null]);
        setIsLoadingPriorities(false);
        return;
      }

      setIsLoadingPriorities(true);
      try {
        const response = await fetch(`${API_BASE_URL}/faculty?department=${encodeURIComponent(faculty.department)}&all=true`);

        if (!response.ok) {
          throw new Error("Failed to fetch department faculties");
        }

        const departmentFaculties: Faculty[] = await response.json();

        const usedPriorities = departmentFaculties
          .filter((f) => f.id !== faculty.id && f.priority !== null)
          .map((f) => f.priority)
          .filter((p): p is number => p !== null);

        const maxPriority = departmentFaculties.length + 5;
        const availablePrioritiesList: (number | null)[] = [null];

        for (let i = 1; i <= maxPriority; i++) {
          if (!usedPriorities.includes(i)) {
            availablePrioritiesList.push(i);
          }
        }

        setAvailablePriorities(availablePrioritiesList);
      } catch (error) {
        console.error("Error fetching priorities:", error);
        setAvailablePriorities([null]);
      } finally {
        setIsLoadingPriorities(false);
      }
    };

    loadAvailablePriorities();
  }, [faculty.department, faculty.id, API_BASE_URL]);

  useEffect(() => {
    if (mode === "add" && faculty.department) {
      setFaculty((prev) => ({ ...prev, priority: null, subDepartment: "" }));
    }
  }, [faculty.department, mode]);

  // Initial states for each section
  const initialQualification: Qualification = {
    id: Math.random().toString(36).substr(2, 9),
    degree: "",
    nameOfDigree: "",
    passingYear: "",
    college: "",
    specialization: "",
  };
  const [newQualification, setNewQualification] = useState<Qualification>(initialQualification);
  const [editQualificationId, setEditQualificationId] = useState<string | null>(null);

  const initialAchievement: Achievement = {
    id: Math.random().toString(36).substr(2, 9),
    heading: "",
    descriptions: [""],
  };
  const [newAchievement, setNewAchievement] = useState<Achievement>(initialAchievement);
  const [editAchievementId, setEditAchievementId] = useState<string | null>(null);
  const [currentDescriptionIndex, setCurrentDescriptionIndex] = useState(0);

  const initialBookChapter: BookChapter = {
    id: Math.random().toString(36).substr(2, 9),
    heading: "",
    descriptions: [""],
  };
  const [newBookChapter, setNewBookChapter] = useState<BookChapter>(initialBookChapter);
  const [editBookChapterId, setEditBookChapterId] = useState<string | null>(null);
  const [currentBookChapterDescriptionIndex, setCurrentBookChapterDescriptionIndex] = useState(0);

  const initialCertification: Certification = {
    id: Math.random().toString(36).substr(2, 9),
    heading: "",
    descriptions: [""],
  };
  const [newCertification, setNewCertification] = useState<Certification>(initialCertification);
  const [editCertificationId, setEditCertificationId] = useState<string | null>(null);
  const [currentCertificationDescriptionIndex, setCurrentCertificationDescriptionIndex] = useState(0);

  const initialJournal: JournalPublication = {
    id: Math.random().toString(36).substr(2, 9),
    publicationsData: "",
  };
  const [newJournalPublication, setNewJournalPublication] = useState<JournalPublication>(initialJournal);
  const [editJournalPublicationId, setEditJournalPublicationId] = useState<string | null>(null);

  const initialConference: ConferencePublication = {
    id: Math.random().toString(36).substr(2, 9),
    conferencePublications: "",
  };
  const [newConferencePublication, setNewConferencePublication] = useState<ConferencePublication>(initialConference);
  const [editConferencePublicationId, setEditConferencePublicationId] = useState<string | null>(null);

  useEffect(() => {
    if (mode === "add") {
      setFaculty(initialFaculty);
      setAvatarFile(null);
      setNewQualification(initialQualification);
      setEditQualificationId(null);
      setNewAchievement(initialAchievement);
      setEditAchievementId(null);
      setCurrentDescriptionIndex(0);
      setNewBookChapter(initialBookChapter);
      setEditBookChapterId(null);
      setCurrentBookChapterDescriptionIndex(0);
      setNewCertification(initialCertification);
      setEditCertificationId(null);
      setCurrentCertificationDescriptionIndex(0);
      setNewJournalPublication(initialJournal);
      setEditJournalPublicationId(null);
      setNewConferencePublication(initialConference);
      setEditConferencePublicationId(null);
      setStep(1);
      setErrors({});
    } else if (mode === "edit" && facultyToEdit) {
      setFaculty(facultyToEdit);
      setAvatarFile(null);
      setNewQualification(initialQualification);
      setEditQualificationId(null);
      setNewAchievement(initialAchievement);
      setEditAchievementId(null);
      setCurrentDescriptionIndex(0);
      setNewBookChapter(initialBookChapter);
      setEditBookChapterId(null);
      setCurrentBookChapterDescriptionIndex(0);
      setNewCertification(initialCertification);
      setEditCertificationId(null);
      setCurrentCertificationDescriptionIndex(0);
      setNewJournalPublication(initialJournal);
      setEditJournalPublicationId(null);
      setNewConferencePublication(initialConference);
      setEditConferencePublicationId(null);
      setStep(1);
      setErrors({});
    }
  }, [mode, facultyToEdit, isOpen]);

  const totalSteps = 5;

  useEffect(() => {
    if (step === 2 && faculty.qualifications.length > 0 && !editQualificationId) {
      setNewQualification(faculty.qualifications[0]);
      setEditQualificationId(faculty.qualifications[0].id);
    }
    if (step === 3 && faculty.achievements && faculty.achievements.length > 0 && !editAchievementId) {
      setNewAchievement(faculty.achievements[0]);
      setEditAchievementId(faculty.achievements[0].id);
      setCurrentDescriptionIndex(0);
    }
    if (step === 4 && faculty.bookChapters && faculty.bookChapters.length > 0 && !editBookChapterId) {
      setNewBookChapter(faculty.bookChapters[0]);
      setEditBookChapterId(faculty.bookChapters[0].id);
      setCurrentBookChapterDescriptionIndex(0);
    }
    if (step === 5 && faculty.certifications && faculty.certifications.length > 0 && !editCertificationId) {
      setNewCertification(faculty.certifications[0]);
      setEditCertificationId(faculty.certifications[0].id);
      setCurrentCertificationDescriptionIndex(0);
    }
  }, [step]);

  const validateStep = (currentStep: number) => {
    const newErrors: { [key: string]: string } = {};
    if (currentStep === 1) {
      if (!faculty.name || faculty.name.trim() === "") newErrors.name = "Name is required";
      if (!faculty.designation || faculty.designation.trim() === "") newErrors.designation = "Designation is required";
      if (!faculty.department) newErrors.department = "Department is required";
      if (faculty.department === "Science & Humanities" && !faculty.subDepartment) {
        newErrors.subDepartment = "Sub-department is required for Science & Humanities";
      }
      if (!faculty.joiningDate) newErrors.joiningDate = "Joining date is required";
      if (!faculty.experience || faculty.experience.trim() === "") newErrors.experience = "Experience is required";
      if (!faculty.employmentType) newErrors.employmentType = "Employment type is required";
      if (mode === "add" && !faculty.avatar && !avatarFile) newErrors.avatar = "Avatar is required";
      if (!faculty.type) newErrors.type = "Type is required";
    }
    if (currentStep === 2) {
      const isAddingOrUpdating =
        newQualification.degree ||
        newQualification.nameOfDigree ||
        newQualification.passingYear ||
        newQualification.college ||
        newQualification.specialization ||
        editQualificationId;

      if (isAddingOrUpdating) {
        if (!newQualification.degree || newQualification.degree.trim() === "") {
          newErrors.degree = "Degree is required";
        }
        if (!newQualification.nameOfDigree || newQualification.nameOfDigree.trim() === "") {
          newErrors.nameOfDigree = "Name of degree is required";
        }
        if (!newQualification.passingYear || newQualification.passingYear.trim() === "") {
          newErrors.passingYear = "Passing Year is required";
        }
        if (!newQualification.college || newQualification.college.trim() === "") {
          newErrors.college = "College is required";
        }
        if (!newQualification.specialization || newQualification.specialization.trim() === "") {
          newErrors.specialization = "Specialization is required";
        }
      }

      if (mode === "edit" && faculty.qualifications.length === 0 && !isAddingOrUpdating) {
        newErrors.qualifications = "At least one qualification is required";
      }

      if (mode === "add" && faculty.qualifications.length === 0 && !isAddingOrUpdating) {
        newErrors.qualifications = "At least one qualification is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (
      step === 2 &&
      newQualification.degree &&
      newQualification.nameOfDigree &&
      newQualification.passingYear &&
      newQualification.college &&
      newQualification.specialization
    ) {
      if (editQualificationId) {
        setFaculty({
          ...faculty,
          qualifications: faculty.qualifications.map((q) => (q.id === editQualificationId ? { ...newQualification, id: q.id } : q)),
        });
        setEditQualificationId(null);
        setNewQualification(initialQualification);
      } else {
        setFaculty({
          ...faculty,
          qualifications: [...faculty.qualifications, { ...newQualification, id: Math.random().toString(36).substr(2, 9) }],
        });
        setNewQualification(initialQualification);
      }
    }

    if (step === 3 && newAchievement.heading.trim() && newAchievement.descriptions.some((desc) => desc.trim())) {
      if (editAchievementId) {
        setFaculty({
          ...faculty,
          achievements: (faculty.achievements || []).map((a) => (a.id === editAchievementId ? { ...newAchievement, id: a.id } : a)),
        });
        setEditAchievementId(null);
        setNewAchievement(initialAchievement);
        setCurrentDescriptionIndex(0);
      } else {
        setFaculty({
          ...faculty,
          achievements: [
            ...(faculty.achievements || []),
            {
              ...newAchievement,
              id: Math.random().toString(36).substr(2, 9),
            },
          ],
        });
        setNewAchievement(initialAchievement);
        setCurrentDescriptionIndex(0);
      }
    }

    if (step === 4 && newBookChapter.heading.trim() && newBookChapter.descriptions.some((desc) => desc.trim())) {
      if (editBookChapterId) {
        setFaculty({
          ...faculty,
          bookChapters: (faculty.bookChapters || []).map((b) => (b.id === editBookChapterId ? { ...newBookChapter, id: b.id } : b)),
        });
        setEditBookChapterId(null);
        setNewBookChapter(initialBookChapter);
        setCurrentBookChapterDescriptionIndex(0);
      } else {
        setFaculty({
          ...faculty,
          bookChapters: [
            ...(faculty.bookChapters || []),
            {
              ...newBookChapter,
              id: Math.random().toString(36).substr(2, 9),
            },
          ],
        });
        setNewBookChapter(initialBookChapter);
        setCurrentBookChapterDescriptionIndex(0);
      }
    }

    if (step === 5 && newCertification.heading.trim() && newCertification.descriptions.some((desc) => desc.trim())) {
      if (editCertificationId) {
        setFaculty({
          ...faculty,
          certifications: (faculty.certifications || []).map((c) => (c.id === editCertificationId ? { ...newCertification, id: c.id } : c)),
        });
        setEditCertificationId(null);
        setNewCertification(initialCertification);
        setCurrentCertificationDescriptionIndex(0);
      } else {
        setFaculty({
          ...faculty,
          certifications: [
            ...(faculty.certifications || []),
            {
              ...newCertification,
              id: Math.random().toString(36).substr(2, 9),
            },
          ],
        });
        setNewCertification(initialCertification);
        setCurrentCertificationDescriptionIndex(0);
      }
    }

    if (step === 6 && newJournalPublication.publicationsData) {
      if (editJournalPublicationId) {
        setFaculty({
          ...faculty,
          internationalJournalPublications: (faculty.internationalJournalPublications || []).map((j) =>
            j.id === editJournalPublicationId ? { ...newJournalPublication, id: j.id } : j
          ),
        });
        setEditJournalPublicationId(null);
        setNewJournalPublication(initialJournal);
      } else {
        setFaculty({
          ...faculty,
          internationalJournalPublications: [
            ...(faculty.internationalJournalPublications || []),
            { ...newJournalPublication, id: Math.random().toString(36).substr(2, 9) },
          ],
        });
        setNewJournalPublication(initialJournal);
      }
    }

    let shouldSubmit = false;
    if (step === 7) {
      if (newConferencePublication.conferencePublications) {
        if (editConferencePublicationId) {
          setFaculty((prev) => ({
            ...prev,
            internationalConferencePublications: (prev.internationalConferencePublications || []).map((c) =>
              c.id === editConferencePublicationId ? { ...newConferencePublication, id: c.id } : c
            ),
          }));
          setEditConferencePublicationId(null);
          setNewConferencePublication(initialConference);
        } else {
          setFaculty((prev) => ({
            ...prev,
            internationalConferencePublications: [
              ...(prev.internationalConferencePublications || []),
              { ...newConferencePublication, id: Math.random().toString(36).substr(2, 9) },
            ],
          }));
          setNewConferencePublication(initialConference);
        }
        shouldSubmit = true;
      } else {
        shouldSubmit = true;
      }
    }

    if (validateStep(step)) {
      if (step < totalSteps) {
        setStep(step + 1);
      } else {
        onSubmit(faculty, avatarFile);
        onClose();
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSkip = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onSubmit(faculty, avatarFile);
      onClose();
    }
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "avatar") {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setAvatarFile(file);
        const arrayBuffer = await file.arrayBuffer();
        const buffer = {
          type: file.type,
          data: Array.from(new Uint8Array(arrayBuffer)),
        };
        setFaculty({ ...faculty, avatar: buffer });
      } else {
        setAvatarFile(null);
        setFaculty({ ...faculty, avatar: null });
      }
    } else if (name === "priority") {
      setFaculty({ ...faculty, priority: parseInt(value, 10) || null });
    } else {
      setFaculty({ ...faculty, [name]: value });
      if (name === "department" && value !== "Science & Humanities") {
        setFaculty((prev) => ({ ...prev, subDepartment: "" }));
      }
    }
  };

  // Achievement Handlers
  const handleAchievementHeadingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewAchievement({ ...newAchievement, heading: value });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
    const value = e.target.value;
    const updatedDescriptions = [...newAchievement.descriptions];
    updatedDescriptions[index] = value;
    setNewAchievement({ ...newAchievement, descriptions: updatedDescriptions });
  };

  const addDescription = () => {
    setNewAchievement({
      ...newAchievement,
      descriptions: [...newAchievement.descriptions, ""],
    });
    setCurrentDescriptionIndex(newAchievement.descriptions.length);
  };

  const removeDescription = (index: number) => {
    if (newAchievement.descriptions.length > 1) {
      const updatedDescriptions = newAchievement.descriptions.filter((_, i) => i !== index);
      setNewAchievement({ ...newAchievement, descriptions: updatedDescriptions });
      if (currentDescriptionIndex > index && currentDescriptionIndex > 0) {
        setCurrentDescriptionIndex(currentDescriptionIndex - 1);
      }
    }
  };

  const addOrUpdateAchievement = () => {
    if (newAchievement.heading.trim() && newAchievement.descriptions.some((desc) => desc.trim())) {
      if (editAchievementId) {
        setFaculty({
          ...faculty,
          achievements: (faculty.achievements || []).map((a) => (a.id === editAchievementId ? { ...newAchievement, id: a.id } : a)),
        });
        setEditAchievementId(null);
        setNewAchievement(initialAchievement);
        setCurrentDescriptionIndex(0);
      } else {
        setFaculty({
          ...faculty,
          achievements: [
            ...(faculty.achievements || []),
            {
              ...newAchievement,
              id: Math.random().toString(36).substr(2, 9),
            },
          ],
        });
        setNewAchievement(initialAchievement);
        setCurrentDescriptionIndex(0);
      }
    } else {
      alert("Please fill heading and at least one description.");
    }
  };

  const editAchievement = (id: string) => {
    const achievement = (faculty.achievements || []).find((a) => a.id === id);
    if (achievement) {
      setNewAchievement(achievement);
      setEditAchievementId(id);
      setCurrentDescriptionIndex(0);
    }
  };

  const removeAchievement = (id: string) => {
    setFaculty({
      ...faculty,
      achievements: (faculty.achievements || []).filter((a) => a.id !== id),
    });
    if (editAchievementId === id) {
      setEditAchievementId(null);
      setNewAchievement(initialAchievement);
      setCurrentDescriptionIndex(0);
    }
  };

  const cancelEditAchievement = () => {
    setEditAchievementId(null);
    setNewAchievement(initialAchievement);
    setCurrentDescriptionIndex(0);
  };

  // Book Chapter Handlers
  const handleBookChapterHeadingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewBookChapter({ ...newBookChapter, heading: value });
  };

  const handleBookChapterDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
    const value = e.target.value;
    const updatedDescriptions = [...newBookChapter.descriptions];
    updatedDescriptions[index] = value;
    setNewBookChapter({ ...newBookChapter, descriptions: updatedDescriptions });
  };

  const addBookChapterDescription = () => {
    setNewBookChapter({
      ...newBookChapter,
      descriptions: [...newBookChapter.descriptions, ""],
    });
    setCurrentBookChapterDescriptionIndex(newBookChapter.descriptions.length);
  };

  const removeBookChapterDescription = (index: number) => {
    if (newBookChapter.descriptions.length > 1) {
      const updatedDescriptions = newBookChapter.descriptions.filter((_, i) => i !== index);
      setNewBookChapter({ ...newBookChapter, descriptions: updatedDescriptions });
      if (currentBookChapterDescriptionIndex > index && currentBookChapterDescriptionIndex > 0) {
        setCurrentBookChapterDescriptionIndex(currentBookChapterDescriptionIndex - 1);
      }
    }
  };

  const addOrUpdateBookChapter = () => {
    if (newBookChapter.heading.trim() && newBookChapter.descriptions.some((desc) => desc.trim())) {
      if (editBookChapterId) {
        setFaculty({
          ...faculty,
          bookChapters: (faculty.bookChapters || []).map((b) => (b.id === editBookChapterId ? { ...newBookChapter, id: b.id } : b)),
        });
        setEditBookChapterId(null);
        setNewBookChapter(initialBookChapter);
        setCurrentBookChapterDescriptionIndex(0);
      } else {
        setFaculty({
          ...faculty,
          bookChapters: [
            ...(faculty.bookChapters || []),
            {
              ...newBookChapter,
              id: Math.random().toString(36).substr(2, 9),
            },
          ],
        });
        setNewBookChapter(initialBookChapter);
        setCurrentBookChapterDescriptionIndex(0);
      }
    } else {
      alert("Please fill heading and at least one description.");
    }
  };

  const editBookChapter = (id: string) => {
    const bookChapter = (faculty.bookChapters || []).find((b) => b.id === id);
    if (bookChapter) {
      setNewBookChapter(bookChapter);
      setEditBookChapterId(id);
      setCurrentBookChapterDescriptionIndex(0);
    }
  };

  const removeBookChapter = (id: string) => {
    setFaculty({
      ...faculty,
      bookChapters: (faculty.bookChapters || []).filter((b) => b.id !== id),
    });
    if (editBookChapterId === id) {
      setEditBookChapterId(null);
      setNewBookChapter(initialBookChapter);
      setCurrentBookChapterDescriptionIndex(0);
    }
  };

  const cancelEditBookChapter = () => {
    setEditBookChapterId(null);
    setNewBookChapter(initialBookChapter);
    setCurrentBookChapterDescriptionIndex(0);
  };

  // Certification Handlers
  const handleCertificationHeadingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewCertification({ ...newCertification, heading: value });
  };

  const handleCertificationDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
    const value = e.target.value;
    const updatedDescriptions = [...newCertification.descriptions];
    updatedDescriptions[index] = value;
    setNewCertification({ ...newCertification, descriptions: updatedDescriptions });
  };

  const addCertificationDescription = () => {
    setNewCertification({
      ...newCertification,
      descriptions: [...newCertification.descriptions, ""],
    });
    setCurrentCertificationDescriptionIndex(newCertification.descriptions.length);
  };

  const removeCertificationDescription = (index: number) => {
    if (newCertification.descriptions.length > 1) {
      const updatedDescriptions = newCertification.descriptions.filter((_, i) => i !== index);
      setNewCertification({ ...newCertification, descriptions: updatedDescriptions });
      if (currentCertificationDescriptionIndex > index && currentCertificationDescriptionIndex > 0) {
        setCurrentCertificationDescriptionIndex(currentCertificationDescriptionIndex - 1);
      }
    }
  };

  const addOrUpdateCertification = () => {
    if (newCertification.heading.trim() && newCertification.descriptions.some((desc) => desc.trim())) {
      if (editCertificationId) {
        setFaculty({
          ...faculty,
          certifications: (faculty.certifications || []).map((c) => (c.id === editCertificationId ? { ...newCertification, id: c.id } : c)),
        });
        setEditCertificationId(null);
        setNewCertification(initialCertification);
        setCurrentCertificationDescriptionIndex(0);
      } else {
        setFaculty({
          ...faculty,
          certifications: [
            ...(faculty.certifications || []),
            {
              ...newCertification,
              id: Math.random().toString(36).substr(2, 9),
            },
          ],
        });
        setNewCertification(initialCertification);
        setCurrentCertificationDescriptionIndex(0);
      }
    } else {
      alert("Please fill heading and at least one description.");
    }
  };

  const editCertification = (id: string) => {
    const certification = (faculty.certifications || []).find((c) => c.id === id);
    if (certification) {
      setNewCertification(certification);
      setEditCertificationId(id);
      setCurrentCertificationDescriptionIndex(0);
    }
  };

  const removeCertification = (id: string) => {
    setFaculty({
      ...faculty,
      certifications: (faculty.certifications || []).filter((c) => c.id !== id),
    });
    if (editCertificationId === id) {
      setEditCertificationId(null);
      setNewCertification(initialCertification);
      setCurrentCertificationDescriptionIndex(0);
    }
  };

  const cancelEditCertification = () => {
    setEditCertificationId(null);
    setNewCertification(initialCertification);
    setCurrentCertificationDescriptionIndex(0);
  };

  // Qualification Handlers
  const handleQualificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewQualification({ ...newQualification, [name]: value });
  };

  const addOrUpdateQualification = () => {
    if (newQualification.degree && newQualification.passingYear && newQualification.college && newQualification.specialization) {
      if (editQualificationId) {
        setFaculty({
          ...faculty,
          qualifications: faculty.qualifications.map((q) => (q.id === editQualificationId ? { ...newQualification, id: q.id } : q)),
        });
        setEditQualificationId(null);
        setNewQualification(initialQualification);
      } else {
        setFaculty({
          ...faculty,
          qualifications: [...faculty.qualifications, { ...newQualification, id: Math.random().toString(36).substr(2, 9) }],
        });
        setNewQualification(initialQualification);
      }
    } else {
      alert("Please fill all required fields for the qualification.");
    }
  };

  const editQualification = (id: string) => {
    const qualification = faculty.qualifications.find((q) => q.id === id);
    if (qualification) {
      setNewQualification(qualification);
      setEditQualificationId(id);
    }
  };

  const removeQualification = (id: string) => {
    setFaculty({
      ...faculty,
      qualifications: faculty.qualifications.filter((q) => q.id !== id),
    });
    if (editQualificationId === id) {
      setEditQualificationId(null);
      setNewQualification(initialQualification);
    }
  };

  const cancelEditQualification = () => {
    setEditQualificationId(null);
    setNewQualification(initialQualification);
  };

  // Journal Publication Handlers
  const handleJournalPublicationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewJournalPublication({ ...newJournalPublication, [name]: value });
  };

  const addOrUpdateJournalPublication = () => {
    if (newJournalPublication.publicationsData) {
      if (editJournalPublicationId) {
        setFaculty({
          ...faculty,
          internationalJournalPublications: (faculty.internationalJournalPublications || []).map((j) =>
            j.id === editJournalPublicationId ? { ...newJournalPublication, id: j.id } : j
          ),
        });
        setEditJournalPublicationId(null);
        setNewJournalPublication(initialJournal);
      } else {
        setFaculty({
          ...faculty,
          internationalJournalPublications: [
            ...(faculty.internationalJournalPublications || []),
            { ...newJournalPublication, id: Math.random().toString(36).substr(2, 9) },
          ],
        });
        setNewJournalPublication(initialJournal);
      }
    } else {
      alert("Please fill all required fields for the journal publication.");
    }
  };

  const editJournalPublication = (id: string) => {
    const journal = (faculty.internationalJournalPublications || []).find((j) => j.id === id);
    if (journal) {
      setNewJournalPublication(journal);
      setEditJournalPublicationId(id);
    }
  };

  const removeJournalPublication = (id: string) => {
    setFaculty({
      ...faculty,
      internationalJournalPublications: (faculty.internationalJournalPublications || []).filter((j) => j.id !== id),
    });
    if (editJournalPublicationId === id) {
      setEditJournalPublicationId(null);
      setNewJournalPublication(initialJournal);
    }
  };

  const cancelEditJournalPublication = () => {
    setEditJournalPublicationId(null);
    setNewJournalPublication(initialJournal);
  };

  // Conference Publication Handlers
  const handleConferencePublicationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewConferencePublication({ ...newConferencePublication, [name]: value });
  };

  const addOrUpdateConferencePublication = () => {
    if (newConferencePublication.conferencePublications) {
      if (editConferencePublicationId) {
        setFaculty({
          ...faculty,
          internationalConferencePublications: (faculty.internationalConferencePublications || []).map((c) =>
            c.id === editConferencePublicationId ? { ...newConferencePublication, id: c.id } : c
          ),
        });
        setEditConferencePublicationId(null);
        setNewConferencePublication(initialConference);
      } else {
        setFaculty({
          ...faculty,
          internationalConferencePublications: [
            ...(faculty.internationalConferencePublications || []),
            { ...newConferencePublication, id: Math.random().toString(36).substr(2, 9) },
          ],
        });
        setNewConferencePublication(initialConference);
      }
    } else {
      alert("Please fill all required fields for the conference publication.");
    }
  };

  const editConferencePublication = (id: string) => {
    const conference = (faculty.internationalConferencePublications || []).find((c) => c.id === id);
    if (conference) {
      setNewConferencePublication(conference);
      setEditConferencePublicationId(id);
    }
  };

  const removeConferencePublication = (id: string) => {
    setFaculty({
      ...faculty,
      internationalConferencePublications: (faculty.internationalConferencePublications || []).filter((c) => c.id !== id),
    });
    if (editConferencePublicationId === id) {
      setEditConferencePublicationId(null);
      setNewConferencePublication(initialConference);
    }
  };

  const cancelEditConferencePublication = () => {
    setEditConferencePublicationId(null);
    setNewConferencePublication(initialConference);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">{mode === "add" ? "Add Faculty" : "Edit Faculty"}</h2>
        <div className="mb-4">
          <div className="flex justify-between">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div key={i} className={`flex-1 h-2 mx-1 rounded ${i + 1 <= step ? "bg-blue-500" : "bg-gray-300"}`} />
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Step {step} of {totalSteps}
          </p>
        </div>

        {step === 1 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Basic Information (Required)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={faculty.name}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Designation *</label>
                <input
                  type="text"
                  name="designation"
                  value={faculty.designation}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.designation && <p className="text-red-500 text-sm mt-1">{errors.designation}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Department *</label>
                <select
                  name="department"
                  value={faculty.department}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
              </div>
              {faculty.department === "Science & Humanities" && (
                <div>
                  <label className="block text-sm font-medium mb-1">Sub-Department *</label>
                  <select
                    name="subDepartment"
                    value={faculty.subDepartment || ""}
                    onChange={handleInputChange}
                    className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Sub-Department</option>
                    {subDepartments.map((subDept) => (
                      <option key={subDept} value={subDept}>
                        {subDept}
                      </option>
                    ))}
                  </select>
                  {errors.subDepartment && <p className="text-red-500 text-sm mt-1">{errors.subDepartment}</p>}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={faculty.email || ""}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Joining Date *</label>
                <input
                  type="date"
                  name="joiningDate"
                  value={faculty.joiningDate}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.joiningDate && <p className="text-red-500 text-sm mt-1">{errors.joiningDate}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Experience *</label>
                <input
                  type="text"
                  name="experience"
                  value={faculty.experience}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Employment Type *</label>
                <select
                  name="employmentType"
                  value={faculty.employmentType}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Regular">Regular</option>
                  <option value="Contract">Contract</option>
                  <option value="Visiting">Visiting</option>
                </select>
                {errors.employmentType && <p className="text-red-500 text-sm mt-1">{errors.employmentType}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Type *</label>
                <select
                  name="type"
                  value={faculty.type}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Teaching Staff">Teaching Staff</option>
                  <option value="Technical Staff">Technical Staff</option>
                </select>
                {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Priority (Higher appears first)</label>
                <select
                  name="priority"
                  value={faculty.priority === null ? "null" : faculty.priority?.toString()}
                  onChange={handleInputChange}
                  disabled={isLoadingPriorities}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                >
                  <option value="null">No Priority</option>
                  {availablePriorities
                    .filter((p) => p !== null)
                    .map((priority) => (
                      <option key={priority} value={priority}>
                        {priority}
                      </option>
                    ))}
                </select>
                {isLoadingPriorities && <p className="text-sm text-blue-500 mt-1">Loading priorities...</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Avatar {mode === "add" ? "*" : "(Optional)"}</label>
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.avatar && <p className="text-red-500 text-sm mt-1">{errors.avatar}</p>}
                {faculty.avatar && (
                  <img src={bufferToBase64(faculty.avatar)} alt="Avatar preview" className="mt-2 w-32 h-32 object-cover rounded-full" />
                )}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Qualifications (Required)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Degree *</label>
                <input
                  type="text"
                  name="degree"
                  value={newQualification.degree}
                  onChange={handleQualificationChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.degree && <p className="text-red-500 text-sm mt-1">{errors.degree}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Name of Degree *</label>
                <input
                  type="text"
                  name="nameOfDigree"
                  value={newQualification.nameOfDigree}
                  onChange={handleQualificationChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.nameOfDigree && <p className="text-red-500 text-sm mt-1">{errors.nameOfDigree}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Passing Year *</label>
                <input
                  type="text"
                  name="passingYear"
                  value={newQualification.passingYear}
                  onChange={handleQualificationChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.passingYear && <p className="text-red-500 text-sm mt-1">{errors.passingYear}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">College *</label>
                <input
                  type="text"
                  name="college"
                  value={newQualification.college}
                  onChange={handleQualificationChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.college && <p className="text-red-500 text-sm mt-1">{errors.college}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Specialization *</label>
                <input
                  type="text"
                  name="specialization"
                  value={newQualification.specialization}
                  onChange={handleQualificationChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.specialization && <p className="text-red-500 text-sm mt-1">{errors.specialization}</p>}
              </div>
            </div>
            <div className="flex space-x-2">
              <button onClick={addOrUpdateQualification} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                {editQualificationId ? "Update Qualification" : "Add Qualification"}
              </button>
              {editQualificationId && (
                <button onClick={cancelEditQualification} className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">
                  Cancel Edit
                </button>
              )}
            </div>
            {errors.qualifications && <p className="text-red-500 text-sm mt-2">{errors.qualifications}</p>}
            {faculty.qualifications.length > 0 && (
              <ul className="mt-4 space-y-2">
                {faculty.qualifications.map((q) => (
                  <li key={q.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                    {q.degree} - {q.college} ({q.passingYear}) - {q.specialization}
                    <div className="flex space-x-2">
                      <button onClick={() => editQualification(q.id)} className="text-blue-500 hover:text-blue-700">
                        Edit
                      </button>
                      <button onClick={() => removeQualification(q.id)} className="text-red-500 hover:text-red-700">
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Achievements (Optional)</h3>

            {/* Achievement Form */}
            <div className="mb-6 p-4 border rounded-lg bg-gray-50">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Achievement Heading *</label>
                <input
                  type="text"
                  value={newAchievement.heading}
                  onChange={handleAchievementHeadingChange}
                  placeholder="Enter achievement heading/title"
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Descriptions *</label>
                <div className="space-y-3">
                  {newAchievement.descriptions.map((desc, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <textarea
                        value={desc}
                        onChange={(e) => handleDescriptionChange(e, index)}
                        placeholder={`Description ${index + 1}`}
                        rows={3}
                        className="flex-1 border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      />
                      {newAchievement.descriptions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeDescription(index)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button type="button" onClick={addDescription} className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm">
                  + Add Description
                </button>
              </div>

              <div className="flex space-x-2 mt-4">
                <button
                  onClick={addOrUpdateAchievement}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  disabled={!newAchievement.heading.trim() || !newAchievement.descriptions.some((desc) => desc.trim())}
                >
                  {editAchievementId ? "Update Achievement" : "Add Achievement"}
                </button>
                {editAchievementId && (
                  <button onClick={cancelEditAchievement} className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">
                    Cancel Edit
                  </button>
                )}
              </div>
            </div>

            {/* Existing Achievements List */}
            {faculty.achievements && faculty.achievements.length > 0 && (
              <div>
                <h4 className="text-md font-medium mb-2">Added Achievements:</h4>
                <div className="space-y-3">
                  {faculty.achievements.map((achievement) => (
                    <div key={achievement.id} className="bg-white border rounded-lg p-4 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-semibold text-lg">{achievement.heading}</h5>
                        <div className="flex space-x-2">
                          <button onClick={() => editAchievement(achievement.id)} className="text-blue-500 hover:text-blue-700 text-sm">
                            Edit
                          </button>
                          <button onClick={() => removeAchievement(achievement.id)} className="text-red-500 hover:text-red-700 text-sm">
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="space-y-1 ml-4">
                        {achievement.descriptions.map(
                          (desc, index) =>
                            desc.trim() && (
                              <p key={index} className="text-sm text-gray-700 pl-2 ">
                                • {desc}
                              </p>
                            )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {step === 4 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Career Advancement (Optional)</h3>

            {/* Book Chapter Form */}
            <div className="mb-6 p-4 border rounded-lg bg-gray-50">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Career Advancement *</label>
                <input
                  type="text"
                  value={newBookChapter.heading}
                  onChange={handleBookChapterHeadingChange}
                  placeholder="Enter Career Advancement heading/title"
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Descriptions *</label>
                <div className="space-y-3">
                  {newBookChapter.descriptions.map((desc, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <textarea
                        value={desc}
                        onChange={(e) => handleBookChapterDescriptionChange(e, index)}
                        placeholder={`Description ${index + 1}`}
                        rows={3}
                        className="flex-1 border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      />
                      {newBookChapter.descriptions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeBookChapterDescription(index)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addBookChapterDescription}
                  className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm"
                >
                  + Add Description
                </button>
              </div>

              <div className="flex space-x-2 mt-4">
                <button
                  onClick={addOrUpdateBookChapter}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  disabled={!newBookChapter.heading.trim() || !newBookChapter.descriptions.some((desc) => desc.trim())}
                >
                  {editBookChapterId ? "Update Career Advancement" : "Add Career Advancement"}
                </button>
                {editBookChapterId && (
                  <button onClick={cancelEditBookChapter} className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">
                    Cancel Edit
                  </button>
                )}
              </div>
            </div>

            {/* Existing Book Chapters List */}
            {faculty.bookChapters && faculty.bookChapters.length > 0 && (
              <div>
                <h4 className="text-md font-medium mb-2">Added Career Advancement:</h4>
                <div className="space-y-3">
                  {faculty.bookChapters.map((bookChapter) => (
                    <div key={bookChapter.id} className="bg-white border rounded-lg p-4 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-semibold text-lg">{bookChapter.heading}</h5>
                        <div className="flex space-x-2">
                          <button onClick={() => editBookChapter(bookChapter.id)} className="text-blue-500 hover:text-blue-700 text-sm">
                            Edit
                          </button>
                          <button onClick={() => removeBookChapter(bookChapter.id)} className="text-red-500 hover:text-red-700 text-sm">
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="space-y-1 ml-4">
                        {bookChapter.descriptions.map(
                          (desc, index) =>
                            desc.trim() && (
                              <p key={index} className="text-sm text-gray-700 pl-2  ">
                                • {desc}
                              </p>
                            )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {step === 5 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Publications (Optional)</h3>

            {/* Certification Form */}
            <div className="mb-6 p-4 border rounded-lg bg-gray-50">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Publications Heading *</label>
                <input
                  type="text"
                  value={newCertification.heading}
                  onChange={handleCertificationHeadingChange}
                  placeholder="Enter Publications heading/title"
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Descriptions *</label>
                <div className="space-y-3">
                  {newCertification.descriptions.map((desc, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <textarea
                        value={desc}
                        onChange={(e) => handleCertificationDescriptionChange(e, index)}
                        placeholder={`Description ${index + 1}`}
                        rows={3}
                        className="flex-1 border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      />
                      {newCertification.descriptions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeCertificationDescription(index)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addCertificationDescription}
                  className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm"
                >
                  + Add Description
                </button>
              </div>

              <div className="flex space-x-2 mt-4">
                <button
                  onClick={addOrUpdateCertification}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  disabled={!newCertification.heading.trim() || !newCertification.descriptions.some((desc) => desc.trim())}
                >
                  {editCertificationId ? "Update Publications" : "Add Publications"}
                </button>
                {editCertificationId && (
                  <button onClick={cancelEditCertification} className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">
                    Cancel Edit
                  </button>
                )}
              </div>
            </div>

            {/* Existing Certifications List */}
            {faculty.certifications && faculty.certifications.length > 0 && (
              <div>
                <h4 className="text-md font-medium mb-2">Added Publications:</h4>
                <div className="space-y-3">
                  {faculty.certifications.map((certification) => (
                    <div key={certification.id} className="bg-white border rounded-lg p-4 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-semibold text-lg">{certification.heading}</h5>
                        <div className="flex space-x-2">
                          <button onClick={() => editCertification(certification.id)} className="text-blue-500 hover:text-blue-700 text-sm">
                            Edit
                          </button>
                          <button onClick={() => removeCertification(certification.id)} className="text-red-500 hover:text-red-700 text-sm">
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="space-y-1 ml-4">
                        {certification.descriptions.map(
                          (desc, index) =>
                            desc.trim() && (
                              <p key={index} className="text-sm text-gray-700 pl-2  ">
                                • {desc}
                              </p>
                            )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* {step === 6 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Journal Publications (Optional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Journal Publications</label>
                <textarea
                  
                  name="publicationsData"
                  value={newJournalPublication.publicationsData}
                  onChange={handleJournalPublicationChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
    
            </div>
            <div className="flex space-x-2">
              <button onClick={addOrUpdateJournalPublication} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                {editJournalPublicationId ? "Update Journal Publication" : "Add Journal Publication"}
              </button>
              {editJournalPublicationId && (
                <button onClick={cancelEditJournalPublication} className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">
                  Cancel Edit
                </button>
              )}
            </div>
            {faculty.internationalJournalPublications && faculty.internationalJournalPublications.length > 0 && (
              <ul className="mt-4 space-y-2">
                {faculty.internationalJournalPublications.map((jp) => (
                  <li key={jp.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                    {jp.publicationsData}
                    <div className="flex space-x-2">
                      <button onClick={() => editJournalPublication(jp.id)} className="text-blue-500 hover:text-blue-700">
                        Edit
                      </button>
                      <button onClick={() => removeJournalPublication(jp.id)} className="text-red-500 hover:text-red-700">
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {step === 7 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Conference Publications (Optional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Conference Publications</label>
                <textarea
                
                  name="conferencePublications"
                  value={newConferencePublication.conferencePublications}
                  onChange={handleConferencePublicationChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
          
            </div>
            <div className="flex space-x-2">
              <button onClick={addOrUpdateConferencePublication} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                {editConferencePublicationId ? "Update Conference Publication" : "Add Conference Publication"}
              </button>
              {editConferencePublicationId && (
                <button onClick={cancelEditConferencePublication} className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">
                  Cancel Edit
                </button>
              )}
            </div>
            {faculty.internationalConferencePublications && faculty.internationalConferencePublications.length > 0 && (
              <ul className="mt-4 space-y-2">
                {faculty.internationalConferencePublications.map((cp) => (
                  <li key={cp.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                    {cp.conferencePublications}
                    <div className="flex space-x-2">
                      <button onClick={() => editConferencePublication(cp.id)} className="text-blue-500 hover:text-blue-700">
                        Edit
                      </button>
                      <button onClick={() => removeConferencePublication(cp.id)} className="text-red-500 hover:text-red-700">
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )} */}

        <div className="flex justify-between mt-6">
          <button onClick={onClose} className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">
            Cancel
          </button>
          <div className="flex space-x-2">
            {step > 1 && (
              <button onClick={handleBack} className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">
                Back
              </button>
            )}
            {step > 1 && step < totalSteps && (
              <button onClick={handleSkip} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                Skip
              </button>
            )}
            <button onClick={handleNext} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              {step === totalSteps ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

const Page: React.FC = () => {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | undefined>(undefined);
  const { toast } = useToast();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [facultyToDelete, setFacultyToDelete] = useState<Faculty | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [totalFaculties, setTotalFaculties] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const fetchFaculties = () => {
    setIsLoading(true);
    const queryParams = new URLSearchParams({
      page: currentPage.toString(),
      limit: rowsPerPage.toString(),
      ...(departmentFilter && { department: departmentFilter }),
      ...(search && { search }),
    });
    fetch(`${API_BASE_URL}/faculty?${queryParams}`)
      .then((res) => res.json())
      .then((response) => {
        setFaculties(response.data);
        setTotalFaculties(response.total);
        setTotalPages(response.totalPages);
      })
      .catch((error) => {
        console.error("Error fetching faculties:", error);
        toast({
          title: "Error",
          description: "Failed to load faculty data.",
          variant: "destructive",
        });
      })
      .finally(() => setIsLoading(false));
  };

  // Fetch department options for dropdown
  const [departmentOptions, setDepartmentOptions] = useState<string[]>([]);
  const fetchDepartments = () => {
    fetch(`${API_BASE_URL}/faculty/departments`)
      .then((res) => res.json())
      .then((departments: string[]) => {
        setDepartmentOptions(departments);
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
      });
  };

  useEffect(() => {
    fetchFaculties();
    fetchDepartments();
  }, [currentPage, rowsPerPage, departmentFilter, search]);

  const handleAddFaculty = () => {
    setModalMode("add");
    setSelectedFaculty(undefined);
    setIsModalOpen(true);
  };

  const handleEditFaculty = (faculty: Faculty) => {
    setModalMode("edit");
    setSelectedFaculty(faculty);
    setIsModalOpen(true);
  };

  const handleSubmit = (faculty: Faculty, avatarFile: File | null) => {
    const token = localStorage.getItem("token");
    const facultyData = { ...faculty, avatar: undefined };
    const formData = new FormData();
    formData.append("data", JSON.stringify(facultyData));
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    if (modalMode === "add") {
      fetch(`${API_BASE_URL}/faculty`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then((err) => {
              throw new Error(err.message);
            });
          }
          return res.json();
        })
        .then(() => {
          fetchFaculties();
          fetchDepartments();
          setIsModalOpen(false);
          toast({
            title: "Success",
            description: "Faculty added successfully.",
          });
        })
        .catch((error) => {
          console.error("Error adding faculty:", error);
          toast({
            title: "Error",
            description: "Failed to add faculty.",
            variant: "destructive",
          });
        });
    } else {
      fetch(`${API_BASE_URL}/faculty/${faculty.id}`, {
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then((err) => {
              throw new Error(err.message);
            });
          }
          return res.json();
        })
        .then(() => {
          fetchFaculties();
          fetchDepartments();
          setIsModalOpen(false);
          toast({
            title: "Success",
            description: "Faculty information updated successfully.",
          });
        })
        .catch((error) => {
          console.error("Error updating faculty:", error);
          toast({
            title: "Error",
            description: "Failed to update faculty.",
            variant: "destructive",
          });
        });
    }
  };

  const handleDeleteFaculty = (id: string) => {
    const token = localStorage.getItem("token");
    fetch(`${API_BASE_URL}/faculty/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(err.message);
          });
        }
        fetchFaculties();
        toast({
          title: "Success",
          description: "Faculty deleted successfully.",
        });
      })
      .catch((error) => {
        console.error("Error deleting faculty:", error);
        toast({
          title: "Error",
          description: "Failed to delete faculty.",
          variant: "destructive",
        });
      });
  };

  // Filter faculties by search (client-side for name search)
  // ✅ Use data directly from backend
  const displayedFaculties = faculties;

  return (
    <div className="p-4">
      <PageTitle
        title="Faculty Management"
        icon={LandPlot}
        action={
          <Button onClick={handleAddFaculty}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Faculty
          </Button>
        }
      />
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by faculty name"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border outline-none rounded p-2 w-full md:w-1/3"
        />
        <select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)} className="border rounded p-2 w-full md:w-1/4">
          <option value="">All Departments</option>
          {departmentOptions.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>
      <table className="min-w-full border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Avatar</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Designation</th>
            <th className="border px-4 py-2">Department</th>
            <th className="border px-4 py-2">Joining Date</th>
            <th className="border px-4 py-2">Employment Type</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedFaculties.map((faculty) => (
            <tr key={faculty.id}>
              <td className="border px-4 py-2">
                {faculty.avatar && (
                  <img src={bufferToBase64(faculty.avatar)} alt={`${faculty.name}'s avatar`} className="w-12 h-12 object-cover rounded" />
                )}
              </td>
              <td className="border px-4 py-2">{faculty.name}</td>
              <td className="border px-4 py-2">{faculty.designation}</td>
              <td className="border px-4 py-2">{faculty.department}</td>
              <td className="border px-4 py-2">{faculty.joiningDate}</td>
              <td className="border px-4 py-2">{faculty.employmentType}</td>
              <td className="border px-4 py-2 flex">
                <button onClick={() => handleEditFaculty(faculty)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                  Edit
                </button>
                <button
                  onClick={() => {
                    setFacultyToDelete(faculty);
                    setIsDeleteModalOpen(true);
                  }}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {isLoading ? (
            <tr>
              <td colSpan={7} className="border px-4 py-6 text-center text-gray-600">
                Loading faculties...
              </td>
            </tr>
          ) : displayedFaculties.length === 0 ? (
            <tr>
              <td colSpan={7} className="border px-4 py-6 text-center text-gray-600">
                No faculties found.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
      <div className="mt-4">
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
          onPageChange={(p) => setCurrentPage(p)}
          onRowsPerPageChange={(r) => {
            setRowsPerPage(r);
            setCurrentPage(1);
          }}
        />
        <div className="text-sm text-gray-600 mt-2">
          Showing {Math.min((currentPage - 1) * rowsPerPage + 1, totalFaculties || 0)} - {Math.min(currentPage * rowsPerPage, totalFaculties)} of{" "}
          {totalFaculties} faculties
        </div>
      </div>
      <FacultyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        mode={modalMode}
        facultyToEdit={selectedFaculty}
        API_BASE_URL={API_BASE_URL}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        id={facultyToDelete?.id || ""}
        itemName={facultyToDelete?.name || "this faculty"}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={(id: string) => {
          handleDeleteFaculty(id);
          setIsDeleteModalOpen(false);
          setFacultyToDelete(null);
        }}
      />
    </div>
  );
};

export default Page;

type DeleteConfirmationModalProps = {
  isOpen: boolean;
  id: string;
  onClose: () => void;
  onConfirm: (id: string) => void;
  itemName?: string;
};

function DeleteConfirmationModal({ isOpen, id, onClose, onConfirm, itemName = "this item" }: DeleteConfirmationModalProps) {
  if (!isOpen || !id) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirm Delete</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <strong>{itemName}</strong>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-md text-sm bg-gray-200 hover:bg-gray-300">
            Cancel
          </button>
          <button onClick={() => onConfirm(id)} className="px-4 py-2 rounded-md text-sm bg-red-600 text-white hover:bg-red-700">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
