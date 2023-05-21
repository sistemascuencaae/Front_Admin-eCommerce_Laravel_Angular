import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { DiscountService } from '../_services/discount.service';

@Component({
  selector: 'app-edit-new-discount',
  templateUrl: './edit-new-discount.component.html',
  styleUrls: ['./edit-new-discount.component.scss']
})
export class EditNewDiscountComponent implements OnInit {
  isLoading$: any;

  type_discount: any = 1;
  discount: any = null;

  type_dis: any = 1;
  categories_selected: any = [];
  products_selected: any = [];

  categories: any = [];
  products: any = [];

  product_id: any = null;
  categorie_id: any = null;

  start_date: any = null;
  end_date: any = null;

  discount_id: any = null;
  discount_selected: any = {
    code: '',
  }
  state: any = null;
  constructor(
    public _descuentosServices: DiscountService,
    public toaster: Toaster,
    public router: Router,
    public activerouter: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this._descuentosServices.isLoadingSubject;
    this.activerouter.params.subscribe((resp: any) => {
      this.discount_id = resp["id"];
    })
    this.configAll();
    this._descuentosServices.showDescuento(this.discount_id).subscribe((resp: any) => {
      console.log(resp);
      this.discount_selected = resp.discount;
      this.type_discount = this.discount_selected.type_discount;
      this.discount = this.discount_selected.discount;
      this.start_date = this.discount_selected.start_date;
      this.end_date = this.discount_selected.end_date;
      this.state = this.discount_selected.state;
      this.type_dis = this.discount_selected.type;
      if (this.type_dis == 1) {
        this.discount_selected.products.forEach(element => {
          let PROD = this.products.find(item => item.id == element.product_id);
          this.products_selected.push({
            name: PROD.tittle,
            id: PROD.id
          });
        });
      }
      if (this.type_dis == 2) {
        this.discount_selected.categories.forEach(element => {
          let CATEG = this.categories.find(item => item.id == element.categorie_id);
          this.categories_selected.push({
            name: CATEG.name,
            id: CATEG.id
          });
        });
      }
    });
  }
  configAll() {
    this._descuentosServices.configAll().subscribe((resp: any) => {
      console.log(resp);
      this.categories = resp.categories;
      this.products = resp.products;
    });
  }
  checkedTypeD(value) {
    this.type_discount = value;
  }

  checkedTypePC(value) {
    this.type_dis = value;
    this.products_selected = [];
    this.categories_selected = [];
    this.product_id = null;
    this.categorie_id = null;
  }

  addObject() {
    if (this.type_dis == 1) {
      let PRODUCT = this.products.find(item => item.id == this.product_id);
      let INDEX = this.products_selected.findIndex(item => item.id == this.product_id);
      if (INDEX != -1) {
        this.toaster.open(NoticyAlertComponent, { text: `danger-'EL PRODUCTO YA FUE SELECCIONADO.'` });
        return;
      } else {
        this.product_id = null;
        this.products_selected.push({
          name: PRODUCT.tittle,
          id: PRODUCT.id,
        });
      }
    } else {
      let CATEGORIA = this.categories.find(item => item.id == this.categorie_id);
      let INDEX = this.categories_selected.findIndex(item => item.id == this.categorie_id);
      if (INDEX != -1) {
        this.toaster.open(NoticyAlertComponent, { text: `danger-'EL CATEGORIA YA FUE SELECCIONADO.'` });
        return;
      } else {
        this.categorie_id = null;
        this.categories_selected.push({
          name: CATEGORIA.name,
          id: CATEGORIA.id,
        });
      }
    }
  }

  newDiscount() {

    if (this.discount <= 0) {
      this.toaster.open(NoticyAlertComponent, { text: `danger-'EL DESCUENTO TIENE QUE SER MAYOR A 0.'` });
      return;
    }

    if (!this.start_date || !this.end_date) {
      this.toaster.open(NoticyAlertComponent, { text: `danger-'LAS FECHA DE INICIO Y FIN SON OBLIGATORIAS.'` });
      return;
    }

    if (this.type_dis == 1 && this.products_selected.length == 0) {
      this.toaster.open(NoticyAlertComponent, { text: `danger-'NECESITAS AGREGAR UN PRODUCTO.'` });
      return;
    }
    if (this.type_dis == 2 && this.categories_selected.length == 0) {
      this.toaster.open(NoticyAlertComponent, { text: `danger-'NECESITAS AGREGAR UNA CATEGORIA.'` });
      return;
    }

    let data = {
      type_discount: this.type_discount,
      discount: this.discount,
      type: this.type_dis,
      start_date: this.start_date,
      end_date: this.end_date,
      products_selected: this.products_selected,
      categories_selected: this.categories_selected,
      state: this.state,
    }

    this._descuentosServices.updateDescuento(this.discount_id, data).subscribe((resp: any) => {
      console.log(resp);
      if (resp.message == 403) {
        this.toaster.open(NoticyAlertComponent, { text: `danger-'${resp.message_text}.'` });
        return;
      } else {
        this.toaster.open(NoticyAlertComponent, { text: `primary-'SE HA REGISTRADO LOS CAMBIOS DEL DESCUENTO PERFECTAMENTE.'` });
        return;
      }
    })
  }

  productD(productS) {
    let INDEX = this.products_selected.findIndex(item => item.id == productS.id);
    if (INDEX != -1) {
      this.products_selected.splice(INDEX, 1);
    }
  }
  categorieD(categoriaS) {
    let INDEX = this.categories_selected.findIndex(item => item.id == categoriaS.id);
    if (INDEX != -1) {
      this.categories_selected.splice(INDEX, 1);
    }
  }
}
