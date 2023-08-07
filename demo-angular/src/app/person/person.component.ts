import {Component, OnInit} from '@angular/core';
import {Person} from "../../entity/Person";
import {PersonService} from "../../service/person.service";
import {tap, map, filter} from "rxjs/operators";
import { Observable, of } from "rxjs";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements  OnInit {
  persons$: Observable<Person[]>;
  p: number = 1;
  total: number;
  loading: boolean;
  itemsPerPage: number;
  selectedPerson: Person;

  constructor(private personService: PersonService) {
    this.total = 0;
    this.p = 1;
    this.loading = true;
    this.itemsPerPage = 5;
  }


  ngOnInit():void{
    this.getPage(this.p);
  }

  onSelect(person: Person): void {
    this.selectedPerson = person;
  }

  getPage(page: number) {
    this.loading = true;
    const param = new HttpParams()
      .set('page', page - 1)
      .set('size', 5);

    this.persons$ = this.personService.getPersons(param)
      .pipe(
        tap( res => {
          // console.log('res:[', res, ']');
          this.total        = res.totalElements;
          this.p            = page;
          this.loading      = false;
          this.itemsPerPage = res.size;
        }),
        map( res => res.content)
      );
  }
}


