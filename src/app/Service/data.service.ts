import { Injectable } from '@angular/core';
import { Language } from './language';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  designation: string[] = [
    'Manager',
    'Software Developer',
    'Software Tester',
    'Admin',
  ];

  qualification: string[] = [
    'B.A.',
    'B.Com.',
    'B.Sc.',
    'B.Tech.',
    'MBA',
    'MCA',
  ];

  languagesData: Language[] = [
    { name: 'Telugu', value: 'Telugu' },
    { name: 'English', value: 'English' },
    { name: 'Hindi', value: 'Hindi' },
    { name: 'Kannada', value: 'Kannada' },
    { name: 'Tamil', value: 'Tamil' },
  ];
}
