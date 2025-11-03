import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { Application } from '../../../models/application.model';
import { Projet } from '../../../models/projet.model';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-applications-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './applications-edit.html',
  styleUrls: ['./applications-edit.scss']
})
export class ApplicationsEditComponent implements OnInit {
  application: Application | null = null;
  selectedProjetId: string = '';
  selectedDevId: string = '';
  selectedStacks: string[] = [];
  isStackDropdownOpen = false;
  
  isLoading = false;

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
      } else {
        this.selectedProjetId = this.application.projet.id;
        this.selectedDevId = this.application.dev.id;
        this.selectedStacks = [...this.application.stack];
      }
    });
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

  toggleStackDropdown(): void {
    this.isStackDropdownOpen = !this.isStackDropdownOpen;
  }

  closeStackDropdown(): void {
    this.isStackDropdownOpen = false;
  }

  getSelectedStacksDisplay(): string {
    if (this.selectedStacks.length === 0) {
      return 'Sélectionner des stacks';
    }
    if (this.selectedStacks.length === 1) {
      return this.selectedStacks[0];
    }
    return `${this.selectedStacks.length} stacks sélectionnées`;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.stack-dropdown-container')) {
      this.isStackDropdownOpen = false;
    }
  }

  onSubmit(): void {
    if (this.isLoading || !this.application) return;

    const selectedProjet = this.projets.find(p => p.id === this.selectedProjetId);
    const selectedDev = this.devUsers.find(u => u.id === this.selectedDevId);

    if (!selectedProjet || !selectedDev || this.selectedStacks.length === 0) {
      alert('Veuillez remplir tous les champs requis');
      return;
    }

    this.isLoading = true;

    // Simuler une sauvegarde
    setTimeout(() => {
      console.log('Application modifiée:', {
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

