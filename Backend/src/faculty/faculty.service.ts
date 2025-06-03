import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Faculty } from './entities/faculty.entity';

@Injectable()
export class FacultyService {
  constructor(
    @InjectRepository(Faculty)
    private facultyRepo: Repository<Faculty>,
  ) {}

  async getAllFaculty(): Promise<Faculty[]> {
    return this.facultyRepo.find({
      relations: [
        'qualifications',
        'patents',
        'bookChapters',
        'certifications',
        'internationalJournalPublications',
        'internationalConferencePublications'
      ]
    });
  }

  async createFaculty(facultyData: Partial<Faculty>): Promise<Faculty> {
    console.log("Creating faculty with data:", facultyData);
    
    // Create the faculty entity with all relations
    const faculty = this.facultyRepo.create({
      name: facultyData.name,
      designation: facultyData.designation,
      department: facultyData.department,
      joiningDate: facultyData.joiningDate,
      experience: facultyData.experience,
      employmentType: facultyData.employmentType,
      image: facultyData.image,
      qualifications: facultyData.qualifications,
      patents: facultyData.patents,
      bookChapters: facultyData.bookChapters,
      certifications: facultyData.certifications,
      internationalJournalPublications: facultyData.internationalJournalPublications,
      internationalConferencePublications: facultyData.internationalConferencePublications,
    });

    console.log("Created faculty entity:", faculty);
    
    // Save the faculty with all relations
    const savedFaculty = await this.facultyRepo.save(faculty);
    console.log("Saved faculty:", savedFaculty);
    
    return savedFaculty;
  }

  async updateFaculty(id: string, facultyData: Partial<Faculty>): Promise<Faculty> {
    console.log("Updating faculty with data:", facultyData);
    
    // Find the existing faculty
    const existingFaculty = await this.facultyRepo.findOne({
      where: { id },
      relations: [
        'qualifications',
        'patents',
        'bookChapters',
        'certifications',
        'internationalJournalPublications',
        'internationalConferencePublications'
      ]
    });

    if (!existingFaculty) {
      throw new Error(`Faculty with ID ${id} not found`);
    }

    // Update the faculty entity with new data
    const updatedFaculty = this.facultyRepo.merge(existingFaculty, {
      name: facultyData.name,
      designation: facultyData.designation,
      department: facultyData.department,
      joiningDate: facultyData.joiningDate,
      experience: facultyData.experience,
      employmentType: facultyData.employmentType,
      image: facultyData.image,
      qualifications: facultyData.qualifications,
      patents: facultyData.patents,
      bookChapters: facultyData.bookChapters,
      certifications: facultyData.certifications,
      internationalJournalPublications: facultyData.internationalJournalPublications,
      internationalConferencePublications: facultyData.internationalConferencePublications,
    });

    console.log("Updated faculty entity:", updatedFaculty);
    
    // Save the updated faculty with all relations
    const savedFaculty = await this.facultyRepo.save(updatedFaculty);
    console.log("Saved updated faculty:", savedFaculty);
    
    return savedFaculty;
  }

  async deleteFaculty(id: string): Promise<void> {
    console.log("Deleting faculty with ID:", id);
    
    // Find the existing faculty
    const existingFaculty = await this.facultyRepo.findOne({
      where: { id },
      relations: [
        'qualifications',
        'patents',
        'bookChapters',
        'certifications',
        'internationalJournalPublications',
        'internationalConferencePublications'
      ]
    });

    if (!existingFaculty) {
      throw new Error(`Faculty with ID ${id} not found`);
    }

    // Delete the faculty (cascade will handle related entities)
    await this.facultyRepo.remove(existingFaculty);
    console.log("Faculty deleted successfully");
  }
}
