import { Component, OnInit } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { ProductsService } from '../_services/products.service';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss']
})
export class AddNewProductComponent implements OnInit {

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
  constructor(
    public toaster: Toaster,
    public _productsService: ProductsService) {
  }

  ngOnInit(): void {
    this.isLoading$ = this._productsService.isLoading$;
    this.listCategories();
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
    this.images_files.push({
      file: this.img_files,
      show: this.img_previzualizar
    });

    this.img_files = null;
    this.img_previzualizar = null;
  }

  removeImages(i) {
    this.images_files.splice(i, 1);
  }

  createProduct() {
    //Si no existe
    if (!this.tittle || !this.categorie_id || !this.price_soles ||
      !this.price_usd || !this.resumen || !this.description || !this.imagen_file) {
      this.toaster.open(NoticyAlertComponent, { text: `danger-'Debe llenar todos los campos.'` });
    }

    if (this.images_files.length == 0) {
      this.toaster.open(NoticyAlertComponent, { text: `danger-'Debe subir al menos una imagen del producto.'` });
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

    //enviamos un grupo de imagenes con el formData
    let index = 0;
    for (const imagen of this.images_files) {
      formData.append("files[" + index + "]", imagen.file);
      index++;
    }

    this._productsService.createProduct(formData).subscribe((resp: any) => {
      console.log(resp);
      this.toaster.open(NoticyAlertComponent, { text: `success-'Producto creado correctamente.'` });
    });
  }

}
