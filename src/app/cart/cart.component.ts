import { Component, OnInit , Renderer2 } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../cart';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit{
  allProducts!:Product[];
  totalPrice:string =""
  counter:string = ""
  cartId:string = ""


  constructor(
    private _cartServices:CartService ,
    private _router:Router,
    private _Renderer2:Renderer2
    ){
  }
  cartDetails:any = null;

  ngOnInit(): void {
    this._cartServices.getAllCart().subscribe({
      next: (response) => {
        if(response.data.totalCartPrice != 0){
          this.allProducts = response.data.products;
          this.totalPrice = response.data.totalCartPrice
          this.cartId = response.data._id
          this.cartDetails=response.data
        }else{
          this._router.navigate(["/home"])
        }
      }
    })
  }
  
  removeItem(productId:string, element:any){
    this._Renderer2.setAttribute(element , 'disabled' , 'true')

    this._cartServices.removeCartItem(productId).subscribe({
      next: (response) => { 
        this._Renderer2.removeAttribute(element , 'disabled' )
        this.allProducts = response.data.products
        this._cartServices.cartItemNumber.next(response.numOfCartItems)
      },
      error:(err) => {
        this._Renderer2.removeAttribute(element , 'disabled' )

      }
    })
  }

  
ChangeCount( count:number,id:string, el1:any,el2:any ):void{
  if (count>=1) {
    this._Renderer2.setAttribute(el1 , 'disabled' , 'true');
    this._Renderer2.setAttribute(el2 , 'disabled' , 'true');

    this._cartServices.updateCartCount( id,count).subscribe({
      next:(response)=>{
        this.allProducts = response.data.products
        this._Renderer2.removeAttribute(el1 , 'disabled');
        this._Renderer2.removeAttribute(el2 , 'disabled');
      },
      error:(err) => {
        this._Renderer2.removeAttribute(el1 , 'disabled');
        this._Renderer2.removeAttribute(el2 , 'disabled');
      }
    });
  }
}

Clear():void{
this._cartServices.ClearCart().subscribe({
  next:(response)=>
  {
    if (response.message === "success") {
      this.cartDetails = null;
    }
  },
});


}
paymentBtn(id:string){
  this._cartServices.payment(id).subscribe({
    next: (data) => window.location.href = data.session.url


  })
}
  

}