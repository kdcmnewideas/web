import { CURRENT_USER } from './../../../shared/constants/mock-data.constant';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Plus, LucideAngularModule, EllipsisVertical, CircleCheck, SquarePen, Trash2 } from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { LEADERBOARD_DATA } from '../../../shared/constants/mock-data.constant';

@Component({
  selector: 'app-users',
  imports: [FormsModule, LucideAngularModule, CardModule, ButtonModule],
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
    Trash2
  };
  users = LEADERBOARD_DATA;
  CURRENT_USER = CURRENT_USER;
}
