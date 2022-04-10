import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CartService } from '../cart.service';
import { CartComponent } from './cart.component';


describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      imports: [
        NoopAnimationsModule,
        MatIconModule,
        MatSnackBarModule,
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render cart items', () => {
    component.items = [{
      name: 'test product',
      description: 'test description',
      price: 1,
    }];
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).querySelectorAll('table tbody tr').length).toBe(1);
  });

  it('should call CartService to remove item', () => {
    const cartServiceSpy = fixture.debugElement.injector.get(CartService);
    spyOn(cartServiceSpy, 'remove').and.callThrough();
    component.items = [{
      name: 'test product',
      description: 'test description',
      price: 1,
    }];
    fixture.detectChanges();
    ((fixture.nativeElement as HTMLElement).querySelector('table tbody tr button') as HTMLButtonElement).click();

    expect(cartServiceSpy.remove).toHaveBeenCalledOnceWith({
      name: 'test product',
      description: 'test description',
      price: 1,
    });
  });

});
