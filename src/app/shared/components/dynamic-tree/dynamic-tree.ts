import { Component, effect, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { AcademicNode } from './academic-node.interface';

export interface TreeItem {
  id: string;
  label: string;
  content?: string;
  editing: boolean;
  originalLabel: string;
  expanded: boolean;
  children: TreeItem[];
  source: AcademicNode;
}

@Component({
  selector: 'app-dynamic-tree',
  imports: [CommonModule, FormsModule, ConfirmDialog],
  templateUrl: './dynamic-tree.html',
  styleUrl: './dynamic-tree.css',
  providers: [ConfirmationService],
})
export class DynamicTree {
  private confirmationService = inject(ConfirmationService);

  nodes = input.required<AcademicNode[]>();
  initialExpandedLevel = input<number>(0);

  nodeSelected = output<AcademicNode>();
  nodeAdded = output<AcademicNode>();
  nodeUpdated = output<AcademicNode>();
  nodeDeleted = output<string>();

  treeItems = signal<TreeItem[]>([]);
  selectedId = signal<string | null>(null);

  constructor() {
    effect(() => {
      const src = this.nodes();
      const level = this.initialExpandedLevel();
      this.treeItems.set(this.toTreeItems(src, 0, level));
    });
  }

  private toTreeItems(nodes: AcademicNode[], depth: number, expandLevel: number): TreeItem[] {
    return nodes.map((n) => ({
      id: n.id,
      label: n.label,
      content: n.content,
      editing: false,
      originalLabel: n.label,
      expanded: depth < expandLevel,
      children: n.children?.length ? this.toTreeItems(n.children, depth + 1, expandLevel) : [],
      source: n,
    }));
  }

  /* ───── Click ───── */

  onItemClick(item: TreeItem) {
    if (item.children.length) {
      item.expanded = !item.expanded;
    } else {
      this.selectedId.set(item.id);
      this.nodeSelected.emit(item.source);
    }
  }

  /* ───── Add ───── */

  startAdd(item: TreeItem, event: Event) {
    event.stopPropagation();
    item.expanded = true;
    this.nodeAdded.emit(item.source);
  }

  /* ───── Inline edit ───── */

  startEdit(item: TreeItem, event: Event) {
    event.stopPropagation();
    item.editing = true;
    item.originalLabel = item.label;
  }

  saveEdit(item: TreeItem, event: Event) {
    event.stopPropagation();
    item.editing = false;
    if (item.label !== item.originalLabel) {
      item.source = { ...item.source, label: item.label };
      this.nodeUpdated.emit(item.source);
    }
  }

  cancelEdit(item: TreeItem, event: Event) {
    event.stopPropagation();
    item.editing = false;
    item.label = item.originalLabel;
  }

  /* ───── Delete ───── */

  confirmDelete(item: TreeItem, event: Event) {
    event.stopPropagation();
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Delete "${item.label}" and all its children?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      rejectButtonStyleClass: 'p-button-text p-button-sm',
      accept: () => {
        this.nodeDeleted.emit(item.id);
      },
    });
  }
}
