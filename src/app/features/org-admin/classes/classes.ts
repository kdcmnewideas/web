import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Plus, EllipsisVertical, LucideAngularModule, Pencil, Trash2, Search } from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { BOARDS, CLASSES } from '../../../shared/constants/mock-data.constant';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-classes',
  imports: [
    FormsModule,
    LucideAngularModule,
    CardModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
  ],
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
    Search
  };

  classes = CLASSES;
  boards = BOARDS;

  getBoard(c: any) {
    return this.boards.find((b) => b.id === c.boardId)?.name;
  }
}
