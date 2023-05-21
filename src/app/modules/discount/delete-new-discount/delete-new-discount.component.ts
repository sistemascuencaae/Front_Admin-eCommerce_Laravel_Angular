import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DiscountService } from '../_services/discount.service';

@Component({
  selector: 'app-delete-new-discount',
  templateUrl: './delete-new-discount.component.html',
  styleUrls: ['./delete-new-discount.component.scss']
})
export class DeleteNewDiscountComponent implements OnInit {
  @Input() discount_selected: any = null;
  @Output() discountE: EventEmitter<any> = new EventEmitter();

  isLoading$;
  isLoading = false;

  constructor(
    public _descuentoServices: DiscountService,
    public modal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this._descuentoServices.isLoading$;
  }

  delete() {
    this._descuentoServices.deleteDescuento(this.discount_selected.id).subscribe((resp: any) => {
      console.log(resp);
      this.modal.close();
      this.discountE.emit(this.discount_selected);
    })
  }

}
