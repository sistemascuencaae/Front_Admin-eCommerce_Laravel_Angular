import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../../_services/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {

  @Output() userE: EventEmitter<any> = new EventEmitter(); //Para refrescar la tabla cada vez q guarde, edite o elimine un usuario

  isLoading$;
  isLoading = false;

  formGroup: FormGroup;

  constructor(public modal: NgbActiveModal,
    public _userService: UsersService,
    public fb: FormBuilder,
    public toaster: Toaster) { }

  ngOnInit(): void {
    this.isLoading$ = this._userService.isLoading$;
    this.loadForm();
  }

  loadForm() {
    this.formGroup = this.fb.group({
      name: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
      surname: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
      email: [null, Validators.compose([Validators.required, Validators.email, Validators.maxLength(249)])],
      state: [1],
      type_user: [2],
      role_id: ['1'],
      password: [null, Validators.compose([Validators.required, Validators.maxLength(249)])],
      rpassword: [null, Validators.compose([Validators.required, Validators.maxLength(249)])]
    });
  }

  save() {
    if (this.formGroup.value.password != this.formGroup.value.rpassword) {
      this.toaster.open(NoticyAlertComponent, { text: `danger-'Upps! Las contraseñas no coinciden'` }); //Ese danger definde que tipo de msj va a ser (danger,primary,success.etc)
      return;
    }

    this._userService.register(this.formGroup.value).subscribe((resp: any) => {
      console.log(this.formGroup);
      console.log(resp);

      if (resp.message == 400) {
        this.toaster.open(NoticyAlertComponent, { text: `warning-'Este usuario ya existe.'` });
        return;
      } else {
        console.log("hola" + resp);
        this.toaster.open(NoticyAlertComponent, { text: `success-'Usuario creado correctamente.'` });
        this.modal.close();
        this.userE.emit(resp.user);
        return;
      }

    })
  }

  // helpers for View
  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation: string, controlName: string) {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.dirty || control.touched;
  }

}
