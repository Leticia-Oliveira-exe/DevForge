import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  dadosLogin = {
    nome: '', // Trate este campo como o e-mail do usuário no formulário
    senha: '',
    termos: false // Campo para controlar o checkbox dos termos
  };

  constructor(
    private router: Router
  ) {}

  onLogin(): void {
    // 1. AJUSTADO: Torna o aceite dos termos obrigatório para logar
    if (!this.dadosLogin.termos) {
      alert("Você precisa aceitar os termos de uso para fazer login!");
      return;
    }

    // 2. Valida se os campos foram preenchidos
    if (!this.dadosLogin.nome || !this.dadosLogin.senha) {
      alert('Por favor, preencha o e-mail e a senha!');
      return;
    }

    // 3. Busca o usuário que se cadastrou anteriormente no localStorage
    const usuarioCadastradoRaw = localStorage.getItem('usuario_cadastrado');

    if (!usuarioCadastradoRaw) {
      alert('Nenhum usuário cadastrado encontrado no sistema! Por favor, crie uma conta primeiro.');
      return;
    }

    // 4. Converte os dados do cadastro salvos de texto para objeto JSON
    const usuarioCadastrado = JSON.parse(usuarioCadastradoRaw);

    // 5. Verifica se o e-mail e a senha digitados batem com o que foi cadastrado
    if (this.dadosLogin.nome === usuarioCadastrado.email && this.dadosLogin.senha === usuarioCadastrado.senha) {
      
      const usuarioLogado = {
        nome: usuarioCadastrado.nome,
        email: usuarioCadastrado.email
      };

      // Define que o usuário está ativamente logado na sessão atual
      localStorage.setItem('usuario', JSON.stringify(usuarioLogado));

      alert(`Bem-vindo de volta, ${usuarioCadastrado.nome}!`);
      this.router.navigate(['/home']);
    } else {
      alert('E-mail ou senha incorretos! Tente novamente.');
    }
  }
}