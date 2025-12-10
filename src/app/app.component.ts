import { Component, inject } from '@angular/core';
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatListItem, MatNavList } from "@angular/material/list";
import { MatSidenav, MatSidenavContainer } from "@angular/material/sidenav";
import { MatToolbar } from "@angular/material/toolbar";
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoadingIndicatorComponent } from "./loading/loading.component";
import { MessagesComponent } from "./messages/messages.component";
import { AuthService } from './services/auth.service';


@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet, MatSidenavContainer, MatSidenav, MatNavList, MatListItem, MatIcon, RouterLink, MatToolbar,
        MatIconButton, LoadingIndicatorComponent, MessagesComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoggedIn = this.authService.isLoggedIn;

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
