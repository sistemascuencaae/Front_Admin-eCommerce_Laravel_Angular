import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiscountComponent } from './discount.component';
import { AddNewDiscountComponent } from './add-new-discount/add-new-discount.component';
import { EditNewDiscountComponent } from './edit-new-discount/edit-new-discount.component';
import { ListDiscountsComponent } from './list-discounts/list-discounts.component';

const routes: Routes = [
  {
    path: '', component: DiscountComponent,
    children: [
      { path: 'registrar-descuento', component: AddNewDiscountComponent },
      { path: 'editar-descuento/:id', component: EditNewDiscountComponent },
      { path: 'lista-descuentos', component: ListDiscountsComponent },
      { path: '', redirectTo: 'lista-descuentos', pathMatch: 'full' },
      { path: '**', redirectTo: 'lista-descuentos', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscountRoutingModule { }
