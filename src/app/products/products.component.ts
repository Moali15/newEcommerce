import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { Data } from '../products';
import { CartService } from '../cart.service';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { WishListService } from '../wish-list.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  productData!:Data[]
  pageSize:number = 0
  p:number = 1
  total:number = 0
  constructor(private _ProductsService:ProductsService, private _cartservices:CartService , private toastEvokeService:ToastEvokeService , private _wishList:WishListService){}
  ngOnInit(): void {
    this._ProductsService.allProductsApi().subscribe({
      next: (res) => {
        this.productData = res.data
        this.pageSize =res.metadata.limit
        this.p =res.metadata.currentPage
        this.total =res.results
      },
      error: (err)=>{
        console.log(err);

      }
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
  addToWishList(id:string){
    this._wishList.addToWishList(id).subscribe({
      next: res =>
      {
        this.toastEvokeService.success('success', res.message).subscribe();
      }

    })
  }
  pageChanged(event:any):void{}
}

