import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../../auth';
import { URL_SERVICIOS } from 'src/app/config/config';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(
    private http: HttpClient,
    public authservice: AuthService,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  allUsers(page = 1, state = '', search = '') { //aqui podemos filtrar lo que queramos por ejm: state (todos los activos) - search (buscar por nombre)
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.authservice.token });

    let LINK = '';
    if (state) {
      LINK = LINK + "&state=" + state;
    }

    if (search) {
      LINK = LINK + "&search=" + search;
    }

    let URL = URL_SERVICIOS + "/users/admin/all?page=" + page + LINK; //Agrega la paginación

    return this.http.get(URL, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  register(data: any) {
    this.isLoadingSubject.next(true); //proceso de carga entre la solicitud de carga y respuesta (Es propia de la plantilla metronic)

    let headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.authservice.token });
    let URL = URL_SERVICIOS + "/users/admin/register";

    return this.http.post(URL, data, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    ); //Aqui enviamos la cabecera
  }

  update(user_Id, data) {
    this.isLoadingSubject.next(true); //proceso de carga entre la solicitud de carga y respuesta (Es propia de la plantilla metronic)

    let headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.authservice.token });
    let URL = URL_SERVICIOS + "/users/admin/update/" + user_Id;

    return this.http.put(URL, data, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    ); //Aqui enviamos la cabecera

  }

  deleteUser(user_Id) {
    this.isLoadingSubject.next(true); //proceso de carga entre la solicitud de carga y respuesta (Es propia de la plantilla metronic)

    let headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.authservice.token });
    let URL = URL_SERVICIOS + "/users/admin/delete/" + user_Id;

    return this.http.delete(URL, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }
}
