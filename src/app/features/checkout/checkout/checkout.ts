import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { ValidationErrors } from '@angular/forms';
import { CarrinhoService } from '../../../core/services/carrinho.service';

@Component({
  selector: 'app-checkout',
  imports: [ ReactiveFormsModule ],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout { 

  carrinhoService = inject(CarrinhoService);
  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3), nomeSemNumeros]),
    email: new FormControl('', [Validators.required, Validators.email]),
    endereco: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  finalizar (){
    console.log('Dados do Formulário: ', this.formulario.value);
    console.log('Itens do Carrinho: ', this.carrinhoService.itens());
  }

}
function nomeSemNumeros(control: AbstractControl): ValidationErrors | null {
  const valor = control.value;
  if (!valor) return null;

  if (/\d/.test(valor)){
    return {numeroInvalido: true};
  }
  return null;
}