import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { PaperPlaneRightIcon, SpinnerIcon } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/livekit/button';

const MOTION_PROPS = {
  variants: {
    hidden: {
      height: 0,
      opacity: 0,
      marginBottom: 0,
    },
    visible: {
      height: 'auto',
      opacity: 1,
      marginBottom: 12,
    },
  },
  initial: 'hidden' as const,
  transition: {
    duration: 0.3,
    ease: 'easeOut' as const,
  },
};

interface ChatInputProps {
  chatOpen: boolean;
  isAgentAvailable?: boolean;
  onSend?: (message: string) => void;
}

export function ChatInput({
  chatOpen,
  isAgentAvailable = false,
  onSend = async () => {},
}: ChatInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsSending(true);
      await onSend(message);
      setMessage('');
    } catch (error) {
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  const isDisabled = isSending || !isAgentAvailable || message.trim().length === 0;

  useEffect(() => {
    if (chatOpen && isAgentAvailable) return;
    inputRef.current?.focus();
  }, [chatOpen, isAgentAvailable]);

  return (
    <motion.div
      inert={!chatOpen}
      {...MOTION_PROPS}
      animate={chatOpen ? 'visible' : 'hidden'}
      className="border-border/30 flex w-full items-start overflow-hidden border-b pb-3"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-muted/50 flex w-full items-center gap-2 rounded-xl px-4 py-2 shadow-inner backdrop-blur-sm"
      >
        <input
          autoFocus
          ref={inputRef}
          type="text"
          value={message}
          disabled={!chatOpen}
          placeholder="Type your message..."
          onChange={(e) => setMessage(e.target.value)}
          className="placeholder:text-muted-foreground h-9 flex-1 bg-transparent text-sm focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
        <Button
          size="icon"
          type="submit"
          disabled={isDisabled}
          variant={isDisabled ? 'secondary' : 'primary'}
          title={isSending ? 'Sending...' : 'Send'}
          className={
            isDisabled
              ? 'h-9 w-9 shrink-0'
              : 'h-9 w-9 shrink-0 bg-gradient-to-r from-teal-500 to-emerald-500 shadow-lg shadow-teal-500/30 hover:from-teal-600 hover:to-emerald-600'
          }
        >
          {isSending ? (
            <SpinnerIcon className="h-4 w-4 animate-spin" weight="bold" />
          ) : (
            <PaperPlaneRightIcon weight="bold" className="h-4 w-4" />
          )}
        </Button>
      </form>
    </motion.div>
  );
}
