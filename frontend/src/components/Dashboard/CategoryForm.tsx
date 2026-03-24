import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Trash2, Layers, FileText } from 'lucide-react';
import Loader from '../Loader/Loader';
import { addCategory, updateCategory } from '../../api/category';
import toast from 'react-hot-toast';

interface CategoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
  title: string;
  onSuccess?: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ isOpen, onClose, initialData, title, onSuccess }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setDescription(initialData.description || '');
      setPreview(initialData.url || null);
    } else {
      setName('');
      setDescription('');
      setPreview(null);
    }
    setImageFile(null);
  }, [initialData, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Category name is required");

    setIsLoading(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    if (imageFile) {
        formData.append('image', imageFile);
    }

    try {
        if (initialData) {
            await updateCategory(initialData.id, formData);
            toast.success("Category updated successfully!");
        } else {
            await addCategory(formData);
            toast.success("Category created successfully!");
        }
        if (onSuccess) onSuccess();
        onClose();
    } catch (error: any) {
        toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
        setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setPreview(null);
    setImageFile(null);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
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
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden overflow-y-auto max-h-[90vh] [&::-webkit-scrollbar]:hidden"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-slate-900/80 backdrop-blur-md px-8 py-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center z-10 text-nowarp">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <Layers size={24} />
              </div>
              {title}
            </h2>
            <button
              onClick={onClose}
              disabled={isLoading}
              className="p-2 hover:bg-slate-100 dark:bg-slate-800/50 rounded-full transition-colors text-slate-400 hover:text-slate-600 dark:text-slate-300"
            >
              <X size={24} />
            </button>
          </div>

          {/* Form Content */}
          <form className="p-8 space-y-8" onSubmit={handleSubmit}>
            {/* Category Name */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                <Layers size={14} /> Category Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Electronics"
                className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-slate-800 dark:text-slate-100"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                <FileText size={14} /> Description
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe this category..."
                className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-slate-800 dark:text-slate-100 resize-none"
              ></textarea>
            </div>

            {/* Image */}
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 flex justify-between items-center">
                <span>Category Image</span>
                <span className="text-[10px] lowercase font-medium opacity-60">JPG, PNG, JPEG • Max 2MB</span>
              </label>
              
              <div className="flex justify-center">
                {preview ? (
                  <motion.div
                    layoutId="category-img"
                    className="relative w-40 h-40 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-700 group shadow-md"
                  >
                    <img 
                        src={preview} 
                        alt="Preview" 
                        className="w-full h-full object-cover" 
                        onError={(e) => {
                             const target = e.target as HTMLImageElement;
                             target.src = "https://via.placeholder.com/150";
                        }}
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-40 h-40 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center gap-3 text-slate-400 hover:text-blue-500 hover:border-blue-500 hover:bg-blue-50/30 transition-all group"
                  >
                    <Upload size={32} className="group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Upload Image</span>
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

            {/* Actions */}
            <div className="pt-4 flex gap-4">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 py-4 px-6 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold rounded-2xl hover:bg-slate-100 dark:bg-slate-800/50 transition-all disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-[2] py-4 px-6 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isLoading ? <Loader size={18} color="white" /> : null}
                {initialData ? "Update Category" : "Create Category"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CategoryForm;
