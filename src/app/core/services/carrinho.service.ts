import { Injectable } from "@angular/core";
import { signal } from "@angular/core";
import { computed } from "@angular/core";


@Injectable({
    providedIn:'root'
})

export class CarrinhoService{
//! Estado global
private carrinho = signal<{nome: string; preco: number}[]>([]);

//? Seletores
itens = computed(()=> this.carrinho());
quantidadeItens = computed(() => this.carrinho().length); //! Quantidade de Itens
totalItens = computed (()=> 
     this.carrinho().reduce((total, item)=> total + item.preco, 0)
);
// TODO: Ações
adicionar(produto: {nome: string; preco: number}){
    this.carrinho.update(lista=> [...lista, produto]);
}

limpar(){
    this.carrinho.set([]);
}
}