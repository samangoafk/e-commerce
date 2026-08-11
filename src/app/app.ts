import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router'; //adiciona importação do RoutOutlet e RouteLink;
import { Header } from './shared/layout/header/header';
import { MatAnchor } from '@angular/material/button';
import { RouterLink } from '@angular/router';
//import { ListaProdutos } from './features/produtos/lista-produtos/lista-produtos';
@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, RouterLink, Header, MatAnchor ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('e-commerce'); 

  
}
