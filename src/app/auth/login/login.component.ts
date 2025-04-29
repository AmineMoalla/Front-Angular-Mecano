import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid || this.isLoading) return;
  
    this.isLoading = true;
    this.errorMessage = '';
    const { email, password } = this.loginForm.value;
  
    this.authService.login(email, password).subscribe({
      next: (response) => {
        const token = response.token;
        const user = response.user;
  
        if (!token || !user) {
          this.errorMessage = 'Réponse invalide du serveur';
          this.isLoading = false;
          return;
        }
  
        // Stocker le token, l'id et les informations utilisateur
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('userId', user.id.toString()); // Stocker l'id de l'utilisateur
  
        // Redirection en fonction du rôle de l'utilisateur
        if (user.role === 'admin') {
          this.router.navigate(['/dashboard']); // Redirige vers le tableau de bord pour les administrateurs
        } else {
          this.router.navigate(['/home']); // Redirige vers la page d'accueil pour les autres utilisateurs
        }
      },
      error: (error) => {
        this.isLoading = false;
        if (error.status === 401) {
          this.errorMessage = 'Email ou mot de passe incorrect.';
        } else if (error.status === 500) {
          this.errorMessage = 'Erreur interne du serveur.';
        } else {
          this.errorMessage = 'Erreur de connexion. Veuillez réessayer.';
        }
        console.error('Erreur lors de la connexion :', error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  
    console.log('Données envoyées au backend :', { email, mdp: password });
  }
}