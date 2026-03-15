import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-[calc(100vh-76px)] bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors mb-6 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold">{t('common.back', 'Back to Profile')}</span>
        </button>

        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">{t('profile.settings.title', 'Account Settings')}</h1>
          <p className="text-gray-500 mt-2">{t('profile.settings.subtitle', 'Manage your account preferences and security.')}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Update Account Card */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
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
          <div className="bg-white p-6 rounded-3xl border border-red-50 shadow-sm hover:shadow-red-50 hover:shadow-md transition-all cursor-pointer group">
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
    </div>
  );
};

export default Settings;
