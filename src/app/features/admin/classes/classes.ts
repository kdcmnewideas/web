import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Plus, EllipsisVertical, LucideAngularModule, Pencil, Trash2 } from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { BOARDS, CLASSES } from '../../../shared/constants/mock-data.constant';

@Component({
  selector: 'app-classes',
  imports: [FormsModule, LucideAngularModule, CardModule, ButtonModule],
  templateUrl: './classes.html',
  styleUrl: './classes.css',
})
export class Classes {
  searchTerm = '';
  icons = {
    Plus,
    EllipsisVertical,
    Pencil,
    Trash2,
  };

  classes = CLASSES;
  boards = BOARDS;

  getBoard(c: any) {
    return this.boards.find((b) => b.id === c.boardId)?.name;
  }
}
