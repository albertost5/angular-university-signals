import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { firstValueFrom, map } from "rxjs";
import { Course } from "../models/course.model";
import { GetCoursesResponse } from "../models/get-courses.response";
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: "root"
})
export class CoursesService {
  private http = inject(HttpClient);
  private env = environment

  loadAllCourses(): Promise<Course[]> {
    return firstValueFrom(this.http.get<GetCoursesResponse>(`${this.env.baseUrl}/courses`).pipe(
      map(res => res.courses)
    ));
  }

  updateCourse(course: Partial<Course>, courseId: string) {
    return firstValueFrom(this.http.put<Course>(`${this.env.baseUrl}/courses/${courseId}`, course));
  }

  deleteCourse(courseId: string) {
    return firstValueFrom(this.http.delete(`${this.env.baseUrl}/courses/${courseId}`));
  }
}
