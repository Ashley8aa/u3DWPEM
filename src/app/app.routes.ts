import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StoreComponent } from './store/store.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { CheckEmailComponent } from './check-email/check-email.component';


export const routes: Routes = [
    { path: '', component: LandingComponent }, 
    { path: 'navbar', component: NavbarComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'store', component: StoreComponent },
    { path: 'landing', component: LandingComponent },
    { path: 'product-form', component: ProductFormComponent },
    { path: 'store/edit/:id', component: ProductFormComponent },
    { path: 'recover-password', component: RecoverPasswordComponent },
    { path: 'check-email', component: CheckEmailComponent },



    
];
