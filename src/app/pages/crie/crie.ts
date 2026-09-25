import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
}

@Component({
  selector: 'app-crie',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crie.html',
  styleUrls: ['./crie.css']
})
export class CrieComponent implements OnInit { // 👈 FIXO: Voltou para CrieComponent para casar com a estrutura do Angular
  exibirModal: boolean = false;

  novoNome: string = '';
  novaDescricao: string = '';
  abaAtiva: 'editar' | 'codigo' | 'monetizar' = 'editar';

  listaDeApis: ApiProjeto[] = [
    { 
      nome: 'Minha API Exemplo', 
      descricao: 'Uma API de testes inicial.', 
      categoria: 'data', 
      website: 'https://exemplo.com', 
      logo: null,
      urlServidor: '',
      planoAtivo: 'free',
      precoPlano: '0.00',
      limiteRequisicoes: '1000'
    }
  ];
  
  apiSelecionada: ApiProjeto = this.listaDeApis[0];

  constructor(private router: Router) {}

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    const dadosSalvos = localStorage.getItem('minhas_apis');
    if (dadosSalvos) {
      this.listaDeApis = JSON.parse(dadosSalvos);
      if (this.listaDeApis.length > 0) {
        this.apiSelecionada = this.listaDeApis[0];
      }
    } else {
      this.salvarNoStorage();
    }
  }

  salvarNoStorage() {
    localStorage.setItem('minhas_apis', JSON.stringify(this.listaDeApis));
  }

  mudarAba(aba: 'editar' | 'codigo' | 'monetizar') {
    this.abaAtiva = aba;
  }

  abrirModal() {
    this.exibirModal = true;
  }

  fecharModal() {
    this.exibirModal = false;
    this.limparFormulario();
  }

  limparFormulario() {
    this.novoNome = '';
    this.novaDescricao = '';
  }

  adicionarApi(event: Event) {
    event.preventDefault();
    if (this.novoNome.trim() === '') return;

    const novaApi: ApiProjeto = {
      nome: this.novoNome,
      descricao: this.novaDescricao,
      categoria: 'tools', 
      website: '',
      logo: null,
      urlServidor: '',
      planoAtivo: 'free',
      precoPlano: '0.00',
      limiteRequisicoes: '1000'
    };

    this.listaDeApis.push(novaApi);
    this.apiSelecionada = novaApi;
    this.salvarNoStorage();
    this.fecharModal();
  }

  selecionarApi(api: ApiProjeto) {
    this.apiSelecionada = api;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && this.apiSelecionada) {
      const reader = new FileReader();
      reader.onload = () => {
        this.apiSelecionada.logo = reader.result as string;
        this.salvarNoStorage();
      };
      reader.readAsDataURL(file);
    }
  }

  salvarAlteracoes() {
    this.salvarNoStorage();
    alert(`Alterações da API "${this.apiSelecionada.nome}" salvas com sucesso!`);
  }

  excluirApi() {
    if (!this.apiSelecionada) return;

    const confirmar = confirm(`Tem certeza que deseja excluir a API "${this.apiSelecionada.nome}"?`);
    if (!confirmar) return;

    this.listaDeApis = this.listaDeApis.filter(api => api.nome !== this.apiSelecionada.nome);

    if (this.listaDeApis.length > 0) {
      this.apiSelecionada = this.listaDeApis[0];
      this.salvarNoStorage();
    } else {
      localStorage.removeItem('minhas_apis');
      this.listaDeApis = [
        { 
          nome: 'Minha API Exemplo', 
          descricao: 'Uma API de testes inicial.', 
          categoria: 'data', 
          website: 'https://exemplo.com', 
          logo: null,
          urlServidor: '',
          planoAtivo: 'free',
          precoPlano: '0.00',
          limiteRequisicoes: '1000'
        }
      ];
      this.apiSelecionada = this.listaDeApis[0];
      this.salvarNoStorage();
    }
    alert('API excluída com sucesso!');
  }

  voltarInicio() {
    this.router.navigate(['/home']);
  }
}