import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { DocumentData, Firestore, doc, docData } from '@angular/fire/firestore';
import { User } from 'src/app/data/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserRepositoryService {
  constructor(private firestore: Firestore, private auth: Auth) {}

  /**
   * Devuelve la información del usuario actualmente autenticado en la aplicación.
   * @returns {Observable} Información del usuario actualmente autenticado en la aplicación.
   */
  currentUser() {
    return this.get(this.auth.currentUser?.uid ?? '');
  }

  /**
   * Devuelve la información de un usuario.
   * @param {string} id Identificador del usuario.
   * @returns {Observable} Información del usuario.
   */
  get(id: string) {
    return docData<DocumentData, User>(doc(this.firestore, 'users', id));
  }
}
