import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detail-sales-list',
  templateUrl: './detail-sales-list.component.html',
  styleUrls: ['./detail-sales-list.component.scss']
})
export class DetailSalesListComponent implements OnInit {
  @Input() sale: any;

  constructor(
    public modal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
  }

}
