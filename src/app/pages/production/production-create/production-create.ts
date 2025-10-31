import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductionInfo } from '../../../models/production.model';

@Component({
  selector: 'app-production-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './production-create.html',
  styleUrls: ['./production-create.scss']
})
export class ProductionCreateComponent implements OnInit {
  project: Partial<ProductionInfo> = {
    numeroProjet: '',
    application: '',
    serviceDTI: 'R&D',
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

  // Liste des projets existants pour déterminer le prochain numéro
  private existingProjects = [
    { numeroProjet: 'R&D000001' },
    { numeroProjet: 'R&D000002' },
    { numeroProjet: 'R&D000003' }
  ];

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

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Initialiser les dates par défaut
    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    
    this.project.dateDebut = today;
    this.project.dateFinPrevue = nextMonth;
    
    // Générer le numéro de projet automatiquement
    this.generateProjectNumber();
  }

  // Méthode pour générer le numéro de projet
  private generateProjectNumber(): void {
    // Trouver le dernier numéro existant
    const lastNumber = this.getLastProjectNumber();
    const nextNumber = lastNumber + 1;
    const paddedNumber = nextNumber.toString().padStart(6, '0');
    this.project.numeroProjet = `R&D${paddedNumber}`;
  }

  // Méthode pour obtenir le dernier numéro de projet
  private getLastProjectNumber(): number {
    let maxNumber = 0;
    
    this.existingProjects.forEach(project => {
      const match = project.numeroProjet.match(/R&D(\d+)/);
      if (match) {
        const number = parseInt(match[1], 10);
        if (number > maxNumber) {
          maxNumber = number;
        }
      }
    });
    
    return maxNumber;
  }

  onSubmit(): void {
    if (this.isLoading) return;

    this.isLoading = true;

    // Simuler une sauvegarde
    setTimeout(() => {
      console.log('Projet créé:', this.project);
      
      // Ici vous pouvez ajouter la logique de sauvegarde
      // Par exemple, appeler un service pour sauvegarder en base de données
      
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
  formatDateForInput(date: Date): string {
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