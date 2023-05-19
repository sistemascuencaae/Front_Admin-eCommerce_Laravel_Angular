import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { CategorieService } from '../../categorie/_services/categorie.service';
import { CuponesService } from '../_services/cupones.service';

@Component({
  selector: 'app-delete-new-cupon',
  templateUrl: './delete-new-cupon.component.html',
  styleUrls: ['./delete-new-cupon.component.scss']
})
export class DeleteNewCuponComponent implements OnInit {

  @Input() cupon_selected: any = null;
  @Output() cuponesE: EventEmitter<any> = new EventEmitter();

  isLoading$;
  isLoading = false;

  constructor(public modal: NgbActiveModal,
    public _cuponesService: CuponesService,
    public toaster: Toaster) { }

  ngOnInit(): void {
    this.isLoading$ = this._cuponesService.isLoading$;
  }

  delete() {
    this._cuponesService.deleteCupon(this.cupon_selected.id).subscribe((resp: any) => {
      this.toaster.open(NoticyAlertComponent, { text: `primary-'Se ha eliminado correctamente el Cupon'` });
      this.modal.close();
      this.cuponesE.emit(this.cupon_selected);
    })
  }

}
