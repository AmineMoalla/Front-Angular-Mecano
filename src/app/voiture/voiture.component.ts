import { Component, OnInit } from '@angular/core';
import { VoitureService } from 'app/services/voiture.service';
import { ClientService } from 'app/services/client.service';

@Component({
  selector: 'app-voiture',
  templateUrl: './voiture.component.html',
  styleUrls: ['./voiture.component.css']
})
export class VoitureComponent implements OnInit {
  voitures: any[] = [];
  clients: any[] = [];
  showModal = false;
  imageFile: File | null = null;
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  voitureSelectionnee: any = {
    id: null,
    marque: '',
    modele: '',
    annee: '',
    client_id: null,
    img: '',
    matricule: ''
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
      id: null,
      marque: '',
      modele: '',
      annee: '',
      client_id: null,
      img: '',
      matricule: ''
    };
    this.imageFile = null;
    this.showModal = true;
  }

  ouvrirModalModification(voiture: any) {
    this.voitureSelectionnee = { ...voiture };
    this.imageFile = null;
    this.showModal = true;
  }
  // ouvrirModalModification(voiture: any) {
  //   this.voitureSelectionnee = { ...voiture };
  //   this.selectedFile = null;
  //   this.previewUrl = voiture.img ? `http://localhost:8000/storage/${voiture.img}` : null;
  //   this.showModal = true;
  // }
  

  fermerModal() {
    this.showModal = false;
    this.voitureSelectionnee = {
      id: null,
      marque: '',
      modele: '',
      annee: '',
      client_id: null,
      img: '',
      matricule: ''
    };
    this.imageFile = null;
  }

  // onFileSelected(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.imageFile = file;
  //   }
  // }

 
  
  // onFileSelected(event: any) {
  //   const file: File = event.target.files[0];
  //   if (file) {
  //     this.selectedFile = file;
  
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       this.previewUrl = reader.result;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
  
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
  
  

  // soumettreVoiture() {
  //   const formData = new FormData();
  //   formData.append('marque', this.voitureSelectionnee.marque);
  //   formData.append('modele', this.voitureSelectionnee.modele);
  //   formData.append('annee', this.voitureSelectionnee.annee);
  //   formData.append('client_id', this.voitureSelectionnee.client_id);
  //   formData.append('matricule', this.voitureSelectionnee.matricule);

  //   // if (this.imageFile) {
  //   //   formData.append('img', this.imageFile);
  //   // }
  //   if (this.selectedFile) {
  //     formData.append('img', this.selectedFile);
  //   }
    

  //   if (this.voitureSelectionnee.id) {
  //     this.voitureService.updateVoitureAvecFormData(this.voitureSelectionnee.id, formData).subscribe(() => {
  //       this.fermerModal();
  //       this.chargerVoitures();
  //     });
  //   } else {
  //     this.voitureService.ajouterVoitureAvecFormData(formData).subscribe(() => {
  //       this.fermerModal();
  //       this.chargerVoitures();
  //     });
  //   }
  // }

  soumettreVoiture() {
    if (this.voitureSelectionnee.id) {
      this.voitureService.updateVoitureAvecFormData(this.voitureSelectionnee.id, this.voitureSelectionnee).subscribe(() => {
        this.fermerModal();
        this.chargerVoitures();
        alert('Voiture mise à jour avec succès !');
      });
    } else {
      this.voitureService.ajouterVoitureAvecFormData(this.voitureSelectionnee).subscribe(() => {
        this.fermerModal();
        this.chargerVoitures();
        alert('Voiture ajoutée avec succès !');
      });
    }
  }
  
  supprimerVoiture(id: number | undefined) {
    if (!id) return;
    if (confirm('Confirmer la suppression de cette voiture ?')) {
      this.voitureService.supprimerVoiture(id).subscribe(() => this.chargerVoitures());
      alert('Voiture supprimée avec succès !');
    }
  }
}
