import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, shareReplay, startWith, Subject, switchMap, tap } from 'rxjs';
import { Cart, CartItem } from './cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private http: HttpClient,
  ) { }

  private refreshCart$ = new Subject<void>();

  /**
   * Cache of the cart items, refreshed whenever `refreshCart$` emits.
   */
  cart$ = this.refreshCart$.pipe(
    startWith({}),
    switchMap(() => this.getCart()),
    shareReplay(1)
  );

  getCart(): Observable<Cart> {
    return this.http.get<{ items: CartItem[] }>('cart').pipe(
      map(({ items }) => {
        return {
          items,

          // Calculate the total amount of all items. This could have been done by backend
          totalAmount: items.reduce((total, e) => {
            return total += e.product.price;
          }, 0)
        };
      })
    )
  }

  /**
   * Adds a new cart item, then refreshes the cart.
   * 
   * @param productId 
   * @param quantity 
   * @returns id of the new cart item
   */
  add(productId: string, quantity = 1): Observable<{ id: string }> {
    return this.http.post<{ id: string }>('cart/items', {
      productId,
      quantity
    }).pipe(
      tap(() => this.refreshCart())
    );
  }

  /**
   * Removes a cart item, then refreshes the cart.
   * @param id 
   * @returns void
   */
  remove(id: string): Observable<void> {
    return this.http.delete<void>(`cart/items/${id}`).pipe(
      tap(() => this.refreshCart())
    );
  }

  private refreshCart() {
    this.refreshCart$.next();
  }

}
