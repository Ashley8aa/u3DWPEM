import { Injectable, inject, signal } from "@angular/core";
import { Auth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, user } from "@angular/fire/auth";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Observable, from } from "rxjs";
import { UserInterface } from "./user.interface";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'

})
export class AuthService {

    constructor(private router: Router) {}

    firebaseAuth = inject(Auth); //esto permite utilizar metodos de firebase
    //Para la evidencia 2 u3, esto ayuda manejar cambios en el estado de autenticación del usuario.
    user$ = user(this.firebaseAuth);
    currentUserSig = signal<UserInterface | null | undefined>(undefined);
    

    register(email: string, username: string, password: string): Observable<void> {
        const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, 
            password,)
            .then((response) => 
            updateProfile(response.user, {displayName: username }),
            );
            return from(promise);

    }

    login(email: string, password: string):Observable<void>{
        const promise = signInWithEmailAndPassword (
            this.firebaseAuth,
            email,
            password,
        ).then(() => {});
        return from(promise);
    }
   
    logout(): Observable<void> {
        const promise = signOut(this.firebaseAuth);
        return from(promise); 
    }

    forgotPassword(email: string) {
        const promise = sendPasswordResetEmail (
            this.firebaseAuth,
            email
        ).then(() => {
            this.router.navigate(['/check-email'])
        })
        return from(promise)
    }
}

