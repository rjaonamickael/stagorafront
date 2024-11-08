import { User } from './user.model';

export interface Etudiant{
    user: User;
    etudiant: {
        nom: string;
        prenom: string;
        etablissement: string;   
    };
}