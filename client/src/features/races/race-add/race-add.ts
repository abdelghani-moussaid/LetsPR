import { Component, inject } from '@angular/core';
import { RaceService } from '../../../core/services/race-service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-race-add',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './race-add.html',
  styleUrl: './race-add.css'
})
export class RaceAdd {
  private svc = inject(RaceService);
  private router = inject(Router);

  form = new FormGroup({
    type: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    date: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    location: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    goalTime: new FormControl<string | null>(null, [Validators.pattern(/^\d{2}:\d{2}:\d{2}$/)]),
    trainingDays: new FormControl(4, { nonNullable: true, validators: [Validators.min(1), Validators.max(7)] }),
  });

  save() {
    if (this.form.invalid) return;
    const dto = {
      ...this.form.value,
      goalTime: this.form.value.goalTime ?? undefined
    };
    this.svc.addRace(dto).subscribe(race =>
      this.router.navigate(['/races', race.id])
    );
  }
}
