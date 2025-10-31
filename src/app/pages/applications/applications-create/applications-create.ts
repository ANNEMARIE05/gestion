import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Application } from '../../../models/application.model';
import { Projet } from '../../../models/projet.model';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-applications-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './applications-create.html',
  styleUrls: ['./applications-create.scss']
})
export class ApplicationsCreateComponent implements OnInit {
  application: Partial<Application> = {
    nom: '',
    stack: [],
    livrable: '',
    created_at: new Date()
  };

  selectedProjetId: string = '';
  selectedDevId: string = '';
  selectedStacks: string[] = [];
  
  isLoading = false;

  // Données factices
  projets: Projet[] = [
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
    }
  ];

  devUsers: User[] = [
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
      id: '4',
      nom: 'Dubois Sophie',
      email: 'sophie.dubois@entreprise.com',
      contact: '+33 6 45 67 89 01',
      password: '********',
      profile: 'DEV',
      created_at: new Date('2024-01-25')
    }
  ];

  availableStacks = ['react', 'angular', 'java', 'html', 'php'];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toggleStack(stack: string): void {
    const index = this.selectedStacks.indexOf(stack);
    if (index > -1) {
      this.selectedStacks.splice(index, 1);
    } else {
      this.selectedStacks.push(stack);
    }
  }

  isStackSelected(stack: string): boolean {
    return this.selectedStacks.includes(stack);
  }

  onSubmit(): void {
    if (this.isLoading) return;

    const selectedProjet = this.projets.find(p => p.id === this.selectedProjetId);
    const selectedDev = this.devUsers.find(u => u.id === this.selectedDevId);

    if (!selectedProjet || !selectedDev || this.selectedStacks.length === 0) {
      alert('Veuillez remplir tous les champs requis');
      return;
    }

    this.isLoading = true;

    // Simuler une sauvegarde
    setTimeout(() => {
      console.log('Application créée:', {
        ...this.application,
        projet: selectedProjet,
        dev: selectedDev,
        stack: this.selectedStacks as any[]
      });
      
      this.isLoading = false;
      this.router.navigate(['/applications']);
    }, 1500);
  }
}

