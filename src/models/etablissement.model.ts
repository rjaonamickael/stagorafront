// src/app/models/etablissement.model.ts
export interface Etablissement {
  id?: number;
  nom: string;
  ville: string;
  province: string;
  logo?: File | string; // Peut être un fichier ou une chaîne de caractères
}
