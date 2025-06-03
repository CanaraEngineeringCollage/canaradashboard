import { Body, Controller, Post, Get, Patch, Delete, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FacultyService } from './faculty.service';
import { Faculty } from './entities/faculty.entity';

@Controller('faculty')
export class FacultyController {
  constructor(private readonly facultyService: FacultyService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createFaculty(
    @Body() facultyData: any,
    @UploadedFile() file: Express.Multer.File
  ): Promise<Faculty> {
    console.log("Received faculty data:", facultyData);
    console.log("Received file:", file);

    // Parse JSON strings back to objects
    const parsedData = {
      ...facultyData,
      qualifications: JSON.parse(facultyData.qualifications || '[]'),
      patents: JSON.parse(facultyData.patents || '[]'), 
      bookChapters: JSON.parse(facultyData.bookChapters || '[]'),
      certifications: JSON.parse(facultyData.certifications || '[]'),
      internationalJournalPublications: JSON.parse(facultyData.internationalJournalPublications || '[]'),
      internationalConferencePublications: JSON.parse(facultyData.internationalConferencePublications || '[]'),
      image: file ? file.buffer : null
    };

    console.log("Parsed faculty data:", parsedData);
    return this.facultyService.createFaculty(parsedData);
  }

  @Get()
  async getAllFaculty(): Promise<Faculty[]> {
    return this.facultyService.getAllFaculty();
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async updateFaculty(
    @Param('id') id: string,
    @Body() facultyData: any,
    @UploadedFile() file: Express.Multer.File
  ): Promise<Faculty> {
    console.log("Updating faculty with ID:", id);
    console.log("Received faculty data:", facultyData);
    console.log("Received file:", file);

    // Parse JSON strings back to objects
    const parsedData = {
      ...facultyData,
      qualifications: JSON.parse(facultyData.qualifications || '[]'),
      patents: JSON.parse(facultyData.patents || '[]'),
      bookChapters: JSON.parse(facultyData.bookChapters || '[]'),
      certifications: JSON.parse(facultyData.certifications || '[]'),
      internationalJournalPublications: JSON.parse(facultyData.internationalJournalPublications || '[]'),
      internationalConferencePublications: JSON.parse(facultyData.internationalConferencePublications || '[]'),
    };

    // Only include image if a new file was uploaded
    if (file) {
      parsedData.image = file.buffer;
    }

    console.log("Parsed faculty data:", parsedData);
    return this.facultyService.updateFaculty(id, parsedData);
  }

  @Delete(':id')
  async deleteFaculty(@Param('id') id: string): Promise<{ success: boolean; message: string }> {
    console.log("Deleting faculty with ID:", id);
    await this.facultyService.deleteFaculty(id);
    return { success: true, message: 'Faculty deleted successfully' };
  }
}
