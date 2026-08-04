import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router'; //adiciona importação do RoutOutlet e RouteLink;
import { usuarioLogado, login, logout } from './core/auth';
import { Header } from './shared/layout/header/header';
import { UpperCasePipe } from '@angular/common';
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

  //!retirei o nome da loja
  usuarioLogado = usuarioLogado;
  login = login;
  logout = logout;
}
