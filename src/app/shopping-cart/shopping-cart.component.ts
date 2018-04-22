import { Component, OnInit, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Producto } from '../utils/ProductsModels';
import { ShoppingCart, ShoppingCartResponse } from '../utils/ShoppingCartModels';

@Component({
  selector: 'app-shopping-cart',
  providers: [ProductService, ShoppingCartService],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  products: Producto[] = [];
  productMap = {};
  shoppingCart: ShoppingCart = this.storage.get("currentCart");
  isLoadingResults = false;
  constructor(private productService: ProductService, private shoppingCartService: ShoppingCartService, @Inject(LOCAL_STORAGE) private storage: WebStorageService, private router: Router) { }

  ngOnInit() {

    if (this.shoppingCart) {
      this.shoppingCartService.getShoppingCartById(this.shoppingCart.id).subscribe(data => {
        this.shoppingCart = data['payload'];
        this.storage.set("currentCart", this.shoppingCart);
        for (let i = 0; i < this.shoppingCart.items.length; i++) {
          const item = this.shoppingCart.items[i];
          this.productService.getOneProduct(item.productId).subscribe(data => {
            this.productMap[item.productId] = item.quantity;
            this.products.push(data);

          });
        }

      });

    } else {
      var user = this.storage.get("user");
      if (user) {
        this.shoppingCartService.getShoppingCartByClient(user.id).subscribe(data => {
          if (data['payload']) {
            this.shoppingCart = data['payload'];
            this.storage.set("currentCart", this.shoppingCart);
            for (let i = 0; i < this.shoppingCart.items.length; i++) {
              const item = this.shoppingCart.items[i];
              this.productService.getOneProduct(item.productId).subscribe(data => {
                this.productMap[item.productId] = item.quantity;
                this.products.push(data);

              });
            }
          }
        });
      }
    }
  }

  calculateCost(product: Producto) {
    var cost: number = 0;
    if (product.lodging) {
      cost += product.lodging.lodgingCosto;
    }
    if (product.transporte) {
      cost += product.transporte.transporteCosto;
    }
    if (product.espectaculo) {
      cost += product.espectaculo.espectaculoCosto;
    }
    return cost * this.productMap[product.productoId];
  }

  removeUnit(product: Producto) {
    this.isLoadingResults = true;
    var quantity = this.productMap[product.productoId];
    if (quantity === 1) {
      var itemId = this.removeShoppingCartItem(product.productoId);
      this.shoppingCartService.removeItem(this.shoppingCart, itemId).subscribe(data => {
        this.storage.set("currentCart", data['payload']);
        this.isLoadingResults = false;
        this.removeProduct(product.productoId);
      });
    } else {
      this.productMap[product.productoId]--;
      this.setQuantityFromShoppingCartItem(product.productoId, quantity - 1);
      var client = this.storage.get('user');
      this.shoppingCart.client = client ? client.id : null;
      this.shoppingCartService.updateShoppingCart(this.shoppingCart).subscribe(data => {
        this.storage.set("currentCart", data['payload']);
        this.isLoadingResults = false;
      });
    }

  }
  addUnit(product: Producto) {
    this.isLoadingResults = true;
    this.productMap[product.productoId] += 1;
    this.setQuantityFromShoppingCartItem(product.productoId, this.productMap[product.productoId]);
    this.shoppingCartService.updateShoppingCart(this.shoppingCart).subscribe(data => {
      this.storage.set("currentCart", data['payload']);
      this.isLoadingResults = false;
    });
  }

  setQuantityFromShoppingCartItem(productId: number, quantity: number) {
    for (let i = 0; i < this.shoppingCart.items.length; i++) {
      const item = this.shoppingCart.items[i];
      if (item.productId === productId) {
        this.shoppingCart.items[i].quantity = quantity
        break;
      }
    }
  }

  removeProduct(productId: number) {
    var idx = -1;
    for (let i = 0; i < this.products.length; i++) {
      const item = this.products[i];
      if (item.productoId === productId) {
        idx = i;
        break;
      }
    }
    if (idx !== -1) {
      this.products.splice(idx, 1);
    }
  }


  removeShoppingCartItem(productId: number) {
    var idx = -1;
    var id = 0;
    for (let i = 0; i < this.shoppingCart.items.length; i++) {
      const item = this.shoppingCart.items[i];
      if (item.productId === productId) {
        idx = i;
        id = item.id;
        break;
      }
    }
    if (idx !== -1) {
      this.shoppingCart.items.splice(idx, 1);
    }
    return id;
  }

  goBack() {
    this.router.navigateByUrl("/search");
  }

  calculateTotalCost() {
    var totalCost = 0;
    for (let i = 0; i < this.products.length; i++) {
      const item = this.products[i];
      totalCost += this.calculateCost(item);
    }
    return totalCost;
  }
}
