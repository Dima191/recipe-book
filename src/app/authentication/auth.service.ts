import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError, Subject} from 'rxjs';
import {User} from './user.model';
import { tap } from 'rxjs/operators';


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

  user = new Subject<User>();

  constructor( private http: HttpClient) { }

  signUp(email: string, password: string){
    return this.http
      .post<AuthResponceData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAAkVRXslGGaDYDAE30Rx8WmMD1oP_TA7E',
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(
        catchError ( this.Error),
        tap( respData => {
          const expirationDate = new Date(new Date().getTime() + +respData.expiresIn * 1000);
          const user = new User(respData.email, respData.localId, respData.idToken, expirationDate);
          this.user.next(user);
        })
      );
  }

  login(email: string, password: string){
    return this.http
      .post<AuthResponceData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAAkVRXslGGaDYDAE30Rx8WmMD1oP_TA7E',{
      email: email,
      password: password,
      returnSecureToken: true
    })
      .pipe(catchError( this.Error),
        tap( respData => {
          const expirationDate = new Date(new Date().getTime() + +respData.expiresIn * 1000);
          const user = new User(respData.email, respData.localId, respData.idToken, expirationDate);
          this.user.next(user);
        }));
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
