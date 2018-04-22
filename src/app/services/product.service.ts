import { Injectable } from '@angular/core';
import { Constants } from '../utils/Constants';
import { Producto } from '../utils/ProductsModels';
import { FilterResponse } from '../utils/ProductsModels';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }

    filterProducts(filter:string,pageSize:number,pageNumber:number){
        const params='0?descripcion='+filter+'&nombre='+filter+'&pageIndex='+(pageNumber+1)+'&pageSize='+pageSize;
        const requestUrl =Constants.PRODUCTS_URL+params;
        return this.http.get<FilterResponse>(requestUrl); 
    }
    
    getOneProduct(id:number){
        const requestUrl =Constants.PRODUCTS_URL+id;
        return this.http.get<Producto>(requestUrl); 
    }
    
    getTopFive(){
        const requestUrl =Constants.PRODUCTS_URL+'GetTopProducts';
        return this.http.get<Producto[]>(requestUrl); 
    }
}
