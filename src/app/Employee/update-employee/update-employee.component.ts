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
    updateForm: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = updateForm && updateForm.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
})
export class UpdateEmployeeComponent implements OnInit {
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
    this.serverData.updateForm = this.formBuilder.group({
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
      photoURL: new FormControl(''),
    });
    this.addCheckboxes();
    this.editEmpData();
    this.serverData.updateForm.controls['eid'].disable();

    this.serverData.previoueImgShow = true;
    this.serverData.uploadImgShow = false;
  }

  public addCheckboxes() {
    this.dataService.languagesData.forEach(() =>
      this.languagesArray.push(new FormControl(false))
    );
  }

  get languagesArray() {
    return this.serverData.updateForm.controls['language'] as FormArray;
  }

  get eid() {
    return this.serverData.updateForm.get('eid');
  }
  get employeeName() {
    return this.serverData.updateForm.get('employeeName');
  }
  get dec() {
    return this.serverData.updateForm.get('dec');
  }
  get salary() {
    return this.serverData.updateForm.get('salary');
  }
  get joinDate() {
    return this.serverData.updateForm.get('joinDate');
  }
  get gender() {
    return this.serverData.updateForm.get('gender');
  }
  get email() {
    return this.serverData.updateForm.get('email');
  }
  get mobile() {
    return this.serverData.updateForm.get('mobile');
  }
  get qualify() {
    return this.serverData.updateForm.get('qualify');
  }
  get photoURL() {
    return this.serverData.updateForm.get('photoURL');
  }
  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {}

  uploadingImg() {
    this.empService.uploadImg();
  }

  //=====================  Photo Preview ==================
  preview(files: any) {
    this.empService.preview(files);
  }

  editEmpData() {
    this.serverData.updateForm.patchValue({
      eid: this.serverData.editEmpDetails.eid,
      employeeName: this.serverData.editEmpDetails.employeeName,
      dec: this.serverData.editEmpDetails.dec,
      salary: this.serverData.editEmpDetails.salary,
      joinDate: this.serverData.editEmpDetails.joinDate,
      gender: this.serverData.editEmpDetails.gender,
      email: this.serverData.editEmpDetails.email,
      mobile: this.serverData.editEmpDetails.mobile,
      qualify: this.serverData.editEmpDetails.qualify,
      language: this.serverData.editEmpDetails.language,
    });
  }

  changePhoto() {
    this.serverData.previoueImgShow = false;
    this.serverData.uploadImgShow = true;
  }
  onCancel() {
    this.serverData.previoueImgShow = true;
    this.serverData.uploadImgShow = false;
  }

  validationUpdate() {
    if (
      this.serverData.previoueImgShow == false &&
      this.serverData.uploadImgShow == true
    ) {
      this.photoURL?.setValidators([Validators.required]);
    } else {
      this.photoURL?.setValidators(null);
    }
    this.photoURL?.updateValueAndValidity();
  }

  onUpDate(employeeForm: any) {
    this.validationUpdate();
    this.serverData.submittedUpdate = true;
    if (this.serverData.updateForm.invalid) {
      return;
    } else if (
      this.serverData.previoueImgShow == true &&
      this.serverData.uploadImgShow == false
    ) {
      this.serverData.updateEmpWithPreviousImg(employeeForm);
    } else if (!this.empService.imageDownloadUrl) {
      this.empService.successAndErrorMessage =
        'Please Upload Image First then Update!!';
      this.empService.openDialogSuccess();
    } else {
      this.empService.deleteImage(this.serverData.editEmpDetails);
      this.serverData.updateEmpWithLatestImg(employeeForm);
    }
  }
}
