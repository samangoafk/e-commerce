import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UpperCasePipe, CurrencyPipe} from '@angular/common';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';

//novo import(eu acho) para usar o, declaradores(input e output)

@Component({
  selector: 'app-produto',
  imports: [UpperCasePipe, PrecoFormatadoPipe],
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

selecipnarProduto() {
  this.produtoSelecionado.emit(this.nome);

}

 }
