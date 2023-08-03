import { Component, OnInit } from '@angular/core';
import {FormGroup , FormControl , Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _AuthService:AuthService , private _Router:Router) { }
  error:string='';
  isLoading:boolean=false;
  loginForm:FormGroup = new FormGroup({
    email:new FormControl(null , [Validators.email, Validators.required]),
    password:new FormControl(null , [Validators.required, Validators.pattern(/^[A-Z]/)])
  });
  submitLoginForm(loginForm:FormGroup){
    this.isLoading=true;
    this._AuthService.signin(loginForm.value).subscribe({
      next:(response)=>{
        this.isLoading=false;
        if(response.message === 'success'){
          localStorage.setItem('userToken' ,response.token);
          this._AuthService.saveUserData();
          this._Router.navigate(['/home'])
        }
        else{
            this.error=response.message;
        }
      }
    });
  }

  ngOnInit(): void {
    this._AuthService.userData.subscribe({
      next:()=>{
         if(this._AuthService.userData.getValue() !=null ){
              this._Router.navigate(['/home'])
         }
      }
    })
  }

}
