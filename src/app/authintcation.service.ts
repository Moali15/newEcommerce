import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

interface registerInterFace {
  name?:string,
  email:string,
  password:string,
  rePassword?:string,
  phone?:string
  resetCode?:string
  newPassword?:string
}
@Injectable({
  providedIn: 'root'
})
export class AuthintcationService {
  userDataa:BehaviorSubject<any> = new BehaviorSubject(null)
  baseUrl:string = "https://ecommerce.routemisr.com"


  constructor(private _HttpClient:HttpClient) { }

  userData(){
    if(localStorage.getItem("userToken") != null){
      this.userDataa.next(localStorage.getItem("userToken"))
      this.userDataa.next( jwtDecode(this.userDataa.getValue()))

    }else{
      this.userDataa.next(null)
    }
  }

  registerApi(reData:registerInterFace):Observable<any>{
   return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signup` ,  reData )
  }

  loginApi(reData:registerInterFace):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signin` , reData)
  }

  forgetPassword(reData:registerInterFace):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/forgotPasswords` , reData)
  }

  verifyCode(reData:registerInterFace):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/verifyResetCode` , reData)
  }
  resetPassword(reData:registerInterFace):Observable<any>{
    return this._HttpClient.put(`${this.baseUrl}/api/v1/auth/resetPassword` , reData)
  }
}
