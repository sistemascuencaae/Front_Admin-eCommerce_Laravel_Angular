import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SlidersComponent } from './sliders.component';
import { SlidersListsComponent } from './sliders-lists/sliders-lists.component';

const routes: Routes = [
  {
    path: '', component: SlidersComponent,
    children: [
      { path: 'lista', component: SlidersListsComponent },
      { path: '', redirectTo: 'lista', pathMatch: 'full' },
      { path: '**', redirectTo: 'lista', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SlidersRoutingModule { }
