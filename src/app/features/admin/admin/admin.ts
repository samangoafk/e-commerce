import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {

  private authservice = inject(AuthService);
  private router = inject(Router);

  //! SIMULAÇÂO = Indicadores
  totalProdutosCadastrados = signal(20);
  pedidosPendentes = signal(3);
  usuariosCadastrados = signal(8);
  

  usuarioAtual = this.authservice.usuarioAtual;

  mensagemPerfil = computed(() => {
    const usuario =this.usuarioAtual();
    if (!usuario){
      return('Nenhum usuário Autenticado!')
    }
    return `Usuário autenicado como: $(usuario.perfil)`
  });

  sair(){
    this.authservice.logout(),
    this.router.navigateByUrl('/login')
  }
}
