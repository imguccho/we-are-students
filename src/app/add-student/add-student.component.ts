import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { StudentService } from '../common/student.service';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  studentForm: FormGroup;
  messageText: string;
  success: boolean;
  error: boolean;

  constructor(private __studentService: StudentService, private fb: FormBuilder) { 
    this.messageText = __studentService.messageText;
  }

  ngOnInit() {

    this.studentForm = this.fb.group({
      Name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      Class: ['', [Validators.required, Validators.min(0), Validators.max(12)]],
      Address: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    });

  }


  addStudent(){

    if(this.studentForm.valid == false) {
      return false;
    }

    this.__studentService.showLoading(true);

    this.__studentService.addStudent(this.studentForm.value)
    .subscribe(data=> {

      if(data.code == '001'){ //Insert Success
        this.success = true;
        this.__studentService.invokefetchStudentsList();
      }
      else{
        this.error = true;
      }

      this.__studentService.messageText = data.message;
      this.__studentService.showLoading(false);

    },
      (error: any) => {
        this.error = false;
        this.__studentService.showLoading(false);
      }
    );
  }

}
