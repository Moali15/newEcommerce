import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthintcationService } from '../authintcation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  isLoading:boolean = false
  errMessage!:string
  constructor(private _AuthintcationService:AuthintcationService , private _Router:Router){}
register:FormGroup = new FormGroup({
  name: new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(8)]),
  email: new FormControl(null , [Validators.required , Validators.email] ),
  password: new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z].{6}/)]),
  rePassword: new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z].{6}/)]),
  phone: new FormControl(null , [Validators.required , Validators.pattern(/^(01)[0125].{8}$/)])
})

submitBtn(){
  this.isLoading=true
  this._AuthintcationService.registerApi(this.register.value).subscribe({
    next: res => {
      if(res.message == "success"){
        this._Router.navigate(["/login"])
      }
    this.isLoading=false
    },
    error: err => {
     this.errMessage = err.error.message
     this.isLoading = false
    }
  })

}

}
