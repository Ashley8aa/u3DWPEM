import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ProductFormComponent } from '../product-form/product-form.component';
import { Observable, tap } from 'rxjs';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ProductsService } from '../productservice/products.service';
import { Products } from '../products';
import { AuthService } from '../auth.service'; // Asegúrate de que la ruta sea correcta.

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [AsyncPipe, CommonModule, NavbarComponent, RouterOutlet, RouterModule, ProductFormComponent],
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'] 
})
export class StoreComponent {
  private _router = inject(Router);
  private _productsService = inject(ProductsService);
  private _authService = inject(AuthService); // Inyecta el AuthService

  products$ = this._productsService
    .getProducts()
    .pipe(tap((values) => console.log(values))); // Para debug

  constructor() {
    // Redirige si no está autenticado
    this._authService.redirectIfUnauthenticated();
  }

  async deleteProduct(id: string){
    try {
      await this._productsService.deleteProduct(id);
    } catch (error) {  
    }
  }

  updateProduct(product: Products){
    console.log(product);
    this._router.navigate(['/store/edit', product.id]);
  }
}
