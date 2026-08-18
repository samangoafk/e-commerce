import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router'; 
import { AuthFacade } from '../../../core/facades/auth.facade';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-acesso-negado',
  imports: [ RouterLink, MatButtonModule],
  templateUrl: './acesso-negado.html',
  styleUrl: './acesso-negado.css',
})
export class AcessoNegado {
  private authFacade = inject(AuthFacade);
  private router= inject(Router);

  sair() {
    this.authFacade.sair();
    this.router.navigateByUrl('/login');
    return;
  }
  

}
