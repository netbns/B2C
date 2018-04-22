import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { SearchComponent } from './search/search.component';
import { StorageServiceModule } from 'angular-webstorage-service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductComponent } from './product/product.component';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MatSelectModule } from '@angular/material/select';
import { UserComponent } from './user/user.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SearchComponent,
    ProductComponent,
    ShoppingCartComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    OrdersComponent,
    OrderDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: MainComponent
      },
      {
        path: 'search',
        component: SearchComponent
      },
      {
        path: 'product',
        component: ProductComponent
      },
      {
        path: 'shoppingcart',
        component: ShoppingCartComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'user',
        component: UserComponent
      },
      {
        path: 'orders',
        component: OrdersComponent
      },
      {
        path: 'orderdetail',
        component: OrderDetailComponent
      }
    ]),
    MDBBootstrapModule.forRoot(),
    StorageServiceModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatExpansionModule,
    SimpleNotificationsModule.forRoot(),
    MatSelectModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
