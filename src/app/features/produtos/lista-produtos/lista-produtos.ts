import { Component, inject } from '@angular/core';
import { signal } from '@angular/core';
import { Produto } from '../produto/produto';
import { computed } from '@angular/core';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { effect } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
//import { HttpClient } from '@angular/common/http';
import { produtoService } from '../produto.service';
import { Inject } from '@angular/core';


@Component({
  selector: 'app-lista-produtos',
  imports: [ Produto, PrecoFormatadoPipe, UpperCasePipe],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})

export class ListaProdutos {
  //! remove a lista de produtos, dados carregados via API Fakestar 
produtos = signal <
{ nome: string; preco: number } []> ([])
//? criar estado de carregamento, 
//** true: requisitos em andamento 
//! false: esconder o indicator e exibir lista de produtos
carregando = signal(true);

//!cria um metodo para a requisição dos produtos

carregarProdutos(){
  this.carregando.set(true);

  this.produtoService.buscarProdutos().subscribe({
              next: (dados) => {
                const produtos = this.produtoService.trasnformarProdutos(dados);
                this.produtos.set(produtos);
                this.carregando.set(false);
              },
              error: (erro) => {
                console.error('Erro ao carregar os Produtos:, ', erro);
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
   console.log('Lista de Produtos Alterados:', this.produtos());
 });

 effect(() => {
   console.log('Valor total atualizado: ', this.valorTotal());
 });

 effect(() => {
if (typeof document !== 'undefined') {
    document.title = `(${this.totalProdutos()}) Minha Loja`
  }
 });

 }
 produtoSelecionado = signal<string | null> (null);
 carrinho = signal< { nome: string; preco: number }[]>([]);

 adicionarAoCarrinho(produto:{nome:string; preco:number}){
   this.carrinho.update(listaAtual =>
      [...listaAtual,produto]);}


   quantidadeCarrinho = computed(() => this.carrinho().length);

   totalCarrinho = computed(()=> {
      return this.carrinho().reduce((total, item) => 
      total + item.preco,0);
    
    
    
    
    }
);
//? INJECT
private produtoService = inject(produtoService)
}