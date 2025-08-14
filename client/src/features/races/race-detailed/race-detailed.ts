import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { RaceService } from '../../../core/services/race-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Race } from '../../../types/race';
import { ToastService } from '../../../core/services/toast-service';

@Component({
  selector: 'app-race-detailed',
  imports: [DatePipe, RouterLink, AsyncPipe],
  templateUrl: './race-detailed.html',
  styleUrl: './race-detailed.css'
})
export class RaceDetailed implements OnInit {

  private raceService = inject(RaceService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  protected race$?: Observable<Race>;
  private toast = inject(ToastService)
  @Output() refreshList = new EventEmitter<void>();

  ngOnInit(): void {
    this.race$ = this.loadRace();
  }

  loadRace() {
    const id = this.route.snapshot.paramMap.get('id')
    if(!id) return;
    return this.raceService.getRace(id);
  }

  // race-card.component.ts
  onDelete(id: string) {
    if (confirm('Are you sure you want to delete this race?')) {
      this.raceService.deleteRace(id).subscribe({
        next: () => {
          this.toast.success('Race deleted successfully');
          this.refreshList.emit(); // Optional: emit to parent to refresh list
          this.router.navigateByUrl('/races'); 
        },
        error: (err: any) => {
          console.log(err);
          this.toast.error('Failed to delete race')
        }
      });
    }
  }
}
