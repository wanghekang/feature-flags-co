import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export const repeatPasswordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.get('password');
    const _password = control.get('_password');

    if (!password.value || !_password.value || password.value !== _password.value) {
      return showError(_password, '_password');
    }
    return clearErrors(password, _password);
  };

  function showError(control: AbstractControl, type: string) {
    const error = {
        [type]: true
    };
    control.setErrors(error);
    return error;
}

function clearErrors(...controls: AbstractControl[]) {
    controls.forEach(control => control.setErrors(null));
    return null;
}
