import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from '../../auth';
import { finalize } from 'rxjs/operators';
import { URL_SERVICIOS } from 'src/app/config/config';
import { CategorieService } from '../../categorie/_services/categorie.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(
    private http: HttpClient,
    public authservice: AuthService,
    public _categoriaService: CategorieService
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  getInfoCategorias() {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.authservice.token });
    let URL = URL_SERVICIOS + "/products/get_info_categories";

    return this.http.get(URL, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  allProducts(page = 1, LINK = '') {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.authservice.token });
    let URL = URL_SERVICIOS + "/products/all?page=" + page + LINK;

    return this.http.get(URL, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  showProduct(product_id) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.authservice.token });
    let URL = URL_SERVICIOS + "/products/show_product/" + product_id;

    return this.http.get(URL, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  createProduct(data: any) {
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.authservice.token });
    let URL = URL_SERVICIOS + "/products/add";

    return this.http.post(URL, data, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  updateProduct(product_id: string, data: any) {
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.authservice.token });
    let URL = URL_SERVICIOS + "/products/update/" + product_id;

    return this.http.post(URL, data, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  //GALERIA DE IMAGENES DEL PRODUCTO

  addImagenProduct(data: any) {
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.authservice.token });
    let URL = URL_SERVICIOS + "/products/imgs/add";

    return this.http.post(URL, data, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  deleteImagenProduct(imagen_id: any) {
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.authservice.token });
    let URL = URL_SERVICIOS + "/products/imgs/delete/" + imagen_id;

    return this.http.delete(URL, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  //INVENTARIO DE PRODUCTOS

  addInventario(data: any) {
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.authservice.token });
    let URL = URL_SERVICIOS + "/products/inventario/add";

    return this.http.post(URL, data, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  updateInventario(inventario_id, data) {
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.authservice.token });
    let URL = URL_SERVICIOS + "/products/inventario/update_size/" + inventario_id;

    return this.http.put(URL, data, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  deleteInventario(inventario_id) {
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.authservice.token });
    let URL = URL_SERVICIOS + "/products/inventario/delete_size/" + inventario_id;

    return this.http.delete(URL, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  //SUB INVENTARIOS DE PRODUCTOS

  updateSubInventario(sub_inventario_id, data) {
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.authservice.token });
    let URL = URL_SERVICIOS + "/products/inventario/update/" + sub_inventario_id;

    return this.http.put(URL, data, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  deleteSubInventario(sub_inventario_id) {
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.authservice.token });
    let URL = URL_SERVICIOS + "/products/inventario/delete/" + sub_inventario_id;

    return this.http.delete(URL, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }
}
