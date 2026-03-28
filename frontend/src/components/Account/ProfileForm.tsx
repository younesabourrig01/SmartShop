import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Trash2, User, Mail, MapPin, Phone } from "lucide-react";
import Loader from "../Loader/Loader";
import { updateProfile } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

interface ProfileFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
  title: string;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  isOpen,
  onClose,
  initialData,
  title,
}) => {
  const { t } = useTranslation();
  const { setAuth, token } = useAuth();
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    adress: initialData?.adress || "",
    phone_number: initialData?.phone_number || "",
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        email: initialData.email || "",
        adress: initialData.adress || "",
        phone_number: initialData.phone_number || "",
      });
      if (initialData.image) {
        setPreview(`http://127.0.0.1:8000/storage/${initialData.image}`);
      }
    }
  }, [initialData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("adress", formData.adress);
      data.append("phone_number", formData.phone_number);
      if (imageFile) {
        data.append("image", imageFile);
      }

      const response = await updateProfile(data);

      if (response.data.status === "success") {
        toast.success(
          response.data.message || t("profile.form.update_success"),
        );
        if (token) {
          setAuth(response.data.data, token);
        }
        onClose();
      }
    } catch (error: any) {
      console.error("Update profile error:", error);
      const errorMessage =
        error.response?.data?.message || t("profile.form.update_failed");
      toast.error(errorMessage);
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
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden overflow-y-auto max-h-[90vh] [&::-webkit-scrollbar]:hidden"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-slate-900/80 backdrop-blur-md px-8 py-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center z-10">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <User size={24} />
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
          <form className="p-8 space-y-8" onSubmit={handleSubmit}>
            {/* Image Section */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative group">
                <div className="w-32 h-32 rounded-[2rem] bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-slate-700 overflow-hidden flex items-center justify-center relative">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={48} className="text-slate-300" />
                  )}

                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2 bg-white dark:bg-slate-900 text-blue-600 rounded-xl shadow-lg hover:scale-110 transition-transform"
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
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                {t("register_page.profile_picture")}
              </p>
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
                  <User size={14} /> {t("register_page.full_name")}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t("profile.form.name_placeholder")}
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-slate-800 dark:text-slate-100"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                  <Mail size={14} /> {t("register_page.email_address")}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("profile.form.email_placeholder")}
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-slate-800 dark:text-slate-100"
                />
              </div>

              {/* Adress */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                  <MapPin size={14} /> {t("register_page.address")}
                </label>
                <input
                  type="text"
                  name="adress"
                  value={formData.adress}
                  onChange={handleChange}
                  placeholder={t("profile.form.address_placeholder")}
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-slate-800 dark:text-slate-100"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                  <Phone size={14} /> {t("register_page.phone_number")}
                </label>
                <input
                  type="text"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  placeholder={t("profile.form.phone_placeholder")}
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-slate-800 dark:text-slate-100"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-4 px-6 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold rounded-2xl hover:bg-slate-100 dark:bg-slate-800/50 transition-all"
              >
                {t("register_page.cancel")}
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-[2] py-4 px-6 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg dark:shadow-none flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isLoading && <Loader />}
                {t("profile.form.save_btn")}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProfileForm;
