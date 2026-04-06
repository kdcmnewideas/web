import { Component, inject, signal, OnInit } from '@angular/core';
import { Plus, FileText, LucideAngularModule, Trash2, Edit, Download, Cloud } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService } from 'primeng/api';
import { SubjectService } from '../../../services/subject/subject.service';
import { SubjectSelectionService } from '../../../../app/services/subject/subject-selection.service';
import { ISubjectDetails } from '../../../core/interface/subject.interface';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subject',
  imports: [
    CommonModule,
    LucideAngularModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    TableModule,
    CardModule,
    ToastModule,
    TooltipModule,
  ],
  templateUrl: './subject.html',
  styleUrl: './subject.css',
  providers: [MessageService],
})
export class Subject implements OnInit {
  subjects = signal<ISubjectDetails[]>([]);
  displayDialog = signal(false);
  loading = signal(false);
  uploading = signal(false);
  selectedFile: File | null = null;
  currentPrefillSubject: ISubjectDetails | null = null;

  subjectForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    thumbnail_url: new FormControl(''),
  });

  icons = {
    Plus,
    FileText,
    Trash2,
    Edit,
    Download,
    Cloud,
  };

  private subjectService = inject(SubjectService);
  private messageService = inject(MessageService);
  private orgId = environment.orgId;
  private router = inject(Router);
  private selectionService = inject(SubjectSelectionService);

  ngOnInit() {
    this.loadSubjects();
  }

  loadSubjects() {
    this.loading.set(true);
    this.subjectService.listAllSubjects(this.orgId).subscribe({
      next: (data) => {
        this.subjects.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load subjects',
        });
        this.loading.set(false);
      },
    });
  }

  openDialog() {
    this.displayDialog.set(true);
    this.subjectForm.reset();
    this.selectedFile = null;
    this.currentPrefillSubject = null;
    this.subjectForm.enable();
  }

  openDialogWithPrefill(subject: ISubjectDetails) {
    this.subjectForm.patchValue({
      title: subject.title || '',
      description: subject.description || '',
      thumbnail_url: subject.thumbnail_url || '',
    });
    this.currentPrefillSubject = subject;
    // Ensure controls are enabled so prefilled values are editable
    this.subjectForm.enable();
    this.displayDialog.set(true);
    this.selectedFile = null;
  }

  closeDialog() {
    this.displayDialog.set(false);
    this.subjectForm.reset();
    this.selectedFile = null;
  }

  onFileSelect(event: any) {
    const files = event.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
      this.messageService.add({
        severity: 'info',
        summary: 'File Selected',
        detail: `${this.selectedFile?.name} selected`,
      });
      // If dialog was opened for an existing subject (prefill), call ingestion immediately
      if (this.currentPrefillSubject && this.currentPrefillSubject.id) {
        const geminiKey = environment.geminiApiKey || '';
        this.subjectService
          .ingestPdf(this.currentPrefillSubject.id, this.selectedFile!, this.orgId, geminiKey)
          .subscribe({
            next: (res) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Ingestion Started',
                detail: 'PDF uploaded for ingestion',
              });
              // Optionally refresh subjects to fetch new status
              this.loadSubjects();
            },
            error: (err) => {
              console.error('Error uploading to ingestion:', err);
              this.messageService.add({
                severity: 'error',
                summary: 'Ingestion Error',
                detail: err.error?.detail || 'Failed to start ingestion',
              });
            },
          });
      }
    }
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.onFileSelect({ files });
    }
  }

  onContentClick(subject: ISubjectDetails) {
    const status = (subject.status || '').trim();
    // If no status, open create dialog with prefilled details
    if (!status) {
      this.openDialogWithPrefill(subject);
      return;
    }

    // For any existing status (DRAFT, REVIEW, PUBLISHED, ARCHIVED), set selection and navigate
    this.selectionService.select({ id: subject.id!, title: subject.title || '' });
    this.router.navigate(['org-admin', 'view-content']);
  }

  createSubject() {
    if (!this.subjectForm.valid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation Error',
        detail: 'Please fill all required fields',
      });
      return;
    }

    this.uploading.set(true);

    const { title, description, thumbnail_url } = this.subjectForm.value;

    const subjectData = {
      title: title || '',
      description: description || '',
      thumbnail_url: thumbnail_url || '',
      org_id: this.orgId,
    };

    this.subjectService.createSubject(subjectData).subscribe({
      next: (response) => {
        this.subjects.update((items) => [response, ...items]);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Subject created successfully',
        });
        // If user selected a file during creation, upload it to ingestion for the newly created subject
        if (this.selectedFile) {
          const geminiKey = environment.geminiApiKey || '';
          this.subjectService
            .ingestPdf(response.id, this.selectedFile!, this.orgId, geminiKey)
            .subscribe({
              next: () => {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Ingestion Started',
                  detail: 'PDF uploaded for ingestion',
                });
                this.loadSubjects();
              },
              error: (err) => {
                console.error('Error uploading to ingestion:', err);
                this.messageService.add({
                  severity: 'error',
                  summary: 'Ingestion Error',
                  detail: err.error?.detail || 'Failed to start ingestion',
                });
              },
              complete: () => {
                this.closeDialog();
                this.uploading.set(false);
              },
            });
        } else {
          this.closeDialog();
          this.uploading.set(false);
        }
      },
      error: (err) => {
        console.error('Error creating subject:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error?.detail || 'Failed to create subject',
        });
        this.uploading.set(false);
      },
    });
  }

  deleteSubject(id: string) {
    if (confirm('Are you sure you want to delete this subject?')) {
      this.subjectService.deleteSubjectById(id).subscribe({
        next: () => {
          this.subjects.update((items) => items.filter((s) => s.id !== id));
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Subject deleted successfully',
          });
        },
        error: (e) => {
          console.error('Error deleting subject:', e);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete subject',
          });
        },
      });
    }
  }
  viewSubject(id: string): void {
    if (!id) return;
    // Do not pass id via route - use selection service instead
    const s = this.subjects().find((x) => x.id === id);
    if (s) {
      this.selectionService.select({ id: s.id!, title: s.title || '' });
    }
    this.router.navigate(['org-admin', 'view-content']);
  }
}
