'use client';

import { PageTitle } from '@/components/page-title';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { LandPlot, PlusCircle } from 'lucide-react';
import React, { useState, useEffect } from 'react';

interface Faculty {
  id: string;
  name: string;
  designation: string;
  department: string;
  email: string;
  joiningDate: string;
  experience: string;
  employmentType: 'Regular' | 'Contract' | 'Visiting';
  qualifications: Qualification[];
  avatar?: { type: string; data: number[] } | null;
  patents?: Patent[];
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
  specialization: string;
}

interface Patent {
  id: string;
  title: string;
  authors: string;
  date: string;
  applicationNumber: string;
  patentOffice: string;
  status: string;
  reference: string;
}

interface BookChapter {
  id: string;
  title: string;
  authors: string;
  bookTitle: string;
  publisher: string;
  publicationYear: string;
  doi: string;
  isbn: string;
  scopusIndexed: boolean;
  pageNumbers: string;
}

interface Certification {
  id: string;
  name: string;
  issuingOrganization: string;
  issueDate: string;
  expiryDate: string;
  credentialId: string;
  credentialUrl: string;
  credits: string;
}

interface JournalPublication {
  id: string;
  title: string;
  authors: string;
  journalName: string;
  publicationDate: string;
  volume: string;
  issue: string;
  pageNumbers: string;
  doi: string;
  issn: string;
  indexing: string;
}

interface ConferencePublication {
  id: string;
  title: string;
  authors: string;
  conferenceName: string;
  conferenceDate: string;
  location: string;
  doi: string;
  publisher: string;
  isbn: string;
  pageNumbers: string;
}

interface FacultyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (faculty: Faculty, avatarFile: File | null) => void;
  mode: 'add' | 'edit';
  facultyToEdit?: Faculty;
}

const departments = [
  'Computer Science & Engineering',
  'Information Science & Engineering',
  'Electronics & Communication Engineering',
  'Computer Science & Design',
  'Computer Science & Business System',
  'Artificial Intelligence & Machine Learning',
  'Placement Team',
  'other'
];

const bufferToBase64 = (buffer: { type: string; data: number[] }) => {
  const binary = buffer.data.reduce((acc, byte) => acc + String.fromCharCode(byte), "");
  const base64 = btoa(binary);
  return `data:image/jpeg;base64,${base64}`;
};

const FacultyModal: React.FC<FacultyModalProps> = ({ isOpen, onClose, onSubmit, mode, facultyToEdit }) => {
  const [step, setStep] = useState(1);
  const initialFaculty: Faculty = {
    id: Math.random().toString(36).substr(2, 9),
    name: '',
    designation: '',
    department: '',
    email: '',
    joiningDate: '',
    experience: '',
    employmentType: 'Regular',
    qualifications: [],
    avatar: null,
    patents: [],
    bookChapters: [],
    certifications: [],
    internationalJournalPublications: [],
    internationalConferencePublications: [],
  };
  const [faculty, setFaculty] = useState<Faculty>(initialFaculty);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const initialQualification: Qualification = {
    id: Math.random().toString(36).substr(2, 9),
    degree: '',
    passingYear: '',
    college: '',
    specialization: '',
  };
  const [newQualification, setNewQualification] = useState<Qualification>(initialQualification);
  const initialPatent: Patent = {
    id: Math.random().toString(36).substr(2, 9),
    title: '',
    authors: '',
    date: '',
    applicationNumber: '',
    patentOffice: '',
    status: '',
    reference: '',
  };
  const [newPatent, setNewPatent] = useState<Patent>(initialPatent);
  const initialBookChapter: BookChapter = {
    id: Math.random().toString(36).substr(2, 9),
    title: '',
    authors: '',
    bookTitle: '',
    publisher: '',
    publicationYear: '',
    doi: '',
    isbn: '',
    scopusIndexed: false,
    pageNumbers: '',
  };
  const [newBookChapter, setNewBookChapter] = useState<BookChapter>(initialBookChapter);
  const initialCertification: Certification = {
    id: Math.random().toString(36).substr(2, 9),
    name: '',
    issuingOrganization: '',
    issueDate: '',
    expiryDate: '',
    credentialId: '',
    credentialUrl: '',
    credits: '',
  };
  const [newCertification, setNewCertification] = useState<Certification>(initialCertification);
  const initialJournal: JournalPublication = {
    id: Math.random().toString(36).substr(2, 9),
    title: '',
    authors: '',
    journalName: '',
    publicationDate: '',
    volume: '',
    issue: '',
    pageNumbers: '',
    doi: '',
    issn: '',
    indexing: '',
  };
  const [newJournalPublication, setNewJournalPublication] = useState<JournalPublication>(initialJournal);
  const initialConference: ConferencePublication = {
    id: Math.random().toString(36).substr(2, 9),
    title: '',
    authors: '',
    conferenceName: '',
    conferenceDate: '',
    location: '',
    doi: '',
    publisher: '',
    isbn: '',
    pageNumbers: '',
  };
  const [newConferencePublication, setNewConferencePublication] = useState<ConferencePublication>(initialConference);

  useEffect(() => {
    if (mode === 'add') {
      setFaculty(initialFaculty);
      setAvatarFile(null);
      setNewQualification(initialQualification);
      setNewPatent(initialPatent);
      setNewBookChapter(initialBookChapter);
      setNewCertification(initialCertification);
      setNewJournalPublication(initialJournal);
      setNewConferencePublication(initialConference);
      setStep(1);
      setErrors({});
    } else if (mode === 'edit' && facultyToEdit) {
      setFaculty(facultyToEdit);
      setAvatarFile(null);
      setNewQualification(initialQualification);
      setNewPatent(initialPatent);
      setNewBookChapter(initialBookChapter);
      setNewCertification(initialCertification);
      setNewJournalPublication(initialJournal);
      setNewConferencePublication(initialConference);
      setStep(1);
      setErrors({});
    }
  }, [mode, facultyToEdit, isOpen]);

  const totalSteps = 7;

  const validateStep = (currentStep: number) => {
    const newErrors: { [key: string]: string } = {};
    if (currentStep === 1) {
      if (!faculty.name || faculty.name.trim() === '') newErrors.name = 'Name is required';
      if (!faculty.designation || faculty.designation.trim() === '') newErrors.designation = 'Designation is required';
      if (!faculty.department) newErrors.department = 'Department is required';
      if (!faculty.email || !/\S+@\S+\.\S+/.test(faculty.email)) newErrors.email = 'Valid email is required';
      if (!faculty.joiningDate) newErrors.joiningDate = 'Joining date is required';
      if (!faculty.experience || faculty.experience.trim() === '') newErrors.experience = 'Experience is required';
      if (!faculty.employmentType) newErrors.employmentType = 'Employment type is required';
      if (mode === 'add' && !faculty.avatar && !avatarFile) newErrors.avatar = 'Avatar is required';
    }
    if (currentStep === 2) {
      if (faculty.qualifications.length === 0) {
        newErrors.qualifications = 'At least one qualification is required';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 2 && newQualification.degree && newQualification.passingYear && newQualification.college && newQualification.specialization) {
      setFaculty({
        ...faculty,
        qualifications: [...faculty.qualifications, { ...newQualification, id: Math.random().toString(36).substr(2, 9) }],
      });
      setNewQualification(initialQualification);
    }
    if (step === 3 && newPatent.title && newPatent.authors && newPatent.date && newPatent.applicationNumber) {
      setFaculty({
        ...faculty,
        patents: [...(faculty.patents || []), { ...newPatent, id: Math.random().toString(36).substr(2, 9) }],
      });
      setNewPatent(initialPatent);
    }
    if (step === 4 && newBookChapter.title && newBookChapter.authors && newBookChapter.bookTitle && newBookChapter.publisher) {
      setFaculty({
        ...faculty,
        bookChapters: [...(faculty.bookChapters || []), { ...newBookChapter, id: Math.random().toString(36).substr(2, 9) }],
      });
      setNewBookChapter(initialBookChapter);
    }
    if (step === 5 && newCertification.name && newCertification.issuingOrganization && newCertification.issueDate) {
      setFaculty({
        ...faculty,
        certifications: [...(faculty.certifications || []), { ...newCertification, id: Math.random().toString(36).substr(2, 9) }],
      });
      setNewCertification(initialCertification);
    }
    if (step === 6 && newJournalPublication.title && newJournalPublication.authors && newJournalPublication.journalName) {
      setFaculty({
        ...faculty,
        internationalJournalPublications: [...(faculty.internationalJournalPublications || []), { ...newJournalPublication, id: Math.random().toString(36).substr(2, 9) }],
      });
      setNewJournalPublication(initialJournal);
    }
    if (step === 7 && newConferencePublication.title && newConferencePublication.authors && newConferencePublication.conferenceName) {
      setFaculty({
        ...faculty,
        internationalConferencePublications: [...(faculty.internationalConferencePublications || []), { ...newConferencePublication, id: Math.random().toString(36).substr(2, 9) }],
      });
      setNewConferencePublication(initialConference);
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
    if (name === 'avatar') {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setAvatarFile(file);
        const arrayBuffer = await file.arrayBuffer();
        const buffer = {
          type: file.type,
          data: Array.from(new Uint8Array(arrayBuffer))
        };
        setFaculty({ ...faculty, avatar: buffer });
      } else {
        setAvatarFile(null);
        setFaculty({ ...faculty, avatar: null });
      }
    } else {
      setFaculty({ ...faculty, [name]: value });
    }
  };

  const handleQualificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewQualification({ ...newQualification, [name]: value });
  };

  const addQualification = () => {
    if (newQualification.degree && newQualification.passingYear && newQualification.college && newQualification.specialization) {
      setFaculty({
        ...faculty,
        qualifications: [...faculty.qualifications, { ...newQualification, id: Math.random().toString(36).substr(2, 9) }],
      });
      setNewQualification(initialQualification);
    } else {
      alert('Please fill all required fields for the qualification.');
    }
  };

  const removeQualification = (id: string) => {
    setFaculty({
      ...faculty,
      qualifications: faculty.qualifications.filter(q => q.id !== id),
    });
  };

  const handlePatentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPatent({ ...newPatent, [name]: value });
  };

  const addPatent = () => {
    if (newPatent.title && newPatent.authors && newPatent.date && newPatent.applicationNumber) {
      setFaculty({
        ...faculty,
        patents: [...(faculty.patents || []), { ...newPatent, id: Math.random().toString(36).substr(2, 9) }],
      });
      setNewPatent(initialPatent);
    } else {
      alert('Please fill all required fields for the patent.');
    }
  };

  const removePatent = (id: string) => {
    setFaculty({
      ...faculty,
      patents: (faculty.patents || []).filter(p => p.id !== id),
    });
  };

  const handleBookChapterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target as any;
    setNewBookChapter({ ...newBookChapter, [name]: type === 'checkbox' ? checked : value });
  };

  const addBookChapter = () => {
    if (newBookChapter.title && newBookChapter.authors && newBookChapter.bookTitle && newBookChapter.publisher) {
      setFaculty({
        ...faculty,
        bookChapters: [...(faculty.bookChapters || []), { ...newBookChapter, id: Math.random().toString(36).substr(2, 9) }],
      });
      setNewBookChapter(initialBookChapter);
    } else {
      alert('Please fill all required fields for the book chapter.');
    }
  };

  const removeBookChapter = (id: string) => {
    setFaculty({
      ...faculty,
      bookChapters: (faculty.bookChapters || []).filter(b => b.id !== id),
    });
  };

  const handleCertificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCertification({ ...newCertification, [name]: value });
  };

  const addCertification = () => {
    if (newCertification.name && newCertification.issuingOrganization && newCertification.issueDate) {
      setFaculty({
        ...faculty,
        certifications: [...(faculty.certifications || []), { ...newCertification, id: Math.random().toString(36).substr(2, 9) }],
      });
      setNewCertification(initialCertification);
    } else {
      alert('Please fill all required fields for the certification.');
    }
  };

  const removeCertification = (id: string) => {
    setFaculty({
      ...faculty,
      certifications: (faculty.certifications || []).filter(c => c.id !== id),
    });
  };

  const handleJournalPublicationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewJournalPublication({ ...newJournalPublication, [name]: value });
  };

  const addJournalPublication = () => {
    if (newJournalPublication.title && newJournalPublication.authors && newJournalPublication.journalName) {
      setFaculty({
        ...faculty,
        internationalJournalPublications: [...(faculty.internationalJournalPublications || []), { ...newJournalPublication, id: Math.random().toString(36).substr(2, 9) }],
      });
      setNewJournalPublication(initialJournal);
    } else {
      alert('Please fill all required fields for the journal publication.');
    }
  };

  const removeJournalPublication = (id: string) => {
    setFaculty({
      ...faculty,
      internationalJournalPublications: (faculty.internationalJournalPublications || []).filter(j => j.id !== id),
    });
  };

  const handleConferencePublicationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewConferencePublication({ ...newConferencePublication, [name]: value });
  };

  const addConferencePublication = () => {
    if (newConferencePublication.title && newConferencePublication.authors && newConferencePublication.conferenceName) {
      setFaculty({
        ...faculty,
        internationalConferencePublications: [...(faculty.internationalConferencePublications || []), { ...newConferencePublication, id: Math.random().toString(36).substr(2, 9) }],
      });
      setNewConferencePublication(initialConference);
    } else {
      alert('Please fill all required fields for the conference publication.');
    }
  };

  const removeConferencePublication = (id: string) => {
    setFaculty({
      ...faculty,
      internationalConferencePublications: (faculty.internationalConferencePublications || []).filter(c => c.id !== id),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">{mode === 'add' ? 'Add Faculty' : 'Edit Faculty'}</h2>
        <div className="mb-4">
          <div className="flex justify-between">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`flex-1 h-2 mx-1 rounded ${i + 1 <= step ? 'bg-blue-500' : 'bg-gray-300'}`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-2">Step {step} of {totalSteps}</p>
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
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={faculty.email}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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
                <label className="block text-sm font-medium mb-1">Avatar {mode === 'add' ? '*' : '(Optional)'}</label>
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.avatar && <p className="text-red-500 text-sm mt-1">{errors.avatar}</p>}
                {faculty.avatar && (
                  <img
                    src={bufferToBase64(faculty.avatar)}
                    alt="Avatar preview"
                    className="mt-2 w-32 h-32 object-cover rounded"
                  />
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
              </div>
            </div>
            <button
              onClick={addQualification}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Qualification
            </button>
            {errors.qualifications && <p className="text-red-500 text-sm mt-2">{errors.qualifications}</p>}
            {faculty.qualifications.length > 0 && (
              <ul className="mt-4 space-y-2">
                {faculty.qualifications.map((q) => (
                  <li key={q.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                    {q.degree} - {q.college} ({q.passingYear}) - {q.specialization}
                    <button onClick={() => removeQualification(q.id)} className="text-red-500 hover:text-red-700">Remove</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Patents (Optional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={newPatent.title}
                  onChange={handlePatentChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Authors *</label>
                <input
                  type="text"
                  name="authors"
                  value={newPatent.authors}
                  onChange={handlePatentChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date *</label>
                <input
                  type="date"
                  name="date"
                  value={newPatent.date}
                  onChange={handlePatentChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Application Number *</label>
                <input
                  type="text"
                  name="applicationNumber"
                  value={newPatent.applicationNumber}
                  onChange={handlePatentChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Patent Office</label>
                <input
                  type="text"
                  name="patentOffice"
                  value={newPatent.patentOffice}
                  onChange={handlePatentChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <input
                  type="text"
                  name="status"
                  value={newPatent.status}
                  onChange={handlePatentChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Reference</label>
                <input
                  type="text"
                  name="reference"
                  value={newPatent.reference}
                  onChange={handlePatentChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <button
              onClick={addPatent}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Patent
            </button>
            {faculty.patents && faculty.patents.length > 0 && (
              <ul className="mt-4 space-y-2">
                {faculty.patents.map((p) => (
                  <li key={p.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                    {p.title} - {p.applicationNumber}
                    <button onClick={() => removePatent(p.id)} className="text-red-500 hover:text-red-700">Remove</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {step === 4 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Book Chapters (Optional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={newBookChapter.title}
                  onChange={handleBookChapterChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Authors *</label>
                <input
                  type="text"
                  name="authors"
                  value={newBookChapter.authors}
                  onChange={handleBookChapterChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Book Title *</label>
                <input
                  type="text"
                  name="bookTitle"
                  value={newBookChapter.bookTitle}
                  onChange={handleBookChapterChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Publisher *</label>
                <input
                  type="text"
                  name="publisher"
                  value={newBookChapter.publisher}
                  onChange={handleBookChapterChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Publication Year</label>
                <input
                  type="text"
                  name="publicationYear"
                  value={newBookChapter.publicationYear}
                  onChange={handleBookChapterChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">DOI</label>
                <input
                  type="text"
                  name="doi"
                  value={newBookChapter.doi}
                  onChange={handleBookChapterChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">ISBN</label>
                <input
                  type="text"
                  name="isbn"
                  value={newBookChapter.isbn}
                  onChange={handleBookChapterChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Page Numbers</label>
                <input
                  type="text"
                  name="pageNumbers"
                  value={newBookChapter.pageNumbers}
                  onChange={handleBookChapterChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="flex items-center text-sm font-medium">
                  <input
                    type="checkbox"
                    name="scopusIndexed"
                    checked={newBookChapter.scopusIndexed}
                    onChange={handleBookChapterChange}
                    className="mr-2"
                  />
                  Scopus Indexed
                </label>
              </div>
            </div>
            <button
              onClick={addBookChapter}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Book Chapter
            </button>
            {faculty.bookChapters && faculty.bookChapters.length > 0 && (
              <ul className="mt-4 space-y-2">
                {faculty.bookChapters.map((bc) => (
                  <li key={bc.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                    {bc.title} - {bc.bookTitle}
                    <button onClick={() => removeBookChapter(bc.id)} className="text-red-500 hover:text-red-700">Remove</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {step === 5 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Certifications (Optional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={newCertification.name}
                  onChange={handleCertificationChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Issuing Organization *</label>
                <input
                  type="text"
                  name="issuingOrganization"
                  value={newCertification.issuingOrganization}
                  onChange={handleCertificationChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Issue Date *</label>
                <input
                  type="date"
                  name="issueDate"
                  value={newCertification.issueDate}
                  onChange={handleCertificationChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Expiry Date</label>
                <input
                  type="date"
                  name="expiryDate"
                  value={newCertification.expiryDate}
                  onChange={handleCertificationChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Credential ID</label>
                <input
                  type="text"
                  name="credentialId"
                  value={newCertification.credentialId}
                  onChange={handleCertificationChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Credential URL</label>
                <input
                  type="text"
                  name="credentialUrl"
                  value={newCertification.credentialUrl}
                  onChange={handleCertificationChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Credits</label>
                <input
                  type="text"
                  name="credits"
                  value={newCertification.credits}
                  onChange={handleCertificationChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <button
              onClick={addCertification}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Certification
            </button>
            {faculty.certifications && faculty.certifications.length > 0 && (
              <ul className="mt-4 space-y-2">
                {faculty.certifications.map((c) => (
                  <li key={c.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                    {c.name} - {c.issuingOrganization}
                    <button onClick={() => removeCertification(c.id)} className="text-red-500 hover:text-red-700">Remove</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {step === 6 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Journal Publications (Optional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={newJournalPublication.title}
                  onChange={handleJournalPublicationChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Authors *</label>
                <input
                  type="text"
                  name="authors"
                  value={newJournalPublication.authors}
                  onChange={handleJournalPublicationChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Journal Name *</label>
                <input
                  type="text"
                  name="journalName"
                  value={newJournalPublication.journalName}
                  onChange={handleJournalPublicationChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Publication Date</label>
                <input
                  type="date"
                  name="publicationDate"
                  value={newJournalPublication.publicationDate}
                  onChange={handleJournalPublicationChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Volume</label>
                <input
                  type="text"
                  name="volume"
                  value={newJournalPublication.volume}
                  onChange={handleJournalPublicationChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Issue</label>
                <input
                  type="text"
                  name="issue"
                  value={newJournalPublication.issue}
                  onChange={handleJournalPublicationChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Page Numbers</label>
                <input
                  type="text"
                  name="pageNumbers"
                  value={newJournalPublication.pageNumbers}
                  onChange={handleJournalPublicationChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">DOI</label>
                <input
                  type="text"
                  name="doi"
                  value={newJournalPublication.doi}
                  onChange={handleJournalPublicationChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">ISSN</label>
                <input
                  type="text"
                  name="issn"
                  value={newJournalPublication.issn}
                  onChange={handleJournalPublicationChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Indexing</label>
                <input
                  type="text"
                  name="indexing"
                  value={newJournalPublication.indexing}
                  onChange={handleJournalPublicationChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <button
              onClick={addJournalPublication}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Journal Publication
            </button>
            {faculty.internationalJournalPublications && faculty.internationalJournalPublications.length > 0 && (
              <ul className="mt-4 space-y-2">
                {faculty.internationalJournalPublications.map((jp) => (
                  <li key={jp.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                    {jp.title} - {jp.journalName}
                    <button onClick={() => removeJournalPublication(jp.id)} className="text-red-500 hover:text-red-700">Remove</button>
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
                <label className="block text-sm font-medium mb-1">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={newConferencePublication.title}
                  onChange={handleConferencePublicationChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Authors *</label>
                <input
                  type="text"
                  name="authors"
                  value={newConferencePublication.authors}
                  onChange={handleConferencePublicationChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Conference Name *</label>
                <input
                  type="text"
                  name="conferenceName"
                  value={newConferencePublication.conferenceName}
                  onChange={handleConferencePublicationChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Conference Date</label>
                <input
                  type="date"
                  name="conferenceDate"
                  value={newConferencePublication.conferenceDate}
                  onChange={handleConferencePublicationChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={newConferencePublication.location}
                  onChange={handleConferencePublicationChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">DOI</label>
                <input
                  type="text"
                  name="doi"
                  value={newConferencePublication.doi}
                  onChange={handleConferencePublicationChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Publisher</label>
                <input
                  type="text"
                  name="publisher"
                  value={newConferencePublication.publisher}
                  onChange={handleConferencePublicationChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">ISBN</label>
                <input
                  type="text"
                  name="isbn"
                  value={newConferencePublication.isbn}
                  onChange={handleConferencePublicationChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Page Numbers</label>
                <input
                  type="text"
                  name="pageNumbers"
                  value={newConferencePublication.pageNumbers}
                  onChange={handleConferencePublicationChange}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <button
              onClick={addConferencePublication}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Conference Publication
            </button>
            {faculty.internationalConferencePublications && faculty.internationalConferencePublications.length > 0 && (
              <ul className="mt-4 space-y-2">
                {faculty.internationalConferencePublications.map((cp) => (
                  <li key={cp.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                    {cp.title} - {cp.conferenceName}
                    <button onClick={() => removeConferencePublication(cp.id)} className="text-red-500 hover:text-red-700">Remove</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <div className="flex space-x-2">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                Back
              </button>
            )}
            {step > 1 && step < totalSteps && (
              <button
                onClick={handleSkip}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Skip
              </button>
            )}
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {step === totalSteps ? 'Submit' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const API_BASE_URL = 'http://localhost:3000';

const Page: React.FC = () => {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | undefined>(undefined);
const { toast } = useToast();
  useEffect(() => {
    fetch(`${API_BASE_URL}/faculty`)
      .then(res => res.json())
      .then(setFaculties)
      .catch(error => console.error('Error fetching faculties:', error));
  }, []);

  const handleAddFaculty = () => {
    setModalMode('add');
    setSelectedFaculty(undefined);
    setIsModalOpen(true);
  };

  const handleEditFaculty = (faculty: Faculty) => {
    setModalMode('edit');
    setSelectedFaculty(faculty);
    setIsModalOpen(true);
  };

  const handleSubmit = (faculty: Faculty, avatarFile: File | null) => {
    const facultyData = { ...faculty, avatar: undefined }; // Remove avatar buffer from data
    const formData = new FormData();
    formData.append('data', JSON.stringify(facultyData));
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }

    if (modalMode === 'add') {
      fetch(`${API_BASE_URL}/faculty`, {
        method: 'POST',
        body: formData,
      })
        .then(res => {
          if (!res.ok) {
            return res.json().then(err => { throw new Error(err.message); });
          }
          return res.json();
        })
        .then(newFaculty => {
          setFaculties([...faculties, newFaculty]);
          setIsModalOpen(false);
           toast({
        title: "Success",
        description: "Faculty added successfully.",
      });
        })
        
        .catch(error => {
          console.error('Error adding faculty:', error);
          alert(`Failed to add faculty: ${error.message}`);
        });
    } else {
      fetch(`${API_BASE_URL}/faculty/${faculty.id}`, {
        method: 'PATCH',
        body: formData,
      })
        .then(res => {
          if (!res.ok) {
            return res.json().then(err => { throw new Error(err.message); });
          }
          return res.json();
        })
        .then(updatedFaculty => {
          setFaculties(faculties.map(f => f.id === updatedFaculty.id ? updatedFaculty : f));
          setIsModalOpen(false);
            toast({
        title: "Success",
        description: "Faculty information updated successfully.",
      });
        })
        .catch(error => {
          console.error('Error updating faculty:', error);
          alert(`Failed to update faculty: ${error.message}`);
        });
    }
  };

  const handleDeleteFaculty = (id: string) => {
   
    
  
      fetch(`${API_BASE_URL}/faculty/${id}`, {
        method: 'DELETE',
      })
        .then(res => {
          if (!res.ok) {
            return res.json().then(err => { throw new Error(err.message); });
          }
          setFaculties(faculties.filter(f => f.id !== id));
           toast({
        title: "Success",
        description: "Faculty Deleted successfully.",
      });
        })
        
        .catch(error => {
          console.error('Error deleting faculty:', error);
          alert(`Failed to delete faculty: ${error.message}`);
        });
    
  };


  
  return (
    <div className="p-4">

   <PageTitle
          title="Faculty Management"
          icon={LandPlot}
          action={
            <Button
          onClick={handleAddFaculty}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Faculty
            </Button>
          }
        />
    
        <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
          <tr >
            <th className="border  px-4 py-2">Avatar</th>
            <th className="border  px-4 py-2">Name</th>
            <th className="border  px-4 py-2">Designation</th>
            <th className="border  px-4 py-2">Department</th>
            <th className="border  px-4 py-2">Email</th>
            <th className="border  px-4 py-2">Joining Date</th>
          
            <th className="border  px-4 py-2">Employment Type</th>
            <th className="border  px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {faculties.map((faculty) => (
            <tr key={faculty.id}>
              <td className="border px-4 py-2">
                {faculty.avatar && (
                  <img
                    src={bufferToBase64(faculty.avatar)}
                    alt={`${faculty.name}'s avatar`}
                    className="w-12 h-12 object-cover rounded"
                  />
                )}
              </td>
              <td className="border px-4 py-2">{faculty.name}</td>
              <td className="border px-4 py-2">{faculty.designation}</td>
              <td className="border px-4 py-2">{faculty.department}</td>
              <td className="border px-4 py-2">{faculty.email}</td>
              <td className="border px-4 py-2">{faculty.joiningDate}</td>
              <td className="border px-4 py-2">{faculty.employmentType}</td>
              <td className="border px-4 py-2 flex">
                <button
                  onClick={() => handleEditFaculty(faculty)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteFaculty(faculty.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {faculties.length === 0 && (
            <tr>
              <td colSpan={9} className="border px-4 py-2 text-center">No faculties added yet.</td>
            </tr>
          )}
        </tbody>
      </table>
      <FacultyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        mode={modalMode}
        facultyToEdit={selectedFaculty}
      />
    </div>
  );
};

export default Page;