import { Component, signal } from '@angular/core';
//import { RouterOutlet } from '@angular/router'; //remove importação do RoutOutlet, pois não está sendo utilizado no momento;
import {Produto} from './components/produto/produto'; //adiciona produto
@Component({
  selector: 'app-root',
  imports: [ Produto ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('e-commerce');
}
