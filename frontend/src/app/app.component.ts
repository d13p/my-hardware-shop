import { Component } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-hardware-store';

  constructor(private loadingService: LoadingService) { }

  loading$ = this.loadingService.loading$;

}
