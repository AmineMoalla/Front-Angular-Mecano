import { Injectable } from "@angular/core";
import { combineLatest, map, Observable } from "rxjs";
import { VoitureService } from "./voiture.service";
import { ReparationService } from "./reparation.service";

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(
    private voitureService: VoitureService,
    private reparationService: ReparationService
  ) {}

  getVoituresByReparations(): Observable<any[]> {
    return combineLatest([
      this.voitureService.getVoitures(),
      this.reparationService.getAllReparations()
    ]).pipe(
      map(([voitures, reparations]) => {
        // Créer un map des comptages
        const counts = new Map<number, number>();
        reparations.forEach(rep => {
          counts.set(rep.voiture_id, (counts.get(rep.voiture_id) || 0) + 1);
        });

        // Associer aux voitures
        return voitures.map(v => ({
          ...v,
          reparationsCount: counts.get(v.id) || 0
        }))
        // Trier par nombre de réparations (descendant)
        .sort((a, b) => b.reparationsCount - a.reparationsCount);
      })
    );
  }
}