import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export const Dialog = ({ open, onOpenChange, children }: any) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => onOpenChange(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl overflow-y-auto pointer-events-auto flex flex-col max-h-[90vh] w-full max-w-4xl relative"
            >
              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export const DialogContent = ({ children, className }: any) => {
  return <div className={`relative p-6 ${className}`}>{children}</div>;
};

export const DialogHeader = ({ children, className }: any) => {
  return <div className={`mb-6 ${className}`}>{children}</div>;
};

export const DialogTitle = ({ children, className }: any) => {
  return <h2 className={`text-2xl font-bold text-slate-900 ${className}`}>{children}</h2>;
};

export const DialogDescription = ({ children, className }: any) => {
  return <p className={`text-slate-500 mt-2 ${className}`}>{children}</p>;
};
