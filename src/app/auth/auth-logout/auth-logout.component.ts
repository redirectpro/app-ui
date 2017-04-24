import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-logout',
  templateUrl: './auth-logout.component.html',
  styleUrls: ['./auth-logout.component.css']
})
export class AuthLogoutComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

}
