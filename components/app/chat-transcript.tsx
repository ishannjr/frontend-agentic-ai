'use client';

import { useEffect, useRef } from 'react';
import { type HTMLMotionProps, motion } from 'motion/react';
import { type ReceivedChatMessage } from '@livekit/components-react';
import { ChatEntry } from '@/components/livekit/chat-entry';

interface ChatTranscriptProps {
  messages?: ReceivedChatMessage[];
}

export function ChatTranscript({
  messages = [],
  ...props
}: ChatTranscriptProps & Omit<HTMLMotionProps<'div'>, 'ref'>) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [messages]);

  return (
    <motion.div {...props}>
      {messages.map(({ id, timestamp, from, message, editTimestamp }: ReceivedChatMessage) => {
        const locale = navigator?.language ?? 'en-US';
        const messageOrigin = from?.isLocal ? 'local' : 'remote';
        const hasBeenEdited = !!editTimestamp;

        return (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChatEntry
              locale={locale}
              timestamp={timestamp}
              message={message}
              messageOrigin={messageOrigin}
              hasBeenEdited={hasBeenEdited}
            />
          </motion.div>
        );
      })}
      <div ref={bottomRef} />
    </motion.div>
  );
}
