import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Nav } from '../layout/nav/nav';
import { AccountService } from '../core/services/account-service';
import { Home } from '../features/home/home';

@Component({
  selector: 'app-root',
  imports: [Nav, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private accountService = inject(AccountService);
  private http = inject(HttpClient);
  protected title = 'LetsPR';
  protected races = signal<any>([]);

  async ngOnInit() {
    // this.races.set(await this.getRaces())
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }
  // async getRaces() {
  //   try {
  //     return lastValueFrom(this.http.get('https://localhost:5001/api/races'))
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // }
}
