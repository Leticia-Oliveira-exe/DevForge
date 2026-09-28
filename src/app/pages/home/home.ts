import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Menu } from '../../componentes/menu/menu';

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
  selector: 'app-home', 
  standalone: true,
  imports: [CommonModule, Menu], 
  templateUrl: './home.html',
  styleUrl: './home.css', 
})
export class Home implements OnInit {
  listaCarrossel: ApiProjeto[] = [];
  enviadosRecently: ApiProjeto[] = [];
  populares: ApiProjeto[] = [];
  recomendados: ApiProjeto[] = [];
  gemasRaras: ApiProjeto[] = [];

  carrosselIndexAtivo: number = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    this.carregarCatalogosDoSistema();
  }

  carregarCatalogosDoSistema() {
    let dados = localStorage.getItem('minhas_apis');
    
    if (!dados) {
      const apisIniciais: ApiProjeto[] = [
        {
          nome: 'AI Image Generator API',
          descricao: 'Endpoint avançado de inteligência artificial para geração e tratamento de imagens hiper-realistas.',
          categoria: 'ai',
          precoPlano: '49,90',
          criadorNome: 'Beatriz Ramos',
          criadorFoto: 'img/WhatsApp Image 2026-09-27 at 21.09.24.jpeg',
          favoritado: false,
          seguindoCriador: false
        },
        {
          nome: 'CryptoExchange Tracker',
          descricao: 'Retorna cotações de mais de 500 criptomoedas em tempo real com histórico gráfico completo.',
          categoria: 'finance',
          precoPlano: '19,90',
          criadorNome: 'Guilherme Santos',
          criadorFoto: 'img/WhatsApp Image 2026-09-27 at 21.08.32.jpeg',
          favoritado: false,
          seguindoCriador: false
        },
        {
          nome: 'ZipCode & Address Validator',
          descricao: 'Validação e preenchimento automático de endereços brasileiros via CEP com lat/long integrados.',
          categoria: 'tools',
          precoPlano: '0,00',
          criadorNome: 'Mariana Costa',
          criadorFoto: 'img/WhatsApp Image 2026-09-27 at 21.08.32 (1).jpeg',
          favoritado: false,
          seguindoCriador: false
        },
        {
          nome: 'Google Maps Matrix Utility',
          descricao: 'Calcula matrizes de distância, rotas otimizadas para frotas e tempo estimado de tráfego em tempo real.',
          categoria: 'maps',
          precoPlano: '29,90',
          criadorNome: 'Ricardo Almeida',
          criadorFoto: 'img/WhatsApp Image 2026-09-27 at 20.58.35.jpeg',
          favoritado: false,
          seguindoCriador: false
        },
        {
          nome: 'Speech-to-Text Transcriber',
          descricao: 'Converte arquivos de áudio e transmissões de voz em tempo real para texto legal com pontuação automática.',
          categoria: 'ai',
          precoPlano: '15,90',
          criadorNome: 'Luã',
          criadorFoto: 'img/WhatsApp Image 2026-09-27 at 20.58.35 (1).jpeg',
          favoritado: false,
          seguindoCriador: false
        },
        {
          nome: 'Gateway de Pagamentos Pix',
          descricao: 'API simplificada para geração de QR Codes Dinâmicos Pix, conciliação bancária automática e webhooks instantâneos.',
          categoria: 'finance',
          precoPlano: '0,00',
          criadorNome: 'Laura',
          criadorFoto: 'img/WhatsApp Image 2026-09-27 at 21.00.29.jpeg',
          favoritado: false,
          seguindoCriador: false
        },
        {
          nome: 'Secure Auth OAuth2 Service',
          descricao: 'Autenticação robusta ponta a ponta com tokens JWT, suporte a login social e proteção activa contra brute-force.',
          categoria: 'tools',
          precoPlano: '9,90',
          criadorNome: 'Vinícius',
          criadorFoto: 'img/WhatsApp Image 2026-09-27 at 21.00.45.jpeg',
          favoritado: false,
          seguindoCriador: false
        },
        {
          nome: 'Video Streaming Optimizer',
          descricao: 'Processamento, compressão e entrega otimizada de feeds de vídeo adaptáveis de baixa latência.',
          categoria: 'tools',
          precoPlano: '34,90',
          criadorNome: 'David',
          criadorFoto: 'img/WhatsApp Image 2026-09-27 at 20.57.05 (1).jpeg',
          favoritado: false,
          seguindoCriador: false
        },
        {
          nome: 'Clima & Previsão Meteorológica',
          descricao: 'Histórico climático global e previsões de alta precisão baseadas em modelos de satélite em tempo real.',
          categoria: 'data',
          precoPlano: '0,00',
          criadorNome: 'Cauã',
          criadorFoto: 'img/WhatsApp Image 2026-09-27 at 19.59.47.jpeg',
          favoritado: false,
          seguindoCriador: false
        }
      ];
      localStorage.setItem('minhas_apis', JSON.stringify(apisIniciais));
      dados = JSON.stringify(apisIniciais);
    } else {
      const apisExistentes: ApiProjeto[] = JSON.parse(dados);
      const precisaAtualizar = apisExistentes.some(api => 
        api.criadorFoto.includes('17.54.06') || api.criadorFoto.includes('unsplash.com')
      );

      if (precisaAtualizar) {
        localStorage.removeItem('minhas_apis');
        this.carregarCatalogosDoSistema();
        return;
      }
    }

    const todasApis: ApiProjeto[] = JSON.parse(dados);

    this.listaCarrossel = todasApis.slice(0, 3);   
    this.enviadosRecently = todasApis.slice(0, 4);  
    this.populares = todasApis.slice(3, 7);         
    this.recomendados = todasApis.slice(1, 5);      
    this.gemasRaras = todasApis.slice(4, 9);        
  }

  toggleFavoritar(api: ApiProjeto) {
    api.favoritado = !api.favoritado;
    this.salvarAlteracoesGlobais(api);
  }

  toggleSeguir(api: ApiProjeto) {
    api.seguindoCriador = !api.seguindoCriador;
    this.salvarAlteracoesGlobais(api);
  }

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

  cancelarAssinatura(api: ApiProjeto) {
    if (confirm(`Tem certeza que deseja cancelar a assinatura da API "${api.nome}"?`)) {
      api.apiKey = undefined; 
      this.salvarAlteracoesGlobais(api); 
      alert('Assinatura cancelada com sucesso!');
    }
  }

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

  proximoSlide() {
    this.carrosselIndexAtivo = (this.carrosselIndexAtivo + 1) % this.listaCarrossel.length;
  }

  anteriorSlide() {
    this.carrosselIndexAtivo = (this.carrosselIndexAtivo - 1 + this.listaCarrossel.length) % this.listaCarrossel.length;
  }

  irParaSlide(index: number) {
    this.carrosselIndexAtivo = index;
  }

  irParaMarketplace() {
    this.router.navigate(['/explorar']);
  }
}