import { MessageSquare, Plus, MoreVertical, Trash2, Edit2, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import clsx from 'clsx';
import type { ChatSession } from '../../data/mockData';

interface ChatHistorySidebarProps {
  sessions: ChatSession[];
  activeSessionId: string | null;
  onSelectSession: (id: string) => void;
  onNewChat: () => void;
  onDeleteSession: (id: string) => void;
  onRenameSession: (id: string, newTitle: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export default function ChatHistorySidebar({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewChat,
  onDeleteSession,
  onRenameSession,
  isCollapsed,
  onToggleCollapse
}: ChatHistorySidebarProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  const handleRenameStart = (session: ChatSession, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(session.id);
    setEditTitle(session.title);
    setMenuOpenId(null);
  };

  const handleRenameSubmit = (id: string) => {
    if (editTitle.trim()) {
      onRenameSession(id, editTitle.trim());
    }
    setEditingId(null);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteSession(id);
    setMenuOpenId(null);
  };

  return (
    <motion.div 
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="h-full border-r border-border-hairline/20 flex flex-col bg-canvas/30 backdrop-blur-md shrink-0 overflow-hidden"
    >
      <div className="p-4 flex items-center justify-between">
        {!isCollapsed && (
          <button
            onClick={onNewChat}
            className="flex-1 flex items-center gap-2 justify-center py-2 px-4 rounded-xl bg-surface border border-border-hairline hover:border-text-tertiary/50 hover:bg-surface-muted transition-all shadow-sm group mr-2"
          >
            <Plus className="w-5 h-5 text-text-secondary group-hover:text-text-primary transition-colors" />
            <span className="font-semibold text-text-secondary group-hover:text-text-primary transition-colors">New Chat</span>
          </button>
        )}
        <button
          onClick={onToggleCollapse}
          className={clsx(
            "p-2 rounded-xl border border-transparent hover:border-border-hairline hover:bg-surface-muted transition-all text-text-tertiary hover:text-text-primary shrink-0",
            isCollapsed && "mx-auto bg-surface border-border-hairline shadow-sm"
          )}
        >
          {isCollapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden px-3 pb-4 flex flex-col gap-1">
        {!isCollapsed && (
          <span className="text-xs font-bold text-text-tertiary tracking-widest uppercase px-3 py-2 mt-2 whitespace-nowrap">Previous Chats</span>
        )}
        <AnimatePresence initial={false}>
          {sessions.map((session) => {
            const isActive = activeSessionId === session.id;
            return (
              <motion.div
                key={session.id}
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="relative"
              >
                {editingId === session.id ? (
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-surface border border-accent-lime mx-1 mb-1 shadow-sm">
                    <input
                      autoFocus
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleRenameSubmit(session.id)}
                      onBlur={() => handleRenameSubmit(session.id)}
                      className="bg-transparent border-none outline-none text-sm w-full font-medium"
                    />
                  </div>
                ) : (
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => onSelectSession(session.id)}
                    onMouseLeave={() => setMenuOpenId(null)}
                    className={clsx(
                      "w-full flex items-center justify-between p-3 rounded-lg transition-all group relative mb-1",
                      isActive
                        ? "bg-surface shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-border-hairline/50"
                        : "hover:bg-surface-muted/50 border border-transparent"
                    )}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <MessageSquare className={clsx("w-4 h-4 shrink-0", isActive ? "text-accent-lime" : "text-text-tertiary")} />
                      {!isCollapsed && (
                        <span className={clsx("text-sm truncate text-left", isActive ? "text-text-primary font-semibold" : "text-text-secondary font-medium")}>
                          {session.title}
                        </span>
                      )}
                    </div>

                    {/* Actions Menu Trigger */}
                    {!isCollapsed && (
                      <div className={clsx(
                        "flex items-center",
                        (menuOpenId === session.id || isActive) ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      )}>
                        <div 
                          className="p-1 rounded hover:bg-surface-muted/80 text-text-tertiary hover:text-text-primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            setMenuOpenId(menuOpenId === session.id ? null : session.id);
                          }}
                        >
                          <MoreVertical className="w-4 h-4" />
                        </div>
                      </div>
                    )}

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {menuOpenId === session.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="absolute right-2 top-10 bg-surface shadow-xl border border-border-hairline rounded-lg py-1 z-50 min-w-[120px]"
                        >
                          <button
                            onClick={(e) => handleRenameStart(session, e)}
                            className="w-full text-left px-4 py-2 text-sm text-text-secondary hover:bg-surface-muted hover:text-text-primary flex items-center gap-2"
                          >
                            <Edit2 className="w-3.5 h-3.5" /> Rename
                          </button>
                          <button
                            onClick={(e) => handleDelete(session.id, e)}
                            className="w-full text-left px-4 py-2 text-sm text-status-red hover:bg-status-red/10 flex items-center gap-2"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
