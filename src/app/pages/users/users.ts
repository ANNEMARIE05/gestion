import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ImportExportService } from '../../services/import-export.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterLink],
  templateUrl: './users.html',
  styleUrls: ['./users.scss']
})
export class UsersComponent implements OnInit {
  allUsers: User[] = [
    {
      id: '1',
      nom: 'Dupont Jean',
      email: 'jean.dupont@entreprise.com',
      contact: '+33 6 12 34 56 78',
      password: '********',
      profile: 'TPM',
      created_at: new Date('2024-01-15')
    },
    {
      id: '2',
      nom: 'Martin Marie',
      email: 'marie.martin@entreprise.com',
      contact: '+33 6 23 45 67 89',
      password: '********',
      profile: 'DEV',
      created_at: new Date('2024-02-20')
    },
    {
      id: '3',
      nom: 'Bernard Pierre',
      email: 'pierre.bernard@entreprise.com',
      contact: '+33 6 34 56 78 90',
      password: '********',
      profile: 'TEAM LEAD',
      created_at: new Date('2024-03-10')
    },
    {
      id: '4',
      nom: 'Dubois Sophie',
      email: 'sophie.dubois@entreprise.com',
      contact: '+33 6 45 67 89 01',
      password: '********',
      profile: 'DEV',
      created_at: new Date('2024-01-25')
    }
  ];

  users: User[] = [];
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
    this.totalItems = this.allUsers.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.users = this.allUsers.slice(start, end);
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

  getProfileBadgeClass(profile: string): string {
    switch (profile) {
      case 'TPM':
        return 'bg-purple-100 text-purple-800';
      case 'DEV':
        return 'bg-blue-100 text-blue-800';
      case 'TEAM LEAD':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getProfileLabel(profile: string): string {
    return profile;
  }

  // Méthodes d'import/export
  exportData(): void {
    const headers = ['nom', 'email', 'contact', 'profile', 'created_at'];
    const filename = this.importExportService.generateFilename('users', 'csv');
    this.importExportService.exportToCSV(this.allUsers, filename, headers);
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