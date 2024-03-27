import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth, Auth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClient, provideHttpClient } from '@angular/common/http';


const firebaseConfig = {
  apiKey: "AIzaSyCqH-A0yJZvy8vq6sY4zQvely2SPo0RtzM",
  authDomain: "u2e4-4fb4f.firebaseapp.com",
  projectId: "u2e4-4fb4f",
  storageBucket: "u2e4-4fb4f.appspot.com",
  messagingSenderId: "681298827957",
  appId: "1:681298827957:web:1cf7e54d5ede143c1f3cfc"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(),
    importProvidersFrom(
      [provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideAuth(() => getAuth()),provideFirestore(() => getFirestore()), 
    ]),

  ]
}
      
      
/*
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    provideClientHydration(),
     importProvidersFrom(provideFirebaseApp(() => initializeApp(
      {"projectId":"u2e4-4fb4f",
      "appId":"1:681298827957:web:1cf7e54d5ede143c1f3cfc",
      "storageBucket":"u2e4-4fb4f.appspot.com",
      "apiKey":"AIzaSyCqH-A0yJZvy8vq6sY4zQvely2SPo0RtzM",
      "authDomain":"u2e4-4fb4f.firebaseapp.com",
      "messagingSenderId":"681298827957"}))), 
      importProvidersFrom(provideAuth(() => getAuth())), 
      importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideDatabase(() => getDatabase())), provideAnimationsAsync()]
};
*/
