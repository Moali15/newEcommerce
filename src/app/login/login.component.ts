import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthintcationService } from '../authintcation.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading:boolean = false;
  errMassage!:string;
  userData:any;
  forgetPassword:boolean = true;
  verifyCodee:boolean = false;
  resetPass:boolean =false;
  forgetEmailerr!:string;
  verifyerr!:string;
  newPassErr!:string;
  constructor(private _authinatcationService:AuthintcationService , private _router:Router ){}

  loginUser:FormGroup = new FormGroup({
    email:new FormControl(null , [Validators.required , Validators.email] ),
    password:new FormControl(null ,[Validators.required , Validators.pattern(/^[A-Z].{6}/)])
  })

  forgetPasswordEmail:FormGroup = new FormGroup({
    email: new FormControl(null , [Validators.required , Validators.email])
  })

  verifyCode:FormGroup = new FormGroup({
    resetCode:new FormControl(null , [Validators.required])
  })
  ResetPassword:FormGroup = new FormGroup({
    email:new FormControl(null , [Validators.required , Validators.email]),
    newPassword:new FormControl(null , [Validators.required , Validators.pattern(/^{A-Z}.{6}/)])
  })

submitBtn(){
  this.isLoading =true
  this._authinatcationService.loginApi(this.loginUser.value).subscribe({
    next : data => {
      if(data.message == "success"){
        this.userData = localStorage.setItem("userToken" ,data.token)
        this._authinatcationService.userData()
        this._router.navigate(["/home"])
        this.isLoading =false
      }
    },
    error : err => {
      this.errMassage = err.error.message
      this.isLoading =false
    }
  })

}

forgetPassBtn(){
  this.isLoading = true
  this._authinatcationService.forgetPassword(this.forgetPasswordEmail.value).subscribe({
    next: res =>{
    if (res.statusMsg == "success") {
      this.forgetPassword = false;
      this.verifyCodee = true;
      this.isLoading =false
    }
  },
  error : err => {
    this.forgetEmailerr = err.error.message
    this.isLoading =false
    }
  })
}
verifyCodeBtn(){
  this.isLoading = true
  this._authinatcationService.verifyCode(this.verifyCode.value).subscribe({
    next: res =>{
      if (res.status == "Success") {
      this.isLoading =false
      this.verifyCodee = false;
      this.resetPass=true;
    }
  },
  error : err => {
    this.verifyerr= err.error.message
    this.isLoading =false
    }
  })
}

newPassBtn(){
  this.isLoading = true
  this._authinatcationService.resetPassword(this.ResetPassword.value).subscribe({
    next: res =>{
      console.log(res);

    if (res.status == "Success") {
      this.userData = localStorage.setItem("userToken" ,res.token)
      this._authinatcationService.userData()
     this._router.navigate(["/home"])
     this.isLoading =false
    }
  },
  error : err => {
    console.log(err);
    this.newPassErr= err.error.message
    this.isLoading =false
    }
  })
}


}
