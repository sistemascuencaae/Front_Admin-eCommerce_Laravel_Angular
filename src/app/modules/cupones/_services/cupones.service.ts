import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from '../../auth';
import { finalize } from 'rxjs/operators';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class CuponesService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(
    private http: HttpClient,
    public authservice: AuthService,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  allCupones(page = 1, search = '') { //aqui podemos filtrar lo que queramos por ejm: state (todos los activos) - search (buscar por nombre)
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.authservice.token });

    let LINK = "";
    if (search) {
      LINK = "&search=" + search;
    }

    let URL = URL_SERVICIOS + "/cupones/all?page=" + page + LINK; //Agrega la paginación

    return this.http.get(URL, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  config_all() { //aqui podemos filtrar lo que queramos por ejm: state (todos los activos) - search (buscar por nombre)
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.authservice.token });

    let URL = URL_SERVICIOS + "/cupones/config_all"; //Agrega la paginación

    return this.http.get(URL, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  createCupon(data: any) {
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.authservice.token });
    let URL = URL_SERVICIOS + "/cupones/add";

    return this.http.post(URL, data, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  updateCupon(cupon_id: any, data: any) {
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.authservice.token });
    let URL = URL_SERVICIOS + "/cupones/update/" + cupon_id;

    return this.http.post(URL, data, { headers: headers }).pipe( //Tiene que set post porque el put no lee el tipo de archivo imagen
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  deleteCupon(cupon_Id) {
    this.isLoadingSubject.next(true); //proceso de carga entre la solicitud de carga y respuesta (Es propia de la plantilla metronic)

    let headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.authservice.token });
    let URL = URL_SERVICIOS + "/cupones/delete/" + cupon_Id;

    return this.http.delete(URL, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  showCupon(cupon_id) {
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.authservice.token });

    let URL = URL_SERVICIOS + "/cupones/show/" + cupon_id; //Agrega la paginación

    return this.http.get(URL, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

}
