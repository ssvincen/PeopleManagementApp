// person-form.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {
  person: any = { name: '', surname: '', idNumber: '' };
  isEdit: boolean = false;
  id: number | null = null; // Define id as number or null

  constructor(
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      const id = +idParam;
      if (!isNaN(id)) {
        this.id = id; // Assign id if conversion is successful
        this.isEdit = true;
        this.personService.getPersonById(id).subscribe(
          data => {
            this.person = data;
          },
          error => {
            console.error('There was an error fetching the person!', error);
          }
        );
      } else {
        console.error('Invalid id parameter:', idParam);
      }
    }
  }

  savePerson(): void {
    if (this.id !== null) { // Check if id is not null
      if (this.isEdit) {
        this.personService.updatePerson(this.id, this.person).subscribe(
          () => {
            this.router.navigate(['/persons']);
          },
          error => {
            console.error('There was an error updating the person!', error);
          }
        );
      } else {
        this.personService.createPerson(this.person).subscribe(
          () => {
            this.router.navigate(['/persons']);
          },
          error => {
            console.error('There was an error creating the person!', error);
          }
        );
      }
    } else {
      console.error('Invalid id:', this.id);
    }
  }
}
