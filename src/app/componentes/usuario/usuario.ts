import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; // 👈 Corrigido para RouterModule para aceitar links internos

interface ApiProjeto {
  nome: string;
  descricao: string;
  categoria: string;
  website: string;
  logo: string | null;
  urlServidor?: string;
  planoAtivo?: string;
  precoPlano?: string;
  limiteRequisicoes?: string;
  favoritado?: boolean;      
  seguindoCriador?: boolean;  
  criadorNome?: string;
  criadorFoto?: string;
}

@Component({
  selector: 'app-usuario', // 👈 FIXO: Mantido o seu seletor original idêntico para o botão reaparecer!
  standalone: true,
  imports: [CommonModule, RouterModule], // 👈 RouterModule garante o funcionamento das rotas
  templateUrl: './usuario.html', // 👈 Volta a ser caminho direto porque ele está na pasta certa!
  styleUrl: './usuario.css'      // 👈 Volta a ser caminho direto porque ele está na pasta certa!
})
export class UsuarioComponent implements OnInit {
  
  nomeUsuario: string = 'Usuário';
  fotoPerfil: string | null = null;
  isSidebarOpen: boolean = false; 

  abaMenuAtiva: 'projetos' | 'favoritos' | 'seguindo' = 'projetos';
  listaDeApis: ApiProjeto[] = [];
  
  apisFavoritadas: ApiProjeto[] = [];
  criadoresSeguindo: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    const usuarioSalvo = localStorage.getItem('usuario');
    if (usuarioSalvo) {
      const usuario = JSON.parse(usuarioSalvo);
      this.nomeUsuario = usuario.nome || usuario.email || 'Usuário';
      this.fotoPerfil = localStorage.getItem('foto_perfil');
    }
    this.carregarProjetosSalvos();
  }

  // 🛠️ ALTERADO APENAS O NECESSÁRIO: Correção cirúrgica dos filtros das três listas
  carregarProjetosSalvos() {
    const dados = localStorage.getItem('minhas_apis');
    if (dados) {
      const todasApis: ApiProjeto[] = JSON.parse(dados);
      
      // 1. Aba Seus Projetos: Mostra apenas o que você mesmo criou (sem os criadores fictícios do marketplace)
      this.listaDeApis = todasApis.filter(api => !api.criadorNome || api.criadorNome === 'Você (Admin)');
      
      // 2. Aba Favoritos: Mostra apenas os cards onde você clicou na estrela (favoritado === true)
      this.apisFavoritadas = todasApis.filter(api => api.favoritado === true);
      
      // 3. Aba Seguindo: Filtra os criadores que você deu "Seguir" (seguindoCriador === true)
      const apisComCriadoresSeguidos = todasApis.filter(api => api.seguindoCriador === true);
      
      const mapaCriadores = new Map();
      apisComCriadoresSeguidos.forEach(api => {
        const nome = api.criadorNome || 'Criador Anônimo';
        const foto = api.criadorFoto || 'https://unsplash.com';
        mapaCriadores.set(nome, { nome, foto });
      });
      
      this.criadoresSeguindo = Array.from(mapaCriadores.values());
    } else {
      this.listaDeApis = [];
      this.apisFavoritadas = [];
      this.criadoresSeguindo = [];
    }
  }

  mudarAbaMenu(aba: 'projetos' | 'favoritos' | 'seguindo') {
    this.abaMenuAtiva = aba;
    this.carregarProjetosSalvos(); 
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    if (this.isSidebarOpen) {
      this.abaMenuAtiva = 'projetos'; 
      this.carregarProjetosSalvos();  
    }
  }

  onFotoSelecionada(event: any) {
    const arquivo = event.target.files;
    if (arquivo && arquivo.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        this.fotoPerfil = reader.result as string;
        localStorage.setItem('foto_perfil', this.fotoPerfil);
      };
      reader.readAsDataURL(arquivo[0]);
    }
  }

  onSair() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}