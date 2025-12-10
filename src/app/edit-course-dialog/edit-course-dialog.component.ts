import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { CourseCategoryComboboxComponent } from "../course-category-combobox/course-category-combobox.component";
import { LoadingIndicatorComponent } from "../loading/loading.component";
import { Course } from '../models/course.model';
import { CoursesService } from '../services/courses.service';
import { EditCourseDialogData } from './edit-course-dialog.data.model';
import { CourseCategory } from '../models/course-category.model';

@Component({
  selector: 'edit-course-dialog',
  standalone: true,
  imports: [
    LoadingIndicatorComponent,
    ReactiveFormsModule,
    CourseCategoryComboboxComponent,
    MatDialogModule, MatButtonModule
  ],
  templateUrl: './edit-course-dialog.component.html',
  styleUrl: './edit-course-dialog.component.scss'
})
export class EditCourseDialogComponent {
  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef)
  fb = inject(FormBuilder);
  coursesService = inject(CoursesService);
  category = signal<CourseCategory>('BEGINNER');

  form = this.fb.group({
    title: [''],
    description: [''],
    courseImg: [''],
  });

  constructor() {
    this.form.patchValue({
      title: this.data.course?.title,
      description: this.data?.course?.longDescription,
      courseImg: this.data.course?.iconUrl,
    });
    this.category.set(this.data.course?.category);
  }

  async onSave() {
    const courseData = this.form.value as Partial<Course>;
    courseData.category = this.category();
    if (this.data.mode === 'update') {
      await this.updateCourse(courseData, this.data.course.id);
    } else if (this.data.mode === 'create') {
      await this.createCourse(courseData);
    }
  }

  async updateCourse(course: Partial<Course>, courseId: string) {
    try {
      const updatedCourse = await this.coursesService.updateCourse(course, courseId);
      this.dialogRef.close(updatedCourse);
    } catch (error) {
      console.warn(error);
      alert('There was a problem updating the course.')
    }
  }

  async createCourse(course: Partial<Course>) {
    try {
      const newCourse = await this.coursesService.createCourse(course);
      this.dialogRef.close(newCourse);
    } catch (error) {
      console.warn(error);
      alert('There was an error creating the course.');
    }
  }

  onClose() {
    this.dialogRef.close();
  }
}

export async function openEditCourseDialog(dialog: MatDialog, data: EditCourseDialogData) {
  const config = new MatDialogConfig();
  config.autoFocus = true;
  config.disableClose = true;
  config.width = "400px";
  config.data = data;

  const closed$ = dialog.open(EditCourseDialogComponent, config).afterClosed();

  return firstValueFrom(closed$);
}
