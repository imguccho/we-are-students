import { EventEmitter, Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  public messageText: string = 'We are facing a server error. This might be due to poor internet. Please check your connection and try again.';

  public loadSubject = new Subject<any>();
  public loadSubject$ = this.loadSubject.asObservable();

  baseUrl: string = 'http://localhost/we-are-students-backend/';

  getStudentsListAPI: string = this.baseUrl + "read.php";
  addStudentAPI: string = this.baseUrl + "create.php";
  updateStudentAPI: string = this.baseUrl + "update.php";
  deleteStudentAPI: string = this.baseUrl + "delete.php";

  public selected_student = new Subject<any>();
  public selected_student$ = this.selected_student.asObservable();

  fetchStudentsList = new EventEmitter();
  subsVarForSL: Subscription;

  constructor(private http: HttpClient) {
  }

  invokefetchStudentsList() {
    this.fetchStudentsList.emit();
  }

  showLoading(param: boolean) {
    if (param === true) {
      this.loadSubject.next(true);
    } else {
      this.loadSubject.next(false);
    }
  }

  getStudentsList() {
    return this.http.post<any>(this.getStudentsListAPI,
        {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
  }

  addStudent(dataset: any) {
    return this.http.post<any>(this.addStudentAPI,
        dataset, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
  }

  updateStudent(dataset: any) {
    return this.http.post<any>(this.updateStudentAPI,
        dataset, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
  }

  deleteStudent(dataset: any) {
    return this.http.post<any>(this.deleteStudentAPI,
        dataset, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
  }
}
