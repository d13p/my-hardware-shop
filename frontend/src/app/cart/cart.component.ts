import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { CartService } from '../cart.service';
import { Product } from '../product';

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

  items: Product[] = [];
  totalAmount: number = 0;

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.cart.items$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.items = data;
      this.totalAmount = data.reduce((total, e) => {
        return total += e.price;
      }, 0);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onRemoveItem(item: Product): void {
    this.cart.remove(item);
    this.snackbar.open('Product removed from your cart!');
  }

}
