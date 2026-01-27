import { Component, computed, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucidePlus,
  lucideRefreshCw,
  lucideTrash2,
  lucideKey,
  lucideActivity,
  lucideDollarSign,
  lucideZap,
  lucideCheckCircle2,
  lucideAlertCircle,
  lucideShieldCheck,
  lucideSearch,
  lucideEye,
  lucideEyeOff,
} from '@ng-icons/lucide';
import { CardModule } from 'primeng/card';
import { LineChart } from "../../../shared/components/charts/line-chart/line-chart";
import { APIKeyData, INITIAL_KEYS } from '../../../shared/constants/mock-data.constant';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-ai-usage',
  imports: [NgIcon, CardModule, LineChart, CardModule, ButtonModule],
  templateUrl: './ai-usage.html',
  styleUrl: './ai-usage.css',
  viewProviders: [
    provideIcons({
      lucidePlus,
      lucideRefreshCw,
      lucideTrash2,
      lucideKey,
      lucideActivity,
      lucideDollarSign,
      lucideZap,
      lucideCheckCircle2,
      lucideAlertCircle,
      lucideShieldCheck,
      lucideSearch,
      lucideEye,
      lucideEyeOff,
    }),
  ],
})
export class AiUsage {
 // --- State (Signals) ---
  keys = signal<APIKeyData[]>(INITIAL_KEYS);
  showAddModal = signal(false);
  searchTerm = signal('');
  visibleKeys = signal<Set<string>>(new Set());
  models=['Gemini', 'OpenAI', 'Anthropic']

  // Form State
  newKeyName = signal('');
  newKeyVal = signal('');
  newKeyProvider = signal('Gemini');

  // --- Derived State (Computed) ---
  stats = computed(() => {
    const currentKeys = this.keys();
    return {
      totalTokens: currentKeys.reduce((acc, k) => acc + k.usageTokens, 0),
      totalCost: currentKeys.reduce((acc, k) => acc + k.costEstimate, 0),
      activeCount: currentKeys.filter(k => k.status === 'Active').length
    };
  });

  filteredKeys = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.keys().filter(k =>
      k.name.toLowerCase().includes(term) ||
      k.provider.toLowerCase().includes(term)
    );
  });

  // --- Methods ---
  toggleKeyVisibility(id: string) {
    this.visibleKeys.update(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  handleAddKey() {
    if (!this.newKeyName() || !this.newKeyVal()) return;

    const key: APIKeyData = {
      id: `k${Date.now()}`,
      name: this.newKeyName(),
      key: this.newKeyVal(),
      provider: this.newKeyProvider() as any,
      usageTokens: 0,
      limitTokens: 50000,
      costEstimate: 0,
      status: 'Active',
      lastChecked: 'Just now'
    };

    this.keys.update(prev => [key, ...prev]);

    // Reset Form
    this.newKeyName.set('');
    this.newKeyVal.set('');
    this.showAddModal.set(false);
  }

  deleteKey(id: string) {
    this.keys.update(prev => prev.filter(k => k.id !== id));
  }

  refreshKey(id: string) {
    this.keys.update(prev =>
      prev.map(k => k.id === id ? { ...k, lastChecked: 'Just now' } : k)
    );
  }

  updateSearch(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.searchTerm.set(val);
  }

  calculatePercentage = (k: APIKeyData) => Math.min(100, Math.round((k.usageTokens / k.limitTokens) * 100));

}
