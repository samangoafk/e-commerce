import { Injectable, PLATFORM_ID } from "@angular/core";
import { signal, computed, effect, inject } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { ItemCarrinho } from "../models/item-carrinho";


@Injectable({
    providedIn:'root'
})

export class CarrinhoService{


//! Estado global
private carrinho = signal<ItemCarrinho[]>(this.carregarcarrinhoSalvo());

//? Seletores
itens = computed(()=> this.carrinho());
quantidadeItens = computed(() => this.carrinho().length); //! Quantidade de Itens
totalItens = computed (()=> 
     this.carrinho().reduce((total, item)=> total + item.preco, 0)
);
carrinhoVazio = computed(()=> this.carrinho().length === 0); //metodo


//! persistencia carrinho
private platformId = inject(PLATFORM_ID);

//! chave de recuprração localstorage
private readonly chaveStorage = 'carrinho=storage';

constructor(){
    effect(()=> {
        this.salvarCarrinho(this.carrinho());
        
    });
}
private estaNoNavegador(){
    return isPlatformBrowser(this.platformId);
}

private carregarcarrinhoSalvo(): ItemCarrinho []{
    if(!this.estaNoNavegador()){
        return [];
    }
    const dadosSalvos = localStorage.getItem(this.chaveStorage);

    if(!dadosSalvos){
        return [];
    }
    try {
        return JSON.parse(dadosSalvos) as ItemCarrinho[];
    }catch{
        return[];
    }
}
private salvarCarrinho (item: ItemCarrinho[]){
    if(!this.estaNoNavegador()){
       return;
    }
    localStorage.setItem(this.chaveStorage, JSON.stringify(item))
        

}

// TODO: Ações
adicionar(produto: ItemCarrinho){
    this.carrinho.update(lista=> [...lista, produto]);
}

limpar(){
    this.carrinho.set([]);
}
removerItem(rmvItem:number){
    this.carrinho.update((ListaAtual)=>
    ListaAtual.filter((_, index)=> index !== rmvItem));
}
}