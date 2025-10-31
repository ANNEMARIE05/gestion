import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-users-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './users-create.html',
  styleUrls: ['./users-create.scss']
})
export class UsersCreateComponent implements OnInit {
  user: Partial<User> = {
    nom: '',
    email: '',
    contact: '',
    profile: 'TPM',
    created_at: new Date()
  };

  isLoading = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.isLoading) return;

    if (!this.user.nom || !this.user.email || !this.user.contact || !this.user.profile) {
      alert('Veuillez remplir tous les champs requis');
      return;
    }

    this.isLoading = true;

    // Simuler une sauvegarde
    setTimeout(() => {
      console.log('Utilisateur créé:', this.user);
      
      this.isLoading = false;
      this.router.navigate(['/users']);
    }, 1500);
  }
}

