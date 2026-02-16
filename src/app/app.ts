import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { updateSurfacePalette } from '@primeuix/themes';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('aile');
  surface = {
    0: '#ffffff',
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  };
  constructor(){
    updateSurfacePalette(this.surface);
  }
}
