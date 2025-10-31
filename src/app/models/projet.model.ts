import { User } from './user.model';

export interface Projet {
  id: string;
  nom: string;
  description: string;
  tpm: User; // TPM user
  created_at: Date;
}

