import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { RegisterInput } from '../models/register-input';

@Injectable({
  providedIn: 'root',
})
export class AuthRepositoryService {
  constructor(private firestore: Firestore, private auth: Auth) {}

  /**
   * Inicia sesión en la aplicación.
   * @param {string} email Correo electrónico del usuario.
   * @param {string} password Contraseña del usuario.
   * @returns {Promise} El resultado de la autenticación.
   */
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  /**
   * Cierra la sesión del usuario actual.
   */
  logout() {
    return this.auth.signOut();
  }

  /**
   * Registra un nuevo usuario en la aplicación.
   * @param {RegisterInput} input Datos del usuario a registrar.
   * @returns {Promise} El resultado del registro.
   */
  async register({ email, password, ...input }: RegisterInput) {
    const auth = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    const userDoc = doc(this.firestore, 'users', auth.user.uid);

    await setDoc(userDoc, {
      ...input,
      email,
    });

    return signInWithEmailAndPassword(this.auth, email, password);
  }
}
