import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { EditNewProductsComponent } from './edit-new-products/edit-new-products.component';

const routes: Routes = [
  {
    path: '', component: ProductsComponent,
    children: [
      { path: 'add-product', component: AddNewProductComponent },
      { path: 'list-product', component: ListProductsComponent },
      { path: 'edit-product/:id', component: EditNewProductsComponent },
      { path: '', redirectTo: 'add-product', pathMatch: 'full' },
      { path: '**', redirectTo: 'add-product', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
