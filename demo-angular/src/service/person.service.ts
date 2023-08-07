import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Person} from "../entity/Person";
import {Page} from "../entity/Page";
import {Observable} from "rxjs";
import {DomainService} from "./domain.service";
import {RxStompService} from "./rx-stomp.service";

@Injectable({
  providedIn: 'root'
})
export class PersonService extends DomainService<Person>{

  personUrlPrefix = 'http://localhost:4200/greeting-service';

  constructor(private http: HttpClient,
              private rxStompService: RxStompService
  ) {
    super(rxStompService);
  }


  getPersons(param: any) {
    return this.http.get<Page<Person>>(this.personUrlPrefix+'/persons', {params: param});
  }

  updatePerson(newPerson: Person): Observable<Person> {
    return this.http.post<Person>(this.personUrlPrefix+'/person',
      newPerson);
  }

  deletePerson(delPerson: Person): Observable<Person> {
    return this.http.delete<Person>(this.personUrlPrefix + '/person/' + delPerson.id);;
  }

  /* method below must be override to watchDomain */
  override getDomainName(): string {
    return 'Person';
  }

  override getDomainById(id: number): Observable<Person> {
    const params = new HttpParams()
      .set('id', id);
    return this.http.get<Person>(this.personUrlPrefix + '/person',
      {params: params});
  }
}
