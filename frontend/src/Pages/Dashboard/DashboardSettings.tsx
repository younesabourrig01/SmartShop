import React from "react";
import SettingsContent from "../../components/Account/SettingsContent";
import { useTranslation } from "react-i18next";

const DashboardSettings: React.FC = () => {
  const { t } = useTranslation();

  return (
    <SettingsContent 
      backLabel={t('common.back_to_dashboard', 'Back to Dashboard')} 
      backPath="/dashboard" 
    />
  );
};

export default DashboardSettings;
