import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuponesRoutingModule } from './cupones-routing.module';
import { CuponesComponent } from './cupones.component';
import { ListCuponesComponent } from './list-cupones/list-cupones.component';
import { AddNewCuponComponent } from './add-new-cupon/add-new-cupon.component';
import { EditNewCuponComponent } from './edit-new-cupon/edit-new-cupon.component';
import { DeleteNewCuponComponent } from './delete-new-cupon/delete-new-cupon.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg';
import { CRUDTableModule } from 'src/app/_metronic/shared/crud-table';


@NgModule({
  declarations: [CuponesComponent, ListCuponesComponent, AddNewCuponComponent, EditNewCuponComponent, DeleteNewCuponComponent],
  imports: [
    CommonModule,
    CuponesRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    CRUDTableModule,
    NgbModalModule,
    NgbDatepickerModule,
  ]
})
export class CuponesModule { }
