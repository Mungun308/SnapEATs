import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error(" .env дээр SUPABASE_URL эсвэл SUPABASE_SERVICE_KEY алга байна");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);
const PORT = process.env.PORT || 5000;

// ====== Serve frontend (project root) ======
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FRONTEND_DIR = path.resolve(__dirname, "..");
app.use(express.static(FRONTEND_DIR));

app.get("/api/health", (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

app.get("/api/restaurants", async (req, res) => {
  try {
    const { data, error } = await supabase.from("restaurants").select("*");
    if (error) return res.status(500).json({ error: error.message });

    const formatted = (data || []).map((r, idx) => ({
      id: idx + 1,

      rest_id: r.rest_id,
      rest_name: r.rest_name,
      distance: r.distance,
      schedule: r.schedule,
      address: r.address,
      rank: r.rank,
      amount_of_people_ranked: r.amount_of_people_ranked,
      category: r.category,
      restriction: r.restriction,

      isNew: false,
      hasPromotion: false,
      isFeatured: false,
      phone: "0000-0000",
      cover: "./img/restaurant-cover1.jpg",
      logo: "./img/restaurant.jpg",
    }));

    res.json(formatted);
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
});

// ===== Users API =====
app.get("/api/users/:username", async (req, res) => {
  try {
    const username = String(req.params.username || "").trim();

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .maybeSingle();

    if (error) return res.status(500).json({ error: error.message });
    if (!data) return res.status(404).json({ error: "User not found" });

    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const { username, email, name } = req.body || {};
    if (!username || !email || !name) {
      return res.status(400).json({ error: "username, email, name required" });
    }

    const payload = {
      id: "user_" + Date.now() + "_" + Math.random().toString(36).slice(2, 9),
      username,
      email,
      name,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("users")
      .insert([payload])
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data);
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
});

app.use((req, res) => {
  res.sendFile(path.join(FRONTEND_DIR, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
  
});