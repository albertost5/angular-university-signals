import { Component, inject, input, output } from '@angular/core';
import {
  MatDialog,
  MatDialogRef
} from '@angular/material/dialog';
import { RouterLink } from "@angular/router";
import { openEditCourseDialog } from '../edit-course-dialog/edit-course-dialog.component';
import { Course } from '../models/course.model';


@Component({
    selector: 'courses-card-list',
    imports: [
        RouterLink
    ],
    templateUrl: './courses-card-list.component.html',
    styleUrl: './courses-card-list.component.scss'
})
export class CoursesCardListComponent {
  dialog = inject(MatDialog);

  courses = input<Course[]>();
  newCourse = output<Course>();

  async onEdit(course: Course) {
    const newCourse = await openEditCourseDialog(this.dialog , {
      mode: 'update',
      title: 'Update existing course',
      course
    });
    this.newCourse.emit(newCourse);
  }
}
