import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {
  showWelcomeNotification = false;
  
  stats = {
    users: {
      total: 45,
      actifs: 42
    },
    production: {
      total: 24,
      actifs: 18
    },
    audit: {
      total: 0,
      enCours: 3
    },
    veille: {
      total: 0,
      tendances: 15
    },
    applications: {
      total: 15,
      actives: 12
    },
    projets: {
      total: 20,
      enCours: 8
    },
    planification: {
      total: 10,
      aVenir: 5
    }
  };

  constructor() { }

  ngOnInit(): void {
    // Vérifier si l'utilisateur vient de se connecter
    const justLoggedIn = sessionStorage.getItem('justLoggedIn');
    if (justLoggedIn === 'true') {
      this.showWelcomeNotification = true;
      // Retirer le flag après affichage
      sessionStorage.removeItem('justLoggedIn');
      
      // Fermer automatiquement après 5 secondes
      setTimeout(() => {
        this.closeWelcomeNotification();
      }, 5000);
    }
  }

  closeWelcomeNotification(): void {
    this.showWelcomeNotification = false;
  }
}