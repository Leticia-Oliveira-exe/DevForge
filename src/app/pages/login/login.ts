import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  
  // Objeto reativo conectado com os inputs do HTML
  dadosLogin = {
    nome: '',
    senha: '',
    termos: false
    
  };

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    if (!this.dadosLogin.nome || !this.dadosLogin.senha) {
      alert("Por favor, preencha o usuário e a senha!");
      return;
    }

    const urlApi = 'https://api-sprint7.vercel.app/';

    // Dispara a requisição POST real para bater as credenciais na sua API Node
    this.http.post(urlApi, this.dadosLogin).subscribe({
      next: (resposta: any) => {
        // Guarda as informações reais do usuário retornadas pelo servidor
        const usuarioLogado = {
          nome: resposta.nome,
          email: resposta.email
        };
        localStorage.setItem('usuario', JSON.stringify(usuarioLogado));

        alert(`Bem-vindo de volta, ${resposta.nome}!`);
        
        // O AuthGuard vai ler o localStorage e liberar a entrada imediatamente
        this.router.navigate(['/home']);
      },
      error: (erro) => {
        // Exibe a mensagem exata de erro cadastrada no seu backend
        alert(erro.error?.message || "Erro ao conectar com o servidor de autenticação.");
      }
    });
  }
}