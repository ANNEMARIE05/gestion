import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { Planification } from '../../../models/planification.model';

@Component({
  selector: 'app-planification-detail',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterLink],
  templateUrl: './planification-detail.html',
  styleUrls: ['./planification-detail.scss']
})
export class PlanificationDetailComponent implements OnInit {
  planification: Planification | null = null;

  // Données factices
  private planificationsData: Planification[] = [
    {
      id: '1',
      application: {
        id: '1',
        nom: 'Gestion Client Alpha',
        projet: {
          id: '1',
          nom: 'Projet Alpha',
          description: 'Développement d\'une plateforme de gestion',
          tpm: {
            id: '1',
            nom: 'Dupont Jean',
            email: 'jean.dupont@entreprise.com',
            contact: '+33 6 12 34 56 78',
            password: '********',
            profile: 'TPM',
            created_at: new Date('2024-01-15')
          },
          created_at: new Date('2024-01-20')
        },
        stack: ['angular', 'java'],
        dev: {
          id: '2',
          nom: 'Martin Marie',
          email: 'marie.martin@entreprise.com',
          contact: '+33 6 23 45 67 89',
          password: '********',
          profile: 'DEV',
          created_at: new Date('2024-02-20')
        },
        livrable: 'Application web complète',
        created_at: new Date('2024-02-25')
      },
      titre: 'Phase 1 - Développement frontend',
      date_debut: new Date('2024-03-01'),
      date_fin: new Date('2024-03-31'),
      etat_avancement: 65,
      probleme_rencontrer: 'Problème de performance sur certaines pages',
      action_corrective: 'Optimisation du code et utilisation du lazy loading',
      statut: 'en_cours',
      commentaire: 'Bon avancement global',
      created_at: new Date('2024-03-01')
    }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const planificationId = params['id'];
      this.planification = this.planificationsData.find(p => p.id === planificationId) || null;
      
      if (!this.planification) {
        this.router.navigate(['/planification']);
      }
    });
  }

  getStatutBadgeClass(statut: string): string {
    switch (statut) {
      case 'en_cours':
        return 'bg-yellow-100 text-yellow-800';
      case 'termine':
        return 'bg-green-100 text-green-800';
      case 'en_retard':
        return 'bg-red-100 text-red-800';
      case 'annule':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getStatutLabel(statut: string): string {
    switch (statut) {
      case 'en_cours':
        return 'En cours';
      case 'termine':
        return 'Terminé';
      case 'en_retard':
        return 'En retard';
      case 'annule':
        return 'Annulé';
      default:
        return statut;
    }
  }

  getProgressBarColor(progress: number): string {
    if (progress >= 80) return 'bg-green-600';
    if (progress >= 50) return 'bg-blue-600';
    if (progress >= 25) return 'bg-yellow-600';
    return 'bg-red-600';
  }
}

