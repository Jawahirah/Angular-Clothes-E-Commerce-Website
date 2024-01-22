import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
ngOnInit(): void {
  this.message={sucess:true}
}
@Input() msgId!:string;
@Input() message!:any;
}
