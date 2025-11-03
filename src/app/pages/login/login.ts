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
  showPassword: boolean = false;

  constructor(private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async onSubmit(event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    // Empêcher la soumission du formulaire si les champs sont vides
    if (!this.email || !this.password) {
      return;
    }

    this.isLoading = true;
    
    try {
      // Logique de connexion
      // Simuler une requête API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirige vers le dashboard avec navigateByUrl qui est plus fiable
      await this.router.navigateByUrl('/dashboard');
      
      // Une fois la navigation réussie, isLoading restera true jusqu'à ce que la nouvelle page se charge
      // Mais comme on change de page, on peut laisser isLoading à true
    } catch (error) {
      console.error('Erreur de connexion ou redirection:', error);
      this.isLoading = false;
    }
  }

  onSignup() {
    // TODO: Naviguer vers la page d'inscription ou ouvrir un modal
    console.log('Navigate to signup page');
    // this.router.navigate(['/signup']);
  }

  onForgotPassword() {
    // TODO: Naviguer vers la page de récupération de mot de passe ou ouvrir un modal
    console.log('Forgot password clicked');
    alert('Fonctionnalité de récupération de mot de passe à venir');
    // this.router.navigate(['/forgot-password']);
  }
}

