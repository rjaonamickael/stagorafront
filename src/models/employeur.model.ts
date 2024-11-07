// src/app/models/employeur.model.ts
import { Site } from './site.model';
import { User } from './user.model';

export interface Employeur {
  user: User;
  employeur: {
    nom: string;
    code?: string;
    sites?: Site[];
  };
}
