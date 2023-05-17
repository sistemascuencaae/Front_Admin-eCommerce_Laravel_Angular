import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from '../../auth';
import { URL_SERVICIOS } from 'src/app/config/config';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(
    private http: HttpClient,
    public authservice: AuthService,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  allCategories(page = 1, search = '') { //aqui podemos filtrar lo que queramos por ejm: state (todos los activos) - search (buscar por nombre)
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.authservice.token });

    let LINK = '';

    if (search) {
      LINK = LINK + "&search=" + search;
    }

    let URL = URL_SERVICIOS + "/products/categories/all?page=" + page + LINK; //Agrega la paginación

    return this.http.get(URL, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  createCategoria(data: any) {
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.authservice.token });
    let URL = URL_SERVICIOS + "/products/categories/add";

    return this.http.post(URL, data, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  updateCategoria(categorie_id: any, data: any) {
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.authservice.token });
    let URL = URL_SERVICIOS + "/products/categories/update/" + categorie_id;

    return this.http.post(URL, data, { headers: headers }).pipe( //Tiene que set post porque el put no lee el tipo de archivo imagen
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  deleteCategoria(categoria_Id) {
    this.isLoadingSubject.next(true); //proceso de carga entre la solicitud de carga y respuesta (Es propia de la plantilla metronic)

    let headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.authservice.token });
    let URL = URL_SERVICIOS + "/products/categories/delete/" + categoria_Id;

    return this.http.delete(URL, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }
}
