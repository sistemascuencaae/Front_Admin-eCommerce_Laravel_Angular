import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { CategorieService } from 'src/app/modules/categorie/_services/categorie.service';
import { SlidersService } from '../../_services/sliders.service';

@Component({
  selector: 'app-add-sliders-new',
  templateUrl: './add-sliders-new.component.html',
  styleUrls: ['./add-sliders-new.component.scss']
})
export class AddSlidersNewComponent implements OnInit {


  @Output() slidersE: EventEmitter<any> = new EventEmitter(); //Para refrescar la tabla cada vez q guarde, edite o elimine un usuario

  isLoading$: any;
  isLoading: boolean = false;

  name: any = null;
  url: any = null;
  imagen_file: any = null;
  imagen_previzualiza: any = null;

  constructor(public modal: NgbActiveModal,
    public _sliderService: SlidersService,
    public toaster: Toaster) {

  }

  ngOnInit(): void {
    this.isLoading$ = this._sliderService.isLoading$;
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

    if (this.name) {
      formData.append("name", this.name)
    }

    if (this.url) {
      formData.append("url", this.url)
    }

    this._sliderService.createSlider(formData).subscribe((resp: any) => {
      console.log(resp);
      this.slidersE.emit(resp.slider);
      this.toaster.open(NoticyAlertComponent, { text: `success-'Se ha creado correctamente el slider.'` });
      this.modal.close();
    });
  }


}
