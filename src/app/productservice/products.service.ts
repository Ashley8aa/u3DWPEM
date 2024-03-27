import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, updateDoc, doc, DocumentReference, getDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ProductForm, Products } from '../products';

const PATH = 'products';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, PATH);

  //Esta función recupera todos los productos de la colección... Devuelve un Observable de una serie de Productos.
  getProducts() {
    return collectionData(this._collection, {idField: 'id'}) as Observable<
    Products[]>;
  }
//Esta función recupera un único producto de la colección en función de su id. Devuelve una Promesa que se resuelve en un único objeto Productos. 
  async getProduct(id: string){
    try {
      const document = doc(this._firestore, PATH, id); //recibir referencia a firestore
      const snapshot = await getDoc(document);      
      return snapshot.data() as Products;
    } catch (error) {
      return undefined;
    }
  }

  //Para CRUD
  createProducts(product: ProductForm){
    return addDoc(this._collection, product);
  }

  updateProduct(id: string, product: ProductForm){
    const document = doc(this._firestore, PATH, id); //recibir referencia a firestore
    return updateDoc(document, {...product}); //spread operator, crea un nuevo objeto con las mismas propiedades
  }

  deleteProduct(id: string) {
    const document = doc(this._firestore, PATH, id); //recibir referencia a firestore
    return deleteDoc(document);
  }
}

