import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {LessonsComponent} from "./lessons/lessons.component";
import {ResourceDemoComponent} from "./resource-demo/resource-demo.component";
import {LinkedSignalDemoComponent} from "./linked-signal/linked-signal-demo.component";
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "lessons",
    component: LessonsComponent,
    canActivate: [authGuard]
  },
  {
    path:"shopping-cart",
    component: LinkedSignalDemoComponent
  },
  {
    path: "resource-demo",
    component: ResourceDemoComponent
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];
