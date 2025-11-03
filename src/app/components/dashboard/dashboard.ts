import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

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

  constructor() { }

  ngOnInit(): void {
    // Code d'initialisation du dashboard
  }
}