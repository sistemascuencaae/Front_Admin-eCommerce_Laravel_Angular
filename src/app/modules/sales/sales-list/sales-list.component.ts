import { Component, OnInit } from '@angular/core';
import { DetailSalesListComponent } from '../detail-sales-list/detail-sales-list.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SalesService } from '../_services/sales.service';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss']
})
export class SalesListComponent implements OnInit {

  SALES: any = [];
  isLoading$: any = null;

  search: any = null;

  categories: any = [];
  categorie_id: any = "";
  start_date: any = null;
  end_date: any = null;
  constructor(
    public _salesServices: SalesService,
    public _modelService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this._salesServices.isLoadingSubject;
    this.allSales();
  }

  allSales(page = 1) {
    let data = {
      search: this.search,
      categorie_id: this.categorie_id,
      start_date: this.start_date,
      end_date: this.end_date,
    };
    this._salesServices.allSales(page, data).subscribe((resp: any) => {
      console.log(resp);
      this.SALES = resp.orders.data;
      if (!this.categorie_id) {
        this.categories = resp.categories;
      }
    })
  }

  reset() {
    this.search = null;
    this.categorie_id = null;
    this.start_date = null;
    this.end_date = null;
    this.allSales();
  }

  showDetail(sale) {
    const modalRef = this._modelService.open(DetailSalesListComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.sale = sale;
    modalRef.result.then(
      () => {

      },
      () => {

      }
    )
  }
}
