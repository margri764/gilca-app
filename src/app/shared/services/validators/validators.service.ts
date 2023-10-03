import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  // valido solo números postivos del 0 al 9
public positiveNumber : string = "^[0-9]+";

  constructor() { }


  greaterThanZero(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value <= 0) {
        return { greaterThanZero: true };
      }
      return null;
    };
  }
}
