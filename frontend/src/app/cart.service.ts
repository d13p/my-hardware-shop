import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, shareReplay, startWith, Subject, switchMap, tap } from 'rxjs';
import { CartItem } from './cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private http: HttpClient,
  ) { }

  private refreshCart$ = new Subject<void>();
  cart$ = this.refreshCart$.pipe(
    startWith({}),
    switchMap(() => this.getCart()),
    shareReplay(1)
  );

  getCart() {
    return this.http.get<{ items: CartItem[] }>('cart').pipe(
      map(({ items }) => {
        return {
          items,
          totalAmount: items.reduce((total, e) => {
            return total += e.product.price;
          }, 0)
        };
      })
    )
  }

  add(productId: string, quantity = 1) {
    return this.http.post<{ id: string }>('cart/items', {
      productId,
      quantity
    }).pipe(
      tap(() => this.refreshCart())
    );
  }

  remove(id: string) {
    return this.http.delete(`cart/items/${id}`).pipe(
      tap(() => this.refreshCart())
    );
  }

  private refreshCart() {
    this.refreshCart$.next();
  }

}
