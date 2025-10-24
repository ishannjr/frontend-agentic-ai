'use client';

import { motion } from 'motion/react';
import {
  BookOpenIcon,
  CarIcon,
  CheckCircleIcon,
  GraduationCapIcon,
  LightningIcon,
  PhoneIcon,
} from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/livekit/button';

interface WelcomeViewProps {
  startButtonText: string;
  onStartCall: () => void;
}

export const WelcomeView = ({
  startButtonText,
  onStartCall,
  ref,
}: React.ComponentProps<'div'> & WelcomeViewProps) => {
  return (
    <div
      ref={ref}
      className="relative min-h-screen w-full bg-gradient-to-br from-teal-600 via-emerald-600 to-cyan-700"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-32 h-64 w-64 rounded-full bg-cyan-300 opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -right-32 bottom-1/4 h-64 w-64 rounded-full bg-teal-300 opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-12 text-center">
        {/* Icon Badge */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-6"
        >
          <div className="relative">
            <div className="flex h-20 w-20 rotate-3 items-center justify-center rounded-2xl bg-white shadow-2xl shadow-black/20">
              <CarIcon weight="fill" className="h-10 w-10 text-teal-600" />
            </div>
            <motion.div
              className="absolute -top-1 -right-1 h-6 w-6 rounded-full border-4 border-white bg-orange-500 shadow-lg"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-3"
        >
          <h1 className="text-6xl font-black tracking-tight text-white drop-shadow-lg md:text-7xl">
            Road<span className="text-orange-400">Buddy</span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-4"
        >
          <p className="text-xl font-semibold text-teal-50">
            Your California DMV Knowledge Test Coach
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-10 max-w-2xl text-lg leading-relaxed font-medium text-white/90"
        >
          Welcome aboard! I&apos;m your calm, encouraging coach here to help you pass the California
          DMV knowledge test with confidence. Let&apos;s hit the road together!
        </motion.p>

        {/* Features Grid */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-10 grid w-full max-w-3xl grid-cols-1 gap-4 md:grid-cols-3"
        >
          <div className="rounded-xl border-2 border-white/20 bg-white/95 p-5 shadow-2xl backdrop-blur-sm transition-transform duration-200 hover:scale-105">
            <GraduationCapIcon weight="duotone" className="mx-auto mb-3 h-10 w-10 text-teal-600" />
            <p className="text-base font-bold text-slate-800">Practice Quizzes</p>
          </div>
          <div className="rounded-xl border-2 border-white/20 bg-white/95 p-5 shadow-2xl backdrop-blur-sm transition-transform duration-200 hover:scale-105">
            <BookOpenIcon weight="duotone" className="mx-auto mb-3 h-10 w-10 text-teal-600" />
            <p className="text-base font-bold text-slate-800">CA DMV Expert</p>
          </div>
          <div className="rounded-xl border-2 border-white/20 bg-white/95 p-5 shadow-2xl backdrop-blur-sm transition-transform duration-200 hover:scale-105">
            <LightningIcon weight="duotone" className="mx-auto mb-3 h-10 w-10 text-teal-600" />
            <p className="text-base font-bold text-slate-800">Instant Answers</p>
          </div>
        </motion.div>

        {/* Start Call Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Button
            variant="primary"
            size="lg"
            onClick={onStartCall}
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-16 py-7 text-xl font-black text-white shadow-2xl shadow-orange-900/40 transition-all duration-300 hover:scale-110 hover:from-orange-600 hover:to-red-600"
          >
            <PhoneIcon weight="fill" className="mr-3 h-7 w-7" />
            {startButtonText}
          </Button>
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-8 flex items-center gap-2 text-sm font-medium text-teal-50"
        >
          <CheckCircleIcon weight="fill" className="h-6 w-6 text-orange-400" />
          <span>Trusted by thousands of California test-takers</span>
        </motion.div>

        {/* RAG Context Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-8 max-w-2xl"
        >
          <div className="rounded-2xl border-2 border-white/30 bg-white/95 p-5 shadow-2xl backdrop-blur-sm">
            <p className="text-sm leading-relaxed text-slate-800">
              <span className="font-bold text-teal-700">Powered by Official DMV Content:</span> I
              have complete access to the{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.dmv.ca.gov/portal/file/california-quick-reference-drivers-handbook-dl-600-x-pdf/"
                className="font-semibold text-teal-600 underline underline-offset-2 transition-colors hover:text-teal-800"
              >
                California Driver&apos;s Handbook
              </a>
              . Every answer includes exact page references. You&apos;ve got this!
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
