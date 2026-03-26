import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Trash2, X, AlertTriangle, Lock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import ProfileForm from "./ProfileForm";
import Loader from "../Loader/Loader";

import { deleteAccount } from "../../api/auth";

interface SettingsContentProps {
  backLabel: string;
  backPath: string;
}

const SettingsContent: React.FC<SettingsContentProps> = ({ backLabel, backPath }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, clearAuth } = useAuth();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      toast.error(t('profile.settings.delete_error_pass'));
      return;
    }
    
    setIsDeleting(true);
    const toastId = toast.loading(t('profile.settings.delete_processing'));
    
    try {
      await deleteAccount({ password });
      toast.success(t('profile.settings.delete_success'), { id: toastId });
      clearAuth();
      setIsDeleteModalOpen(false);
      navigate("/register");
    } catch (error: any) {
      console.error("Delete account error:", error);
      const errorMessage = error.response?.data?.message || t('profile.settings.delete_failed');
      toast.error(errorMessage, { id: toastId });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-slate-950 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate(backPath)}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors mb-6 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold">{backLabel}</span>
        </button>

        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">{t('profile.settings.title')}</h1>
          <p className="text-gray-500 mt-2">{t('profile.settings.subtitle')}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Update Account Card */}
          <div 
            onClick={() => setIsProfileModalOpen(true)}
            className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <User size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('profile.settings.update_title')}</h3>
            <p className="text-gray-500 text-sm mb-4 leading-relaxed">
              {t('profile.settings.update_desc')}
            </p>
            <button className="text-blue-600 font-bold text-sm hover:underline">
              {t('profile.settings.update_btn')}
            </button>
          </div>

          {/* Delete Account Card */}
          <div 
            onClick={() => setIsDeleteModalOpen(true)}
            className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-red-50 dark:border-red-900/20 shadow-sm hover:shadow-red-50 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-red-600 group-hover:text-white transition-colors">
              <Trash2 size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('profile.settings.delete_title')}</h3>
            <p className="text-gray-500 text-sm mb-4 leading-relaxed">
              {t('profile.settings.delete_desc')}
            </p>
            <button className="text-red-600 font-bold text-sm hover:underline">
              {t('profile.settings.delete_btn')}
            </button>
          </div>
        </div>
      </div>

      {/* Profile Update Modal */}
      <ProfileForm 
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        title={t('profile.form.title')}
        initialData={{
            name: user?.name,
            email: user?.email,
            image: user?.image,
            adress: user?.adress,
            phone_number: user?.phone_number
        }}
      />

      {/* Delete Account Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDeleteModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden p-8"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-red-50 text-red-600 rounded-xl">
                  <AlertTriangle size={28} />
                </div>
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors text-gray-400"
                >
                  <X size={24} />
                </button>
              </div>

              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">{t('profile.settings.delete_modal_title')}</h2>
              <p className="text-gray-500 font-medium mb-8 leading-relaxed">
                {t('profile.settings.delete_modal_desc', "This action is permanent.")}
              </p>

              <form onSubmit={handleDeleteAccount} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1 flex items-center gap-2">
                    <Lock size={14} /> {t('profile.settings.delete_confirm_pass')}
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t('profile.settings.delete_pass_placeholder')}
                    className="w-full px-6 py-4 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-bold text-gray-800 dark:text-slate-100"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="flex-1 py-4 px-6 bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-slate-400 font-bold rounded-2xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-all"
                  >
                    {t('profile.settings.delete_keep_btn')}
                  </button>
                  <button
                    type="submit"
                    disabled={isDeleting}
                    className="flex-1 py-4 px-6 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-700 transition-all shadow-lg shadow-red-200 flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isDeleting && <Loader />}
                    {t('profile.settings.delete_confirm_btn')}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SettingsContent;
