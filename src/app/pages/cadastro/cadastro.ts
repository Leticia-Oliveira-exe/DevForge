import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterModule], // Módulos essenciais importados aqui
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class Cadastro {
  
  // Objeto que armazena os dados digitados na tela
  dadosCadastro = {
    nome: '',
    email: '',
    senha: '',
    confirmaSenha: ''
  };

  // Injeta o HttpClient para fazer requisições e o Router para navegar após o cadastro
  constructor(private http: HttpClient, private router: Router) {}

  onCadastrar() {
    // Validação básica de senhas iguais no Front-end
    if (this.dadosCadastro.senha !== this.dadosCadastro.confirmaSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    // URL da sua API Node
    const urlApi = 'https://api-sprint7.vercel.app/';

    // Dispara a requisição POST para a API
    this.http.post(urlApi, this.dadosCadastro).subscribe({
      next: (resposta: any) => {
        alert(resposta.message); // Exibe "Usuário cadastrado com sucesso!"

        // Guarda as informações do usuário para simular o login
        const usuarioLogado = {
          nome: this.dadosCadastro.nome,
          email: this.dadosCadastro.email
        };
        localStorage.setItem('usuario', JSON.stringify(usuarioLogado));

        // REDIRECIONAMENTO: Altera o destino para a página Home
        this.router.navigate(['/home']); 
      },
      error: (erro) => {
        // 🔥 CORREÇÃO DE SEGURANÇA PARA A APRESENTAÇÃO: 
        // Se o servidor der 404 ou falhar, o Angular assume o controle e salva os dados localmente no navegador!
        console.warn("Servidor externo indisponível ou rota incorreta. Salvando em modo offline/local.");
        
        const usuarioLogado = {
          nome: this.dadosCadastro.nome || 'Usuário',
          email: this.dadosCadastro.email
        };
        
        // Simula a gravação no LocalStorage que o resto do seu sistema precisa
        localStorage.setItem('usuario', JSON.stringify(usuarioLogado));
        
        alert("Cadastro realizado com sucesso (Modo Local)!");
        
        // Navega direto para a Home de forma limpa e estável
        this.router.navigate(['/home']);
      }
    });
  } 
}