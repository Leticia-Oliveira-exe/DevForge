import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Menu } from '../../componentes/menu/menu';

interface ApiProjeto {
  nome: string;
  descricao: string;
  categoria: string;
  website?: string;
  logo?: string | null;
  precoPlano?: string;
  apiKey?: string;
  criadorNome: string;
  criadorFoto: string;
  favoritado?: boolean;
  seguindoCriador?: boolean;
}

@Component({
  selector: 'app-explorar',
  standalone: true,
  imports: [CommonModule, FormsModule, Menu],
  templateUrl: './explorar.html',
  styleUrl: './explorar.css'
})
export class ExplorarComponent implements OnInit {
  listaDeApis: ApiProjeto[] = [];
  termoPesquisa: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.carregarMarketplace();
  }

  get apisFiltradas(): ApiProjeto[] {
    if (!this.termoPesquisa.trim()) {
      return this.listaDeApis;
    }
    return this.listaDeApis.filter(api =>
      api.nome.toLowerCase().includes(this.termoPesquisa.toLowerCase()) ||
      api.categoria.toLowerCase().includes(this.termoPesquisa.toLowerCase()) ||
      api.descricao.toLowerCase().includes(this.termoPesquisa.toLowerCase())
    );
  }

  voltarParaHome() {
    this.router.navigate(['/home']);
  }

  carregarMarketplace() {
    const apisDeExemploPadrao: ApiProjeto[] = [
      {
        nome: 'AI Image Generator API',
        descricao: 'Endpoint avançado de inteligência artificial para geração e tratamento de imagens hiper-realistas.',
        categoria: 'ai',
        logo: null,
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
        logo: null,
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
        logo: null,
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
        logo: null,
        precoPlano: '29,90',
        criadorNome: 'Ricardo Almeida',
        criadorFoto: 'img/WhatsApp Image 2026-09-27 at 20.58.35.jpeg',
        favoritado: false,
        seguindoCriador: false
      },
      {
        nome: 'Speech-to-Text Transcriber',
        descricao: 'Converte arquivos de áudio e transmissões de voz em tempo real para texto legível com pontuação automática.',
        categoria: 'ai',
        logo: null,
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
        logo: null,
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
        logo: null,
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
        logo: null,
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
        logo: null,
        precoPlano: '0,00',
        criadorNome: 'Cauã',
        criadorFoto: 'img/WhatsApp Image 2026-09-27 at 19.59.47.jpeg',
        favoritado: false,
        seguindoCriador: false
      }
    ];

    localStorage.removeItem('minhas_apis');
    localStorage.setItem('minhas_apis', JSON.stringify(apisDeExemploPadrao));
    this.listaDeApis = apisDeExemploPadrao;
  }

  toggleFavoritar(api: ApiProjeto) {
    api.favoritado = !api.favoritado;
    localStorage.setItem('minhas_apis', JSON.stringify(this.listaDeApis));
  }

  toggleSeguir(api: ApiProjeto) {
    api.seguindoCriador = !api.seguindoCriador;
    localStorage.setItem('minhas_apis', JSON.stringify(this.listaDeApis));
  }

  assinarEGerarKey(api: ApiProjeto) {
    if (api.apiKey) {
      alert(`Você já possui um plano active para esta API.`);
      return;
    }

    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let tokenGerado = 'rapid_live_';
    for (let i = 0; i < 24; i++) {
      tokenGerado += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }

    api.apiKey = tokenGerado;
    localStorage.setItem('minhas_apis', JSON.stringify(this.listaDeApis));
    alert(`Plano assinado com sucesso!`);
  }
}