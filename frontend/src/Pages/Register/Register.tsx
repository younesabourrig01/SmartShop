/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  User,
  Mail,
  Lock,
  ShieldCheck,
  Image as ImageIcon,
  ArrowLeft,
  X,
  CheckCircle2,
} from "lucide-react";
import { sendOtp, registerUser } from "../../api/auth";
import toast from "react-hot-toast";

interface FormData {
  name: string;
  email: string;
  otp: string;
  password: string;
  confirmPassword: string;
  image: File | null;
}

const Register: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
    image: null,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name) {
      newErrors.name = t("register_page.errors.name_req");
    } else if (formData.name.length < 3) {
      newErrors.name = t("register_page.errors.name_min");
    }

    if (!formData.email) {
      newErrors.email = t("register_page.errors.email_req");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("register_page.errors.email_inv");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.otp) {
      newErrors.otp = t("register_page.errors.otp_req");
    }
    if (!formData.password) {
      newErrors.password = t("register_page.errors.pass_req");
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t("register_page.errors.pass_match");
    }

    if (formData.image) {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedTypes.includes(formData.image.type)) {
        newErrors.image = t("register_page.errors.img_type");
      } else if (formData.image.size > 2048 * 1024) {
        newErrors.image = t("register_page.errors.img_size");
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // handle send otp after validate the first step
  const handelSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      try {
        const res = await sendOtp({
          name: formData.name,
          email: formData.email,
        });
        toast.success(res.data.message);
        console.log(res.data);
        setStep(2);
        setErrors({});
      } catch (error: any) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    }
  };

  const handleBack = () => {
    setStep(1);
    setErrors({});
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, image: file });
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  // submit data
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep2()) {
      try {
        const res = await registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          otp: formData.otp,
        });

        console.log(res.data);

        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const isRtl = i18n.language === "ar";

  return (
    <div
      className={`flex items-center justify-center bg-slate-50 p-4 md:p-8 py-12 md:py-20 ${isRtl ? "rtl" : "ltr"}`}
    >
      {/* Background blobs for depth */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl shadow-blue-200/50 overflow-hidden flex flex-col md:flex-row min-h-150"
      >
        <Link
          to="/"
          className={`absolute top-6 ${isRtl ? "right-6" : "left-6"} z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full text-slate-400 hover:text-blue-600 hover:shadow-lg transition-all active:scale-95 md:hidden`}
        >
          <X size={20} />
        </Link>

        {/* Left Side: Message Panel */}
        <div className="w-full md:w-5/12 bg-blue-600 relative overflow-hidden flex flex-col justify-center p-8 md:p-12 text-white">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat" />
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-900/40 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1-text"
                  initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isRtl ? -20 : 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                    {t("register_page.welcome")}{" "}
                    <span className="text-blue-200">SmartShop</span>
                  </h1>
                  <p className="text-lg text-blue-100 mb-8 font-light">
                    {t("register_page.welcome_desc")}
                  </p>
                  <div className="flex items-start gap-4 p-4 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20">
                    <ShieldCheck
                      className="text-blue-200 shrink-0 mt-1"
                      size={24}
                    />
                    <div className={isRtl ? "text-right" : "text-left"}>
                      <h3 className="font-semibold text-white mb-1">
                        {t("register_page.email_verify")}
                      </h3>
                      <p className="text-sm text-blue-100 opacity-90">
                        {t("register_page.email_verify_desc")}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="step2-text"
                  initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isRtl ? -20 : 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                    {t("register_page.check_inbox")}{" "}
                    <span className="text-blue-200">
                      {t("register_page.inbox")}
                    </span>
                  </h1>
                  <p className="text-lg text-blue-100 mb-8 font-light">
                    {t("register_page.check_inbox_desc")}{" "}
                    <span className="font-bold text-white underline underline-offset-4">
                      {formData.email}
                    </span>
                    .
                  </p>
                  <div className="flex items-start gap-4 p-4 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20">
                    <Mail className="text-blue-200 shrink-0 mt-1" size={24} />
                    <div className={isRtl ? "text-right" : "text-left"}>
                      <h3 className="font-semibold text-white mb-1">
                        {t("register_page.verify_account")}
                      </h3>
                      <p className="text-sm text-blue-100 opacity-90">
                        {t("register_page.verify_account_desc")}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-auto relative z-10 pt-12 hidden md:block">
            <div className="flex gap-2">
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${step === 1 ? "w-8 bg-white" : "w-2 bg-white/30"}`}
              />
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${step === 2 ? "w-8 bg-white" : "w-2 bg-white/30"}`}
              />
            </div>
            <Link
              to="/"
              className={`mt-8 inline-flex items-center gap-2 text-blue-100 hover:text-white transition-colors`}
            >
              {isRtl ? (
                <ArrowLeft size={18} className="rotate-180" />
              ) : (
                <ArrowLeft size={18} />
              )}
              <span>{t("register_page.back_to_shop")}</span>
            </Link>
          </div>
        </div>

        {/* Right Side: Form Panel */}
        <div className="w-full md:w-7/12 p-8 md:p-16 flex flex-col justify-center bg-white">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1-form"
                initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <div className={`mb-10 ${isRtl ? "text-right" : "text-left"}`}>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    {t("register_page.create_account")}
                  </h2>
                  <p className="text-slate-500">{t("register_page.step_1")}</p>
                </div>

                <div className="space-y-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label
                      className={`text-sm font-semibold text-slate-700 flex items-center gap-2 ${isRtl ? "flex-row-reverse" : ""}`}
                    >
                      <User size={16} className="text-blue-500" />
                      {t("register_page.full_name")}
                    </label>
                    <input
                      type="text"
                      dir={isRtl ? "rtl" : "ltr"}
                      className={`w-full px-4 py-4 rounded-xl border transition-all outline-none ${
                        errors.name
                          ? "border-red-500 bg-red-50"
                          : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-slate-50"
                      }`}
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                    {errors.name && (
                      <p
                        className={`text-xs text-red-500 font-medium ${isRtl ? "text-right" : "text-left"} pl-1 pt-1`}
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label
                      className={`text-sm font-semibold text-slate-700 flex items-center gap-2 ${isRtl ? "flex-row-reverse" : ""}`}
                    >
                      <Mail size={16} className="text-blue-500" />
                      {t("register_page.email_address")}
                    </label>
                    <input
                      type="email"
                      dir="ltr"
                      className={`w-full px-4 py-4 rounded-xl border transition-all outline-none ${isRtl ? "text-right" : "text-left"} ${
                        errors.email
                          ? "border-red-500 bg-red-50"
                          : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-slate-50"
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

                  <div
                    className={`pt-4 flex flex-col sm:flex-row gap-4 ${isRtl ? "sm:flex-row-reverse" : ""}`}
                  >
                    <button
                      onClick={handelSendOtp}
                      className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none"
                    >
                      {t("register_page.next_step")}
                    </button>
                    <Link
                      to="/"
                      className="flex-1 border-2 border-slate-200 text-slate-600 py-4 rounded-xl font-bold hover:bg-slate-50 text-center transition-all"
                    >
                      {t("register_page.cancel")}
                    </Link>
                  </div>

                  <div className="pt-6 text-center">
                    <p className="text-slate-500 text-sm">
                      {t("register_page.already_have_account")}{" "}
                      <Link
                        to="/login"
                        className="text-blue-600 font-bold hover:underline transition-all"
                      >
                        {t("register_page.login_here")}
                      </Link>
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="step2-form"
                initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <div className={`mb-8 ${isRtl ? "text-right" : "text-left"}`}>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    {t("register_page.final_step")}
                  </h2>
                  <p className="text-slate-500">
                    {t("register_page.complete_profile")}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div
                    className={`grid grid-cols-2 gap-4 ${isRtl ? "text-right" : "text-left"}`}
                  >
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {t("register_page.name_label")}
                      </label>
                      <div className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 text-sm font-medium">
                        {formData.name}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {t("register_page.email_label")}
                      </label>
                      <div className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 text-sm font-medium truncate">
                        {formData.email}
                      </div>
                    </div>
                  </div>

                  {/* OTP Input */}
                  <div className="space-y-2">
                    <label
                      className={`text-sm font-semibold text-slate-700 flex items-center gap-2 ${isRtl ? "flex-row-reverse" : ""}`}
                    >
                      <ShieldCheck size={16} className="text-blue-500" />
                      {t("register_page.otp")}
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      dir="ltr"
                      className={`w-full px-4 py-3 rounded-xl border text-center text-2xl tracking-[0.5em] font-bold outline-none transition-all ${
                        errors.otp
                          ? "border-red-500 bg-red-50"
                          : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-slate-50"
                      }`}
                      placeholder="000000"
                      value={formData.otp}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          otp: e.target.value.replace(/\D/g, ""),
                        })
                      }
                    />
                    {errors.otp && (
                      <p
                        className={`text-xs text-red-500 font-medium ${isRtl ? "text-right" : "text-left"} pl-1 pt-1`}
                      >
                        {errors.otp}
                      </p>
                    )}
                  </div>

                  {/* Password Input */}
                  <div className="space-y-2">
                    <label
                      className={`text-sm font-semibold text-slate-700 flex items-center gap-2 ${isRtl ? "flex-row-reverse" : ""}`}
                    >
                      <Lock size={16} className="text-blue-500" />
                      {t("register_page.password")}
                    </label>
                    <input
                      type="password"
                      dir="ltr"
                      className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${isRtl ? "text-right" : "text-left"} ${
                        errors.password
                          ? "border-red-500 bg-red-50"
                          : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-slate-50"
                      }`}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                    {errors.password && (
                      <p
                        className={`text-xs text-red-500 font-medium ${isRtl ? "text-right" : "text-left"} pl-1 pt-1`}
                      >
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password Input */}
                  <div className="space-y-2">
                    <label
                      className={`text-sm font-semibold text-slate-700 flex items-center gap-2 ${isRtl ? "flex-row-reverse" : ""}`}
                    >
                      <ShieldCheck size={16} className="text-blue-500" />
                      {t("register_page.confirm_password")}
                    </label>
                    <input
                      type="password"
                      dir="ltr"
                      className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${isRtl ? "text-right" : "text-left"} ${
                        errors.confirmPassword
                          ? "border-red-500 bg-red-50"
                          : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-slate-50"
                      }`}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                    {errors.confirmPassword && (
                      <p
                        className={`text-xs text-red-500 font-medium ${isRtl ? "text-right" : "text-left"} pl-1 pt-1`}
                      >
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  {/* Image Input */}
                  <div className="space-y-2">
                    <label
                      className={`text-sm font-semibold text-slate-700 flex items-center gap-2 ${isRtl ? "flex-row-reverse" : ""}`}
                    >
                      <ImageIcon size={16} className="text-blue-500" />
                      {t("register_page.profile_picture")}
                    </label>
                    <div
                      className={`flex items-center gap-4 ${isRtl ? "flex-row-reverse" : ""}`}
                    >
                      <div className="relative group shrink-0">
                        <div className="w-16 h-16 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden transition-all group-hover:border-blue-400">
                          {previewUrl ? (
                            <img
                              src={previewUrl}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <ImageIcon size={24} className="text-slate-400" />
                          )}
                        </div>
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/jpg"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          onChange={handleFileChange}
                        />
                      </div>
                      <div
                        className={`flex-1 ${isRtl ? "text-right" : "text-left"}`}
                      >
                        <p className="text-xs text-slate-500">
                          {t("register_page.img_specs")}
                        </p>
                        {formData.image && (
                          <div
                            className={`flex items-center gap-1 text-xs text-green-600 font-bold mt-1 ${isRtl ? "flex-row-reverse" : ""}`}
                          >
                            <CheckCircle2 size={12} />
                            <span className="truncate">
                              {formData.image.name}
                            </span>
                          </div>
                        )}
                        {errors.image && (
                          <p className="text-xs text-red-500 font-medium mt-1">
                            {errors.image}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col gap-3">
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-95"
                    >
                      {t("register_page.complete_registration")}
                    </button>
                    <button
                      type="button"
                      onClick={handleBack}
                      className={`w-full flex justify-center items-center gap-2 text-slate-500 font-bold py-2 hover:text-slate-800 transition-colors ${isRtl ? "flex-row-reverse" : ""}`}
                    >
                      {isRtl ? (
                        <ArrowLeft size={16} className="rotate-180" />
                      ) : (
                        <ArrowLeft size={18} />
                      )}
                      {t("register_page.go_back")}
                    </button>
                  </div>

                  <div className="pt-4 text-center">
                    <p className="text-slate-500 text-sm">
                      {t("register_page.already_have_account")}{" "}
                      <Link
                        to="/login"
                        className="text-blue-600 font-bold hover:underline transition-all"
                      >
                        {t("register_page.login_here")}
                      </Link>
                    </p>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
