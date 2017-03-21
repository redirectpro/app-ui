import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { ApiService } from './api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService]
})
export class AppComponent {
  title = 'app works!';

  constructor(private authService: AuthService, private apiService: ApiService) { }

}
