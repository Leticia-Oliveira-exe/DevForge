import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Menu } from '../../componentes/menu/menu'; // PRESERVADO: Seu import original do Menu

interface ApiProjeto {
  nome: string;
  descricao: string;
  categoria: string;
  precoPlano?: string;
  criadorNome: string;
  criadorFoto: string;
  favoritado?: boolean;
  seguindoCriador?: boolean; 
  apiKey?: string;          
}

@Component({
  selector: 'app-home', // 👈 CORRIGIDO: Voltou a ser o seletor nativo da Home
  standalone: true,
  imports: [CommonModule, Menu], 
  templateUrl: './home.html', // 👈 CORRIGIDO: Aponta para o html da Home
  styleUrl: './home.css', // 👈 CORRIGIDO: Aponta para o css da Home
})
export class Home implements OnInit {
  // Listas reativas para alimentar cada catálogo na sua tela
  listaCarrossel: ApiProjeto[] = [];
  enviadosRecently: ApiProjeto[] = [];
  populares: ApiProjeto[] = [];
  recomendados: ApiProjeto[] = [];
  gemasRaras: ApiProjeto[] = [];

  // Índice para controlar o slide ativo do carrossel de destaques
  carrosselIndexAtivo: number = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    this.carregarCatalogosDoSistema();
  }

  carregarCatalogosDoSistema() {
    const dados = localStorage.getItem('minhas_apis');
    if (dados) {
      const todasApis: ApiProjeto[] = JSON.parse(dados);

      // Distribui estrategicamente os cards para os catálogos ficarem cheios e bonitos
      this.listaCarrossel = todasApis.slice(0, 3);   
      this.enviadosRecently = todasApis.slice(0, 4);  
      this.populares = todasApis.slice(3, 7);         
      this.recomendados = todasApis.slice(1, 5);      
      this.gemasRaras = todasApis.slice(4, 9);        
    }
  }

  // Sincroniza o favorito diretamente na Home e salva no banco local
  toggleFavoritar(api: ApiProjeto) {
    api.favoritado = !api.favoritado;
    this.salvarAlteracoesGlobais(api);
  }

  // Sincroniza o botão seguir do criador
  toggleSeguir(api: ApiProjeto) {
    api.seguindoCriador = !api.seguindoCriador;
    this.salvarAlteracoesGlobais(api);
  }

  // Lógica de compra unificada para gerar e exibir a chave na tela igual ao Explorar
  assinarEGerarKey(api: ApiProjeto) {
    if (api.apiKey) {
      alert(`Você já possui um plano ativo para esta API.`);
      return;
    }

    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let tokenGerado = 'rapid_live_';
    for (let i = 0; i < 24; i++) {
      tokenGerado += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }

    api.apiKey = tokenGerado;
    this.salvarAlteracoesGlobais(api);
    alert(`Plano assinado com sucesso! Sua Chave de API foi vinculada ao seu perfil.`);
  }

  // 🔥 ADICIONADO: Remove a chave de acesso e limpa o plano ativo para poder resetar o teste
  cancelarAssinatura(api: ApiProjeto) {
    if (confirm(`Tem certeza que deseja cancelar a assinatura da API "${api.nome}"?`)) {
      api.apiKey = undefined; 
      this.salvarAlteracoesGlobais(api); 
      alert('Assinatura cancelada com sucesso!');
    }
  }

  // Auxiliar para atualizar as modificações em tempo real no localStorage centralizado
  private salvarAlteracoesGlobais(apiModificada: ApiProjeto) {
    const dados = localStorage.getItem('minhas_apis');
    if (dados) {
      const todasApis: ApiProjeto[] = JSON.parse(dados);
      const index = todasApis.findIndex(item => item.nome === apiModificada.nome);
      
      if (index !== -1) {
        todasApis[index] = { ...todasApis[index], ...apiModificada };
        localStorage.setItem('minhas_apis', JSON.stringify(todasApis));
      }
    }
    this.carregarCatalogosDoSistema();
  }

  // Funções de controle de navegação do carrossel superior
  proximoSlide() {
    this.carrosselIndexAtivo = (this.carrosselIndexAtivo + 1) % this.listaCarrossel.length;
  }

  anteriorSlide() {
    this.carrosselIndexAtivo = (this.carrosselIndexAtivo - 1 + this.listaCarrossel.length) % this.listaCarrossel.length;
  }

  irParaSlide(index: number) {
    this.carrosselIndexAtivo = index;
  }

  // Redireciona o usuário para ver mais detalhes ou assinar na tela do marketplace
  irParaMarketplace() {
    this.router.navigate(['/explorar']);
  }
}