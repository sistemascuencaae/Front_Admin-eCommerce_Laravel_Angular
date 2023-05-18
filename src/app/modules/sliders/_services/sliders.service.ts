import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from '../../auth';
import { finalize } from 'rxjs/operators';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class SlidersService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(
    private http: HttpClient,
    public authservice: AuthService,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  allSliders() {
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.authservice.token });

    let URL = URL_SERVICIOS + "/sliders/all";

    return this.http.get(URL, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  createSlider(data: any) {
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.authservice.token });
    let URL = URL_SERVICIOS + "/sliders/add";

    return this.http.post(URL, data, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  updateSlider(slider_id: any, data: any) {
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.authservice.token });
    let URL = URL_SERVICIOS + "/sliders/update/" + slider_id;

    return this.http.post(URL, data, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  deleteSlider(slider_id: any) {
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.authservice.token });
    let URL = URL_SERVICIOS + "/sliders/delete/" + slider_id;

    return this.http.delete(URL, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }
}
