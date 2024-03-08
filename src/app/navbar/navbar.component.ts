import { Component, OnInit } from '@angular/core';
import { AuthintcationService } from '../authintcation.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogin:boolean = false;
  itemsNumber :string = ""
  constructor(private _authintcationServices:AuthintcationService , private _Router:Router , private _cartServices:CartService){}

  ngOnInit(): void {
    this._cartServices.cartItemNumber.subscribe({
     next: () => {
      this.itemsNumber = this._cartServices.cartItemNumber.getValue()
     }
    })
    this._authintcationServices.userDataa.subscribe( () =>{

      if(this._authintcationServices.userDataa.getValue() != null){
        this.isLogin = true
      }else{
        this.isLogin = false
      }
    } )
  }

  logOut(){
    localStorage.removeItem("userToken")
    this._authintcationServices.userData()
    this._Router.navigate(["/login"])
  }


}
