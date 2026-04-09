import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, ArrowLeft, Target, Plus, Trash2, Calendar, Edit3, X, Check, Sparkles, Archive } from 'lucide-angular';
import { CURRENT_USER } from '../../../shared/constants/mock-data.constant';
import { Router } from '@angular/router';
import { GoalService } from '../../../services/goal/goal.service';
import { IGoal, ICreateGoal, IUpdateGoal } from '../../../core/interface/goal.interface';

@Component({
  selector: 'app-goals',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './goals.html',
  styleUrl: './goals.css',
})
export class Goals implements OnInit {
  router = inject(Router);
  goalService = inject(GoalService);

  // State managed via Signals
  goals = signal<IGoal[]>([]);
  isLoading = signal(true);
  isAdding = signal(false);
  editingId = signal<number | null>(null);

  // Form state
  formData = signal<Partial<IGoal>>({
    target_type: '',
    target_id: 'all',
    target_score: 0,
    current_score: 0,
    deadline: new Date().toISOString().split('T')[0],
    is_active: true,
    is_achieved: false
  });

  // Icons for template
  icons = { ArrowLeft, Target, Plus, Trash2, Calendar, Edit3, X, Check, Sparkles, Archive };

  ngOnInit() {
    this.fetchGoals();
  }

  fetchGoals() {
    this.isLoading.set(true);
    this.goalService.getGoal(CURRENT_USER.id).subscribe({
      next: (res) => {
        this.goals.set(res);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to fetch goals:', err);
        this.isLoading.set(false);
      }
    });
  }

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

    const payload: ICreateGoal = {
      target_type: data.target_type!,
      target_id: data.target_id || 'all',
      target_score: Number(data.target_score),
      deadline: data.deadline || new Date().toISOString().split('T')[0]
    };

    this.goalService.createGoal(payload).subscribe({
       next: (res) => {
         this.goals.update(prev => [...prev, { ...res, user_id: CURRENT_USER.id, current_score: 0, is_active: true, is_achieved: false }]);
         this.resetForm();
       },
       error: (err) => console.error('Create error:', err)
    });
  }

  startEdit(goal: IGoal) {
    this.editingId.set(goal.id);
    this.formData.set({ ...goal });
  }

  saveEdit() {
    const data = this.formData();
    const id = this.editingId();
    if (!data.target_score || id === null) return;

    const payload: IUpdateGoal = {
      is_active: data.is_active ?? true,
      target_score: Number(data.target_score),
      deadline: data.deadline || new Date().toISOString().split('T')[0]
    };

    this.goalService.updateGoal(String(id), payload).subscribe({
       next: (res) => {
         this.goals.update(prev => prev.map(g => g.id === id ? { ...g, ...res } as IGoal : g));
         this.resetForm();
       },
       error: (err) => console.error('Update error:', err)
    });
  }

  handleArchive(id: number) {
     const goal = this.goals().find(g => g.id === id);
     if (!goal) return;

     const payload: IUpdateGoal = {
        is_active: false,
        target_score: goal.target_score,
        deadline: goal.deadline
     };

     this.goalService.updateGoal(String(id), payload).subscribe({
        next: (res) => {
           this.goals.update(prev => prev.map(g => g.id === id ? { ...g, ...res, is_active: false } as IGoal : g));
        },
        error: (err) => console.error('Archive error:', err)
     });
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
  getTheme(goal: IGoal) {
    const daysLeft = this.getDaysLeft(goal.deadline);
    const progress = Math.min(100, Math.round((goal.current_score / goal.target_score) * 100));
    const isAchieved = progress >= 100 || goal.is_achieved;
    const isOverdue = daysLeft < 0;
    const isUrgent = daysLeft >= 0 && daysLeft < 3;

    if (!goal.is_active) return { label: 'Archived', bg: 'bg-slate-50', text: 'text-slate-500', border: 'border-slate-200', iconBg: 'bg-slate-400', bar: 'bg-slate-400', glow: 'shadow-none' };
    if (isAchieved) return { label: 'Mastered', bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100', iconBg: 'bg-emerald-500', bar: 'bg-emerald-500', glow: 'shadow-emerald-200' };
    if (isOverdue) return { label: 'Overdue', bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-100', iconBg: 'bg-rose-600', bar: 'bg-rose-600', glow: 'shadow-rose-200' };
    if (isUrgent) return { label: 'Warning', bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100', iconBg: 'bg-amber-500', bar: 'bg-amber-500', glow: 'shadow-amber-200' };
    return { label: 'Active', bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-100', iconBg: 'bg-indigo-600', bar: 'bg-indigo-600', glow: 'shadow-indigo-200' };
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
