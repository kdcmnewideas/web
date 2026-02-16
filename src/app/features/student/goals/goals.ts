import { Component, EventEmitter, Output, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, ArrowLeft, Target, Plus, Trash2, Calendar, Edit3, X, Check, Sparkles } from 'lucide-angular';
// Assuming these paths exist in your project
import { Goal, GOALS, CURRENT_USER } from '../../../shared/constants/mock-data.constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-goals',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './goals.html',
  styleUrl: './goals.css',
})
export class Goals {
  router = inject(Router);

  // State managed via Signals
  goals = signal<Goal[]>(GOALS);
  isAdding = signal(false);
  editingId = signal<number | null>(null);

  // Form state
  formData = signal<Partial<Goal>>({
    target_type: '',
    target_id: 'all',
    target_score: 0,
    current_score: 0,
    deadline: new Date().toISOString().split('T')[0],
    is_active: true,
    is_achieved: false
  });

  // Icons for template
  icons = { ArrowLeft, Target, Plus, Trash2, Calendar, Edit3, X, Check, Sparkles };

  getDaysLeft(deadline: string): number {
    const diff = new Date(deadline).getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  handleNavigate() {
    this.navigate('profile');
  }

  handleAdd() {
    const data = this.formData();
    if (!data.target_type || !data.target_score) return;

    const now = new Date().toISOString();
    const newGoal: Goal = {
      id: Math.floor(Math.random() * 1000000),
      user_id: CURRENT_USER.id,
      target_type: data.target_type!,
      target_id: data.target_id || 'all',
      target_score: Number(data.target_score),
      current_score: Number(data.current_score || 0),
      deadline: data.deadline || now.split('T')[0],
      is_active: true,
      is_achieved: Number(data.current_score || 0) >= Number(data.target_score),
      created_at: now,
      updated_at: now
    };

    this.goals.update(prev => [...prev, newGoal]);
    this.resetForm();
  }

  startEdit(goal: Goal) {
    this.editingId.set(goal.id);
    this.formData.set({ ...goal });
  }

  saveEdit() {
    const data = this.formData();
    const id = this.editingId();
    if (!data.target_type || !data.target_score || id === null) return;

    this.goals.update(prev => prev.map(g => g.id === id ? {
      ...g,
      ...data,
      updated_at: new Date().toISOString(),
      is_achieved: Number(data.current_score || 0) >= Number(data.target_score)
    } as Goal : g));

    this.resetForm();
  }

  handleDelete(id: number) {
    this.goals.update(prev => prev.filter(g => g.id !== id));
  }

  resetForm() {
    this.isAdding.set(false);
    this.editingId.set(null);
    this.formData.set({
      target_type: '',
      target_id: 'all',
      target_score: 0,
      current_score: 0,
      deadline: new Date().toISOString().split('T')[0],
      is_active: true,
      is_achieved: false
    });
  }

  // Helper for status themes
  getTheme(goal: Goal) {
    const daysLeft = this.getDaysLeft(goal.deadline);
    const progress = Math.min(100, Math.round((goal.current_score / goal.target_score) * 100));
    const isAchieved = progress >= 100 || goal.is_achieved;
    const isOverdue = daysLeft < 0;
    const isUrgent = daysLeft >= 0 && daysLeft < 3;

    if (isAchieved) return { label: 'Mastered', bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100', iconBg: 'bg-emerald-500', bar: 'bg-emerald-500', glow: 'shadow-emerald-200' };
    if (isOverdue) return { label: 'Overdue', bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-100', iconBg: 'bg-rose-600', bar: 'bg-rose-600', glow: 'shadow-rose-200' };
    if (isUrgent) return { label: 'Warning', bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100', iconBg: 'bg-amber-500', bar: 'bg-amber-500', glow: 'shadow-amber-200' };
    return { label: 'Active', bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-100', iconBg: 'bg-indigo-600', bar: 'bg-indigo-600', glow: 'shadow-indigo-200' };
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
