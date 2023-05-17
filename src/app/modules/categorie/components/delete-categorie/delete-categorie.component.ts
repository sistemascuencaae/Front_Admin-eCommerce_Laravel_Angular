import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { CategorieService } from '../../_services/categorie.service';

@Component({
  selector: 'app-delete-categorie',
  templateUrl: './delete-categorie.component.html',
  styleUrls: ['./delete-categorie.component.scss']
})
export class DeleteCategorieComponent implements OnInit {

  @Input() categoria_selected: any = null;
  @Output() clientsE: EventEmitter<any> = new EventEmitter();

  isLoading$;
  isLoading = false;

  constructor(public modal: NgbActiveModal,
    public _categoriaService: CategorieService,
    public toaster: Toaster) { }

  ngOnInit(): void {
    this.isLoading$ = this._categoriaService.isLoading$;
  }

  delete() {
    this._categoriaService.deleteCategoria(this.categoria_selected.id).subscribe((resp: any) => {
      this.toaster.open(NoticyAlertComponent, { text: `primary-'Se ha eliminado correctamente la categoria'` });
      this.modal.close();
      this.clientsE.emit(this.categoria_selected);
    })
  }
}
