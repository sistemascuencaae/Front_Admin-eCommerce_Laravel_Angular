import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesListComponent } from './sales-list/sales-list.component';
import { SalesComponent } from './sales.component';

const routes: Routes = [
  {
    path: '',
    component: SalesComponent,
    children: [
      {
        path: 'lista-de-ordenes',
        component: SalesListComponent,
      },
      {
        path: '', redirectTo: 'lista-de-ordenes', pathMatch: 'full',
      },
      {
        path: '**', redirectTo: 'lista-de-ordenes', pathMatch: 'full',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
