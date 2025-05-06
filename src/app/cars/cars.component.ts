import { Component, OnInit } from '@angular/core';
import { VoitureService } from '../services/voiture.service';
import { AuthService } from '../services/auth.service'; // Importer AuthService pour vérifier la connexion
import { Router } from '@angular/router';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  cars: any[] = []; // Tableau pour stocker les voitures
  selectedCar: any = null; // Voiture sélectionnée
  errorMessage: string = ''; // Message d'erreur
  isLoggedIn: boolean = false; // Vérification de la connexion
  userName: string = ''; // Nom de l'utilisateur connecté

  constructor(
    private voitureService: VoitureService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Vérifiez si l'utilisateur est connecté
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    this.isLoggedIn = !!token;

    if (this.isLoggedIn && user) {
      this.userName = JSON.parse(user).prenom; // Récupérez le prénom de l'utilisateur
      const userId = localStorage.getItem('userId');
      if (userId) {
        const clientId = parseInt(userId, 10);
        this.voitureService.getVoituresByClientId(clientId).subscribe({
          next: (voitures) => {
            this.cars = voitures;
          },
          error: (error) => {
            console.error('Erreur lors de la récupération des voitures :', error);
            this.errorMessage = 'Impossible de récupérer les voitures.';
          }
        });
      } else {
        this.errorMessage = 'Utilisateur non authentifié.';
      }
    } else {
      this.errorMessage = 'Veuillez vous connecter pour accéder à vos voitures.';
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

  selectCar(car: any): void {
    this.selectedCar = car; // Stocker la voiture sélectionnée
  }

  clearSelection(): void {
    this.selectedCar = null; // Réinitialiser la sélection
  }
}