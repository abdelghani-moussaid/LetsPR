import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private http = inject(HttpClient);
  protected title = 'LetsPR';
  protected races = signal<any>([]);

  async ngOnInit() {
    this.races.set(await this.getRaces())
  }

  async getRaces() {
    try {
      return lastValueFrom(this.http.get('https://localhost:5001/api/races'))
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
