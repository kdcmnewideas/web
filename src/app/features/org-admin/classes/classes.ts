import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Plus,
  LucideAngularModule,
  ChevronRight,
  ChevronDown,
  CircleCheck,
  CircleMinus,
  SquarePen,
  Trash2,
  Presentation,
  Search,
} from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ClassesService } from '../../../services/classes/classes.service';
import { SectionService } from '../../../services/section/section.service';
import { CoursesService } from '../../../services/courses/courses.service';
import { AuthService } from '../../../services/auth/auth.service';
import { ICourse } from '../../../core/interface/courses.interface';
import { IClass } from '../../../core/interface/classes.interface';
import { ISection } from '../../../core/interface/section.interface';
import { AddClass } from './add-class/add-class';
import { AddSection } from './add-section/add-section';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    CardModule,
    ButtonModule,
    TableModule,
    TagModule,
    ToastModule,
  ],
  templateUrl: './classes.html',
  styleUrl: './classes.css',
  providers: [MessageService, DialogService],
})
export class Classes implements OnInit {
  private classesService = inject(ClassesService);
  private sectionService = inject(SectionService);
  private coursesService = inject(CoursesService);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);
  private dialogService = inject(DialogService);

  classes = signal<IClass[]>([]);
  sections = signal<ISection[]>([]);
  courses = signal<ICourse[]>([]);
  loading = signal(false);
  userDetails: any = null;

  icons = {
    Plus,
    ChevronRight,
    ChevronDown,
    CircleCheck,
    CircleMinus,
    SquarePen,
    Trash2,
    Presentation,
    Search,
  };

  courseMap = computed(() => {
    const map: Record<string, string> = {};
    const coursesList = this.courses() as any;
    // CoursesService.getCourses() might return ICourse[] casted.
    if (Array.isArray(coursesList)) {
      coursesList.forEach((c) => (map[c.id] = c.name));
    }
    return map;
  });

  ngOnInit() {
    this.initData();
  }

  private initData() {
    this.loading.set(true);
    this.authService.getUserDetails().subscribe({
      next: (user) => {
        // Prepare userDetails with org info for service headers
        // We need to find the correct membership. For now taking the first one or defaulting to environment
        const membership = user.memberships?.[0];
        this.userDetails = {
          ...user,
          org_id: membership?.org_id || environment.orgId,
          org_role: membership?.org_role || 'admin',
        };

        this.loadAll();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Auth Error',
          detail: 'Failed to get user context',
        });
        this.loading.set(false);
      },
    });
  }

  private loadAll() {
    // Parallel loading or sequential? Let's do parallel for better perf
    // 1. Load Courses
    this.coursesService.getCourses().subscribe({
      next: (data) => this.courses.set(data as unknown as ICourse[]),
      error: () => console.error('Failed to load courses'),
    });

    // 2. Load Classes
    this.classesService.getClasses(this.userDetails).subscribe({
      next: (data) => this.classes.set(data),
      error: () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load classes',
        }),
    });

    // 3. Load Sections
    this.sectionService.getSections(this.userDetails).subscribe({
      next: (data) => {
        this.sections.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load sections',
        });
        this.loading.set(false);
      },
    });
  }

  getCourseName(id: string) {
    return this.courseMap()[id] || 'Unknown Course';
  }

  getSectionsForClass(classId: string) {
    return this.sections().filter((s) => s.class_id === classId);
  }

  openAddClassDialog() {
    const ref = this.dialogService.open(AddClass, {
      header: 'Create New Class',
      width: '30rem',
      data: {
        userDetails: this.userDetails,
        courses: this.courses(),
      },
    });

    ref?.onClose.subscribe((res) => {
      if (res) this.loadAll();
    });
  }

  openEditClassDialog(cls: IClass) {
    const ref = this.dialogService.open(AddClass, {
      header: 'Edit Class',
      width: '30rem',
      data: {
        userDetails: this.userDetails,
        courses: this.courses(),
        class: cls,
      },
    });

    ref?.onClose.subscribe((res) => {
      if (res) this.loadAll();
    });
  }

  openAddSectionDialog(cls: IClass) {
    const ref = this.dialogService.open(AddSection, {
      header: `Add Section to ${cls.name}`,
      width: '25rem',
      data: {
        userDetails: this.userDetails,
        class: cls,
      },
    });

    ref?.onClose.subscribe((res) => {
      if (res) this.loadAll();
    });
  }

  openEditSectionDialog(section: ISection, cls: IClass) {
    const ref = this.dialogService.open(AddSection, {
      header: `Edit Section`,
      width: '25rem',
      data: {
        userDetails: this.userDetails,
        class: cls,
        section: section,
      },
    });

    ref?.onClose.subscribe((res) => {
      if (res) this.loadAll();
    });
  }

  deleteClass(id: string) {
    if (confirm('Delete this class and all associated sections?')) {
      this.classesService.deleteClass(id, this.userDetails).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Deleted',
            detail: 'Class deleted successfully',
          });
          this.loadAll();
        },
      });
    }
  }

  deleteSection(id: string) {
    if (confirm('Delete this section?')) {
      this.sectionService.deleteSection(id, this.userDetails).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Deleted',
            detail: 'Section deleted successfully',
          });
          this.loadAll();
        },
      });
    }
  }
}
