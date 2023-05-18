import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { URL_BACKEND } from 'src/app/config/config';
import { SlidersService } from '../../_services/sliders.service';

@Component({
  selector: 'app-edit-sliders-new',
  templateUrl: './edit-sliders-new.component.html',
  styleUrls: ['./edit-sliders-new.component.scss']
})
export class EditSlidersNewComponent implements OnInit {
  @Input() slider_selected: any;
  @Output() slidersE: EventEmitter<any> = new EventEmitter();

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
    this.name = this.slider_selected.name;
    this.url = this.slider_selected.url;
    this.imagen_previzualiza = URL_BACKEND + '/storage/app/' + this.slider_selected.imagen;
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
  }

  save() {
    let formData = new FormData(); //Clase de javaScript permite encapsular la info de tipo archivo
    formData.append("imagen_file", this.imagen_file)
    formData.append("name", this.name)
    formData.append("url", this.url)

    this._sliderService.updateSlider(this.slider_selected.id, formData).subscribe((resp: any) => {
      console.log(resp);
      this.toaster.open(NoticyAlertComponent, { text: `success-'Se ha actualizado correctamente el Slider.'` });
      this.slidersE.emit(resp.slider);
      this.modal.close();
    });
  }

}
