import { signal } from "@angular/core";

//Define valor inicial do signal usuarioLogado com (false)
export const usuarioLogado = signal (false);

// Define Signal usuarioLogado como (true), permite acesso as rotas
export function login(){
     usuarioLogado.set(true);  
}

//Define Signal usuarioLogado como (false), bloqueia acesso imediatamente
export function logout(){
     usuarioLogado.set(false);  
}
