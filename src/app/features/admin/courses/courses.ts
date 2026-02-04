import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  BookOpen,
  EllipsisVertical,
  LucideAngularModule,
  Pencil,
  Plus,
  Search,
  Trash2,
} from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { BOARDS, CLASSES, SUBJECTS } from '../../../shared/constants/mock-data.constant';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-courses',
  imports: [
    FormsModule,
    LucideAngularModule,
    CardModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
  ],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses {
  searchTerm = '';
  icons = {
    Plus,
    EllipsisVertical,
    BookOpen,
    Pencil,
    Trash2,
    Search,
  };

  courses = SUBJECTS;
  boards = BOARDS;
  classes = CLASSES;

  getBoard(s: any) {
    return this.boards.find((b) => b.id === s.boardId)?.name || 'N/A';
  }

  getClass(s: any) {
    return this.classes.find((c) => c.id === s.classId)?.name || 'N/A' || 'N/A';
  }
}
