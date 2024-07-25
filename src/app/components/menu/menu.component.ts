import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Menu } from '../../interfaces/menu';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  @Input() menus!: Menu[];
  
}
