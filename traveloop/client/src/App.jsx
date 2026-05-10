import React, { useState, useEffect, useRef } from "react";

// ─── Font Injection ──────────────────────────────────────────────────────────
(function injectFonts() {
    if (document.getElementById("tl-fonts")) return;
    const link = document.createElement("link");
    link.id = "tl-fonts";
    link.rel = "stylesheet";
    link.href =
        "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.id = "tl-css";
    style.textContent = `
    :root {
      --bg: #0a0d12;
      --surface: #10151d;
      --card: #141a24;
      --card2: #18202c;
      --border: rgba(255,255,255,0.07);
      --border-hover: rgba(255,255,255,0.14);
      --gold: #c9a84c;
      --gold-light: #e4c06a;
      --gold-pale: rgba(201,168,76,0.12);
      --blue: #4f86c6;
      --blue-pale: rgba(79,134,198,0.12);
      --green: #4caf82;
      --green-pale: rgba(76,175,130,0.12);
      --red: #d05a5a;
      --red-pale: rgba(208,90,90,0.10);
      --amber: #d4894a;
      --text: #eae6de;
      --muted: #6e7d91;
      --faint: #2a3a4e;
      --ff-display: 'Playfair Display', serif;
      --ff-body: 'DM Sans', sans-serif;
      --transition: all 0.2s cubic-bezier(0.4,0,0.2,1);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body, #root { height: 100%; }
    body { background: var(--bg); font-family: var(--ff-body); color: var(--text); }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes shimmer {
      0%   { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }

    .tl-screen { animation: fadeUp 0.28s cubic-bezier(0.4,0,0.2,1) both; }

    .tl-nav-item {
      display: flex; align-items: center; gap: 10px;
      padding: 9px 18px; font-size: 13px; cursor: pointer;
      color: var(--muted); border-left: 2px solid transparent;
      transition: var(--transition); border-radius: 0 8px 8px 0;
      margin: 1px 8px 1px 0;
    }
    .tl-nav-item:hover { color: var(--text); background: rgba(255,255,255,0.04); }
    .tl-nav-item.active {
      color: var(--gold); border-color: var(--gold);
      background: var(--gold-pale);
    }
    .tl-nav-item .nav-icon { font-size: 16px; width: 20px; text-align: center; }

    .tl-card {
      background: var(--card);
      border: 0.5px solid var(--border);
      border-radius: 14px; padding: 18px;
      transition: var(--transition);
    }
    .tl-card.hoverable:hover {
      border-color: var(--border-hover);
      transform: translateY(-2px);
      background: var(--card2);
    }
    .tl-card.gold-hover:hover { border-color: var(--gold); }

    .tl-btn {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 8px 16px; border-radius: 8px; font-size: 12.5px;
      font-weight: 500; cursor: pointer; transition: var(--transition);
      font-family: var(--ff-body); user-select: none; white-space: nowrap;
      border: 0.5px solid var(--border);
      background: var(--card2); color: var(--text);
    }
    .tl-btn:hover { border-color: var(--border-hover); background: var(--card); }
    .tl-btn.gold {
      background: var(--gold); color: #0a0d12;
      border-color: var(--gold); font-weight: 600;
    }
    .tl-btn.gold:hover { background: var(--gold-light); border-color: var(--gold-light); }
    .tl-btn.danger { color: var(--red); border-color: rgba(208,90,90,0.3); background: var(--red-pale); }
    .tl-btn.danger:hover { border-color: var(--red); }
    .tl-btn.sm { padding: 5px 11px; font-size: 11.5px; border-radius: 6px; }
    .tl-btn.xs { padding: 3px 8px; font-size: 11px; border-radius: 5px; }
    .tl-btn.ghost { background: transparent; border-color: transparent; }
    .tl-btn.ghost:hover { background: rgba(255,255,255,0.05); border-color: var(--border); }

    .tl-input, .tl-select, .tl-textarea {
      width: 100%; background: var(--surface); border: 0.5px solid var(--border);
      border-radius: 8px; padding: 9px 12px; color: var(--text);
      font-size: 13px; font-family: var(--ff-body); outline: none;
      transition: var(--transition);
    }
    .tl-input:focus, .tl-select:focus, .tl-textarea:focus {
      border-color: var(--gold); background: var(--card);
      box-shadow: 0 0 0 3px rgba(201,168,76,0.1);
    }
    .tl-input::placeholder, .tl-textarea::placeholder { color: var(--muted); }
    .tl-textarea { resize: vertical; min-height: 90px; }
    .tl-select { appearance: none; cursor: pointer; }
    input[type=date].tl-input::-webkit-calendar-picker-indicator { filter: invert(0.5) sepia(1) saturate(0.5); }

    .tl-badge {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 3px 9px; border-radius: 20px; font-size: 11px; font-weight: 500;
    }
    .tl-badge.green  { background: var(--green-pale); color: var(--green); }
    .tl-badge.gold   { background: var(--gold-pale); color: var(--gold); }
    .tl-badge.blue   { background: var(--blue-pale); color: var(--blue); }
    .tl-badge.red    { background: var(--red-pale); color: var(--red); }
    .tl-badge.muted  { background: rgba(255,255,255,0.05); color: var(--muted); }

    .tl-toggle {
      width: 40px; height: 22px; border-radius: 11px;
      background: var(--faint); cursor: pointer; position: relative;
      transition: background 0.25s; flex-shrink: 0; border: 0.5px solid var(--border);
    }
    .tl-toggle.on { background: var(--green); border-color: var(--green); }
    .tl-toggle::after {
      content: ''; position: absolute;
      width: 16px; height: 16px; border-radius: 50%;
      background: #fff; top: 2px; left: 2px; transition: transform 0.25s;
    }
    .tl-toggle.on::after { transform: translateX(18px); }

    .tl-prog { height: 4px; border-radius: 4px; background: var(--faint); overflow: hidden; }
    .tl-prog-fill {
      height: 100%; border-radius: 4px;
      background: linear-gradient(90deg, var(--gold), var(--gold-light));
      transition: width 0.5s cubic-bezier(0.4,0,0.2,1);
    }

    .tl-chip {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 4px 11px; border-radius: 20px; font-size: 11.5px;
      background: rgba(255,255,255,0.04); border: 0.5px solid var(--border);
      color: var(--muted); cursor: pointer; transition: var(--transition);
    }
    .tl-chip:hover { border-color: var(--gold); color: var(--gold-light); }
    .tl-chip.on { background: var(--gold-pale); border-color: var(--gold); color: var(--gold); }
    .tl-chip.on-green { background: var(--green-pale); border-color: var(--green); color: var(--green); }

    .tl-scroll::-webkit-scrollbar { width: 4px; }
    .tl-scroll::-webkit-scrollbar-track { background: transparent; }
    .tl-scroll::-webkit-scrollbar-thumb { background: var(--faint); border-radius: 4px; }

    .tl-modal-backdrop {
      position: fixed; inset: 0; background: rgba(0,0,0,0.75);
      z-index: 100; display: flex; align-items: center; justify-content: center;
      backdrop-filter: blur(4px);
    }
    .tl-modal-inner {
      background: var(--surface); border: 0.5px solid var(--border);
      border-radius: 18px; padding: 26px; max-height: 85vh;
      overflow-y: auto; animation: fadeUp 0.2s ease both;
    }

    .tl-divider { height: 0.5px; background: var(--border); }

    .tl-bar { transition: filter 0.15s, opacity 0.15s; cursor: default; }
    .tl-bar:hover { filter: brightness(1.25); }

    .tl-trip-row:hover .tl-trip-actions { opacity: 1; }
    .tl-trip-actions { opacity: 0; transition: opacity 0.2s; }

    .tl-section-header {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 16px;
    }
    .tl-section-title {
      font-family: var(--ff-display); font-size: 15px;
      font-weight: 600; color: var(--text); letter-spacing: 0.2px;
    }

    .tl-dest-card {
      background: var(--card); border: 0.5px solid var(--border);
      border-radius: 12px; overflow: hidden; cursor: pointer;
      transition: var(--transition);
    }
    .tl-dest-card:hover { border-color: var(--gold); transform: translateY(-2px); background: var(--card2); }

    .tl-trip-card {
      background: var(--card); border: 0.5px solid var(--border);
      border-radius: 14px; overflow: hidden; cursor: pointer;
      transition: var(--transition);
    }
    .tl-trip-card:hover { border-color: var(--gold); transform: translateY(-3px); }

    .tl-stat { background: var(--card); border: 0.5px solid var(--border); border-radius: 12px; padding: 16px 18px; }

    .tl-check { width: 16px; height: 16px; cursor: pointer; accent-color: var(--gold); flex-shrink: 0; }

    .tl-note-card { border-left: 2px solid var(--gold); padding-left: 14px; margin-bottom: 14px; }

    .tl-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; margin-top: 5px; }
    .tl-dot-line { width: 1px; flex: 1; background: var(--border); margin: 5px 0; }

    @keyframes pulse-red { 0%,100% { opacity:1 } 50% { opacity:0.6 } }
    .tl-overbudget { animation: pulse-red 2s infinite; }
  `;
    document.head.appendChild(style);
})();

// ─── Data ────────────────────────────────────────────────────────────────────
const TRIPS_INIT = [
    {
        id: 1, name: "Sakura Season Japan", emoji: "🌸",
        startDate: "2025-05-20", endDate: "2025-05-30",
        description: "Cherry blossom season across Tokyo, Kyoto, and Osaka.",
        tags: ["Nature", "Culture", "Food"], status: "upcoming",
        budget: 60000, spent: 42000, isPublic: true,
        stops: [
            {
                id: 1, city: "Tokyo", country: "Japan", emoji: "🗾", arrival: "2025-05-20", departure: "2025-05-24",
                activities: [
                    { id: 1, name: "Tokyo Tower & Senso-ji", time: "09:00", cost: 1200, type: "Sightseeing" },
                    { id: 2, name: "Tsukiji Market Lunch Tour", time: "12:00", cost: 800, type: "Food" },
                    { id: 3, name: "Akihabara Exploration", time: "18:00", cost: 0, type: "Shopping" },
                ]
            },
            {
                id: 2, city: "Kyoto", country: "Japan", emoji: "⛩️", arrival: "2025-05-24", departure: "2025-05-28",
                activities: [
                    { id: 4, name: "Fushimi Inari Sunrise Hike", time: "08:00", cost: 0, type: "Nature" },
                    { id: 5, name: "Arashiyama Bamboo Forest", time: "14:00", cost: 600, type: "Nature" },
                    { id: 6, name: "Gion Evening Walk", time: "19:00", cost: 0, type: "Culture" },
                ]
            },
            {
                id: 3, city: "Osaka", country: "Japan", emoji: "🏙️", arrival: "2025-05-28", departure: "2025-05-30",
                activities: [
                    { id: 7, name: "Osaka Castle", time: "10:00", cost: 400, type: "Sightseeing" },
                    { id: 8, name: "Dotonbori Food Crawl", time: "20:00", cost: 1500, type: "Food" },
                ]
            },
        ],
        notes: [
            { id: 1, stop: "Tokyo", date: "2025-05-21", text: "Hotel check-in at Shinjuku by 3 PM. Get Suica card at airport." },
            { id: 2, stop: "Kyoto", date: "2025-05-25", text: "Book tea ceremony in advance — Urasenke fills up fast. Temples close at 5:30 PM." },
        ],
        packingList: [
            { id: 1, name: "Passport", category: "Documents", done: true },
            { id: 2, name: "Travel Insurance", category: "Documents", done: true },
            { id: 3, name: "Visa Documents", category: "Documents", done: false },
            { id: 4, name: "Warm Jacket", category: "Clothing", done: true },
            { id: 5, name: "Comfortable Shoes", category: "Clothing", done: true },
            { id: 6, name: "Light Layers", category: "Clothing", done: false },
            { id: 7, name: "Universal Adapter", category: "Electronics", done: true },
            { id: 8, name: "Power Bank", category: "Electronics", done: true },
            { id: 9, name: "Camera", category: "Electronics", done: false },
        ],
    },
    {
        id: 2, name: "Euro Backpacking", emoji: "🗼",
        startDate: "2025-06-05", endDate: "2025-06-20",
        description: "5 countries, 5 cities, unlimited adventure.",
        tags: ["Backpacking", "Culture", "Nightlife"], status: "planning",
        budget: 80000, spent: 25000, isPublic: false,
        stops: [], notes: [], packingList: [],
    },
    {
        id: 3, name: "Goa Weekend Escape", emoji: "🏖️",
        startDate: "2025-07-12", endDate: "2025-07-15",
        description: "Sun, sand, and seafood on the Konkan coast.",
        tags: ["Beach", "Food", "Relaxation"], status: "draft",
        budget: 15000, spent: 0, isPublic: false,
        stops: [], notes: [], packingList: [],
    },
];

const CITIES_DB = [
    { id: 1, name: "Tokyo", country: "Japan", region: "East Asia", emoji: "🗾", cost: "¥¥¥", vibe: "Futuristic City", tags: ["Culture", "Food", "Shopping"] },
    { id: 2, name: "Kyoto", country: "Japan", region: "East Asia", emoji: "⛩️", cost: "¥¥¥", vibe: "Cultural Hub", tags: ["Culture", "Nature"] },
    { id: 3, name: "Osaka", country: "Japan", region: "East Asia", emoji: "🏙️", cost: "¥¥", vibe: "Food Capital", tags: ["Food", "Nightlife"] },
    { id: 4, name: "Paris", country: "France", region: "W. Europe", emoji: "🗼", cost: "$$$", vibe: "Iconic Romance", tags: ["Culture", "Romance"] },
    { id: 5, name: "Prague", country: "Czech Republic", region: "C. Europe", emoji: "🏰", cost: "$", vibe: "Budget-Friendly", tags: ["History", "Nightlife"] },
    { id: 6, name: "Bali", country: "Indonesia", region: "SE Asia", emoji: "🌴", cost: "$", vibe: "Trending Now", tags: ["Beach", "Wellness", "Nature"] },
    { id: 7, name: "Rome", country: "Italy", region: "S. Europe", emoji: "🏛️", cost: "$$", vibe: "Ancient Classic", tags: ["History", "Food", "Art"] },
    { id: 8, name: "Barcelona", country: "Spain", region: "S. Europe", emoji: "🌊", cost: "$$", vibe: "Lively & Artsy", tags: ["Beach", "Art", "Nightlife"] },
    { id: 9, name: "Hokkaido", country: "Japan", region: "East Asia", emoji: "🏔️", cost: "¥¥", vibe: "Nature & Ski", tags: ["Nature", "Adventure"] },
    { id: 10, name: "Amsterdam", country: "Netherlands", region: "W. Europe", emoji: "🚲", cost: "$$$", vibe: "Canal City", tags: ["Culture", "History"] },
    { id: 11, name: "Goa", country: "India", region: "South Asia", emoji: "🏖️", cost: "₹", vibe: "Beach Haven", tags: ["Beach", "Food", "Relaxation"] },
    { id: 12, name: "Maldives", country: "Maldives", region: "South Asia", emoji: "🐠", cost: "$$$$", vibe: "Luxury Escape", tags: ["Beach", "Luxury", "Diving"] },
];

const ACTIVITIES_DB = [
    { id: 1, name: "Fushimi Inari Taisha", city: "Kyoto", type: "Sightseeing", duration: "2–4 hrs", cost: 0, emoji: "⛩️" },
    { id: 2, name: "Geisha Experience, Gion", city: "Kyoto", type: "Culture", duration: "2 hrs", cost: 2400, emoji: "🎎" },
    { id: 3, name: "Traditional Tea Ceremony", city: "Kyoto", type: "Culture", duration: "1.5 hrs", cost: 1200, emoji: "🍵" },
    { id: 4, name: "Arashiyama Bamboo Forest", city: "Kyoto", type: "Nature", duration: "1.5 hrs", cost: 0, emoji: "🌿" },
    { id: 5, name: "Tokyo Tower", city: "Tokyo", type: "Sightseeing", duration: "2 hrs", cost: 800, emoji: "🗼" },
    { id: 6, name: "Senso-ji Temple", city: "Tokyo", type: "Culture", duration: "1.5 hrs", cost: 0, emoji: "⛩️" },
    { id: 7, name: "Tsukiji Market Tour", city: "Tokyo", type: "Food", duration: "2 hrs", cost: 800, emoji: "🍱" },
    { id: 8, name: "Akihabara Electronics", city: "Tokyo", type: "Shopping", duration: "3 hrs", cost: 0, emoji: "🎮" },
    { id: 9, name: "Dotonbori Food Crawl", city: "Osaka", type: "Food", duration: "3 hrs", cost: 1500, emoji: "🍜" },
    { id: 10, name: "Osaka Castle", city: "Osaka", type: "Sightseeing", duration: "2 hrs", cost: 400, emoji: "🏯" },
    { id: 11, name: "Colosseum Tour", city: "Rome", type: "History", duration: "3 hrs", cost: 1800, emoji: "🏛️" },
    { id: 12, name: "Vatican Museums", city: "Rome", type: "Art", duration: "4 hrs", cost: 2200, emoji: "🎨" },
    { id: 13, name: "Eiffel Tower Summit", city: "Paris", type: "Sightseeing", duration: "2 hrs", cost: 2600, emoji: "🗼" },
    { id: 14, name: "Louvre Museum", city: "Paris", type: "Art", duration: "4 hrs", cost: 1700, emoji: "🖼️" },
    { id: 15, name: "Beach Clubs", city: "Goa", type: "Beach", duration: "Full day", cost: 500, emoji: "🏖️" },
    { id: 16, name: "Dudhsagar Waterfall Trek", city: "Goa", type: "Adventure", duration: "Full day", cost: 1200, emoji: "🌊" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const daysBetween = (a, b) => Math.max(1, Math.round((new Date(b) - new Date(a)) / 86400000));
const fmtDate = (d) => {
    if (!d) return "—";
    return new Date(d).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" });
};
const rupee = (n) =>
    n >= 100000 ? `₹${(n / 100000).toFixed(1)}L`
        : n >= 1000 ? `₹${(n / 1000).toFixed(1)}K`
            : `₹${n}`;
const statusColor = (s) =>
    s === "upcoming" ? "green" : s === "planning" ? "gold" : s === "draft" ? "blue" : "muted";
const dotColors = ["#c9a84c", "#4f86c6", "#4caf82", "#d4894a", "#9b7de8"];

// ─── Reusable UI Components ───────────────────────────────────────────────────
function Logo() {
    return (
        <div style={{ padding: "22px 20px 16px", borderBottom: "0.5px solid var(--border)" }}>
            <div style={{ fontFamily: "var(--ff-display)", fontSize: 22, fontWeight: 700, letterSpacing: 0.3, lineHeight: 1 }}>
                <span style={{ color: "var(--gold)" }}>Travel</span>
                <span style={{ color: "var(--blue)" }}>oop</span>
            </div>
            <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 4, letterSpacing: 1.5, textTransform: "uppercase" }}>
                Plan · Explore · Share
            </div>
        </div>
    );
}

function NavItem({ icon, label, active, onClick }) {
    return (
        <div className={`tl-nav-item${active ? " active" : ""}`} onClick={onClick}>
            <span className="nav-icon">{icon}</span>
            <span>{label}</span>
        </div>
    );
}

function NavSection({ label }) {
    return (
        <div style={{ padding: "14px 18px 5px", fontSize: 10, color: "var(--muted)", letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 500 }}>
            {label}
        </div>
    );
}

function Divider({ my = 16 }) {
    return <div className="tl-divider" style={{ margin: `${my}px 0` }} />;
}

function SectionHeader({ title, action }) {
    return (
        <div className="tl-section-header">
            <div className="tl-section-title">{title}</div>
            {action}
        </div>
    );
}

function InputGroup({ label, hint, children }) {
    return (
        <div style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <label style={{ fontSize: 11.5, color: "var(--muted)", fontWeight: 500, letterSpacing: 0.3, textTransform: "uppercase" }}>{label}</label>
                {hint && <span style={{ fontSize: 11, color: "var(--muted)" }}>{hint}</span>}
            </div>
            {children}
        </div>
    );
}

function StatCard({ label, value, color, sub }) {
    return (
        <div className="tl-stat">
            <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.8 }}>{label}</div>
            <div style={{ fontFamily: "var(--ff-display)", fontSize: 24, fontWeight: 600, color: color || "var(--text)", lineHeight: 1 }}>{value}</div>
            {sub && <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>{sub}</div>}
        </div>
    );
}

function Badge({ variant = "muted", children }) {
    return <span className={`tl-badge ${variant}`}>{children}</span>;
}

function ProgressBar({ pct, color }) {
    return (
        <div className="tl-prog">
            <div className="tl-prog-fill" style={{ width: `${Math.min(100, pct)}%`, background: color ? `linear-gradient(90deg, ${color}, ${color}cc)` : undefined }} />
        </div>
    );
}

function Toggle({ on, onToggle }) {
    return <div className={`tl-toggle${on ? " on" : ""}`} onClick={onToggle} />;
}

function Modal({ title, subtitle, onClose, children, width = 520 }) {
    return (
        <div className="tl-modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
            <div className="tl-modal-inner tl-scroll" style={{ width, maxWidth: "95vw" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                    <div>
                        <div style={{ fontFamily: "var(--ff-display)", fontSize: 20, fontWeight: 600 }}>{title}</div>
                        {subtitle && <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 3 }}>{subtitle}</div>}
                    </div>
                    <button className="tl-btn sm" onClick={onClose} style={{ flexShrink: 0 }}>✕</button>
                </div>
                {children}
            </div>
        </div>
    );
}

function EmptyState({ icon, message, action }) {
    return (
        <div style={{ textAlign: "center", padding: "56px 0", color: "var(--muted)" }}>
            <div style={{ fontSize: 40, marginBottom: 14, opacity: 0.6 }}>{icon}</div>
            <div style={{ fontSize: 13 }}>{message}</div>
            {action && <div style={{ marginTop: 14 }}>{action}</div>}
        </div>
    );
}

function TripCardSmall({ trip, onClick }) {
    const pct = trip.budget > 0 ? (trip.spent / trip.budget) * 100 : 0;
    return (
        <div className="tl-trip-card" onClick={onClick}>
            <div style={{
                height: 88, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 36, position: "relative",
                background: "linear-gradient(135deg, var(--card2) 0%, var(--surface) 100%)",
            }}>
                {trip.emoji}
                <div style={{ position: "absolute", top: 8, right: 8 }}>
                    <Badge variant={statusColor(trip.status)}>{trip.status}</Badge>
                </div>
            </div>
            <div style={{ padding: "12px 14px" }}>
                <div style={{ fontSize: 13.5, fontWeight: 500, marginBottom: 3 }}>{trip.name}</div>
                <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 10 }}>
                    {fmtDate(trip.startDate)} → {fmtDate(trip.endDate)}
                </div>
                {trip.budget > 0 && (
                    <>
                        <ProgressBar pct={pct} />
                        <div style={{ fontSize: 10.5, color: "var(--muted)", marginTop: 4, display: "flex", justifyContent: "space-between" }}>
                            <span>{rupee(trip.spent)} spent</span>
                            <span>{rupee(trip.budget)}</span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function TraveloopApp() {
    const [screen, setScreen] = useState("dashboard");
    const [trips, setTrips] = useState(TRIPS_INIT);
    const [activeTrip, setActiveTrip] = useState(1);
    const [modal, setModal] = useState(null);
    const [tripFilter, setTripFilter] = useState("all");
    const [citySearch, setCitySearch] = useState("");
    const [actSearch, setActSearch] = useState({ q: "", type: "All", cost: "All" });
    const [newNote, setNewNote] = useState({ text: "", stop: "" });
    const [newPackItem, setNewPackItem] = useState("");
    const [newActivity, setNewActivity] = useState({ name: "", time: "10:00", cost: "", type: "Sightseeing" });
    const [createForm, setCreateForm] = useState({ name: "", startDate: "", endDate: "", description: "", tags: [] });
    const [shareToast, setShareToast] = useState(false);
    const contentRef = useRef(null);
    const user = { name: "Aryan Rathi", initials: "AR", email: "aryan@traveloop.app" };

    const trip = activeTrip !== null ? trips.find(t => t.id === activeTrip) : trips[0];
    const allActivities = trip ? trip.stops.flatMap(s => s.activities) : [];
    const activityTotalCost = allActivities.reduce((a, b) => a + b.cost, 0);

    useEffect(() => { if (contentRef.current) contentRef.current.scrollTop = 0; }, [screen]);

    const nav = (s, tripId = null) => {
        if (tripId !== null) setActiveTrip(tripId);
        setScreen(s);
    };

    const updateTrip = (id, patch) =>
        setTrips(ts => ts.map(t => t.id === id ? { ...t, ...patch } : t));

    const deleteTrip = (id) => {
        setTrips(ts => ts.filter(t => t.id !== id));
        if (activeTrip === id) setActiveTrip(trips.find(t => t.id !== id)?.id || null);
    };

    const addTrip = () => {
        if (!createForm.name || !createForm.startDate) return;
        const t = {
            id: Date.now(), name: createForm.name, emoji: "✈️",
            startDate: createForm.startDate, endDate: createForm.endDate,
            description: createForm.description, tags: createForm.tags,
            status: "draft", budget: 0, spent: 0, stops: [], notes: [], packingList: [], isPublic: false,
        };
        setTrips(ts => [...ts, t]);
        setActiveTrip(t.id);
        setCreateForm({ name: "", startDate: "", endDate: "", description: "", tags: [] });
        nav("builder", t.id);
    };

    const addStop = (city) => {
        if (!trip) return;
        if (trip.stops.find(s => s.city === city.name)) return;
        const stop = { id: Date.now(), city: city.name, country: city.country, emoji: city.emoji, arrival: trip.startDate, departure: trip.endDate, activities: [] };
        updateTrip(trip.id, { stops: [...trip.stops, stop] });
    };

    const removeStop = (tripId, stopId) => {
        const t = trips.find(x => x.id === tripId);
        updateTrip(tripId, { stops: t.stops.filter(s => s.id !== stopId) });
    };

    const addActivityToStop = (stopId, act) => {
        const stops = trip.stops.map(s =>
            s.id === stopId
                ? { ...s, activities: [...s.activities, { id: Date.now(), name: act.name, time: act.time || "10:00", cost: act.cost || 0, type: act.type, emoji: act.emoji || "📌" }] }
                : s
        );
        updateTrip(trip.id, { stops });
    };

    const removeActivity = (tripId, stopId, actId) => {
        const t = trips.find(x => x.id === tripId);
        const stops = t.stops.map(s => s.id === stopId ? { ...s, activities: s.activities.filter(a => a.id !== actId) } : s);
        updateTrip(tripId, { stops });
    };

    const togglePack = (tripId, itemId) => {
        const t = trips.find(x => x.id === tripId);
        updateTrip(tripId, { packingList: t.packingList.map(p => p.id === itemId ? { ...p, done: !p.done } : p) });
    };

    const addPackItem = () => {
        if (!newPackItem.trim() || !trip) return;
        updateTrip(trip.id, { packingList: [...trip.packingList, { id: Date.now(), name: newPackItem, category: "Other", done: false }] });
        setNewPackItem("");
    };

    const deletePackItem = (tripId, itemId) => {
        const t = trips.find(x => x.id === tripId);
        updateTrip(tripId, { packingList: t.packingList.filter(p => p.id !== itemId) });
    };

    const addNote = () => {
        if (!newNote.text.trim() || !trip) return;
        updateTrip(trip.id, { notes: [...trip.notes, { id: Date.now(), stop: newNote.stop || "General", date: new Date().toISOString().split("T")[0], text: newNote.text }] });
        setNewNote({ text: "", stop: "" });
    };

    const deleteNote = (tripId, noteId) => {
        const t = trips.find(x => x.id === tripId);
        updateTrip(tripId, { notes: t.notes.filter(n => n.id !== noteId) });
    };

    // ── Screens ──────────────────────────────────────────────────────────────────

    const renderDashboard = () => {
        const upcoming = trips.filter(t => t.status === "upcoming");
        const totalBudget = trips.reduce((a, b) => a + b.budget, 0);
        const citiesCount = [...new Set(trips.flatMap(t => t.stops.map(s => s.city)))].length;

        return (
            <div className="tl-screen">
                <div style={{
                    background: "linear-gradient(135deg, var(--card2) 0%, var(--surface) 60%, #0e1520 100%)",
                    border: "0.5px solid var(--border)", borderRadius: 18, padding: "28px 32px",
                    marginBottom: 24, position: "relative", overflow: "hidden",
                }}>
                    <div style={{ position: "absolute", right: -20, top: -20, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
                    <div style={{ position: "absolute", right: 28, top: "50%", transform: "translateY(-50%)", fontFamily: "var(--ff-display)", fontSize: 96, opacity: 0.04, fontStyle: "italic", userSelect: "none" }}>✈</div>
                    <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 6, letterSpacing: 0.5 }}>Good day,</div>
                    <div style={{ fontFamily: "var(--ff-display)", fontSize: 32, fontWeight: 700, marginBottom: 6, lineHeight: 1.15 }}>
                        Where to next, <span style={{ color: "var(--gold)", fontStyle: "italic" }}>{user.name.split(" ")[0]}?</span>
                    </div>
                    <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 22, maxWidth: 400 }}>
                        You have <strong style={{ color: "var(--text)" }}>{upcoming.length}</strong> upcoming trip{upcoming.length !== 1 ? "s" : ""} this season.
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                        <button className="tl-btn gold" onClick={() => nav("create")}>+ Plan New Trip</button>
                        <button className="tl-btn" onClick={() => nav("trips")}>📋 My Trips</button>
                    </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 28 }}>
                    <StatCard label="Total Trips" value={trips.length} color="var(--gold)" />
                    <StatCard label="Cities Explored" value={citiesCount} color="var(--blue)" />
                    <StatCard label="Total Budget" value={rupee(totalBudget)} color="var(--green)" />
                    <StatCard label="Shared Trips" value={trips.filter(t => t.isPublic).length} color="var(--muted)" />
                </div>

                <div style={{ marginBottom: 28 }}>
                    <SectionHeader title="Your Trips" action={
                        <button className="tl-btn sm ghost" onClick={() => nav("trips")}>View all →</button>
                    } />
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
                        {trips.slice(0, 3).map(t => (
                            <TripCardSmall key={t.id} trip={t} onClick={() => nav("itinerary", t.id)} />
                        ))}
                    </div>
                </div>

                <div>
                    <SectionHeader title="Popular Destinations" action={
                        <button className="tl-btn sm ghost" onClick={() => nav("citysearch")}>Browse all →</button>
                    } />
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
                        {CITIES_DB.slice(0, 8).map(c => (
                            <div key={c.id} className="tl-dest-card" onClick={() => { setCitySearch(c.name); nav("citysearch"); }}>
                                <div style={{ height: 58, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, background: "rgba(255,255,255,0.02)" }}>{c.emoji}</div>
                                <div style={{ padding: "8px 12px 10px" }}>
                                    <div style={{ fontSize: 12.5, fontWeight: 500 }}>{c.name}</div>
                                    <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{c.cost} · {c.vibe}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const renderTrips = () => {
        const filtered = tripFilter === "all" ? trips : trips.filter(t => t.status === tripFilter);
        return (
            <div className="tl-screen">
                <SectionHeader
                    title="My Trips"
                    action={<button className="tl-btn gold sm" onClick={() => nav("create")}>+ New Trip</button>}
                />
                <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
                    {["all", "upcoming", "planning", "draft"].map(f => (
                        <button key={f} onClick={() => setTripFilter(f)} className="tl-btn sm"
                                style={tripFilter === f ? { borderColor: "var(--gold)", color: "var(--gold)", background: "var(--gold-pale)" } : {}}>
                            {f.charAt(0).toUpperCase() + f.slice(1)} ({f === "all" ? trips.length : trips.filter(t => t.status === f).length})
                        </button>
                    ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {filtered.map(t => {
                        const pct = t.budget > 0 ? (t.spent / t.budget) * 100 : 0;
                        return (
                            <div key={t.id} className="tl-card tl-trip-row" style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 18px" }}>
                                <div style={{ fontSize: 30, width: 46, textAlign: "center", flexShrink: 0 }}>{t.emoji}</div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                                        <span style={{ fontSize: 14, fontWeight: 500 }}>{t.name}</span>
                                        <Badge variant={statusColor(t.status)}>{t.status}</Badge>
                                    </div>
                                    <div style={{ fontSize: 11.5, color: "var(--muted)", marginBottom: 8 }}>
                                        {fmtDate(t.startDate)} → {fmtDate(t.endDate)} · {t.stops.length} {t.stops.length !== 1 ? "cities" : "city"}
                                        {t.startDate && t.endDate ? ` · ${daysBetween(t.startDate, t.endDate)} days` : ""}
                                    </div>
                                    {t.budget > 0 && (
                                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                            <div style={{ width: 160 }}><ProgressBar pct={pct} /></div>
                                            <span style={{ fontSize: 11, color: "var(--muted)" }}>{rupee(t.spent)} / {rupee(t.budget)}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="tl-trip-actions" style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                                    <button className="tl-btn sm" onClick={() => nav("itinerary", t.id)}>👁 View</button>
                                    <button className="tl-btn sm" onClick={() => nav("builder", t.id)}>✏️ Edit</button>
                                    <button className="tl-btn sm danger" onClick={() => deleteTrip(t.id)}>🗑</button>
                                </div>
                            </div>
                        );
                    })}
                    {filtered.length === 0 && (
                        <EmptyState icon="🗺️" message="No trips found." action={
                            <button className="tl-btn gold" onClick={() => nav("create")}>Plan one now →</button>
                        } />
                    )}
                </div>
            </div>
        );
    };

    const renderCreate = () => {
        const ALL_TAGS = ["Nature", "Culture", "Food", "Beach", "Adventure", "Nightlife", "Backpacking", "Luxury", "History", "Wellness"];
        const dur = createForm.startDate && createForm.endDate ? daysBetween(createForm.startDate, createForm.endDate) : null;
        return (
            <div className="tl-screen">
                <div style={{ fontFamily: "var(--ff-display)", fontSize: 28, fontWeight: 700, marginBottom: 22 }}>Plan a New Trip</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 }}>
                    <div>
                        <InputGroup label="Trip Name *">
                            <input className="tl-input" placeholder="e.g. Sakura Season Japan" value={createForm.name} onChange={e => setCreateForm(f => ({ ...f, name: e.target.value }))} />
                        </InputGroup>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                            <InputGroup label="Start Date *">
                                <input type="date" className="tl-input" value={createForm.startDate} onChange={e => setCreateForm(f => ({ ...f, startDate: e.target.value }))} />
                            </InputGroup>
                            <InputGroup label="End Date">
                                <input type="date" className="tl-input" value={createForm.endDate} onChange={e => setCreateForm(f => ({ ...f, endDate: e.target.value }))} />
                            </InputGroup>
                        </div>
                        <InputGroup label="Description">
                            <textarea className="tl-textarea" placeholder="What's the vibe of this trip?" value={createForm.description} onChange={e => setCreateForm(f => ({ ...f, description: e.target.value }))} />
                        </InputGroup>
                        <InputGroup label="Trip Tags" hint={`${createForm.tags.length} selected`}>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                {ALL_TAGS.map(tag => (
                                    <div key={tag} className={`tl-chip${createForm.tags.includes(tag) ? " on" : ""}`}
                                         onClick={() => setCreateForm(f => ({ ...f, tags: f.tags.includes(tag) ? f.tags.filter(t => t !== tag) : [...f.tags, tag] }))}>
                                        {tag}
                                    </div>
                                ))}
                            </div>
                        </InputGroup>
                    </div>
                    <div>
                        <div className="tl-card" style={{ position: "sticky", top: 0 }}>
                            <div style={{ fontSize: 10.5, color: "var(--muted)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 14 }}>Trip Preview</div>
                            <div style={{ textAlign: "center", fontSize: 40, marginBottom: 10 }}>✈️</div>
                            <div style={{ textAlign: "center", fontFamily: "var(--ff-display)", fontSize: 17, fontWeight: 600, marginBottom: 4 }}>
                                {createForm.name || <span style={{ color: "var(--muted)" }}>Untitled Trip</span>}
                            </div>
                            {createForm.startDate && (
                                <div style={{ textAlign: "center", fontSize: 12, color: "var(--muted)", marginBottom: 14 }}>
                                    {fmtDate(createForm.startDate)} → {fmtDate(createForm.endDate)}
                                </div>
                            )}
                            <Divider my={12} />
                            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 12.5 }}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <span style={{ color: "var(--muted)" }}>Duration</span>
                                    <span>{dur ? `${dur} days` : "—"}</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <span style={{ color: "var(--muted)" }}>Status</span>
                                    <Badge variant="blue">Draft</Badge>
                                </div>
                                {createForm.tags.length > 0 && (
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <span style={{ color: "var(--muted)" }}>Tags</span>
                                        <span style={{ color: "var(--gold)", textAlign: "right", maxWidth: 160 }}>{createForm.tags.join(", ")}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <Divider />
                <div style={{ display: "flex", gap: 10 }}>
                    <button className="tl-btn gold" onClick={addTrip}>✅ Save & Build Itinerary</button>
                    <button className="tl-btn" onClick={() => nav("trips")}>Cancel</button>
                </div>
            </div>
        );
    };

    const renderBuilder = () => {
        if (!trip) return <EmptyState icon="🗺️" message="Select a trip first." />;
        return (
            <div className="tl-screen">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
                    <div>
                        <div style={{ fontFamily: "var(--ff-display)", fontSize: 26, fontWeight: 700 }}>Itinerary Builder</div>
                        <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 3 }}>{trip.name} · {fmtDate(trip.startDate)} → {fmtDate(trip.endDate)}</div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                        <button className="tl-btn sm" onClick={() => nav("citysearch")}>📍 Add City</button>
                        <button className="tl-btn sm gold" onClick={() => nav("itinerary")}>👁 Preview</button>
                    </div>
                </div>

                <div className="tl-card" style={{ marginBottom: 18 }}>
                    <div style={{ fontSize: 11, color: "var(--muted)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 14 }}>Trip Settings</div>
                    <div style={{ display: "flex", gap: 20, alignItems: "flex-end", flexWrap: "wrap" }}>
                        <div style={{ flex: 1, minWidth: 160 }}>
                            <InputGroup label="Total Budget (₹)">
                                <input type="number" className="tl-input" style={{ width: "100%" }} value={trip.budget}
                                       onChange={e => updateTrip(trip.id, { budget: Number(e.target.value) })} />
                            </InputGroup>
                        </div>
                        <div style={{ flex: 1, minWidth: 140 }}>
                            <InputGroup label="Status">
                                <select className="tl-select" value={trip.status} onChange={e => updateTrip(trip.id, { status: e.target.value })}>
                                    <option value="draft">Draft</option>
                                    <option value="planning">Planning</option>
                                    <option value="upcoming">Upcoming</option>
                                </select>
                            </InputGroup>
                        </div>
                        <div style={{ paddingBottom: 14 }}>
                            <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 8, letterSpacing: 0.5 }}>PUBLIC</div>
                            <Toggle on={trip.isPublic} onToggle={() => updateTrip(trip.id, { isPublic: !trip.isPublic })} />
                        </div>
                    </div>
                </div>

                {trip.stops.map((stop, idx) => (
                    <div key={stop.id} style={{ background: "var(--surface)", border: "0.5px solid var(--border)", borderRadius: 14, padding: 16, marginBottom: 12 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <div style={{ width: 26, height: 26, borderRadius: "50%", background: dotColors[idx % dotColors.length], color: "#0a0d12", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{idx + 1}</div>
                                <span style={{ fontSize: 15, fontWeight: 500 }}>{stop.emoji} {stop.city}, {stop.country}</span>
                            </div>
                            <button className="tl-btn sm danger" onClick={() => removeStop(trip.id, stop.id)}>🗑 Remove</button>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                            <InputGroup label="Arrival">
                                <input type="date" className="tl-input" value={stop.arrival} onChange={e =>
                                    updateTrip(trip.id, { stops: trip.stops.map(s => s.id === stop.id ? { ...s, arrival: e.target.value } : s) })} />
                            </InputGroup>
                            <InputGroup label="Departure">
                                <input type="date" className="tl-input" value={stop.departure} onChange={e =>
                                    updateTrip(trip.id, { stops: trip.stops.map(s => s.id === stop.id ? { ...s, departure: e.target.value } : s) })} />
                            </InputGroup>
                        </div>
                        <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.8 }}>
                            Activities ({stop.activities.length})
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                            {stop.activities.map(a => (
                                <div key={a.id} className="tl-chip on-green" onClick={() => removeActivity(trip.id, stop.id, a.id)} style={{ fontSize: 11.5 }}>
                                    {a.name} {a.cost > 0 ? `· ₹${a.cost}` : "· Free"} ✕
                                </div>
                            ))}
                            <div className="tl-chip" onClick={() => setModal({ type: "addActivity", stopId: stop.id })}>+ Add Activity</div>
                        </div>
                    </div>
                ))}

                <div onClick={() => nav("citysearch")} style={{
                    border: "0.5px dashed var(--border-hover)", borderRadius: 14, padding: "22px 0",
                    textAlign: "center", color: "var(--muted)", fontSize: 13, cursor: "pointer", transition: "var(--transition)",
                }}
                     onMouseEnter={e => e.currentTarget.style.borderColor = "var(--gold)"}
                     onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border-hover)"}>
                    <div style={{ fontSize: 22, marginBottom: 6 }}>📍</div>Add another city stop
                </div>

                {modal?.type === "addActivity" && (
                    <Modal title="Add Activity" subtitle="Pick from suggestions or add a custom one" onClose={() => setModal(null)}>
                        <div style={{ maxHeight: 220, overflowY: "auto", marginBottom: 16 }} className="tl-scroll">
                            {ACTIVITIES_DB.map(a => (
                                <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "0.5px solid var(--border)", cursor: "pointer" }}
                                     onClick={() => { addActivityToStop(modal.stopId, a); setModal(null); }}>
                                    <span style={{ fontSize: 20, flexShrink: 0 }}>{a.emoji}</span>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 13, fontWeight: 500 }}>{a.name}</div>
                                        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{a.city} · {a.type} · {a.duration} · {a.cost === 0 ? "Free" : `₹${a.cost}`}</div>
                                    </div>
                                    <button className="tl-btn xs gold">+ Add</button>
                                </div>
                            ))}
                        </div>
                        <Divider />
                        <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 12, marginTop: 14 }}>Or add custom activity:</div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px", gap: 10, marginBottom: 14 }}>
                            <InputGroup label="Name">
                                <input className="tl-input" placeholder="Activity name" value={newActivity.name} onChange={e => setNewActivity(a => ({ ...a, name: e.target.value }))} />
                            </InputGroup>
                            <InputGroup label="Cost (₹)">
                                <input type="number" className="tl-input" value={newActivity.cost} onChange={e => setNewActivity(a => ({ ...a, cost: e.target.value }))} />
                            </InputGroup>
                            <InputGroup label="Time">
                                <input type="time" className="tl-input" value={newActivity.time} onChange={e => setNewActivity(a => ({ ...a, time: e.target.value }))} />
                            </InputGroup>
                        </div>
                        <button className="tl-btn gold" onClick={() => {
                            if (!newActivity.name) return;
                            addActivityToStop(modal.stopId, { name: newActivity.name, cost: Number(newActivity.cost) || 0, type: "Custom", emoji: "📌", time: newActivity.time });
                            setNewActivity({ name: "", time: "10:00", cost: "", type: "Sightseeing" });
                            setModal(null);
                        }}>Add Activity</button>
                    </Modal>
                )}
            </div>
        );
    };

    const renderItinerary = () => {
        if (!trip) return null;
        return (
            <div className="tl-screen">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
                    <div>
                        <div style={{ fontFamily: "var(--ff-display)", fontSize: 28, fontWeight: 700 }}>{trip.emoji} {trip.name}</div>
                        <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>
                            {fmtDate(trip.startDate)} → {fmtDate(trip.endDate)} · {trip.stops.map(s => s.city).join(" → ") || "No stops yet"}
                        </div>
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <Badge variant={statusColor(trip.status)}>{trip.status}</Badge>
                        <button className="tl-btn sm" onClick={() => nav("shared")}>🔗 Share</button>
                        <button className="tl-btn sm gold" onClick={() => nav("builder")}>✏️ Edit</button>
                    </div>
                </div>

                {trip.stops.length === 0 ? (
                    <EmptyState icon="🗺️" message="No stops added yet." action={
                        <button className="tl-btn gold" onClick={() => nav("builder")}>Build your itinerary →</button>
                    } />
                ) : (
                    <div>
                        {trip.stops.map((stop, idx) => (
                            <div key={stop.id} style={{ display: "flex", gap: 18, marginBottom: 28 }}>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: 20 }}>
                                    <div className="tl-dot" style={{ background: dotColors[idx % dotColors.length] }} />
                                    {idx < trip.stops.length - 1 && <div className="tl-dot-line" />}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                                        <div>
                                            <span style={{ fontSize: 15, fontWeight: 600 }}>{stop.emoji} {stop.city}</span>
                                            <span style={{ fontSize: 12, color: "var(--muted)", marginLeft: 10 }}>
                        {fmtDate(stop.arrival)} → {fmtDate(stop.departure)}
                      </span>
                                        </div>
                                        <Badge variant="muted">{stop.activities.length} activities</Badge>
                                    </div>
                                    <div className="tl-card" style={{ padding: 0, overflow: "hidden" }}>
                                        {stop.activities.length === 0 ? (
                                            <div style={{ padding: "14px 16px", color: "var(--muted)", fontSize: 13 }}>
                                                No activities.{" "}
                                                <span style={{ color: "var(--gold)", cursor: "pointer" }} onClick={() => nav("activitysearch")}>
                          Add some →
                        </span>
                                            </div>
                                        ) : stop.activities.map((a, i) => (
                                            <div key={a.id} style={{
                                                display: "flex", alignItems: "center", gap: 12, padding: "11px 16px",
                                                borderBottom: i < stop.activities.length - 1 ? "0.5px solid var(--border)" : "none",
                                                fontSize: 13,
                                            }}>
                                                <span style={{ fontSize: 10.5, color: "var(--muted)", width: 40, flexShrink: 0 }}>{a.time}</span>
                                                <span style={{ flex: 1 }}>{a.name}</span>
                                                <span style={{ fontSize: 11.5, color: "var(--muted)", marginRight: 6 }}>{a.type}</span>
                                                <Badge variant={a.cost === 0 ? "green" : "gold"}>{a.cost === 0 ? "Free" : `₹${a.cost}`}</Badge>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    const renderCitySearch = () => {
        const filtered = CITIES_DB.filter(c =>
            !citySearch || c.name.toLowerCase().includes(citySearch.toLowerCase()) || c.country.toLowerCase().includes(citySearch.toLowerCase())
        );
        return (
            <div className="tl-screen">
                <div style={{ fontFamily: "var(--ff-display)", fontSize: 26, fontWeight: 700, marginBottom: 18 }}>City Search</div>
                <div style={{ position: "relative", marginBottom: 16 }}>
                    <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }}>🔍</span>
                    <input className="tl-input" style={{ paddingLeft: 36 }} placeholder="Search cities or countries..." value={citySearch} onChange={e => setCitySearch(e.target.value)} />
                </div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 14 }}>{filtered.length} cities</div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    {filtered.map(c => {
                        const inTrip = trip?.stops.some(s => s.city === c.name);
                        return (
                            <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 0", borderBottom: "0.5px solid var(--border)" }}>
                                <div style={{ width: 42, height: 42, borderRadius: 10, background: "var(--card2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{c.emoji}</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 13.5, fontWeight: 500 }}>{c.name}, {c.country}</div>
                                    <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{c.region} · {c.cost} · {c.vibe}</div>
                                    <div style={{ marginTop: 5, display: "flex", gap: 4 }}>
                                        {c.tags.map(tag => <span key={tag} style={{ fontSize: 10.5, padding: "2px 7px", borderRadius: 4, background: "rgba(255,255,255,0.05)", color: "var(--muted)" }}>{tag}</span>)}
                                    </div>
                                </div>
                                {inTrip
                                    ? <Badge variant="green">✓ Added</Badge>
                                    : <button className="tl-btn sm gold" onClick={() => { addStop(c); nav("builder"); }}>+ Add to Trip</button>
                                }
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    const renderActivitySearch = () => {
        const TYPES = ["All", "Sightseeing", "Culture", "Food", "Nature", "Adventure", "Shopping", "Beach", "Art", "History"];
        const filtered = ACTIVITIES_DB.filter(a => {
            const q = actSearch.q.toLowerCase();
            return (!q || a.name.toLowerCase().includes(q) || a.city.toLowerCase().includes(q))
                && (actSearch.type === "All" || a.type === actSearch.type)
                && (actSearch.cost === "All" || (actSearch.cost === "Free" && a.cost === 0) || (actSearch.cost === "Paid" && a.cost > 0));
        });
        return (
            <div className="tl-screen">
                <div style={{ fontFamily: "var(--ff-display)", fontSize: 26, fontWeight: 700, marginBottom: 18 }}>Activity Search</div>
                <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
                    <input className="tl-input" style={{ flex: 1, minWidth: 200 }} placeholder="Search activities..." value={actSearch.q} onChange={e => setActSearch(a => ({ ...a, q: e.target.value }))} />
                    <select className="tl-select" style={{ width: 110 }} value={actSearch.cost} onChange={e => setActSearch(a => ({ ...a, cost: e.target.value }))}>
                        <option>All</option><option>Free</option><option>Paid</option>
                    </select>
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 18 }}>
                    {TYPES.map(t => (
                        <div key={t} className={`tl-chip${actSearch.type === t ? " on" : ""}`} onClick={() => setActSearch(a => ({ ...a, type: t }))}>{t}</div>
                    ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {filtered.map(a => {
                        const added = trip?.stops.some(s => s.activities.some(x => x.name === a.name));
                        return (
                            <div key={a.id} className="tl-card" style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 16px" }}>
                                <span style={{ fontSize: 26, flexShrink: 0 }}>{a.emoji}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 13.5, fontWeight: 500 }}>{a.name}</div>
                                    <div style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 2 }}>{a.city} · {a.type} · {a.duration} · {a.cost === 0 ? "Free" : `₹${a.cost}`}</div>
                                </div>
                                {added
                                    ? <Badge variant="green">✓ Added</Badge>
                                    : trip?.stops.length > 0
                                        ? <button className="tl-btn sm gold" onClick={() => addActivityToStop(trip.stops[0].id, a)}>+ Add</button>
                                        : <span style={{ fontSize: 11, color: "var(--muted)" }}>Add a city first</span>
                                }
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    const renderBudget = () => {
        if (!trip) return null;
        const perDay = trip.startDate && trip.endDate ? Math.round(trip.spent / daysBetween(trip.startDate, trip.endDate)) : 0;
        const remaining = Math.max(0, trip.budget - trip.spent);
        const pct = trip.budget > 0 ? Math.round((trip.spent / trip.budget) * 100) : 0;
        const cats = [
            { label: "Flights & Transport", pct: 43, color: "var(--blue)" },
            { label: "Accommodation", pct: 29, color: "var(--gold)" },
            { label: "Activities", pct: 15, color: "var(--green)" },
            { label: "Food & Dining", pct: 13, color: "var(--amber)" },
        ];
        const bars = [55, 40, 70, 95, 35, 50, 60, 75, 45, 65];
        const tripBars = bars.slice(0, trip.startDate && trip.endDate ? Math.min(daysBetween(trip.startDate, trip.endDate), 10) : 7);

        return (
            <div className="tl-screen">
                <div style={{ fontFamily: "var(--ff-display)", fontSize: 26, fontWeight: 700, marginBottom: 22 }}>Budget Breakdown</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
                    <StatCard label="Total Budget" value={rupee(trip.budget)} color="var(--gold)" />
                    <StatCard label="Estimated Spend" value={rupee(trip.spent)} color="var(--blue)" />
                    <StatCard label="Remaining" value={rupee(remaining)} color={remaining > 0 ? "var(--green)" : "var(--red)"} />
                    <StatCard label="Per Day Avg" value={rupee(perDay)} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                    <div className="tl-card">
                        <div style={{ fontSize: 13.5, fontWeight: 500, marginBottom: 16 }}>Category Breakdown</div>
                        {cats.map(c => (
                            <div key={c.label} style={{ marginBottom: 14 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, fontSize: 12.5 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <div style={{ width: 9, height: 9, borderRadius: "50%", background: c.color, flexShrink: 0 }} />
                                        {c.label}
                                    </div>
                                    <span style={{ color: "var(--muted)" }}>{c.pct}%</span>
                                </div>
                                <ProgressBar pct={c.pct} color={c.color} />
                            </div>
                        ))}
                        <Divider my={14} />
                        <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 6 }}>Overall budget used</div>
                        <ProgressBar pct={pct} />
                        <div style={{ fontSize: 11.5, color: pct > 90 ? "var(--red)" : "var(--muted)", marginTop: 5 }}>{pct}% used</div>
                    </div>
                    <div className="tl-card">
                        <div style={{ fontSize: 13.5, fontWeight: 500, marginBottom: 16 }}>Daily Spend Estimate</div>
                        <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 110, marginBottom: 8 }}>
                            {tripBars.map((h, i) => (
                                <div key={i} className="tl-bar" style={{
                                    flex: 1, height: `${h}%`, borderRadius: "4px 4px 0 0", minWidth: 6,
                                    background: h > 85 ? "var(--red)" : h > 60 ? "var(--gold)" : "var(--blue)",
                                }} />
                            ))}
                        </div>
                        <div style={{ display: "flex", gap: 5 }}>
                            {tripBars.map((_, i) => <div key={i} style={{ flex: 1, fontSize: 9.5, color: "var(--muted)", textAlign: "center" }}>D{i + 1}</div>)}
                        </div>
                        {tripBars.some(h => h > 85) && (
                            <div className="tl-overbudget" style={{ marginTop: 14, background: "var(--red-pale)", border: "0.5px solid var(--red)", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "var(--red)" }}>
                                ⚠️ Some days exceed your daily budget
                            </div>
                        )}
                        <Divider my={14} />
                        <div style={{ display: "flex", gap: 14, fontSize: 11.5 }}>
                            {[["var(--blue)", "Normal"], ["var(--gold)", "High"], ["var(--red)", "Over limit"]].map(([c, l]) => (
                                <div key={l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                    <div style={{ width: 9, height: 9, borderRadius: 2, background: c }} />{l}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="tl-card">
                    <div style={{ fontSize: 13.5, fontWeight: 500, marginBottom: 14 }}>Activity Cost Breakdown</div>
                    {allActivities.length === 0
                        ? <div style={{ color: "var(--muted)", fontSize: 13 }}>No activities added yet.</div>
                        : (
                            <>
                                {allActivities.map(a => (
                                    <div key={a.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: "0.5px solid var(--border)", fontSize: 12.5 }}>
                                        <span>{a.name}</span>
                                        <Badge variant={a.cost === 0 ? "green" : "gold"}>{a.cost === 0 ? "Free" : `₹${a.cost}`}</Badge>
                                    </div>
                                ))}
                                <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0 0", fontSize: 13.5, fontWeight: 600 }}>
                                    <span>Total Activity Cost</span>
                                    <span style={{ color: "var(--gold)" }}>{rupee(activityTotalCost)}</span>
                                </div>
                            </>
                        )}
                </div>
            </div>
        );
    };

    const renderPacking = () => {
        if (!trip) return null;
        const done = trip.packingList.filter(p => p.done).length;
        const total = trip.packingList.length;
        const categories = [...new Set(trip.packingList.map(p => p.category))];
        return (
            <div className="tl-screen">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <div style={{ fontFamily: "var(--ff-display)", fontSize: 26, fontWeight: 700 }}>Packing Checklist</div>
                    <button className="tl-btn sm" onClick={() => updateTrip(trip.id, { packingList: trip.packingList.map(p => ({ ...p, done: false })) })}>🔄 Reset</button>
                </div>
                <div className="tl-card" style={{ marginBottom: 22 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 13.5 }}>
                        <span style={{ color: "var(--muted)" }}>{done} of {total} items packed</span>
                        <span style={{ color: "var(--gold)", fontWeight: 600 }}>{total > 0 ? Math.round((done / total) * 100) : 0}%</span>
                    </div>
                    <div className="tl-prog" style={{ height: 8 }}>
                        <div className="tl-prog-fill" style={{ width: `${total > 0 ? (done / total) * 100 : 0}%` }} />
                    </div>
                    {done === total && total > 0 && (
                        <div style={{ marginTop: 12, fontSize: 13, color: "var(--green)" }}>🎉 All packed! Ready to go.</div>
                    )}
                </div>
                <div style={{ display: "flex", gap: 10, marginBottom: 22 }}>
                    <input className="tl-input" style={{ flex: 1 }} placeholder="Add new item to pack..." value={newPackItem}
                           onChange={e => setNewPackItem(e.target.value)} onKeyDown={e => e.key === "Enter" && addPackItem()} />
                    <button className="tl-btn gold" onClick={addPackItem}>+ Add</button>
                </div>
                {categories.map(cat => (
                    <div key={cat} className="tl-card" style={{ marginBottom: 14 }}>
                        <div style={{ fontSize: 11, color: "var(--gold)", letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 500, marginBottom: 12 }}>{cat}</div>
                        {trip.packingList.filter(p => p.category === cat).map((item, i, arr) => (
                            <div key={item.id} style={{
                                display: "flex", alignItems: "center", gap: 12, padding: "9px 4px",
                                borderBottom: i < arr.length - 1 ? "0.5px solid var(--border)" : "none",
                            }}>
                                <input type="checkbox" className="tl-check" checked={item.done} onChange={() => togglePack(trip.id, item.id)} />
                                <span style={{ flex: 1, fontSize: 13, color: item.done ? "var(--muted)" : "var(--text)", textDecoration: item.done ? "line-through" : "none", transition: "var(--transition)" }}>
                  {item.name}
                </span>
                                <button className="tl-btn xs danger" onClick={() => deletePackItem(trip.id, item.id)}>✕</button>
                            </div>
                        ))}
                    </div>
                ))}
                {categories.length === 0 && <EmptyState icon="🎒" message="Your packing list is empty." />}
            </div>
        );
    };

    const renderNotes = () => {
        if (!trip) return null;
        return (
            <div className="tl-screen">
                <div style={{ fontFamily: "var(--ff-display)", fontSize: 26, fontWeight: 700, marginBottom: 22 }}>Notes & Journal</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 }}>
                    <div>
                        {trip.notes.length === 0
                            ? <EmptyState icon="📝" message="No notes yet. Write your first one!" />
                            : trip.notes.map(note => (
                                <div key={note.id} className="tl-note-card">
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                                        <div>
                                            <span style={{ fontSize: 11, color: "var(--gold)", fontWeight: 500, textTransform: "uppercase", letterSpacing: 0.8 }}>{note.stop}</span>
                                            <span style={{ fontSize: 11, color: "var(--muted)", marginLeft: 8 }}>{fmtDate(note.date)}</span>
                                        </div>
                                        <button className="tl-btn xs danger" onClick={() => deleteNote(trip.id, note.id)}>✕</button>
                                    </div>
                                    <div style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.6 }}>{note.text}</div>
                                </div>
                            ))
                        }
                    </div>
                    <div>
                        <div className="tl-card" style={{ position: "sticky", top: 0 }}>
                            <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 14 }}>Add Note</div>
                            <InputGroup label="City / Stop">
                                <select className="tl-select" value={newNote.stop} onChange={e => setNewNote(n => ({ ...n, stop: e.target.value }))}>
                                    <option value="">General</option>
                                    {trip.stops.map(s => <option key={s.id} value={s.city}>{s.city}</option>)}
                                </select>
                            </InputGroup>
                            <InputGroup label="Note">
                <textarea className="tl-textarea" placeholder="Write your note here..." value={newNote.text}
                          onChange={e => setNewNote(n => ({ ...n, text: e.target.value }))} style={{ minHeight: 120 }} />
                            </InputGroup>
                            <button className="tl-btn gold" style={{ width: "100%" }} onClick={addNote}>+ Add Note</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderShared = () => {
        const publicTrips = trips.filter(t => t.isPublic);
        const shareUrl = `https://traveloop.app/share/${trip?.id || ""}`;

        return (
            <div className="tl-screen">
                <div style={{ fontFamily: "var(--ff-display)", fontSize: 26, fontWeight: 700, marginBottom: 6 }}>Share & Collaborate</div>
                <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 24 }}>Make your trips public and let the world explore your journey.</div>

                {/* Active trip share card */}
                {trip && (
                    <div className="tl-card" style={{ marginBottom: 24, border: "0.5px solid var(--gold)", background: "linear-gradient(135deg, var(--card2), var(--surface))" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                            <div>
                                <div style={{ fontFamily: "var(--ff-display)", fontSize: 18, fontWeight: 600, marginBottom: 4 }}>{trip.emoji} {trip.name}</div>
                                <div style={{ fontSize: 12, color: "var(--muted)" }}>{fmtDate(trip.startDate)} → {fmtDate(trip.endDate)}</div>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <span style={{ fontSize: 12, color: "var(--muted)" }}>Public</span>
                                <Toggle on={trip.isPublic} onToggle={() => updateTrip(trip.id, { isPublic: !trip.isPublic })} />
                            </div>
                        </div>
                        {trip.isPublic ? (
                            <>
                                <div style={{ background: "var(--surface)", border: "0.5px solid var(--border)", borderRadius: 8, padding: "10px 14px", fontSize: 12.5, color: "var(--muted)", marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <span style={{ fontFamily: "monospace", color: "var(--blue)" }}>{shareUrl}</span>
                                    <button className="tl-btn xs gold" onClick={() => {
                                        navigator.clipboard?.writeText(shareUrl).catch(() => {});
                                        setShareToast(true);
                                        setTimeout(() => setShareToast(false), 2000);
                                    }}>
                                        {shareToast ? "✓ Copied!" : "Copy"}
                                    </button>
                                </div>
                                <div style={{ display: "flex", gap: 8 }}>
                                    <Badge variant="green">🌍 Live</Badge>
                                    <span style={{ fontSize: 12, color: "var(--muted)", alignSelf: "center" }}>Anyone with the link can view this trip</span>
                                </div>
                            </>
                        ) : (
                            <div style={{ fontSize: 13, color: "var(--muted)" }}>Toggle public to generate a shareable link.</div>
                        )}
                    </div>
                )}

                {/* Public trips grid */}
                <SectionHeader title="Your Public Trips" />
                {publicTrips.length === 0 ? (
                    <EmptyState icon="🔒" message="No public trips yet. Toggle a trip to public to share it." />
                ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
                        {publicTrips.map(t => (
                            <TripCardSmall key={t.id} trip={t} onClick={() => nav("itinerary", t.id)} />
                        ))}
                    </div>
                )}

                {/* Stats */}
                <Divider my={28} />
                <SectionHeader title="Community Stats" />
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
                    <StatCard label="Public Trips" value={publicTrips.length} color="var(--gold)" />
                    <StatCard label="Cities Covered" value={[...new Set(publicTrips.flatMap(t => t.stops.map(s => s.city)))].length} color="var(--blue)" />
                    <StatCard label="Total Activities" value={publicTrips.flatMap(t => t.stops.flatMap(s => s.activities)).length} color="var(--green)" />
                    <StatCard label="Profile Views" value="128" color="var(--amber)" sub="This month" />
                </div>
            </div>
        );
    };

    const renderProfile = () => {
        return (
            <div className="tl-screen">
                <div style={{ fontFamily: "var(--ff-display)", fontSize: 26, fontWeight: 700, marginBottom: 24 }}>My Profile</div>
                <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 24 }}>
                    {/* Profile card */}
                    <div>
                        <div className="tl-card" style={{ textAlign: "center", marginBottom: 14 }}>
                            <div style={{
                                width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg, var(--gold), var(--amber))",
                                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 700,
                                color: "#0a0d12", margin: "0 auto 14px", fontFamily: "var(--ff-display)"
                            }}>{user.initials}</div>
                            <div style={{ fontFamily: "var(--ff-display)", fontSize: 18, fontWeight: 600, marginBottom: 4 }}>{user.name}</div>
                            <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 16 }}>{user.email}</div>
                            <Badge variant="gold">✈ Avid Traveller</Badge>
                            <Divider my={16} />
                            <div style={{ display: "flex", justifyContent: "space-around", fontSize: 12 }}>
                                <div style={{ textAlign: "center" }}>
                                    <div style={{ fontFamily: "var(--ff-display)", fontSize: 20, fontWeight: 600, color: "var(--gold)" }}>{trips.length}</div>
                                    <div style={{ color: "var(--muted)" }}>Trips</div>
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    <div style={{ fontFamily: "var(--ff-display)", fontSize: 20, fontWeight: 600, color: "var(--blue)" }}>
                                        {[...new Set(trips.flatMap(t => t.stops.map(s => s.city)))].length}
                                    </div>
                                    <div style={{ color: "var(--muted)" }}>Cities</div>
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    <div style={{ fontFamily: "var(--ff-display)", fontSize: 20, fontWeight: 600, color: "var(--green)" }}>
                                        {trips.filter(t => t.isPublic).length}
                                    </div>
                                    <div style={{ color: "var(--muted)" }}>Shared</div>
                                </div>
                            </div>
                        </div>
                        <div className="tl-card">
                            <div style={{ fontSize: 12, color: "var(--muted)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>Preferences</div>
                            {[
                                ["Email Notifications", true],
                                ["Public Profile", false],
                                ["Trip Reminders", true],
                                ["Budget Alerts", true],
                            ].map(([label, def]) => {
                                const [on, setOn] = useState(def);
                                return (
                                    <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "0.5px solid var(--border)" }}>
                                        <span style={{ fontSize: 13 }}>{label}</span>
                                        <Toggle on={on} onToggle={() => setOn(v => !v)} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right col */}
                    <div>
                        <div className="tl-card" style={{ marginBottom: 16 }}>
                            <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 16 }}>Edit Profile</div>
                            <InputGroup label="Full Name">
                                <input className="tl-input" defaultValue={user.name} />
                            </InputGroup>
                            <InputGroup label="Email">
                                <input className="tl-input" defaultValue={user.email} />
                            </InputGroup>
                            <InputGroup label="Home City">
                                <input className="tl-input" defaultValue="Surat, Gujarat" />
                            </InputGroup>
                            <InputGroup label="Travel Style">
                                <select className="tl-select" defaultValue="backpacker">
                                    <option value="backpacker">Backpacker</option>
                                    <option value="luxury">Luxury</option>
                                    <option value="adventure">Adventure</option>
                                    <option value="cultural">Cultural Explorer</option>
                                </select>
                            </InputGroup>
                            <button className="tl-btn gold">Save Changes</button>
                        </div>

                        <div className="tl-card">
                            <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 16 }}>Recent Activity</div>
                            {[
                                { emoji: "🌸", action: "Created trip", name: "Sakura Season Japan", time: "2 days ago" },
                                { emoji: "🗼", action: "Added stops to", name: "Euro Backpacking", time: "5 days ago" },
                                { emoji: "🏖️", action: "Drafted", name: "Goa Weekend Escape", time: "1 week ago" },
                            ].map((a, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "0.5px solid var(--border)", fontSize: 12.5 }}>
                                    <span style={{ fontSize: 20 }}>{a.emoji}</span>
                                    <span style={{ flex: 1, color: "var(--muted)" }}>{a.action} <span style={{ color: "var(--text)" }}>{a.name}</span></span>
                                    <span style={{ fontSize: 11, color: "var(--muted)" }}>{a.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const screens = {
        dashboard: renderDashboard,
        trips: renderTrips,
        create: renderCreate,
        builder: renderBuilder,
        itinerary: renderItinerary,
        citysearch: renderCitySearch,
        activitysearch: renderActivitySearch,
        budget: renderBudget,
        packing: renderPacking,
        notes: renderNotes,
        shared: renderShared,
        profile: renderProfile,
    };

    const tripNavItems = trip ? [
        { icon: "🗺️", label: "Itinerary", screen: "itinerary" },
        { icon: "✏️", label: "Builder", screen: "builder" },
        { icon: "💰", label: "Budget", screen: "budget" },
        { icon: "🎒", label: "Packing List", screen: "packing" },
        { icon: "📝", label: "Notes", screen: "notes" },
    ] : [];

    return (
        <div style={{ display: "flex", height: "100vh", background: "var(--bg)", fontFamily: "var(--ff-body)", overflow: "hidden" }}>
            {/* Sidebar */}
            <div style={{
                width: 220, flexShrink: 0, background: "var(--surface)",
                borderRight: "0.5px solid var(--border)", display: "flex", flexDirection: "column",
                overflowY: "auto",
            }} className="tl-scroll">
                <Logo />

                <div style={{ flex: 1, paddingTop: 8 }}>
                    <NavSection label="Main" />
                    <NavItem icon="🏠" label="Dashboard" active={screen === "dashboard"} onClick={() => nav("dashboard")} />
                    <NavItem icon="📋" label="My Trips" active={screen === "trips"} onClick={() => nav("trips")} />
                    <NavItem icon="+ New Trip" label="Plan Trip" active={screen === "create"} onClick={() => nav("create")} />

                    <NavSection label="Explore" />
                    <NavItem icon="🔍" label="City Search" active={screen === "citysearch"} onClick={() => nav("citysearch")} />
                    <NavItem icon="🎯" label="Activities" active={screen === "activitysearch"} onClick={() => nav("activitysearch")} />
                    <NavItem icon="🔗" label="Share & Social" active={screen === "shared"} onClick={() => nav("shared")} />

                    {tripNavItems.length > 0 && (
                        <>
                            <NavSection label={trip ? trip.name.slice(0, 18) + (trip.name.length > 18 ? "…" : "") : "Current Trip"} />
                            {tripNavItems.map(item => (
                                <NavItem key={item.screen} icon={item.icon} label={item.label} active={screen === item.screen} onClick={() => nav(item.screen)} />
                            ))}
                        </>
                    )}
                </div>

                {/* Trip switcher */}
                {trips.length > 1 && (
                    <div style={{ padding: "12px 12px", borderTop: "0.5px solid var(--border)" }}>
                        <div style={{ fontSize: 10, color: "var(--muted)", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 8 }}>Switch Trip</div>
                        {trips.map(t => (
                            <div key={t.id} onClick={() => setActiveTrip(t.id)} style={{
                                display: "flex", alignItems: "center", gap: 8, padding: "6px 8px", borderRadius: 8, cursor: "pointer",
                                background: activeTrip === t.id ? "var(--gold-pale)" : "transparent",
                                border: `0.5px solid ${activeTrip === t.id ? "var(--gold)" : "transparent"}`,
                                transition: "var(--transition)", marginBottom: 3,
                            }}>
                                <span style={{ fontSize: 15 }}>{t.emoji}</span>
                                <span style={{ fontSize: 11.5, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: activeTrip === t.id ? "var(--gold)" : "var(--muted)" }}>{t.name}</span>
                            </div>
                        ))}
                    </div>
                )}

                {/* User footer */}
                <div style={{ padding: "14px 16px", borderTop: "0.5px solid var(--border)", display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
                     onClick={() => nav("profile")}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, var(--gold), var(--amber))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#0a0d12", flexShrink: 0 }}>
                        {user.initials}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12.5, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.name}</div>
                        <div style={{ fontSize: 10.5, color: "var(--muted)" }}>Profile & Settings</div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div ref={contentRef} style={{ flex: 1, overflowY: "auto", padding: "32px 36px" }} className="tl-scroll">
                {(screens[screen] || renderDashboard)()}
            </div>
        </div>
    );
}
