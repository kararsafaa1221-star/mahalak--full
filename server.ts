<<<<<<< HEAD
import dotenv from "dotenv";
dotenv.config();

=======
>>>>>>> 18fc01854c1e2793205673b08e1cfbea14a490ab
import express from "express";
import path from "path";
import axios from "axios";
import cors from "cors";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Health check for mobile APK debugging
  app.get("/api/otp/health", (req, res) => {
    res.json({ success: true, status: "Server is reachable", timestamp: new Date().toISOString() });
  });

<<<<<<< HEAD
  // API Route for OTP (Aligned with working Customer App logic)
  app.post("/api/otp", async (req, res) => {
    const { phone, text, message } = req.body;
    
    // User provided API key
    const WAS_API_KEY = process.env.WASENDER_ACCESS_TOKEN || "61af7f2a07544f59a208444cf80d5ce717be01ad0b571a13a4f9c3ab5209af21";
    const WAS_INSTANCE_ID = process.env.WASENDER_INSTANCE_ID || "83337";
    // Using standard send-message endpoint as working in Customer App
    const API_URL = 'https://wasenderapi.com/api/send-message';

    try {
      // Robust Iraq phone formatting (Same as Customer App)
=======
  // API Route for OTP
  app.post("/api/otp", async (req, res) => {
    const { phone, text } = req.body;
    
    // User provided API key: 61af7f2a07544f59a208444cf80d5ce717be01ad0b571a13a4f9c3ab5209af21
    // User provided Instance ID: 83337
    const WAS_API_KEY = process.env.WASENDER_ACCESS_TOKEN || "61af7f2a07544f59a208444cf80d5ce717be01ad0b571a13a4f9c3ab5209af21";
    const WAS_INSTANCE_ID = process.env.WASENDER_INSTANCE_ID || "83337";
    // Corrected Wasender API endpoint for sending texts
    const API_URL = 'https://wasenderapi.com/api/send-message';

    try {
      // Robust Iraq phone formatting
>>>>>>> 18fc01854c1e2793205673b08e1cfbea14a490ab
      let cleaned = phone.replace(/\D/g, '');
      let formattedNumber = cleaned;
      
      if (cleaned.startsWith('07')) {
        formattedNumber = '964' + cleaned.substring(1);
      } else if (cleaned.startsWith('7')) {
        formattedNumber = '964' + cleaned;
      } else if (!cleaned.startsWith('964')) {
        formattedNumber = '964' + cleaned;
      }

      console.log(`🚀 Sending OTP via Wasender to ${formattedNumber} (Session: ${WAS_INSTANCE_ID})`);

      // Correct payload format using 'to' and 'text' and 'whatsapp_session' 
<<<<<<< HEAD
      // exactly matching the Customer App structure
      const response = await axios.post(API_URL, {
        whatsapp_session: WAS_INSTANCE_ID,
        to: formattedNumber,
        text: text || message
=======
      // with Bearer Token auth
      const response = await axios.post(API_URL, {
        whatsapp_session: WAS_INSTANCE_ID,
        to: formattedNumber,
        text: text
>>>>>>> 18fc01854c1e2793205673b08e1cfbea14a490ab
      }, {
        headers: {
          'Authorization': `Bearer ${WAS_API_KEY}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        timeout: 15000
      });

      console.log('✅ Wasender Response:', response.data);
      res.json({ success: true, data: response.data });
    } catch (error: any) {
      const errorData = error.response?.data || error.message;
      console.error('❌ Wasender Error Details:', errorData);
      
      res.status(500).json({ 
        success: false, 
        error: errorData,
        hint: "تأكد من توافق إعدادات WASender مع هذا الرقم والتأكد من اشتغال الـ Instance"
      });
    }
  });

<<<<<<< HEAD
  // API Route for OneSignal Push (to bypass CORS)
  app.post("/api/onesignal", async (req, res) => {
    try {
      const { _restApiKey, ...payload } = req.body;
      const response = await axios.post('https://onesignal.com/api/v1/notifications', payload, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': `Basic ${_restApiKey}`
        }
      });
      res.json(response.data);
    } catch (error: any) {
      console.warn('OneSignal Push Warning (Likely invalid API Key or bad ID):', JSON.stringify(error.response?.data || error.message, null, 2));
      const status = error.response?.status === 403 ? 400 : (error.response?.status || 400);
      res.status(status).json({ error: error.response?.data || error.message });
    }
  });

=======
>>>>>>> 18fc01854c1e2793205673b08e1cfbea14a490ab
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
