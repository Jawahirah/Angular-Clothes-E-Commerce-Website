import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../products/services/products.service'


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  categories!: string[];
  constructor(private service: ProductsService) { };
  ngOnInit(): void {
    this.getcategories();
  }

  getcategories() {
    console.log(8)
    this.service.getAllCategories().subscribe((res:any)=>{
      this.categories=res;
    });
  }

}
