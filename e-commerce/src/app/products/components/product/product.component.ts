import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() product!: Product;
  @Output() selectedProduct = new EventEmitter();
  amount: number = 0;
  add() {
    this.amount++;
    this.selectedProduct.emit({ item: this.product, quantity: this.amount });
  }



}
