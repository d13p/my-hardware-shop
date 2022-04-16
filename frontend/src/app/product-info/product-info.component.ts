import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../cart.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {

  constructor(
    private snackbar: MatSnackBar,
    private cart: CartService) { }

  @Input() product!: Product;

  ngOnInit(): void {
  }

  onAddToCart(): void {
    this.cart.add(this.product.id).subscribe(() => {
      this.snackbar.open('Product added to cart!');
    });
  }

}
