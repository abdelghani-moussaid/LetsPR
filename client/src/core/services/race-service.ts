import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Race } from '../../types/race';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  getRaces() {
    return this.http.get<Race[]>(this.baseUrl + 'races');
  }

  getRace(id: string) {
    return this.http.get<Race>(this.baseUrl + 'races/' + id);
  }

  addRace(dto: Partial<Race>) {
    return this.http.post<Race>(this.baseUrl + 'races', dto);
  }

  updateRace(id: string, dto: Partial<Race>) {
    return this.http.put<Race>(this.baseUrl + 'races/' + id, dto);
  }

  deleteRace(id: string) {
    return this.http.delete(this.baseUrl + 'races/' + id);
  }
}