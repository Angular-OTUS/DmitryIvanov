import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appTaskName]',
  providers: [{ provide: NG_VALIDATORS, useExisting: TaskNameDirective, multi: true }],
  standalone: true,
})
export class TaskNameDirective implements Validator {
  private lengthExcludingSpaces(control: AbstractControl): number {
    return typeof control.value === 'string' ? control.value.trim().length : 0;
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    return this.lengthExcludingSpaces(control) > 0 ? null : { taskName: true };
  }
}
