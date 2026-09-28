import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class Cadastro {
  
  dadosCadastro = {
    nome: '',
    email: '',
    senha: '',
    confirmaSenha: '',
    termos: false 
  };

  constructor(private router: Router) {}

  onCadastrar() {
    // 1. Validação dos termos de uso
    if (!this.dadosCadastro.termos) {
      alert("Você precisa aceitar os termos de uso para criar uma conta!");
      return;
    }

    // 2. Validação da igualdade das senhas
    if (this.dadosCadastro.senha !== this.dadosCadastro.confirmaSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    // 3. Salva a conta completa no sistema (usado pelo seu login para validar o e-mail e a senha)
    localStorage.setItem('usuario_cadastrado', JSON.stringify(this.dadosCadastro));

    // 4. Salva o estado da sessão de usuário logado ativamente
    const usuarioLogado = {
      nome: this.dadosCadastro.nome,
      email: this.dadosCadastro.email
    };
    localStorage.setItem('usuario', JSON.stringify(usuarioLogado));

    // 5. Redireciona para a tela principal
    alert("Cadastro realizado com sucesso!");
    this.router.navigate(['/home']);
  } 
}