import { TestBed } from '@angular/core/testing';
import { first } from 'rxjs';

import { CartService } from './cart.service';
import { Product } from './product';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add item and fire event', () => {
    let expectedItems: Product[] | undefined;
    service.items$.subscribe(e => {
      expectedItems = e.concat();
    });
    service.add({ name: 'test product', description: 'test description', price: 1 });
    expect(expectedItems).toEqual([{ name: 'test product', description: 'test description', price: 1 }]);
  });

  it('should remove item and fire event', () => {
    let expectedItems: Product[] | undefined;
    service.items$.subscribe(e => {
      expectedItems = e.concat();
    });
    service.add({ name: 'test product', description: 'test description', price: 1 });
    service.add({ name: 'test product 2', description: 'test description 2', price: 2 });
    expect(expectedItems).toEqual([
      { name: 'test product', description: 'test description', price: 1 },
      { name: 'test product 2', description: 'test description 2', price: 2 },
    ]);
    service.remove({ name: 'test product', description: 'test description', price: 1 });
    expect(expectedItems).toEqual([
      { name: 'test product 2', description: 'test description 2', price: 2 },
    ]);
    service.remove({ name: 'test product', description: 'test description', price: 1 });
    expect(expectedItems).toEqual([]);
  });
});
