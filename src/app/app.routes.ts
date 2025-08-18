import { Routes } from '@angular/router';
import { SplashComponent } from './components/splash/splash.component';
import { OnboardingComponent } from './components/onboarding/onboarding.component';
import { HomeComponent } from './components/home/home.component';
import { RedirectLoggedInGuard } from './gaurds/redirectLoggedIn.guard';
import { RedirectLoggedOutGuard } from './gaurds/redirectLoggedOut.guard';

export const routes: Routes = [
    { path: 'splash', component: SplashComponent },
    { path: 'onboarding', component: OnboardingComponent, canActivate: [RedirectLoggedInGuard] },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate: [RedirectLoggedOutGuard] },
    {
        path: 'stats',
        loadComponent: () => import('./components/stats/stats.component').then(m => m.StatsComponent),
        canActivate: [RedirectLoggedOutGuard]
    },
    {
        path: 'profile',
        loadComponent: () => import('./components/profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [RedirectLoggedOutGuard]
    },
    {
        path: 'routines',
        loadComponent: () => import('./components/routines/routines.component').then(m => m.RoutinesComponent),
        canActivate: [RedirectLoggedOutGuard]
    },
    {
        path: 'challenges',
        loadComponent: () => import('./components/challenges/challenges.component').then(m => m.ChallengesComponent),
        canActivate: [RedirectLoggedOutGuard]
    },
];
