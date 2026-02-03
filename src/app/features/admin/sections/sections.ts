import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EllipsisVertical, LucideAngularModule, Pencil, Plus, Trash2 } from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CLASSES, SECTIONS } from '../../../shared/constants/mock-data.constant';
import { Classes } from '../classes/classes';

@Component({
  selector: 'app-sections',
  imports: [FormsModule, LucideAngularModule, CardModule, ButtonModule],
  templateUrl: './sections.html',
  styleUrl: './sections.css',
})
export class Sections {
  searchTerm = '';
  icons={
    Plus,
    EllipsisVertical,
    Pencil,
    Trash2
  }

  sections = SECTIONS;
  classes = CLASSES;

  getClasses(s: any){
    return this.classes.find(c => c.id === s.classId)?.name;
  }
}
