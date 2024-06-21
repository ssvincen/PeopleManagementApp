// persons.component.ts
import { Component, OnInit } from '@angular/core';
import { PersonService } from '../person.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {
  persons: any[] = [];
  searchCriteria: string = '';
  searchValue: string = '';
  pageNumber: number = 1;
  pageSize: number = 10;

  constructor(private personService: PersonService, private router: Router) { }

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

  searchPersons(): void {
    if (this.searchCriteria && this.searchValue) {
      this.personService.searchPersons(this.searchCriteria, this.searchValue).subscribe(
        data => {
          this.persons = data;
        },
        error => {
          console.error('There was an error searching the persons!', error);
        }
      );
    } else {
      this.getPersonList();
    }
  }

  deletePerson(id: number): void {
    this.personService.deletePerson(id).subscribe(
      () => {
        this.getPersonList();
      },
      error => {
        console.error('There was an error deleting the person!', error);
      }
    );
  }

  editPerson(id: number): void {
    this.router.navigate([`/edit-person/${id}`]);
  }

  addPerson(): void {
    this.router.navigate(['/add-person']);
  }
}
