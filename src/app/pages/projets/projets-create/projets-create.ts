import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Projet } from '../../../models/projet.model';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-projets-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './projets-create.html',
  styleUrls: ['./projets-create.scss']
})
export class ProjetsCreateComponent implements OnInit {
  projet: Partial<Projet> = {
    nom: '',
    description: '',
    created_at: new Date()
  };

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

  selectedTpmId: string = '';
  isLoading = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.isLoading) return;

    const selectedTpm = this.tpmUsers.find(u => u.id === this.selectedTpmId);
    if (!selectedTpm) {
      alert('Veuillez sélectionner un TPM');
      return;
    }

    this.isLoading = true;

    // Simuler une sauvegarde
    setTimeout(() => {
      console.log('Projet créé:', { ...this.projet, tpm: selectedTpm });
      
      this.isLoading = false;
      this.router.navigate(['/projets']);
    }, 1500);
  }
}

