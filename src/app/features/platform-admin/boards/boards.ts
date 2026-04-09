import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  EllipsisVertical,
  LucideAngularModule,
  Plus,
  Search,
  Trash2,
  X,
  SquarePen,
} from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { BoardsService } from '../../../services/boards/boards.service';
import { IBoard, IBoardRequestBody } from '../../../core/interface/boards.interface';
import { TableModule, Table } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-boards',
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    CardModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    DialogModule,
    TableModule,
    ToastModule,
  ],
  templateUrl: './boards.html',
  styleUrl: './boards.css',
  providers: [MessageService],
})
export class Boards implements OnInit {
  private boardsService = inject(BoardsService);
  private messageService = inject(MessageService);

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
    SquarePen,
    Trash2,
    Search,
    X,
  };

  ngOnInit() {
    this.loadBoards();
  }

  clear(table: Table) {
    table.clear();
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
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to fetch boards',
        });
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
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Board updated successfully' });
        },
        error: (err) => {
          this.error.set('Failed to update board');
          this.formLoading.set(false);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update board' });
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
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Board created successfully' });
        },
        error: (err) => {
          this.error.set('Failed to create board');
          this.formLoading.set(false);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create board' });
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
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Board deleted successfully' });
        },
        error: (err) => {
          this.error.set('Failed to delete board');
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete board' });
          console.error('Error deleting board:', err);
        },
      });
    }
  }

  closeDialog() {
    this.showDialog.set(false);
  }
}
