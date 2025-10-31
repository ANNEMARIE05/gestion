import { Component, OnInit } from '@angular/core';
import { ProductionInfo } from '../../models/production.model';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ImportExportService } from '../../services/import-export.service';
import { ProductionService } from '../../services/production.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-production',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterLink],
  templateUrl: './production.html',
  styleUrls: ['./production.scss']
})
export class ProductionComponent implements OnInit {
  stats = {
    total: 0,
    applications: 0,
    enCours: 0,
    nok: 0
  };

  projects$: Observable<ProductionInfo[]>;

  constructor(
    private importExportService: ImportExportService,
    private productionService: ProductionService
  ) {
    this.projects$ = this.productionService.getProjects();
  }

  ngOnInit(): void {
    // Mettre à jour les statistiques
    this.productionService.getProjects().subscribe(projects => {
      const baseStats = this.productionService.getStats();
      // Compter les applications distinctes
      const applicationsDistinctes = new Set(projects.map(p => p.application));
      this.stats = {
        ...baseStats,
        applications: applicationsDistinctes.size
      };
    });
  }

  getStatutBadgeClass(statut: string): string {
    switch (statut) {
      case 'OK':
        return 'bg-green-100 text-green-800';
      case 'En cours':
        return 'bg-yellow-100 text-yellow-800';
      case 'NOK':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getTypeIconClass(type: string): string {
    switch (type) {
      case 'Application Web':
        return 'bg-blue-100';
      case 'Application Mobile':
        return 'bg-purple-100';
      case 'Système Backend':
        return 'bg-green-100';
      case 'Infrastructure':
        return 'bg-orange-100';
      case 'Base de données':
        return 'bg-red-100';
      case 'API':
        return 'bg-indigo-100';
      default:
        return 'bg-gray-100';
    }
  }

  getTypeIcon(type: string): string {
    switch (type) {
      case 'Application Web':
        return 'fas fa-globe text-blue-600';
      case 'Application Mobile':
        return 'fas fa-mobile-alt text-purple-600';
      case 'Système Backend':
        return 'fas fa-server text-green-600';
      case 'Infrastructure':
        return 'fas fa-cloud text-orange-600';
      case 'Base de données':
        return 'fas fa-database text-red-600';
      case 'API':
        return 'fas fa-code text-indigo-600';
      default:
        return 'fas fa-cog text-gray-600';
    }
  }

  // Méthodes d'import/export
  exportData(): void {
    this.productionService.getProjects().subscribe(projects => {
      const headers = ['numeroProjet', 'application', 'serviceDTI', 'responsable', 'typeProduction', 'statut', 'etatAvancement', 'dateDebut', 'dateFinPrevue'];
      const filename = this.importExportService.generateFilename('production', 'csv');
      this.importExportService.exportToCSV(projects, filename, headers);
    });
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