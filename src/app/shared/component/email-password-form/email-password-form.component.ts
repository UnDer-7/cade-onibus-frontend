import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../model/user.model';
import { ComponentsUtils } from '../../../utils/components-utils';

@Component({
  selector: 'app-email-password-form',
  templateUrl: './email-password-form.component.html',
})
export class EmailPasswordFormComponent extends ComponentsUtils implements OnInit {

  @Input() public isCreation: boolean = true;
  @Output() public userSubmitted: EventEmitter<User> = new EventEmitter();

  public loginWithEmailForm!: FormGroup;

  public passwordIcon: string = 'eye-off';
  public passwordType: string = 'password';
  public isSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
  ) { super(); }

  public ngOnInit(): void {
    if (this.isCreation) {
      this.newAccountFormBuilder();
    } else {
      this.loginFormBuilder();
    }
  }

  public saveEmailPassword(): void {
    this.isSubmitted = true;
    if (this.loginWithEmailForm.invalid) return;

    this.userSubmitted.emit(this.loginWithEmailForm.value);
  }

  public showPassword(): void {
    if (this.passwordIcon === 'eye-off') {
      this.passwordIcon = 'eye';
      this.passwordType = 'text';
    } else {
      this.passwordIcon = 'eye-off';
      this.passwordType = 'password';
    }
  }

  get buttonText(): string {
    if (this.isCreation) {
      return 'CRIAR COM E-MAIL/SENHA';
    }
    return 'ENTRAR';
  }

  get formControls(): { [p: string]: AbstractControl } {
    return this.loginWithEmailForm.controls;
  }

  get nameValidations(): string | undefined {
    if (!(this.isSubmitted && this.formControls)) return;

    if (!this.formControls.name.errors) return;

    if (this.formControls.name.errors.hasOwnProperty('required')) {
      return 'Nome é obrigatorio';
    }

    if (this.formControls.name.errors.hasOwnProperty('minlength')) {
      return 'Tamanho mínimo 2 caracteres';
    }

    if (this.formControls.name.errors.hasOwnProperty('maxlength')) {
      return 'Tamanho máximo 50 caracteres';
    }
  }

  get emailValidations(): string | undefined {
    if (!(this.isSubmitted && this.formControls)) return;

    if (!this.formControls.email.errors) return;

    if (this.formControls.email.errors.hasOwnProperty('required')) {
      return 'E-mail é obrigatorio';
    }

    if (this.formControls.email.errors.hasOwnProperty('maxlength')) {
      return 'Tamanho máximo 50 caracteres';
    }

    if (this.formControls.email.errors.hasOwnProperty('email')) {
      return 'E-mail invalido';
    }
  }

  get passwordValidations(): string | undefined {
    if (!(this.isSubmitted && this.formControls)) return;

    if (!this.formControls.password.errors) return;

    if (this.formControls.password.errors.hasOwnProperty('required')) {
      return 'Senha é obrigatorio';
    }

    if (this.formControls.password.errors.hasOwnProperty('minlength')) {
      return 'Tamanho mínimo 5 caracteres';
    }

    if (this.formControls.password.errors.hasOwnProperty('maxlength')) {
      return 'Tamanho máximo 50 caracteres';
    }
  }

  private loginFormBuilder(): void {
    this.loginWithEmailForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(50),
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
      ]],
    });
  }

  private newAccountFormBuilder(): void {
    this.loginWithEmailForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(50),
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
      ]],
    });
  }
}
