import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Plus,
  LucideAngularModule,
  EllipsisVertical,
  CircleCheck,
  SquarePen,
  Trash2,
  Search,
  CircleMinus,
} from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CoursesService } from '../../../services/courses/courses.service';
import { BoardsService } from '../../../services/boards/boards.service';
import { ICourse } from '../../../core/interface/courses.interface';
import { IBoard } from '../../../core/interface/boards.interface';
import { AddCourse } from './add-course/add-course';

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
    TableModule,
    MultiSelectModule,
    SelectModule,
    TagModule,
    CommonModule,
    ToastModule,
  ],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
  providers: [MessageService, DialogService],
})
export class Courses implements OnInit {
  ref: DynamicDialogRef | null = null;

  searchTerm = '';
  icons = {
    Plus,
    EllipsisVertical,
    CircleCheck,
    SquarePen,
    Trash2,
    Search,
    CircleMinus,
  };

  courses = signal<ICourse[]>([]);
  boards = signal<IBoard[]>([]);
  loading = signal(false);

  statuses: any[] = [];
  boardOptions: any[] = [];

  coursesService = inject(CoursesService);
  boardsService = inject(BoardsService);
  private messageService = inject(MessageService);
  private dialogService = inject(DialogService);

  // A dictionary for quick lookup of board names by board_id
  boardNameMap = computed(() => {
    const map: Record<string, string> = {};
    for (const b of this.boards()) {
      map[b.id] = b.name;
    }
    return map;
  });

  ngOnInit(): void {
    this.statuses = [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
    ];
    this.loadData();
  }

  loadData() {
    this.loading.set(true);
    // Fetch boards first for the name mapping
    this.boardsService.getAllBoards().subscribe({
      next: (boardsData) => {
        this.boards.set(boardsData);
        this.boardOptions = boardsData.map((b) => ({ label: b.name, value: b.id }));

        // Then load courses
        this.getCourses();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load boards',
        });
        this.loading.set(false);
      },
    });
  }

  clear(table: Table) {
    table.clear();
  }

  getCourses(): void {
    // getCourses might return array even if interface is single. Using `as unknown` if it complains, but types are erased at runtime anyway.
    this.coursesService.getCourses().subscribe({
      next: (data) => {
        this.courses.set(data as unknown as ICourse[]);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to fetch courses',
        });
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }

  getBoardName(boardId: string): string {
    return this.boardNameMap()[boardId] || 'Unknown Board';
  }

  getSeverity(isActive: boolean) {
    return isActive ? 'success' : 'danger';
  }

  openAddCourseDialog() {
    this.ref = this.dialogService.open(AddCourse, {
      header: 'Add Course',
      width: '25rem',
      data: { boards: this.boardOptions },
    });

    this.ref?.onClose.subscribe((res) => {
      if (res) {
        this.getCourses();
      }
    });
  }

  openEditCourseDialog(course: ICourse) {
    this.ref = this.dialogService.open(AddCourse, {
      header: 'Edit Course',
      width: '25rem',
      data: { course, boards: this.boardOptions },
    });

    this.ref?.onClose.subscribe((res) => {
      if (res) {
        this.getCourses();
      }
    });
  }
}
