import FinnPlay from "app/index"; // o la ruta donde esté tu componente

export default function Page() {
  return <FinnPlay />;
}

// ── MOCK DATA ────────────────────────────────────────────────────────────────
const MOCK_EVENTS = [
  { id: 1, home: "Chivas", away: "América", league: "Liga MX", sport: "⚽", time: "21/04 20:00", homeOdd: 2.40, drawOdd: 3.10, awayOdd: 2.80, active: true, live: true, bets: 142 },
  { id: 2, home: "Real Madrid", away: "Bayern", league: "Champions", sport: "⚽", time: "21/04 21:00", homeOdd: 1.85, drawOdd: 3.50, awayOdd: 3.90, active: true, live: false, bets: 98 },
  { id: 3, home: "Lakers", away: "Warriors", league: "NBA", sport: "🏀", time: "21/04 22:30", homeOdd: 1.70, drawOdd: null, awayOdd: 2.10, active: true, live: false, bets: 67 },
  { id: 4, home: "Chiefs", away: "Eagles", league: "NFL", sport: "🏈", time: "22/04 19:00", homeOdd: 1.55, drawOdd: null, awayOdd: 2.40, active: false, live: false, bets: 0 },
  { id: 5, home: "Diablos Rojos", away: "Sultanes", league: "LMB", sport: "⚾", time: "22/04 20:00", homeOdd: 1.90, drawOdd: null, awayOdd: 1.95, active: true, live: false, bets: 31 },
  { id: 6, home: "Alcaraz", away: "Djokovic", league: "ATP", sport: "🎾", time: "23/04 15:00", homeOdd: 2.20, drawOdd: null, awayOdd: 1.65, active: false, live: false, bets: 0 },
];

const MOCK_USERS = [
  { id: 1, username: "CráckBet", email: "crack@mail.com", credits: 1500, level: 4, bets: 47, wins: 28, status: "active", joined: "15/01/2024", lastSeen: "hace 2 min" },
  { id: 2, username: "ElBetMaster", email: "master@mail.com", credits: 48200, level: 12, bets: 312, wins: 189, status: "active", joined: "03/11/2023", lastSeen: "hace 5 min" },
  { id: 3, username: "PronosticoPro", email: "pro@mail.com", credits: 41500, level: 10, bets: 280, wins: 176, status: "active", joined: "22/12/2023", lastSeen: "hace 1 hr" },
  { id: 4, username: "BetSpammer99", email: "spam@mail.com", credits: 200, level: 1, bets: 3, wins: 0, status: "blocked", joined: "20/04/2025", lastSeen: "hace 2 días" },
  { id: 5, username: "GolMaster", email: "gol@mail.com", credits: 7200, level: 6, bets: 89, wins: 48, status: "active", joined: "08/03/2024", lastSeen: "hace 3 hrs" },
  { id: 6, username: "NuevoUser", email: "nuevo@mail.com", credits: 1500, level: 1, bets: 0, wins: 0, status: "active", joined: "21/04/2025", lastSeen: "hace 10 min" },
];

const MOCK_MISSIONS = [
  { id: 1, title: "Primera apuesta del día", desc: "Realiza 1 apuesta hoy", reward: 100, type: "daily", icon: "🎯", active: true, completions: 342 },
  { id: 2, title: "Racha ganadora", desc: "Gana 3 apuestas seguidas", reward: 300, type: "daily", icon: "🔥", active: true, completions: 89 },
  { id: 3, title: "Multi-apuesta", desc: "Haz una combinada de 3+ eventos", reward: 200, type: "daily", icon: "⚡", active: true, completions: 124 },
  { id: 4, title: "Fan del fútbol", desc: "Apuesta en 5 partidos de fútbol", reward: 500, type: "weekly", icon: "⚽", active: true, completions: 56 },
  { id: 5, title: "Gran apostador", desc: "Apuesta 5,000 créditos en total", reward: 750, type: "weekly", icon: "💎", active: false, completions: 12 },
  { id: 6, title: "Explorador", desc: "Apuesta en 3 deportes distintos", reward: 400, type: "weekly", icon: "🌍", active: true, completions: 78 },
];

const MOCK_OPERATORS = [
  { id: 1, name: "Admin Principal", email: "admin@finnplay.com", role: "superadmin", status: "active", lastLogin: "hace 2 min", permissions: ["all"] },
  { id: 2, name: "Carlos Soporte", email: "carlos@finnplay.com", role: "support", status: "active", lastLogin: "hace 1 hr", permissions: ["users", "reports"] },
  { id: 3, name: "Ana Operadora", email: "ana@finnplay.com", role: "operator", status: "active", lastLogin: "hace 3 hrs", permissions: ["events", "missions"] },
  { id: 4, name: "Luis Agente", email: "luis@finnplay.com", role: "agent", status: "inactive", lastLogin: "hace 5 días", permissions: ["reports"] },
];

const STATS = {
  totalUsers: 1284, newToday: 23, activeNow: 87,
  totalBets: 4821, betsToday: 312, pendingBets: 48,
  creditsCirculating: 2840000, creditsWon: 142000, creditsLost: 98000,
  topLeague: "Liga MX", topEvent: "Chivas vs América",
};

const RECENT_BETS = [
  { id: "BVR-9821", user: "ElBetMaster", event: "Chivas vs América", pick: "Chivas", amount: 500, odd: 2.40, potential: 1200, status: "pending", time: "20:42" },
  { id: "BVR-9820", user: "CráckBet", event: "Real Madrid vs Bayern", pick: "Empate", amount: 150, odd: 3.50, potential: 525, status: "won", time: "20:40" },
  { id: "BVR-9819", user: "GolMaster", event: "Lakers vs Warriors", pick: "Warriors", amount: 300, odd: 2.10, potential: 630, status: "lost", time: "20:38" },
  { id: "BVR-9818", user: "PronosticoPro", event: "Chivas vs América", pick: "América", amount: 1000, odd: 2.80, potential: 2800, status: "pending", time: "20:35" },
  { id: "BVR-9817", user: "NuevoUser", event: "Chiefs vs Eagles", pick: "Chiefs", amount: 100, odd: 1.55, potential: 155, status: "won", time: "20:30" },
];

const fmt = (n) => Number(n)?.toLocaleString("es-MX");

// ── ROLE BADGE ────────────────────────────────────────────────────────────────
const RoleBadge = ({ role }) => {
  const map = {
    superadmin: { label: "Super Admin", bg: "rgba(255,59,48,.15)", color: "#ff3b30" },
    operator: { label: "Operador", bg: "rgba(255,159,10,.15)", color: "#ff9f0a" },
    support: { label: "Soporte", bg: "rgba(48,209,88,.15)", color: "#30d158" },
    agent: { label: "Agente", bg: "rgba(100,210,255,.15)", color: "#64d2ff" },
  };
  const s = map[role] || map.agent;
  return <span style={{ background: s.bg, color: s.color, padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: .5 }}>{s.label.toUpperCase()}</span>;
};

// ── STATUS DOT ────────────────────────────────────────────────────────────────
const StatusDot = ({ status }) => {
  const c = status === "active" ? "#30d158" : status === "blocked" ? "#ff3b30" : "#636366";
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, color: c, fontWeight: 600 }}>
    <span style={{ width: 7, height: 7, borderRadius: "50%", background: c, display: "inline-block", boxShadow: status === "active" ? `0 0 6px ${c}` : "none" }} />
    {status === "active" ? "Activo" : status === "blocked" ? "Bloqueado" : "Inactivo"}
  </span>;
};

// ── MODAL ─────────────────────────────────────────────────────────────────────
function Modal({ title, onClose, children }) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.7)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#161b2e", border: "1px solid rgba(255,255,255,.1)", borderRadius: 20, padding: 28, width: "100%", maxWidth: 480, maxHeight: "90vh", overflowY: "auto", animation: "fadeUp .25s ease" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: "#fff", margin: 0 }}>{title}</h3>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,.08)", border: "none", color: "rgba(255,255,255,.6)", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 16 }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ── INPUT ─────────────────────────────────────────────────────────────────────
const Input = ({ label, value, onChange, type = "text", placeholder }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={{ display: "block", fontSize: 11, color: "rgba(255,255,255,.4)", letterSpacing: 1, marginBottom: 6, fontWeight: 700 }}>{label.toUpperCase()}</label>
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      style={{ width: "100%", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10, padding: "10px 14px", color: "#fff", fontSize: 14, fontFamily: "inherit", boxSizing: "border-box", outline: "none" }} />
  </div>
);

const Select = ({ label, value, onChange, options }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={{ display: "block", fontSize: 11, color: "rgba(255,255,255,.4)", letterSpacing: 1, marginBottom: 6, fontWeight: 700 }}>{label.toUpperCase()}</label>
    <select value={value} onChange={e => onChange(e.target.value)}
      style={{ width: "100%", background: "#1e2540", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10, padding: "10px 14px", color: "#fff", fontSize: 14, fontFamily: "inherit", boxSizing: "border-box", outline: "none" }}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </div>
);

const Btn = ({ children, onClick, variant = "primary", disabled, small }) => {
  const bg = variant === "primary" ? "linear-gradient(135deg,#00c2ff,#0066ff)" : variant === "danger" ? "rgba(255,59,48,.15)" : variant === "success" ? "rgba(48,209,88,.15)" : "rgba(255,255,255,.08)";
  const color = variant === "primary" ? "#fff" : variant === "danger" ? "#ff3b30" : variant === "success" ? "#30d158" : "rgba(255,255,255,.7)";
  return (
    <button onClick={onClick} disabled={disabled} style={{ background: bg, color, border: "none", borderRadius: 10, padding: small ? "7px 14px" : "11px 20px", fontSize: small ? 12 : 14, fontWeight: 700, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? .5 : 1, fontFamily: "inherit", letterSpacing: .3 }}>
      {children}
    </button>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SECTIONS
// ═══════════════════════════════════════════════════════════════════════════════

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
function Dashboard() {
  const kpis = [
    { label: "Usuarios totales", value: fmt(STATS.totalUsers), sub: `+${STATS.newToday} hoy`, icon: "👥", color: "#00c2ff" },
    { label: "Activos ahora", value: STATS.activeNow, sub: "en este momento", icon: "🟢", color: "#30d158" },
    { label: "Apuestas hoy", value: fmt(STATS.betsToday), sub: `${STATS.pendingBets} pendientes`, icon: "🎯", color: "#ff9f0a" },
    { label: "Créditos en juego", value: fmt(STATS.creditsCirculating), sub: "circulando", icon: "💰", color: "#bf5af2" },
  ];
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 26, fontWeight: 900, margin: "0 0 4px", letterSpacing: -.5 }}>Dashboard</h2>
        <p style={{ color: "rgba(255,255,255,.4)", fontSize: 14, margin: 0 }}>Martes 21 de abril, 2025 · Resumen en tiempo real</p>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 14, marginBottom: 24 }}>
        {kpis.map(k => (
          <div key={k.label} style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16, padding: "20px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -10, right: -10, fontSize: 60, opacity: .07 }}>{k.icon}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,.4)", letterSpacing: 1, marginBottom: 8, fontWeight: 700 }}>{k.label.toUpperCase()}</div>
            <div style={{ fontSize: 32, fontWeight: 900, color: k.color, letterSpacing: -1 }}>{k.value}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,.35)", marginTop: 4 }}>{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
        {/* Créditos */}
        <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16, padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 16, color: "rgba(255,255,255,.7)" }}>💰 Balance de créditos hoy</div>
          {[
            { label: "Apostados", val: 240000, total: 240000, color: "#00c2ff" },
            { label: "Ganados por usuarios", val: STATS.creditsWon, total: 240000, color: "#30d158" },
            { label: "Perdidos por usuarios", val: STATS.creditsLost, total: 240000, color: "#ff3b30" },
          ].map(b => (
            <div key={b.label} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,.5)" }}>{b.label}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: b.color }}>{fmt(b.val)}</span>
              </div>
              <div style={{ background: "rgba(255,255,255,.08)", borderRadius: 4, height: 6 }}>
                <div style={{ width: `${(b.val / b.total) * 100}%`, height: "100%", background: b.color, borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </div>

        {/* Top ligas */}
        <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16, padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 16, color: "rgba(255,255,255,.7)" }}>🏆 Apuestas por liga hoy</div>
          {[
            { name: "Liga MX", pct: 38, count: 118, sport: "⚽" },
            { name: "NBA", pct: 24, count: 75, sport: "🏀" },
            { name: "Champions", pct: 19, count: 59, sport: "⚽" },
            { name: "LMB", pct: 11, count: 34, sport: "⚾" },
            { name: "NFL", pct: 8, count: 26, sport: "🏈" },
          ].map(l => (
            <div key={l.name} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 16, width: 24 }}>{l.sport}</span>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,.6)", width: 90 }}>{l.name}</span>
              <div style={{ flex: 1, background: "rgba(255,255,255,.08)", borderRadius: 4, height: 6 }}>
                <div style={{ width: `${l.pct}%`, height: "100%", background: "linear-gradient(90deg,#00c2ff,#0066ff)", borderRadius: 4 }} />
              </div>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,.4)", width: 30, textAlign: "right" }}>{l.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent bets */}
      <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16, padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,.7)" }}>⚡ Últimas apuestas en vivo</div>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,.3)" }}>Actualizando automáticamente</span>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["Ticket", "Usuario", "Evento", "Selección", "Apuesta", "Cuota", "Potencial", "Estado"].map(h => (
                <th key={h} style={{ fontSize: 10, color: "rgba(255,255,255,.3)", letterSpacing: 1, padding: "0 8px 12px", textAlign: "left", fontWeight: 700 }}>{h.toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RECENT_BETS.map((b, i) => (
              <tr key={b.id} style={{ borderTop: "1px solid rgba(255,255,255,.05)" }}>
                <td style={{ padding: "10px 8px", fontSize: 12, color: "rgba(255,255,255,.4)", fontFamily: "monospace" }}>{b.id}</td>
                <td style={{ padding: "10px 8px", fontSize: 13, fontWeight: 700 }}>{b.user}</td>
                <td style={{ padding: "10px 8px", fontSize: 12, color: "rgba(255,255,255,.6)" }}>{b.event}</td>
                <td style={{ padding: "10px 8px", fontSize: 12, color: "#00c2ff", fontWeight: 700 }}>{b.pick}</td>
                <td style={{ padding: "10px 8px", fontSize: 13, fontWeight: 700 }}>{fmt(b.amount)}</td>
                <td style={{ padding: "10px 8px", fontSize: 13, color: "#ff9f0a", fontWeight: 800 }}>{b.odd}x</td>
                <td style={{ padding: "10px 8px", fontSize: 13, color: "#30d158", fontWeight: 700 }}>+{fmt(b.potential)}</td>
                <td style={{ padding: "10px 8px" }}>
                  <span style={{
                    fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20,
                    background: b.status === "won" ? "rgba(48,209,88,.15)" : b.status === "lost" ? "rgba(255,59,48,.15)" : "rgba(255,159,10,.15)",
                    color: b.status === "won" ? "#30d158" : b.status === "lost" ? "#ff3b30" : "#ff9f0a",
                  }}>{b.status === "won" ? "GANADA" : b.status === "lost" ? "PERDIDA" : "PENDIENTE"}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── EVENTOS ───────────────────────────────────────────────────────────────────
function Eventos() {
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [showModal, setShowModal] = useState(false);
  const [editEvent, setEditEvent] = useState(null);
  const [form, setForm] = useState({ home: "", away: "", league: "", sport: "⚽", time: "", homeOdd: "", drawOdd: "", awayOdd: "" });
  const [search, setSearch] = useState("");

  const openNew = () => { setForm({ home: "", away: "", league: "", sport: "⚽", time: "", homeOdd: "", drawOdd: "", awayOdd: "" }); setEditEvent(null); setShowModal(true); };
  const openEdit = (ev) => { setForm({ home: ev.home, away: ev.away, league: ev.league, sport: ev.sport, time: ev.time, homeOdd: ev.homeOdd, drawOdd: ev.drawOdd || "", awayOdd: ev.awayOdd }); setEditEvent(ev); setShowModal(true); };

  const save = () => {
    if (editEvent) {
      setEvents(p => p.map(e => e.id === editEvent.id ? { ...e, ...form, homeOdd: +form.homeOdd, drawOdd: form.drawOdd ? +form.drawOdd : null, awayOdd: +form.awayOdd } : e));
    } else {
      setEvents(p => [...p, { id: Date.now(), ...form, homeOdd: +form.homeOdd, drawOdd: form.drawOdd ? +form.drawOdd : null, awayOdd: +form.awayOdd, active: true, live: false, bets: 0 }]);
    }
    setShowModal(false);
  };

  const toggle = (id) => setEvents(p => p.map(e => e.id === id ? { ...e, active: !e.active } : e));
  const del = (id) => setEvents(p => p.filter(e => e.id !== id));
  const filtered = events.filter(e => `${e.home} ${e.away} ${e.league}`.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 26, fontWeight: 900, margin: "0 0 4px", letterSpacing: -.5 }}>Eventos & Mercados</h2>
          <p style={{ color: "rgba(255,255,255,.4)", fontSize: 14, margin: 0 }}>{events.filter(e => e.active).length} activos · {events.filter(e => e.live).length} en vivo</p>
        </div>
        <Btn onClick={openNew}>+ Nuevo evento</Btn>
      </div>

      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar evento, liga..." style={{ width: "100%", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 12, padding: "11px 16px", color: "#fff", fontSize: 14, fontFamily: "inherit", marginBottom: 16, boxSizing: "border-box", outline: "none" }} />

      <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "rgba(255,255,255,.03)" }}>
              {["Evento", "Liga", "Hora", "Cuotas 1/X/2", "Apuestas", "Estado", "Acciones"].map(h => (
                <th key={h} style={{ fontSize: 10, color: "rgba(255,255,255,.3)", letterSpacing: 1, padding: "14px 16px", textAlign: "left", fontWeight: 700 }}>{h.toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(ev => (
              <tr key={ev.id} style={{ borderTop: "1px solid rgba(255,255,255,.05)" }}>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 18 }}>{ev.sport}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{ev.home} <span style={{ color: "rgba(255,255,255,.3)" }}>vs</span> {ev.away}</div>
                      {ev.live && <span style={{ fontSize: 10, background: "rgba(255,59,48,.2)", color: "#ff3b30", padding: "2px 7px", borderRadius: 10, fontWeight: 700 }}>● EN VIVO</span>}
                    </div>
                  </div>
                </td>
                <td style={{ padding: "14px 16px", fontSize: 12, color: "rgba(255,255,255,.5)" }}>{ev.league}</td>
                <td style={{ padding: "14px 16px", fontSize: 12, color: "rgba(255,255,255,.5)" }}>{ev.time}</td>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    {[ev.homeOdd, ev.drawOdd, ev.awayOdd].filter(Boolean).map((o, i) => (
                      <span key={i} style={{ background: "rgba(255,159,10,.1)", color: "#ff9f0a", padding: "3px 8px", borderRadius: 6, fontSize: 12, fontWeight: 800 }}>{o?.toFixed(2)}</span>
                    ))}
                  </div>
                </td>
                <td style={{ padding: "14px 16px", fontSize: 13, color: "rgba(255,255,255,.6)" }}>{ev.bets}</td>
                <td style={{ padding: "14px 16px" }}>
                  <div onClick={() => toggle(ev.id)} style={{ display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                    <div style={{ width: 36, height: 20, borderRadius: 10, background: ev.active ? "#30d158" : "rgba(255,255,255,.15)", position: "relative", transition: "background .2s" }}>
                      <div style={{ position: "absolute", top: 3, left: ev.active ? 18 : 3, width: 14, height: 14, borderRadius: "50%", background: "#fff", transition: "left .2s" }} />
                    </div>
                    <span style={{ fontSize: 12, color: ev.active ? "#30d158" : "rgba(255,255,255,.3)" }}>{ev.active ? "Activo" : "Inactivo"}</span>
                  </div>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Btn small onClick={() => openEdit(ev)} variant="secondary">✏️ Editar</Btn>
                    <Btn small onClick={() => del(ev.id)} variant="danger">🗑️</Btn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <Modal title={editEvent ? "Editar evento" : "Nuevo evento"} onClose={() => setShowModal(false)}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
            <Input label="Equipo local" value={form.home} onChange={v => setForm(p => ({ ...p, home: v }))} placeholder="Chivas" />
            <Input label="Equipo visitante" value={form.away} onChange={v => setForm(p => ({ ...p, away: v }))} placeholder="América" />
            <Input label="Liga" value={form.league} onChange={v => setForm(p => ({ ...p, league: v }))} placeholder="Liga MX" />
            <Select label="Deporte" value={form.sport} onChange={v => setForm(p => ({ ...p, sport: v }))} options={[{ value: "⚽", label: "⚽ Fútbol" }, { value: "🏀", label: "🏀 Básquet" }, { value: "⚾", label: "⚾ Béisbol" }, { value: "🏈", label: "🏈 Fútbol Americano" }, { value: "🎾", label: "🎾 Tenis" }]} />
            <Input label="Fecha y hora" value={form.time} onChange={v => setForm(p => ({ ...p, time: v }))} placeholder="21/04 20:00" />
            <div />
            <Input label="Cuota local (1)" value={form.homeOdd} onChange={v => setForm(p => ({ ...p, homeOdd: v }))} placeholder="2.40" type="number" />
            <Input label="Cuota empate (X)" value={form.drawOdd} onChange={v => setForm(p => ({ ...p, drawOdd: v }))} placeholder="3.10 (opcional)" type="number" />
            <Input label="Cuota visitante (2)" value={form.awayOdd} onChange={v => setForm(p => ({ ...p, awayOdd: v }))} placeholder="2.80" type="number" />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 8 }}>
            <Btn variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Btn>
            <Btn onClick={save}>Guardar evento</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── USUARIOS ──────────────────────────────────────────────────────────────────
function Usuarios() {
  const [users, setUsers] = useState(MOCK_USERS);
  const [selected, setSelected] = useState(null);
  const [creditsAdj, setCreditsAdj] = useState("");
  const [search, setSearch] = useState("");

  const toggleBlock = (id) => setUsers(p => p.map(u => u.id === id ? { ...u, status: u.status === "blocked" ? "active" : "blocked" } : u));
  const adjustCredits = (id) => {
    const n = parseInt(creditsAdj);
    if (!n) return;
    setUsers(p => p.map(u => u.id === id ? { ...u, credits: Math.max(0, u.credits + n) } : u));
    setCreditsAdj("");
  };
  const filtered = users.filter(u => `${u.username} ${u.email}`.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 26, fontWeight: 900, margin: "0 0 4px", letterSpacing: -.5 }}>Usuarios</h2>
        <p style={{ color: "rgba(255,255,255,.4)", fontSize: 14, margin: 0 }}>{users.filter(u => u.status === "active").length} activos · {users.filter(u => u.status === "blocked").length} bloqueados</p>
      </div>

      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar usuario o email..." style={{ width: "100%", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 12, padding: "11px 16px", color: "#fff", fontSize: 14, fontFamily: "inherit", marginBottom: 16, boxSizing: "border-box", outline: "none" }} />

      <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "rgba(255,255,255,.03)" }}>
              {["Usuario", "Créditos", "Nivel", "Apuestas", "Win rate", "Último acceso", "Estado", "Acciones"].map(h => (
                <th key={h} style={{ fontSize: 10, color: "rgba(255,255,255,.3)", letterSpacing: 1, padding: "14px 16px", textAlign: "left", fontWeight: 700 }}>{h.toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id} style={{ borderTop: "1px solid rgba(255,255,255,.05)", opacity: u.status === "blocked" ? .6 : 1 }}>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{u.username}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,.35)" }}>{u.email}</div>
                </td>
                <td style={{ padding: "14px 16px", fontWeight: 800, fontSize: 15, color: "#ff9f0a" }}>{fmt(u.credits)}</td>
                <td style={{ padding: "14px 16px", color: "rgba(255,255,255,.6)", fontSize: 13 }}>⭐ {u.level}</td>
                <td style={{ padding: "14px 16px", fontSize: 13, color: "rgba(255,255,255,.6)" }}>{u.bets}</td>
                <td style={{ padding: "14px 16px", fontSize: 13, color: u.bets > 0 && (u.wins / u.bets) > .5 ? "#30d158" : "rgba(255,255,255,.4)" }}>
                  {u.bets > 0 ? `${Math.round((u.wins / u.bets) * 100)}%` : "—"}
                </td>
                <td style={{ padding: "14px 16px", fontSize: 12, color: "rgba(255,255,255,.4)" }}>{u.lastSeen}</td>
                <td style={{ padding: "14px 16px" }}><StatusDot status={u.status} /></td>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Btn small onClick={() => setSelected(u)} variant="secondary">👁 Ver</Btn>
                    <Btn small onClick={() => toggleBlock(u.id)} variant={u.status === "blocked" ? "success" : "danger"}>
                      {u.status === "blocked" ? "✅ Activar" : "🚫 Bloquear"}
                    </Btn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <Modal title={`👤 ${selected.username}`} onClose={() => setSelected(null)}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
            {[
              { l: "Créditos", v: fmt(selected.credits), c: "#ff9f0a" },
              { l: "Nivel", v: `⭐ ${selected.level}`, c: "#fff" },
              { l: "Apuestas totales", v: selected.bets, c: "#00c2ff" },
              { l: "Ganadas", v: selected.wins, c: "#30d158" },
              { l: "Win rate", v: selected.bets > 0 ? `${Math.round((selected.wins / selected.bets) * 100)}%` : "—", c: "#bf5af2" },
              { l: "Se unió", v: selected.joined, c: "rgba(255,255,255,.5)" },
            ].map(x => (
              <div key={x.l} style={{ background: "rgba(255,255,255,.05)", borderRadius: 10, padding: "12px 14px" }}>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,.35)", letterSpacing: 1, marginBottom: 4 }}>{x.l.toUpperCase()}</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: x.c }}>{x.v}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(255,255,255,.04)", borderRadius: 12, padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,.4)", marginBottom: 10, fontWeight: 700, letterSpacing: 1 }}>AJUSTAR CRÉDITOS</div>
            <div style={{ display: "flex", gap: 10 }}>
              <input value={creditsAdj} onChange={e => setCreditsAdj(e.target.value)} placeholder="Ej: +500 o -200" type="number"
                style={{ flex: 1, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10, padding: "10px 14px", color: "#fff", fontSize: 14, fontFamily: "inherit", outline: "none" }} />
              <Btn onClick={() => adjustCredits(selected.id)}>Aplicar</Btn>
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.3)", marginTop: 8 }}>Usa valores positivos para agregar, negativos para quitar</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Btn variant={selected.status === "blocked" ? "success" : "danger"} onClick={() => { toggleBlock(selected.id); setSelected(null); }}>
              {selected.status === "blocked" ? "✅ Desbloquear usuario" : "🚫 Bloquear usuario"}
            </Btn>
            <Btn variant="secondary" onClick={() => setSelected(null)}>Cerrar</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── MISIONES ──────────────────────────────────────────────────────────────────
function Misiones() {
  const [missions, setMissions] = useState(MOCK_MISSIONS);
  const [showModal, setShowModal] = useState(false);
  const [editM, setEditM] = useState(null);
  const [form, setForm] = useState({ title: "", desc: "", reward: "", type: "daily", icon: "🎯" });

  const openNew = () => { setForm({ title: "", desc: "", reward: "", type: "daily", icon: "🎯" }); setEditM(null); setShowModal(true); };
  const openEdit = (m) => { setForm({ title: m.title, desc: m.desc, reward: m.reward, type: m.type, icon: m.icon }); setEditM(m); setShowModal(true); };
  const save = () => {
    if (editM) setMissions(p => p.map(m => m.id === editM.id ? { ...m, ...form, reward: +form.reward } : m));
    else setMissions(p => [...p, { id: Date.now(), ...form, reward: +form.reward, active: true, completions: 0 }]);
    setShowModal(false);
  };
  const toggle = (id) => setMissions(p => p.map(m => m.id === id ? { ...m, active: !m.active } : m));
  const del = (id) => setMissions(p => p.filter(m => m.id !== id));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 26, fontWeight: 900, margin: "0 0 4px", letterSpacing: -.5 }}>Misiones & Recompensas</h2>
          <p style={{ color: "rgba(255,255,255,.4)", fontSize: 14, margin: 0 }}>{missions.filter(m => m.active).length} activas · {missions.reduce((a, m) => a + m.completions, 0)} completadas en total</p>
        </div>
        <Btn onClick={openNew}>+ Nueva misión</Btn>
      </div>

      {["daily", "weekly"].map(type => (
        <div key={type} style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.3)", letterSpacing: 2, marginBottom: 12 }}>{type === "daily" ? "🌅 DIARIAS" : "📅 SEMANALES"}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 12 }}>
            {missions.filter(m => m.type === type).map(m => (
              <div key={m.id} style={{ background: "rgba(255,255,255,.04)", border: `1px solid ${m.active ? "rgba(255,255,255,.08)" : "rgba(255,255,255,.03)"}`, borderRadius: 14, padding: 18, opacity: m.active ? 1 : .5 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <span style={{ fontSize: 28 }}>{m.icon}</span>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 15 }}>{m.title}</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,.4)", marginTop: 2 }}>{m.desc}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 20, fontWeight: 900, color: "#ff9f0a" }}>+{fmt(m.reward)}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,.3)" }}>créditos</div>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,.3)" }}>{m.completions} completaciones</span>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <div onClick={() => toggle(m.id)} style={{ display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                      <div style={{ width: 32, height: 18, borderRadius: 9, background: m.active ? "#30d158" : "rgba(255,255,255,.15)", position: "relative", transition: "background .2s" }}>
                        <div style={{ position: "absolute", top: 2, left: m.active ? 16 : 2, width: 14, height: 14, borderRadius: "50%", background: "#fff", transition: "left .2s" }} />
                      </div>
                    </div>
                    <Btn small onClick={() => openEdit(m)} variant="secondary">✏️</Btn>
                    <Btn small onClick={() => del(m.id)} variant="danger">🗑️</Btn>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {showModal && (
        <Modal title={editM ? "Editar misión" : "Nueva misión"} onClose={() => setShowModal(false)}>
          <Input label="Título" value={form.title} onChange={v => setForm(p => ({ ...p, title: v }))} placeholder="Primera apuesta del día" />
          <Input label="Descripción" value={form.desc} onChange={v => setForm(p => ({ ...p, desc: v }))} placeholder="Realiza 1 apuesta hoy" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Input label="Recompensa (créditos)" value={form.reward} onChange={v => setForm(p => ({ ...p, reward: v }))} placeholder="100" type="number" />
            <Input label="Ícono (emoji)" value={form.icon} onChange={v => setForm(p => ({ ...p, icon: v }))} placeholder="🎯" />
          </div>
          <Select label="Tipo" value={form.type} onChange={v => setForm(p => ({ ...p, type: v }))} options={[{ value: "daily", label: "🌅 Diaria" }, { value: "weekly", label: "📅 Semanal" }]} />
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 8 }}>
            <Btn variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Btn>
            <Btn onClick={save}>Guardar misión</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── REPORTERÍA ────────────────────────────────────────────────────────────────
function Reporteria() {
  const [period, setPeriod] = useState("today");
  const periods = [{ id: "today", label: "Hoy" }, { id: "week", label: "Esta semana" }, { id: "month", label: "Este mes" }];

  const multiplier = period === "today" ? 1 : period === "week" ? 7 : 30;
  const data = {
    bets: 312 * multiplier, users: 23 * multiplier,
    creditsIn: 98000 * multiplier, creditsOut: 142000 * multiplier,
    won: 140 * multiplier, lost: 172 * multiplier,
  };

  const dailyBets = [28, 45, 62, 38, 71, 89, 55, 43, 67, 91, 78, 56, 82, 95];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 26, fontWeight: 900, margin: "0 0 4px", letterSpacing: -.5 }}>Reportería</h2>
          <p style={{ color: "rgba(255,255,255,.4)", fontSize: 14, margin: 0 }}>Métricas y estadísticas de la plataforma</p>
        </div>
        <div style={{ display: "flex", gap: 6, background: "rgba(255,255,255,.06)", borderRadius: 10, padding: 4 }}>
          {periods.map(p => (
            <button key={p.id} onClick={() => setPeriod(p.id)} style={{ padding: "7px 16px", borderRadius: 8, border: "none", background: period === p.id ? "rgba(0,194,255,.2)" : "transparent", color: period === p.id ? "#00c2ff" : "rgba(255,255,255,.5)", cursor: "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: 13 }}>{p.label}</button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Total apuestas", value: fmt(data.bets), icon: "🎯", color: "#00c2ff" },
          { label: "Nuevos usuarios", value: fmt(data.users), icon: "👥", color: "#bf5af2" },
          { label: "Apuestas ganadas", value: fmt(data.won), icon: "🏆", color: "#30d158" },
          { label: "Apuestas perdidas", value: fmt(data.lost), icon: "💔", color: "#ff3b30" },
          { label: "Créditos apostados", value: fmt(data.creditsIn), icon: "💸", color: "#ff9f0a" },
          { label: "Créditos pagados", value: fmt(data.creditsOut), icon: "💰", color: "#30d158" },
        ].map(k => (
          <div key={k.label} style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 14, padding: 18 }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.35)", letterSpacing: 1, marginBottom: 8, fontWeight: 700 }}>{k.label.toUpperCase()}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 24 }}>{k.icon}</span>
              <span style={{ fontSize: 26, fontWeight: 900, color: k.color }}>{k.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Mini bar chart */}
      <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16, padding: 24, marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,.6)", marginBottom: 20 }}>📈 Apuestas por hora (hoy)</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 100 }}>
          {dailyBets.map((v, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ width: "100%", background: i === dailyBets.length - 1 ? "linear-gradient(180deg,#00c2ff,#0066ff)" : "rgba(0,194,255,.25)", borderRadius: "4px 4px 0 0", height: `${(v / Math.max(...dailyBets)) * 90}px`, transition: "height .3s" }} />
              <span style={{ fontSize: 9, color: "rgba(255,255,255,.25)" }}>{(i + 7)}h</span>
            </div>
          ))}
        </div>
      </div>

      {/* Win rate donut (fake) */}
      <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16, padding: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,.6)", marginBottom: 16 }}>🥧 Resultado de apuestas</div>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <svg viewBox="0 0 80 80" style={{ width: 100, height: 100, flexShrink: 0 }}>
            <circle cx="40" cy="40" r="30" fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="14" />
            <circle cx="40" cy="40" r="30" fill="none" stroke="#30d158" strokeWidth="14" strokeDasharray={`${(data.won / data.bets) * 188} 188`} strokeDashoffset="47" strokeLinecap="round" />
            <circle cx="40" cy="40" r="30" fill="none" stroke="#ff3b30" strokeWidth="14" strokeDasharray={`${(data.lost / data.bets) * 188} 188`} strokeDashoffset={`${47 - (data.won / data.bets) * 188}`} strokeLinecap="round" />
            <text x="40" y="44" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="800">{Math.round((data.won / data.bets) * 100)}%</text>
          </svg>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { label: "Ganadas por usuarios", val: data.won, color: "#30d158" },
              { label: "Perdidas por usuarios", val: data.lost, color: "#ff3b30" },
              { label: "Total procesadas", val: data.bets, color: "#00c2ff" },
            ].map(x => (
              <div key={x.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: x.color, flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: "rgba(255,255,255,.5)" }}>{x.label}</span>
                <span style={{ fontSize: 15, fontWeight: 800, color: x.color, marginLeft: "auto" }}>{fmt(x.val)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── OPERADORES ────────────────────────────────────────────────────────────────
function Operadores() {
  const [operators, setOperators] = useState(MOCK_OPERATORS);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", role: "support" });

  const save = () => {
    setOperators(p => [...p, { id: Date.now(), ...form, status: "active", lastLogin: "Nunca", permissions: [] }]);
    setShowModal(false);
    setForm({ name: "", email: "", role: "support" });
  };
  const toggleStatus = (id) => setOperators(p => p.map(o => o.id === id ? { ...o, status: o.status === "active" ? "inactive" : "active" } : o));
  const del = (id) => setOperators(p => p.filter(o => o.id !== id));

  const roleInfo = {
    superadmin: { label: "Super Admin", desc: "Acceso total a todo", perms: ["Eventos", "Usuarios", "Misiones", "Reportes", "Operadores"] },
    operator: { label: "Operador", desc: "Gestiona eventos y misiones", perms: ["Eventos", "Misiones"] },
    support: { label: "Soporte", desc: "Ve usuarios y reportes", perms: ["Usuarios", "Reportes"] },
    agent: { label: "Agente", desc: "Solo reportería", perms: ["Reportes"] },
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 26, fontWeight: 900, margin: "0 0 4px", letterSpacing: -.5 }}>Operadores & Agentes</h2>
          <p style={{ color: "rgba(255,255,255,.4)", fontSize: 14, margin: 0 }}>Gestiona quién puede acceder a FinnPlay y qué puede hacer</p>
        </div>
        <Btn onClick={() => setShowModal(true)}>+ Nuevo operador</Btn>
      </div>

      {/* Role legend */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
        {Object.entries(roleInfo).map(([key, r]) => (
          <div key={key} style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 12, padding: 14 }}>
            <div style={{ marginBottom: 8 }}><RoleBadge role={key} /></div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)", marginBottom: 8 }}>{r.desc}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {r.perms.map(p => <span key={p} style={{ fontSize: 10, background: "rgba(255,255,255,.06)", color: "rgba(255,255,255,.5)", padding: "2px 7px", borderRadius: 6 }}>{p}</span>)}
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "rgba(255,255,255,.03)" }}>
              {["Operador", "Rol", "Último acceso", "Estado", "Acciones"].map(h => (
                <th key={h} style={{ fontSize: 10, color: "rgba(255,255,255,.3)", letterSpacing: 1, padding: "14px 20px", textAlign: "left", fontWeight: 700 }}>{h.toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {operators.map(op => (
              <tr key={op.id} style={{ borderTop: "1px solid rgba(255,255,255,.05)" }}>
                <td style={{ padding: "16px 20px" }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{op.name}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,.35)" }}>{op.email}</div>
                </td>
                <td style={{ padding: "16px 20px" }}><RoleBadge role={op.role} /></td>
                <td style={{ padding: "16px 20px", fontSize: 12, color: "rgba(255,255,255,.4)" }}>{op.lastLogin}</td>
                <td style={{ padding: "16px 20px" }}><StatusDot status={op.status} /></td>
                <td style={{ padding: "16px 20px" }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Btn small onClick={() => toggleStatus(op.id)} variant={op.status === "active" ? "secondary" : "success"}>
                      {op.status === "active" ? "⏸ Desactivar" : "▶️ Activar"}
                    </Btn>
                    {op.role !== "superadmin" && <Btn small onClick={() => del(op.id)} variant="danger">🗑️</Btn>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <Modal title="Nuevo operador" onClose={() => setShowModal(false)}>
          <Input label="Nombre completo" value={form.name} onChange={v => setForm(p => ({ ...p, name: v }))} placeholder="Carlos Soporte" />
          <Input label="Email" value={form.email} onChange={v => setForm(p => ({ ...p, email: v }))} placeholder="carlos@finnplay.com" type="email" />
          <Select label="Rol" value={form.role} onChange={v => setForm(p => ({ ...p, role: v }))} options={[
            { value: "operator", label: "Operador — Eventos y Misiones" },
            { value: "support", label: "Soporte — Usuarios y Reportes" },
            { value: "agent", label: "Agente — Solo Reportes" },
          ]} />
          <div style={{ background: "rgba(0,194,255,.07)", border: "1px solid rgba(0,194,255,.15)", borderRadius: 10, padding: 12, marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: "#00c2ff" }}>ℹ️ Se enviará un correo de invitación con credenciales temporales</div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <Btn variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Btn>
            <Btn onClick={save} disabled={!form.name || !form.email}>Crear operador</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// APP SHELL
// ═══════════════════════════════════════════════════════════════════════════════
export default function FinnPlay() {
  const [section, setSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const nav = [
    { id: "dashboard", label: "Dashboard", icon: "◼" },
    { id: "eventos", label: "Eventos", icon: "⚽" },
    { id: "usuarios", label: "Usuarios", icon: "👥" },
    { id: "misiones", label: "Misiones", icon: "⚡" },
    { id: "reporteria", label: "Reportería", icon: "📊" },
    { id: "operadores", label: "Operadores", icon: "🔐" },
  ];

  const sectionMap = { dashboard: <Dashboard />, eventos: <Eventos />, usuarios: <Usuarios />, misiones: <Misiones />, reporteria: <Reporteria />, operadores: <Operadores /> };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0d1120", color: "#fff", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px } ::-webkit-scrollbar-thumb { background: rgba(255,255,255,.12); border-radius: 4px }
        input::placeholder { color: rgba(255,255,255,.25) !important }
        @keyframes fadeUp { from { transform: translateY(20px); opacity: 0 } to { transform: none; opacity: 1 } }
      `}</style>

      {/* Sidebar */}
      <aside style={{
        width: sidebarOpen ? 220 : 64, flexShrink: 0, background: "#080c18",
        borderRight: "1px solid rgba(255,255,255,.06)", display: "flex", flexDirection: "column",
        transition: "width .25s ease", overflow: "hidden", position: "sticky", top: 0, height: "100vh",
      }}>
        {/* Logo */}
        <div style={{ padding: "20px 16px", borderBottom: "1px solid rgba(255,255,255,.06)", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg,#00c2ff,#0066ff)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>F</div>
          {sidebarOpen && <div>
            <div style={{ fontSize: 16, fontWeight: 900, letterSpacing: -.5 }}>FinnPlay</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,.3)", letterSpacing: 1 }}>BACKOFFICE</div>
          </div>}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "12px 8px" }}>
          {nav.map(n => (
            <button key={n.id} onClick={() => setSection(n.id)} style={{
              width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "10px 10px",
              borderRadius: 10, border: "none", cursor: "pointer", marginBottom: 2, transition: "all .15s",
              background: section === n.id ? "rgba(0,194,255,.12)" : "transparent",
              color: section === n.id ? "#00c2ff" : "rgba(255,255,255,.45)",
            }}>
              <span style={{ fontSize: 16, flexShrink: 0, width: 20, textAlign: "center" }}>{n.icon}</span>
              {sidebarOpen && <span style={{ fontSize: 14, fontWeight: section === n.id ? 700 : 500, whiteSpace: "nowrap" }}>{n.label}</span>}
              {sidebarOpen && section === n.id && <div style={{ marginLeft: "auto", width: 4, height: 4, borderRadius: "50%", background: "#00c2ff" }} />}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div style={{ padding: "12px 8px", borderTop: "1px solid rgba(255,255,255,.06)" }}>
          <button onClick={() => setSidebarOpen(p => !p)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "10px", borderRadius: 10, border: "none", cursor: "pointer", background: "transparent", color: "rgba(255,255,255,.3)", fontSize: 13 }}>
            <span style={{ fontSize: 16, width: 20, textAlign: "center" }}>{sidebarOpen ? "◀" : "▶"}</span>
            {sidebarOpen && <span>Colapsar</span>}
          </button>
          {sidebarOpen && (
            <div style={{ marginTop: 10, padding: "10px 10px", background: "rgba(255,255,255,.04)", borderRadius: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 700 }}>Admin Principal</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.3)", marginTop: 2 }}>admin@finnplay.com</div>
              <div style={{ marginTop: 6 }}><RoleBadge role="superadmin" /></div>
            </div>
          )}
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, overflowY: "auto", padding: 28 }}>
        {/* Top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, paddingBottom: 20, borderBottom: "1px solid rgba(255,255,255,.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,.25)" }}>FinnPlay</span>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,.15)" }}>›</span>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,.6)", fontWeight: 600, textTransform: "capitalize" }}>{section}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(48,209,88,.1)", border: "1px solid rgba(48,209,88,.2)", borderRadius: 20, padding: "5px 12px" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#30d158", display: "inline-block", boxShadow: "0 0 6px #30d158" }} />
              <span style={{ fontSize: 12, color: "#30d158", fontWeight: 600 }}>Betvora online</span>
            </div>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#00c2ff,#0066ff)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800 }}>A</div>
          </div>
        </div>
        {sectionMap[section]}
      </main>
    </div>
  );
}
