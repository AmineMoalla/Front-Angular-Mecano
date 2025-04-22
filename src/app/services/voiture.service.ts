import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoitureService {
  private apiUrl = 'http://localhost:8000/api/voitures';

  constructor(private http: HttpClient) {}

  getVoitures(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  ajouterVoiture(voiture: any): Observable<any> {
    return this.http.post(this.apiUrl, voiture);
  }

  updateVoiture(id: number, voiture: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, voiture);
  }

  supprimerVoiture(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
