import {Component, Input} from '@angular/core';
import {Greeting} from "../../../entity/Greeting";

@Component({
  selector: 'app-greeting-details',
  templateUrl: './greeting-details.component.html',
  styleUrls: ['./greeting-details.component.scss']
})
export class GreetingDetailsComponent {
  @Input() greeting: Greeting | undefined;
}
