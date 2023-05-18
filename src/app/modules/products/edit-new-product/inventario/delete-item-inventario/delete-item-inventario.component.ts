import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { CategorieService } from 'src/app/modules/categorie/_services/categorie.service';
import { ProductsService } from '../../../_services/products.service';

@Component({
  selector: 'app-delete-item-inventario',
  templateUrl: './delete-item-inventario.component.html',
  styleUrls: ['./delete-item-inventario.component.scss']
})
export class DeleteItemInventarioComponent implements OnInit {

  @Input() inventario: any = null;
  @Output() inventarioG: EventEmitter<any> = new EventEmitter();

  isLoading$;
  isLoading = false;

  constructor(public modal: NgbActiveModal,
    public _productService: ProductsService,
    public toaster: Toaster) { }

  ngOnInit(): void {
    this.isLoading$ = this._productService.isLoading$;
  }

  delete() {
    this._productService.deleteInventario(this.inventario.id).subscribe((resp: any) => {
      this.toaster.open(NoticyAlertComponent, { text: `primary-'Se ha eliminado correctamente la categoria'` });
      this.modal.close();
      this.inventarioG.emit(this.inventario);
    })
  }
}