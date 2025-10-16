import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Course } from "../models/course.model";


@Injectable({
  providedIn: "root"
})
export class CoursesServiceWithFetch {
  private env = environment;

  async loadAllCourses(): Promise<Course[]> {
    const response = await fetch(`${this.env.baseUrl}/courses`);
    const data = await response.json();
    return data.courses;
  }
}
