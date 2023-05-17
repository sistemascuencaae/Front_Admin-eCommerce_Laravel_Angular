import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CategorieService } from '../../_services/categorie.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { F } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.scss']
})
export class AddCategorieComponent implements OnInit {

  @Output() clientsE: EventEmitter<any> = new EventEmitter(); //Para refrescar la tabla cada vez q guarde, edite o elimine un usuario

  isLoading$: any;
  isLoading: boolean = false;

  name: any = null;
  icono: any = null;
  imagen_file: any = null;
  imagen_previzualiza: any = null;

  constructor(public modal: NgbActiveModal,
    public _categorieService: CategorieService,
    public toaster: Toaster) {

  }

  ngOnInit(): void {
    this.isLoading$ = this._categorieService.isLoading$;
  }

  processFile($event) {

    if ($event.target.files[0].type.indexOf("image") < 0) { //Aqui solo carga una imagen e la posicion cero
      this.toaster.open(NoticyAlertComponent, { text: `danger-'El archivo cargado no es una imagen.'` });
      return;
    }

    this.imagen_file = $event.target.files[0];
    let reader = new FileReader();

    reader.readAsDataURL(this.imagen_file);
    reader.onloadend = () => this.imagen_previzualiza = reader.result;
    // setTimeout(() => {
    //   console.log(this.imagen_previzualiza);
    // }, 25)
  }

  save() {
    let formData = new FormData(); //Clase de javaScript permite encapsular la info de tipo archivo
    formData.append("imagen_file", this.imagen_file)
    formData.append("name", this.name)
    formData.append("icono", this.icono)
    console.log("FORMDATA" + formData);

    this._categorieService.createCategoria(formData).subscribe((resp: any) => {
      console.log(resp);
      this.clientsE.emit(resp.categorie);
      this.toaster.open(NoticyAlertComponent, { text: `success-'Se ha creado correctamente la categoria.'` });
      this.modal.close();
    });
  }


}
