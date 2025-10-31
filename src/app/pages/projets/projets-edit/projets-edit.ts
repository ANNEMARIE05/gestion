import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { Projet } from '../../../models/projet.model';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-projets-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './projets-edit.html',
  styleUrls: ['./projets-edit.scss']
})
export class ProjetsEditComponent implements OnInit {
  projet: Projet | null = null;
  selectedTpmId: string = '';
  isLoading = false;

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

  // Liste des TPM disponibles
  tpmUsers: User[] = [
    {
      id: '1',
      nom: 'Dupont Jean',
      email: 'jean.dupont@entreprise.com',
      contact: '+33 6 12 34 56 78',
      password: '********',
      profile: 'TPM',
      created_at: new Date('2024-01-15')
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
      } else {
        this.selectedTpmId = this.projet.tpm.id;
      }
    });
  }

  onSubmit(): void {
    if (this.isLoading || !this.projet) return;

    const selectedTpm = this.tpmUsers.find(u => u.id === this.selectedTpmId);
    if (!selectedTpm) {
      alert('Veuillez sélectionner un TPM');
      return;
    }

    this.isLoading = true;

    // Simuler une sauvegarde
    setTimeout(() => {
      console.log('Projet modifié:', { ...this.projet, tpm: selectedTpm });
      
      this.isLoading = false;
      this.router.navigate(['/projets']);
    }, 1500);
  }
}

