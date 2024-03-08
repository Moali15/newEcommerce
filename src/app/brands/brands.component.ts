import { Component } from '@angular/core';
import { BrandsService } from '../brands.service';
import { brands } from '../brands';
@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent {
  brandssData!:brands | undefined
  brandsData!:brands[]
    constructor(private _brandsServices:BrandsService){}

  ngOnInit(): void {
    this._brandsServices.getAllBrands().subscribe(
      res => {
        this.brandsData = res.data

      }
    )
  }

  getSpecBtn(id:string){
    this._brandsServices.getSpecBrands(id).subscribe({
      next: res => this.brandssData = res.data
    })
  }
}
