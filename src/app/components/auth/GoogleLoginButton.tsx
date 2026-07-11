// components/auth/GoogleLoginButton.tsx
import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useTranslation } from "react-i18next";
import { AuthService } from "../../services/auth.service";
import { AuthAnimation } from "../ui/AuthAnimation";
import { Google } from "react-bootstrap-icons";

const GoogleLoginButton = () => {
  const { t } = useTranslation();
  const [authStatus, setAuthStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setAuthStatus("loading");
      setError(null);
      try {
        const result = await AuthService.googleLogin(tokenResponse.access_token);
        if (result.status === "success") {
          setAuthStatus("done");
        } else {
          setError(result.message || "Google login failed.");
          setAuthStatus("error");
        }
      } catch (err) {
        console.error("Google Login Error:", err);
        setError("Something went wrong. Please try again.");
        setAuthStatus("error");
      }
    },
    onError: () => {
      setError("Google login failed.");
      setAuthStatus("error");
    },
  });

  return (
    <>
      {authStatus === "loading" && (
        <AuthAnimation variant="login" status="loading" />
      )}
      {authStatus === "done" && (
        <AuthAnimation
          variant="login"
          status="done"
          message="Welcome back!"
          onDone={() => { window.location.href = "/"; }}
        />
      )}
      {authStatus === "error" && (
        <AuthAnimation
          variant="login"
          status="error"
          message={error || "Login failed"}
          onDone={() => setAuthStatus("idle")}
        />
      )}

      <button
        onClick={() => googleLogin()}
        type="button"
        disabled={authStatus === "loading"}
        className="flex items-center w-full justify-center gap-2 border-[1.5px] border-slate-200 bg-slate-50 hover:border-[#0d1b2a] hover:bg-white text-[#0d1b2a] text-xs font-semibold py-2.5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Google className="w-5 h-5" />
        <span className="font-medium">{t('auth.login_with_google')}</span>
      </button>
    </>
  );
};

export default GoogleLoginButton;