import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {Person} from "../../../entity/Person";
import {PersonService} from "../../../service/person.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss']
})
export class PersonDetailsComponent implements OnInit, OnChanges{
  @Input() person?: Person ;
  person$ : Observable<Person|null>;


  constructor(private personService: PersonService) {
  }

  ngOnInit():void {

  }


  ngOnChanges(changes:SimpleChanges):void {
    const chng = changes['person'];
    if (this.person &&
        this.person.id) {
      this.person$ = this.personService.watchDomainById(this.person.id);
    }
  }
}
