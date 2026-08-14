import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Info } from 'lucide-react';

interface ToastProps {
  message: string | null;
  type?: 'success' | 'info';
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success' }) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 inset-x-0 mx-auto z-50 w-max max-w-[90vw] px-4 py-2.5 rounded-2xl bg-slate-950/80 backdrop-blur-2xl border border-cyan-400/40 shadow-[0_8px_30px_rgba(0,200,255,0.3)] text-white text-xs sm:text-sm font-medium flex items-center gap-2.5"
        >
          {type === 'success' ? (
            <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          ) : (
            <Info className="w-4 h-4 text-cyan-400 flex-shrink-0" />
          )}
          <span className="truncate">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
