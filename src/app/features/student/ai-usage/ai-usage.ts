import { Component, computed, signal, inject, OnInit, effect } from '@angular/core';
import { AiKeysService } from '../../../services/ai-keys/ai-keys.service';
import { DialogModule } from 'primeng/dialog';
import {
  Plus,
  RefreshCw,
  Trash2,
  Key,
  Activity,
  DollarSign,
  Zap,
  CircleCheckBig,
  CircleAlert,
  ShieldCheck,
  Search,
  Eye,
  EyeOff,
  LucideAngularModule,
} from 'lucide-angular';
import { CardModule } from 'primeng/card';
import { LineChart } from '../../../shared/components/charts/line-chart/line-chart';
import { APIKeyData } from '../../../shared/constants/mock-data.constant';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-ai-usage',
  imports: [LucideAngularModule, CardModule, LineChart, CardModule, ButtonModule, DialogModule],
  templateUrl: './ai-usage.html',
  styleUrl: './ai-usage.css',
})
export class AiUsage implements OnInit {
  aiKeysService = inject(AiKeysService);

  ngOnInit() {
    this.fetchKeys();
  }

  fetchKeys() {
    this.aiKeysService.getKeys().subscribe({
      next: (res: any) => {
        const keysArr = Array.isArray(res) ? res : res.data || [];

        const mappedKeys = keysArr.map((k: any) => ({
          id: k.id.toString(),
          name: k.label,
          key: '••••••••••••••••••••••',
          provider: k.provider,
          usageTokens: 0,
          limitTokens: 50000,
          costEstimate: k.total_cost || 0,
          status: k.is_active !== false ? 'Active' : 'Expired',
          lastChecked: new Date(k.created_at || Date.now()).toLocaleDateString(),
        }));
        this.keys.set(mappedKeys);

        this.keys().forEach((k) => this.refreshKey(k.id));
      },
      error: (err) => {
        console.error('Failed to fetch keys', err);
        this.keys.set([]);
      },
    });
  }

  // --- State (Signals) ---
  keys = signal<APIKeyData[]>([]);
  showAddModal = signal(false);
  searchTerm = signal('');
  visibleKeys = signal<Set<string>>(new Set());
  models = ['Gemini', 'OpenAI', 'Anthropic'];

  // Form State
  newKeyName = signal('');
  newKeyVal = signal('');
  newKeyProvider = signal('Gemini');

  icons = {
    Plus,
    RefreshCw,
    Trash2,
    Key,
    Activity,
    DollarSign,
    Zap,
    CircleCheckBig,
    CircleAlert,
    ShieldCheck,
    Search,
    Eye,
    EyeOff,
  };

  // --- Derived State (Computed) ---
  stats = computed(() => {
    const currentKeys = this.keys();
    return {
      totalTokens: currentKeys.reduce((acc, k) => acc + k.usageTokens, 0),
      totalCost: currentKeys.reduce((acc, k) => acc + k.costEstimate, 0),
      activeCount: currentKeys.filter((k) => k.status === 'Active').length,
    };
  });

  filteredKeys = computed(() => {
    const currentKeys = this.keys();
    const term = this.searchTerm().toLowerCase();
    return currentKeys.filter(
      (k) => k.name.toLowerCase().includes(term) || k.provider.toLowerCase().includes(term),
    );
  });

  // --- Methods ---
  toggleKeyVisibility(id: string) {
    this.visibleKeys.update((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  updateNewKeyName(event: Event) {
    this.newKeyName.set((event.target as HTMLInputElement).value);
  }

  updateNewKeyVal(event: Event) {
    this.newKeyVal.set((event.target as HTMLInputElement).value);
  }

  handleAddKey() {
    if (!this.newKeyName() || !this.newKeyVal()) return;

    const payload = {
      label: this.newKeyName(),
      api_key: this.newKeyVal(),
      provider: this.newKeyProvider(),
    };
    const keyValue = this.newKeyVal();

    this.aiKeysService.addKey(payload).subscribe({
      next: (newKey: any) => {
        const keyItem: APIKeyData = {
          id: newKey.id ? newKey.id.toString() : `k${Date.now()}`,
          name: newKey.label || payload.label,
          key: keyValue,
          provider: (newKey.provider || payload.provider) as any,
          usageTokens: 0,
          limitTokens: 50000,
          costEstimate: newKey.total_cost || 0,
          status: newKey.is_active !== false ? 'Active' : 'Expired',
          lastChecked: newKey.created_at
            ? new Date(newKey.created_at).toLocaleDateString()
            : 'Just now',
        };
        this.keys.update((prev) => [keyItem, ...prev]);

        // Reset Form
        this.newKeyName.set('');
        this.newKeyVal.set('');
        this.showAddModal.set(false);
      },
      error: (err) => {
        console.error('Error adding key', err);
        // Reset Form On Failure without creating a mocked instance
        this.newKeyName.set('');
        this.newKeyVal.set('');
        this.showAddModal.set(false);
      },
    });
  }

  deleteKey(id: string) {
    this.aiKeysService.deleteKey(id).subscribe({
      next: () => {
        this.keys.update((prev) => prev.filter((k) => k.id !== id));
      },
      error: (err) => {
        console.error('Error deleting key from backend. Did not remove from UI.', err);
      },
    });
  }

  refreshKey(id: string) {
    this.aiKeysService.getKeyAnalytics(id).subscribe({
      next: (res: any) => {
        const stats = Array.isArray(res)
          ? res.reduce(
              (acc, curr) => ({
                total_tokens: acc.total_tokens + (curr.total_tokens || 0),
                cost: acc.cost + (curr.cost || 0),
              }),
              { total_tokens: 0, cost: 0 },
            )
          : { total_tokens: res?.total_tokens || 0, cost: res?.cost || 0 };

        this.keys.update((prev) =>
          prev.map((k) =>
            k.id === id
              ? {
                  ...k,
                  usageTokens: stats.total_tokens || k.usageTokens,
                  costEstimate: stats.cost || k.costEstimate,
                  lastChecked: 'Just now',
                }
              : k,
          ),
        );
      },
      error: (err) => {
        console.error('Failed to refresh analytics from backend for tracking Key ID: ', id, err);
      },
    });
  }

  simulateUsage(id: string) {
    const keyItem = this.keys().find((k) => k.id === id);
    if (!keyItem) return;

    const payload = {
      operation: 'COMPLETION',
      model_used: keyItem.provider,
      tokens_input: 150,
      tokens_output: 50,
      cost: 0.002,
    };

    this.aiKeysService.TrackUsage(payload, id).subscribe({
      next: () => {
        this.refreshKey(id);
      },
      error: (err) => {
        console.error('Error tracking usage to the backend database API', err);
      },
    });
  }

  updateSearch(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.searchTerm.set(val);
  }

  calculatePercentage = (k: APIKeyData) =>
    Math.min(100, Math.round((k.usageTokens / k.limitTokens) * 100));
}
