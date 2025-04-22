import { Component, OnInit } from '@angular/core';
import { PieceService } from 'app/services/piece.service';


@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.css']  
})
export class PieceComponent implements OnInit {
  pieces: any[] = [];
  showModal = false;
  pieceSelectionnee: any = { nom: '', prix: 0 };

  constructor(private pieceService: PieceService) {}

  ngOnInit() {
    this.chargerPieces();
  }

  chargerPieces() {
    this.pieceService.getPieces().subscribe(data => this.pieces = data);
  }

  openModal() {
    this.pieceSelectionnee = { nom: '', prix: 0 };
    this.showModal = true;
  }

  ouvrirModalModification(piece: any) {
    this.pieceSelectionnee = { ...piece }; // clone
    this.showModal = true;
  }

  fermerModal() {
    this.showModal = false;
    this.pieceSelectionnee = { nom: '', prix: 0 };
  }

  soumettrePiece() {
    if (!this.pieceSelectionnee.reparation_id) {
      delete this.pieceSelectionnee.reparation_id;
    }
  
    if (this.pieceSelectionnee.id) {
      this.pieceService.modifierPiece(this.pieceSelectionnee).subscribe(() => {
        this.fermerModal();
        this.chargerPieces();
      });
    } else {
      this.pieceService.ajouterPiece(this.pieceSelectionnee).subscribe(() => {
        this.fermerModal();
        this.chargerPieces();
      });
    }
  }
  

  supprimerPiece(id: number | undefined) {
    if (!id) return;
    if (confirm('Confirmer la suppression ?')) {
      this.pieceService.supprimerPiece(id).subscribe(() => this.chargerPieces());
    }
  }
}
