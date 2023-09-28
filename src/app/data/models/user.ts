import { DocumentData } from "@angular/fire/firestore"

export interface User extends DocumentData {
    email: string
    name: string
    phone: string
    birthday: Date
}