export interface Products extends ProductForm{
    id: string;
}

export interface ProductForm{
    name: string,
    price: number,
    description: string; 
}