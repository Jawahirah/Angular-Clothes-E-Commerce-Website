import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit {

  product: any = {};
  productId: any;
  loading: boolean = true;
  constructor(private service: ProductsService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.getProduct()
  }

  getProduct() {
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.productId = param.get('id');
    });
    this.service.getSingleProduct(parseInt(this.productId, 10)).subscribe((res: any) => {
      this.loading = false;
      this.product = res;
    })
  }

  addToCart() {
    try {
      let index = JSON.parse(localStorage.getItem('cart')!).findIndex((item: any) => { return item.item.id == this.product.id });
      let cartProduct = JSON.parse(localStorage.getItem('cart')!);
      if (cartProduct.length != 0) {
        if (index != -1) {
          cartProduct[index].quantity++
          localStorage.setItem('cart', JSON.stringify(cartProduct));
        } else {
          cartProduct.push({ item: this.product, quantity: 1 })
          localStorage.setItem('cart', JSON.stringify(cartProduct))
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
