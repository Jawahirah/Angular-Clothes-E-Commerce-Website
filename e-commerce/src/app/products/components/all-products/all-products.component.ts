import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from 'src/app/models/product';


@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  constructor(private service: ProductsService) {
  }
  categories!: string[];
  loading: boolean = false;
  products: Product[] = [];
  cartProducts: any[] = [];

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  addToCart(event: any) {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
      let index = this.cartProducts.findIndex(item => item.item.id == event.item.id)
      if (index !== -1) {
        this.cartProducts[index].quantity++;
        localStorage.setItem('cart', JSON.stringify(this.cartProducts));
      } else {
        this.cartProducts.push(event);
        localStorage.setItem("cart", JSON.stringify(this.cartProducts));
      }

    } else {
      this.cartProducts.push(event);
      localStorage.setItem("cart", JSON.stringify(this.cartProducts));
    }
  }
  filterCategory(event: any) {
    let category = event.target.value;
    (category == 'all') ? this.getProducts() : this.getProductsByCategory(category);
  }

  getProducts() {
    this.loading = true;
    this.service.getAllProducts().subscribe((res: any) => {
      this.loading = false;
      this.products = res;
    },
      (error: any) => {
        this.loading = false;
        console.log('Error: ', error.status, error.message)
      }
    );
  }

  getCategories() {
    this.loading = true;
    this.service.getAllCategories().subscribe((res: any) => {
      this.loading = false;
      this.categories = res;
    });
  }

  getProductsByCategory(category: string) {
    this.loading = true;
    this.service.getProductsByCategory(category).subscribe((res: any) => {
      this.loading = false;
      this.products = res;
    });
  }




}
