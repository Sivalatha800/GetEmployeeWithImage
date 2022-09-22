import { Component, OnInit } from '@angular/core';
import { child, Database, get, ref } from '@angular/fire/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServerdataService } from '../Service/serverdata.service';

@Component({
  selector: 'app-print-page',
  templateUrl: './print-page.component.html',
  styleUrls: ['./print-page.component.css'],
})
export class PrintPageComponent implements OnInit {
  constructor(public serverData: ServerdataService) {}

  ngOnInit(): void {}
}
