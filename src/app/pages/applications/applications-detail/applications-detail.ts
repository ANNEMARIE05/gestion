import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { Application } from '../../../models/application.model';

@Component({
  selector: 'app-applications-detail',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterLink],
  templateUrl: './applications-detail.html',
  styleUrls: ['./applications-detail.scss']
})
export class ApplicationsDetailComponent implements OnInit {
  application: Application | null = null;

  // Données factices
  private applicationsData: Application[] = [
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

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const applicationId = params['id'];
      this.application = this.applicationsData.find(a => a.id === applicationId) || null;
      
      if (!this.application) {
        this.router.navigate(['/applications']);
      }
    });
  }

  getStackBadgeClass(stack: string): string {
    switch (stack) {
      case 'react':
        return 'bg-blue-100 text-blue-800';
      case 'angular':
        return 'bg-red-100 text-red-800';
      case 'java':
        return 'bg-orange-100 text-orange-800';
      case 'html':
        return 'bg-green-100 text-green-800';
      case 'php':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}

