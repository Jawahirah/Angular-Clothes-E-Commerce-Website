import { Component } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  get numberOfItems(){
    let tatalItems=0;
    JSON.parse(localStorage.getItem('cart')!).forEach((ele:any)=>{tatalItems+=ele.quantity});
    return tatalItems;
  }
}
