import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<ProductsResponse>('api/v1/products');
    // return of({
    //   total: 3,
    //   items: [{
    //     name: 'product 1',
    //     description: 'some desc',
    //     price: 10,
    //   },
    //   {
    //     name: 'product 2',
    //     description: 'some desc',
    //     price: 20,
    //   },
    //   {
    //     name: 'product 3',
    //     description: 'some desc',
    //     price: 30,
    //   }
    //   ]
    // })
  }
}

export interface ProductsResponse {
  totalElements: number;
  content: Product[];
}