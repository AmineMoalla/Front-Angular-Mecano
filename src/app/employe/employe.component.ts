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
    this.employeSelectionne = { ...employe }; // clone
    this.showModal = true;
  }

  fermerModal() {
    this.showModal = false;
    this.employeSelectionne = { nom: '', prenom: '', poste: '', salaire: 0 };
  }

  soumettreEmploye() {
   
      this.employeService.updateEmploye(this.employeSelectionne.id, this.employeSelectionne).subscribe(() => {
        this.fermerModal();
        this.chargerEmployes();
      });
  }

  supprimerEmploye(id: number | undefined) {
    if (!id) return;
    if (confirm('Confirmer la suppression de cet employé ?')) {
      this.employeService.supprimerEmploye(id).subscribe(() => this.chargerEmployes());
    }
  }
}
