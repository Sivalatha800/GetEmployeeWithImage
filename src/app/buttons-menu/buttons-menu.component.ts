import { Component, OnInit } from '@angular/core';
import { ServerdataService } from '../Service/serverdata.service';

@Component({
  selector: 'app-buttons-menu',
  templateUrl: './buttons-menu.component.html',
  styleUrls: ['./buttons-menu.component.css'],
})
export class ButtonsMenuComponent implements OnInit {
  constructor(public serverData: ServerdataService) {}
  ngOnInit(): void {}

  registerEmployee() {
    this.serverData.registerEmployeeShow = true;
    this.serverData.viewEmployeeListShow = false;
    this.serverData.getParticularEmployeeShow = false;
    this.serverData.editEmpShow = false;
    this.serverData.displayEmpDetails = false;
  }
  viewEmployeeList() {
    this.serverData.registerEmployeeShow = false;
    this.serverData.viewEmployeeListShow = true;
    this.serverData.getParticularEmployeeShow = false;
    this.serverData.editEmpShow = false;
    this.serverData.displayEmpDetails = false;
  }

  getParticularEmployee() {
    this.serverData.registerEmployeeShow = false;
    this.serverData.viewEmployeeListShow = false;
    this.serverData.getParticularEmployeeShow = true;
    this.serverData.editEmpShow = false;
    this.serverData.displayEmpDetails = false;
  }
}
