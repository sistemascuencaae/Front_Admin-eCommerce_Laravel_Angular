import { Component, OnInit } from '@angular/core';
import { CuponesService } from '../_services/cupones.service';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';

@Component({
  selector: 'app-add-new-cupon',
  templateUrl: './add-new-cupon.component.html',
  styleUrls: ['./add-new-cupon.component.scss']
})
export class AddNewCuponComponent implements OnInit {
  isLoading$: any;

  code: any = null;
  type_discount: any = 1;
  discount: any = null;
  type_count: any = 1;
  num_use: any = 0;
  categories_selected: any = [];
  products_selected: any = [];

  type_cupon: any = 1;

  products: any = [];
  categories: any = [];

  product_id: any = null;
  categorie_id: any = null;

  constructor(public _cuponesService: CuponesService,
    public toast: Toaster) {

  }

  ngOnInit(): void {
    this.isLoading$ = this._cuponesService.isLoadingSubject;
    this.config_all();
  }

  checkedTipoDescuento(value) {
    this.type_discount = value;
  }

  checkedTipoUso(value) {
    this.type_count = value;
  }

  checkedTipoProductoCategoria(value) {
    this.type_cupon = value;

    this.products_selected = [];
    this.categories_selected = [];
    this.product_id = null;
    this.categorie_id = null;
  }

  config_all() {
    this._cuponesService.config_all().subscribe((resp: any) => {
      console.log(resp);
      this.categories = resp.categories;
      this.products = resp.products;
    });
  }

  addObjectTable() {
    if (this.type_cupon == 1) {
      let product = this.products.find(item => item.id == this.product_id);

      let INDEX = this.products_selected.findIndex(item => item.id == this.product_id);
      if (INDEX != -1) { // Si me da diferente de -1, significa que ya existe
        this.toast.open(NoticyAlertComponent, { text: `warning-'El producto ya fue agregado a la tabla.'` });
        return;
      } else {
        this.product_id = null;
        this.products_selected.push(
          {
            name: product.tittle,
            id: product.id,
          });
      }


    } else {

      let categorie = this.categories.find(item => item.id == this.categorie_id);

      let INDEX = this.categories_selected.findIndex(item => item.id == this.categorie_id);
      if (INDEX != -1) { // Si me da diferente de -1, significa que ya existe
        this.toast.open(NoticyAlertComponent, { text: `warning-'La categoría ya fue agregado a la tabla.'` });
        return;
      } else {
        this.categorie_id = null;
        this.categories_selected.push(
          {
            name: categorie.name,
            id: categorie.id,
          });
      }
    }
  }

  addNewCupon() {
    if (!this.code) {
      this.toast.open(NoticyAlertComponent, { text: `warning-'Necesitas digitar un codigo de cupon.'` });
      return;
    }

    if (this.discount <= 0) {
      this.toast.open(NoticyAlertComponent, { text: `warning-'El descuento tiene que ser mayor a cero.'` });
      return;
    }

    if (this.type_count == 2 && this.num_use <= 0) {
      this.toast.open(NoticyAlertComponent, { text: `warning-'El Num de Uso tiene que ser mayor a cero.'` });
      return;
    }

    if (this.type_cupon == 1 && this.products_selected.length == 0) {
      this.toast.open(NoticyAlertComponent, { text: `warning-'Necesitas agregar al menos un producto.'` });
      return;
    } else if (this.type_cupon == 2 && this.categories_selected.length == 0) {
      this.toast.open(NoticyAlertComponent, { text: `warning-'Necesitas agregar al menos una categoría.'` });
      return;
    }

    let data = {
      code: this.code,
      type_discount: this.type_discount,
      discount: this.discount,
      type_count: this.type_count,
      num_use: this.num_use,
      type_cupon: this.type_cupon,
      products_selected: this.products_selected,
      categories_selected: this.categories_selected,
    }

    this._cuponesService.createCupon(data).subscribe((resp: any) => {
      console.log(resp);

      if (resp.message == 403) {
        this.toast.open(NoticyAlertComponent, { text: `warning-'${resp.message_text}'` });
        return;
      } else {
        this.toast.open(NoticyAlertComponent, { text: `success-'Se creado correctamente el Cupon.'` });
        this.code = null;
        this.type_discount = 1;
        this.discount = null;
        this.type_count = 1;
        this.num_use = 0;
        this.type_cupon = 1;
        this.products_selected = [];
        this.categories_selected = [];
        return;
      }
    });
  }

  deleteProductTable(productS) {
    let INDEX = this.products_selected.findIndex(item => item.id == productS.id);
    if (INDEX != -1) {
      this.products_selected.splice(INDEX, 1);
    }
  }

  deleteCategorieTable(categoriaS) {
    let INDEX = this.categories_selected.findIndex(item => item.id == categoriaS.id);
    if (INDEX != -1) {
      this.categories_selected.splice(INDEX, 1);
    }
  }
}
