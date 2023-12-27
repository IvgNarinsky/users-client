import { Component } from '@angular/core';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Users';
  isLoading: boolean = true
  isNotification: boolean = false
  constructor(private loadingService: LoadingService) { }

  ngOnInit() {
    this.loadingService.loadingDisplay.subscribe((isLoading) => {
      this.isLoading = isLoading
    });
  }

}
