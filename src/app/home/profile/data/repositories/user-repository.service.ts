import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { DocumentData, Firestore, doc, docData } from '@angular/fire/firestore';
import { User } from 'src/app/data/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserRepositoryService {
  constructor(private firestore: Firestore, private auth: Auth) {}

  currentUser() {
    return this.get(this.auth.currentUser?.uid ?? '');
  }

  get(id: string) {
    return docData<DocumentData, User>(doc(this.firestore, 'users', id));
  }
}
