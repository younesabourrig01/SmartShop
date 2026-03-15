import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Trash2, User, Mail } from 'lucide-react';

interface ProfileFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
  title: string;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ isOpen, onClose, initialData, title }) => {
  const [preview, setPreview] = useState<string | null>(initialData?.image || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setPreview(null);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
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
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden overflow-y-auto max-h-[90vh] [&::-webkit-scrollbar]:hidden"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white/80 backdrop-blur-md px-8 py-6 border-b border-slate-100 flex justify-between items-center z-10">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <User size={24} />
              </div>
              {title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
            >
              <X size={24} />
            </button>
          </div>

          {/* Form Content */}
          <form className="p-8 space-y-8" onSubmit={(e) => e.preventDefault()}>
            {/* Image Section */}
            <div className="flex flex-col items-center gap-4">
               <div className="relative group">
                    <div className="w-32 h-32 rounded-[2rem] bg-slate-50 border-2 border-dashed border-slate-200 overflow-hidden flex items-center justify-center relative">
                        {preview ? (
                            <img src={preview} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <User size={48} className="text-slate-300" />
                        )}
                        
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="p-2 bg-white text-blue-600 rounded-xl shadow-lg hover:scale-110 transition-transform"
                            >
                                <Upload size={20} />
                            </button>
                        </div>
                    </div>
                    {preview && (
                        <button
                            type="button"
                            onClick={removeImage}
                            className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-lg shadow-lg hover:scale-110 transition-transform z-10"
                        >
                            <Trash2 size={14} />
                        </button>
                    )}
               </div>
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Profile Picture</p>
               <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageChange} 
                className="hidden" 
                accept="image/*" 
               />
            </div>

            <div className="space-y-6">
                {/* Full Name */}
                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                    <User size={14} /> Full Name
                    </label>
                    <input
                    type="text"
                    defaultValue={initialData?.name}
                    placeholder="e.g. John Doe"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-slate-800"
                    />
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                    <Mail size={14} /> Email Address
                    </label>
                    <input
                    type="email"
                    defaultValue={initialData?.email}
                    placeholder="e.g. john@example.com"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-slate-800"
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-4 px-6 bg-slate-50 text-slate-500 font-bold rounded-2xl hover:bg-slate-100 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-[2] py-4 px-6 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
              >
                Save Changes
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProfileForm;
