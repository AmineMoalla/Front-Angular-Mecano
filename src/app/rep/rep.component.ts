import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ReparationService } from '../services/reparation.service';

@Component({
  selector: 'app-rep',
  templateUrl: './rep.component.html',
  styleUrls: ['./rep.component.css']
})
export class RepComponent implements OnInit {
  @Input() car: any; // Voiture sélectionnée
  @Output() back = new EventEmitter<void>(); // Événement pour revenir à la liste des voitures

  reparations: any[] = [];
  errorMessage: string = '';

  constructor(private reparationService: ReparationService) {}

  ngOnInit(): void {
    if (this.car) {
      this.reparationService.getReparationsByCarId(this.car.id).subscribe({
        next: (reparations) => {
          this.reparations = reparations;
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des réparations :', error);
          this.errorMessage = 'Impossible de récupérer les réparations.';
        }
      });
    }
  }

  goBack(): void {
    this.back.emit(); // Émettre l'événement pour revenir à la liste
  }
}