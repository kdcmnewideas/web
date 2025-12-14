import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { CURRENT_USER, GOALS, RECENT_LESSONS, REVISION_TOPICS, SUBJECTS } from '@/mockData';
import { ScreenName } from '@/types/types';
import CircularProgress from '@/utils/circular-progress';
import { Flame, Target, Clock, BookOpen, ArrowRight, Play, MoreHorizontal, RefreshCw, Calendar, Atom, Calculator, Dna, Hourglass } from 'lucide-react-native';
import { Button } from '@/components/ui/button';
import { getSubjectColorStyles } from '@/utils/subject-color';
import SubjectCard from '@/components/subject-card';

const iconMap: Record<string, React.ElementType> = {
  Calculator,
  Atom,
  BookOpen,
  Hourglass,
  Dna
};


const home = () => {

  const onNavigate = (route: ScreenName, params?: any) => {
    console.log(route);
  };
    
  const user = CURRENT_USER;
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  // Helper for solid colors based on the previous class names

  return (
    
             <ScrollView contentContainerStyle={{ flexGrow: 1 }}
>
      <View className="space-y-8 animate-fade-in pb-20">
        
        {/* Header & Welcome */}
        <View className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <View>
             <Text className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">{today}</Text>
             <Text className="text-3xl md:text-4xl font-extrabold tracking-tight">
               Welcome back, {user.name.split(' ')[0]}
             </Text>
          </View>
          
          {/* Streak Pill */}
          <View 
             className="flex items-center gap-3 bg-white pl-5 pr-2 py-2 rounded-full border border-slate-200 shadow-sm hover:shadow-md hover:border-orange-200 transition-all cursor-pointer group"
          >
             <View className="flex flex-col items-end">
                <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Current Streak</Text>
                <Text className="text-lg font-bold text-slate-900 leading-none group-hover:text-orange-600 transition-colors">{user.streakDays} Days</Text>
             </View>
             <View className="w-10 h-10 rounded-full bg-orange-50 group-hover:bg-orange-100 flex items-center justify-center text-orange-500 transition-colors">
                <Flame className="w-5 h-5 fill-current" />
             </View>
          </View>
        </View>
  
        {/* Main Content Grid */}
        <View className="grid grid-cols-1 xl:grid-cols-4 gap-8">
           
           {/* Left Column (Main) */}
           <View className="xl:col-span-3 space-y-10">
              
              {/* Goals Section - Modern Widget Style */}
              <View>
                 <View className="flex items-center justify-between mb-4">
                    <Text className="text-xl font-bold text-slate-900 flex items-center gap-2">
                       <Target className="w-5 h-5 text-indigo-600" /> Weekly Targets
                    </Text>
                 </View>
                 <View className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {GOALS.map((goal, index) => {
                       const percentage = Math.round((goal.current / goal.target) * 100);
                       const color = percentage >= 100 ? 'text-emerald-500' : percentage >= 50 ? 'text-indigo-600' : 'text-orange-500';
                       
                       return (
                         <View 
                           key={goal.id} 
                           
                           className="bg-white rounded-2xl p-4 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:border-indigo-100 transition-all cursor-pointer group flex items-center justify-between"
                         >
                            <View className="flex flex-col justify-center">
                               <View className="flex items-center gap-2 mb-2">
                                  <View className={`p-1.5 rounded-lg ${index === 0 ? 'bg-indigo-50 text-indigo-600' : index === 1 ? 'bg-teal-50 text-teal-600' : 'bg-orange-50 text-orange-600'}`}>
                                     {index === 0 ? <Clock className="w-4 h-4" /> : index === 1 ? <BookOpen className="w-4 h-4" /> : <Target className="w-4 h-4" />}
                                  </View>
                                  <Text className="text-xs font-bold text-slate-500 uppercase tracking-wide">Goal</Text>
                               </View>
                               <Text className="font-bold text-slate-900 leading-tight mb-1">{goal.title}</Text>
                               <Text className="text-xs text-slate-400 font-medium">
                                 <Text className="text-slate-700 font-bold">{goal.current}</Text> / {goal.target} {goal.unit}
                               </Text>
                            </View>

                            <View className="flex-shrink-0">
                               <CircularProgress 
                                  percentage={percentage} 
                                  color={color} 
                                  size={52} 
                                  strokeWidth={4} 
                               />
                            </View>
                         </View>
                       );
                    })}
                 </View>
              </View>
  
              {/* Subjects Grid */}
              <View>
                 <View className="flex items-center justify-between mb-6">
                    <Text className="text-xl font-bold text-slate-900">My Courses</Text>
                    <Button onPress={() => onNavigate(ScreenName.SUBJECTS)} className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group">
                       <Text>View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></Text>
                    </Button>
                 </View>
                 <View className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SUBJECTS.map(subject => <SubjectCard key={subject.id} subject={subject} />

                    )}
                 </View>
              </View>
              
              {/* Recent Activity */}
               <View>
                 <View className="flex items-center justify-between mb-6">
                    <Text className="text-xl font-bold text-slate-900">Jump Back In</Text>
                 </View>
                 <View className="bg-white rounded-3xl border border-slate-100 shadow-sm Viewide-y Viewide-slate-50 overflow-hidden">
                    {RECENT_LESSONS.map((lesson) => (
                       <View key={lesson.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors group cursor-pointer">
                          <View className="flex items-center gap-5">
                             <View className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                <Play className="w-5 h-5 ml-1 fill-current" />
                             </View>
                             <View>
                                <Text className="font-bold text-slate-900 text-lg">{lesson.title}</Text>
                                <View className="flex items-center gap-2 text-sm text-slate-500 font-medium mt-0.5">
                                   <Text>{SUBJECTS.find(s => s.id === lesson.subjectId)?.title}</Text>
                                   <Text className="w-1 h-1 rounded-full bg-slate-300"></Text>
                                   <Text>{lesson.durationMinutes} min left</Text>
                                </View>
                             </View>
                          </View>
                          <View className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                             <Button variant="outline" size="sm" className="rounded-xl border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200">
                                <Text>Resume</Text>
                             </Button>
                          </View>
                       </View>
                    ))}
                 </View>
              </View>
  
           </View>
  
           {/* Right Column (Sidebar) - Fixed Layout */}
           <View className="xl:col-span-1 space-y-6 sticky top-6 self-start h-fit">
              
              {/* Revision Widget */}
              <View className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                 <View className="flex items-center justify-between mb-6">
                    <View className="flex items-center gap-3">
                       <View className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                          <Clock className="w-5 h-5" />
                       </View>
                       <Text className="font-bold text-slate-900">Up Next</Text>
                    </View>
                    <Button className="text-slate-400 hover:text-slate-600">
                       <MoreHorizontal className="w-5 h-5" />
                    </Button>
                 </View>
                 
                 <View className="space-y-3">
                    {REVISION_TOPICS.slice(0, 4).map((topic) => {
                       const subject = SUBJECTS.find(s => s.title === topic.subject);
                       const styles = getSubjectColorStyles(subject?.color || 'bg-slate-500');
                       const Icon = subject ? iconMap[subject.icon] : BookOpen;
                       
                       return (
                        <View 
                          key={topic.id} 
                          className="flex items-start gap-3 p-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all cursor-pointer group"
                          
                        >
                           <View className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${styles.light} ${styles.text}`}>
                              <RefreshCw className="w-5 h-5" />
                           </View>
                           
                           <View className="flex-1 min-w-0">
                              <View className="flex justify-between items-start mb-1.5">
                                 <Text className="font-bold text-slate-900 text-sm leading-snug group-hover:text-primary transition-colors">{topic.title}</Text>
                                 <Text className="text-[10px] font-bold text-slate-400 whitespace-nowrap ml-2 flex-shrink-0 mt-0.5">{topic.date.replace(' days ago', 'd').replace(' week ago', 'w')}</Text>
                              </View>
                              <View className="flex items-center gap-2 text-xs font-medium text-slate-500">
                                 <Text className={`${styles.text} font-bold`}>{topic.subject}</Text>
                                 <Text className="w-1 h-1 rounded-full bg-slate-300"></Text>
                                 <Text>15 min</Text>
                              </View>
                           </View>
                        </View>
                       );
                    })}
                 </View>
                 
                 <View className="mt-6 pt-5 border-t border-slate-50">
                    <Button variant="outline" onPress={() => onNavigate(ScreenName.CALENDAR)} className="rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50">
                       <Text>View Full Calendar</Text>
                    </Button>
                 </View>
              </View>
              
              {/* Pro Tip Card */}
              <View className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden group shadow-lg">
                 <View className="relative z-10">
                    <View className="flex items-center gap-2 mb-4">
                       <Text className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-bold uppercase tracking-wider text-indigo-200">Pro Tip</Text>
                    </View>
                    <Text className="text-lg font-medium leading-relaxed mb-6 text-slate-100">
                       "Reviewing material 24 hours after learning it increases retention by 60%."
                    </Text>
                    <Button onPress={() => onNavigate(ScreenName.REVISION)} className="text-sm font-bold text-white flex items-center gap-2 hover:gap-3 transition-all">
                       <Text>Start Revision <ArrowRight className="w-4 h-4" /></Text>
                    </Button>
                 </View>
                 
                 {/* Decorative background elements */}
                 <View className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-600/30 rounded-full blur-3xl group-hover:bg-indigo-500/40 transition-colors duration-500"></View>
                 <View className="absolute top-10 -left-10 w-24 h-24 bg-teal-500/20 rounded-full blur-2xl"></View>
              </View>
           </View>
  
        </View>
  
        {/* Floating Action Button (Mobile) - Positioned relative to viewport */}
        <View className="md:hidden fixed bottom-24 right-6 z-50">
          <Button 
            onPress={() => onNavigate(ScreenName.CALENDAR)}
            className="w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg shadow-indigo-200 flex items-center justify-center hover:bg-indigo-700 active:scale-95 transition-all"
          >
             <Calendar className="w-6 h-6" />
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

export default home