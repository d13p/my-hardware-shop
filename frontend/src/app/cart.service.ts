import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private items: Product[] = [];
  items$ = new ReplaySubject<Product[]>(1);

  add(product: Product) {
    this.items.push({ ...product });
    this.items$.next(this.items);
  }

  remove(product: Product) {
    this.items.splice(this.items.findIndex(e => e.name === product.name), 1);
    this.items$.next(this.items);
  }

}