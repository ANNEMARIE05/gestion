import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { Planification } from '../../../models/planification.model';
import { Application } from '../../../models/application.model';

@Component({
  selector: 'app-planification-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './planification-edit.html',
  styleUrls: ['./planification-edit.scss']
})
export class PlanificationEditComponent implements OnInit {
  planification: Planification | null = null;
  selectedApplicationId: string = '';
  
  isLoading = false;

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

  applications: Application[] = [
    {
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
    }
  ];

  statuts = ['en_cours', 'termine', 'en_retard', 'annule'];

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
      } else {
        this.selectedApplicationId = this.planification.application.id;
      }
    });
  }

  formatDateForInput(date: Date): string {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  }

  onDateChange(dateString: string, field: 'date_debut' | 'date_fin'): void {
    if (dateString && this.planification) {
      this.planification[field] = new Date(dateString);
    }
  }

  onDateFinitionChange(dateString: string): void {
    if (this.planification) {
      this.planification.date_finition = dateString ? new Date(dateString) : undefined;
    }
  }

  onSubmit(): void {
    if (this.isLoading || !this.planification) return;

    const selectedApplication = this.applications.find(a => a.id === this.selectedApplicationId);

    if (!selectedApplication) {
      alert('Veuillez sélectionner une application');
      return;
    }

    this.isLoading = true;

    // Simuler une sauvegarde
    setTimeout(() => {
      console.log('Planification modifiée:', {
        ...this.planification,
        application: selectedApplication
      });
      
      this.isLoading = false;
      this.router.navigate(['/planification']);
    }, 1500);
  }
}

