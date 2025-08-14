import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Nav } from '../layout/nav/nav';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Nav, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected router = inject(Router);

  ngOnInit() {
    const uStr = localStorage.getItem('user');
    if (uStr) {
      const u = JSON.parse(uStr);
      const { exp } = JSON.parse(atob(u.token.split('.')[1]));
      if (Date.now() >= exp * 1000) {
        localStorage.removeItem('user');
        this.router.navigateByUrl('/'); // or /login
      }
    }
  }
}
