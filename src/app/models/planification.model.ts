import { Application } from './application.model';

export interface Planification {
  id: string;
  application: Application;
  titre: string;
  date_debut: Date;
  date_fin: Date;
  etat_avancement: number; // Pourcentage 0-100
  probleme_rencontrer: string;
  action_corrective: string;
  statut: 'en_cours' | 'termine' | 'en_retard' | 'annule';
  date_finition?: Date;
  commentaire: string;
  created_at: Date;
}

