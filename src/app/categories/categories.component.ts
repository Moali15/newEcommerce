import { Component } from '@angular/core';
import { CatService } from '../cat.service';
import { Categ } from '../categ';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  catData!:Categ[]
  constructor(private _catService:CatService){}

  ngOnInit(): void {
    this._catService.getAllCat().subscribe(
      res => {
     this.catData = res.data;
        console.log(this.catData);

      }
    )
  }
}
