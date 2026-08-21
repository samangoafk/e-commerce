import { Component, inject } from '@angular/core';
import { signal } from '@angular/core';
import { Produto } from '../produto/produto';
import { computed } from '@angular/core';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { effect } from '@angular/core';
import { UpperCasePipe } from '@angular/common';

import { produtoService } from '../../../core/services/produto.service';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

import { RouterLink } from '@angular/router';
import { ProdutoLoja } from '../../../core/models/produto-loja';
import { ItemCarrinho } from '../../../core/models/item-carrinho';
import { CarrinhoFacade } from '../../../core/facades/carrinho.facade';


@Component({
  selector: 'app-lista-produtos',
  imports: [ Produto, PrecoFormatadoPipe, UpperCasePipe, MatButtonModule, MatCardModule, RouterLink],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})

export class ListaProdutos {
  //! remove a lista de produtos, dados carregados via API Fakestar 
produtos = signal < ProdutoLoja[] > ([])
carregando = signal(true);
erro = signal < string | null > (null)


//? ============ COMPUTED ===============

carregarProdutos(){
  this.carregando.set(true);
  this.erro.set(null), //? Limpa erro anterior

  this.produtoService.buscarProdutos().subscribe({
              next: (dados) => {
                const produtos = this.produtoService.transformarProdutos(dados);
                this.produtos.set(produtos);
                this.carregando.set(false);
              },
              error: (erro) => {
                console.error('Erro ao carregar os Produtos:, ', erro);
                this.erro.set('Erro ao carregar Produtos. Verifique sua conexão e tente novamente.');
                this.carregando.set(false);
              },


  });

  
}

exibirProduto (nome:string){
   //console.log ('Produto selecionado: ', nome);
   this.produtoSelecionado.set(nome);
}
adicionarProduto(){
 this.produtos.update(listaAtual => [
   ...listaAtual, { nome: 'Processador Core i5 14550FS', preco: 2500 }
 ]);

}
totalProdutos = computed(() => this.produtos().length);

valorTotal = computed(() => { 
 return this.produtos().reduce
 ((total, item) => total + item.preco, 0);
});

valorTotalFormatado = computed(()=> this.valorTotal().toFixed(2));

subtituiProdutos(){
   this.produtos.set([
      { nome: 'Teclado', preco: 40 },
        { nome:'Mouse', preco: 10 },
         { nome:'Monitor', preco:100 },
          { nome:'Desktop', preco:500 },
           { nome:'Headset', preco:25 },
   ]);

}
//! injetar httpClient dentro de construct, reestruturar construtor
//? metodo http (API)

constructor( ){
  //! carregar api
  this.carregarProdutos();
  

  //! effect se mantém o mesmo
 

 effect(() => {
if (typeof document !== 'undefined') {
    document.title = `(${this.totalProdutos()}) Minha Loja`
}
 });

 }
 produtoSelecionado = signal<string | null> (null);
 

 adicionarAoCarrinho(produto: ItemCarrinho){
  this.carrinhoFacade.adicionarProdutoCarrinho(produto);
 }
 

//? ============ INJECT ==============
private produtoService = inject(produtoService); //lembrete: Nossa variável é produtoService e Não produtosService
carrinhoFacade = inject(CarrinhoFacade);

quantidadeCarrinho = this.carrinhoFacade.quantidadeCarrinho;
totalCarrinho = this.carrinhoFacade.totalCarrinho;
}