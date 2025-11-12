import { Component, computed, effect, inject, signal } from '@angular/core';
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { CoursesCardListComponent } from "../courses-card-list/courses-card-list.component";
import { Course, sortCoursesBySeqNo } from '../models/course.model';
import { CoursesService } from '../services/courses.service';
import { MatDialog } from '@angular/material/dialog';
import { openEditCourseDialog } from '../edit-course-dialog/edit-course-dialog.component';

@Component({
    selector: 'home',
    imports: [
        MatTabGroup,
        MatTab,
        CoursesCardListComponent
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
  // private readonly coursesServiceWithFetch = inject(CoursesServiceWithFetch);
  private readonly coursesServiceHttp = inject(CoursesService);
  dialog = inject(MatDialog);

  #courses = signal<Course[]>([]);

  beginnerCourses = computed(
    () => this.#courses().filter(courses => courses.category === "BEGINNER")
  );
  advancedCourses = computed(
    () => this.#courses().filter(courses => courses.category === "ADVANCED")
  );

  constructor() {
    this.loadAllCourses().then(
      () => console.log('All courses loaded: ', this.#courses())
    );
  }

  async loadAllCourses() {
    // try {
    //   const courses = await this.coursesServiceWithFetch.loadAllCourses();
    //   this.courses.set(courses);
    // } catch (error) {
    //   console.warn('Error loading courses: ', error);
    // }

    try {
      const courses = await this.coursesServiceHttp.loadAllCourses();
      const orderedCourses = courses.sort((a,b) =>  sortCoursesBySeqNo(a,b));
      this.#courses.set(orderedCourses);
    } catch (error) {
      console.warn('Error loading courses: ', error);
    }
  }

  onCourseUpdate(course: Course) {
    // const courses = this.#courses();
    // const newCourses = courses.map( c => c.id === course.id ? course : c);
    // this.#courses.set(newCourses);
    
    this.#courses.update(
      courses => courses.map(c => c.id === course.id ? course : c)
    )
  }

  async onDeletedCourse(courseId: string) {
    try {
      await this.coursesServiceHttp.deleteCourse(courseId);
      this.#courses.update(courses => courses.filter(c => c.id !== courseId))
    } catch (error) {
      console.warn(error);
      alert('There was a problem deleting the course.');
    }
  }

  async onAddCourse() {
    const newCourse = await openEditCourseDialog(this.dialog, {
      mode: 'create',
      title: 'Add new course',
    })
    this.onCourseUpdate(newCourse);
  }
}
