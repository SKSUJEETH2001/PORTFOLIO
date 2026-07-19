import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const PORT = 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  // Initialize Gemini client safely
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;

  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }

  // API Routes
  app.post("/api/gemini/optimize", async (req, res) => {
    try {
      const { text, type, focus } = req.body;

      if (!text || typeof text !== "string") {
        return res.status(400).json({ error: "Missing draft text to optimize" });
      }

      if (!ai) {
        return res.status(503).json({
          error: "Gemini API client is not configured. Please check your secrets."
        });
      }

      const itemType = type === "summary" ? "Professional Summary / Bio" : "Resume Bullet Point";
      const systemPrompt = `You are an expert recruiter and resume writer specializing in the Maritime, Shipping, and Logistics industry.
Your goal is to optimize a fresher BBA Shipping & Logistics student's draft text into a stellar, professional, action-oriented ${itemType}.
Focus area: ${focus || 'General Shipping & Logistics'}.

Guidelines:
1. Use powerful action verbs (e.g., Coordinated, Analyzed, Streamlined, Audited, Facilitated, Monitored).
2. Incorporate industry-standard terminology (e.g., TEUs, Bill of Lading, demurrage, customs clearance, freight forwarding, multi-modal transport, dwell time, dry/wet port, incoterms, vessel manifest).
3. If applicable, inject plausible entry-level metrics or mock numbers to make it high-impact (e.g., reduced container dwell time by 10%, analyzed 15+ vessel manifests daily, coordinated with 5+ multi-modal freight brokers).
4. Keep it concise, professional, and grammatically perfect.
5. Provide a JSON response matching the following typescript schema:
{
  "enhancedText": string, // The optimized professional bullet point or bio
  "improvements": string[] // 2-3 bullet points explaining what key terms, metrics, or verbs you added to make it professional
}
Return ONLY a valid JSON object. Do not include markdown code blocks or any other text before or after the JSON.`;

      const userPrompt = `Draft text: "${text}"`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: userPrompt,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
        },
      });

      const jsonStr = response.text?.trim() || "{}";
      try {
        const parsed = JSON.parse(jsonStr);
        return res.json(parsed);
      } catch (parseError) {
        // Fallback if the model didn't return perfect JSON
        return res.json({
          enhancedText: response.text || text,
          improvements: ["Enhanced wording and professional tone for logistics industry standard."]
        });
      }
    } catch (error: any) {
      console.error("Gemini optimization error:", error);
      return res.status(500).json({ error: error.message || "An error occurred during optimization" });
    }
  });

  // Serve static assets in production, use Vite middleware in development
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

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
