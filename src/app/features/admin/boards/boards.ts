import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  EllipsisVertical,
  LucideAngularModule,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { BoardsService } from '../../../services/boards/boards.service';
import { IBoard, IBoardRequestBody } from '../../../core/interface/boards.interface';

@Component({
  selector: 'app-boards',
  imports: [
    FormsModule,
    LucideAngularModule,
    CardModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    DialogModule,
  ],
  templateUrl: './boards.html',
  styleUrl: './boards.css',
})
export class Boards implements OnInit {
  private boardsService = inject(BoardsService);

  searchTerm = '';
  boards = signal<IBoard[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  showDialog = signal(false);
  isEditMode = signal(false);
  formLoading = signal(false);
  editingBoardId = signal<string | null>(null);

  formData = signal<IBoardRequestBody>({
    name: '',
    code: '',
    country: '',
    state: '',
  });

  icons = {
    Plus,
    EllipsisVertical,
    Pencil,
    Trash2,
    Search,
    X,
  };

  ngOnInit() {
    this.loadBoards();
  }

  loadBoards() {
    this.loading.set(true);
    this.error.set(null);
    this.boardsService.getAllBoards().subscribe({
      next: (data) => {
        this.boards.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load boards');
        this.loading.set(false);
        console.error('Error loading boards:', err);
      },
    });
  }

  openCreateDialog() {
    this.isEditMode.set(false);
    this.editingBoardId.set(null);
    this.formData.set({
      name: '',
      code: '',
      country: '',
      state: '',
    });
    this.showDialog.set(true);
  }

  openEditDialog(board: IBoard) {
    this.isEditMode.set(true);
    this.editingBoardId.set(board.id);
    this.formData.set({
      name: board.name,
      code: board.code,
      country: board.country,
      state: board.state,
    });
    this.showDialog.set(true);
  }

  saveBoard() {
    if (!this.formData().name || !this.formData().code) {
      this.error.set('Board name and code are required');
      return;
    }

    this.formLoading.set(true);
    const data = this.formData();

    if (this.isEditMode()) {
      this.boardsService.updateBoardById(this.editingBoardId()!, data).subscribe({
        next: () => {
          this.loadBoards();
          this.showDialog.set(false);
          this.formLoading.set(false);
          this.error.set(null);
        },
        error: (err) => {
          this.error.set('Failed to update board');
          this.formLoading.set(false);
          console.error('Error updating board:', err);
        },
      });
    } else {
      this.boardsService.createBoard(data).subscribe({
        next: () => {
          this.loadBoards();
          this.showDialog.set(false);
          this.formLoading.set(false);
          this.error.set(null);
        },
        error: (err) => {
          this.error.set('Failed to create board');
          this.formLoading.set(false);
          console.error('Error creating board:', err);
        },
      });
    }
  }

  deleteBoard(boardId: string) {
    if (confirm('Are you sure you want to delete this board?')) {
      this.boardsService.deleteBoardById(boardId).subscribe({
        next: () => {
          this.loadBoards();
        },
        error: (err) => {
          this.error.set('Failed to delete board');
          console.error('Error deleting board:', err);
        },
      });
    }
  }

  closeDialog() {
    this.showDialog.set(false);
  }
}
