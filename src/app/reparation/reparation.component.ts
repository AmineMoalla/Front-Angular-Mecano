import { Component, OnInit } from '@angular/core';
import { ReparationService } from '../services/reparation.service';
import { Reparation } from 'reparation';

@Component({
  selector: 'app-reparation',
  templateUrl: './reparation.component.html',
  styleUrls: ['./reparation.component.css']
})
export class ReparationComponent implements OnInit {
  reparations: Reparation[] = [];
  voitures: any[] = [];
  techniciens: any[] = [];
  pieces: any[] = [];
  reparationSelectionnee: Reparation = new Reparation();
  showModal: boolean = false;

  constructor(private reparationService: ReparationService) {}

  ngOnInit(): void {
    this.getReparations();
    this.getVoitures();
    this.getTechniciens();
    this.getPieces();
  }

  // Méthode pour récupérer les réparations
  getReparations() {
    this.reparationService.getAllReparations().subscribe((data) => {
      this.reparations = data;
    });
  }
  

  // Méthode pour récupérer les voitures
  getVoitures() {
    this.reparationService.getVoitures().subscribe((data) => {
      this.voitures = data;
    });
  }

  // Méthode pour récupérer les techniciens
  getTechniciens() {
    this.reparationService.getTechniciens().subscribe((data) => {
      this.techniciens = data;
    });
  }

  // Méthode pour récupérer les pièces détachées
  getPieces() {
    this.reparationService.getPieces().subscribe((data) => {
      this.pieces = data;
    });
  }

  // Ouvrir la modale pour ajouter une réparation
  openModal() {
    this.showModal = true;
    this.reparationSelectionnee = new Reparation(); // Réinitialiser la réparation
  }

  // Fermer la modale
  fermerModal() {
    this.showModal = false;
  }

  // Soumettre la réparation (ajouter ou modifier)
  soumettreReparation() {
    if (this.reparationSelectionnee.id) {
      this.reparationService.updateReparation(this.reparationSelectionnee).subscribe(() => {
        this.getReparations(); // Récupère toutes les réparations après modification
        this.fermerModal();
      });
    } else {
      this.reparationService.addReparation(this.reparationSelectionnee).subscribe((newReparation) => {
        this.reparations.push(newReparation); // Ajoute la nouvelle réparation au tableau local
        this.fermerModal();
      });
    }
  }
  
  // Modifier une réparation
  ouvrirModalModification(reparation: Reparation) {
    this.reparationSelectionnee = { ...reparation };
    this.openModal();
  }

  // Supprimer une réparation
  supprimerReparation(id: number) {
    this.reparationService.deleteReparation(id).subscribe(() => {
      this.getReparations();
    });
  }
}
