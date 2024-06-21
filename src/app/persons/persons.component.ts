// persons.component.ts
import { Component, OnInit } from '@angular/core';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {
  persons: any[] = [];
  pageNumber: number = 1;
  pageSize: number = 10;

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.getPersonList();
  }

  getPersonList(): void {
    this.personService.getPersonList(this.pageNumber, this.pageSize).subscribe(
      data => {
        this.persons = data;
      },
      error => {
        console.error('There was an error fetching the person list!', error);
      }
    );
  }
}
