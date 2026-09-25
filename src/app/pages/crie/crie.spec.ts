import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface ApiProjeto {
  nome: string;
  descricao: string;
  categoria: string;
  website: string;
  logo: string | null; // Guardará o link em base64 da imagem
}

@Component({
  selector: 'app-crie',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crie.html',
  styleUrls: ['./crie.css']
})
export class CrieComponent {
  exibirModal: boolean = false;

  novoNome: string = '';
  novaDescricao: string = '';

  // Lista com dados completos por padrão
  listaDeApis: ApiProjeto[] = [
    { 
      nome: 'Minha API Exemplo', 
      descricao: 'Uma API de testes inicial.', 
      categoria: 'data', 
      website: 'https://exemplo.com', 
      logo: null 
    }
  ];

  apiSelecionada: ApiProjeto = this.listaDeApis[0];

  constructor(private router: Router) {}

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
      categoria: 'tools', // Categoria padrão ao criar
      website: '',
      logo: null
    };

    this.listaDeApis.push(novaApi);
    this.apiSelecionada = novaApi;
    this.fecharModal();
  }

  selecionarApi(api: ApiProjeto) {
    this.apiSelecionada = api;
  }

  // Captura e transforma o arquivo de imagem para exibir na tela
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && this.apiSelecionada) {
      const reader = new FileReader();
      reader.onload = () => {
        this.apiSelecionada!.logo = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  salvarAlteracoes() {
    alert(`Alterações da API "${this.apiSelecionada.nome}" salvas com sucesso!`);
  }

  voltarInicio() {
    this.router.navigate(['/home']);
  }
}