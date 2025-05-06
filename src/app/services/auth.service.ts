import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/login'; 
  
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{ token: string; user: { id: number; role: string; [key: string]: any } }> {
    // Envoyer "mdp" au lieu de "password"
    console.log('Données envoyées au backend :', { email, mdp: password });
    return this.http.post<{ token: string; user: { id: number; role: string; [key: string]: any } }>(this.apiUrl, { email, mdp: password });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
  }

  isAuthenticated(): boolean {
    // Vérifiez si l'utilisateur est connecté (par exemple, via un token dans le localStorage)
    return !!localStorage.getItem('token');
  }

  getUserName(): string {
    // Récupérez le nom de l'utilisateur (par exemple, depuis le localStorage ou un objet utilisateur)
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.name ;
  }

}
