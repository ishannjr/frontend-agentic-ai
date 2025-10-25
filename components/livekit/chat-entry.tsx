import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ChatEntryProps extends React.HTMLAttributes<HTMLLIElement> {
  locale: string;
  timestamp: number;
  message: string;
  messageOrigin: 'local' | 'remote';
  name?: string;
  hasBeenEdited?: boolean;
}

export const ChatEntry = ({
  name,
  locale,
  timestamp,
  message,
  messageOrigin,
  hasBeenEdited = false,
  className,
  ...props
}: ChatEntryProps) => {
  const time = new Date(timestamp);
  const title = time.toLocaleTimeString(locale, { timeStyle: 'full' });
  const isLocal = messageOrigin === 'local';

  return (
    <li
      title={title}
      data-lk-message-origin={messageOrigin}
      className={cn('group flex w-full flex-col gap-1.5', className)}
      {...props}
    >
      <header
        className={cn(
          'text-muted-foreground flex items-center gap-2 text-sm font-medium',
          isLocal ? 'flex-row-reverse' : 'text-left'
        )}
      >
        {name && (
          <strong className={cn(isLocal ? 'text-teal-600' : 'text-orange-600')}>{name}</strong>
        )}
        <span className="font-mono text-xs opacity-0 transition-opacity ease-linear group-hover:opacity-100">
          {hasBeenEdited && '*'}
          {time.toLocaleTimeString(locale, { timeStyle: 'short' })}
        </span>
      </header>
      <div
        className={cn(
          'inline-block max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-md',
          isLocal
            ? 'ml-auto bg-gradient-to-br from-teal-500 to-emerald-500 text-white'
            : 'mr-auto bg-slate-100 text-slate-900'
        )}
      >
        {message}
      </div>
    </li>
  );
};
