import { Routes } from '@angular/router';
import { Home } from '../features/home/home';
import { RaceList } from '../features/races/race-list/race-list';
import { RaceDetailed } from '../features/races/race-detailed/race-detailed';
import { authGuard } from '../core/guards/auth-guard';
import { TestErrors } from '../features/test-errors/test-errors';
import { NotFound } from '../shared/errors/not-found/not-found';
import { ServerError } from '../shared/errors/server-error/server-error';

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
    { path: 'errors', component: TestErrors },
    { path: 'server-error', component: ServerError },
    { path: '**', component: NotFound }
];
