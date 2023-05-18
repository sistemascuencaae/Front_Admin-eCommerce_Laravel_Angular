import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SlidersRoutingModule } from './sliders-routing.module';
import { SlidersComponent } from './sliders.component';
import { SlidersListsComponent } from './sliders-lists/sliders-lists.component';
import { AddSlidersNewComponent } from './components/add-sliders-new/add-sliders-new.component';
import { EditSlidersNewComponent } from './components/edit-sliders-new/edit-sliders-new.component';
import { DeleteSlidersNewComponent } from './components/delete-sliders-new/delete-sliders-new.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg';
import { CRUDTableModule } from 'src/app/_metronic/shared/crud-table';


@NgModule({
  declarations: [SlidersComponent, SlidersListsComponent, AddSlidersNewComponent, EditSlidersNewComponent, DeleteSlidersNewComponent],
  imports: [
    CommonModule,
    SlidersRoutingModule,
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
export class SlidersModule { }
