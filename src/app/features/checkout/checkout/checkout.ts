import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { ValidationErrors } from '@angular/forms';
//import { CarrinhoService } from '../../../core/services/carrinho.service';
import { CarrinhoFacade } from '../../../core/facades/carrinho.facade';
import { AuthFacade } from '../../../core/facades/auth.facade';
import { RouterLink } from "@angular/router";
import { Router } from '@angular/router';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
// import { MatAnchor } from "@angular/material/button";
import { ItemCarrinho } from '../../../core/models/item-carrinho';


type PedidoFinalizado = {
  codigo: number;
  cliente: string;
  quantidadeItens: number;
  total: number;
  itens: ItemCarrinho []; 
}

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, RouterLink, PrecoFormatadoPipe],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})




export class Checkout { 

  pedidoFinalizado =signal < PedidoFinalizado | null >(null);
  // compraFinalizada = signal(false);

  carrinhoFacade = inject(CarrinhoFacade);
  router = inject(Router);
  authFacade = inject(AuthFacade);

  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3), nomeSemNumeros]),
    email: new FormControl('', [Validators.required, Validators.email]),
    endereco: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  finalizar () {
    this.pedidoFinalizado.set(null);
    // this.compraFinalizada.set(false);

    if(this.carrinhoFacade.carrinhoVazio()){
      console.log('Não é possível finalizar a compra vom o carrinho vazio!');
      return; 
    }
    if(this.formulario.invalid) {
      console.log('Formulário Inválido! ');
      this.formulario.markAllAsTouched();
      return;
    }
    const dados = this.formulario.value;
    const itens = this.carrinhoFacade.itensCarrinho();
    const total = this.carrinhoFacade.totalCarrinho();
    
    const pedido: PedidoFinalizado = {
      codigo: Date.now(),
      cliente: dados.nome ?? '',
      quantidadeItens: itens.length,
      total,
      itens,
    }

    console.log('Compra Finalizada com sucesso! ');
    console.log('Dados do Formulário:', dados);
    console.log('Pedido', pedido);
    
    this.carrinhoFacade.limparCarrinho();
    this.formulario.reset();
    // this.compraFinalizada.set(true);
    this.pedidoFinalizado.set(pedido);


    }

  

  sair(){
    this.authFacade.sair();
    this.router.navigateByUrl('/login');
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