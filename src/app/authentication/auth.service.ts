import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError, Subject, BehaviorSubject} from 'rxjs';
import {User} from './user.model';
import { tap } from 'rxjs/operators';
import {Router} from '@angular/router';


export interface AuthResponceData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  user = new BehaviorSubject<User>(null);
  token: string = null;
  private timer: any;

  constructor( private http: HttpClient,
               private router: Router) { }

  signUp(email: string, password: string){
    return this.http
      .post
      <AuthResponceData>
      (
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAAkVRXslGGaDYDAE30Rx8WmMD1oP_TA7E',
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(
        catchError ( this.Error)
      );
  }

  login(email: string, password: string){
    return this.http
      .post
      <AuthResponceData>
      ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAAkVRXslGGaDYDAE30Rx8WmMD1oP_TA7E', {
        email: email,
        password: password,
        returnSecureToken: true
    })
      .pipe(
        catchError( this.Error),
        tap( respData => {
          const expirationDate = new Date(new Date().getTime() + +respData.expiresIn * 1000);
          const user = new User(respData.email, respData.localId, respData.idToken, expirationDate);
          this.user.next(user);
          this.autoLogOut( +expirationDate * 1000);
          localStorage.setItem('userData', JSON.stringify(user) );
        })
    );
  }


  autoLogIn(){
    const userData:{
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if ( !userData ){
      return;
    }
    const loadingUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if (loadingUser.token) {
      const expDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogOut(expDuration);
      this.user.next(loadingUser);
    }
  }

  logOut(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.timer){
      clearTimeout(this.timer);
    }
    this.timer = null;
  }

  autoLogOut(time: number){
    this.timer = setTimeout( () => {
      this.logOut();
    }, time)
  }

  private Error( errorResp: HttpErrorResponse){
    let errorMessage = 'An Unknown Error';
    if (!errorResp.error || !errorResp.error.error){
      return throwError(errorMessage);
    }
    switch (errorResp.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'The email address is already in use by another account.';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Password sign-in is disabled for this project.';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The password is invalid or the user does not have a password.';
        break;
      case 'USER_DISABLED':
        errorMessage = 'The user account has been disabled by an administrator.';
        break;
    }
    return throwError(errorMessage);

  }

}
