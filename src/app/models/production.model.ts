export interface ProductionInfo {
  id: string;
  numeroProjet: string;
  application: string;
  serviceDTI: string;
  responsable: string;
  typeProduction: string;
  dateDebut: Date;
  dateFinPrevue: Date;
  etatAvancement: number;
  jalonsCles: string;
  problemesRencontres: string;
  actionsCorrectives: string;
  statut: 'En cours' | 'OK' | 'NOK';
  dateFinReelle?: Date;
  commentaires?: string;
  dateCreation: Date;
  dateMiseAJour: Date;
  documents: Document[];
  tags: string[];
}

export interface Document {
  id: string;
  nom: string;
  type: string;
  taille: number;
  dateUpload: Date;
  url: string;
}
