import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { Projet } from '../../../models/projet.model';

@Component({
  selector: 'app-projets-detail',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterLink],
  templateUrl: './projets-detail.html',
  styleUrls: ['./projets-detail.scss']
})
export class ProjetsDetailComponent implements OnInit {
  projet: Projet | null = null;

  // Données factices pour l'exemple
  private projetsData: Projet[] = [
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

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const projetId = params['id'];
      this.projet = this.projetsData.find(p => p.id === projetId) || null;
      
      if (!this.projet) {
        this.router.navigate(['/projets']);
      }
    });
  }
}

