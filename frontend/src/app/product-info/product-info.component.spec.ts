import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ProductInfoComponent } from './product-info.component';

describe('ProductInfoComponent', () => {
  let component: ProductInfoComponent;
  let fixture: ComponentFixture<ProductInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductInfoComponent],
      imports: [
        MatCardModule,
        MatSnackBarModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInfoComponent);
    component = fixture.componentInstance;
    component.product = {
      name: 'Test Product',
      description: 'Test Description',
      price: 10,
    }
    fixture.detectChanges();
  });

  it('should display product info', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.title')!.textContent).toBe('Test Product')
    expect(compiled.querySelector('.description')!.textContent).toBe('Test Description')
    expect(compiled.querySelector('.price')!.textContent).toBe('$10');
  });
});
