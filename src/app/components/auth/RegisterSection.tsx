// components/auth/RegisterSection.tsx
import { useState, useMemo } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Link } from "react-router-dom";
import { AuthService } from "../../services/auth.service";
import GoogleLoginButton from "./GoogleLoginButton";
import { AuthAnimation } from "../ui/AuthAnimation";
import { useTranslation } from "react-i18next";
import { getPasswordStrength } from "../../utils/helper";
import logo from "../../../assets/win-realty-white-logo.png";

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  agreeTerms: boolean;
}

const strengthConfig: Record<NonNullable<"weak" | "fair" | "good" | "strong" | null>, { label: string; barColor: string; textColor: string; bars: number }> = {
  weak:   { label: "Weak",   barColor: "bg-red-400",   textColor: "text-red-500",   bars: 1 },
  fair:   { label: "Fair",   barColor: "bg-amber-400", textColor: "text-amber-500", bars: 2 },
  good:   { label: "Good",   barColor: "bg-[#3ba9c9]", textColor: "text-[#2b8ba8]", bars: 3 },
  strong: { label: "Strong", barColor: "bg-[#0d1b2a]", textColor: "text-[#0d1b2a]", bars: 4 },
};

export const RegisterSection = () => {
  const { t } = useTranslation();
  const [authStatus, setAuthStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    agreeTerms: false,
  });

  const strength = useMemo(
    () => getPasswordStrength(formData.password),
    [formData.password]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreeTerms) {
      setError("Please agree to the Terms of Service and Privacy Policy.");
      setAuthStatus("error");
      return;
    }

    setAuthStatus("loading");
    setError(null);

    try {
      const result = await AuthService.registerUser(formData);
      if (result.status === "success") {
        setAuthStatus("done");
      } else {
        setError(result.message || "Registration failed.");
        setAuthStatus("error");
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setAuthStatus("error");
    }
  };

  return (
    <div className="w-full max-w-3xl grid md:grid-cols-2 rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(15,23,42,0.15)] bg-white">

      {authStatus === "loading" && <AuthAnimation variant="login" status="loading" />}
      {authStatus === "done" && (
        <AuthAnimation
          variant="login"
          status="done"
          message="Account created! Redirecting…"
          onDone={() => { window.location.href = "/"; }}
        />
      )}
      {authStatus === "error" && (
        <AuthAnimation
          variant="login"
          status="error"
          message={error || "Registration failed"}
          onDone={() => setAuthStatus("idle")}
        />
      )}

      {/* Left Panel */}
      <div className="hidden md:flex flex-col justify-between relative bg-[#0d1b2a] p-10 overflow-hidden">
        <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[#f2a541]/10" />
        <div className="absolute bottom-6 -left-8 w-28 h-28 rounded-full bg-cyan-400/10" />

        <div className="relative z-10 flex items-center gap-2">
          <img src={logo} alt="WIN Realty" className="w-34 h-auto" />
        </div>
        <div className="relative w-full z-10 mb-8">
          <h1 className="text-2xl font-extrabold text-white leading-tight mb-3">
            {t("auth.join_us") || "Join WIN Realty."}<br />
            {t("auth.start_searching") || "Start your search today."}
          </h1>
          <p className="text-sm text-slate-300 max-w-xs">
                {t("auth.register_tagline") || "Create a free account to save your favorite listings, connect with agents, and get updates on new properties."}
            </p>
        </div>
        <ul className="relative z-10 space-y-3">
          {[
            t("auth.free_forever_plan") || "Free to join, always",
            t("auth.save_favorite_listings") || "Save your favorite listings",
            t("auth.connect_with_agents") || "Message agents directly",
            t("auth.get_new_listing_alerts") || "Get alerts on new listings",
          ].map((f) => (
            <li key={f} className="flex items-center gap-2.5">
              <span className="w-4 h-4 rounded-full bg-[#f2a541]/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-2.5 h-2.5 text-[#f2a541]" fill="none" viewBox="0 0 10 10" stroke="currentColor" strokeWidth={2.5}>
                  <polyline points="2,5 4,8 8,2" />
                </svg>
              </span>
              <span className="text-[11px] text-slate-300">{f}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Panel */}
      <div className="flex-1 bg-white p-8">
        <h2 className="text-xl font-extrabold text-[#0d1b2a] tracking-tight mb-1">
          {t('auth.create_account')}
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          {t('auth.subtitle')}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name row */}
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
            {(["firstName", "lastName"] as const).map((field) => (
              <div key={field}>
                <label className="block text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1.5">
                  {field === "firstName" ? t('auth.first_name') : t('auth.last_name')}
                </label>
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    placeholder={field === "firstName" ? "Jane" : "Doe"}
                    required
                    disabled={authStatus === "loading"}
                    className="w-full bg-slate-50 border-[1.5px] border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-[#0d1b2e] placeholder-slate-400 focus:outline-none focus:border-[#0d1b2a] focus:ring-2 focus:ring-[#0d1b2a]/10 focus:bg-white transition-all disabled:opacity-50"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Email */}
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1.5">
              {t('auth.email')}
            </label>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                disabled={authStatus === "loading"}
                className="w-full bg-slate-50 border-[1.5px] border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-[#0d1b2e] placeholder-slate-400 focus:outline-none focus:border-[#0d1b2a] focus:ring-2 focus:ring-[#0d1b2a]/10 focus:bg-white transition-all disabled:opacity-50"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1.5">
              {t('auth.password')}
            </label>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Min. 8 characters"
                required
                minLength={8}
                disabled={authStatus === "loading"}
                className="w-full bg-slate-50 border-[1.5px] border-slate-200 rounded-xl pl-9 pr-10 py-2.5 text-sm text-[#0d1b2e] placeholder-slate-400 focus:outline-none focus:border-[#0d1b2a] focus:ring-2 focus:ring-[#0d1b2a]/10 focus:bg-white transition-all disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0d1b2a] transition-colors"
              >
                {showPassword ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                )}
              </button>
            </div>

            {/* Strength meter */}
            {formData.password && strength && (
              <div className="mt-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((n) => (
                    <div
                      key={n}
                      className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                        n <= strengthConfig[strength].bars
                          ? strengthConfig[strength].barColor
                          : "bg-slate-200"
                      }`}
                    />
                  ))}
                </div>
                <p className={`text-[10px] mt-1 font-semibold ${strengthConfig[strength].textColor}`}>
                  {strengthConfig[strength].label} password
                </p>
              </div>
            )}
          </div>

          {/* Terms */}
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="mt-0.5 w-3.5 h-3.5 rounded border-slate-300 accent-[#0d1b2a] flex-shrink-0"
            />
            <span className="text-[11px] text-slate-500 leading-relaxed">
              {t('auth.agree')}{" "}
              <Link to="/terms" className="text-[#0d1b2a] hover:text-[#f2a541] font-bold transition-colors">
                {t('terms')}
              </Link>{" "}
              {t('auth.and')}{" "}
              <Link to="/privacy" className="text-[#0d1b2a] hover:text-[#f2a541] font-bold transition-colors">
                {t('auth.policy')}
              </Link>
            </span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={authStatus === "loading" || authStatus === "done"}
            className="w-full bg-[#0d1b2a] hover:bg-[#16283d] active:scale-[0.99] text-white font-bold text-sm py-2.5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed tracking-wide"
          >
            {authStatus === "loading" ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>
                {t('auth.create_account')}…
              </span>
            ) : (
              `${t('auth.create_account')} →`
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-[10px] text-slate-400 font-semibold tracking-widest uppercase">{t('auth.or_sign_in_with')}</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* OAuth */}
          <div className="grid grid-cols-1 gap-2">
            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
              <GoogleLoginButton />
            </GoogleOAuthProvider>
          </div>

          <p className="text-center text-xs text-slate-500">
            {t('auth.already_have_acc')}{" "}
            <Link to="/login" className="text-[#0d1b2a] hover:text-[#f2a541] font-bold transition-colors">
              {t('auth.sign_in')}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};