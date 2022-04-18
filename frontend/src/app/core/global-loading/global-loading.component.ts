import { Component } from '@angular/core';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-global-loading',
  templateUrl: './global-loading.component.html',
  styleUrls: ['./global-loading.component.scss']
})
export class GlobalLoadingComponent {

  constructor(private loadingService: LoadingService) { }

  loading$ = this.loadingService.loading$;

}
