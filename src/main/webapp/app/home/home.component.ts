import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoginModalService, Principal, Account } from 'app/core';
import { CourseService } from 'app/shared/service/CourseService';
import { CourseDto } from 'app/shared/model/course-dto.model';
import { CourseWithTNDto } from 'app/shared/model/courseWithTN-dto.model';
import { HttpErrorResponse } from '@angular/common/http';
import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from 'app/shared';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.css']
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    classeNameNeedToReg: string;
    newCourseName: string;
    newCourseLocation: string;
    newCourseContent: string;
    teacherId: number;
    success: boolean;
    currentUserCredential: string;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private courseService: CourseService
    ) {}

    courses: CourseDto[] = [];

    registeredCourses: CourseDto[] = [];

    ngOnInit() {
        this.principal.identity().then(account => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
        this.success = false;
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.principal.identity().then(account => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    createCourse() {
        let newCourse: CourseDto = {
            id: 1,
            courseName: this.newCourseName,
            courseLocation: this.newCourseLocation,
            courseContent: this.newCourseContent,
            teacherId: this.teacherId
        };
        this.courseService.createCourse(newCourse).subscribe(
            () => {
                this.success = true;
            },
            response => this.processError(response)
        );
    }
    deleteCourseByName(courseName: string) {
        this.courseService.deleteCourseByName(courseName).subscribe(
            () => {
                this.success = true;
            },
            response => this.processError(response)
        );
    }
    /*
    addCourseToStudent(courseId: number) {

        this.courseService.addCourseToStudent(courseId).subscribe(
            () => {
                this.success = true;
            },
            response => this.processError(response)
        );
    }*/

    registerCourse(courseName: string) {
        debugger;
        this.courseService.registerCourse(courseName).subscribe(
            () => {
                this.success = true;
            },
            response => this.processError(response)
        );
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    getAllCourses() {
        debugger;
        this.courseService.getCourseInfo().subscribe(curDto => {
            if (!curDto) {
                this.courses = [];
            } else {
                this.courses = curDto;
            }
        });
    }

    getAllRegisteredCourses() {
        debugger;
        this.courseService.getRegisteredCourseInfo().subscribe(curDto => {
            if (!curDto) {
                this.registeredCourses = [];
            } else {
                this.registeredCourses = curDto;
            }
        });
    }

    getAllCoursesWithTN() {
        this.courseService.getCourseInfoWithTN().subscribe(curDto => {
            if (!curDto) {
                this.coursesWithTN = [];
            } else {
                this.coursesWithTN = curDto;
            }
        });
    }

    clearAllCourses() {
        this.courses = [];
    }

    clearAllRegisteredCourses() {
        this.registeredCourses = [];
    }

    private processError(response: HttpErrorResponse) {
        //this.success = null;
        /* if (response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE) {
            this.errorUserExists = 'ERROR';
        } else if (response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE) {
            this.errorEmailExists = 'ERROR';
        } else {
            this.error = 'ERROR';
        }*/
    }
}
