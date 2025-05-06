import { Component, OnInit } from '@angular/core';
import { EmployeService } from 'app/services/employe.service';
import { ReparationService } from 'app/services/reparation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public pieChartData: { nom: string; nb_reparations: number; color: string; percentage: number }[] = [];
  public pieChartBackground: string = '';

  constructor(
    private employeService: EmployeService,
    private reparationService: ReparationService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.employeService.getEmployes().subscribe(employes => {
      this.reparationService.getAllReparations().subscribe(reparations => {
        const employeMap = new Map<number, { nom: string; nb_reparations: number }>();

        // Initialiser le compteur de réparations pour chaque employé
        for (let emp of employes) {
          employeMap.set(emp.id, { nom: emp.nom, nb_reparations: 0 });
        }

        // Compter les réparations
        for (let rep of reparations) {
          const id = rep.technicien_id;
          if (id && employeMap.has(id)) {
            employeMap.get(id)!.nb_reparations++;
          }
        }

        // Garder uniquement ceux avec réparations > 0
        const topEmployes = Array.from(employeMap.values())
          .filter(emp => emp.nb_reparations > 0)
          .sort((a, b) => b.nb_reparations - a.nb_reparations)
          .slice(0, 3); // Tu peux augmenter ce nombre si tu veux plus

        const totalRep = topEmployes.reduce((sum, emp) => sum + emp.nb_reparations, 0);

        this.pieChartData = topEmployes.map((emp, index) => {
          const percentage = (emp.nb_reparations / totalRep) * 100;
          const color = this.getColorForIndex(index);
          return { ...emp, color, percentage };
        });

        // Générer le conic-gradient
        let gradient = '';
        let startAngle = 0;
        for (let emp of this.pieChartData) {
          const endAngle = startAngle + emp.percentage;
          gradient += `${emp.color} ${startAngle}% ${endAngle}%, `;
          startAngle = endAngle;
        }
        this.pieChartBackground = `conic-gradient(${gradient.slice(0, -2)})`;
      });
    });
  }

  getColorForIndex(index: number): string {
    const colors = [
      '#FFCDD2', 
      '#EF5350', 
      '#F44336', 
      '#D32F2F', 
      '#B71C1C'  
    ];
    
    return colors[index % colors.length];
  }
}
