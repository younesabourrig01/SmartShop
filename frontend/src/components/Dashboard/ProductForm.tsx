import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Trash2, Package, DollarSign, List, FileText, CheckCircle2 } from 'lucide-react';
import Loader from '../Loader/Loader';
import { getCategories } from "../../api/category";
import { addProduct, updateProduct } from "../../api/products";
import toast from "react-hot-toast";

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
  title: string;
  onSuccess?: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ isOpen, onClose, initialData, title, onSuccess }) => {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      loadCategories();
    }
  }, [isOpen]);

  const loadCategories = async () => {
    setIsCategoriesLoading(true);
    try {
      const res = await getCategories();
      if (res.data && res.data.status === "success") {
        setCategories(res.data.data);
      }
    } catch (error) {
       console.error("Failed to load categories", error);
    } finally {
        setIsCategoriesLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    
    setIsLoading(true);
    const formData = new FormData();
    const elements = formRef.current.elements as any;
    
    formData.append('name', elements.name.value);
    formData.append('price', elements.price.value);
    formData.append('stock', elements.stock.value);
    formData.append('category_id', elements.category_id.value);
    formData.append('description', elements.description.value);
    
    // images
    images.forEach(file => {
      formData.append('images[]', file);
    });

    try {
        if (!initialData) {
            // Create mode
            await addProduct(formData);
            toast.success("Product created successfully!");
        } else {
            // Update mode
            await updateProduct(initialData.id, formData);
            toast.success("Product updated successfully!");
        }
        if (onSuccess) onSuccess();
        onClose();
        // Reset state
        setImages([]);
        setPreviews([]);
    } catch (error: any) {
        toast.error(error.response?.data?.message || "Operation failed");
    } finally {
        setIsLoading(false);
    }
  };

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
          className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden overflow-y-auto max-h-[90vh] [&::-webkit-scrollbar]:hidden"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-slate-900/80 backdrop-blur-md px-8 py-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center z-10">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <Package size={24} />
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

          {/* Form Content */}
          <form ref={formRef} className="p-8 space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Name */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                  <Package size={14} /> Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={initialData?.name}
                  placeholder="e.g. MacBook Pro M3"
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-slate-800 dark:text-slate-100"
                />
              </div>

              {/* Price */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                  <DollarSign size={14} /> Price
                </label>
                <input
                  type="number"
                  name="price"
                  step="0.01"
                  defaultValue={initialData?.price}
                  placeholder="0.00"
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-slate-800 dark:text-slate-100"
                />
              </div>

              {/* Stock */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                  <CheckCircle2 size={14} /> Stock Quantity
                </label>
                <input
                  type="number"
                  name="stock"
                  defaultValue={initialData?.stock}
                  placeholder="0"
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-slate-800 dark:text-slate-100"
                />
              </div>

              {/* Category */}
              <div className="space-y-2 relative">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2"><List size={14} /> Category</span>
                  {isCategoriesLoading && <Loader size={12} color="#2563eb" />}
                </label>
                <select
                  name="category_id"
                  disabled={isCategoriesLoading}
                  defaultValue={initialData?.category_id || ""}
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-slate-800 dark:text-slate-100 appearance-none disabled:opacity-50"
                >
                  <option value="" disabled>{isCategoriesLoading ? "Loading categories..." : "Select Category"}</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                <FileText size={14} /> Description
              </label>
              <textarea
                name="description"
                rows={4}
                defaultValue={initialData?.description}
                placeholder="Describe your product..."
                className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-slate-800 dark:text-slate-100 resize-none"
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
                    className="relative aspect-square rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 group shadow-sm"
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
                    className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-blue-500 hover:border-blue-500 hover:bg-blue-50/30 transition-all group"
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
                className="flex-1 py-4 px-6 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold rounded-2xl hover:bg-slate-100 dark:bg-slate-800/50 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-[2] py-4 px-6 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg dark:shadow-none flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isLoading && <Loader />}
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
