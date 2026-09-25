import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { ExplorarComponent } from './pages/explorar/explorar'; // 👈 Se der erro aqui, mude para Explorar (tudo em minúsculo na classe)
import { CrieComponent } from './pages/crie/crie';
import { MeusProjetos } from './pages/meus-projetos/meus-projetos';
import { authGuard } from './services/auth'; // 👈 CORRIGIDO: Agora aponta para a pasta e arquivo certos!

export const routes: Routes = [
  // 🔓 Rotas Públicas
  { path: 'login', component: Login },
  { path: 'cadastro', component: Cadastro },
  { path: '', component: Login },

  // 🔒 Rotas Protegidas
  { path: 'home', component: Home, canActivate: [authGuard] },
  { path: 'explorar', component: ExplorarComponent, canActivate: [authGuard] },
  { path: 'crie', component: CrieComponent, canActivate: [authGuard] },
  { path: 'meus-projetos', component: MeusProjetos, canActivate: [authGuard] }
];