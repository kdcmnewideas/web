import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EllipsisVertical, LucideAngularModule, Pencil, Plus, Trash2 } from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { BOARDS } from '../../../shared/constants/mock-data.constant';

@Component({
  selector: 'app-boards',
  imports: [FormsModule, LucideAngularModule, CardModule, ButtonModule],
  templateUrl: './boards.html',
  styleUrl: './boards.css',
})
export class Boards {
  searchTerm = '';
  icons = {
    Plus,
    EllipsisVertical,
    Pencil,
    Trash2
  };

  boards = BOARDS;
}
