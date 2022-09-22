import { Component, OnInit } from '@angular/core';
import { Database, ref, remove } from '@angular/fire/database';
import { EmployeeService } from 'src/app/Service/employee.service';
import { ServerdataService } from 'src/app/Service/serverdata.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  constructor(
    public serverData: ServerdataService,
    public empService: EmployeeService,
    public db: Database
  ) {}

  ngOnInit() {
    this.serverData.getData();
  }

  onEdit(employee: any) {
    this.serverData.editEmpDetails = employee;
    this.serverData.editDataForm();
  }
  deleteEmp(deleteEmp: any) {
    remove(ref(this.db, 'Employee/' + deleteEmp.eid));
    this.empService.deleteImage(deleteEmp);
    this.serverData.getData();
  }
}
