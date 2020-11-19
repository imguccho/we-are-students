import { Component, OnInit } from '@angular/core';
import { StudentService } from '../common/student.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})


export class StudentsListComponent implements OnInit {

  students: any;
  title = 'angulardatatables';
  dtOptions: DataTables.Settings = {};
  messageText: string;
  studentForm: FormGroup;
  success: boolean;
  error: boolean;

  constructor(private __studentService: StudentService, private fb: FormBuilder) {
    this.getStudentsList();
    this.messageText = __studentService.messageText;
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      responsive:true,
      columnDefs: [
        { orderable: false, targets: -1 }
      ]
    };


    this.studentForm = this.fb.group({
      Name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      Class: ['', [Validators.required, Validators.min(0), Validators.max(12)]],
      Address: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    });

    if (this.__studentService.subsVarForSL==undefined) {
      this.__studentService.subsVarForSL = this.__studentService.
      fetchStudentsList.subscribe((name:string) => {
        this.getStudentsList();
      });
    }

  }

  getStudentsList(){

    this.__studentService.showLoading(true);

    this.__studentService.getStudentsList()
    .subscribe(data=> {

      if(data.code == "006"){ //Result Send
        this.students = data.payload;
      }

      this.__studentService.showLoading(false);

    },
      (error: any) => {
        this.__studentService.showLoading(false);
      }
    );
  }

  deleteStudent(rollnumber){

    this.__studentService.showLoading(true);

    let dataset = <any>{};
    dataset.RollNumber = parseInt(rollnumber);

    this.__studentService.deleteStudent(dataset)
    .subscribe(data=> {

      if(data.code == '008'){ //Delete Success
        this.success = true;
        this.getStudentsList();
      }
      else{
        this.error = true;
      }
      this.__studentService.messageText = data.message;
      this.__studentService.showLoading(false);

    },
      (error: any) => {
        this.error = true;
        this.__studentService.showLoading(false);
      }
    );
  }

  updateStudent(Name, Class, Address, RollNumber){

    let dataset = <any>{};
    dataset.Name = Name;
    dataset.Class = Class;
    dataset.Address = Address;
    dataset.RollNumber =parseInt(RollNumber);

    this.__studentService.showLoading(true);

    this.__studentService.updateStudent(dataset)
    .subscribe(data=> {

      if(data.code == '016'){ //Update Success
        this.success = true;
        this.getStudentsList();
      }
      else{
        this.error = true;
      }
      this.__studentService.messageText = data.message;
      this.__studentService.showLoading(false);

    },
      (error: any) => {
        this.error = true;
        this.__studentService.showLoading(false);
      }
    );
  }

}
