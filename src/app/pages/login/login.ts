import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  rememberMe: boolean = true;
  email: string = '';
  password: string = '';
  isLoading: boolean = false;

  constructor(private router: Router) {}

  async onSubmit() {
    if (this.email && this.password) {
      this.isLoading = true;
      
      try {
        // Logique de connexion
        // Simuler une requête API
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Marquer qu'une connexion vient d'être effectuée
        sessionStorage.setItem('justLoggedIn', 'true');
        
        // Pour l'instant, redirige simplement vers le dashboard
        this.router.navigate(['/dashboard']);
      } catch (error) {
        console.error('Erreur de connexion:', error);
      } finally {
        this.isLoading = false;
      }
    }
  }

  onSignup() {
    // TODO: Naviguer vers la page d'inscription ou ouvrir un modal
    console.log('Navigate to signup page');
    // this.router.navigate(['/signup']);
  }
}

