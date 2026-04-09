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
import { OrganizationService } from '../../../services/organization/organization.service';
import { IOrganization, ICreateOrg } from '../../../core/interface/organization.interface';
import { TableModule, Table } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-organization',
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
  templateUrl: './organization.html',
  styleUrl: './organization.css',
  providers: [MessageService],
})
export class Organization implements OnInit {
  private orgService = inject(OrganizationService);
  private messageService = inject(MessageService);

  searchTerm = '';
  orgs = signal<IOrganization[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  showDialog = signal(false);
  formLoading = signal(false);

  formData = signal<ICreateOrg>({
    name: '',
    org_type: '',
    tenant_code: '',
    admin_email: '',
    admin_name: '',
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
    this.loadOrganizations();
  }

  clear(table: Table) {
    table.clear();
  }

  loadOrganizations() {
    this.loading.set(true);
    this.error.set(null);
    this.orgService.getOrganizations().subscribe({
      next: (data) => {
        this.orgs.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load organizations');
        this.loading.set(false);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to fetch organizations',
        });
        console.error('Error loading organizations:', err);
      },
    });
  }

  openCreateDialog() {
    this.formData.set({
      name: '',
      org_type: '',
      tenant_code: '',
      admin_email: '',
      admin_name: '',
    });
    this.showDialog.set(true);
  }

  saveOrganization() {
    if (!this.formData().name || !this.formData().tenant_code) {
      this.error.set('Organization name and tenant code are required');
      return;
    }

    this.formLoading.set(true);
    const data = this.formData();

    this.orgService.createOrg(data).subscribe({
      next: () => {
        this.loadOrganizations();
        this.showDialog.set(false);
        this.formLoading.set(false);
        this.error.set(null);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Organization created successfully' });
      },
      error: (err) => {
        this.error.set('Failed to create organization');
        this.formLoading.set(false);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create organization' });
        console.error('Error creating organization:', err);
      },
    });
  }

  closeDialog() {
    this.showDialog.set(false);
  }
}
