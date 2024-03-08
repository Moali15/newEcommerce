import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-detials',
  templateUrl: './product-detials.component.html',
  styleUrls: ['./product-detials.component.css']
})
export class ProductDetialsComponent implements OnInit {
  itemId!:string
  itemData!:any
  constructor(private _ActivatedRoute:ActivatedRoute , private _ProductsService:ProductsService , private toastEvokeService:ToastEvokeService , private _cartservices:CartService){}

  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe((p)=>{
      this.itemId = p['_id'];
      this._ProductsService.oneProductsApi(this.itemId).subscribe(
      (res)=> this.itemData = res.data
    )
    })

  }

  addToCart(productId:string){
    this._cartservices.addToCart(productId).subscribe({
      next: data => {
        this.toastEvokeService.success('success', data.message).subscribe();
        this._cartservices.cartItemNumber.next(data.numOfCartItems)
      },
      error: err =>{
      this.toastEvokeService.danger('error', err.message).subscribe()}

    })
  }
}
