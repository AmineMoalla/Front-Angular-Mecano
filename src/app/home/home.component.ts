import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;
  userName: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Vérifiez si l'utilisateur est connecté
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    this.isLoggedIn = !!token;

    if (this.isLoggedIn && user) {
      this.userName = JSON.parse(user).prenom; // Récupérez le prénom de l'utilisateur
    }
  }

  logout(): void {
    // Supprimez les données de l'utilisateur du localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');

    // Redirigez vers la page de connexion
    this.isLoggedIn = false;
    this.userName = '';
    this.router.navigate(['/auth/login']);
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
      backToTop?.classList.add('show');
    } else {
      navbar?.classList.remove('scrolled');
      backToTop?.classList.remove('show');
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}