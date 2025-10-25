'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useVoiceAssistant } from '@livekit/components-react';
import type { AppConfig } from '@/app-config';
import { ChatTranscript } from '@/components/app/chat-transcript';
import { PreConnectMessage } from '@/components/app/preconnect-message';
import {
  AgentControlBar,
  type ControlBarControls,
} from '@/components/livekit/agent-control-bar/agent-control-bar';
import { useChatMessages } from '@/hooks/useChatMessages';
import { useConnectionTimeout } from '@/hooks/useConnectionTimout';
import { useDebugMode } from '@/hooks/useDebug';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../livekit/scroll-area/scroll-area';

const MotionBottom = motion.create('div');

const IN_DEVELOPMENT = process.env.NODE_ENV !== 'production';
const BOTTOM_VIEW_MOTION_PROPS = {
  variants: {
    visible: {
      opacity: 1,
      translateY: '0%',
    },
    hidden: {
      opacity: 0,
      translateY: '100%',
    },
  },
  initial: 'hidden' as const,
  animate: 'visible' as const,
  exit: 'hidden' as const,
  transition: {
    duration: 0.3,
    delay: 0.5,
    ease: 'easeOut' as const,
  },
};

interface FadeProps {
  top?: boolean;
  bottom?: boolean;
  className?: string;
}

export function Fade({ top = false, bottom = false, className }: FadeProps) {
  return (
    <div
      className={cn(
        'from-background pointer-events-none h-4 bg-linear-to-b to-transparent',
        top && 'bg-linear-to-b',
        bottom && 'bg-linear-to-t',
        className
      )}
    />
  );
}
interface SessionViewProps {
  appConfig: AppConfig;
}

export const SessionView = ({
  appConfig,
  ...props
}: React.ComponentProps<'section'> & SessionViewProps) => {
  useConnectionTimeout(200_000);
  useDebugMode({ enabled: IN_DEVELOPMENT });

  const messages = useChatMessages();
  const [chatOpen, setChatOpen] = useState(false);
  const { state: agentState } = useVoiceAssistant();

  const isAgentSpeaking = agentState === 'speaking';

  const controls: ControlBarControls = {
    leave: true,
    microphone: true,
    chat: appConfig.supportsChatInput,
    camera: false,
    screenShare: false,
  };

  return (
    <section className="relative z-10 min-h-screen w-full overflow-hidden bg-white" {...props}>
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-blue-50/30" />

      {!chatOpen && (
        <motion.div
          className="pointer-events-none absolute inset-0 flex items-center justify-center pb-20 sm:pb-28 md:pb-32"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex max-w-2xl flex-col items-center gap-4 px-4 sm:gap-6 sm:px-6">
            <motion.div
              className="relative"
              animate={isAgentSpeaking ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 shadow-2xl sm:h-24 sm:w-24">
                <motion.div
                  className="text-white"
                  animate={isAgentSpeaking ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="sm:h-12 sm:w-12"
                  >
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="23" />
                    <line x1="8" y1="23" x2="16" y2="23" />
                  </svg>
                </motion.div>
              </div>
              {isAgentSpeaking && (
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-teal-400"
                  animate={{ scale: [1, 1.3], opacity: [0.8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </motion.div>

            <div className="space-y-2 px-4 text-center">
              <motion.h2
                className="text-xl font-bold text-slate-900 sm:text-2xl md:text-3xl"
                animate={{ opacity: [0.9, 1, 0.9] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {isAgentSpeaking ? 'RoadBuddy is speaking' : 'Agent is listening'}
              </motion.h2>
              <p className="text-base text-slate-600 sm:text-lg">
                {isAgentSpeaking ? 'Getting you the best answer...' : 'Ask it a question'}
              </p>
            </div>

            {isAgentSpeaking && (
              <motion.div
                className="flex h-12 items-center gap-1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 rounded-full bg-gradient-to-t from-teal-500 to-emerald-500"
                    animate={{
                      height: [20, 40, 20],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </motion.div>
            )}

            {messages.length > 0 &&
              (() => {
                const latestMessage = messages[messages.length - 1];
                const isLocal = latestMessage.from?.isLocal;

                return (
                  <motion.div
                    key={latestMessage.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-6 w-full max-w-3xl px-4 sm:mt-8"
                  >
                    <div className="rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-xl sm:p-5">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full sm:h-10 sm:w-10 ${
                            isLocal ? 'bg-teal-500' : 'bg-orange-500'
                          }`}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            className="sm:h-5 sm:w-5"
                          >
                            {isLocal ? (
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                            ) : (
                              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
                            )}
                          </svg>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="mb-1.5 flex items-center gap-1.5 sm:mb-2 sm:gap-2">
                            <span
                              className={`text-xs font-bold sm:text-sm ${isLocal ? 'text-teal-600' : 'text-orange-600'}`}
                            >
                              {isLocal ? 'You' : 'RoadBuddy'}
                            </span>
                            {!isLocal && isAgentSpeaking && (
                              <span className="flex items-center gap-1 text-xs text-slate-500">
                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal-500"></span>
                                <span className="hidden sm:inline">Speaking...</span>
                              </span>
                            )}
                          </div>
                          <p className="text-sm leading-relaxed break-words text-slate-900 sm:text-base">
                            {latestMessage.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })()}
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {chatOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="pointer-events-none absolute inset-x-4 top-0 z-10 h-40 bg-gradient-to-b from-white to-transparent" />
            <ScrollArea className="h-full px-3 pt-32 pb-[130px] sm:px-4 sm:pt-40 sm:pb-[150px] md:px-6 md:pb-[180px]">
              <div className="mx-auto mb-6 max-w-3xl sm:mb-8">
                <div className="mb-4 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 p-4 shadow-xl sm:mb-6 sm:gap-4 sm:p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 sm:h-12 sm:w-12">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      className="sm:h-6 sm:w-6"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white sm:text-xl md:text-2xl">
                      Conversation
                    </h2>
                    <p className="text-xs text-teal-50 sm:text-sm">
                      Your learning session with RoadBuddy
                    </p>
                  </div>
                </div>
              </div>
              <ChatTranscript
                key={messages.length}
                messages={messages}
                className="mx-auto max-w-3xl space-y-4"
              />
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>

      <MotionBottom
        {...BOTTOM_VIEW_MOTION_PROPS}
        className="fixed inset-x-2 bottom-0 z-50 sm:inset-x-3 md:inset-x-12"
      >
        {appConfig.isPreConnectBufferEnabled && (
          <PreConnectMessage messages={messages} className="pb-2 sm:pb-4" />
        )}
        <div className="relative mx-auto max-w-3xl pb-2 sm:pb-3 md:pb-12">
          <AgentControlBar controls={controls} onChatOpenChange={setChatOpen} />
        </div>
      </MotionBottom>
    </section>
  );
};
