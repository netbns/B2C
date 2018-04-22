import { Injectable } from '@angular/core';
import { ShoppingCart, ShoppingCartResponse } from '../utils/ShoppingCartModels'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../utils/Constants';

@Injectable()
export class ShoppingCartService {

  constructor(private http: HttpClient) { }

  createShoppingCart(shoppingCart: ShoppingCart) {
    const url = Constants.SHOPPING_CART_URL;

    return this.http.post<ShoppingCartResponse>(url, shoppingCart);
  }

  getShoppingCartById(id: number) {
    const url = Constants.SHOPPING_CART_URL + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.http.get<ShoppingCartResponse>(url, httpOptions);
  }

  getShoppingCartByClient(id: number) {
    const url = Constants.SHOPPING_CART_URL + "client/"+id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.http.get<ShoppingCartResponse>(url, httpOptions);
  }

  updateShoppingCart(shoppingCart: ShoppingCart) {
    const url = Constants.SHOPPING_CART_URL;

    return this.http.put<ShoppingCartResponse>(url, shoppingCart);
  }

  removeItem(shoppingCart: ShoppingCart, itemId) {
    const url = Constants.SHOPPING_CART_URL + 'item/' + itemId;
    return this.http.put<ShoppingCartResponse>(url, shoppingCart);
  }
}
