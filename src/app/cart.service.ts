import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthintcationService } from './authintcation.service';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  mytoken:any = {"token" : localStorage.getItem("userToken")} ;
  baseUrl:string = "https://ecommerce.routemisr.com/api/v1/" ;
  cartItemNumber:BehaviorSubject<any> = new BehaviorSubject("0") ;
  constructor(private _httpclient:HttpClient , private auth:AuthintcationService) {
      this.getAllCart().subscribe(
        res => {
        this.cartItemNumber.next(res.numOfCartItems)}
      )
  }

addToCart(productId:string):Observable<any>{
  return this._httpclient.post(this.baseUrl + 'cart' , {"productId" : productId} , 
  {
    headers : this.mytoken
  })
}

  getAllCart():Observable<any>{
    return this._httpclient.get( this.baseUrl + 'cart' , 
    {
      headers : this.mytoken
    }
    )
      
  }

  removeCartItem(productId:string):Observable<any> {
    return this._httpclient.delete(this.baseUrl + `cart/${productId}`, 
    {
      headers : this.mytoken
    })
   }

  updateCartCount(productId:string , countNum:number):Observable<any>{
    return this._httpclient.put(this.baseUrl + `cart/${productId}`,
    {
      
      count: countNum
      
    }
    ,
    {
      headers : this.mytoken
    }
    )
  }


  ClearCart():Observable<any>{
    return this._httpclient.delete(this.baseUrl + `cart`, 
    {
      headers : this.mytoken
    })
  }


  payment(id:string):Observable<any>{

    return this._httpclient.post(`${this.baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200` , {"shippingAddress":{
      "details": "details",
      "phone": "01010700999",
      "city": "Cairo"
      }} ,{
        headers : this.mytoken
       } )
  }
}
