import { Component } from '@angular/core';
import {
  ArrowUpRight,
  Award,
  BadgeCheck,
  Camera,
  Compass,
  Crown,
  ExternalLink,
  Flame,
  GraduationCap,
  Layers,
  LucideAngularModule,
  Mail,
  MapPin,
  Medal,
  Phone,
  Save,
  Settings,
  ShieldCheck,
  Sparkles,
  SquarePen,
  Star,
  Target,
  Zap,
  Lock,
  ChevronRight
} from 'lucide-angular';
import { CURRENT_USER } from '../../../shared/constants/mock-data.constant';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  imports: [LucideAngularModule, CardModule, FormsModule],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  user = CURRENT_USER;
  achievements = [
    {
      name: 'Grandmaster',
      icon: Crown,
      color: 'text-amber-500',
      bg: 'bg-amber-50',
      desc: 'Top 0.1%',
    },
    {
      name: 'Atomic Habit',
      icon: Flame,
      color: 'text-rose-500',
      bg: 'bg-rose-50',
      desc: '30 Day Streak',
    },
    {
      name: 'Polymath',
      icon: Layers,
      color: 'text-indigo-500',
      bg: 'bg-indigo-50',
      desc: '5 Mastered',
    },
    {
      name: 'Early Riser',
      icon: Zap,
      color: 'text-teal-500',
      bg: 'bg-teal-50',
      desc: 'Morning Star',
    },
  ];

  skillBadges = ['Calculus', 'Quantum Physics', 'Literature', 'Data Sci', 'Organic Chem'];

  isEditing = false;

  icons = {
    Camera,
    BadgeCheck,
    MapPin,
    GraduationCap,
    ShieldCheck,
    Save,
    SquarePen,
    Settings,
    Compass,
    Mail,
    Phone,
    Medal,
    Star,
    ArrowUpRight,
    Target,
    ExternalLink,
    Lock,
    ChevronRight
  };

  stats = [
    { label: 'Growth', value: this.user.streakDays, icon: Flame, color: 'text-orange-500' },
    { label: 'Intellect', value: '1.4k', icon: Award, color: 'text-indigo-600' },
    {
      label: 'Milestones',
      value: this.user.goalsCompleted,
      icon: Target,
      color: 'text-emerald-600',
    },
    { label: 'Standing', value: `#${this.user.rank}`, icon: Sparkles, color: 'text-purple-600' },
  ];

  examResults = [
    { title: 'Calculus Quiz', score: '98%', date: 'Yesterday', color: 'bg-emerald-500' },
    { title: 'Physics Mock', score: '85%', date: '3 days ago', color: 'bg-indigo-500' },
    { title: 'Literature Essay', score: '92%', date: '1 week ago', color: 'bg-purple-500' },
  ];

  goals = [
    { label: 'Calculus', progress: 75, color: 'bg-indigo-500', glow: 'shadow-indigo-500/50' },
    { label: 'Quantum', progress: 42, color: 'bg-emerald-500', glow: 'shadow-emerald-500/50' },
    { label: 'History', progress: 88, color: 'bg-amber-500', glow: 'shadow-amber-500/50' },
  ];


  onNavigate(path:string){}
}
