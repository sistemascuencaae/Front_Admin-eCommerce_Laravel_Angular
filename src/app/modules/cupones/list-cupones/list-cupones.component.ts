import { I } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { CuponesService } from '../_services/cupones.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteNewCuponComponent } from '../delete-new-cupon/delete-new-cupon.component';

@Component({
  selector: 'app-list-cupones',
  templateUrl: './list-cupones.component.html',
  styleUrls: ['./list-cupones.component.scss']
})
export class ListCuponesComponent implements OnInit {
  isLoading$: any;

  cupones: any = [];

  search: any = null;

  constructor(public _cuponesService: CuponesService,
    public modelService: NgbModal) { }

  ngOnInit(): void {
    this.isLoading$ = this._cuponesService.isLoadingSubject;
    this.listCupones();
  }

  listCupones() {
    this._cuponesService.allCupones(1, this.search).subscribe((resp: any) => {
      console.log(resp);
      this.cupones = resp.cupones;
    });
  }

  getTypeDiscount(value) {
    if (value == 1) { //Si el value es de tipo 1 el descuento es porcentaje
      return "Porcentaje";
    } else {
      return "Moneda";
    }
  }

  getTypeCount(cupon) {
    if (cupon.type_count == 1) {
      return "Ilimitado";
    } else {
      return "Limitado(" + cupon.num_use + ")";
    }
  }

  getTypeCupon(cupon) {
    if (cupon.products) {
      return "Productos";
    } else {
      return "Categorias";
    }
  }

  delete(cupon) {
    const modalRef = this.modelService.open(DeleteNewCuponComponent, { centered: true, size: 'sm' });
    modalRef.componentInstance.cupon_selected = cupon; //Instancio la variable categoria_selected del component EditCategoriaComponent
    modalRef.result.then( //Esta parte es cuando ya se cierra el modal
      () => {

      },
      () => {

      }
    )
    modalRef.componentInstance.cuponesE.subscribe((resp: any) => {
      console.log(resp);
      let INDEX = this.cupones.findIndex(cupon => cupon.id == resp.id);
      this.cupones.splice(INDEX, 1);
    })
  }

  reset() {
    this.search = null;
    this.listCupones();
  }
}
