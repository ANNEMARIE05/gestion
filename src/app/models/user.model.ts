export interface User {
  id: string;
  nom: string;
  email: string;
  contact: string;
  password: string;
  profile: 'TPM' | 'DEV' | 'TEAM LEAD';
  created_at: Date;
}

export interface Habilitation {
  id: string;
  nom: string;
  description: string;
  entites: ('production' | 'audit' | 'veille')[];
  niveau: 'lecture' | 'ecriture' | 'admin';
}
