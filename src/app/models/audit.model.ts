export interface AuditInfo {
  id: string;
  titre: string;
  description: string;
  type: 'securite' | 'conformite' | 'performance' | 'qualite';
  statut: 'planifie' | 'en_cours' | 'termine' | 'rapporte';
  auditeur: string;
  equipeAudit: string[];
  dateDebut: Date;
  dateFin: Date;
  dateRapport: Date;
  score: number;
  recommandations: Recommandation[];
  documents: Document[];
  tags: string[];
}

export interface Recommandation {
  id: string;
  description: string;
  priorite: 'faible' | 'moyenne' | 'elevee' | 'critique';
  statut: 'ouverte' | 'en_cours' | 'fermee';
  responsable: string;
  dateEcheance: Date;
}

export interface Document {
  id: string;
  nom: string;
  type: string;
  taille: number;
  dateUpload: Date;
  url: string;
}
