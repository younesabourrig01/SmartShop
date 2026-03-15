import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Plus, Trash2, Package, DollarSign, List, FileText, CheckCircle2 } from 'lucide-react';

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
  title: string;
}

const ProductForm: React.FC<ProductFormProps> = ({ isOpen, onClose, initialData, title }) => {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      if (images.length + selectedFiles.length > 5) {
        alert("You can only upload up to 5 images");
        return;
      }
      
      const newImages = [...images, ...selectedFiles];
      setImages(newImages);
      
      const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
      setPreviews([...previews, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setImages(newImages);
    setPreviews(newPreviews);
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
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden overflow-y-auto max-h-[90vh] [&::-webkit-scrollbar]:hidden"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white/80 backdrop-blur-md px-8 py-6 border-b border-slate-100 flex justify-between items-center z-10">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <Plus size={24} />
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Name */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                  <Package size={14} /> Product Name
                </label>
                <input
                  type="text"
                  defaultValue={initialData?.name}
                  placeholder="e.g. MacBook Pro M3"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-slate-800"
                />
              </div>

              {/* Price */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                  <DollarSign size={14} /> Price
                </label>
                <input
                  type="number"
                  defaultValue={initialData?.price}
                  placeholder="0.00"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-slate-800"
                />
              </div>

              {/* Stock */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                  <CheckCircle2 size={14} /> Stock Quantity
                </label>
                <input
                  type="number"
                  defaultValue={initialData?.stock}
                  placeholder="0"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-slate-800"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                  <List size={14} /> Category
                </label>
                <select
                  defaultValue={initialData?.category || ""}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-slate-800 appearance-none"
                >
                  <option value="" disabled>Select Category</option>
                  <option value="electronics">Electronics</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                <FileText size={14} /> Description
              </label>
              <textarea
                rows={4}
                defaultValue={initialData?.description}
                placeholder="Describe your product..."
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-slate-800 resize-none"
              ></textarea>
            </div>

            {/* Images */}
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 flex justify-between items-center">
                <span>Product Images ({images.length}/5)</span>
                <span className="text-[10px] lowercase font-medium opacity-60">Max 5 images • JPG, PNG</span>
              </label>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {previews.map((preview, index) => (
                  <motion.div
                    key={index}
                    layoutId={`img-${index}`}
                    className="relative aspect-square rounded-2xl overflow-hidden border border-slate-100 group shadow-sm"
                  >
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    >
                      <Trash2 size={14} />
                    </button>
                  </motion.div>
                ))}
                
                {images.length < 5 && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-blue-500 hover:border-blue-500 hover:bg-blue-50/30 transition-all group"
                  >
                    <Upload size={24} className="group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Upload</span>
                  </button>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
                multiple
                accept="image/*"
              />
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
                {initialData ? "Update Product" : "Create Product"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProductForm;
