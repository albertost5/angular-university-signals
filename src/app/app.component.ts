import { Component } from '@angular/core';
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatListItem, MatNavList } from "@angular/material/list";
import { MatSidenav, MatSidenavContainer } from "@angular/material/sidenav";
import { MatToolbar } from "@angular/material/toolbar";
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoadingIndicatorComponent } from "./loading/loading.component";
import { MessagesComponent } from "./messages/messages.component";


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


}
