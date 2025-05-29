import { Routes } from '@angular/router';
import { SplashComponent } from './components/splash/splash.component';
import { OnboardingComponent } from './components/onboarding/onboarding.component';
import { HomeComponent } from './components/home/home.component';
import { RedirectLoggedInGuard } from './gaurds/redirectLoggedIn.guard';
import { RedirectLoggedOutGuard } from './gaurds/redirectLoggedOut.guard';
import { StatsComponent } from './components/stats/stats.component';

export const routes: Routes = [
    { path: 'splash', component: SplashComponent },
    { path: 'onboarding', component: OnboardingComponent, canActivate: [RedirectLoggedInGuard] },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate: [RedirectLoggedOutGuard] },
    { path: 'stats', component: StatsComponent, canActivate: [RedirectLoggedOutGuard] }
];
