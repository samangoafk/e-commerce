import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UpperCasePipe, CurrencyPipe} from '@angular/common';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { ItemCarrinho } from '../../../core/models/item-carrinho';

//novo import(eu acho) para usar o, declaradores(input e output)

@Component({
  selector: 'app-produto',
  imports: [UpperCasePipe, PrecoFormatadoPipe, MatButtonModule, MatCardModule],
  templateUrl: './produto.html',
  styleUrl: './produto.css',
})
// nova string (sdiciona/substitui modelo antigo de nomeclatura por um novo. preco e nome)

export class Produto {
  //entrada de dados de lista-produtos.ts
 @Input() nome: string = '';
 @Input() preco: number = 0;

//saída de dados de produtos selecionados para a lista-produtos.ts
@Output() produtoSelecionado = new EventEmitter<string>();
   

selecionarProduto() {
  this.produtoSelecionado.emit(this.nome);
}

  @Output() produtoAdicionado = new EventEmitter<ItemCarrinho>();
  
  adicionarAoCarrinho() {
    this.produtoAdicionado.emit({nome: this.nome, preco:this.preco});
  }
}

