import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // 🔐 A MUDANÇA REAL: Lê se existe um usuário autenticado gravado na memória do navegador
  const usuarioLogado = localStorage.getItem('usuario');

  if (usuarioLogado) {
    return true; // Usuário está logado! Permite o acesso à rota normalmente.
  }

  // Se NÃO estiver logado, barra o acesso na hora e joga para o Login
  console.warn("Acesso bloqueado pelo AuthGuard! Redirecionando para o login.");
  router.navigate(['/login']);
  return false;
};