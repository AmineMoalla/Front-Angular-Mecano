import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reparation } from 'reparation';



@Injectable({
  providedIn: 'root'
})
export class ReparationService {
  private baseUrl = 'http://localhost:8000/api/reparations'; // Remplacer par l'URL de ton API

  constructor(private http: HttpClient) {}

  // Récupérer toutes les réparations
  getAllReparations(): Observable<Reparation[]> {
    return this.http.get<Reparation[]>(`${this.baseUrl}`);
  }

  // Ajouter une réparation
  addReparation(reparation: Reparation): Observable<Reparation> {
    return this.http.post<Reparation>(this.baseUrl, reparation);
  }

  // Mettre à jour une réparation
  updateReparation(reparation: Reparation): Observable<Reparation> {
    return this.http.put<Reparation>(`${this.baseUrl}/${reparation.id}`, reparation);
  }

  // Supprimer une réparation
  deleteReparation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Récupérer toutes les voitures
  getVoitures(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8000/api/voitures');
  }

  // Récupérer tous les techniciens
  getTechniciens(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8000/api/employes');
  }

  // Récupérer toutes les pièces
  getPieces(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8000/api/pieces');
  }

  getReparationsByCarId(carId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/car/${carId}`);
  }
}
