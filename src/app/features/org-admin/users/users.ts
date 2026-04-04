import { CURRENT_USER } from './../../../shared/constants/mock-data.constant';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Plus,
  LucideAngularModule,
  EllipsisVertical,
  CircleCheck,
  SquarePen,
  Trash2,
  Search,
} from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { LEADERBOARD_DATA } from '../../../shared/constants/mock-data.constant';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-users',
  imports: [
    FormsModule,
    LucideAngularModule,
    CardModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
  ],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {
  searchTerm = '';
  icons = {
    Plus,
    EllipsisVertical,
    CircleCheck,
    SquarePen,
    Trash2,
    Search
  };
  users = LEADERBOARD_DATA;
  CURRENT_USER = CURRENT_USER;
}
