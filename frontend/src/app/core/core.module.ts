import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { httpInterceptorProviders } from './api.interceptor';
import { GlobalLoadingComponent } from './global-loading/global-loading.component';

const commonModules = [
  CommonModule,
  FormsModule,
  HttpClientModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatAutocompleteModule,
  MatInputModule,
  MatCardModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
];

@NgModule({
  declarations: [
    GlobalLoadingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ...commonModules
  ],
  exports: [
    ...commonModules,
    GlobalLoadingComponent
  ],
  providers: [
    httpInterceptorProviders,
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3000 } }
  ]
})
export class CoreModule { }
