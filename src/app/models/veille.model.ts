export interface VeilleInfo {
  id: string;
  titre: string;
  description: string;
  type: 'technologique' | 'concurrentielle' | 'reglementaire' | 'marche';
  statut: 'en_cours' | 'termine' | 'archive';
  responsable: string;
  equipe: string[];
  dateCreation: Date;
  dateMiseAJour: Date;
  sources: Source[];
  tendances: Tendance[];
  documents: Document[];
  tags: string[];
}

export interface Source {
  id: string;
  nom: string;
  type: 'site_web' | 'rapport' | 'article' | 'conference';
  url: string;
  fiabilite: 'faible' | 'moyenne' | 'elevee';
  frequence: 'quotidienne' | 'hebdomadaire' | 'mensuelle';
}

export interface Tendance {
  id: string;
  nom: string;
  description: string;
  impact: 'faible' | 'moyen' | 'eleve';
  probabilite: 'faible' | 'moyenne' | 'elevee';
  dateIdentification: Date;
}

export interface Document {
  id: string;
  nom: string;
  type: string;
  taille: number;
  dateUpload: Date;
  url: string;
}
