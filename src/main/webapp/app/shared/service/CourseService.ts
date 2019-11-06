import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseDto } from 'app/shared/model/course-dto.model';
import { SERVER_API_URL } from 'app/app.constants';
import { CourseWithTNDto } from 'app/shared/model/courseWithTN-dto.model';

@Injectable()
export class CourseService {
    private courseCreateUrl = SERVER_API_URL + '/api/course/createCourse';
    private courseAddressUrl = SERVER_API_URL + '/api/course/findAllCoursesDto';
    private registeredCourseAddressUrl = SERVER_API_URL + '/api/course/findAllRegisteredCoursesDto';
    private courseAddressWithTNUrl = SERVER_API_URL + '/api/course/findAllCoursesWithTNDto';
    private courseDeleteUrl = SERVER_API_URL + '/api/course/deleteCourse';
    private courseUpdateUrl = SERVER_API_URL + '/api/course/updateCourse';
    private addCourseToStudentUrl = SERVER_API_URL + '/api/course/addCourseToStudent';
    private courseRegisterUrl = SERVER_API_URL + '/api/course/registerCourse';

    constructor(private http: HttpClient) {}

    getCourseInfo(): Observable<CourseDto[]> {
        return this.http.get<CourseDto[]>(`${this.courseAddressUrl}`);
    }
    getRegisteredCourseInfo(): Observable<CourseDto[]> {
        return this.http.get<CourseDto[]>(`${this.registeredCourseAddressUrl}`);
    }

    getCourseInfoWithTN(): Observable<CourseWithTNDto[]> {
        return this.http.get<CourseWithTNDto[]>(`${this.courseAddressWithTNUrl}`);
    }

    deleteCourseByName(courseName: string): Observable<Response> {
        return this.http.delete<Response>(`${this.courseDeleteUrl}/${courseName}`);
    }

    registerCourse(courseName: string): Observable<Response> {
        return this.http.post<Response>(this.courseRegisterUrl, courseName);
    }

    update(course: CourseDto): Observable<Response> {
        return this.http.put<Response>(this.courseUpdateUrl, course);
    }
    createCourse(course: CourseDto): Observable<Response> {
        return this.http.post<Response>(this.courseCreateUrl, course);
    }
}
