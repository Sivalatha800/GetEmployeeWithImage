import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';

import {
  child,
  Database,
  get,
  onValue,
  ref,
  set,
} from '@angular/fire/database';

import { ErrorStateMatcher } from '@angular/material/core';
import { EmployeeService } from 'src/app/Service/employee.service';
import { DatePipe } from '@angular/common';
import { DataService } from 'src/app/Service/data.service';
import { ServerdataService } from 'src/app/Service/serverdata.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    employeeForm: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = employeeForm && employeeForm.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
})
export class CreateEmployeeComponent implements OnInit {
  empExists: any;
  CurrencyValue!: number;

  constructor(
    public formBuilder: FormBuilder,
    public empService: EmployeeService,
    public datepipe: DatePipe,
    public db: Database,
    public dataService: DataService,
    public serverData: ServerdataService
  ) {
    this.serverData.employeeForm = this.formBuilder.group({
      eid: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]+$/),
      ]),
      employeeName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z ]*$/),
      ]),
      dec: new FormControl('', [Validators.required]),
      salary: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[1-9]\d*(\.\d+)?$/),
      ]),
      joinDate: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern(/[A-Za-z0-9]\w{2,}@[A-Za-z0-9]{3,}\.[A-Za-z]{3}/),
      ]),
      mobile: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[6789][0-9]{9}$/),
      ]),
      qualify: new FormControl('', [Validators.required]),
      language: new FormArray([], Validators.required),
      photoURL: new FormControl('', [Validators.required]),
    });
    this.addCheckboxes();
  }

  public addCheckboxes() {
    this.dataService.languagesData.forEach(() =>
      this.languagesArray.push(new FormControl(false))
    );
  }

  get languagesArray() {
    return this.serverData.employeeForm.controls['language'] as FormArray;
  }

  get eid() {
    return this.serverData.employeeForm.get('eid');
  }
  get employeeName() {
    return this.serverData.employeeForm.get('employeeName');
  }
  get dec() {
    return this.serverData.employeeForm.get('dec');
  }
  get salary() {
    return this.serverData.employeeForm.get('salary');
  }
  get joinDate() {
    return this.serverData.employeeForm.get('joinDate');
  }
  get gender() {
    return this.serverData.employeeForm.get('gender');
  }
  get email() {
    return this.serverData.employeeForm.get('email');
  }
  get mobile() {
    return this.serverData.employeeForm.get('mobile');
  }
  get qualify() {
    return this.serverData.employeeForm.get('qualify');
  }
  get photoURL() {
    return this.serverData.employeeForm.get('photoURL');
  }
  matcher = new MyErrorStateMatcher();

  //=========================================  form submit  ===============================
  onSubmit(employeeForm: any) {
    this.serverData.submitEmpData(employeeForm);
  }

  ngOnInit(): void {}

  uploadingImg() {
    this.empService.uploadImg();
  }

  //=====================  Photo Preview ==================
  preview(files: any) {
    this.empService.preview(files);
  }
}
