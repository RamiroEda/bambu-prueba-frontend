import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { RegisterInput } from '../models/register-input';

@Injectable({
  providedIn: 'root'
})
export class AuthRepositoryService {
  firestore = inject(Firestore)
  auth = inject(Auth)

  constructor() { }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
  }
   
  logout() {
    return this.auth.signOut()
  }

  async register({
    email,
    password,
    ...input
  }: RegisterInput) {
    const auth = await createUserWithEmailAndPassword(this.auth, email, password)

    const userDoc = doc(this.firestore, 'users', auth.user.uid);
    
    await setDoc(userDoc, {
      ...input,
      email,
    })
    
    return signInWithEmailAndPassword(this.auth, email, password)
  }
}
