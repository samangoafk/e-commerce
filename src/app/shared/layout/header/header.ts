import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule}  from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { inject } from '@angular/core';
import { CarrinhoService } from '../../../core/services/carrinho.service';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink, UpperCasePipe ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  nomeLoja = 'CASAS VAZIA'; //? nome do ecommerce
  public carrinhoService = inject(CarrinhoService);
  quantidade = this.carrinhoService.quantidadeItens;

}
