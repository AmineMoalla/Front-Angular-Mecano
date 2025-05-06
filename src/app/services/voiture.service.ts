import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';
import { ReparationService } from './reparation.service';

@Injectable({
  providedIn: 'root'
})
export class VoitureService {
   private apiUrl = 'http://localhost:8000/api/voitures';
  
  // constructor(private http: HttpClient) {}

  // getVoitures(): Observable<any[]> {
  //   return this.http.get<any[]>(this.apiUrl);
  // }

  // ajouterVoiture(voiture: any): Observable<any> {
  //   return this.http.post(this.apiUrl, voiture);
  // }

  // updateVoiture(id: number, voiture: any): Observable<any> {
  //   return this.http.put(`${this.apiUrl}/${id}`, voiture);
  // }

  // supprimerVoiture(id: number): Observable<any> {
  //   return this.http.delete(`${this.apiUrl}/${id}`);
  // }



  constructor(private http: HttpClient, private repser:ReparationService) {}

  getVoitures(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  ajouterVoitureAvecFormData(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  updateVoitureAvecFormData(id: number, formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}?_method=PUT`, formData); // méthode spoofing PUT
  }

  supprimerVoiture(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getVoituresByClientId(clientId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/client/${clientId}`);
  }
  getVoituresWithReparations(): Observable<any[]> {
    return forkJoin({
      voitures: this.http.get<any[]>(this.apiUrl),
      reparations: this.repser.getAllReparations()
    }).pipe(
      map(({voitures, reparations}) => {
        // Compter les réparations par voiture
        const reparationsCount = reparations.reduce((acc, reparation) => {
          acc[reparation.voiture_id] = (acc[reparation.voiture_id] || 0) + 1;
          return acc;
        }, {});

        // Fusionner avec les données des voitures
        return voitures.map(voiture => ({
          ...voiture,
          reparationsCount: reparationsCount[voiture.id] || 0
        }));
      })
    );
  }
  
}
