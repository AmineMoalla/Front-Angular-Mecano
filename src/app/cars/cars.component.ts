import { Component, OnInit } from '@angular/core';
import { VoitureService } from '../services/voiture.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  cars: any[] = []; // Tableau pour stocker les voitures
  selectedCar: any = null; // Voiture sélectionnée
  errorMessage: string = ''; // Message d'erreur

  constructor(private voitureService: VoitureService) {}

  ngOnInit(): void {
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
  }

  selectCar(car: any): void {
    this.selectedCar = car; // Stocker la voiture sélectionnée
  }

  clearSelection(): void {
    this.selectedCar = null; // Réinitialiser la sélection
  }
}