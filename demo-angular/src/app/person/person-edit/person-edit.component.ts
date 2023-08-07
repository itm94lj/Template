import {Component, Input} from '@angular/core';
import {FormGroup, FormControl} from "@angular/forms";
import {PersonService} from "../../../service/person.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.scss']
})
export class PersonEditComponent {
  personForm = new FormGroup({
    name: new FormControl(''),
    address: new FormControl('')
  });


  constructor(private personService: PersonService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  onSubmit() {
    console.log('onSubmit invoked');
    const newPerson =
    {
      name: String(this.personForm.value['name']),
      address: String(this.personForm.value['address'])
    };
    this.personService.updatePerson(newPerson).subscribe(
      person => {
        console.log('add person:[', person, '].');
      }
    );
    this.router.navigate(['../person'], {relativeTo: this.route})
  }
}
