import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss']
})
export class ProfileComponent implements OnInit {
  user = {
    nom: 'Anne Marie',
    email: 'tom.cook@entreprise.com',
    contact: '+33 6 12 34 56 78',
    profile: 'TEAM LEAD',
    created_at: new Date('2024-01-15'),
    avatar: 'https://ui-avatars.com/api/?name=User&background=9ca3af&color=fff&size=128'
  };

  passwordData = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  isChangingPassword = false;

  constructor() { }

  ngOnInit(): void {
  }

  saveProfile(): void {
    // Logic to save profile changes
    console.log('Profile saved:', this.user);
    alert('Profil enregistré avec succès');
  }

  changePassword(): void {
    if (!this.passwordData.oldPassword || !this.passwordData.newPassword || !this.passwordData.confirmPassword) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    if (this.passwordData.newPassword.length < 6) {
      alert('Le nouveau mot de passe doit contenir au moins 6 caractères');
      return;
    }

    this.isChangingPassword = true;

    // Simuler une mise à jour du mot de passe
    setTimeout(() => {
      console.log('Password changed');
      this.isChangingPassword = false;
      this.passwordData = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      };
      alert('Mot de passe modifié avec succès');
    }, 1500);
  }
}

