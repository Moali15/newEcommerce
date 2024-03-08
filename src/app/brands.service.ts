import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  baseUrl:string = "https://ecommerce.routemisr.com" ;
  constructor(private _httpclient:HttpClient) { }

  getAllBrands():Observable<any>{
    return this._httpclient.get(`${this.baseUrl}/api/v1/brands`)
  }
  getSpecBrands(id:string):Observable<any>{
    return this._httpclient.get(`${this.baseUrl}/api/v1/brands/${id}`)
  }
}
