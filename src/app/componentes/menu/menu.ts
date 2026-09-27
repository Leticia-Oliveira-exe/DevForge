import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioComponent } from '../usuario/usuario'; 

@Component({
  selector: 'app-menu', // ou o nome do seletor do seu menu
  standalone: true,
  imports: [CommonModule, UsuarioComponent], 
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})


export class Menu {

  // Abre e fecha o menu lateral do usuário (Sidebar)
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

  // Mantém o funcionamento original do menu de celular
  toggleMenu(): void {
    const leftMenu = document.querySelector('.nav-group-left');
    const rightMenu = document.querySelector('.nav-group-right');

    leftMenu?.classList.toggle('active');
    rightMenu?.classList.toggle('active');
  }
}