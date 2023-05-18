import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { SlidersService } from '../../_services/sliders.service';

@Component({
  selector: 'app-delete-sliders-new',
  templateUrl: './delete-sliders-new.component.html',
  styleUrls: ['./delete-sliders-new.component.scss']
})
export class DeleteSlidersNewComponent implements OnInit {

  @Input() slider_selected: any = null;
  @Output() slidersE: EventEmitter<any> = new EventEmitter();

  isLoading$;
  isLoading = false;

  constructor(public modal: NgbActiveModal,
    public _sliderService: SlidersService,
    public toaster: Toaster) { }

  ngOnInit(): void {
    this.isLoading$ = this._sliderService.isLoading$;
  }

  delete() {
    this._sliderService.deleteSlider(this.slider_selected.id).subscribe((resp: any) => {
      console.log(resp);
      this.toaster.open(NoticyAlertComponent, { text: `primary-'Se ha eliminado correctamente el Slider'` });
      this.modal.close();
      this.slidersE.emit(this.slider_selected);
    })
  }

}
