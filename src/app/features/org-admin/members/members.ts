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
import { IMember } from '../../../core/interface/organization.interface';
import { OrganizationService } from '../../../services/organization/organization.service';
import { AddMember } from './add-member/add-member';
import { CURRENT_USER } from '../../../shared/constants/mock-data.constant';

@Component({
  selector: 'app-members',
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
  templateUrl: './members.html',
  styleUrl: './members.css',
  providers: [MessageService, DialogService],
})
export class Members implements OnInit {
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
  members = signal<IMember[]>([]);
  CURRENT_USER = CURRENT_USER;
  loading = signal(false);

  statuses: any[] = [];
  orgRoles: any[] = [];

  orgService = inject(OrganizationService);
  private messageService = inject(MessageService);
  private dialogService = inject(DialogService);

  orgId = '1d346816-f11b-4530-8cbc-159393f02fce'; // Using Mock Server ID

  ngOnInit(): void {
    this.getMembers();
    this.statuses = [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
    ];
    this.orgRoles = [
      { label: 'Admin', value: 'admin' },
      { label: 'Member', value: 'member' },
      { label: 'Teacher', value: 'teacher' },
    ];
  }

  clear(table: Table) {
    table.clear();
  }

  getMembers(): void {
    this.loading.set(true);
    this.orgService.getOrganizationMembers(this.orgId).subscribe({
      next: (members) => {
        this.members.set(members);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to fetch members',
        });
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }

  getSeverity(status: string) {
    switch (status?.toLowerCase()) {
      case 'inactive':
        return 'danger';
      case 'active':
        return 'success';
      default:
        return null;
    }
  }

  openAddMemberDialog() {
    this.ref = this.dialogService.open(AddMember, {
      header: 'Add Member',
      width: '25rem',
      data: { orgId: this.orgId },
    });

    this.ref?.onClose.subscribe((res) => {
      if (res) {
        this.getMembers();
      }
    });
  }

  openEditMemberDialog(member: IMember) {
    this.ref = this.dialogService.open(AddMember, {
      header: 'Edit Member',
      width: '25rem',
      data: { orgId: this.orgId, member },
    });

    this.ref?.onClose.subscribe((res) => {
      if (res) {
        this.getMembers();
      }
    });
  }
}
