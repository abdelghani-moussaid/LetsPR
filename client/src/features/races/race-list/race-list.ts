import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RaceService } from '../../../core/services/race-service';
import { Observable } from 'rxjs';
import { Race } from '../../../types/race';
import { AsyncPipe } from '@angular/common';
import { RaceCard } from "../race-card/race-card";

@Component({
  selector: 'app-race-list',
  imports: [AsyncPipe, RaceCard],
  templateUrl: './race-list.html',
  styleUrl: './race-list.css'
})
export class RaceList {
  private raceService = inject(RaceService);
  protected races$: Observable<Race[]>;

  constructor(){
    this.races$ = this.raceService.getRaces();
  }
}
