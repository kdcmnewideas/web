import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ChevronLeft, UploadCloud } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SubjectService } from '../../../services/subject/subject.service';
import { environment } from '../../../../environments/environment';
import { ISubjectDetails } from '../../../core/interface/subject.interface';
import {
  SubjectSelectionService,
  SelectedSubject,
} from '../../../../app/services/subject/subject-selection.service';
import { DynamicTree } from '../../../shared/components/dynamic-tree/dynamic-tree';
import { AcademicNode } from '../../../shared/components/dynamic-tree/academic-node.interface';

@Component({
  selector: 'app-view-content',
  imports: [
    CommonModule,
    LucideAngularModule,
    ButtonModule,
    CardModule,
    TooltipModule,
    ToastModule,
    DynamicTree,
  ],
  templateUrl: './view-content.html',
  styleUrl: './view-content.css',
  providers: [MessageService],
})
export class ViewContent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private subjectService = inject(SubjectService);
  private messageService = inject(MessageService);
  private selectionService = inject(SubjectSelectionService);
  private authService = inject(AuthService);

  subject = signal<any | null>(null);
  treeData = signal<AcademicNode[]>([]);
  selectedNode = signal<AcademicNode | null>(null);
  loading = signal(false);
  selectedFile = signal<File | null>(null);
  uploading = signal(false);
  icons = { ChevronLeft, UploadCloud };
  orgId = '';

  ngOnInit() {
    this.authService.getUserDetails().subscribe({
      next: (user) => {
        this.orgId = user?.memberships?.[0]?.org_id || environment.orgId;
        this.loadSubjectDetails();
      },
      error: () => {
        this.orgId = environment.orgId;
        this.loadSubjectDetails();
      }
    });
  }

  loadSubjectDetails() {
    this.loading.set(true);
    // Prefer selection service value (best practice over route params)
    const selected: SelectedSubject | null = this.selectionService.current;
    if (!selected) {
      // If nothing selected, error and navigate back
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No subject selected',
      });
      this.goBack();
      this.loading.set(false);
      return;
    }

    // Set a minimal subject object early so UI can show title immediately
    this.subject.set({ id: selected.id, title: selected.title } as any);

    // Load full details (including chapters) from API
    this.subjectService.getSubjectComplete(selected.id).subscribe({
      next: (data) => {
        this.subject.set(data);
        this.treeData.set(this.buildTreeData(data));
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading subject details:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error?.detail || 'Failed to load subject details',
        });
        this.loading.set(false);
      },
    });
  }

  buildTreeData(subjectData: any): AcademicNode[] {
    if (!subjectData.chapters) return [];
    return subjectData.chapters.map((ch: any, ci: number) => {
      const chapterNode: AcademicNode = {
        id: ch.id ?? `ch-${ci}`,
        label: ch.title,
        children:
          ch.topics?.map((t: any, ti: number) => ({
            id: t.id ?? `ch-${ci}-t-${ti}`,
            label: t.title,
            content: t.content,
          })) ?? [],
      };
      return chapterNode;
    });
  }

  onNodeSelected(node: AcademicNode) {
    this.selectedNode.set(node);
  }

  onNodeAdded(parent: AcademicNode) {
    console.log('Add child to:', parent);
  }

  onNodeUpdated(node: AcademicNode) {
    console.log('Node updated:', node);
  }

  onNodeDeleted(id: string) {
    console.log('Node deleted:', id);
  }

  goBack() {
    this.router.navigate(['org-admin', 'subjects']);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile.set(input.files[0]);
    } else {
      this.selectedFile.set(null);
    }
  }

  addContent() {
    const file = this.selectedFile();
    const subjectId = this.subject()?.id;
    if (!file) {
      this.messageService.add({
        severity: 'warn',
        summary: 'No file',
        detail: 'Please choose a document to upload',
      });
      return;
    }
    if (!subjectId) {
      this.messageService.add({
        severity: 'error',
        summary: 'No subject',
        detail: 'No subject selected',
      });
      return;
    }

    this.uploading.set(true);
    this.subjectService
      .ingestPdf(subjectId, file, this.orgId, environment.geminiApiKey)
      .subscribe({
        next: (res) => {
          this.uploading.set(false);
          this.selectedFile.set(null);
          this.messageService.add({
            severity: 'success',
            summary: 'Uploaded',
            detail: 'Document ingested successfully',
          });
          // Refresh subject details to show new chapters/content
          this.loadSubjectDetails();
        },
        error: (err) => {
          this.uploading.set(false);
          console.error('Ingestion failed', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Upload failed',
            detail: err.error?.detail || 'Ingestion API failed',
          });
        },
      });
  }
}
