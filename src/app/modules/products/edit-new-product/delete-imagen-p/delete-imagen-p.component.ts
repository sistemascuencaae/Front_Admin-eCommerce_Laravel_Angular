import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { CategorieService } from 'src/app/modules/categorie/_services/categorie.service';
import { ProductsService } from '../../_services/products.service';

@Component({
  selector: 'app-delete-imagen-p',
  templateUrl: './delete-imagen-p.component.html',
  styleUrls: ['./delete-imagen-p.component.scss']
})
export class DeleteImagenPComponent implements OnInit {
  @Input() imagen_: any = null;
  @Output() imagenE: EventEmitter<any> = new EventEmitter();

  isLoading$;
  isLoading = false;

  constructor(public modal: NgbActiveModal,
    public _productsService: ProductsService,
    public toaster: Toaster) { }

  ngOnInit(): void {
    this.isLoading$ = this._productsService.isLoading$;
  }

  delete() {
    this._productsService.deleteImagenProduct(this.imagen_.id).subscribe((resp: any) => {
      this.toaster.open(NoticyAlertComponent, { text: `primary-'Se ha eliminado correctamente la imagen'` });
      this.modal.close();
      this.imagenE.emit(this.imagen_);
    })
  }
}
