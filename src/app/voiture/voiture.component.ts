import { Component, OnInit } from '@angular/core';
import { VoitureService } from 'app/services/voiture.service';
import { ClientService } from 'app/services/client.service'; // pour les clients associés

@Component({
  selector: 'app-voiture',
  templateUrl: './voiture.component.html',
  styleUrls: ['./voiture.component.css']
})
export class VoitureComponent implements OnInit {
  voitures: any[] = [];
  clients: any[] = [];
  showModal = false;
  voitureSelectionnee: any = {
    marque: '',
    modele: '',
    annee: '',
    client_id: null
  };

  constructor(private voitureService: VoitureService, private clientService: ClientService) {}

  ngOnInit() {
    this.chargerVoitures();
    this.clientService.getClients().subscribe(data => this.clients = data);
  }

  chargerVoitures() {
    this.voitureService.getVoitures().subscribe(data => this.voitures = data);
  }

  openModal() {
    this.voitureSelectionnee = {
      marque: '',
      modele: '',
      annee: '',
      client_id: null
    };
    this.showModal = true;
  }

  ouvrirModalModification(voiture: any) {
    this.voitureSelectionnee = { ...voiture };
    this.showModal = true;
  }

  fermerModal() {
    this.showModal = false;
    this.voitureSelectionnee = {
      marque: '',
      modele: '',
      annee: '',
      client_id: null
    };
  }

  soumettreVoiture() {
    if (this.voitureSelectionnee.id) {
      this.voitureService.updateVoiture(this.voitureSelectionnee.id, this.voitureSelectionnee).subscribe(() => {
        this.fermerModal();
        this.chargerVoitures();
      });
    } else {
      this.voitureService.ajouterVoiture(this.voitureSelectionnee).subscribe(() => {
        this.fermerModal();
        this.chargerVoitures();
      });
    }
  }

  supprimerVoiture(id: number | undefined) {
    if (!id) return;
    if (confirm('Confirmer la suppression de cette voiture ?')) {
      this.voitureService.supprimerVoiture(id).subscribe(() => this.chargerVoitures());
    }
  }
}
