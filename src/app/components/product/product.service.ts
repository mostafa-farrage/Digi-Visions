import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { ProductCreateViewModel } from './view-models/product-create.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  controller: string = "products";
  constructor(private _apiService: ApiService) { }
  getProducts() {
    return this._apiService.get(`${this.controller}?limit=200`);
  }
  postOrUpdateProduct(body: ProductCreateViewModel) {
    if (body.id == 0) 
      return this._apiService.post(`${this.controller}`, body);
    else
      return this._apiService.update(`${this.controller}/${body.id}`, body);
  }
  getProductbyID(id) {
    return this._apiService.get(`${this.controller}/${id}`);
  }
  removeProduct(id: number) {
    return this._apiService.remove(`${this.controller}/${id}`)
  }
 
}
