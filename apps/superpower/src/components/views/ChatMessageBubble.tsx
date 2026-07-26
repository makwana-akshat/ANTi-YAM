import { motion } from 'framer-motion';
import clsx from 'clsx';
import type { ChatMessage } from '../../data/mockData';
import { Sparkles } from 'lucide-react';

interface ChatMessageBubbleProps {
  message: ChatMessage;
}

export default function ChatMessageBubble({ message }: ChatMessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={clsx(
        "flex w-full mb-6",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-surface to-surface-muted border border-border-hairline/50 flex items-center justify-center shrink-0 mr-4 shadow-sm mt-1">
          <Sparkles className="w-4 h-4 text-accent-lime" />
        </div>
      )}
      <div
        className={clsx(
          "max-w-[80%] px-6 py-4 rounded-3xl shadow-sm text-[16px] leading-relaxed tracking-tight",
          isUser
            ? "bg-text-primary text-canvas"
            : "bg-white/50 backdrop-blur-md border border-white shadow-[0_4px_24px_rgba(0,0,0,0.02)] text-text-primary"
        )}
      >
        {message.content}
      </div>
    </motion.div>
  );
}

export function ChatTypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex w-full mb-6 justify-start"
    >
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-surface to-surface-muted border border-border-hairline/50 flex items-center justify-center shrink-0 mr-4 shadow-sm mt-1">
        <Sparkles className="w-4 h-4 text-accent-lime" />
      </div>
      <div className="px-5 py-4 rounded-3xl bg-white/50 backdrop-blur-md border border-white shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex items-center gap-1.5 h-[48px]">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-text-tertiary/60"
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
