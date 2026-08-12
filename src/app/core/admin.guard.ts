// Verificar login e verificar se o usuario é ou nao administrador
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { CanActivateFn } from "@angular/router";
import { AuthService } from "./services/auth.service";

export const adminGuard: CanActivateFn = () => {
    const router = inject(Router);
    const authService = inject(AuthService);

    //! Verificar se o usuario está logado
    if(!authService.usuarioLogado()){
        return router.createUrlTree(['/login']);

    }
    //! - 2) Verifica se o usuário atual(logado) possui permissão(permissão admnistrador)
    if(!authService.admin()){
        return router.createUrlTree(['/acesso-negado']);
    }
    //! 3) Se o usuário estiver logado e for admnistrador = acesso liberado

return true;

};