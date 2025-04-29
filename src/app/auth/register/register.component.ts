import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from 'app/services/client.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  clientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialisation du formulaire avec les contrôles et leurs validations
    this.clientForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mdp: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      // Envoi des données au service pour ajouter le client
      this.clientService.ajouterClient(this.clientForm.value).subscribe(
        (response) => {
          // Redirige vers la page des clients après ajout
          this.router.navigate(['/clients']);
        },
        (error) => {
          // Gérer l'erreur si l'ajout échoue
          console.error('Erreur lors de l\'ajout du client:', error);
        }
      );
    }
  }
}
