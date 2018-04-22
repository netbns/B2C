import { Component, OnInit, Inject,ViewChild } from '@angular/core';

import {ProductService} from '../services/product.service'
import {Producto} from '../utils/ProductsModels'
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {MatPaginator, MatSort} from '@angular/material';
import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';
import {PageEvent} from '@angular/material';

import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  providers:[ProductService],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  products; 
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  pageEvent: PageEvent;
  searchText=this.storage.get('searchText');
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private productService:ProductService,@Inject(LOCAL_STORAGE) private storage: WebStorageService,private router:Router) { }

  ngOnInit() {
   
    merge(this.searchText,this.paginator.page)
      .pipe(
        startWith(this.products),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.productService!.filterProducts(
            this.searchText, this.paginator.pageSize?this.paginator.pageSize:this.pageSize,this.paginator.pageIndex);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data['totalLength'];

          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.products=data['resultSet']);
  }

  search(){
    this.isLoadingResults = true;
    this.storage.set("searchText",this.searchText);
    this.productService.filterProducts(
      this.searchText, this.paginator.pageSize?this.paginator.pageSize:this.pageSize,0).subscribe(data=>{
        this.products=data['resultSet'];
        this.isLoadingResults = false;
      });
  }

  viewProduct(product:Producto){
    this.storage.set("currentProduct",product);
    this.storage.set("comeFrom","/search");
    this.router.navigateByUrl("/product");
  }

}
