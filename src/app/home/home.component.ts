import { Component, inject, OnInit, signal } from '@angular/core';
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { CoursesCardListComponent } from "../courses-card-list/courses-card-list.component";
import { Course } from '../models/course.model';
import { CoursesServiceWithFetch } from '../services/courses-fetch.service';
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
  private readonly coursesServiceWithFetch = inject(CoursesServiceWithFetch);
  private readonly coursesServiceHttp = inject(CoursesService);

  courses = signal<Course[]>([]);

  constructor() {
    this.loadAllCourses().then(
      () => console.log('All courses loaded: ', this.courses())
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
      this.courses.set(courses);
    } catch (error) {
      console.warn('Error loading courses: ', error);
    }
  }
}
