import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { ProductionInfo } from '../../../models/production.model';
import { ProductionService } from '../../../services/production.service';

@Component({
  selector: 'app-production-detail',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterLink],
  templateUrl: './production-detail.html',
  styleUrls: ['./production-detail.scss']
})
export class ProductionDetailComponent implements OnInit {
  project: ProductionInfo | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productionService: ProductionService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const projectId = params['id'];
      this.project = this.productionService.getProjectById(projectId);
      
      // Si le projet n'existe pas, rediriger vers la liste
      if (!this.project) {
        this.router.navigate(['/production']);
      }
    });
  }

  getStatutBadgeClass(statut: string): string {
    switch (statut) {
      case 'OK':
        return 'bg-green-100 text-green-800';
      case 'En cours':
        return 'bg-yellow-100 text-yellow-800';
      case 'NOK':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getStatutIconClass(statut: string): string {
    switch (statut) {
      case 'OK':
        return 'bg-green-100';
      case 'En cours':
        return 'bg-yellow-100';
      case 'NOK':
        return 'bg-red-100';
      default:
        return 'bg-gray-100';
    }
  }

  getStatutIcon(statut: string): string {
    switch (statut) {
      case 'OK':
        return 'fas fa-check-circle text-green-600';
      case 'En cours':
        return 'fas fa-clock text-yellow-600';
      case 'NOK':
        return 'fas fa-times-circle text-red-600';
      default:
        return 'fas fa-question-circle text-gray-600';
    }
  }
}