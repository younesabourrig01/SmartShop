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
      toast.error("Please enter your password to confirm");
      return;
    }
    
    setIsDeleting(true);
    const toastId = toast.loading("Processing your request...");
    
    try {
      await deleteAccount({ password });
      toast.success("Account deleted successfully", { id: toastId });
      clearAuth();
      setIsDeleteModalOpen(false);
      navigate("/register");
    } catch (error: any) {
      console.error("Delete account error:", error);
      const errorMessage = error.response?.data?.message || "Failed to delete account. Please check your password.";
      toast.error(errorMessage, { id: toastId });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-76px)] bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate(backPath)}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors mb-6 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold">{backLabel}</span>
        </button>

        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">{t('profile.settings.title', 'Account Settings')}</h1>
          <p className="text-gray-500 mt-2">{t('profile.settings.subtitle', 'Manage your account preferences and security.')}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Update Account Card */}
          <div 
            onClick={() => setIsProfileModalOpen(true)}
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <User size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t('profile.settings.update_title', 'Update Profile')}</h3>
            <p className="text-gray-500 text-sm mb-4 leading-relaxed">
              {t('profile.settings.update_desc', 'Change your personal information, email address, and profile picture.')}
            </p>
            <button className="text-blue-600 font-bold text-sm hover:underline">
              {t('profile.settings.update_btn', 'Edit Information')}
            </button>
          </div>

          {/* Delete Account Card */}
          <div 
            onClick={() => setIsDeleteModalOpen(true)}
            className="bg-white p-6 rounded-3xl border border-red-50 shadow-sm hover:shadow-red-50 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-red-600 group-hover:text-white transition-colors">
              <Trash2 size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t('profile.settings.delete_title', 'Delete Account')}</h3>
            <p className="text-gray-500 text-sm mb-4 leading-relaxed">
              {t('profile.settings.delete_desc', 'Permanently remove your account and all your data. This action cannot be undone.')}
            </p>
            <button className="text-red-600 font-bold text-sm hover:underline">
              {t('profile.settings.delete_btn', 'Delete Account')}
            </button>
          </div>
        </div>
      </div>

      {/* Profile Update Modal */}
      <ProfileForm 
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        title="Edit Information"
        initialData={{
            name: user?.name,
            email: user?.email,
            image: user?.image
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
              className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden p-8"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-red-50 text-red-600 rounded-xl">
                  <AlertTriangle size={28} />
                </div>
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
                >
                  <X size={24} />
                </button>
              </div>

              <h2 className="text-2xl font-black text-gray-900 mb-2">Delete Account?</h2>
              <p className="text-gray-500 font-medium mb-8 leading-relaxed">
                This action is <span className="text-red-600 font-bold">permanent</span>. All your data, including orders and profile information, will be erased forever. There is no way to restore it.
              </p>

              <form onSubmit={handleDeleteAccount} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1 flex items-center gap-2">
                    <Lock size={14} /> Confirm Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-bold text-gray-800"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="flex-1 py-4 px-6 bg-gray-50 text-gray-500 font-bold rounded-2xl hover:bg-gray-100 transition-all"
                  >
                    Keep Account
                  </button>
                  <button
                    type="submit"
                    disabled={isDeleting}
                    className="flex-1 py-4 px-6 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-700 transition-all shadow-lg shadow-red-200 flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isDeleting && <Loader />}
                    Delete Forever
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
