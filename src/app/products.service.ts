import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseUrl:string = "https://ecommerce.routemisr.com/api/v1/"
  constructor(private _HttpClient:HttpClient) { }

  allProductsApi():Observable<any>{
  return this._HttpClient.get(this.baseUrl+`products`)
  }

  oneProductsApi(ItemID:string):Observable<any>{
    return this._HttpClient.get(this.baseUrl+`products/${ItemID}`)
  }

getCategories():Observable<any>{
  return this._HttpClient.get(this.baseUrl+'categories')
  }
}
