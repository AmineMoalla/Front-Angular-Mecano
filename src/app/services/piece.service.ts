import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Piece {
  id?: number;
  nom: string;
  prix: number;
  reparation_id?: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class PieceService {
  private apiUrl = 'http://localhost:8000/api/pieces';

  constructor(private http: HttpClient) {}

  getPieces(): Observable<Piece[]> {
    return this.http.get<Piece[]>(this.apiUrl);
  }

  ajouterPiece(piece: Piece): Observable<Piece> {
    return this.http.post<Piece>(this.apiUrl, piece);
  }

  modifierPiece(piece: Piece): Observable<Piece> {
    return this.http.put<Piece>(`${this.apiUrl}/${piece.id}`, piece);
  }
  
  supprimerPiece(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
}
