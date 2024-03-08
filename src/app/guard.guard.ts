import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthintcationService } from './authintcation.service';

export const guardGuard: CanActivateFn = (route, state) => {
  let auth:AuthintcationService =inject(AuthintcationService)
  let _Router:Router = inject(Router)
  if(localStorage.getItem("userToken") == null){
    _Router.navigate(["/login"])
    return false
  }else{
    auth.userDataa.next(localStorage.getItem("userToken"));
    return true
  }

};
