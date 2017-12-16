import {AbstractControl, ValidationErrors, FormControl} from "@angular/forms";


export class SelfDefinedValidators {

    static noSpaces(control) : ValidationErrors | null {
        if ((control.value as string).indexOf(" ")>=0){
            return { noSpaces: true };
        }
        return null;
    }


    static rePassCheck(input, err_span: HTMLSpanElement, compareWith: FormControl) {
        this.focusoutCheck(input, err_span);
        if (compareWith.value !== input.value) {
            input.invalid === true;
            compareWith.invalid === true;
            err_span.textContent += 'Password Not Match!';
        }
    }


    static focusoutCheck(input, err_span: HTMLSpanElement){
        err_span.textContent = '';
        if (input.touched && input.invalid) {
            if (input.errors.required) {
                err_span.textContent += 'Required! ';
            }
            if (input.errors.pattern) {
                err_span.textContent += 'Invalid Pattern! ';
            }
            if (input.errors.minlength) {
                //noinspection TypeScriptUnresolvedVariable
                err_span.textContent += 'At Least ' + input.errors.minlength.requiredLength + ' charcters! ';
            }
            if (input.errors.maxlength) {
                //noinspection TypeScriptUnresolvedVariable
                err_span.textContent += 'Max ' + input.errors.maxlength.requiredLength + ' charcters! ';
            }
            if (input.errors.noSpaces) {
                err_span.textContent += 'Space Not Allowed';
            }
        } else {
            err_span.textContent = '';
        }
    }
}