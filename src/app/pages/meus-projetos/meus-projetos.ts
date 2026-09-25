import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // 👈 Essencial para sumir com os avisos amarelos do HTML
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
  selector: 'app-meus-projetos',
  standalone: true,
  imports: [CommonModule, FormsModule], // 👈 Ajustado para aceitar as diretivas do seu HTML
  templateUrl: './meus-projetos.html',
  styleUrl: './meus-projetos.css'
})
export class MeusProjetos implements OnInit {
  // Lista que guardará os seus projetos carregados para renderizar na tela
  listaDeApis: ApiProjeto[] = [];

  ngOnInit() {
    this.carregarProjetos();
  }

  // Busca dinamicamente os projetos criados e salvos no armazenamento do navegador
  carregarProjetos() {
    const dadosSalvos = localStorage.getItem('minhas_apis');
    if (dadosSalvos) {
      this.listaDeApis = JSON.parse(dadosSalvos);
    }
  }
}