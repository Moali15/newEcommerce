import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { BrandsComponent } from './brands/brands.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { guardGuard } from './guard.guard';
import { ProductDetialsComponent } from './product-detials/product-detials.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  {path:"", redirectTo:"home" , pathMatch:"full"},
  {path:"home" , canActivate:[guardGuard] ,component:HomeComponent},
  {path:"login",  component:LoginComponent},
  {path:"register" , component:RegisterComponent},
  {path:"cart" , canActivate:[guardGuard], component:CartComponent},
  {path:"payment" , canActivate:[guardGuard], component:PaymentComponent},
  {path:"products" , canActivate:[guardGuard], component:ProductsComponent},
  {path:"categories",canActivate:[guardGuard], component:CategoriesComponent},
  {path:"brands" ,canActivate:[guardGuard], component:BrandsComponent},
  {path:"wishList" ,canActivate:[guardGuard], component:WishlistComponent},
  {path:"productDetials/:_id" ,canActivate:[guardGuard], component:ProductDetialsComponent},
  {path:"**",canActivate:[guardGuard], component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
