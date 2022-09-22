import { Component } from '@angular/core';
import { ServerdataService } from './Service/serverdata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Employee';

  constructor(public serverData: ServerdataService) {}

  downloadEmp() {}
  printPage() {
    window.print();
  }
}
