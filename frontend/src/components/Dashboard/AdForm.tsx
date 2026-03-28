import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Trash2, Megaphone, Type, FileText, Image as ImageIcon } from 'lucide-react';
import Loader from '../Loader/Loader';
import toast from "react-hot-toast";
import { createAd, updateAd } from '../../api/ads';

interface AdFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
  title: string;
  onSuccess?: () => void;
}

const AdForm: React.FC<AdFormProps> = ({ isOpen, onClose, initialData, title, onSuccess }) => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(initialData?.image || null);
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(initialData?.position || 'slider');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (initialData) {
      setPosition(initialData.position);
      setPreview(initialData.image);
    } else {
      setPosition('slider');
      setPreview(null);
    }
  }, [initialData, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    
    setIsLoading(true);
    
    const formData = new FormData(formRef.current);
    formData.append('position', position);
    if (image && position === 'slider') {
      formData.append('image', image);
    }

    try {
      if (initialData) {
        await updateAd(initialData.id, formData);
        toast.success("Advertisement updated successfully!");
      } else {
        await createAd(formData);
        toast.success("Advertisement created successfully!");
      }
      if (onSuccess) onSuccess();
      onClose();
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden overflow-y-auto max-h-[90vh] scrollbar-hide"
        >
          <div className="sticky top-0 bg-white dark:bg-slate-900/80 backdrop-blur-md px-8 py-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center z-10">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <Megaphone size={24} />
              </div>
              {title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 dark:bg-slate-800/50 rounded-full transition-colors text-slate-400 hover:text-slate-600 dark:text-slate-300"
            >
              <X size={24} />
            </button>
          </div>

          <form ref={formRef} className="p-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Ad Title */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                  <Type size={14} /> Ad Title
                </label>
                <input
                  type="text"
                  name="title"
                  defaultValue={initialData?.title}
                  required
                  placeholder="e.g. Summer Sale 2024"
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-slate-800 dark:text-slate-100"
                />
              </div>

              {/* Position Selection */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                  <Megaphone size={14} /> Position
                </label>
                <div className="flex gap-3">
                  {['slider', 'banner'].map((pos) => (
                    <button
                      key={pos}
                      type="button"
                      onClick={() => setPosition(pos)}
                      className={`flex-1 py-3 px-4 rounded-xl font-bold border transition-all capitalize ${
                        position === pos
                          ? 'bg-blue-600 border-blue-600 text-white shadow-lg dark:shadow-none'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-500 hover:bg-slate-100'
                      }`}
                    >
                      {pos}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                  <FileText size={14} /> Description
                </label>
                <textarea
                  name="description"
                  rows={3}
                  required
                  defaultValue={initialData?.description}
                  placeholder="Describe your advertisement..."
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-slate-800 dark:text-slate-100 resize-none"
                ></textarea>
              </div>

              {/* Image Upload - Only for Slider */}
              {position === 'slider' && (
                <div className="space-y-4">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 flex justify-between items-center">
                    <span>Advertisement Image</span>
                    <span className="text-[10px] lowercase font-medium opacity-60">Ideal: 1920x800 • JPG, PNG</span>
                  </label>
                  
                  <div className="flex justify-center">
                    {preview ? (
                      <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 group shadow-sm">
                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="p-3 bg-white text-blue-600 rounded-xl shadow-lg hover:scale-110 transition-transform"
                          >
                            <ImageIcon size={20} />
                          </button>
                          <button
                            type="button"
                            onClick={() => { setImage(null); setPreview(null); }}
                            className="p-3 bg-red-500 text-white rounded-xl shadow-lg hover:scale-110 transition-transform"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full aspect-[21/9] rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center gap-3 text-slate-400 hover:text-blue-500 hover:border-blue-500 hover:bg-blue-50/30 transition-all group"
                      >
                        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl group-hover:scale-110 transition-transform">
                          <Upload size={32} />
                        </div>
                        <div className="text-center">
                          <span className="text-xs font-black uppercase tracking-widest block">Upload Image</span>
                          <span className="text-[10px] font-medium opacity-60">Drag and drop or click to browse</span>
                        </div>
                      </button>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/*"
                  />
                </div>
              )}

              {/* Warning for Banner */}
              {position === 'banner' && (
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-700/50 rounded-2xl">
                  <p className="text-xs font-bold text-amber-600 dark:text-amber-400 leading-relaxed">
                    Banners are display-only textual elements with background gradients. No image upload is required for this position.
                  </p>
                </div>
              )}
            </div>

            <div className="pt-4 flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-4 px-6 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold rounded-2xl hover:bg-slate-100 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-[2] py-4 px-6 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg dark:shadow-none flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isLoading && <Loader />}
                {initialData ? "Update Advertisement" : "Create Advertisement"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AdForm;
