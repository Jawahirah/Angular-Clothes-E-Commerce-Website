import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/product';
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {


  @Input() product!: Product;
  @Output() selectedProduct = new EventEmitter();
  @ViewChild('liveToast') liveToast!: ElementRef;
  amount: number = 0;
  isClicked: boolean = false;


  add() {
    this.amount++;
    this.selectedProduct.emit({ item: this.product, quantity: this.amount });
  }
  showToast() {
    const toastBootstrap = new bootstrap.Toast(this.liveToast.nativeElement);
    toastBootstrap.show();
  }


}
