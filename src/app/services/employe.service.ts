import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  private apiUrl = 'http://localhost:8000/api/employes';

  constructor(private http: HttpClient) {}

  getEmployes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  ajouterEmploye(employe: any): Observable<any> {
    return this.http.post(this.apiUrl, employe);
  }

  updateEmploye(id: number, employe: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, employe);
  }
  
  supprimerEmploye(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
}
