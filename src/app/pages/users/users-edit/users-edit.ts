import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-users-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './users-edit.html',
  styleUrls: ['./users-edit.scss']
})
export class UsersEditComponent implements OnInit {
  user: User | null = null;
  isLoading = false;

  // Données factices pour l'exemple
  private usersData: User[] = [
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

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = params['id'];
      this.user = this.usersData.find(u => u.id === userId) || null;
      
      if (!this.user) {
        this.router.navigate(['/users']);
      }
    });
  }

  onSubmit(): void {
    if (this.isLoading || !this.user) return;

    if (!this.user.nom || !this.user.email || !this.user.contact || !this.user.profile) {
      alert('Veuillez remplir tous les champs requis');
      return;
    }

    this.isLoading = true;

    // Simuler une sauvegarde
    setTimeout(() => {
      console.log('Utilisateur modifié:', this.user);
      
      this.isLoading = false;
      this.router.navigate(['/users']);
    }, 1500);
  }
}

