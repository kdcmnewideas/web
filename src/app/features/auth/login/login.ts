import { Component } from '@angular/core';
import {
  lucideSquareCheckBig,
  lucideSquare,
  lucideLayoutGrid,
  lucideCircleCheck,
  lucideUsers,
  lucideGlobe,
  lucideChartColumn,
  lucideChartPie,
  lucideZap,
} from '@ng-icons/lucide';
import { NgIcon, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-login',
  imports: [NgIcon],
  templateUrl: './login.html',
  styleUrl: './login.css',
  viewProviders: [provideIcons({lucideSquareCheckBig, lucideSquare, lucideLayoutGrid, lucideCircleCheck, lucideUsers, lucideGlobe, lucideChartColumn, lucideChartPie, lucideZap})]
})
export class Login {
  rememberMe: boolean = false;

}
