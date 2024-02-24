import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartProducts: any[] = [];
  total: number = 0;
  success: boolean = false;
  message: any='';
  hasError:boolean=false;


  constructor(private service: ServiceService) { }
  ngOnInit(): void {
    this.getAllProducts();
  }

  minusItem(index: number) {
    this.cartProducts[index].quantity--;
    this.getTotalPrice();
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }

  deleteProduct(index: number) {
    this.cartProducts.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.getTotalPrice();
  }

  addItem(index: number) {
    this.cartProducts[index].quantity++;
    this.getTotalPrice();
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }
  getAllProducts() {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
    }
    this.getTotalPrice();
  }

  getTotalPrice() {
    this.total = 0;
    this.cartProducts.forEach((currentVal) => {
      this.total += currentVal.item.price * currentVal.quantity;
    })
    return this.total;
  }

  checkout() {
    try {
      if (this.cartProducts.length != 0) {
        let products = this.cartProducts.map(item => { return { productId: item.item.id, quantity: item.quantity } });
        let model = {
          userId: 5,
          date: new Date(),
          products: products
        }
        this.service.AddNewProduct(model).subscribe({next: res => {
          this.message = { succes: true, msgTitle:'Awesome', mssage: 'Thank you for your purchase! Your checkout is complete!' };
          this.success = true
          this.cartProducts = []
          this.total = 0;
          this.hasError=false;
          localStorage.setItem('cart', JSON.stringify(this.cartProducts))
        },
        error:()=>{
          this.hasError=true;
        }});
        
      } else {
        this.message = { succes: false, msgTitle:'Oops! your cart is empty', mssage: 'Looks like you haven\'t added anything to your cart' };
      }
    } catch (error: any) {
      this.message = { succes: false, msgTitle:'Oops!', mssage: 'Something wrong happened' };

    }
  }



}
