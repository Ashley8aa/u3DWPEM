import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ProductFormComponent } from '../product-form/product-form.component';
import { tap } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ProductsService } from '../productservice/products.service';
import { Products } from '../products';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [AsyncPipe, CommonModule, NavbarComponent, RouterOutlet, RouterModule, ProductFormComponent],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})

export class StoreComponent {
  
private _router = inject(Router);
private _productsService = inject(ProductsService);

products$ = this._productsService
.getProducts()
.pipe(tap((values) => console.log(values))); //para debug

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
