import { EventEmitter, Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  public loadSubject = new Subject<any>();
  public loadSubject$ = this.loadSubject.asObservable();

  getStudentsListAPI: string = "http://localhost/SM/public/read.php";
  addStudentAPI: string = "http://localhost/SM/public/create.php";
  updateStudentAPI: string = "http://localhost/SM/public/update.php";
  deleteStudentAPI: string = "http://localhost/SM/public/delete.php";

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
