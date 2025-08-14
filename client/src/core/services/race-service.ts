import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Race } from '../../types/race';
import { AccountService } from './account-service';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  private http = inject(HttpClient);
  private accountService = inject(AccountService)
  private baseUrl = environment.apiUrl;

  getRaces() {
    return this.http.get<Race[]>(this.baseUrl + 'races');
  }

  getRace(id: string) {
    return this.http.get<Race>(this.baseUrl + 'races/' + id);
  }
}