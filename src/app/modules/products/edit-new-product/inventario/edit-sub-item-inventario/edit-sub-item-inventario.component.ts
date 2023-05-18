import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { ProductsService } from '../../../_services/products.service';

@Component({
  selector: 'app-edit-sub-item-inventario',
  templateUrl: './edit-sub-item-inventario.component.html',
  styleUrls: ['./edit-sub-item-inventario.component.scss']
})
export class EditSubItemInventarioComponent implements OnInit {

  @Output() inventarioG: EventEmitter<any> = new EventEmitter();
  @Input() sub_inventario: any;
  @Input() inventario: any;

  @Input() products_colors: any = [];

  stock: any = null;
  product_color_id: any = null;

  isLoading$: any;

  constructor(public modal: NgbActiveModal,
    public _productsService: ProductsService,
    public toaster: Toaster) {

  }

  ngOnInit(): void {
    this.isLoading$ = this._productsService.isLoadingSubject;
    this.stock = this.sub_inventario.stock;
    this.product_color_id = this.sub_inventario.product_color_id;
  }

  save() {
    let data = {
      stock: this.stock,
      product_color_id: this.product_color_id,
      product_size_id: this.inventario.id,
    };

    console.log(data);

    this._productsService.updateSubInventario(this.sub_inventario.id, data).subscribe((resp: any) => {
      console.log(resp);
      if (resp.message == 403) {
        this.toaster.open(NoticyAlertComponent, { text: `danger-'${resp.text_message}'` });
        return;
      } else {
        this.inventarioG.emit(resp.product_color_size);
        this.modal.close();
        this.toaster.open(NoticyAlertComponent, { text: `primary-'Se ha actualizado correctamente.'` });
      }

    });
  }


}
