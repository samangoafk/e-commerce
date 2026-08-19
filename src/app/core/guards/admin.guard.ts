// Verificar login e verificar se o usuario é ou nao administrador
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { CanActivateFn } from "@angular/router";
import { AuthFacade } from "../facades/auth.facade";

export const adminGuard: CanActivateFn = () => {
    const router = inject(Router);
    const authFacade = inject(AuthFacade);

    //! Verificar se o usuario está logado
    if(!authFacade.usuarioLogado()){
        return router.createUrlTree(['/login']);

    }
    //! - 2) Verifica se o usuário atual(logado) possui permissão(permissão admnistrador)
    if(!authFacade.admin()){
        return router.createUrlTree(['/acesso-negado']);
    }
    //! 3) Se o usuário estiver logado e for admnistrador = acesso liberado

return true;

};