import { Injectable, inject, signal } from "@angular/core";
import { Auth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, updateProfile, user } from "@angular/fire/auth";
import { Observable, from, tap } from "rxjs";
import { UserInterface } from "./user.interface";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    firebaseAuth = inject(Auth); // Esto permite utilizar métodos de Firebase
    user$ = user(this.firebaseAuth); // Maneja cambios en el estado de autenticación del usuario
    currentUserSig = signal<UserInterface | null | undefined>(undefined);

    constructor(private router: Router) {}

    register(email: string, username: string, password: string): Observable<void> {
        const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password)
            .then((response) => updateProfile(response.user, { displayName: username }));
        return from(promise);
    }

    login(email: string, password: string): Observable<void> {
        const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password).then(() => {});
        return from(promise);
    }

    logout(): Observable<void> {
        const promise = signOut(this.firebaseAuth);
        return from(promise).pipe(
            tap(() => this.router.navigate(['/login'])) // Redirige al usuario a la página de inicio de sesión después de cerrar sesión
        );
    }

    forgotPassword(email: string) {
        const promise = sendPasswordResetEmail(this.firebaseAuth, email).then(() => {
            this.router.navigate(['/check-email']);
        });
        return from(promise);
    }

    // Método para redirigir si el usuario no está autenticado
    redirectIfUnauthenticated() {
        this.user$.subscribe(user => {
            if (!user) {
                this.router.navigate(['/login']);
            }
        });
    }
}

