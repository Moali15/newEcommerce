import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
  baseUrl:string = "https://ecommerce.routemisr.com" ;
  headerInfo:any = {"token" : localStorage.getItem("userToken")}
  constructor(private _HttpClient:HttpClient) { }

  addToWishList(id:string):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/v1/wishlist` , {"productId" : id} , {
      headers : this.headerInfo
    })
  }

  getAllWishList():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/v1/wishlist`, {headers : this.headerInfo} )
  }

  removeFormWishList(id:string):Observable<any>{
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/wishlist/${id}`
    , {headers : this.headerInfo}
    )
  }

}
