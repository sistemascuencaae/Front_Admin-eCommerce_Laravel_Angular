import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../_services/products.service';
import { URL_BACKEND } from 'src/app/config/config';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  isLoading$: any = null;

  products: any = [];

  URL_BACKEND: any = URL_BACKEND;

  search: any = null;
  constructor(public _productService: ProductsService) {

  }

  ngOnInit(): void {
    this.isLoading$ = this._productService.isLoadingSubject;
    this.listProducts();
  }

  listProducts(page = 1) {
    let LINK = "";

    if (this.search) {
      LINK = LINK + "&search=" + this.search;
    }

    this._productService.allProducts(page, LINK).subscribe((resp: any) => {
      this.products = resp.products.data;

      console.log(resp);
      console.log(this.products);
    });
  }

  edit(product) {

  }

  delete(product) {

  }

  reset() {
    this.search = null;
    this.listProducts();
  }
}
