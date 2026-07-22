// // import { Routes } from '@angular/router';
// // //import { ListaProdutos } from './features/produtos/lista-produtos/lista-produtos'; //codigo legado
// // import { Carrinho } from './features/carrinho/carrinho/carrinho';
// // //import { Component } from '@angular/core';
// // import { Home } from './features/home/home/home';
// // //import path from 'path';
// // //add um novo import
// // export const routes: Routes = [

// //     //
// //     {
// //         path:'',
// //         component: Home, 
// //     },
// // //cODIGO LEGADO LAZYLOADING
// //     //{
// //     //    path:'produtos',
// //     //    component: ListaProdutos,
// //     //},

// //     {
// //           path:'produtos',
// //           loadcomponent: () => 
// //             import ('./features/produtos/lista-produtos/lista-produtos'.then(m =>m.ListaProdutos))

// //     },
// // {
// //        path:'carrinho',
// //        component: Carrinho,
// // },
// // ]
//! Importações 

import { Routes } from "@angular/router";
import { authGuard } from "./core/auth.guard";

export const routes: Routes = [

{
   path:'',
   loadComponent: () =>
       import('./features/home/home/home').then((m) =>m.Home),

},

{
   path:'produtos',
   loadComponent: () =>
       import('./features/produtos/lista-produtos/lista-produtos').then((m) =>m.ListaProdutos),

},

{
   path:'carrinho',
   canActivate: [authGuard],
   loadComponent: () =>
       import('./features/carrinho/carrinho/carrinho').then((m) =>m.Carrinho),

},

{
   path:'**',
   redirectTo: '',

},

];
