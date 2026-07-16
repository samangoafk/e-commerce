import { Component, signal } from '@angular/core';
import { Produto } from '../produto/produto';

@Component({
  selector: 'app-lista-produtos',
  imports: [ Produto ],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
produtos = signal([
   
  {nome: 'Teclado Gamer',
     preco:149.99},
  {nome: 'Mouse Gamer',
     preco:299.99},
  {nome: 'Monitor Gamer',
     preco:1599.99},
  {nome: 'Desktop Gamer',
     preco:4999.99},
  {nome: 'Headset Gamer',
     preco:699.99},
]);
exibirProduto (nome:string){
   console.log ('Produto selecionado: ', nome);
}
adicionarProduto(){
 this.produtos.update(listaAtual => [
   ...listaAtual, { nome: 'Polystation 5', preco: 10000 }
 ]);
}
}