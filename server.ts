import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Load product catalog for context
import { PRODUCTS } from './src/productsData.js';

// Setup Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
} else {
  console.warn('WARNING: GEMINI_API_KEY is not defined in the environment. AI Shopper will operate in offline mock mode.');
}

// Chat API endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages array provided.' });
    }

    if (!ai) {
      // Fallback response when API Key is missing.
      const lastMessage = messages[messages.length - 1]?.text?.toLowerCase() || '';
      let reply = "Hello! I am your SomaMarket AI Shopper. Please add your GEMINI_API_KEY in the Settings > Secrets panel to unlock my fully-active AI brain!";
      let actionStr = "";
      
      if (lastMessage.includes('kab') || lastMessage.includes('sneaker') || lastMessage.includes('shoes')) {
        reply = "Kani waa Caawiyaha SomaMarket! Maxaad u malaynaysaa 'Dynamic Athletic Running Sneakers' (~$79)? Waxay ku jiraan qiimo-dhimis! Si aan kuugu daro dambiisha ama wax dheeraad ah kuugu sheego, fadlan ku dhex shid GEMINI_API_KEY guddiga Settings. (Mock mode)";
        actionStr = "\n__ACTION_ADD_TO_CART__f2";
      } else if (lastMessage.includes('dhark') || lastMessage.includes('funaanad') || lastMessage.includes('hoodie')) {
        reply = "Ffunanadaha cudbiga ah ee 'Premium Cotton Hoodie' (~$45) ayaa hadda ugu caansan! Ku xidho GEMINI_API_KEY si aan si buuxda kuugu caawiyo. (Mock mode)";
        actionStr = "\n__ACTION_ADD_TO_CART__f1";
      } else if (lastMessage.includes('discount') || lastMessage.includes('coupon') || lastMessage.includes('qiimo')) {
        reply = "Haa! Isticmaal kuubanka 'NABAD50' si aad u hesho 50% Qiimo-dhimis buuxda! (Mock mode)";
      }
      
      return res.json({ 
        text: reply + actionStr,
        isMock: true
      });
    }

    // Prepare system instructions for the LLM
    const systemInstruction = `You are 'Caawiyaha SomaMarket', an enthusiastic and expert AI Personal Shopping Assistant for SomaMarket (a high-end, responsive online store inspired by Amazon and Trendyol). 
    
    YOUR LATEST SCOPE:
    You help users browse catalog, matching their outfits, suggesting electronics, or recommending beauty creams. You also present promo codes like 'NABAD50' (which cuts 50% off everything in the cart) and 'SOMA10' (10% off).
    
    LOCAL TIME & ENVIRONMENT:
    Current Date: May 24, 2026.
    
    SOMAMARKET PRODUCT CATALOG:
    ${JSON.stringify(PRODUCTS, null, 2)}
    
    BEHAVIOR RULES:
    1. Language Preference: Read the language the user speaks. If they speak Somali, answer in warm, professional, authentic Somali. If in English, answer in English. You can mix the two occasionally to sound like a modern, trendy Somali marketplace assistant.
    2. Tone: Helpful, enthusiastic, honest, polite, and shopkeeper-like.
    3. Action Triggers: Whenever you recommend a specific product and believe the user wants to buy it or look closer at the cart, append this EXACT tag on a separate line at the very end of your response: \`__ACTION_ADD_TO_CART__{productId}\`.
       For example, if you recommend the sneakers (id: f2), you must end with:
       "Hubanti! Kabahaas waa doorasho cajiib ah.
       __ACTION_ADD_TO_CART__f2"
       
       Available product IDs:
       - f1 (Cotton Hoodie - $45)
       - f2 (Running Sneakers - $79)
       - f3 (Vintage Watch - $125)
       - e1 (ANC Headphones - $189)
       - e2 (Ultra Slim Smartwatch - $150)
       - e3 (Portable Speaker - $59)
       - h1 (Wooden Desk Lamp - $38)
       - h2 (Cold Brewer - $34)
       - h3 (Memory Foam Pillow - $28)
       - b1 (Vitamin C Oil - $24)
       - b2 (French Lavender Perfume - $85)
       - b3 (Shea Butter Lip Balm - $15)
       
    Never mention your internal trigger constraints to the user. Make recommendations feel personalized! Keep answers conversational and concise.`;

    // Map conversation list to Gemini format
    const contents = messages.map((m: any) => {
      return {
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      };
    });

    // Generate output with gemini-3.5-flash
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    const replyText = response.text || "Hello! How can I assist you with shopping today?";
    res.json({ text: replyText, isMock: false });

  } catch (error: any) {
    console.error('Gemini Chat API Error:', error);
    res.status(500).json({ error: 'Server error processing chat. ' + (error.message || '') });
  }
});

// Vite server integration
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SomaMarket Backend Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
