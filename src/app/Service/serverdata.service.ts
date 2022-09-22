import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { child, Database, get, ref, set, update } from '@angular/fire/database';
import { FormGroup } from '@angular/forms';
import { DataService } from './data.service';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Injectable({
  providedIn: 'root',
})
export class ServerdataService {
  constructor(
    public db: Database,
    public empService: EmployeeService,
    public dataService: DataService,
    public datepipe: DatePipe
  ) {}

  //============================================  Get Employee Data  ==================================
  EmployeeList!: Employee[];
  getData() {
    this.EmployeeList = [];
    const dbRef = ref(this.db);
    get(child(dbRef, `Employee/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const resultArray = Object.keys(data).map((index) => {
            let person = data[index];
            const empdata: Employee = {
              eid: person.eid,
              employeeName: person.employeeName,
              dec: person.dec,
              salary: person.salary,
              joinDate: person.joinDate,
              gender: person.gender,
              email: person.email,
              mobile: person.mobile,
              qualify: person.qualify,
              language: person.language,
              photoURL: person.photoURL,
            };
            this.EmployeeList.push(empdata);
          });
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //========================================  Create  Data  =================================
  // submitted: boolean = false;
  employeeForm!: FormGroup;
  selectedLanguages: string[] = [];
  submittedCeated: boolean = false;

  submitEmpData(employeeForm: any) {
    this.submittedCeated = true;
    if (this.employeeForm.invalid) {
      return;
    } else if (!this.empService.imageDownloadUrl) {
      console.log('Please Upload image First');
      this.empService.successAndErrorMessage =
        'Please Upload Image First Then Submit';
      this.empService.openDialogSuccess();
    } else {
      const dbref = ref(this.db);
      get(child(dbref, 'Employee/' + employeeForm.eid)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log('Employee Id Already Exsits');
          this.empService.successAndErrorMessage =
            'Employee Id ' + employeeForm.eid + ' Already Exsits';
          this.empService.openDialogSuccess();
        } else {
          this.longArray(employeeForm);
          this.empService.employeeFormDetails(employeeForm);
          set(ref(this.db, 'Employee/' + employeeForm.eid), {
            eid: employeeForm.eid,
            employeeName: employeeForm.employeeName,
            dec: employeeForm.dec,
            salary: employeeForm.salary,
            joinDate: this.datepipe.transform(
              employeeForm.joinDate,
              'yyyy-MM-dd'
            ),
            gender: employeeForm.gender,
            email: employeeForm.email,
            mobile: employeeForm.mobile,
            qualify: employeeForm.qualify,
            language: this.selectedLanguages,
            photoURL: this.empService.imageDownloadUrl,
          });
          console.log('Employee Created Successfully');
          this.empService.successAndErrorMessage =
            'Employee Id ' + employeeForm.eid + ' Created Successfully';
          this.empService.openDialogSuccess();
          this.allTabsClose();
        }
      });
    }
  }

  //=====================  Language Array ==================
  longArray(formValues: any) {
    const selectedOrderIds = formValues.language
      .map((checked: any, i: any) =>
        checked ? this.dataService.languagesData[i].name : null
      )
      .filter((v: any) => v !== null);
    this.selectedLanguages = selectedOrderIds;
  }

  //===================== Load data for Edit Data  =================================

  editEmpDetails: any;

  editEmpShow: boolean = false;

  registerEmployeeShow: boolean = false;
  viewEmployeeListShow: boolean = false;
  getParticularEmployeeShow: boolean = false;

  editDataForm() {
    this.registerEmployeeShow = false;
    this.viewEmployeeListShow = false;
    this.getParticularEmployeeShow = false;
    this.editEmpShow = true;
  }

  allTabsClose() {
    this.registerEmployeeShow = false;
    this.viewEmployeeListShow = false;
    this.getParticularEmployeeShow = false;
    this.editEmpShow = false;
  }

  previoueImgShow: boolean = true;
  uploadImgShow: boolean = false;

  //===================================  Update Form ===========================
  updateForm!: FormGroup;
  submittedUpdate: boolean = false;
  updateEmpWithPreviousImg(employeeForm: any) {
    this.longArray(employeeForm);
    update(ref(this.db, 'Employee/' + this.editEmpDetails.eid), {
      employeeName: employeeForm.employeeName,
      dec: employeeForm.dec,
      salary: employeeForm.salary,
      joinDate: this.datepipe.transform(employeeForm.joinDate, 'yyyy-MM-dd'),
      gender: employeeForm.gender,
      email: employeeForm.email,
      mobile: employeeForm.mobile,
      qualify: employeeForm.qualify,
      language: this.selectedLanguages,
    });
    this.empService.successAndErrorMessage =
      'Employee Id ' + employeeForm.eid + ' Updated Successfully';
    this.empService.openDialogSuccess();
    this.allTabsClose();
  }

  updateEmpWithLatestImg(employeeForm: any) {
    this.longArray(employeeForm);
    this.empService.employeeFormDetails(employeeForm);
    update(ref(this.db, 'Employee/' + this.editEmpDetails.eid), {
      employeeName: employeeForm.employeeName,
      dec: employeeForm.dec,
      salary: employeeForm.salary,
      joinDate: this.datepipe.transform(employeeForm.joinDate, 'yyyy-MM-dd'),
      gender: employeeForm.gender,
      email: employeeForm.email,
      mobile: employeeForm.mobile,
      qualify: employeeForm.qualify,
      language: this.selectedLanguages,
      photoURL: this.empService.imageDownloadUrl,
    });
    this.empService.successAndErrorMessage =
      'Employee Id ' + employeeForm.eid + ' Updated Successfully';
    this.empService.openDialogSuccess();
    this.allTabsClose();
  }

  //=========================================  Get Single Employee Data  ======================================
  displayEmpDetails: boolean = false;
  getParticularEmp!: FormGroup;
  singleEmpData: any;
  submittedSingleData: boolean = false;

  getSingleEmployee(empdata: any) {
    this.submittedSingleData = true;
    if (this.getParticularEmp.invalid) {
      return;
    } else {
      const dbref = ref(this.db);
      get(child(dbref, 'Employee/' + empdata.empId)).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          this.singleEmpData = data;
          this.displayEmpDetails = true;
        } else {
          console.log('No Employee Id');
          this.empService.successAndErrorMessage =
            'Employee Id ' + empdata.empId + ' Does Not Exists';
          this.empService.openDialogSuccess();
        }
      });
    }
  }
}
