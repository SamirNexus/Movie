import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http' ;
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Observable , BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private _HttpClient:HttpClient ,private _Router:Router) { 
    if(localStorage.getItem('userToken') !=null){
      this.saveUserData();
    }
  }
  userData:any = new BehaviorSubject(null);
  saveUserData(){
    //take token from local storage
    //decode token
    //put in userData
    let encodedToken=JSON.stringify(localStorage.getItem('userToken'));
    let decodedToken:object=jwtDecode(encodedToken);
    this.userData.next(decodedToken);
    console.log(this.userData);
  }
  signout(){
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._Router.navigate(['/login']);
  }
  signup(userData:object):Observable<any>
    {
       return this._HttpClient.post('https://route-egypt-api.herokuapp.com/signup/',userData);
    }
  signin(userData:object):Observable<any>
    {
       return this._HttpClient.post('https://route-egypt-api.herokuapp.com/signin/',userData);
    }
}
