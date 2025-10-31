import { Injectable } from '@angular/core';
import { ProductionInfo } from '../models/production.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductionService {
  private projectsSubject = new BehaviorSubject<ProductionInfo[]>([]);
  public projects$ = this.projectsSubject.asObservable();

  constructor() {
    // Initialiser avec les données de test
    this.initializeData();
  }

  private initializeData(): void {
    const initialProjects: ProductionInfo[] = [
      {
        id: '1',
        numeroProjet: 'R&D000001',
        application: 'GATEWAY SMS',
        serviceDTI: 'R&D',
        responsable: 'Ibrahim KONATE',
        typeProduction: 'Application Web',
        dateDebut: new Date('2024-01-15'),
        dateFinPrevue: new Date('2024-12-15'),
        etatAvancement: 75,
        jalonsCles: 'Phase 1 terminée avec succès, Phase 2 en cours de développement',
        problemesRencontres: 'Problèmes de connectivité avec certains opérateurs télécoms',
        actionsCorrectives: 'Mise en place d\'un système de retry automatique et optimisation des timeouts',
        statut: 'En cours',
        dateFinReelle: undefined,
        commentaires: 'Projet en bonne progression, tests d\'intégration prévus pour novembre',
        dateCreation: new Date('2024-01-15'),
        dateMiseAJour: new Date('2024-10-15'),
        documents: [],
        tags: ['SMS', 'Gateway', 'Télécoms']
      },
      {
        id: '2',
        numeroProjet: 'R&D000002',
        application: 'PAYMONEY WEB',
        serviceDTI: 'R&D',
        responsable: 'Zeinab Mint',
        typeProduction: 'Application Web',
        dateDebut: new Date('2024-02-20'),
        dateFinPrevue: new Date('2024-11-20'),
        etatAvancement: 100,
        jalonsCles: 'Développement terminé, tests de sécurité validés, déploiement en production réussi',
        problemesRencontres: 'Aucun problème majeur rencontré',
        actionsCorrectives: 'N/A',
        statut: 'OK',
        dateFinReelle: new Date('2024-10-20'),
        commentaires: 'Projet livré avec succès, application opérationnelle et utilisée par les clients',
        dateCreation: new Date('2024-02-20'),
        dateMiseAJour: new Date('2024-10-20'),
        documents: [],
        tags: ['Paiement', 'Web', 'Fintech']
      },
      {
        id: '3',
        numeroProjet: 'R&D000003',
        application: 'BEEP SANTE',
        serviceDTI: 'R&D',
        responsable: 'Joel Kouassi',
        typeProduction: 'Application Mobile',
        dateDebut: new Date('2024-03-10'),
        dateFinPrevue: new Date('2024-12-10'),
        etatAvancement: 45,
        jalonsCles: 'Architecture définie, développement des modules de base en cours',
        problemesRencontres: 'Retards dans l\'intégration avec les systèmes hospitaliers existants',
        actionsCorrectives: 'Mise en place d\'une équipe dédiée aux intégrations et formation des développeurs',
        statut: 'NOK',
        dateFinReelle: undefined,
        commentaires: 'Projet en retard à cause des difficultés d\'intégration, révision du planning nécessaire',
        dateCreation: new Date('2024-03-10'),
        dateMiseAJour: new Date('2024-10-22'),
        documents: [],
        tags: ['Santé', 'Mobile', 'Intégration']
      }
    ];

    this.projectsSubject.next(initialProjects);
  }

  // Récupérer tous les projets
  getProjects(): Observable<ProductionInfo[]> {
    return this.projects$;
  }

  // Récupérer un projet par son ID
  getProjectById(id: string): ProductionInfo | null {
    const projects = this.projectsSubject.value;
    return projects.find(project => project.id === id) || null;
  }

  // Mettre à jour un projet
  updateProject(updatedProject: ProductionInfo): void {
    const projects = this.projectsSubject.value;
    const index = projects.findIndex(project => project.id === updatedProject.id);
    
    if (index !== -1) {
      projects[index] = { ...updatedProject, dateMiseAJour: new Date() };
      this.projectsSubject.next([...projects]);
    }
  }

  // Ajouter un nouveau projet
  addProject(newProject: ProductionInfo): void {
    const projects = this.projectsSubject.value;
    const projectWithId = { ...newProject, id: this.generateId() };
    this.projectsSubject.next([...projects, projectWithId]);
  }

  // Supprimer un projet
  deleteProject(id: string): void {
    const projects = this.projectsSubject.value;
    const filteredProjects = projects.filter(project => project.id !== id);
    this.projectsSubject.next(filteredProjects);
  }

  // Générer un ID unique
  private generateId(): string {
    return Date.now().toString();
  }

  // Calculer les statistiques
  getStats(): { total: number; ok: number; enCours: number; nok: number } {
    const projects = this.projectsSubject.value;
    return {
      total: projects.length,
      ok: projects.filter(p => p.statut === 'OK').length,
      enCours: projects.filter(p => p.statut === 'En cours').length,
      nok: projects.filter(p => p.statut === 'NOK').length
    };
  }
}
