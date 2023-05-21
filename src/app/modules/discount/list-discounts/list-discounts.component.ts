import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DiscountService } from '../_services/discount.service';
import { DeleteNewDiscountComponent } from '../delete-new-discount/delete-new-discount.component';

@Component({
  selector: 'app-list-discounts',
  templateUrl: './list-discounts.component.html',
  styleUrls: ['./list-discounts.component.scss']
})
export class ListDiscountsComponent implements OnInit {
  isLoading$: any;

  discounts: any = [];
  search: any = null;
  constructor(
    public _discountServices: DiscountService,
    public _modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this._discountServices.isLoadingSubject;
    this.allDescuentos();
  }
  allDescuentos() {
    this._discountServices.allDescuentos(1, this.search).subscribe((resp: any) => {
      console.log(resp);
      this.discounts = resp.discounts.data;
    })
  }
  reset() {
    this.search = null;
    this.allDescuentos();
  }
  getTypeDiscount(value) {
    if (value == 1) {
      return "PORCENTAJE"
    } else {
      return "MONEDA"
    }
  }

  getTypeDes(cupon) {
    if (cupon.products) {
      return "PRODUCTOS";
    } else {
      return "CATEGORIAS";
    }
  }

  delete(discount) {
    const modalRef = this._modalService.open(DeleteNewDiscountComponent, { centered: true, size: 'sm' });
    modalRef.componentInstance.discount_selected = discount;
    modalRef.result.then(
      () => {

      },
      () => {

      }
    )
    modalRef.componentInstance.discountE.subscribe((resp: any) => {
      let INDEX = this.discounts.findIndex(item => item.id == resp.id);
      this.discounts.splice(INDEX, 1);
    })
  }

}
