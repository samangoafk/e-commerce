import { Component, Input, Output } from '@angular/core';
import { UpperCasePipe, CurrencyPipe} from '@angular/common';
import { PrecoFormatadoPipe } from '../../pipes/preco-formatado-pipe';

//novo import(eu acho) para usar o, declaradores(input e output)

@Component({
  selector: 'app-produto',
  imports: [UpperCasePipe, PrecoFormatadoPipe],
  templateUrl: './produto.html',
  styleUrl: './produto.css',
})
// nova string (sdiciona/substitui modelo antigo de nomeclatura por um novo. preco e nome)

export class Produto {
 @Input() nome: string = '';
 @Input() preco: number = 0;

 }
