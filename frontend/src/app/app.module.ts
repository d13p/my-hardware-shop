import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { CoreModule } from './core';
import { ProductInfoComponent } from './product-info/product-info.component';
import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    CartComponent,
    ProductInfoComponent,
  ],
  imports: [
    AppRoutingModule,
    CoreModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
