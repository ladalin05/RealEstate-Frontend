import { useState, useMemo } from "react";
import { Facebook, Google } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { AuthService } from "../../services/auth.service";

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  agreeTerms: boolean;
}

type PasswordStrength = "weak" | "fair" | "good" | "strong" | null;

const getPasswordStrength = (password: string): PasswordStrength => {
  if (!password) return null;
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 1) return "weak";
  if (score === 2) return "fair";
  if (score === 3) return "good";
  return "strong";
};

const strengthConfig: Record<
  NonNullable<PasswordStrength>,
  { label: string; barColor: string; textColor: string; bars: number }
> = {
  weak:   { label: "Weak",   barColor: "bg-red-400",    textColor: "text-red-500",    bars: 1 },
  fair:   { label: "Fair",   barColor: "bg-amber-400",  textColor: "text-amber-500",  bars: 2 },
  good:   { label: "Good",   barColor: "bg-green-500",  textColor: "text-green-600",  bars: 3 },
  strong: { label: "Strong", barColor: "bg-blue-600", textColor: "text-blue-700", bars: 4 },
};

const RegisterPage = () => {

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    if (!formData.agreeTerms) {
      setError("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }
    try {
      const result = await AuthService.registerUser(formData);
      if (result.status == "success") {
        setSuccessMessage("Account created! Redirecting...");
        window.location.href = "/";
      } else {
        setError(result.message);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-30">
      <div className="w-full max-w-3xl flex rounded-2xl overflow-hidden border border-blue-100 shadow-xl shadow-blue-100/60">

        {/* Left Panel */}
        <div className="hidden md:flex flex-col justify-center w-52 flex-shrink-0 bg-blue-700 p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              welcome<span className="text-blue-300">.</span>
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-blue-400 mt-1">
              Access your portal
            </p>
          </div>
          <ul className="space-y-3">
            {[
              "Free forever plan",
              "No credit card needed",
              "Setup in 2 minutes",
              "Cancel anytime",
            ].map((f) => (
              <li key={f} className="flex items-center gap-2.5">
                <span className="w-4 h-4 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 10" stroke="currentColor" strokeWidth={2.5}>
                    <polyline points="2,5 4,8 8,2" />
                  </svg>
                </span>
                <span className="text-[11px] text-blue-200">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-white p-8">
          <h2 className="text-xl font-extrabold text-[#1e1b2e] tracking-tight mb-1">
            Create account
          </h2>
          <p className="text-xs text-blue-400 mb-6">
            Start your free workspace today
          </p>

          {successMessage && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-xs rounded-xl p-3 mb-4">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              {successMessage}
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl p-3 mb-4">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name row */}
            <div className="grid grid-cols-2 gap-3">
              {(["firstName", "lastName"] as const).map((field) => (
                <div key={field}>
                  <label className="block text-[10px] uppercase tracking-widest text-blue-500 font-bold mb-1.5">
                    {field === "firstName" ? "First name" : "Last name"}
                  </label>
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    <input
                      type="text"
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      placeholder={field === "firstName" ? "Jane" : "Doe"}
                      required
                      disabled={isLoading}
                      className="w-full bg-blue-50 border-[1.5px] border-blue-100 rounded-xl pl-9 pr-4 py-2.5 text-sm text-[#1e1b2e] placeholder-blue-300 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 focus:bg-white transition-all disabled:opacity-50"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Email */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-blue-500 font-bold mb-1.5">
                Email
              </label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  disabled={isLoading}
                  className="w-full bg-blue-50 border-[1.5px] border-blue-100 rounded-xl pl-9 pr-4 py-2.5 text-sm text-[#1e1b2e] placeholder-blue-300 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 focus:bg-white transition-all disabled:opacity-50"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-blue-500 font-bold mb-1.5">
                Password
              </label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min. 8 characters"
                  required
                  minLength={8}
                  disabled={isLoading}
                  className="w-full bg-blue-50 border-[1.5px] border-blue-100 rounded-xl pl-9 pr-10 py-2.5 text-sm text-[#1e1b2e] placeholder-blue-300 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 focus:bg-white transition-all disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 hover:text-blue-500 transition-colors"
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
                            : "bg-blue-100"
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
                className="mt-0.5 w-3.5 h-3.5 rounded border-blue-200 bg-blue-50 accent-blue-600 flex-shrink-0"
              />
              <span className="text-[11px] text-blue-500 leading-relaxed">
                I agree to the{" "}
                <Link to="/terms" className="text-blue-700 hover:text-blue-900 font-bold transition-colors">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-blue-700 hover:text-blue-900 font-bold transition-colors">
                  Privacy Policy
                </Link>
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading || !!successMessage}
              className="w-full bg-blue-700 hover:bg-blue-800 active:scale-[0.99] text-white font-bold text-sm py-2.5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed tracking-wide"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>
                  Creating account…
                </span>
              ) : (
                "Create account →"
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-blue-100" />
              <span className="text-[10px] text-blue-300 font-semibold tracking-widest uppercase">or sign up with</span>
              <div className="flex-1 h-px bg-blue-100" />
            </div>

            {/* OAuth */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Google", icon: <Google /> },
                { label: "Facebook", icon: <Facebook /> },
              ].map(({ label, icon }) => (
                <button
                  key={label}
                  type="button"
                  className="flex items-center justify-center gap-2 border-[1.5px] border-blue-100 bg-blue-50 hover:border-blue-400 hover:bg-white text-blue-700 text-xs font-semibold py-2.5 rounded-xl transition-all"
                >
                  {icon}
                  {label}
                </button>
              ))}
            </div>

            <p className="text-center text-xs text-blue-400">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-700 hover:text-blue-900 font-bold transition-colors">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;