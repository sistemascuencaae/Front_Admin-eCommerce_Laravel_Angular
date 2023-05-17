import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../../_services/users.service';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {

  @Input() user_selected: any = null;
  @Output() userE: EventEmitter<any> = new EventEmitter();

  isLoading$;
  isLoading = false;

  constructor(public modal: NgbActiveModal,
    public _userService: UsersService,
    public toaster: Toaster) { }

  ngOnInit(): void {
    this.isLoading$ = this._userService.isLoading$;
  }

  delete() {
    this._userService.deleteUser(this.user_selected.id).subscribe((resp: any) => {
      this.toaster.open(NoticyAlertComponent, { text: `primary-'Se ha eliminado correctamente al usuario'` });
      this.modal.close();
      this.userE.emit(this.user_selected);
    })
  }

}
