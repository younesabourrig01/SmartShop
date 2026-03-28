import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, AlertTriangle, X } from 'lucide-react';
import Loader from '../Loader/Loader';

interface DeleteConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isLoading?: boolean;
}

const DeleteConfirm: React.FC<DeleteConfirmProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  isLoading 
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={!isLoading ? onClose : undefined}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden p-8 text-center"
        >
          {/* Close Button */}
          {!isLoading && (
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-slate-100 dark:bg-slate-800/50 rounded-full transition-colors text-slate-400 hover:text-slate-600 dark:text-slate-300"
            >
              <X size={20} />
            </button>
          )}

          {/* Icon */}
          <div className="mx-auto w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center text-red-500 mb-6 relative">
             <div className="absolute inset-0 bg-red-500/10 animate-ping rounded-3xl" />
             <AlertTriangle size={40} className="relative z-10" />
          </div>

          <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">{title}</h3>
          <p className="text-slate-500 dark:text-slate-400 font-medium mb-8 leading-relaxed">
            {message}
          </p>

          <div className="flex gap-4">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 py-4 px-6 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold rounded-2xl hover:bg-slate-100 dark:bg-slate-800/50 transition-all disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 py-4 px-6 bg-red-500 text-white font-bold rounded-2xl hover:bg-red-600 transition-all shadow-lg shadow-red-200 dark:shadow-none flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? <Loader size={18} color="white" /> : <Trash2 size={18} />}
              Delete
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DeleteConfirm;
