import { Component, OnInit } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { ProductsService } from '../_services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { URL_BACKEND } from 'src/app/config/config';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteImagenPComponent } from '../edit-new-product/delete-imagen-p/delete-imagen-p.component';

@Component({
  selector: 'app-edit-new-products',
  templateUrl: './edit-new-products.component.html',
  styleUrls: ['./edit-new-products.component.scss']
})
export class EditNewProductsComponent implements OnInit {

  isLoading$;

  tittle: any = null;
  sku: any = null;
  categorie_id = '';
  price_soles = '';
  price_usd = '';

  imagen_file: any = null;
  imagen_previzualiza: any = null;

  images_files: any = [];
  img_files: any = null;
  img_previzualizar: any = null;

  resumen: any = null;
  description: any = null;

  text: any = null;
  tags: any = [];

  categories: any = [];

  product_id: any = null;
  product: any = {
    tittle: '',
  }

  URL_BACKEND = URL_BACKEND;
  constructor(
    public toaster: Toaster,
    public _productsService: ProductsService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public modelService: NgbModal) {
  }

  ngOnInit(): void {
    this.isLoading$ = this._productsService.isLoading$;

    this.activatedRoute.params.subscribe((resp: any) => {
      this.product_id = resp["id"] || "";
      console.log(resp);
    });

    this.listCategories();
    this.showProduct();
  }

  loadServices() {
    this._productsService.isLoadingSubject.next(true);
    setTimeout(() => {
      this._productsService.isLoadingSubject.next(false)
    }, 50)
  }

  listCategories() {
    this._productsService.getInfoCategorias().subscribe((resp: any) => {
      this.categories = resp.categories;
    });
  }

  showProduct() {
    this._productsService.showProduct(this.product_id).subscribe((resp: any) => {
      console.log(resp);
      this.product = resp.product;

      this.tittle = this.product.tittle;
      this.sku = this.product.sku;
      this.categorie_id = this.product.categorie_id;
      this.price_soles = this.product.price_soles;
      this.price_usd = this.product.price_usd;
      this.resumen = this.product.resumen;
      this.description = this.product.description;

      this.tags = this.product.tags_a;
      this.imagen_previzualiza = this.URL_BACKEND + this.product.imagen;
      this.images_files = this.product.images;
    });
  }

  processFile($event) {

    if ($event.target.files[0].type.indexOf("image") < 0) { //Aqui solo carga una imagen e la posicion cero
      this.toaster.open(NoticyAlertComponent, { text: `danger-'El archivo cargado no es una imagen.'` });
      return;
    }

    this.imagen_file = $event.target.files[0];
    let reader = new FileReader();

    reader.readAsDataURL(this.imagen_file);
    reader.onloadend = () => this.imagen_previzualiza = reader.result;
    this.loadServices();
  }

  addTags() {
    this.tags.push(this.text);
    this.text = null;
  }

  removeTags(i) {
    this.tags.splice(i, 1);
  }

  addFile($event) {
    if ($event.target.files[0].type.indexOf("image") < 0) { //Aqui solo carga una imagen e la posicion cero
      this.toaster.open(NoticyAlertComponent, { text: `danger-'El archivo cargado no es una imagen.'` });
      return;
    }

    this.img_files = $event.target.files[0];
    let reader = new FileReader();

    reader.readAsDataURL(this.img_files);
    reader.onloadend = () => this.img_previzualizar = reader.result;
  }

  addImages() {
    if (!this.img_files) { //Si no existe una imagen
      this.toaster.open(NoticyAlertComponent, { text: `warning-'Debe agregar una imagen.'` });
      return;
    }

    let formData = new FormData();
    formData.append("product_id", this.product_id);
    formData.append("file", this.img_files);

    this._productsService.addImagenProduct(formData).subscribe((resp: any) => {
      this.img_files = null;
      this.img_previzualizar = null;
      this.images_files.unshift(resp.imagen);
    });
  }

  removeImages(imagen_) {
    const modalRef = this.modelService.open(DeleteImagenPComponent, { centered: true, size: 'sm' });
    modalRef.componentInstance.imagen_ = imagen_; //Instancio la variable categoria_selected del component EditCategoriaComponent
    modalRef.result.then( //Esta parte es cuando ya se cierra el modal
      () => {

      },
      () => {

      }
    )
    modalRef.componentInstance.imagenE.subscribe((resp: any) => {
      let INDEX = this.images_files.findIndex(img => img.id == resp.id);
      this.images_files.splice(INDEX, 1);
    })
  }

  updateProduct() {
    //Si no existe
    if (!this.tittle || !this.categorie_id || !this.price_soles ||
      !this.price_usd || !this.resumen || !this.description) {
      this.toaster.open(NoticyAlertComponent, { text: `danger-'Debe llenar todos los campos.'` });
    }

    let formData = new FormData();

    formData.append("tittle", this.tittle);
    formData.append("sku", this.sku);
    formData.append("categorie_id", this.categorie_id);
    formData.append("price_soles", this.price_soles);
    formData.append("price_usd", this.price_usd);
    formData.append("resumen", this.resumen);
    formData.append("description", this.description);
    formData.append("imagen_file", this.imagen_file);
    formData.append("tags", this.tags);

    this._productsService.updateProduct(this.product_id, formData).subscribe((resp: any) => {
      console.log(resp);
      // this.toaster.open(NoticyAlertComponent, { text: `success-'Producto actualizado correctamente.'` });
    });
  }
}
