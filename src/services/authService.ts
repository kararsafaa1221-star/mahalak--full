import axios from "axios";

// Environment variables from Vite
const APP_ID = import.meta.env.VITE_BACK4APP_APP_ID || "";
const JS_KEY = import.meta.env.VITE_BACK4APP_JS_KEY || "";
const PARSE_SERVER_URL = import.meta.env.VITE_API_BASE_URL || "https://parseapi.back4app.com";

const axiosInstance = axios.create({
  baseURL: PARSE_SERVER_URL,
  headers: {
    "X-Parse-Application-Id": APP_ID,
    "X-Parse-JavaScript-Key": JS_KEY,
    "Content-Type": "application/json",
  },
});

export const authService = {
  /**
   * Requests an OTP to be sent via WhatsApp (WASender via Back4App)
   */
  async requestOTP(phoneNumber: string, type: "signup" | "forgot" | "login" = "signup"): Promise<boolean> {
    try {
      console.log(`🚀 Requesting OTP via Back4App for ${phoneNumber} (${type})...`);
      
      const response = await axiosInstance.post("/functions/requestOTP", {
        phoneNumber,
        type,
      });

      if (response.data?.result?.success || response.data?.result === true) {
        console.log("✅ OTP successfully requested via Back4App");
        return true;
      }
      
      return !!response.data?.result;
    } catch (error: any) {
      console.error("❌ Failed to request OTP via Back4App:", error.response?.data || error.message);
      
      const errorData = error.response?.data;
      if (errorData?.code === 141 && errorData?.error?.includes("Invalid function")) {
        throw new Error("وظيفة OTP غير موجودة على سيرفر Back4App. يرجى نسخ الكود من ملف BACK4APP_CLOUD_CODE.js ولصقه في إعدادات Cloud Code في Back4App.");
      }
      if (errorData?.code === 500 && errorData?.error?.includes("Failed to send OTP via WhatsApp")) {
        throw new Error("فشل إرسال رسالة الواتس اب. التفاصيل من السيرفر: " + errorData?.error);
      }
      
      throw new Error(errorData?.error || "حدث خطأ أثناء طلب رمز التحقق. يرجى المحاولة مرة أخرى.");
    }
  },

  /**
   * Validates the entered OTP code against Back4App
   */
  async verifyOTP(phoneNumber: string, code: string): Promise<boolean> {
    try {
      console.log(`🔐 Verifying OTP via Back4App for ${phoneNumber}...`);
      
      const response = await axiosInstance.post("/functions/verifyOTP", {
        phoneNumber,
        code,
      });

      if (response.data?.result?.success || response.data?.result === true) {
        console.log("✅ OTP verified successfully via Back4App");
        return true;
      }
      
      return false;
    } catch (error: any) {
      console.error("❌ Failed to verify OTP via Back4App:", error.response?.data || error.message);
      
      const errorData = error.response?.data;
      if (errorData?.code === 141 && errorData?.error?.includes("Invalid function")) {
        throw new Error("وظيفة التحقق غير موجودة. يرجى تهيئة Back4App باستخدام ملف BACK4APP_CLOUD_CODE.js");
      }
      
      throw new Error(errorData?.error || "رمز التحقق غير صحيح أو انتهت صلاحيته.");
    }
  }
};
