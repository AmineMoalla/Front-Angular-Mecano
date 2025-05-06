import { Component, OnInit } from '@angular/core';
import { ReparationService } from '../services/reparation.service';
import { VoitureService } from '../services/voiture.service'; // Service pour récupérer les voitures
import { PieceService } from '../services/piece.service'; // Service pour récupérer les pièces
import { Reparation } from 'reparation'; // ton modèle
import { EmployeService } from 'app/services/employe.service';

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
  reparationSelectionnee: any = { piece_ids: [] }; // Initialisation avec un tableau vide pour les pièces
  showModal: boolean = false;

  constructor(
    private reparationService: ReparationService,
    private voitureService: VoitureService,
    private technicienService: EmployeService,
    private pieceService: PieceService
  ) {}

  ngOnInit(): void {
    this.getReparations();
    this.getVoitures();
    this.getTechniciens();
    this.getPieces();
  }

  getReparations() {
    this.reparationService.getAllReparations().subscribe((data) => {
      this.reparations = data;
    });
  }

  getVoitures() {
    this.voitureService.getVoitures().subscribe((data) => {
      this.voitures = data;
    });
  }

  getTechniciens() {
    this.technicienService.getEmployes().subscribe((data) => {
      this.techniciens = data;
    });
  }

  getPieces() {
    this.pieceService.getPieces().subscribe((data) => {
      this.pieces = data;
    });
  }

  openModal() {
    this.showModal = true;
    this.reparationSelectionnee = { piece_ids: [] }; // Réinitialiser pour une nouvelle réparation
  }

  fermerModal() {
    this.showModal = false;
  }

  soumettreReparation() {
    const reparationData = {
      ...this.reparationSelectionnee,
      voiture_id: parseInt(this.reparationSelectionnee.voiture_id, 10),
      technicien_id: parseInt(this.reparationSelectionnee.technicien_id, 10),
      pieces: (this.reparationSelectionnee.piece_ids || []).map((id: any) => parseInt(id, 10)) // Convertir chaque ID en entier et utiliser "pieces"
    };
  
    console.log('Données envoyées au backend :', reparationData);
  
    if (this.reparationSelectionnee.id) {
      this.reparationService.updateReparation(reparationData).subscribe((updatedReparation) => {
        this.getReparations();
        this.fermerModal();
        alert('Réparation mise à jour avec succès !');
      });
    } else {
      this.reparationService.addReparation(reparationData).subscribe((newReparation) => {
        this.reparations.push(newReparation);
        this.fermerModal();
        alert('Réparation ajoutée avec succès !');
      }, (error) => {
        console.error('Erreur lors de l\'ajout de la réparation :', error);
      });
    }
  }

  ouvrirModalModification(reparation: any) {
    this.reparationSelectionnee = {
      ...reparation,
      piece_ids: reparation.pieces ? reparation.pieces.map((p: any) => p.id) : [] // Sélectionner les pièces associées
    };
    this.openModal();
  }

  supprimerReparation(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette réparation ?')) {
      this.reparationService.deleteReparation(id).subscribe(() => {
        this.getReparations();
        alert('Réparation supprimée avec succès !');
      });
    }
  }
}
