import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {
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

  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    // Vérifier si on vient de la page de connexion
    // Utiliser window.history.state car getCurrentNavigation() peut ne pas fonctionner dans ngOnInit
    const state = (window.history.state && window.history.state.fromLogin) 
      ? window.history.state 
      : null;
    
    if (state && state.fromLogin) {
      // Afficher la notification de bienvenue après un court délai pour une meilleure UX
      setTimeout(() => {
        this.notificationService.success('Bienvenue ! Vous êtes maintenant connecté.', 4000);
      }, 300);
      
      // Nettoyer l'état pour éviter d'afficher la notification lors d'un refresh
      if (window.history.replaceState) {
        window.history.replaceState({}, '', window.location.href);
      }
    }
  }
}