import {Component, OnInit} from '@angular/core';
import {GreetingServiceService} from "../../service/greeting-service.service";
import {Greeting} from "../../entity/Greeting";
import {trigger, transition, style, animate, query, stagger, useAnimation} from "@angular/animations";
import {
  listItemStaggerDecreaseAnimation, listItemStaggerIncreaseAnimation
} from "../../animations/listAnimations";


@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.scss'],
  animations: [
    trigger('filerAnimation', [
      transition(':enter, :increment', [
        query(':enter', [
          useAnimation(listItemStaggerIncreaseAnimation, {
            params: {
              offset: '-100px',
              time: '100ms',
            }
          })
        ])
      ]),
      transition(':leave, :decrement', [
        query(':leave', [
          useAnimation(listItemStaggerDecreaseAnimation, {
            params: {
              offset: '-100px',
              time: '100ms',
            }
          })
        ])
      ])
    ]),
  ]
})
export class GreetingComponent implements OnInit{

  selectedGreeting?: Greeting;
  greetings: Greeting[] = [];
  filteredGreetings: Greeting[] = [];
  greetingsTotal = -1;

  constructor(private greetService: GreetingServiceService) {
    this.greetingsTotal = -1;
  }

  ngOnInit():void{
    this.getGreetings();
  }

  onSelect(greeting: Greeting): void {
    this.selectedGreeting = greeting;
  }

  getGreetings(): void {
    this.greetService.getGreetings()
      .subscribe(greetings => {
        this.greetings = greetings;
        this.filteredGreetings = this.greetings;
        this.greetingsTotal = this.filteredGreetings.length;
      });
  }

  updateCriteria(criteria: string) {
    criteria = criteria? criteria.trim() : '';
    this.filteredGreetings = this.greetings.filter(
      greeting => greeting.content
        .toLowerCase()
        .includes(criteria.toLowerCase())
    );

    const newTotal = this.filteredGreetings.length;

    if (this.greetingsTotal != newTotal) {
      this.greetingsTotal = newTotal;
    } else if (!criteria) {
      this.greetingsTotal = -1;
    }
  }
}
