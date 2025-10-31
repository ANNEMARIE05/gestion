import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { ProductionInfo } from '../../../models/production.model';
import { ProductionService } from '../../../services/production.service';

@Component({
  selector: 'app-production-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './production-edit.html',
  styleUrls: ['./production-edit.scss']
})
export class ProductionEditComponent implements OnInit {
  project: Partial<ProductionInfo> = {
    numeroProjet: '',
    application: '',
    serviceDTI: '',
    responsable: '',
    typeProduction: '',
    dateDebut: new Date(),
    dateFinPrevue: new Date(),
    etatAvancement: 0,
    jalonsCles: '',
    problemesRencontres: '',
    actionsCorrectives: '',
    statut: 'En cours',
    dateFinReelle: undefined,
    commentaires: '',
    dateCreation: new Date(),
    dateMiseAJour: new Date(),
    documents: [],
    tags: []
  };

  isLoading = false;

  // Services DTI disponibles
  servicesDTI = [
    'R&D'
  ];

  // Responsables disponibles (liste dédoublonnée)
  responsables = [
    'Zeinab Mint',
    'Ibrahim KONATE',
    'Mermoz Konan',
    'Gautier Tiehoule',
    'Joel Kouassi',
    'Aziz Diomande',
    'TOURE ABDOUL JUNIOR',
    'Moïse Dekotchy',
    'Patrick Kamelan',
    'Yed SEKE',
    'Douada Diarra',
    'Arouna SIDIBE',
    'Anne Marie OGBONOU',
    'KOFFI Othniel',
    'Diarrassouba Yacouba',
    'Fabrice OGOU',
    'Moise De Kotchy',
    'Christian DJEA',
    'ISMAËL AZIZ DIOMANDE',
    'PATRICK WILFRIED KAMELAN'
  ];

  // Applications disponibles (liste dédoublonnée)
  applications = [
    'GATEWAY SMS',
    'MUCREFCI',
    'LA POSTE CNAM',
    'GATEWAY',
    'RESTO TRESOR',
    'BRIDGE SECURITIES - BACKOFFICE',
    'BRIDGE SECURITIES - FRONTOFFICE',
    'BRIDGE SECURITIES - MOBILE',
    'BRIDGE SECURITIES - BACKEND',
    'API CNAM',
    'BEEP SANTE',
    'PAYMONEY WEB',
    'CNAM WEB',
    'CONTRAVENTION WEB',
    'DECLARATION GUINEE WEB',
    'REDEVANCE GUINEE WEB',
    'PAYMONEY MOBILE',
    'CONTRAVENTION USSD',
    'CONTRAVENTION BACKEND',
    'REDEVANCE GUINEE USSD',
    'GETSUP',
    'NGSYS',
    'CONTRAVENTION WEB',
    'DECLARATION GUINEE WEB',
    'REDEVANCE GUINEE WEB - Intégration API',
    'OCR BO - Frontend',
    'OCR BO - Backend',
    'Gateway Monétique - Routine - wave CI',
    'Gateway Monétique - Routine - Orange CI',
    'Webservice ( Gestion des reclamations et paiement CNAM et DOUANE )',
    'DOUANE Backend',
    'DOUANE - Backoffice',
    'GATEWAY Monétique - Routine - MTN CI',
    'GATEWAY Monétique - Routine - Orange Guinee',
    'DECLARATION/REDEVANCE GUINEE WEB',
    'LA POSTE CNAM',
    'CONTRAVENTION / DECLARATION GUINEE WEB - Intégration API',
    'Module prépayé CNAM',
    'Backoffice CNAM',
    'PAYMONEY - BACKEND',
    'PAYMONEY - FRONTEND',
    'PAYMONEY - MOBILE',
    'ONECI-BACKEND',
    'ONECI-BACKEND-E-AGENCE',
    'ONECI-BACKOFFICE',
    'ONECI-BACKOFFICE prépayé'
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productionService: ProductionService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const projectId = params['id'];
      const existingProject = this.productionService.getProjectById(projectId);
      
      if (existingProject) {
        // Copier les données existantes dans le formulaire
        this.project = { ...existingProject };
      } else {
        // Rediriger vers la liste si le projet n'existe pas
        this.router.navigate(['/production']);
      }
    });
  }

  onSubmit(): void {
    if (this.isLoading) return;

    this.isLoading = true;

    // Simuler une sauvegarde
    setTimeout(() => {
      console.log('Projet modifié:', this.project);
      
      // Mettre à jour le projet via le service
      if (this.project.id) {
        this.productionService.updateProject(this.project as ProductionInfo);
      }
      
      this.isLoading = false;
      
      // Rediriger vers la liste des projets
      this.router.navigate(['/production']);
    }, 1500);
  }

  // Méthode pour valider les dates
  validateDates(): boolean {
    if (this.project.dateDebut && this.project.dateFinPrevue) {
      return this.project.dateDebut <= this.project.dateFinPrevue;
    }
    return true;
  }

  // Méthode pour formater la date pour l'input
  formatDateForInput(date: Date | undefined): string {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  }

  // Méthode pour convertir la date string en Date
  onDateChange(dateString: string, field: 'dateDebut' | 'dateFinPrevue' | 'dateFinReelle'): void {
    if (dateString) {
      this.project[field] = new Date(dateString);
    } else {
      this.project[field] = undefined;
    }
  }
}
