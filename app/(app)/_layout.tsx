import '@/global.css';

import { Slot, usePathname, useRouter, useSegments } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { ScreenName } from '@/types/types';
import { useState } from 'react';
import {
  Home,
  LayoutDashboard,
  Calendar,
  BarChart2,
  Users,
  User,
  ChevronRight,
  ChevronLeft,
  LogOut,
} from 'lucide-react-native';
import { Button } from '@/components/ui/button';
import { SafeAreaView } from 'react-native-safe-area-context';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function AppLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const router = useRouter();
  const activeScreen = usePathname();

  const onNavigate = (screen: ScreenName) => {
    // Navigation logic here, e.g., using a navigation library
    console.log(`Navigating to ${screen}`);
    if (screen === '/home') {
      router.push(screen);
    } else {
      router.push('/subjects');
    }
  };

  const navItems = [
    { id: ScreenName.HOME, icon: Home, label: 'Home' },
    { id: ScreenName.SUBJECTS, icon: LayoutDashboard, label: 'Subjects' },
    { id: ScreenName.CALENDAR, icon: Calendar, label: 'Schedule' },
    { id: ScreenName.ANALYTICS, icon: BarChart2, label: 'Results' },
    { id: ScreenName.COMMUNITY, icon: Users, label: 'Leaderboard' },
    { id: ScreenName.PROFILE, icon: User, label: 'Profile' },
  ];

  // Mobile nav logic (show Profile instead of Schedule)
  const mobileNavItems = [
    navItems[0], // Home
    navItems[1], // Subjects
    navItems[3], // Results
    navItems[4], // Leaderboard
    navItems[5], // Profile
  ];

  return (
    <SafeAreaView>
      <View className="flex min-h-screen bg-slate-50 dark:bg-slate-900 flex-1">
        {/* Sidebar for Desktop */}
        <View
          className={`hidden flex-col md:flex ${isSidebarCollapsed ? 'w-20' : 'w-48'} fixed z-10 h-full border-r border-slate-200 bg-white transition-all duration-300 ease-in-out`}>
          {/* Toggle Button */}
          <Button
            onPress={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="absolute -right-3 top-10 z-20 rounded-full border border-slate-200 bg-white !p-1 text-slate-400 shadow-sm transition-colors hover:border-indigo-200 hover:text-indigo-600">
            {isSidebarCollapsed ? (
              <ChevronRight className="h-3 w-3" />
            ) : (
              <ChevronLeft className="h-3 w-3" />
            )}
          </Button>

          <View
            className={`flex h-24 flex-row items-center border-b border-slate-100 ${isSidebarCollapsed ? 'justify-center px-0' : 'px-6'}`}>
            <View className="flex flex-row items-center gap-3 overflow-hidden">
              <View className="flex h-8 w-8 flex-shrink-0 flex-row items-center justify-center rounded-lg bg-indigo-600 transition-all duration-300">
                <Text className="text-lg font-bold text-white">S</Text>
              </View>
              <Text
                className={`text-xl font-bold tracking-tight text-slate-900 transition-opacity duration-200 ${isSidebarCollapsed ? 'w-0 opacity-0' : 'opacity-100'}`}>
                StudyMate
              </Text>
            </View>
          </View>

          <View className="flex-1 space-y-1.5 overflow-y-auto overflow-x-hidden p-3">
            {navItems.map((item) => (
              <Button
                variant={'ghost'}
                key={item.id}
                onPress={() => onNavigate(item.id)}
                className={`flex w-full items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'justify-start space-x-3 px-3'} group relative rounded-xl py-2.5 font-medium transition-all duration-200 ${
                  activeScreen.startsWith(item.id)
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                } `}>
                <item.icon
                  className={`flex-shrink-0 ${activeScreen.startsWith(item.id) ? 'text-indigo-600' : 'text-slate-400'}`}
                  size={20}
                />
                <Text
                  className={`whitespace-nowrap text-sm transition-all duration-200 ${isSidebarCollapsed ? 'hidden w-0 opacity-0' : 'opacity-100'} ${activeScreen === item.id ? 'text-indigo-600' : 'text-slate-600 hover:text-slate-900'}`}>
                  {item.label}
                </Text>

                {/* Tooltip for collapsed state */}
                {isSidebarCollapsed && (
                  <View className="pointer-events-none absolute left-full z-50 ml-4 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                    <Text>{item.label}</Text>
                  </View>
                )}
              </Button>
            ))}
          </View>

          <View className="border-t border-slate-100 p-4">
            <Button
              variant={'ghost'}
              onPress={() => onNavigate(ScreenName.LOGIN)}
              className={`flex w-full items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'space-x-3 px-4'} group relative rounded-xl py-3 font-medium text-slate-600 transition-colors hover:bg-red-50 hover:!text-red-700`}>
              <LogOut className="h-5 w-5 flex-shrink-0" />
              <Text
                className={`whitespace-nowrap text-sm transition-all duration-200 ${isSidebarCollapsed ? 'hidden w-0 opacity-0' : 'opacity-100'} text-slate-600 transition-colors hover:!text-red-700`}>
                Sign Out
              </Text>
              {isSidebarCollapsed && (
                <View className="pointer-events-none absolute left-full z-50 ml-4 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                  <Text>Sign Out</Text>
                </View>
              )}
            </Button>
          </View>
        </View>

        {/* Main Content */}
         <ScrollView style={{ flex: 1 }}
          className={`flex-1 ${isSidebarCollapsed ? 'md:ml-20' : 'md:ml-48'} relative pb-24 transition-all duration-300 ease-in-out md:pb-0`}>
          <View className="mx-auto max-w-6xl p-4 md:p-8 flex-1">
            <Slot />
          </View>
        </ScrollView>

        {/* Bottom Nav for Mobile */}
        <View className="safe-area-bottom fixed bottom-0 left-0 right-0 z-50 flex flex-row items-center justify-between border-t border-slate-200 bg-white py-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] md:hidden">
          {mobileNavItems.map((item) => (
            <Button
              variant={'ghost'}
              key={item.id}
              onPress={() => onNavigate(item.id)}
              className={`flex flex-col items-center space-y-1`}>
              <item.icon
                className={`${activeScreen.startsWith(item.id) ? 'text-indigo-600' : 'text-slate-400'}`}
                size={24}
              />
              <Text
                className={`text-[10px] font-medium ${activeScreen.startsWith(item.id) ? 'text-indigo-600' : 'text-slate-400'}`}>
                {item.label}
              </Text>
            </Button>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
