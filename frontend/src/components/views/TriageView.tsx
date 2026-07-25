import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';
import { commonSymptoms, initialMockSessions, simulateChatResponse } from '../../data/mockData';
import type { ChatSession, ChatMessage } from '../../data/mockData';
import ChatHistorySidebar from './ChatHistorySidebar';
import ChatMessageBubble, { ChatTypingIndicator } from './ChatMessageBubble';

export default function TriageView() {
  const [sessions, setSessions] = useState<ChatSession[]>(initialMockSessions);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(initialMockSessions[0].id);
  
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeSession = sessions.find(s => s.id === activeSessionId);
  const messages = activeSession?.messages || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleNewChat = () => {
    setActiveSessionId(null);
    setInputText('');
  };

  const handleDeleteSession = (id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
    if (activeSessionId === id) {
      setActiveSessionId(null);
    }
  };

  const handleRenameSession = (id: string, newTitle: string) => {
    setSessions(prev => prev.map(s => s.id === id ? { ...s, title: newTitle } : s));
  };

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputText;
    if (!messageText.trim()) return;

    let currentSessionId = activeSessionId;
    let newSessions = [...sessions];

    const newUserMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: messageText.trim(),
      timestamp: new Date()
    };

    if (!currentSessionId) {
      currentSessionId = `session-${Date.now()}`;
      const newSession: ChatSession = {
        id: currentSessionId,
        title: messageText.trim().slice(0, 30) + '...',
        messages: [newUserMsg],
        updatedAt: new Date()
      };
      newSessions.unshift(newSession);
      setSessions(newSessions);
      setActiveSessionId(currentSessionId);
    } else {
      newSessions = newSessions.map(s => {
        if (s.id === currentSessionId) {
          return { ...s, messages: [...s.messages, newUserMsg], updatedAt: new Date() };
        }
        return s;
      });
      setSessions(newSessions);
    }

    setInputText('');
    setIsTyping(true);

    // Simulate API Response
    const responseText = await simulateChatResponse(messageText, newSessions.find(s => s.id === currentSessionId)?.messages || []);
    
    const newAsstMsg: ChatMessage = {
      id: `msg-${Date.now() + 1}`,
      role: 'assistant',
      content: responseText,
      timestamp: new Date()
    };

    setSessions(prev => prev.map(s => {
      if (s.id === currentSessionId) {
        return { ...s, messages: [...s.messages, newAsstMsg], updatedAt: new Date() };
      }
      return s;
    }));
    setIsTyping(false);
  };

  const handleChipClick = (label: string) => {
    handleSendMessage(label);
  };

  return (
    <div className="flex h-full w-full bg-canvas relative overflow-hidden -mx-8 -my-8" style={{ width: 'calc(100% + 4rem)', height: 'calc(100vh - 2rem)' }}>
      {/* Background ambient orb */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center -z-10">
        <motion.div 
          className="w-[800px] h-[800px] rounded-full blur-[120px] mix-blend-multiply opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(160,200,255,0.4) 0%, rgba(200,160,255,0.2) 50%, transparent 80%)' }}
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 20, -20, 0],
            y: [0, -20, 20, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <ChatHistorySidebar 
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={setActiveSessionId}
        onNewChat={handleNewChat}
        onDeleteSession={handleDeleteSession}
        onRenameSession={handleRenameSession}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <div className="flex-1 flex flex-col relative h-full">
        {/* Chat Thread Area */}
        <div className="flex-1 overflow-y-auto px-8 lg:px-24 py-8 pb-32">
          {!activeSessionId || messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-2xl mx-auto -mt-20">
              <h1 className="text-[48px] font-medium tracking-tight text-text-primary mb-4">How are you feeling?</h1>
              <p className="text-text-secondary text-lg leading-relaxed mb-12">
                Describe your symptoms, or select from the common patterns below to begin the triage assessment.
              </p>
              
              <div className="flex flex-col gap-4">
                <span className="text-xs font-bold text-text-tertiary tracking-widest uppercase text-center">Suggested Symptoms</span>
                <div className="flex flex-wrap gap-3 justify-center">
                  {commonSymptoms.map(sym => (
                    <motion.button
                      key={sym.id}
                      onClick={() => handleChipClick(sym.label)}
                      className="flex items-center gap-2 px-5 py-3 rounded-full text-[15px] font-medium transition-all shadow-sm border bg-surface/60 backdrop-blur-md text-text-secondary border-white hover:border-text-tertiary/30 hover:shadow-md hover:bg-white"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="drop-shadow-sm">{sym.icon}</span>
                      {sym.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto w-full flex flex-col pt-8">
              <AnimatePresence initial={false}>
                {messages.map(msg => (
                  <ChatMessageBubble key={msg.id} message={msg} />
                ))}
                {isTyping && <ChatTypingIndicator key="typing" />}
              </AnimatePresence>
              <div ref={messagesEndRef} className="h-8 shrink-0" />
            </div>
          )}
        </div>

        {/* Fixed Input Area at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-canvas via-canvas/90 to-transparent pt-12 pb-8 px-8 lg:px-24">
          <div className="max-w-3xl mx-auto relative group z-10">
            <div className="absolute -inset-1 bg-gradient-to-r from-accent-lime/20 to-accent-lime/10 rounded-full blur-lg opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
            <div className="relative flex items-center shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-full bg-white/70 backdrop-blur-2xl border border-white p-2 focus-within:bg-white focus-within:shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-all duration-300">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !isTyping) {
                    handleSendMessage();
                  }
                }}
                placeholder="E.g., I've had a persistent headache for 2 days..."
                className="w-full bg-transparent border-none outline-none h-12 pl-6 pr-4 text-[17px] text-text-primary placeholder:text-text-tertiary/60 font-medium tracking-tight"
              />
              <button
                 onClick={() => handleSendMessage()}
                 disabled={!inputText.trim() || isTyping}
                 className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
                   (!inputText.trim() || isTyping) 
                     ? 'bg-surface border border-border-hairline text-text-tertiary opacity-50 cursor-not-allowed'
                     : 'bg-text-primary text-canvas hover:shadow-lg hover:scale-105 active:scale-95'
                 }`}
              >
                <Send className="w-5 h-5 ml-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
