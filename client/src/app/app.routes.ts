import { Routes } from '@angular/router';
import { Home } from '../features/home/home';
import { RaceList } from '../features/races/race-list/race-list';
import { RaceDetailed } from '../features/races/race-detailed/race-detailed';
import { authGuard } from '../core/guards/auth-guard';

export const routes: Routes = [
    { path: '', component: Home },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            { path: 'races', component: RaceList },
            { path: 'races/:id', component: RaceDetailed },
        ]
    },
    { path: '**', component: Home }
];
