import { Component, OnInit } from '@angular/core';
import { child, Database, get, ref } from '@angular/fire/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServerdataService } from 'src/app/Service/serverdata.service';

@Component({
  selector: 'app-get-employee',
  templateUrl: './get-employee.component.html',
  styleUrls: ['./get-employee.component.css'],
})
export class GetEmployeeComponent implements OnInit {
  constructor(public db: Database, public serverData: ServerdataService) {
    this.serverData.getParticularEmp = new FormGroup({
      empId: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]+$/),
      ]),
    });
  }
  get empId() {
    return this.serverData.getParticularEmp.get('empId');
  }

  ngOnInit(): void {}

  getDetails(empdata: any) {
    this.serverData.getSingleEmployee(empdata);
  }
  downloadEmp() {}
  printPage() {
    window.print();
  }
}
