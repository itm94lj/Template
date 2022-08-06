import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AppService} from "../app/app.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {forbiddenNameValidator} from "./signin.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private app: AppService,
              private http: HttpClient,
              private router:Router) {
    console.log("register Component constructor");
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.minLength(10),
        Validators.required, Validators.email, forbiddenNameValidator(/1@163.com/i)]),
      password: new FormControl('')
    });
  }

  ngOnInit(): void {
  }


  get username() { return this.registerForm.get('username');}

  get password() {return this.registerForm.get('password');}

  register() {
    this.app.register(
      {
        username: this.registerForm.value.username,
        password: this.registerForm.value.password
      }, ()=> {
        if (this.app.redirectUrl != '')
        {
          console.log('redirect to url before signin:[' + this.app.redirectUrl + ']');
          this.router.navigateByUrl(this.app.redirectUrl);
        }
        console.log("app authenticate complete");
      });

    return false;
  }

}
