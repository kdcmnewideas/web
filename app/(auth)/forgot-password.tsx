import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  CheckCircle2,
  KeyRound,
  LayoutGrid,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
} from 'lucide-react-native';
import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUniwind } from 'uniwind';

const forgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { theme: colorScheme } = useUniwind();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <SafeAreaView>
    <View className="flex min-h-screen animate-fade-in flex-row bg-background">
      {/* Left Side - Form */}
      <View className="relative z-10 flex w-full flex-col justify-center p-8 md:p-16 lg:w-1/2">
          <View className="absolute left-8 top-8 flex flex-row items-center gap-2 md:left-16">
            <View className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <LayoutGrid height={20} width={20} color={'#FFFFFF'} />
            </View>
            <Text className="text-xl font-bold">StudyMate</Text>
          </View>

        <View className="mx-auto mt-12 w-full max-w-md lg:mt-0">
          {!isSubmitted ? (
            <>
              <View className="mb-6 flex h-12 w-12 flex-row items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-900/50">
                <KeyRound className="h-6 w-6" color={'#4f46e5'}/>
              </View>

              <Text className="mb-2 text-3xl font-bold">Forgot password?</Text>
              <Text className="mb-8 text-slate-500 dark:text-slate-400">
                No worries, we'll send you reset instructions.
              </Text>

              <View className="gap-6">
                <View>
                  <Label className="mb-1.5 block text-sm font-medium">Email address</Label>
                  <Input
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={(e) => setEmail(e)}
                    autoFocus
                  />
                </View>

                <Button variant={'default'} className="h-11" disabled={isLoading}>
                  {isLoading ?   <Text><Icon as={Loader2} className="text-primary-foreground mr-2" />Sending link...</Text> : <Text>Reset password</Text>}
                </Button>

                <View className="text-center">
                  <Button variant="link" onPress={() => router.navigate('/login')}>
                    <ArrowLeft className="mr-1" color={colorScheme === 'light'? '#9E77ED': '#6941C6'} />
                    <Text>Back to log in</Text>
                  </Button>
                </View>
              </View>
            </>
          ) : (
            <View className="animate-fade-in">
              <View className="mb-6 flex h-16 w-16 flex-row items-center justify-center rounded-full bg-green-100 text-green-600 shadow-sm">
                <CheckCircle2 className="h-8 w-8" />
              </View>

              <Text className="mb-2 text-3xl font-bold text-slate-900">Check your email</Text>
              <Text className="mb-8 text-slate-500">
                We sent a password reset link to <br />
                <Text className="font-semibold text-slate-900">{email}</Text>
              </Text>

              <View className="gap-4">
                <Button variant={'default'} onPress={() => window.open('mailto:', '_blank')}>
                  <Text>Open email app</Text>
                </Button>

                <View className="flex-row gap-2">
                  <Text className="mt-6 text-center text-sm text-slate-500">
                    Didn't receive the email?
                  </Text>
                  <Button
                    variant={'link'}
                    onPress={() => setIsSubmitted(false)}
                    className="font-semibold">
                    <Text>Click to resend</Text>
                  </Button>
                </View>

                <View className="pt-6 text-center">
                  <Button
                    variant={'link'}
                    onPress={() => router.navigate('/login')}
                    className="inline-flex items-center text-sm font-semibold">
                    <ArrowLeft className="mr-1" color={colorScheme === 'light'? '#9E77ED': '#6941C6'}/> <Text>Back to log in</Text>
                  </Button>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>

      {/* Right Side - Visual */}
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
          className="absolute right-20 top-20 h-72 w-72 animate-pulse rounded-full bg-purple-500 opacity-30 mix-blend-multiply blur-3xl filter"
          style={{ animationDuration: '8s' }}></View>
        <View
          className="absolute bottom-20 left-20 h-72 w-72 animate-pulse rounded-full bg-indigo-500 opacity-30 mix-blend-multiply blur-3xl filter"
          style={{ animationDuration: '10s' }}></View>

        {/* Central Composition - Security Theme */}
        <View className="relative z-10 flex aspect-square w-full max-w-lg items-center justify-center">
          {/* Main Card (Glassmorphism) */}
          <View className="relative flex h-80 w-80 transform flex-col items-center justify-center rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-md transition-transform duration-500 hover:scale-105">
            <View className="shadow-inner mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-white/20">
              <Lock color={'#fff'} height={40} width={40} />
            </View>
            <View className="w-full space-y-3">
              <View className="mx-auto h-2 w-3/4 rounded-full bg-white/20"></View>
              <View className="mx-auto h-2 w-1/2 rounded-full bg-white/10"></View>
            </View>

            {/* Floating Elements */}
            <View
              className="absolute -right-6 -top-6 animate-bounce rounded-2xl bg-white p-3 shadow-xl"
              style={{ animationDuration: '3s' }}>
              <ShieldCheck className="h-8 w-8" color={'#10b981'} />
            </View>

            <View className="absolute -bottom-4 -left-4 flex items-center gap-3 rounded-xl border border-white/50 bg-white/90 p-3 shadow-xl backdrop-blur">
              <View className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100">
                <Mail height={16} width={16} color={'#4f46e5'} />
              </View>
              <View>
                <View className="mb-1 h-1.5 w-16 rounded-full bg-slate-200"></View>
                <View className="h-1.5 w-10 rounded-full bg-slate-100"></View>
              </View>
            </View>
          </View>
        </View>

        <View className="absolute bottom-10 z-10 items-center">
          <Text className="mb-2 text-2xl font-bold text-white">Secure Account Recovery</Text>
          <Text className="text-indigo-200">We keep your data safe and secure.</Text>
        </View>
      </View>
    </View>
    </SafeAreaView>
  );
};

export default forgotPassword;
