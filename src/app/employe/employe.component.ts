import { Component, OnInit } from '@angular/core';
import { EmployeService } from 'app/services/employe.service';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.css']
})
export class EmployeComponent implements OnInit {
  employes: any[] = [];
  showModal = false;
  employeSelectionne: any = { nom: '', prenom: '', poste: '', salaire: 0 };

  constructor(private employeService: EmployeService) {}

  ngOnInit() {
    this.chargerEmployes();
  }

  chargerEmployes() {
    this.employeService.getEmployes().subscribe(data => this.employes = data);
  }

  openModal() {
    this.employeSelectionne = { nom: '', prenom: '', poste: '', salaire: 0 };
    this.showModal = true;
  }

  ouvrirModalModification(employe: any) {
    this.employeSelectionne = { ...employe }; 
    this.showModal = true;
  }

  fermerModal() {
    this.showModal = false;
    this.employeSelectionne = { nom: '', prenom: '', poste: '', salaire: 0 };
  }

  soumettreEmploye() {
    if (this.employeSelectionne.id) {
      // Update existing
      this.employeService.updateEmploye(this.employeSelectionne.id, this.employeSelectionne)
        .subscribe({
          next: () => {
            this.fermerModal();
            this.chargerEmployes();
          },
          error: (err) => console.error('Update failed', err)
        });
    } else {
      // Create new
      this.employeService.ajouterEmploye(this.employeSelectionne)
        .subscribe({
          next: () => {
            this.fermerModal();
            this.chargerEmployes();
          },
          error: (err) => console.error('Creation failed', err)
        });
    }
  }

  supprimerEmploye(id: number | undefined) {
    if (!id) return;
    if (confirm('Confirmer la suppression de cet employé ?')) {
      this.employeService.supprimerEmploye(id).subscribe(() => this.chargerEmployes());
    }
  }
}
