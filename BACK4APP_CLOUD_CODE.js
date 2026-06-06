/**
 * BACK4APP CLOUD CODE FOR OTP VIA WASENDER
 * 
 * Please copy and paste this code into your Back4App 'Cloud Code' -> 'main.js' file.
 * Ensure you have added your WASENDER_API_KEY and WASENDER_INSTANCE_ID 
 * in the Back4App App Settings -> Server Settings -> Core Settings -> Environment Variables,
 * OR replace the process.env placeholders with the actual strings.
 */

Parse.Cloud.define("requestOTP", async (request) => {
  const { phoneNumber, type } = request.params;

  if (!phoneNumber) {
    throw new Parse.Error(400, "Phone number is required");
  }

  // Generate a random 6-digit code
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  // Save the code temporarily or use a specific format
  const OtpToken = Parse.Object.extend("OtpToken");
  
  // Optional: Invalidate existing tokens for this phone
  const query = new Parse.Query(OtpToken);
  query.equalTo("phoneNumber", phoneNumber);
  const existingTokens = await query.find({ useMasterKey: true });
  if (existingTokens.length > 0) {
    await Parse.Object.destroyAll(existingTokens, { useMasterKey: true });
  }

  const token = new OtpToken();
  token.set("phoneNumber", phoneNumber);
  token.set("code", code);
  token.set("type", type);
  token.set("expiresAt", new Date(Date.now() + 10 * 60 * 1000)); // 10 minutes expiry
  await token.save(null, { useMasterKey: true });

  // ----------------------------------------------------
  // Send OTP via WASender
  // ----------------------------------------------------
  
  // Format number for Wasender (Assuming Iraqi +964)
  let cleaned = phoneNumber.replace(/\D/g, '');
  let formattedNumber = cleaned;
  if (cleaned.startsWith('07')) {
    formattedNumber = '964' + cleaned.substring(1);
  } else if (cleaned.startsWith('7')) {
    formattedNumber = '964' + cleaned;
  } else if (!cleaned.startsWith('964')) {
    formattedNumber = '964' + cleaned;
  }

  let message = "";
  if (type === "signup") {
    message = `مرحباً بك في منصة محلك! رمز التحقق الخاص بك هو: ${code}. لا تشارك هذا الرمز مع أي شخص.`;
  } else if (type === "forgot") {
    message = `مرحباً! رمز إعادة تعيين كلمة المرور في منصة محلك هو: ${code}. هذا الرمز صالح لمدة 10 دقائق فقط.`;
  } else {
    message = `رمز التحقق الخاص بك هو: ${code}`;
  }

  const WAS_API_KEY = process.env.VITE_WASENDER_API_KEY || "61af7f2a07544f59a208444cf80d5ce717be01ad0b571a13a4f9c3ab5209af21";
  const WAS_INSTANCE_ID = process.env.VITE_WASENDER_INSTANCE_ID || "83337";
  
  try {
    const axios = require('axios');
    const response = await axios.post("https://wasenderapi.com/api/send-message", {
      whatsapp_session: WAS_INSTANCE_ID,
      to: formattedNumber,
      text: message
    }, {
      headers: {
        'Authorization': `Bearer ${WAS_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    return { success: true, message: "OTP sent via WASender" };
  } catch (error) {
    let errorDetails = "Unknown error";
    if (error.response && error.response.data) {
       errorDetails = JSON.stringify(error.response.data);
    } else if (error.message) {
       errorDetails = error.message;
    }
    console.error("WASender Error Details:", errorDetails);
    throw new Parse.Error(500, `Failed to send OTP via WhatsApp. Details: ${errorDetails}`);
  }
});

Parse.Cloud.define("verifyOTP", async (request) => {
  const { phoneNumber, code } = request.params;

  if (!phoneNumber || !code) {
    throw new Parse.Error(400, "Phone number and code are required");
  }

  const OtpToken = Parse.Object.extend("OtpToken");
  const query = new Parse.Query(OtpToken);
  query.equalTo("phoneNumber", phoneNumber);
  query.equalTo("code", code);
  query.greaterThan("expiresAt", new Date()); // Must not be expired
  
  const token = await query.first({ useMasterKey: true });

  if (token) {
    // Valid OTP - clean it up so it can't be reused
    await token.destroy({ useMasterKey: true });
    return { success: true, message: "Valid OTP" };
  } else {
    throw new Parse.Error(400, "Invalid or expired OTP");
  }
});
