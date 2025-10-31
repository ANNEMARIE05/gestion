import { User } from './user.model';
import { Projet } from './projet.model';

export interface Application {
  id: string;
  nom: string;
  projet: Projet;
  stack: ('react' | 'angular' | 'java' | 'html' | 'php')[];
  dev: User; // Dev user
  livrable: string;
  created_at: Date;
}

