import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { ProductListComponent } from './product-list/product-list.component';

describe('AppComponent', () => {

  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        HttpClientModule,
        MatToolbarModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatSnackBarModule,
        MatCardModule,
      ],
      declarations: [
        AppComponent,
        ProductListComponent,
        ProductInfoComponent,
        CartComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should render title', () => {
    expect(compiled.querySelector('.title')?.textContent).toContain('Smart Hardware Shop');
  });

  it('should render banner', () => {
    expect(compiled.querySelector('.body__banner')?.textContent).toContain('News / Hot Deals');
  });

  it('should render the search box', () => {
    expect(compiled.querySelector('.searchbox')).toBeDefined();
    expect(compiled.querySelector('.searchbox mat-label')!.textContent).toBe('Search for products');
    expect(compiled.querySelector('.searchbox input')).toBeDefined();
  });

  it('should render the product list', () => {
    expect(compiled.querySelector('app-product-list')).toBeDefined();
  });

  it('should render the shopping cart', () => {
    expect(compiled.querySelector('app-cart')).toBeDefined();
  });
});
