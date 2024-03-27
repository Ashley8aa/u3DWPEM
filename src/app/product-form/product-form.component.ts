import { Component, Input, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../productservice/products.service';
import { Products } from '../products';
import { ActivatedRoute, Router , RouterLink} from '@angular/router';

export interface CreateForm {
  name: FormControl<string>;
  price: FormControl<number>;
  description: FormControl<string>;
}

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  private _productsService = inject(ProductsService);
  private _formBuilder = inject(FormBuilder).nonNullable;
  private _router = inject(Router);
  private _productId = '';
  private _product: Products | undefined

  get productId(): string {
    return this._productId;
  }

  @Input() set productId(value: string){
    this._productId = value;
  }

  productForm!: FormGroup;

  constructor(private fb:FormBuilder,private route: ActivatedRoute) {
    this._productId = this.route.snapshot.paramMap.get('id')!;
    this._productsService.getProduct(this._productId).then((product) => {
      this._product = product!;
      this.setFormValues(this._productId)
    });
    
    this.productForm = this.fb.group({
      name: new FormControl("", [Validators.required]),
      price: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required])  
    })
  }
//Todo esto se encarga del form (agregar y editar producto)
  async onSubmit(){
    if (this.productForm.invalid) return;  //Si el prducto tiene id se ira al metodo de updateProducts
    try {
      const product = this.productForm.value as Products;
      !this._product
        ? await this._productsService.createProducts(product)
        : await this._productsService.updateProduct(this.productId, product);
      this._router.navigate(['/store']);
    } catch (error) {
      //
    }
  }
//Esto se usa para popular el formulario si es que se le da clic a editar
  async setFormValues(id: string) {
    try {
      const product = await this._productsService.getProduct(id);
      if (!product) return;
      this.productForm.patchValue({
        name: product.name,
        price: product.price,
        description: product.description,
      });
    } catch (error) {}
  }
}


