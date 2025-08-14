import { Component, input } from '@angular/core';
import { Race } from '../../../types/race';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-race-card',
  imports: [DatePipe, RouterLink],
  templateUrl: './race-card.html',
  styleUrl: './race-card.css'
})
export class RaceCard {
  race = input.required<Race>();
}
