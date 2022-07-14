import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AppService} from "../app/app.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "./User";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private app: AppService,
              private http: HttpClient,
              private router:Router) {
    console.log("signin Component constructor");
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  login() {
    this.app.authenticate(
      {
                  username: this.loginForm.value.username,
                  password: this.loginForm.value.password
                }, ()=> {
                  this.router.navigateByUrl('/greeting');
                  console.log("app authenticate complete");
                });

    return false;
  }

}
