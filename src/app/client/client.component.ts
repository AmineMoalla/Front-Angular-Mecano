import { Component, OnInit } from '@angular/core';
import { ClientService } from 'app/services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  clients: any[] = [];
  showModal = false;
  clientSelectionne: any = { nom: '', prenom: '', email: '' };

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.chargerClients();
  }

  chargerClients() {
    this.clientService.getClients().subscribe(data => this.clients = data);
  }

  openModal() {
    this.clientSelectionne = { nom: '', prenom: '', email: '' };
    this.showModal = true;
  }

  ouvrirModalModification(client: any) {
    this.clientSelectionne = { ...client };
    this.showModal = true;
  }

  fermerModal() {
    this.showModal = false;
    this.clientSelectionne = { nom: '', prenom: '', email: '' };
  }

  soumettreClient() {
    if (this.clientSelectionne.id) {
      this.clientService.updateClient(this.clientSelectionne.id, this.clientSelectionne).subscribe(() => {
        this.fermerModal();
        this.chargerClients();
      });
    } else {
      this.clientService.ajouterClient(this.clientSelectionne).subscribe(() => {
        this.fermerModal();
        this.chargerClients();
      });
    }
  }

  supprimerClient(id: number | undefined) {
    if (!id) return;
    if (confirm('Confirmer la suppression de ce client ?')) {
      this.clientService.supprimerClient(id).subscribe(() => this.chargerClients());
    }
  }
}
