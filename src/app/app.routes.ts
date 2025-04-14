import { Routes } from '@angular/router';
import {AppRoutes} from './core/constants/app-routes';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AppRoutes.game,
  },
  {
    path: AppRoutes.register,
    loadComponent: () =>
      import('./pages/register/register.component').then(
        (c) => c.RegisterComponent
      ),
  },
  {
    path: AppRoutes.login,
    loadComponent: () =>
      import('./pages/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: AppRoutes.game,
    loadComponent: () =>
      import('./pages/game/game.component').then((c) => c.GameComponent),
  },
  {
    path: AppRoutes.error,
    loadComponent: () =>
      import('./pages/error/error.component').then((c) => c.ErrorComponent),
  },
  {
    path: AppRoutes.profile,
    loadComponent: () =>
      import('./pages/profile/profile.component').then(
        (c) => c.ProfileComponent
      ),
  },
  {
    path: AppRoutes.leaderboard,
    loadComponent: () =>
      import('./pages/leaderboard/leaderboard.component').then(
        (c) => c.LeaderboardComponent
      ),
  },
  {
    path: AppRoutes.notFound,
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
  {
    path: '**',
    redirectTo: AppRoutes.notFound,
  },
];
