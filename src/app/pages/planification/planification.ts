import { Component, OnInit } from '@angular/core';
import { Planification } from '../../models/planification.model';
import { Application } from '../../models/application.model';
import { Projet } from '../../models/projet.model';
import { User } from '../../models/user.model';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ImportExportService } from '../../services/import-export.service';

@Component({
  selector: 'app-planification',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterLink],
  templateUrl: './planification.html',
  styleUrls: ['./planification.scss']
})
export class PlanificationComponent implements OnInit {
  allPlanifications: Planification[] = [
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
    },
    {
      id: '2',
      application: {
        id: '2',
        nom: 'Suivi Mobile Beta',
        projet: {
          id: '2',
          nom: 'Projet Beta',
          description: 'Application mobile de suivi',
          tpm: {
            id: '1',
            nom: 'Dupont Jean',
            email: 'jean.dupont@entreprise.com',
            contact: '+33 6 12 34 56 78',
            password: '********',
            profile: 'TPM',
            created_at: new Date('2024-01-15')
          },
          created_at: new Date('2024-02-10')
        },
        stack: ['react', 'php'],
        dev: {
          id: '4',
          nom: 'Dubois Sophie',
          email: 'sophie.dubois@entreprise.com',
          contact: '+33 6 45 67 89 01',
          password: '********',
          profile: 'DEV',
          created_at: new Date('2024-01-25')
        },
        livrable: 'Application mobile iOS/Android',
        created_at: new Date('2024-03-05')
      },
      titre: 'Phase 1 - Interface utilisateur',
      date_debut: new Date('2024-03-10'),
      date_fin: new Date('2024-04-10'),
      etat_avancement: 30,
      probleme_rencontrer: 'Délai de livraison des maquettes',
      action_corrective: 'Coordination renforcée avec le designer',
      statut: 'en_cours',
      commentaire: 'En attente de validation des designs',
      created_at: new Date('2024-03-10')
    }
  ];

  planifications: Planification[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;
  totalPages = 0;
  Math = Math;

  constructor(private importExportService: ImportExportService) { }

  ngOnInit(): void {
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalItems = this.allPlanifications.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.planifications = this.allPlanifications.slice(start, end);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  getPagesArray(): number[] {
    const pages: number[] = [];
    const maxPages = 5;
    let start = Math.max(1, this.currentPage - Math.floor(maxPages / 2));
    let end = Math.min(this.totalPages, start + maxPages - 1);
    
    if (end - start < maxPages - 1) {
      start = Math.max(1, end - maxPages + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
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

  exportData(): void {
    const headers = ['application', 'titre', 'date_debut', 'date_fin', 'etat_avancement', 'statut', 'created_at'];
    const filename = this.importExportService.generateFilename('planification', 'csv');
    this.importExportService.exportToCSV(this.allPlanifications, filename, headers);
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    if (fileExtension === 'csv') {
      this.importExportService.importFromCSV(file).then(data => {
        console.log('Données importées:', data);
        alert(`${data.length} éléments importés avec succès`);
      }).catch(error => {
        console.error('Erreur lors de l\'import:', error);
        alert('Erreur lors de l\'import des données');
      });
    } else if (fileExtension === 'json') {
      this.importExportService.importFromJSON(file).then(data => {
        console.log('Données importées:', data);
        alert(`${data.length} éléments importés avec succès`);
      }).catch(error => {
        console.error('Erreur lors de l\'import:', error);
        alert('Erreur lors de l\'import des données');
      });
    } else {
      alert('Format de fichier non supporté');
    }
  }
}

