import { useGoogleLogin } from "@react-oauth/google";
import { useTranslation } from "react-i18next";
import { AuthService } from "../../services/auth.service";
import { Google } from "react-bootstrap-icons";

const GoogleLoginButton = () => {
  const { t } = useTranslation();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const result = await AuthService.googleLogin(
          tokenResponse.access_token
        );
        if(result.status === "success"){
          window.location.href = "/";
        }
      } catch (error) {
        console.error("Google Login Error:", error);
      }
    },
    onError: () => {
      console.error("Google login failed");
    },
  });

  return (
    <button
      onClick={() => googleLogin()}
      type="button"
      className="flex items-center justify-center gap-2 border-[1.5px] border-blue-100 bg-blue-50 hover:border-blue-400 hover:bg-white text-blue-700 text-xs font-semibold py-2.5 rounded-xl transition-all"
    >
      <Google className="w-5 h-5" />
      <span className="font-medium">Login with Google</span>
    </button>
  );
};

export default GoogleLoginButton;