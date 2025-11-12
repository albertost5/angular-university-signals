import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { delay, finalize, firstValueFrom, map, tap, throwError } from "rxjs";
import { environment } from "../../environments/environment";
import { LoadingService } from "../loading/loading.service";
import { Course } from "../models/course.model";
import { GetCoursesResponse } from "../models/get-courses.response";


@Injectable({
  providedIn: "root"
})
export class CoursesService {
  private loadingService = inject(LoadingService);
  private http = inject(HttpClient);
  private env = environment

  loadAllCourses(): Promise<Course[]> {
    return firstValueFrom(this.http.get<GetCoursesResponse>(`${this.env.baseUrl}/courses`).pipe(
      // tap(() => this.loadingService.loadingToggleOn()),
      delay(2500),
      map(res => res.courses),
      // finalize(() => this.loadingService.loadingToggleOff())
    ));
  }

  updateCourse(course: Partial<Course>, courseId: string) {
    return firstValueFrom(this.http.put<Course>(`${this.env.baseUrl}/courses/${courseId}`, course));
  }

  deleteCourse(courseId: string) {
    return firstValueFrom(this.http.delete(`${this.env.baseUrl}/courses/${courseId}`));
  }

  createCourse(course: Partial<Course>) {
    return firstValueFrom(this.http.post<Course>(`${this.env.baseUrl}/courses`, course))
  }
}
