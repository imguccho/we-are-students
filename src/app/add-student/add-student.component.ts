import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { StudentService } from '../common/student.service';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  studentForm: FormGroup;
  student: any;
  Name: any;

  constructor(private __studentService: StudentService, private fb: FormBuilder) { }

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
      console.log(data);

      if(data.success == 'KC001'){ //KC001 - login successfull status code
        console.log(data);
        this.__studentService.invokefetchStudentsList();
      }

      if(data.error){

      }
      this.__studentService.showLoading(false);

    },
      (error: any) => {
        this.__studentService.showLoading(false);
      }
    );
  }

}
