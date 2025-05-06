import { Component, OnInit } from '@angular/core';
import { PieceService } from 'app/services/piece.service';

interface PieceDetachee {
  id?: number;
  nom: string;
  prix: number;
  qtestock: number;
  reparation_id?: number | null;
}

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.css']
})
export class PieceComponent implements OnInit {
  pieces: PieceDetachee[] = [];
  showModal = false;
  pieceSelectionnee: PieceDetachee = this.initPiece();
  isLoading = false;
  errorMessage = '';
  piece!:any;

  constructor(private pieceService: PieceService) {}

  ngOnInit(): void {
    this.chargerPieces();
  }

  initPiece(): PieceDetachee {
    return {
      nom: '',
      prix: 0,
      qtestock: 0,
   
    };
  }

  chargerPieces(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.pieceService.getPieces().subscribe(
      (data) => {
        this.pieces = (data as PieceDetachee[]).map(piece =>
           ({ ...piece, qtestock: piece.qtestock ?? 0 })); // Assurez que qtestock est défini
        this.isLoading = false;
      },
      (err) => {
        this.errorMessage = 'Erreur lors du chargement des pièces';
        console.error(err);
        this.isLoading = false;
      }
    );
  }

  openModal(): void {
    this.pieceSelectionnee = this.initPiece();
    this.showModal = true;
  }

  ouvrirModalModification(piece: PieceDetachee): void {
    this.pieceSelectionnee = { ...piece };
    this.showModal = true;
  }

  fermerModal(): void {
    this.showModal = false;
    this.pieceSelectionnee = this.initPiece();
  }

  soumettrePiece(): void {
    if (this.pieceSelectionnee.id) {
      this.pieceService.modifierPiece(this.pieceSelectionnee).subscribe({
        next: () => {
          this.fermerModal();
          this.chargerPieces();
          alert('Pièce modifiée avec succès !');
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors de la modification';
          console.error(err);
        }
      });
    } else {
      this.pieceService.ajouterPiece(this.pieceSelectionnee).subscribe({
        next: () => {
          this.fermerModal();
          this.chargerPieces();
          alert('Pièce ajoutée avec succès !');
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors de l\'ajout';
          console.error(err);
        }
      });
    }
  }

  supprimerPiece(id?: number): void {
    if (!id) return;
    
    if (confirm('Êtes-vous sûr de vouloir supprimer cette pièce ?')) {
      this.pieceService.supprimerPiece(id).subscribe({
        next: () => {
          this.chargerPieces();
          alert('Pièce supprimée avec succès !');
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors de la suppression';
          console.error(err);
        }
      });
    }
  }
}