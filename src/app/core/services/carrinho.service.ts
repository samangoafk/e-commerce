import { Injectable } from "@angular/core";
import { signal } from "@angular/core";
import { computed } from "@angular/core";


type ItemCarrinho = {
    nome: string;
    preco: number;
}

@Injectable({
    providedIn:'root'
})

export class CarrinhoService{
//! Estado global
private carrinho = signal<ItemCarrinho[]>([]);

//? Seletores
itens = computed(()=> this.carrinho());
quantidadeItens = computed(() => this.carrinho().length); //! Quantidade de Itens
totalItens = computed (()=> 
     this.carrinho().reduce((total, item)=> total + item.preco, 0)
);
carrinhoVazio = computed(()=> this.carrinho().length === 0); //metodo

// TODO: Ações
adicionar(produto: ItemCarrinho){
    this.carrinho.update(lista=> [...lista, produto]);
}

limpar(){
    this.carrinho.set([]);
}
}