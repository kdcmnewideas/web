import { CURRENT_USER } from './../../../shared/constants/mock-data.constant';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Plus,
  LucideAngularModule,
  EllipsisVertical,
  CircleCheck,
  SquarePen,
  Trash2,
  Search,
} from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { LEADERBOARD_DATA } from '../../../shared/constants/mock-data.constant';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PlatformManagementService } from '../../../services/platform-management/platform-management.service';
import { IPlatformUser } from '../../../core/interface/platform-users.interface';
import { Table, TableModule } from 'primeng/table';
import { MultiSelect } from 'primeng/multiselect';
import { Select } from 'primeng/select';
import { Tag } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-users',
  imports: [
    FormsModule,
    LucideAngularModule,
    CardModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    TableModule,
    FormsModule,
    MultiSelect,
    Select,
    Tag,
    CommonModule,
    ToastModule,
  ],
  templateUrl: './users.html',
  styleUrl: './users.css',
  providers: [MessageService],
})
export class Users implements OnInit {
  searchTerm = '';
  icons = {
    Plus,
    EllipsisVertical,
    CircleCheck,
    SquarePen,
    Trash2,
    Search,
  };
  users = signal<IPlatformUser[]>([]);
  CURRENT_USER = CURRENT_USER;
  loading = signal(false);

  statuses: any[] = [];
  platformRoles: any[] = [];

  platformService = inject(PlatformManagementService);
  private messageService = inject(MessageService);

  ngOnInit(): void {
    this.getUsers();
    this.statuses = [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
    ];
    this.platformRoles = [
      { label: 'Super Admin', value: 'super_admin' },
      { label: 'Admin', value: 'admin' },
      { label: 'User', value: 'user' },
    ];
  }

  clear(table: Table) {
    table.clear();
  }

  getUsers(): void {
    this.platformService.getUsers().subscribe({
      next: (users) => {
        this.users.set(users);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to fetch users',
        });
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }

  getSeverity(status: string) {
    switch (status) {
      case 'inactive':
        return 'danger';

      case 'active':
        return 'success';

      default:
        return null;
    }
  }
}
