import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

  AddNewProduct(model:any){
    return this.http.post(environment.baseAPI+'carts', JSON.stringify(model));
  }

}
