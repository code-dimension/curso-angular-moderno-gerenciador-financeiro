import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Layout } from './core/layout/layout';

@Component({
  selector: 'app-root',
  imports: [Layout, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'gerenciador-financeiro';
}
