import { Component, computed, effect, inject, signal } from '@angular/core';
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { CoursesCardListComponent } from "../courses-card-list/courses-card-list.component";
import { Course, sortCoursesBySeqNo } from '../models/course.model';
import { CoursesService } from '../services/courses.service';

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

  _courses = signal<Course[]>([]);

  beginnerCourses = computed(
    () => this._courses().filter(courses => courses.category === "BEGINNER")
  );
  advancedCourses = computed(
    () => this._courses().filter(courses => courses.category === "ADVANCED")
  );

  constructor() {
    this.loadAllCourses().then(
      () => console.log('All courses loaded: ', this._courses())
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
      this._courses.set(orderedCourses);
    } catch (error) {
      console.warn('Error loading courses: ', error);
    }
  }
}
