import { Component } from '@angular/core';
import { StudentService } from './common/student.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'we-are-students';
  showPageLoading: boolean = false;

  constructor(private __studentService: StudentService) {

    this.__studentService.loadSubject$.subscribe(res =>
    {
      if (res === true) {this.showPageLoading = true;} else {this.showPageLoading = false;}
    });

  }
}
