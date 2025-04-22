import { Component, OnInit } from '@angular/core';
import { EmployeService } from 'app/services/employe.service';


@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html'
})
export class TableListComponent implements OnInit {
  employes: any[] = [];
  showModal: boolean = false;

  nouvelEmploye = {
    nom: '',
    prenom: '',
    poste: '',
    salaire: null
  };

  constructor(private employeService: EmployeService) {}

  ngOnInit(): void {
    this.getEmployes();
  }

  getEmployes() {
    this.employeService.getEmployes().subscribe(data => {
      this.employes = data;
    });
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.resetForm();
  }

  ajouterEmploye() {
    this.employeService.ajouterEmploye(this.nouvelEmploye).subscribe(() => {
      this.getEmployes();
      this.closeModal();
    });
  }

  resetForm() {
    this.nouvelEmploye = {
      nom: '',
      prenom: '',
      poste: '',
      salaire: null
    };
  }
}
