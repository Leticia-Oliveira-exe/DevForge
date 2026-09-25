import { Component } from '@angular/core';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css',
})
export class UsuarioComponent {

  // Função que abre e fecha a sidebar controlando o estilo direto no DOM
  toggleSidebar(): void {
    const menu = document.getElementById('sideMenu');
    if (!menu) {
      return;
    }

    if (menu.style.width === '250px') {
      menu.style.width = '0';
    } else {
      menu.style.width = '250px';
    }
  }
}