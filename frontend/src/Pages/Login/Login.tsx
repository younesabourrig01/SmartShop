/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Mail, Lock, LogIn, ShieldCheck, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { login } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";

const Login: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.email) {
      newErrors.email = t("login_page.errors.email_req");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("login_page.errors.email_inv");
    }

    if (!formData.password) {
      newErrors.password = t("login_page.errors.pass_req");
    } else if (formData.password.length < 6) {
      newErrors.password = t("login_page.errors.pass_min");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      try {
        const res = await login({
          email: formData.email,
          password: formData.password,
        });

        const token = res.data.token;
        const user = res.data.user;

        setAuth(user, token);

        toast.success(res.data.message);
        setErrors({});

        if (user.role === "user") {
          navigate("/profile");
        } else {
          navigate("/dashboard");
        }
      } catch (error: any) {
        toast.error(error.response.data.message);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const isRtl = i18n.language === "ar";

  return (
    <div
      className={`flex items-center justify-center bg-slate-50 dark:bg-slate-800 p-4 md:p-8 py-12 md:py-20 ${isRtl ? "rtl" : "ltr"}`}
    >
      {/* Background blobs for depth */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl shadow-blue-200/50 overflow-hidden flex flex-col md:flex-row min-h-150"
      >
        {/* Left Side: Message Panel */}
        <div className="w-full md:w-5/12 bg-blue-600 relative overflow-hidden flex flex-col justify-center p-8 md:p-12 text-white">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat" />
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white dark:bg-slate-900/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-900/40 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              {t("login_page.welcome")}{" "}
              <span className="text-blue-200">SmartShop</span>
            </h1>
            <p className="text-lg text-blue-100 mb-8 font-light">
              {t("login_page.welcome_desc")}
            </p>
            <div className="flex items-start gap-4 p-4 bg-white/20 rounded-2xl backdrop-blur-md border border-white/30">
              <ShieldCheck className="text-blue-200 shrink-0 mt-1" size={24} />
              <div className={isRtl ? "text-right" : "text-left"}>
                <h3 className="font-semibold text-white mb-1">
                  {t("register_page.verify_account")}
                </h3>
                <p className="text-sm text-blue-100 opacity-90">
                  {t("register_page.verify_account_desc")}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-auto relative z-10 pt-12 hidden md:block">
            <Link
              to="/"
              className={`mt-8 inline-flex items-center gap-2 text-blue-100 hover:text-white transition-colors`}
            >
              {isRtl ? (
                <ArrowLeft size={18} className="rotate-180" />
              ) : (
                <ArrowLeft size={18} />
              )}
              <span>{t("login_page.back_to_home")}</span>
            </Link>
          </div>
        </div>

        {/* Right Side: Form Panel */}
        <div className="w-full md:w-7/12 p-8 md:p-16 flex flex-col justify-center bg-white dark:bg-slate-900">
          <div className={`mb-10 ${isRtl ? "text-right" : "text-left"}`}>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              {t("login_page.login_title")}
            </h2>
            <p className="text-slate-500 dark:text-slate-400">{t("login_page.sign_in_desc")}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label
                className={`text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2 ${isRtl ? "flex-row-reverse" : ""}`}
              >
                <Mail size={16} className="text-blue-500" />
                {t("login_page.email_address")}
              </label>
              <input
                type="email"
                dir="ltr"
                disabled={isLoading}
                className={`w-full px-4 py-4 rounded-xl border transition-all outline-none ${isRtl ? "text-right" : "text-left"} ${
                  errors.email
                    ? "border-red-500 bg-red-50"
                    : "border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-slate-50 dark:bg-slate-800"
                }`}
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              {errors.email && (
                <p
                  className={`text-xs text-red-500 font-medium ${isRtl ? "text-right" : "text-left"} pl-1 pt-1`}
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label
                className={`text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2 ${isRtl ? "flex-row-reverse" : ""}`}
              >
                <Lock size={16} className="text-blue-500" />
                {t("login_page.password")}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  dir="ltr"
                  className={`w-full px-4 py-4 rounded-xl border transition-all outline-none ${isRtl ? "text-right pl-12" : "text-left pr-12"} ${
                    errors.password
                      ? "border-red-500 bg-red-50"
                      : "border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-slate-50 dark:bg-slate-800"
                  }`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-500 p-2 transition-colors ${
                    isRtl ? "left-2" : "right-2"
                  }`}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p
                  className={`text-xs text-red-500 font-medium ${isRtl ? "text-right" : "text-left"} pl-1 pt-1`}
                >
                  {errors.password}
                </p>
              )}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:translate-y-0"
              >
                {isLoading ? <Loader /> : <LogIn size={20} />}
                {t("login_page.login_button")}
              </button>
            </div>

            <div className="pt-6 text-center">
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                {t("login_page.no_account")}{" "}
                <Link
                  to="/register"
                  className="text-blue-600 font-bold hover:underline transition-all"
                >
                  {t("login_page.register_link")}
                </Link>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
