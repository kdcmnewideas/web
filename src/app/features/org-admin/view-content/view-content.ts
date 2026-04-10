import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
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

  subject = signal<any | null>(null);
  treeData = signal<AcademicNode[]>([]);
  selectedNode = signal<AcademicNode | null>(null);
  loading = signal(false);
  // chapters loaded into the content viewer (in order)
  displayedChapters = signal<any[]>([]);
  // index of next chapter in subject().chapters to load on scroll
  private nextChapterIndex = 0;
  private isLoadingChapters = false;
  private scrollDebounce: any = null;
  // cache chapter data keyed by chapter id
  private chapterCache = new Map<string, any>();
  // simple map for quick subtopic lookup: subtopicId -> { chapterId, payload }
  private subtopicIndex = new Map<string, { chapterId: string; data: any }>();
  selectedFile = signal<File | null>(null);
  uploading = signal(false);
  icons = { ChevronLeft, UploadCloud };

  ngOnInit() {
    this.loadCacheFromSession();
    this.loadSubjectDetails();
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
        // initialize content viewer with first chapter
        this.loading.set(false);
        this.loadInitialChapterContent();
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

  private loadInitialChapterContent() {
    const subj = this.subject();
    if (!subj || !subj.chapters || !subj.chapters.length) return;
    // reset displayed chapters
    this.displayedChapters.set([]);
    this.nextChapterIndex = 0;
    // load first chapter immediately
    const firstId = subj.chapters[0].id;
    this.loadChapterIntoViewer(firstId).then(() => {
      this.nextChapterIndex = 1;
    });
  }

  private async loadChapterIntoViewer(chapterId: string, force = false) {
    if (!chapterId) return;
    // If already displayed, skip
    if (this.displayedChapters().some((ch: any) => ch.id === chapterId)) return;
    if (this.chapterCache.has(chapterId)) {
      const cached = this.chapterCache.get(chapterId);
      this.insertChapterSorted(cached);
      return;
    }
    if (!force && this.isLoadingChapters) return;
    this.isLoadingChapters = true;
    return new Promise<void>((resolve) => {
      this.subjectService.getChapterContent(chapterId).subscribe({
        next: (data) => {
          this.chapterCache.set(chapterId, data);
          // index subtopics
          (data.topics || []).forEach((t: any) => {
            (t.subtopics || []).forEach((st: any) => {
              this.subtopicIndex.set(st.id, { chapterId, data: st });
            });
          });
          this.persistCachesToSession();
          this.insertChapterSorted(data);
          // Keep the loading guard on briefly to prevent scroll-triggered re-entry
          setTimeout(() => { this.isLoadingChapters = false; }, 300);
          this.loading.set(false);
          resolve();
        },
        error: (err) => {
          setTimeout(() => { this.isLoadingChapters = false; }, 300);
          this.loading.set(false);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load chapter' });
          resolve();
        },
      });
    });
  }

  /**
   * Insert a chapter into displayedChapters in the same order as subject().chapters,
   * so clicking a later chapter doesn't put it before earlier ones.
   */
  private insertChapterSorted(chapter: any) {
    const subj = this.subject();
    const masterOrder: string[] = (subj?.chapters || []).map((ch: any) => ch.id);
    const targetIdx = masterOrder.indexOf(chapter.id);

    this.displayedChapters.update((prev) => {
      // Skip if already present
      if (prev.some((ch: any) => ch.id === chapter.id)) return prev;
      const next = [...prev, chapter];
      // Sort by position in the master chapter list
      next.sort((a: any, b: any) => masterOrder.indexOf(a.id) - masterOrder.indexOf(b.id));
      return next;
    });
  }

  onContentScroll(e: Event) {
    // Debounce scroll events to avoid rapid re-triggers during DOM updates
    if (this.scrollDebounce) clearTimeout(this.scrollDebounce);
    this.scrollDebounce = setTimeout(() => {
      const el = e.target as HTMLElement;
      if (!el) return;
      const threshold = 200;
      if (el.scrollHeight - el.scrollTop - el.clientHeight < threshold) {
        this.loadNextChapter();
      }
    }, 100);
  }

  private loadNextChapter() {
    const subj = this.subject();
    if (!subj || !subj.chapters) return;
    if (this.nextChapterIndex >= subj.chapters.length) return; // all loaded
    const next = subj.chapters[this.nextChapterIndex];
    if (!next) return;
    this.nextChapterIndex += 1;
    this.loadChapterIntoViewer(next.id);
  }

  /** Wait for the DOM element to appear, then highlight and scroll */
  private scrollToNodeWhenReady(nodeId: string, attempts = 20) {
    const target =
      document.getElementById('chapter-' + nodeId) ||
      document.getElementById('topic-' + nodeId) ||
      document.getElementById('content-' + nodeId);
    if (target) {
      this.highlightContent(nodeId);
      return;
    }
    if (attempts > 0) {
      setTimeout(() => this.scrollToNodeWhenReady(nodeId, attempts - 1), 50);
    }
  }

  /** Highlight content element for a node id and scroll into view */
  private highlightContent(nodeId: string) {
    if (!nodeId) return;
    // remove previous highlights
    const prev = document.querySelectorAll('.highlighted');
    prev.forEach((el) => el.classList.remove('highlighted'));
    const target = document.getElementById('content-' + nodeId) || document.getElementById('topic-' + nodeId) || document.getElementById('chapter-' + nodeId);
    if (target) {
      target.classList.add('highlighted');
      const isChapter = target.id.startsWith('chapter-');
      target.scrollIntoView({ behavior: 'smooth', block: isChapter ? 'start' : 'center' });
    }
    // Also scroll the sidebar tree so the active node is visible
    this.scrollSidebarToActive();
  }

  /** Scroll the sidebar tree so the currently active/selected node is visible */
  private scrollSidebarToActive() {
    setTimeout(() => {
      const sidebar = document.querySelector('.sidebar-tree');
      if (!sidebar) return;
      const active = sidebar.querySelector('.ch-active, .tp-active, .st-active');
      if (active) {
        active.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 150);
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

    // Chapter-level click: ensure it's loaded in the viewer, then scroll to it
    const isChapter = this.treeData().some((ch) => ch.id === node.id);
    if (isChapter) {
      const alreadyDisplayed = this.displayedChapters().some((ch: any) => ch.id === node.id);
      if (alreadyDisplayed) {
        this.highlightContent(node.id);
      } else {
        // load this chapter into the viewer then scroll
        this.loadChapterIntoViewer(node.id, true).then(() => {
          this.scrollToNodeWhenReady(node.id);
        });
      }
      return;
    }

    // Topic-level click: find parent chapter, ensure loaded, scroll to topic
    const parentChapterId = this.findParentChapterId(node.id);
    if (parentChapterId) {
      const alreadyDisplayed = this.displayedChapters().some((ch: any) => ch.id === parentChapterId);
      if (alreadyDisplayed) {
        this.highlightContent(node.id);
        return;
      } else {
        this.loadChapterIntoViewer(parentChapterId, true).then(() => {
          this.scrollToNodeWhenReady(node.id);
        });
        return;
      }
    }

    // If node already has content, show it immediately
    if (node.content) {
      this.highlightContent(node.id);
      return;
    }

    // Try to find content in the subtopic index (cached)
    const indexed = this.subtopicIndex.get(node.id);
    if (indexed && indexed.data) {
      const txt = this.getSubtopicText(indexed.data);
      // update node content in the tree and show
      this.patchNodeContent(node.id, txt);
      this.selectedNode.set({ ...node, content: txt });
      this.highlightContent(node.id);
      return;
    }

    // Try dedicated subtopic endpoint first (some deployments may expose this).
    this.loading.set(true);
    this.subjectService.getSubtopicContent(node.id).subscribe({
      next: (sub) => {
        // store and show
        // determine chapter id for indexing if possible
        const chapterId = this.findParentChapterId(node.id) || (sub.chapter_id as string) || '';
        this.subtopicIndex.set(node.id, { chapterId, data: sub });
        const txt = this.getSubtopicText(sub);
        this.patchNodeContent(node.id, txt);
        this.selectedNode.set({ ...node, content: txt });
        this.highlightContent(node.id);
        this.chapterCache.set(chapterId, this.chapterCache.get(chapterId) || {});
        this.persistCachesToSession();
        this.loading.set(false);
      },
      error: (err) => {
        // if subtopic endpoint not available (404) or missing, fallback to chapter fetch
        if (err?.status === 404 || err?.statusCode === 404) {
          this.loading.set(false);
          const chapterIdFallback = this.findParentChapterId(node.id);
          if (!chapterIdFallback) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Unable to locate chapter for item' });
            return;
          }
          this.fetchChapterAndShow(node, chapterIdFallback);
        } else {
          this.loading.set(false);
          // other errors -> show message and stop
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch content' });
        }
      },
    });

    // We've initiated a subtopic-specific fetch; wait for its result (or fallback handler).
    return;

    
  }

  private findParentChapterId(nodeId: string): string | null {
    const roots = this.treeData();
    for (const ch of roots) {
      if (ch.id === nodeId) return ch.id;
      if (this.nodeExistsInChildren(ch.children || [], nodeId)) return ch.id;
    }
    return null;
  }

  private nodeExistsInChildren(children: AcademicNode[] | undefined, nodeId: string): boolean {
    if (!children) return false;
    for (const c of children) {
      if (c.id === nodeId) return true;
      if (c.children && c.children.length && this.nodeExistsInChildren(c.children, nodeId)) return true;
    }
    return false;
  }

  private findSubtopicInChapter(chapterPayload: any, subtopicId: string): any | null {
    if (!chapterPayload?.topics) return null;
    for (const t of chapterPayload.topics) {
      if (t.id === subtopicId) return t;
      const st = (t.subtopics || []).find((s: any) => s.id === subtopicId);
      if (st) return st;
    }
    return null;
  }

  private patchNodeContent(nodeId: string, content: any) {
    const patched = this.treeData().map((ch) => {
      const chCopy = { ...ch } as AcademicNode;
      chCopy.children = this.patchChildrenContent(ch.children || [], nodeId, content);
      return chCopy;
    });
    this.treeData.set(patched);
  }

  private patchChildrenContent(children: AcademicNode[], nodeId: string, content: any): AcademicNode[] {
    return children.map((c) => {
      const copy = { ...c } as AcademicNode;
      if (copy.id === nodeId) {
        copy.content = content;
      }
      if (copy.children && copy.children.length) {
        copy.children = this.patchChildrenContent(copy.children, nodeId, content);
      }
      return copy;
    });
  }

  /** Return best text content for a subtopic-like payload */
  public getSubtopicText(payload: any): string | undefined {
    if (!payload) return undefined;
    if (typeof payload === 'string') return payload;
    // Prefer the full original content when available, otherwise fall back to difficulty variants
    return (
      payload.content_original || payload.content_easy || payload.content_medium || payload.content_hard || undefined
    );
  }

  /** Load caches from sessionStorage if present */
  private loadCacheFromSession() {
    try {
      const rawCh = sessionStorage.getItem('chapterCache');
      if (rawCh) {
        const obj = JSON.parse(rawCh);
        Object.keys(obj).forEach((k) => this.chapterCache.set(k, obj[k]));
      }

      const rawSub = sessionStorage.getItem('subtopicIndex');
      if (rawSub) {
        const sobj = JSON.parse(rawSub);
        Object.keys(sobj).forEach((k) => this.subtopicIndex.set(k, sobj[k]));
      }
    } catch (e) {
      console.warn('Failed to load caches from sessionStorage', e);
    }
  }

  /** Persist caches to sessionStorage */
  private persistCachesToSession() {
    try {
      const chObj: Record<string, any> = {};
      this.chapterCache.forEach((v, k) => (chObj[k] = v));
      sessionStorage.setItem('chapterCache', JSON.stringify(chObj));

      const siObj: Record<string, any> = {};
      this.subtopicIndex.forEach((v, k) => (siObj[k] = v));
      sessionStorage.setItem('subtopicIndex', JSON.stringify(siObj));
    } catch (e) {
      console.warn('Failed to persist caches to sessionStorage', e);
    }
  }

  /** Fetch a chapter payload, index its subtopics, and show the requested node's content */
  private fetchChapterAndShow(node: AcademicNode, chapterId: string) {
    if (!chapterId) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Unable to locate chapter for item' });
      return;
    }

    // If chapter is cached, extract subtopic
    if (this.chapterCache.has(chapterId)) {
      const ch = this.chapterCache.get(chapterId);
      const found = this.findSubtopicInChapter(ch, node.id);
      if (found) {
        this.subtopicIndex.set(node.id, { chapterId, data: found });
        const txt = this.getSubtopicText(found);
        this.patchNodeContent(node.id, txt);
        this.selectedNode.set({ ...node, content: txt });
        return;
      }
    }

    this.loading.set(true);
    this.subjectService.getChapterContent(chapterId).subscribe({
      next: (data) => {
        this.chapterCache.set(chapterId, data);
        // index all subtopics for quick lookup
        (data.topics || []).forEach((t: any) => {
          (t.subtopics || []).forEach((st: any) => {
            this.subtopicIndex.set(st.id, { chapterId, data: st });
          });
        });
        this.persistCachesToSession();

        const found = this.subtopicIndex.get(node.id);
        if (found) {
          const txt = this.getSubtopicText(found.data);
          this.patchNodeContent(node.id, txt);
          this.selectedNode.set({ ...node, content: txt });
          this.highlightContent(node.id);
        } else {
          this.messageService.add({ severity: 'warn', summary: 'Not found', detail: 'Content not available' });
        }
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load content' });
      },
    });
  }

  /**
   * Handle expand/collapse events from the tree. When a chapter is expanded
   * we lazy-load its full content (topics/subtopics/assets) once and cache it.
   */
  async onNodeToggled(event: { node: AcademicNode; expanded: boolean }) {
    const chapter = event.node;
    if (!event.expanded) return; // only load when expanding

    // if already cached, nothing to do
    if (this.chapterCache.has(chapter.id)) return;

    this.loading.set(true);
    this.subjectService.getChapterContent(chapter.id).subscribe({
      next: (data) => {
        // store raw chapter payload in cache
        this.chapterCache.set(chapter.id, data);
        // index all subtopics for quick lookup and persist
        (data.topics || []).forEach((t: any) => {
          (t.subtopics || []).forEach((st: any) => {
            this.subtopicIndex.set(st.id, { chapterId: chapter.id, data: st });
          });
        });
        this.persistCachesToSession();

        // find chapter node in current tree and replace children with loaded topics
        const newTree = this.treeData().map((ch) => {
          if (ch.id === chapter.id) {
            const topics = (data.topics || []).map((t: any) => ({
              id: t.id,
              label: t.title,
              content: t.subtopics?.length ? undefined : this.getSubtopicText(t),
              children: t.subtopics?.map((st: any) => ({ id: st.id, label: st.title, content: this.getSubtopicText(st) })) || [],
            }));
            return { ...ch, children: topics } as AcademicNode;
          }
          return ch;
        });
        this.treeData.set(newTree);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load chapter' });
        console.error('Failed to fetch chapter:', err);
      },
    });
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

  trackById(_index: number, item: any): string {
    return item.id;
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
      .ingestPdf(subjectId, file, environment.orgId, environment.geminiApiKey)
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
