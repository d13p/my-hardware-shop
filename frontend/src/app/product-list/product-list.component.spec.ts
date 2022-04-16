import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { ProductInfoComponent } from '../product-info/product-info.component';
import { ProductService } from '../product.service';

import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let getProductsSpy: jasmine.Spy;

  beforeEach(async () => {
    const productService = jasmine.createSpyObj('ProductService', ['getProducts']);
    getProductsSpy = productService.getProducts.and.returnValue(of({
      totalElements: 0,
      content: []
    }));

    await TestBed.configureTestingModule({
      declarations: [ProductListComponent, ProductInfoComponent],
      providers: [{ provide: ProductService, useValue: productService }],
      imports: [
        HttpClientModule,
        MatSnackBarModule,
        MatCardModule,
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call ProductService getProducts', () => {
    expect(getProductsSpy.calls.any()).toBeTrue();
  });

  it('should render the product list', () => {
    component.products = [
      {
        id: '1',
        name: '1',
        description: '1',
        price: 1
      },
      {
        id: '2',
        name: '2',
        description: '2',
        price: 2
      }
    ];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.product-list app-product-info').length).toBe(2);
    expect(compiled.querySelector('.placeholder-nodata')).toBeFalsy();
  });


  it('should render a placeholder when there is no product', () => {
    component.products = [];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.product-list app-product-info').length).toBe(0);
    expect(compiled.querySelector('.placeholder-nodata')!.textContent).toBe("Nothing to show :'(");
  });
});
