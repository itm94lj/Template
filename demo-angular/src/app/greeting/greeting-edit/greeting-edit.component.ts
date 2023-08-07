import { Component } from '@angular/core';
import {FormGroup, FormControl} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {GreetingServiceService} from "../../../service/greeting-service.service";

@Component({
  selector: 'app-greeting-edit',
  templateUrl: './greeting-edit.component.html',
  styleUrls: ['./greeting-edit.component.scss']
})
export class GreetingEditComponent {
  greetingForm = new FormGroup({
    id: new FormControl(''),
    content: new FormControl('')
  });


  constructor(private greetService: GreetingServiceService,
    private  router: Router,
    private route: ActivatedRoute) {

  }

  onSubmit() {
    console.log('onSubmit invoked');
    console.warn(this.greetingForm.value);
    const newGreet = {id: +this.greetingForm.value['id']!,
                    content: this.greetingForm.value['content']!};
    this.greetService.addGreeting(newGreet);
    this.router.navigate(['../greet'], {relativeTo: this.route});
  }
}
