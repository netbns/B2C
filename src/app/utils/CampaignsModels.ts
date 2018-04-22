import {Producto} from "./ProductsModels"
export interface Campaign{
    
    campaingId:number;
    campaingNombre:string;
    campaingDescripcion:string;
    campaingImagen:string;
    campaingActivo:boolean;
    campaingProductos:Producto[];
}