import { CommonModule } from '@angular/common';
import { Component, HostListener, input, SimpleChanges } from '@angular/core';
import {
  ChevronDown,
  ChevronRight,
  Expand,
  LucideAngularModule,
  Maximize2,
  Minus,
  Plus,
  Shrink,
  X,
} from 'lucide-angular';
import { MIND_MAP_MOCK_DATA } from '../../../../shared/mocks/learn-mind-map-mock.constant';

export interface MindMapNode {
  id: string;
  label: string;
  children?: MindMapNode[];
}

interface PositionedNode extends MindMapNode {
  x: number;
  y: number;
  depth: number;
  parentId?: string;
}

interface Connection {
  id: string;
  from: { x: number; y: number };
  to: { x: number; y: number };
}

@Component({
  selector: 'app-learn-mind-map',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './learn-mind-map.html',
  styleUrl: './learn-mind-map.css',
})
export class LearnMindMap {
  rootNode = input<MindMapNode>();
  isDark = input<boolean>(false);

  icons = { X, ChevronDown, ChevronRight, Maximize2, Plus, Minus, Shrink, Expand };

  // State
  scale: number = 0.85;
  offset = { x: 0, y: 0 };
  isDragging: boolean = false;
  dragStart = { x: 0, y: 0 };
  expandedIds = new Set<string>(['root']);
  isFullScreen: boolean = false;

  // Constants
  readonly nodeWidth = 240;
  readonly nodeHeight = 50;
  readonly horizontalGap = 100;
  readonly verticalGap = 20;

  // Layout Data
  layoutNodes: PositionedNode[] = [];
  layoutConnections: Connection[] = [];

  // Dynamically computed bounds
  bounds = { width: 1000, height: 700 };
  boundingBox = { minX: -500, maxX: 500, minY: -350, maxY: 350 };

  get data(): MindMapNode {
    return this.rootNode() || MIND_MAP_MOCK_DATA;
  }

  ngOnInit() {
    this.calculateLayout();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['rootNode']) {
      this.resetView();
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.isFullScreen) {
      this.isFullScreen = false;
    }
  }

  @HostListener('window:mousemove', ['$event'])
  handleMouseMove(e: MouseEvent) {
    if (!this.isDragging) return;
    this.offset = {
      x: e.clientX - this.dragStart.x,
      y: e.clientY - this.dragStart.y,
    };
  }

  @HostListener('window:mouseup')
  handleMouseUp() {
    this.isDragging = false;
  }

  toggleNode(id: string, event: MouseEvent) {
    event.stopPropagation();
    if (this.expandedIds.has(id)) {
      this.expandedIds.delete(id);
    } else {
      this.expandedIds.add(id);
    }
    this.calculateLayout();
  }

  private getSubtreeHeight(node: MindMapNode): number {
    if (!this.expandedIds.has(node.id) || !node.children || node.children.length === 0) {
      return this.nodeHeight;
    }
    const childrenHeight = node.children.reduce(
      (acc, child) => acc + this.getSubtreeHeight(child),
      0,
    );
    const gaps = (node.children.length - 1) * this.verticalGap;
    return Math.max(this.nodeHeight, childrenHeight + gaps);
  }

  private expandAllNodes(node?: MindMapNode): void {
    const nodeToProcess = node || this.data;
    if (!nodeToProcess) return;

    this.expandedIds.add(nodeToProcess.id);
    if (nodeToProcess.children && nodeToProcess.children.length > 0) {
      nodeToProcess.children.forEach((child) => this.expandAllNodes(child));
    }
  }

  calculateLayout() {
    const nodes: PositionedNode[] = [];
    const connections: Connection[] = [];

    const positionNodes = (node: MindMapNode, x: number, y: number, depth: number) => {
      nodes.push({ ...node, x, y, depth });

      if (this.expandedIds.has(node.id) && node.children && node.children.length > 0) {
        const totalH = this.getSubtreeHeight(node);
        let currentY = y - totalH / 2;

        node.children.forEach((child) => {
          const childH = this.getSubtreeHeight(child);
          const childY = currentY + childH / 2;
          const childX = x + this.nodeWidth + this.horizontalGap;

          connections.push({
            id: `link-${node.id}-${child.id}`,
            from: { x: x + this.nodeWidth / 2, y },
            to: { x: childX - this.nodeWidth / 2, y: childY },
          });

          positionNodes(child, childX, childY, depth + 1);
          currentY += childH + this.verticalGap;
        });
      }
    };

    positionNodes(this.data, 0, 0, 0);
    this.layoutNodes = nodes;
    this.layoutConnections = connections;
    this.updateBounds();
  }

  private updateBounds() {
    if (this.layoutNodes.length === 0) {
      this.bounds = { width: 1000, height: 700 };
      this.boundingBox = { minX: -500, maxX: 500, minY: -350, maxY: 350 };
      return;
    }

    let minX = Infinity,
      maxX = -Infinity,
      minY = Infinity,
      maxY = -Infinity;

    this.layoutNodes.forEach((node) => {
      const left = node.x - this.nodeWidth / 2;
      const right = node.x + this.nodeWidth / 2;
      const top = node.y - this.nodeHeight / 2;
      const bottom = node.y + this.nodeHeight / 2;

      minX = Math.min(minX, left);
      maxX = Math.max(maxX, right);
      minY = Math.min(minY, top);
      maxY = Math.max(maxY, bottom);
    });

    // Add padding around the content
    const padding = 80;
    minX -= padding;
    maxX += padding;
    minY -= padding;
    maxY += padding;

    this.boundingBox = { minX, maxX, minY, maxY };
    this.bounds = {
      width: maxX - minX,
      height: maxY - minY,
    };
  }

  getViewBox(): string {
    const { minX, minY, maxX, maxY } = this.boundingBox;
    const width = maxX - minX;
    const height = maxY - minY;
    return `${minX} ${minY} ${width} ${height}`;
  }

  handleMouseDown(e: MouseEvent) {
    if (e.button !== 0) return;
    this.isDragging = true;
    this.dragStart = { x: e.clientX - this.offset.x, y: e.clientY - this.offset.y };
  }

  handleZoomIn(e: MouseEvent) {
    e.stopPropagation();
    this.scale = Math.min(this.scale + 0.1, 2);
  }

  handleZoomOut(e: MouseEvent) {
    e.stopPropagation();
    this.scale = Math.max(this.scale - 0.1, 0.3);
  }

  resetView(e?: MouseEvent) {
    e?.stopPropagation();
    this.scale = 0.85;
    this.offset = { x: 0, y: 0 };
    this.expandedIds = new Set(['root']);
    this.calculateLayout();
  }

  generatePath(conn: Connection): string {
    const { from, to } = conn;
    const hGap = this.horizontalGap / 2;
    return `M ${from.x} ${from.y} C ${from.x + hGap} ${from.y}, ${to.x - hGap} ${to.y}, ${to.x} ${to.y}`;
  }
}
