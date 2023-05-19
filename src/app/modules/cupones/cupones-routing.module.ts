import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CuponesComponent } from './cupones.component';
import { AddNewCuponComponent } from './add-new-cupon/add-new-cupon.component';
import { EditNewCuponComponent } from './edit-new-cupon/edit-new-cupon.component';
import { ListCuponesComponent } from './list-cupones/list-cupones.component';

const routes: Routes = [
  {
    path: '', component: CuponesComponent,
    children: [
      { path: 'registrar-cupon', component: AddNewCuponComponent },
      { path: 'editar-cupon/:id', component: EditNewCuponComponent },
      { path: 'lista-cupones', component: ListCuponesComponent },
      { path: '', redirectTo: 'lista-cupones', pathMatch: 'full' },
      { path: '**', redirectTo: 'lista-cupones', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuponesRoutingModule { }
