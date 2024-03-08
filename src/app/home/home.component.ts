import { Component, OnInit , Renderer2 } from '@angular/core';
import { ProductsService } from '../products.service';
import { Data } from '../products';
import { CartService } from '../cart.service';
import { WishListService } from '../wish-list.service';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../products/interfaces/category';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  productData!:Data[]
  userName!:string
  wishListData!:string
  isFlagged: boolean = false;

  isHeart:string[] = [];
    constructor(
    private _ProductsService:ProductsService,
    private _cartservices:CartService ,
    private _ToastrService:ToastrService,
    private _wishList:WishListService,
    private _Renderer2:Renderer2
    ){}

    Catgories: Category[]=[];
  ngOnInit(): void {
    this._ProductsService.allProductsApi().subscribe({
      next: (response) => {
        this.productData = response.data
      },
      error: (err)=>{
        console.log(err);

      },
    });
    this._ProductsService.getCategories().subscribe({
      next: (response)=>{
        console.log('categories', response)
        this.Catgories = response.data
      },
    });
  }
  CategoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: false
  }
  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: false
  }
  //..............btn refrence.............
  addToCart(productId:any, element:any): void{

    
    this._Renderer2.setAttribute(element , 'disabled' , 'true')
    this._cartservices.addToCart(productId).subscribe({
      next: (response) => {
        console.log(response);
        console.log(response.message);
        this._ToastrService.success(response.message);
        this._Renderer2.removeAttribute(element , 'disabled' )
        
      
      },
      error:(err) => {
        this._Renderer2.removeAttribute(element , 'disabled' )

      },

    })
  }

  addToWishList(id:string){
    this._wishList.addToWishList(id).subscribe({
      next: response =>
      {
        this.wishListData =response.data
        for(let i =0 ; i <= this.wishListData.length ; i++){
          if(this.wishListData[i] == id){
            this.isHeart.push(id)
          }
        }
        
      }

    })
  }
  removeFromWishList(id:string){
    this._wishList.removeFormWishList(id).subscribe({
      next: response=>
      {
        this.wishListData =response.data
        for(let i =0 ; i <= this.wishListData.length ; i++){
          if(this.wishListData[i] == id){
            this.isHeart.shift()
          }
        }
      }

    })
  }
}
