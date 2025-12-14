import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';
import {
  BarChart3,
  CheckCircle2,
  Globe,
  Grid2x2,
  LayoutGrid,
  Mail,
  PieChart,
  Users,
  Zap,
} from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUniwind } from 'uniwind';

export default function LoginScreen() {
  const navigation = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { theme: colorScheme } = useUniwind();

  return (
    <SafeAreaView>
      <View className="flex min-h-screen animate-fade-in flex-row bg-background">
        <View className="relative z-10 flex w-full flex-col justify-center p-8 md:p-16 lg:w-1/2">
          <View className="absolute left-8 top-8 flex flex-row items-center gap-2 md:left-16">
            <View className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <LayoutGrid height={20} width={20} color={'#FFFFFF'} />
            </View>
            <Text className="text-xl font-bold">StudyMate</Text>
          </View>

          <View className="mx-auto mt-12 w-full max-w-md lg:mt-0">
            <Text className="mb-2 text-3xl font-bold">Welcome back</Text>
            <Text className="mb-8 text-slate-500 dark:text-slate-400">
              Please enter your details
            </Text>

            <View className="gap-4">
              <View>
                <Label className="mb-1.5 block text-sm font-medium">Email address</Label>
                <Input
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e: any) => setEmail(e.target.value)}
                />
              </View>

              <View>
                <Label className="mb-1.5 block text-sm font-medium">Password</Label>
                <Input
                  placeholder="••••••••"
                  value={password}
                  onChange={(e: any) => setPassword(e.target.value)}
                />
              </View>

              <View className="flex flex-row items-center justify-between">
                <View className="flex flex-row items-center gap-2">
                  <Checkbox checked={rememberMe} onCheckedChange={(e: any) => setRememberMe(e)} />
                  <Text className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400">
                    Remember for 30 days
                  </Text>
                </View>

                <Button
                  variant="link"
                  className="text-sm font-medium text-indigo-700 hover:text-indigo-800"
                  onPress={() => navigation.navigate('/forgot-password')}>
                  <Text>Forgot password</Text>
                </Button>
              </View>

              <View className="gap-4 pt-2">
                <Button className="h-11" onPress={() => navigation.navigate('/home')}>
                  <Text>Sign in</Text>
                </Button>

                <Button
                  variant="outline"
                  className="flex h-11 w-full items-center justify-center gap-3">
                  <Mail color={colorScheme === 'dark' ? '#FFFFFF' : '#000000'} />
                  <Text>Sign in with Google</Text>
                </Button>
              </View>
            </View>
            <View className="mt-8 flex flex-row items-center justify-center gap-1">
              <Text className="text-center align-middle text-sm text-slate-600 dark:text-slate-400">
                Don't have an account?
              </Text>
              <Button
                className="p-0 font-semibold"
                variant={'link'}
                onPress={() => navigation.navigate('/signup')}>
                <Text>Sign up</Text>
              </Button>
            </View>
          </View>
        </View>

        <View className="relative hidden w-1/2 items-center justify-center overflow-hidden bg-[#7F56D9] lg:flex lg:flex-row">
          {/* Dynamic Background */}
          <View className="absolute inset-0 bg-gradient-to-br from-[#7F56D9] via-[#6941C6] to-[#53389E]"></View>
          <View
            className="absolute left-0 top-0 h-full w-full opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}></View>

          {/* Abstract Glows */}
          <View
            className="absolute left-20 top-20 h-72 w-72 animate-pulse rounded-full bg-purple-500 opacity-30 mix-blend-multiply blur-3xl filter"
            style={{ animationDuration: '8s' }}></View>
          <View
            className="absolute bottom-20 right-20 h-72 w-72 animate-pulse rounded-full bg-indigo-500 opacity-30 mix-blend-multiply blur-3xl filter"
            style={{ animationDuration: '10s' }}></View>

          {/* Central Composition */}
          <View className="relative z-10 flex aspect-square w-full max-w-lg flex-row items-center justify-center">
            {/* Main Interface Container (Glassmorphism Dashboard) */}
            <View className="group relative flex h-80 w-96 transform flex-col overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-md transition-transform duration-500 hover:scale-105">
              {/* Window Header */}
              <View className="flex h-8 flex-row items-center gap-2 border-b border-white/10 bg-white/10 px-4">
                <View className="h-3 w-3 rounded-full bg-red-400/80"></View>
                <View className="h-3 w-3 rounded-full bg-yellow-400/80"></View>
                <View className="h-3 w-3 rounded-full bg-green-400/80"></View>
              </View>

              {/* Window Body - Abstract Dashboard Layout */}
              <View className="relative flex-1 p-6">
                {/* Sidebar */}
                <View className="absolute bottom-6 left-6 top-6 flex w-16 flex-col gap-3 rounded-xl border border-white/5 bg-white/5 p-2">
                  <View className="aspect-square w-full rounded-lg bg-white/20"></View>
                  <View className="aspect-square w-full rounded-lg bg-white/10"></View>
                  <View className="aspect-square w-full rounded-lg bg-white/10"></View>
                  <View className="mt-auto aspect-square w-full rounded-full bg-white/10 opacity-50"></View>
                </View>

                {/* Main Content Area */}
                <View className="absolute bottom-6 left-28 right-6 top-6 flex flex-col gap-4">
                  {/* Header Line */}
                  <View className="flex h-14 flex-row items-center gap-4 rounded-xl border border-white/5 bg-white/10 px-4">
                    <View className="flex h-8 w-8 flex-row items-center justify-center rounded-full bg-indigo-400/50">
                      <Zap className="h-4 w-4" color={'#fff'} />
                    </View>
                    <View className="h-2 w-24 rounded-full bg-white/20"></View>
                  </View>
                  {/* Grid */}
                  <View className="grid flex-1 grid-cols-2 content-normal gap-4">
                    {/* Chart Card */}
                    <View className="relative flex flex-col justify-end overflow-hidden rounded-xl border border-white/5 bg-white/5">
                      <View className="absolute left-3 right-3 top-3 flex flex-row items-center justify-between">
                        <View className="h-1 w-8 rounded-full bg-white/20"></View>
                        <BarChart3 className="h-4 w-4" color={'#FFFFFF66'} />
                      </View>
                      <View className="mx-3 mb-3 flex h-1/2 flex-row items-end justify-center gap-1">
                        <View className="h-3/4 w-1/6 rounded-sm bg-white/20"></View>
                        <View className="h-1/2 w-1/6 rounded-sm bg-white/10"></View>
                        <View className="h-full w-1/6 rounded-sm bg-white/30"></View>
                        <View className="h-2/3 w-1/6 rounded-sm bg-white/20"></View>
                      </View>
                    </View>
                    {/* Stats Card */}
                    <View className="relative flex flex-col items-center justify-center rounded-xl border border-white/5 bg-white/5">
                      <PieChart className="mb-2 h-10 w-10" color={'#FFFFFF33'} />
                      <View className="h-1 w-10 rounded-full bg-white/20"></View>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* Floating Elements popping out */}

            {/* Top Right - Success Notification */}
            <View
              className="absolute -right-2 -top-4 animate-pulse rounded-2xl bg-white p-4 shadow-xl"
              style={{ animationDuration: '4s' }}>
              <View className="flex flex-row items-center gap-3">
                <View className="flex h-10 w-10 flex-row items-center justify-center rounded-full bg-green-100">
                  <CheckCircle2 className="h-6 w-6" color={'#16a34a'} />
                </View>
                <View>
                  <View className="mb-1.5 h-2 w-20 rounded-full bg-slate-200"></View>
                  <View className="h-2 w-12 rounded-full bg-slate-100"></View>
                </View>
              </View>
            </View>

            {/* Bottom Left - Community Card */}
            <View className="absolute -bottom-6 -left-6 rounded-2xl border border-white/50 bg-white/90 p-4 shadow-xl backdrop-blur transition-transform duration-300 hover:scale-105">
              <View className="flex flex-row items-center gap-3">
                <View className="flex h-10 w-10 flex-row items-center justify-center rounded-full bg-indigo-100">
                  <Users className="h-5 w-5" color={'#4f46e5'} />
                </View>
                <View>
                  <Text className="text-sm font-bold text-slate-800">10k+ Students</Text>
                  <Text className="text-[10px] font-medium text-slate-500">Joined this week</Text>
                </View>
              </View>
            </View>

            {/* Decorative Icons */}
            <View
              className="absolute -right-16 top-1/2 animate-spin-slow"
              style={{ animationDuration: '20s' }}>
              <Globe className="h-32 w-32" color={'#FFFFFF1A'} />
            </View>
            <View className="absolute -bottom-10 right-10 rotate-12">
              <Grid2x2 height={160} width={160} color={'#FFFFFF0D'} />
            </View>
          </View>
          <View></View>

          <View className="absolute bottom-10 z-10 text-center">
            <Text className="mb-2 text-center text-2xl font-bold text-white">Connect & Learn</Text>
            <Text className="text-indigo-200">Join the best community for students.</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
