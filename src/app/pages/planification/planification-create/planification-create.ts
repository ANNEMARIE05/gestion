import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Planification } from '../../../models/planification.model';
import { Application } from '../../../models/application.model';

@Component({
  selector: 'app-planification-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './planification-create.html',
  styleUrls: ['./planification-create.scss']
})
export class PlanificationCreateComponent implements OnInit {
  planification: Partial<Planification> = {
    titre: '',
    date_debut: new Date(),
    date_fin: new Date(),
    etat_avancement: 0,
    probleme_rencontrer: '',
    action_corrective: '',
    statut: 'en_cours',
    commentaire: '',
    created_at: new Date()
  };

  selectedApplicationId: string = '';
  
  isLoading = false;

  // Données factices
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

  constructor(private router: Router) { }

  ngOnInit(): void {
    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    
    this.planification.date_debut = today;
    this.planification.date_fin = nextMonth;
  }

  formatDateForInput(date: Date): string {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  }

  onDateChange(dateString: string, field: 'date_debut' | 'date_fin'): void {
    if (dateString) {
      this.planification[field] = new Date(dateString);
    }
  }

  onSubmit(): void {
    if (this.isLoading) return;

    const selectedApplication = this.applications.find(a => a.id === this.selectedApplicationId);

    if (!selectedApplication) {
      alert('Veuillez sélectionner une application');
      return;
    }

    this.isLoading = true;

    // Simuler une sauvegarde
    setTimeout(() => {
      console.log('Planification créée:', {
        ...this.planification,
        application: selectedApplication
      });
      
      this.isLoading = false;
      this.router.navigate(['/planification']);
    }, 1500);
  }
}

