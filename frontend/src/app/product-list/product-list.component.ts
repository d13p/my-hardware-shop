import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor(private productService: ProductService) { }

  totalProductCount: number = 0;
  products: Product[] = [];

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.totalProductCount = data.totalElements;
      this.products = data.content;
    });
  }

}
