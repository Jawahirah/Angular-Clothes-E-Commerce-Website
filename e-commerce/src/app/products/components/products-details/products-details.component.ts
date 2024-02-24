import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import * as bootstrap from 'bootstrap';



@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit {

  product: any = {};
  productId: any;
  loading: boolean = true;
  hasError: boolean = false;
  @ViewChild('liveToast') liveToast!: ElementRef;
  constructor(private service: ProductsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProduct()
  }

  getProduct() {
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.productId = param.get('id');
    });
    this.service.getSingleProduct(parseInt(this.productId, 10)).subscribe({
      next: (res: any) => {
        this.loading = this.hasError = false;
        this.product = res;
        this.product.rating.rate = Math.floor(this.product.rating.rate)
      },
      error: () => {
        this.loading = false;
        this.hasError = true;
      }
    }

    )
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

  getRatingArray(rate: number): number[] {
    return Array(rate).fill(0);
  }

  showToast() {
    const toastBootstrap = new bootstrap.Toast(this.liveToast.nativeElement);
    toastBootstrap.show();
  }
}

