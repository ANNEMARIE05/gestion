import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationComponent } from './components/notification/notification';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NotificationComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  title = 'Gestion Entreprise';
}