import { Component } from '@angular/core';
import { WishListService } from '../wish-list.service';
import { Data } from '../products';
import { CartService } from '../cart.service';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {

  allWishProducts!:Data[]

  constructor(private _wishList:WishListService , private _cartservices:CartService , private toastEvokeService:ToastEvokeService){}

  ngOnInit(): void {
    this._wishList.getAllWishList().subscribe({
      next: data => {
        this.allWishProducts = data.data
      }
    })

  }

  removeItem(id:string){
this._wishList.removeFormWishList(id).subscribe({
  next: data =>{ console.log(data);
  }
  , error: err => console.log(err)

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

