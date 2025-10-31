import { Component, OnInit } from '@angular/core';
import { Projet } from '../../models/projet.model';
import { User } from '../../models/user.model';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ImportExportService } from '../../services/import-export.service';

@Component({
  selector: 'app-projets',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterLink],
  templateUrl: './projets.html',
  styleUrls: ['./projets.scss']
})
export class ProjetsComponent implements OnInit {
  allProjets: Projet[] = [
    {
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
    {
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
    }
  ];

  projets: Projet[] = [];
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
    this.totalItems = this.allProjets.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.projets = this.allProjets.slice(start, end);
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

  exportData(): void {
    const headers = ['nom', 'description', 'tpm', 'created_at'];
    const filename = this.importExportService.generateFilename('projets', 'csv');
    this.importExportService.exportToCSV(this.allProjets, filename, headers);
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

