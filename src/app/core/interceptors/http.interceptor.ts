import { HttpInterceptorFn } from "@angular/common/http";
import { tap } from "rxjs";
import { catchError } from "rxjs";
import { throwError } from "rxjs";
import { inject } from "@angular/core";
import { AuthFacade } from "../facades/auth.facade";
import { Router } from "@angular/router";

export const httpInterceptor: HttpInterceptorFn =(req, next) => {

    const authFacade = inject(AuthFacade);
    const router = inject(Router);

    //! NOVO METODO TOKEN
    const token = authFacade.obterToken();
    //! REQUISIÇÂO DE LOG
    console.log('Requisição: ', req.url);
    //! TOKEN
    const novaReq = token ?
    req.clone ({
        setHeaders:{
            Authotization: 'Bearer ${token}'
        },
    }):req;


    
    //! NOVA REQUISIÇÂO + RESPOSTA DE LOG
    return next(novaReq).pipe(
        tap({
            next: (event) => console.log('RESPONDE: ', event),
            error: (error) => console.log ('ERRO: ', error)
        }),

        catchError((error) => {
            console.error('ERROR GLOBAL: ', error);

        if (error.status === 401){
            console.warn('Não Autorizado!');
            authFacade.sair();
            router.navigateByUrl('/login');
        }

        if(error.status === 403){
            console.warn('Acesso Negado, perfil sem permissão!')
            router.navigateByUrl('/produtos')
        } 

        if (error.status === 500){
            console.warn('Erro Interno do servidor!');

        }
        return throwError(() => error);
        }),
        );

};