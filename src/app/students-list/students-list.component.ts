import { Component, OnInit } from '@angular/core';
import { StudentService } from '../common/student.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})


export class StudentsListComponent implements OnInit {

  public data = [
    {rollnumber: 1, name: 'Virat Kohli', class: '2', address:'therichpost.com'},
    {rollnumber: 2, name: 'Ms Dhoni', class: '12', address:'therichpost.com'},
    {rollnumber: 3, name: 'Suresh Raina', class: '4', address:'therichpost.com'},
    {rollnumber: 4, name: 'Ajinkya Rahane', class: '3', address:'therichpost.com'},
    {rollnumber: 5, name: 'Rohit Sharma', class: '1', address:'therichpost.com'},
    {rollnumber: 6, name: 'Shikhar Dhawan', class: '2', address:'therichpost.com'},
    {rollnumber: 7, name: 'Ravindra Jadeja', class: '6', address:'therichpost.com'},
    {rollnumber: 8, name: 'Manish Pandey', class: '11', address:'therichpost.com'},
    {rollnumber: 9, name: 'Shreyash Iyer', class: '5', address:'therichpost.com'},
    {rollnumber: 10, name: 'Jasprit Bumrah', class: '7', address:'therichpost.com'},
    {rollnumber: 11, name: 'Mohammad Shami', class: '10', address:'therichpost.com'},
    {rollnumber: 12, name: 'Ravichandran Ashwin', class: '9', address:'therichpost.com'},
    {rollnumber: 13, name: 'Subhman Gill', class: '6', address:'therichpost.com'},
    {rollnumber: 14, name: 'Cheteswar Pujara', class: '8', address:'therichpost.com'},
    {rollnumber: 15, name: 'KL Rahul', class: '3', address:'therichpost.com'},
    {rollnumber: 16, name: 'Mayank Agarwal', class: '9', address:'therichpost.com'}
  ]

  students: any;
  title = 'angulardatatables';
  dtOptions: DataTables.Settings = {};

  selected_student: any;

  studentForm: FormGroup;

  constructor(private __studentService: StudentService, private fb: FormBuilder) {
    this.__studentService.selected_student.subscribe(selected_student => {
      this.selected_student = selected_student;
    })
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

    this.getStudentsList();

  }

  getStudentsList(){

    this.__studentService.showLoading(true);

    this.__studentService.getStudentsList()
    .subscribe(data=> {

      if(data.code == "006"){ //KC001 - login successfull status code
        console.log(data);
        this.students = data.payload;
        console.log(this.students);

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

  deleteStudent(rollnumber){

    this.__studentService.showLoading(true);

    let dataset = <any>{};
    dataset.RollNumber = parseInt(rollnumber);

    this.__studentService.deleteStudent(dataset)
    .subscribe(data=> {
      console.log(data);

      if(data.code == '008'){ //KC001 - login successfull status code

        //this.getStudentsList();
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

  updateStudent(Name, Class, Address, RollNumber){

    let dataset = <any>{};
    dataset.Name = Name;
    dataset.Class = Class;
    dataset.Address = Address;
    dataset.RollNumber =parseInt(RollNumber);

    this.__studentService.showLoading(true);

    this.__studentService.updateStudent(dataset)
    .subscribe(data=> {
      console.log(data);

      if(data.success == 'KC001'){ //KC001 - login successfull status code
        console.log(data);
        this.getStudentsList();
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
