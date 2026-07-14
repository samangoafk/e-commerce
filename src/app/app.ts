import { Component, signal } from '@angular/core';
//import { RouterOutlet } from '@angular/router'; //remove importação do RoutOutlet, pois não está sendo utilizado no momento;
import {Produto} from './components/produto/produto'; //adiciona produto
import { ListaProdutos } from './components/lista-produtos/lista-produtos';
@Component({
  selector: 'app-root',
  imports: [ ListaProdutos ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('e-commerce');
}
