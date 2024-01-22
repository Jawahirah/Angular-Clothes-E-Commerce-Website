import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './components/cart/cart.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ModalComponent } from './components/modal/modal.component';
import { DigitsFormatPipe } from './pipes/digits-format.pipe';

@NgModule({
  declarations: [
    CartComponent,
    ModalComponent,
    DigitsFormatPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],exports:[
    CartComponent,
    ModalComponent
  ]
})
export class CartModule { }
