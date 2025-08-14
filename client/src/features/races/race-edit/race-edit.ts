import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RaceService } from '../../../core/services/race-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-race-edit',
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './race-edit.html',
  styleUrl: './race-edit.css'
})
export class RaceEdit {
  private route = inject(ActivatedRoute);
  private svc = inject(RaceService);
  private router = inject(Router);

  raceId = this.route.snapshot.paramMap.get('id')!;
  form = new FormGroup({
    type: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    date: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    location: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    goalTime: new FormControl<string | null>(null, [Validators.pattern(/^\d{2}:\d{2}:\d{2}$/)]),
    trainingDays: new FormControl(4, { nonNullable: true, validators: [Validators.min(1), Validators.max(7)] }),
  });

  ngOnInit() {
    this.svc.getRace(this.raceId).subscribe(r => {
      const formattedDate = r.date ? r.date.slice(0, 10) : '';

      this.form.patchValue({
        type: r.type, date: formattedDate, location: r.location,
        goalTime: r.goalTime ?? null, trainingDays: r.trainingDays
      })
    });
  }

  save() {
    if (this.form.invalid) return;
    const dto = {
      ...this.form.value,
      goalTime: this.form.value.goalTime ?? undefined
    };
    this.svc.updateRace(this.raceId, dto).subscribe(() =>
      this.router.navigate(['/races', this.raceId])
    );
  }

}
