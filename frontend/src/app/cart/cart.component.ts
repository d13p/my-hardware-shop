import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { CartItem, CartService } from '../core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  constructor(
    private snackbar: MatSnackBar,
    private cart: CartService,
  ) { }

  items: CartItem[] = [];
  totalAmount: number = 0;

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.cart.cart$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(({ items, totalAmount }) => {
      this.items = items;
      this.totalAmount = totalAmount;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onRemoveItem(item: CartItem): void {
    this.cart.remove(item.id).subscribe(() => {
      this.snackbar.open('Product removed from your cart!');
    });
  }

}
