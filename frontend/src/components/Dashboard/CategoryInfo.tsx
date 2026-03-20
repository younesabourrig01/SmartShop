import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Layers, Calendar, Package, FileText } from 'lucide-react';
import { API_BASE_URL } from '../../api/client';

interface CategoryInfoProps {
  isOpen: boolean;
  onClose: () => void;
  category: any;
}

const CategoryInfo: React.FC<CategoryInfoProps> = ({ isOpen, onClose, category }) => {
  if (!isOpen || !category) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden overflow-y-auto max-h-[90vh] [&::-webkit-scrollbar]:hidden"
        >
          {/* Cover Image */}
          <div className="h-48 relative overflow-hidden">
             <img 
                src={category.url || "https://via.placeholder.com/600x300?text=No+Category+Image"} 
                alt={category.name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/600x300?text=No+Category+Image";
                }}
             />
             <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
             <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 bg-white/20 backdrop-blur-md hover:bg-white/40 rounded-full transition-colors text-white"
             >
                <X size={24} />
             </button>
          </div>

          {/* Content */}
          <div className="px-8 pb-10 -mt-10 relative z-10">
            <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-50">
               <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl">
                     <Layers size={32} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-slate-900">{category.name}</h2>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Category Details</p>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-slate-50 p-4 rounded-2xl">
                     <div className="flex items-center gap-2 text-slate-400 mb-1">
                        <Package size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Products</span>
                     </div>
                     <p className="text-xl font-black text-slate-900">{category.products_count} Items</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl">
                     <div className="flex items-center gap-2 text-slate-400 mb-1">
                        <Calendar size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Created</span>
                     </div>
                     <p className="text-xl font-black text-slate-900">
                        {category.created_at ? new Date(category.created_at).toLocaleDateString() : 'N/A'}
                     </p>
                  </div>
               </div>

               <div className="space-y-3">
                  <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                     <FileText size={14} /> Description
                  </h4>
                  <div className="bg-slate-50 p-6 rounded-2xl min-h-[100px]">
                      <p className="text-slate-600 font-medium leading-relaxed italic">
                        "{category.description || 'No description provided for this category.'}"
                      </p>
                  </div>
               </div>
            </div>

            <button
               onClick={onClose}
               className="w-full mt-8 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
            >
               Close Details
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CategoryInfo;
