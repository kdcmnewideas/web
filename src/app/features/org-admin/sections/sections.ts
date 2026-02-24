import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  EllipsisVertical,
  LucideAngularModule,
  Pencil,
  Plus,
  Search,
  Trash2,
} from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CLASSES, SECTIONS } from '../../../shared/constants/mock-data.constant';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-sections',
  imports: [
    FormsModule,
    LucideAngularModule,
    CardModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
  ],
  templateUrl: './sections.html',
  styleUrl: './sections.css',
})
export class Sections {
  searchTerm = '';
  icons = {
    Plus,
    EllipsisVertical,
    Pencil,
    Trash2,
    Search,
  };

  sections = SECTIONS;
  classes = CLASSES;

  getClasses(s: any) {
    return this.classes.find((c) => c.id === s.classId)?.name;
  }
}
