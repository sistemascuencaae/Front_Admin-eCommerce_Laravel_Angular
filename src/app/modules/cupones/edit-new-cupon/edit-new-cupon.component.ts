import { Component, OnInit } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { CuponesService } from '../_services/cupones.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-new-cupon',
  templateUrl: './edit-new-cupon.component.html',
  styleUrls: ['./edit-new-cupon.component.scss']
})
export class EditNewCuponComponent implements OnInit {

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

  cupon: any = {
    code: '',
  }

  cupon_id: any = null;

  state: any = 1;

  constructor(public _cuponesService: CuponesService,
    public toast: Toaster,
    public router: Router,
    public activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.isLoading$ = this._cuponesService.isLoadingSubject;

    this.activatedRoute.params.subscribe((resp: any) => {
      this.cupon_id = resp["id"] || "";
    });

    this.config_all();
    this.showCupon();
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
      // console.log(resp);
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
      state: this.state,
    }

    this._cuponesService.updateCupon(this.cupon.id, data).subscribe((resp: any) => {
      // console.log(resp);

      if (resp.message == 403) {
        this.toast.open(NoticyAlertComponent, { text: `warning-'${resp.message_text}'` });
        return;
      } else {
        this.router.navigate(['/cupones/lista-cupones']);
        this.toast.open(NoticyAlertComponent, { text: `success-'Se actualizado correctamente el Cupon.'` });
        return;
      }
    });
  }

  showCupon() {
    this._cuponesService.showCupon(this.cupon_id).subscribe((resp: any) => {
      this.cupon = resp.cupone;
      this.code = this.cupon.code;
      this.type_discount = this.cupon.type_discount;
      this.discount = this.cupon.discount;
      this.type_count = this.cupon.type_count;
      this.num_use = this.cupon.num_use;
      this.state = this.cupon.state;

      this.type_cupon = this.cupon.products ? 1 : 2;

      //Convierte el string en array con split
      if (this.type_cupon == 1) {

        let PRODUCTS = this.cupon.products.split(",");

        PRODUCTS.forEach(prod_id => {
          let p = this.products.find(item => item.id == prod_id);

          this.products_selected.push({
            name: p.tittle,
            id: p.id,
          })
        });

      }

      if (this.type_cupon == 2) {

        let CATEGORIES = this.cupon.categories.split(",");

        CATEGORIES.forEach(cate_id => {
          let c = this.categories.find(item => item.id == cate_id);

          this.categories_selected.push({
            name: c.name,
            id: c.id,
          })
        });
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
