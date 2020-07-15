import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponceData, AuthService } from './auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';
import {User} from './user.model';


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})




export class AuthenticationComponent implements OnInit {

  loading = false;
  logMode = false;
  errorMessage: string = null;


  constructor( private authService: AuthService,
               private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(auth: NgForm) {
    if (!auth.valid){
      return;
    }
    this.loading = true;

    if (this.logMode){
      this.authService.login(auth.value.email, auth.value.password).subscribe( resData => {
          console.log(resData);
          this.loading = false;
          this.router.navigate(['/recipes']);
          this.errorMessage = null;
        },
        errorMessage => {
          console.log(errorMessage);
          this.errorMessage = errorMessage;
          this.loading = false;
        });
    }

    else {
      this.authService.signUp(auth.value.email, auth.value.password).subscribe(resData => {
          console.log(resData);
          this.loading = false;
          this.errorMessage = null;
          this.router.navigate(['/recipes']);

        },
        errorMessage => {
          console.log(errorMessage);
          this.errorMessage = errorMessage;
          this.loading = false;
        });


    }
    auth.reset();

  }

  login() {
    this.logMode = true;
  }


}
