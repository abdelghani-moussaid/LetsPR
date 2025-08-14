import { Component, inject, OnInit } from '@angular/core';
import { RaceService } from '../../../core/services/race-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Race } from '../../../types/race';

@Component({
  selector: 'app-race-detailed',
  imports: [DatePipe, RouterLink, AsyncPipe],
  templateUrl: './race-detailed.html',
  styleUrl: './race-detailed.css'
})
export class RaceDetailed implements OnInit {
  private raceService = inject(RaceService);
  private route = inject(ActivatedRoute);
  protected race$?: Observable<Race>;

  ngOnInit(): void {
    this.race$ = this.loadRace();
  }

  loadRace() {
    const id = this.route.snapshot.paramMap.get('id')
    if(!id) return;
    return this.raceService.getRace(id);
  }
}
