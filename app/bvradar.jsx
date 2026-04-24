"use client";
import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";

// ── HELPERS ───────────────────────────────────────────────────────────────────
const fmt = (n) => Number(n)?.toLocaleString("es-MX");

// ── LOADING ───────────────────────────────────────────────────────────────────
const Loader = () => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 60, color: "rgba(255,255,255,.3)", flexDirection: "column", gap: 14 }}>
    <div style={{ width: 36, height: 36, borderRadius: "50%", border: "3px solid rgba(0,194,255,.2)", borderTopColor: "#00c2ff", animation: "spin .8s linear infinite" }} />
    <span style={{ fontSize: 13 }}>Cargando desde Supabase...</span>
  </div>
);

const Empty = ({ msg }) => (
  <div style={{ textAlign: "center", padding: "48px 20px", color: "rgba(255,255,255,.25)", fontSize: 14 }}>
    📭 {msg}
  </div>
);

// ── ROLE BADGE ────────────────────────────────────────────────────────────────
const RoleBadge = ({ role }) => {
  const map = {
    superadmin: { label: "Super Admin", bg: "rgba(255,59,48,.15)", color: "#ff3b30" },
    operator:   { label: "Operador",    bg: "rgba(255,159,10,.15)", color: "#ff9f0a" },
    support:    { label: "Soporte",     bg: "rgba(48,209,88,.15)",  color: "#30d158" },
    agent:      { label: "Agente",      bg: "rgba(100,210,255,.15)",color: "#64d2ff" },
  };
  const s = map[role] || map.agent;
  return <span style={{ background: s.bg, color: s.color, padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: .5 }}>{s.label.toUpperCase()}</span>;
};

const StatusDot = ({ status }) => {
  const c = status === "active" ? "#30d158" : status === "blocked" ? "#ff3b30" : "#636366";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, color: c, fontWeight: 600 }}>
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: c, display: "inline-block", boxShadow: status === "active" ? `0 0 6px ${c}` : "none" }} />
      {status === "active" ? "Activo" : status === "blocked" ? "Bloqueado" : "Inactivo"}
    </span>
  );
};

// ── MODAL ─────────────────────────────────────────────────────────────────────
function Modal({ title, onClose, children }) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.75)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#161b2e", border: "1px solid rgba(255,255,255,.1)", borderRadius: 20, padding: 28, width: "100%", maxWidth: 500, maxHeight: "90vh", overflowY: "auto", animation: "fadeUp .25s ease" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: "#fff", margin: 0 }}>{title}</h3>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,.08)", border: "none", color: "rgba(255,255,255,.6)", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 16 }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

const Input = ({ label, value, onChange, type = "text", placeholder }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={{ display: "block", fontSize: 11, color: "rgba(255,255,255,.4)", letterSpacing: 1, marginBottom: 6, fontWeight: 700 }}>{label.toUpperCase()}</label>
    <input type={type} value={value ?? ""} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      style={{ width: "100%", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10, padding: "10px 14px", color: "#fff", fontSize: 14, fontFamily: "inherit", boxSizing: "border-box", outline: "none" }} />
  </div>
);

const SelectField = ({ label, value, onChange, options }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={{ display: "block", fontSize: 11, color: "rgba(255,255,255,.4)", letterSpacing: 1, marginBottom: 6, fontWeight: 700 }}>{label.toUpperCase()}</label>
    <select value={value} onChange={e => onChange(e.target.value)}
      style={{ width: "100%", background: "#1e2540", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10, padding: "10px 14px", color: "#fff", fontSize: 14, fontFamily: "inherit", boxSizing: "border-box", outline: "none" }}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </div>
);

const Btn = ({ children, onClick, variant = "primary", disabled, small }) => {
  const bg    = variant === "primary" ? "linear-gradient(135deg,#00c2ff,#0066ff)" : variant === "danger" ? "rgba(255,59,48,.15)" : variant === "success" ? "rgba(48,209,88,.15)" : "rgba(255,255,255,.08)";
  const color = variant === "primary" ? "#fff" : variant === "danger" ? "#ff3b30" : variant === "success" ? "#30d158" : "rgba(255,255,255,.7)";
  return (
    <button onClick={onClick} disabled={disabled}
      style={{ background: bg, color, border: "none", borderRadius: 10, padding: small ? "7px 14px" : "11px 20px", fontSize: small ? 12 : 14, fontWeight: 700, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? .5 : 1, fontFamily: "inherit", letterSpacing: .3 }}>
      {children}
    </button>
  );
};

const Toggle = ({ active, onChange }) => (
  <div onClick={onChange} style={{ display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
    <div style={{ width: 36, height: 20, borderRadius: 10, background: active ? "#30d158" : "rgba(255,255,255,.15)", position: "relative", transition: "background .2s" }}>
      <div style={{ position: "absolute", top: 3, left: active ? 18 : 3, width: 14, height: 14, borderRadius: "50%", background: "#fff", transition: "left .2s" }} />
    </div>
    <span style={{ fontSize: 12, color: active ? "#30d158" : "rgba(255,255,255,.3)" }}>{active ? "Activo" : "Inactivo"}</span>
  </div>
);

// ══════════════════════════════════════════════════════════════════════════════
// DASHBOARD
// ══════════════════════════════════════════════════════════════════════════════
function Dashboard() {
  const [stats, setStats] = useState({ users: 0, events: 0, bets: 0, pending: 0, missions: 0, operators: 0 });
  const [recentBets, setRecentBets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [
        { count: users },
        { count: events },
        { count: bets },
        { count: pending },
        { count: missions },
        { count: operators },
        { data: betRows },
      ] = await Promise.all([
        supabase.from("users").select("*", { count: "exact", head: true }),
        supabase.from("events").select("*", { count: "exact", head: true }).eq("active", true),
        supabase.from("bets").select("*", { count: "exact", head: true }),
        supabase.from("bets").select("*", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("missions").select("*", { count: "exact", head: true }).eq("active", true),
        supabase.from("operators").select("*", { count: "exact", head: true }),
        supabase.from("bets").select("ticket_id, amount, total_odd, potential, status, created_at, users(username)").order("created_at", { ascending: false }).limit(6),
      ]);
      setStats({ users: users || 0, events: events || 0, bets: bets || 0, pending: pending || 0, missions: missions || 0, operators: operators || 0 });
      setRecentBets(betRows || []);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <Loader />;

  const kpis = [
    { label: "Usuarios registrados", value: fmt(stats.users), icon: "👥", color: "#00c2ff" },
    { label: "Eventos activos",      value: fmt(stats.events), icon: "⚽", color: "#30d158" },
    { label: "Apuestas totales",     value: fmt(stats.bets),   icon: "🎯", color: "#ff9f0a" },
    { label: "Pendientes",           value: fmt(stats.pending),icon: "⏳", color: "#bf5af2" },
    { label: "Misiones activas",     value: fmt(stats.missions),icon: "⚡", color: "#ffd700" },
    { label: "Operadores",           value: fmt(stats.operators),icon: "🔐", color: "#ff3b30" },
  ];

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 26, fontWeight: 900, margin: "0 0 4px", letterSpacing: -.5 }}>Dashboard</h2>
        <p style={{ color: "rgba(255,255,255,.4)", fontSize: 14, margin: 0 }}>Datos en tiempo real desde Supabase</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 14, marginBottom: 28 }}>
        {kpis.map(k => (
          <div key={k.label} style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16, padding: 20, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -10, right: -10, fontSize: 56, opacity: .08 }}>{k.icon}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)", letterSpacing: 1, marginBottom: 8, fontWeight: 700 }}>{k.label.toUpperCase()}</div>
            <div style={{ fontSize: 34, fontWeight: 900, color: k.color, letterSpacing: -1 }}>{k.value}</div>
          </div>
        ))}
      </div>

      <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16, padding: 24 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,.6)", marginBottom: 18 }}>⚡ Últimas apuestas</div>
        {recentBets.length === 0 ? <Empty msg="No hay apuestas aún" /> : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Ticket", "Usuario", "Apuesta", "Cuota", "Potencial", "Estado"].map(h => (
                  <th key={h} style={{ fontSize: 10, color: "rgba(255,255,255,.3)", letterSpacing: 1, padding: "0 10px 12px", textAlign: "left", fontWeight: 700 }}>{h.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentBets.map(b => (
                <tr key={b.ticket_id} style={{ borderTop: "1px solid rgba(255,255,255,.05)" }}>
                  <td style={{ padding: "10px", fontSize: 12, color: "rgba(255,255,255,.4)", fontFamily: "monospace" }}>{b.ticket_id}</td>
                  <td style={{ padding: "10px", fontSize: 13, fontWeight: 700 }}>{b.users?.username || "—"}</td>
                  <td style={{ padding: "10px", fontSize: 13 }}>{fmt(b.amount)}</td>
                  <td style={{ padding: "10px", fontSize: 13, color: "#ff9f0a", fontWeight: 800 }}>{Number(b.total_odd).toFixed(2)}x</td>
                  <td style={{ padding: "10px", fontSize: 13, color: "#30d158", fontWeight: 700 }}>+{fmt(b.potential)}</td>
                  <td style={{ padding: "10px" }}>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: b.status === "won" ? "rgba(48,209,88,.15)" : b.status === "lost" ? "rgba(255,59,48,.15)" : "rgba(255,159,10,.15)", color: b.status === "won" ? "#30d158" : b.status === "lost" ? "#ff3b30" : "#ff9f0a" }}>
                      {b.status === "won" ? "GANADA" : b.status === "lost" ? "PERDIDA" : "PENDIENTE"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// EVENTOS
// ══════════════════════════════════════════════════════════════════════════════
function Eventos() {
  const [events, setEvents]     = useState([]);
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editEvent, setEditEvent] = useState(null);
  const [search, setSearch]     = useState("");
  const emptyForm = { home: "", away: "", league: "", sport: "⚽", event_time: "", home_odd: "", draw_odd: "", away_odd: "" };
  const [form, setForm]         = useState(emptyForm);

  useEffect(() => { fetchEvents(); }, []);

  async function fetchEvents() {
    setLoading(true);
    const { data } = await supabase.from("events").select("*").order("created_at", { ascending: false });
    setEvents(data || []);
    setLoading(false);
  }

  const openNew  = () => { setForm(emptyForm); setEditEvent(null); setShowModal(true); };
  const openEdit = (ev) => { setForm({ home: ev.home, away: ev.away, league: ev.league, sport: ev.sport, event_time: ev.event_time, home_odd: ev.home_odd, draw_odd: ev.draw_odd ?? "", away_odd: ev.away_odd }); setEditEvent(ev); setShowModal(true); };

  async function save() {
    setSaving(true);
    const payload = { ...form, home_odd: Number(form.home_odd), draw_odd: form.draw_odd ? Number(form.draw_odd) : null, away_odd: Number(form.away_odd) };
    if (editEvent) {
      await supabase.from("events").update(payload).eq("id", editEvent.id);
    } else {
      await supabase.from("events").insert({ ...payload, active: true, live: false });
    }
    setSaving(false);
    setShowModal(false);
    fetchEvents();
  }

  async function toggleActive(ev) {
    await supabase.from("events").update({ active: !ev.active }).eq("id", ev.id);
    setEvents(p => p.map(e => e.id === ev.id ? { ...e, active: !e.active } : e));
  }

  async function toggleLive(ev) {
    await supabase.from("events").update({ live: !ev.live }).eq("id", ev.id);
    setEvents(p => p.map(e => e.id === ev.id ? { ...e, live: !e.live } : e));
  }

  async function del(id) {
    if (!confirm("¿Eliminar este evento?")) return;
    await supabase.from("events").delete().eq("id", id);
    setEvents(p => p.filter(e => e.id !== id));
  }

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

      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar evento o liga..."
        style={{ width: "100%", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 12, padding: "11px 16px", color: "#fff", fontSize: 14, fontFamily: "inherit", marginBottom: 16, boxSizing: "border-box", outline: "none" }} />

      {loading ? <Loader /> : filtered.length === 0 ? <Empty msg="No hay eventos. Crea el primero." /> : (
        <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16, overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,.03)" }}>
                {["Evento", "Liga", "Hora", "Cuotas", "Activo", "En Vivo", "Acciones"].map(h => (
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
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{ev.home} <span style={{ color: "rgba(255,255,255,.3)" }}>vs</span> {ev.away}</div>
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 12, color: "rgba(255,255,255,.5)" }}>{ev.league}</td>
                  <td style={{ padding: "14px 16px", fontSize: 12, color: "rgba(255,255,255,.5)" }}>{ev.event_time}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", gap: 5 }}>
                      {[ev.home_odd, ev.draw_odd, ev.away_odd].filter(Boolean).map((o, i) => (
                        <span key={i} style={{ background: "rgba(255,159,10,.1)", color: "#ff9f0a", padding: "3px 8px", borderRadius: 6, fontSize: 12, fontWeight: 800 }}>{Number(o).toFixed(2)}</span>
                      ))}
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px" }}><Toggle active={ev.active} onChange={() => toggleActive(ev)} /></td>
                  <td style={{ padding: "14px 16px" }}><Toggle active={ev.live} onChange={() => toggleLive(ev)} /></td>
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
      )}

      {showModal && (
        <Modal title={editEvent ? "Editar evento" : "Nuevo evento"} onClose={() => setShowModal(false)}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
            <Input label="Equipo local"     value={form.home}       onChange={v => setForm(p => ({ ...p, home: v }))}       placeholder="Chivas" />
            <Input label="Equipo visitante" value={form.away}       onChange={v => setForm(p => ({ ...p, away: v }))}       placeholder="América" />
            <Input label="Liga"             value={form.league}     onChange={v => setForm(p => ({ ...p, league: v }))}     placeholder="Liga MX" />
            <SelectField label="Deporte" value={form.sport} onChange={v => setForm(p => ({ ...p, sport: v }))}
              options={[{ value: "⚽", label: "⚽ Fútbol" }, { value: "🏀", label: "🏀 Básquet" }, { value: "⚾", label: "⚾ Béisbol" }, { value: "🏈", label: "🏈 Fútbol Am." }, { value: "🎾", label: "🎾 Tenis" }]} />
            <Input label="Fecha y hora" value={form.event_time} onChange={v => setForm(p => ({ ...p, event_time: v }))} placeholder="22/04 20:00" />
            <div />
            <Input label="Cuota local (1)"     value={form.home_odd} onChange={v => setForm(p => ({ ...p, home_odd: v }))} placeholder="2.40" type="number" />
            <Input label="Cuota empate (X)"    value={form.draw_odd} onChange={v => setForm(p => ({ ...p, draw_odd: v }))} placeholder="3.10 (opcional)" type="number" />
            <Input label="Cuota visitante (2)" value={form.away_odd} onChange={v => setForm(p => ({ ...p, away_odd: v }))} placeholder="2.80" type="number" />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 8 }}>
            <Btn variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Btn>
            <Btn onClick={save} disabled={saving || !form.home || !form.away}>{saving ? "Guardando..." : "Guardar evento"}</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// USUARIOS
// ══════════════════════════════════════════════════════════════════════════════
function Usuarios() {
  const [users, setUsers]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [selected, setSelected] = useState(null);
  const [creditsAdj, setCreditsAdj] = useState("");
  const [search, setSearch]     = useState("");
  const [saving, setSaving]     = useState(false);

  useEffect(() => { fetchUsers(); }, []);

  async function fetchUsers() {
    setLoading(true);
    const { data } = await supabase.from("users").select("*").order("created_at", { ascending: false });
    setUsers(data || []);
    setLoading(false);
  }

  async function toggleBlock(user) {
    const newStatus = user.status === "blocked" ? "active" : "blocked";
    await supabase.from("users").update({ status: newStatus }).eq("id", user.id);
    setUsers(p => p.map(u => u.id === user.id ? { ...u, status: newStatus } : u));
    if (selected?.id === user.id) setSelected(s => ({ ...s, status: newStatus }));
  }

  async function adjustCredits(user) {
    const n = parseInt(creditsAdj);
    if (!n) return;
    setSaving(true);
    const newCredits = Math.max(0, (user.credits || 0) + n);
    await supabase.from("users").update({ credits: newCredits }).eq("id", user.id);
    setUsers(p => p.map(u => u.id === user.id ? { ...u, credits: newCredits } : u));
    setSelected(s => ({ ...s, credits: newCredits }));
    setCreditsAdj("");
    setSaving(false);
  }

  const filtered = users.filter(u => `${u.username} ${u.email}`.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 26, fontWeight: 900, margin: "0 0 4px", letterSpacing: -.5 }}>Usuarios</h2>
        <p style={{ color: "rgba(255,255,255,.4)", fontSize: 14, margin: 0 }}>{users.filter(u => u.status === "active").length} activos · {users.filter(u => u.status === "blocked").length} bloqueados</p>
      </div>

      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar usuario o email..."
        style={{ width: "100%", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 12, padding: "11px 16px", color: "#fff", fontSize: 14, fontFamily: "inherit", marginBottom: 16, boxSizing: "border-box", outline: "none" }} />

      {loading ? <Loader /> : filtered.length === 0 ? <Empty msg="No hay usuarios aún" /> : (
        <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16, overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,.03)" }}>
                {["Usuario", "Créditos", "Nivel", "Racha", "Estado", "Registro", "Acciones"].map(h => (
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
                  <td style={{ padding: "14px 16px", color: "rgba(255,255,255,.6)", fontSize: 13 }}>🔥 {u.streak || 0}</td>
                  <td style={{ padding: "14px 16px" }}><StatusDot status={u.status} /></td>
                  <td style={{ padding: "14px 16px", fontSize: 12, color: "rgba(255,255,255,.4)" }}>{u.created_at ? new Date(u.created_at).toLocaleDateString("es-MX") : "—"}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <Btn small onClick={() => { setSelected(u); setCreditsAdj(""); }} variant="secondary">👁 Ver</Btn>
                      <Btn small onClick={() => toggleBlock(u)} variant={u.status === "blocked" ? "success" : "danger"}>
                        {u.status === "blocked" ? "✅" : "🚫"}
                      </Btn>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <Modal title={`👤 ${selected.username}`} onClose={() => setSelected(null)}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
            {[
              { l: "Créditos",  v: fmt(selected.credits),  c: "#ff9f0a" },
              { l: "Nivel",     v: `⭐ ${selected.level}`, c: "#fff" },
              { l: "XP",        v: fmt(selected.xp),       c: "#00c2ff" },
              { l: "Racha",     v: `🔥 ${selected.streak || 0} días`, c: "#ff5722" },
              { l: "Estado",    v: selected.status,        c: selected.status === "active" ? "#30d158" : "#ff3b30" },
              { l: "Email",     v: selected.email,         c: "rgba(255,255,255,.5)" },
            ].map(x => (
              <div key={x.l} style={{ background: "rgba(255,255,255,.05)", borderRadius: 10, padding: "12px 14px" }}>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,.35)", letterSpacing: 1, marginBottom: 4 }}>{x.l.toUpperCase()}</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: x.c, wordBreak: "break-all" }}>{x.v}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(255,255,255,.04)", borderRadius: 12, padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,.4)", marginBottom: 10, fontWeight: 700, letterSpacing: 1 }}>AJUSTAR CRÉDITOS</div>
            <div style={{ display: "flex", gap: 10 }}>
              <input value={creditsAdj} onChange={e => setCreditsAdj(e.target.value)} placeholder="Ej: +500 o -200" type="number"
                style={{ flex: 1, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10, padding: "10px 14px", color: "#fff", fontSize: 14, fontFamily: "inherit", outline: "none" }} />
              <Btn onClick={() => adjustCredits(selected)} disabled={saving}>{saving ? "..." : "Aplicar"}</Btn>
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.3)", marginTop: 8 }}>Positivo para agregar, negativo para quitar</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Btn variant={selected.status === "blocked" ? "success" : "danger"} onClick={() => { toggleBlock(selected); setSelected(null); }}>
              {selected.status === "blocked" ? "✅ Desbloquear" : "🚫 Bloquear usuario"}
            </Btn>
            <Btn variant="secondary" onClick={() => setSelected(null)}>Cerrar</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MISIONES
// ══════════════════════════════════════════════════════════════════════════════
function Misiones() {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editM, setEditM]       = useState(null);
  const [saving, setSaving]     = useState(false);
  const emptyForm = { title: "", description: "", reward: "", type: "daily", icon: "🎯" };
  const [form, setForm]         = useState(emptyForm);

  useEffect(() => { fetchMissions(); }, []);

  async function fetchMissions() {
    setLoading(true);
    const { data } = await supabase.from("missions").select("*").order("created_at", { ascending: false });
    setMissions(data || []);
    setLoading(false);
  }

  const openNew  = () => { setForm(emptyForm); setEditM(null); setShowModal(true); };
  const openEdit = (m) => { setForm({ title: m.title, description: m.description, reward: m.reward, type: m.type, icon: m.icon }); setEditM(m); setShowModal(true); };

  async function save() {
    setSaving(true);
    const payload = { ...form, reward: Number(form.reward) };
    if (editM) {
      await supabase.from("missions").update(payload).eq("id", editM.id);
    } else {
      await supabase.from("missions").insert({ ...payload, active: true });
    }
    setSaving(false);
    setShowModal(false);
    fetchMissions();
  }

  async function toggle(m) {
    await supabase.from("missions").update({ active: !m.active }).eq("id", m.id);
    setMissions(p => p.map(x => x.id === m.id ? { ...x, active: !x.active } : x));
  }

  async function del(id) {
    if (!confirm("¿Eliminar esta misión?")) return;
    await supabase.from("missions").delete().eq("id", id);
    setMissions(p => p.filter(m => m.id !== id));
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 26, fontWeight: 900, margin: "0 0 4px", letterSpacing: -.5 }}>Misiones & Recompensas</h2>
          <p style={{ color: "rgba(255,255,255,.4)", fontSize: 14, margin: 0 }}>{missions.filter(m => m.active).length} activas</p>
        </div>
        <Btn onClick={openNew}>+ Nueva misión</Btn>
      </div>

      {loading ? <Loader /> : (
        ["daily", "weekly"].map(type => {
          const list = missions.filter(m => m.type === type);
          return (
            <div key={type} style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.3)", letterSpacing: 2, marginBottom: 12 }}>
                {type === "daily" ? "🌅 DIARIAS" : "📅 SEMANALES"}
              </div>
              {list.length === 0 ? <Empty msg={`No hay misiones ${type === "daily" ? "diarias" : "semanales"}`} /> : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 12 }}>
                  {list.map(m => (
                    <div key={m.id} style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 14, padding: 18, opacity: m.active ? 1 : .5 }}>
                      <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 14 }}>
                        <span style={{ fontSize: 28 }}>{m.icon}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 800, fontSize: 15 }}>{m.title}</div>
                          <div style={{ fontSize: 12, color: "rgba(255,255,255,.4)", marginTop: 2 }}>{m.description}</div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: 20, fontWeight: 900, color: "#ff9f0a" }}>+{fmt(m.reward)}</div>
                          <div style={{ fontSize: 10, color: "rgba(255,255,255,.3)" }}>créditos</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Toggle active={m.active} onChange={() => toggle(m)} />
                        <div style={{ display: "flex", gap: 8 }}>
                          <Btn small onClick={() => openEdit(m)} variant="secondary">✏️</Btn>
                          <Btn small onClick={() => del(m.id)} variant="danger">🗑️</Btn>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })
      )}

      {showModal && (
        <Modal title={editM ? "Editar misión" : "Nueva misión"} onClose={() => setShowModal(false)}>
          <Input label="Título"       value={form.title}       onChange={v => setForm(p => ({ ...p, title: v }))}       placeholder="Primera apuesta del día" />
          <Input label="Descripción"  value={form.description} onChange={v => setForm(p => ({ ...p, description: v }))} placeholder="Realiza 1 apuesta hoy" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Input label="Recompensa" value={form.reward} onChange={v => setForm(p => ({ ...p, reward: v }))} placeholder="100" type="number" />
            <Input label="Ícono"      value={form.icon}   onChange={v => setForm(p => ({ ...p, icon: v }))}   placeholder="🎯" />
          </div>
          <SelectField label="Tipo" value={form.type} onChange={v => setForm(p => ({ ...p, type: v }))}
            options={[{ value: "daily", label: "🌅 Diaria" }, { value: "weekly", label: "📅 Semanal" }]} />
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 8 }}>
            <Btn variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Btn>
            <Btn onClick={save} disabled={saving || !form.title}>{saving ? "Guardando..." : "Guardar misión"}</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// APUESTAS
// ══════════════════════════════════════════════════════════════════════════════
function Apuestas() {
  const [bets, setBets]         = useState([]);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState("all");

  useEffect(() => { fetchBets(); }, []);

  async function fetchBets() {
    setLoading(true);
    const { data } = await supabase.from("bets")
      .select("*, users(username)")
      .order("created_at", { ascending: false })
      .limit(100);
    setBets(data || []);
    setLoading(false);
  }

  async function updateStatus(id, status) {
    await supabase.from("bets").update({ status }).eq("id", id);
    setBets(p => p.map(b => b.id === id ? { ...b, status } : b));
  }

  const filtered = bets.filter(b => filter === "all" || b.status === filter);
  const counts = { all: bets.length, pending: bets.filter(b => b.status === "pending").length, won: bets.filter(b => b.status === "won").length, lost: bets.filter(b => b.status === "lost").length };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 26, fontWeight: 900, margin: "0 0 4px", letterSpacing: -.5 }}>Apuestas</h2>
        <p style={{ color: "rgba(255,255,255,.4)", fontSize: 14, margin: 0 }}>{counts.pending} pendientes de calificar</p>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {[{ id: "all", label: `Todas (${counts.all})` }, { id: "pending", label: `Pendientes (${counts.pending})` }, { id: "won", label: `Ganadas (${counts.won})` }, { id: "lost", label: `Perdidas (${counts.lost})` }].map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} style={{ padding: "7px 14px", borderRadius: 20, border: "none", cursor: "pointer", background: filter === f.id ? "linear-gradient(135deg,#00c2ff,#0066ff)" : "rgba(255,255,255,.08)", color: filter === f.id ? "#fff" : "rgba(255,255,255,.5)", fontFamily: "inherit", fontWeight: 700, fontSize: 12 }}>{f.label}</button>
        ))}
      </div>

      {loading ? <Loader /> : filtered.length === 0 ? <Empty msg="No hay apuestas en esta categoría" /> : (
        <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16, overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 650 }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,.03)" }}>
                {["Ticket", "Usuario", "Apuesta", "Cuota", "Potencial", "Fecha", "Estado", "Calificar"].map(h => (
                  <th key={h} style={{ fontSize: 10, color: "rgba(255,255,255,.3)", letterSpacing: 1, padding: "14px 12px", textAlign: "left", fontWeight: 700 }}>{h.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(b => (
                <tr key={b.id} style={{ borderTop: "1px solid rgba(255,255,255,.05)" }}>
                  <td style={{ padding: "12px", fontSize: 12, color: "rgba(255,255,255,.4)", fontFamily: "monospace" }}>{b.ticket_id}</td>
                  <td style={{ padding: "12px", fontSize: 13, fontWeight: 700 }}>{b.users?.username || "—"}</td>
                  <td style={{ padding: "12px", fontSize: 13 }}>{fmt(b.amount)}</td>
                  <td style={{ padding: "12px", fontSize: 13, color: "#ff9f0a", fontWeight: 800 }}>{Number(b.total_odd).toFixed(2)}x</td>
                  <td style={{ padding: "12px", fontSize: 13, color: "#30d158", fontWeight: 700 }}>+{fmt(b.potential)}</td>
                  <td style={{ padding: "12px", fontSize: 12, color: "rgba(255,255,255,.4)" }}>{b.created_at ? new Date(b.created_at).toLocaleDateString("es-MX") : "—"}</td>
                  <td style={{ padding: "12px" }}>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: b.status === "won" ? "rgba(48,209,88,.15)" : b.status === "lost" ? "rgba(255,59,48,.15)" : "rgba(255,159,10,.15)", color: b.status === "won" ? "#30d158" : b.status === "lost" ? "#ff3b30" : "#ff9f0a" }}>
                      {b.status === "won" ? "GANADA" : b.status === "lost" ? "PERDIDA" : "PENDIENTE"}
                    </span>
                  </td>
                  <td style={{ padding: "12px" }}>
                    {b.status === "pending" && (
                      <div style={{ display: "flex", gap: 6 }}>
                        <Btn small onClick={() => updateStatus(b.id, "won")} variant="success">✅ Ganó</Btn>
                        <Btn small onClick={() => updateStatus(b.id, "lost")} variant="danger">❌ Perdió</Btn>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// OPERADORES
// ══════════════════════════════════════════════════════════════════════════════
function Operadores() {
  const [operators, setOperators] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving]       = useState(false);
  const [form, setForm]           = useState({ name: "", email: "", role: "support" });

  useEffect(() => { fetchOps(); }, []);

  async function fetchOps() {
    setLoading(true);
    const { data } = await supabase.from("operators").select("*").order("created_at", { ascending: false });
    setOperators(data || []);
    setLoading(false);
  }

  async function save() {
    setSaving(true);
    await supabase.from("operators").insert({ ...form, status: "active" });
    setSaving(false);
    setShowModal(false);
    setForm({ name: "", email: "", role: "support" });
    fetchOps();
  }

  async function toggleStatus(op) {
    const newStatus = op.status === "active" ? "inactive" : "active";
    await supabase.from("operators").update({ status: newStatus }).eq("id", op.id);
    setOperators(p => p.map(o => o.id === op.id ? { ...o, status: newStatus } : o));
  }

  async function del(id) {
    if (!confirm("¿Eliminar este operador?")) return;
    await supabase.from("operators").delete().eq("id", id);
    setOperators(p => p.filter(o => o.id !== id));
  }

  const roleInfo = {
    superadmin: { desc: "Acceso total",             perms: ["Eventos", "Usuarios", "Misiones", "Apuestas", "Reportes", "Operadores"] },
    operator:   { desc: "Gestiona eventos y misiones", perms: ["Eventos", "Misiones"] },
    support:    { desc: "Ve usuarios y apuestas",   perms: ["Usuarios", "Apuestas"] },
    agent:      { desc: "Solo reportes",            perms: ["Reportes"] },
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 26, fontWeight: 900, margin: "0 0 4px", letterSpacing: -.5 }}>Operadores & Agentes</h2>
          <p style={{ color: "rgba(255,255,255,.4)", fontSize: 14, margin: 0 }}>Controla quién accede a Bvradar</p>
        </div>
        <Btn onClick={() => setShowModal(true)}>+ Nuevo operador</Btn>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 12, marginBottom: 24 }}>
        {Object.entries(roleInfo).map(([key, r]) => (
          <div key={key} style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 12, padding: 14 }}>
            <div style={{ marginBottom: 8 }}><RoleBadge role={key} /></div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)", marginBottom: 8 }}>{r.desc}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {r.perms.map(p => <span key={p} style={{ fontSize: 10, background: "rgba(255,255,255,.06)", color: "rgba(255,255,255,.4)", padding: "2px 7px", borderRadius: 6 }}>{p}</span>)}
            </div>
          </div>
        ))}
      </div>

      {loading ? <Loader /> : operators.length === 0 ? <Empty msg="No hay operadores aún" /> : (
        <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16, overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,.03)" }}>
                {["Operador", "Rol", "Estado", "Creado", "Acciones"].map(h => (
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
                  <td style={{ padding: "16px 20px" }}><StatusDot status={op.status} /></td>
                  <td style={{ padding: "16px 20px", fontSize: 12, color: "rgba(255,255,255,.4)" }}>{op.created_at ? new Date(op.created_at).toLocaleDateString("es-MX") : "—"}</td>
                  <td style={{ padding: "16px 20px" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <Btn small onClick={() => toggleStatus(op)} variant={op.status === "active" ? "secondary" : "success"}>
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
      )}

      {showModal && (
        <Modal title="Nuevo operador" onClose={() => setShowModal(false)}>
          <Input label="Nombre completo" value={form.name}  onChange={v => setForm(p => ({ ...p, name: v }))}  placeholder="Carlos Soporte" />
          <Input label="Email"           value={form.email} onChange={v => setForm(p => ({ ...p, email: v }))} placeholder="carlos@betvora.com" type="email" />
          <SelectField label="Rol" value={form.role} onChange={v => setForm(p => ({ ...p, role: v }))}
            options={[
              { value: "operator", label: "Operador — Eventos y Misiones" },
              { value: "support",  label: "Soporte — Usuarios y Apuestas" },
              { value: "agent",    label: "Agente — Solo Reportes" },
            ]} />
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 8 }}>
            <Btn variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Btn>
            <Btn onClick={save} disabled={saving || !form.name || !form.email}>{saving ? "Guardando..." : "Crear operador"}</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// APP SHELL
// ══════════════════════════════════════════════════════════════════════════════
export default function Bvradar() {
  const [section, setSection]       = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const nav = [
    { id: "dashboard",  label: "Dashboard",  icon: "◼" },
    { id: "eventos",    label: "Eventos",     icon: "⚽" },
    { id: "usuarios",   label: "Usuarios",    icon: "👥" },
    { id: "misiones",   label: "Misiones",    icon: "⚡" },
    { id: "apuestas",   label: "Apuestas",    icon: "🎯" },
    { id: "operadores", label: "Operadores",  icon: "🔐" },
  ];

  const sectionMap = {
    dashboard:  <Dashboard />,
    eventos:    <Eventos />,
    usuarios:   <Usuarios />,
    misiones:   <Misiones />,
    apuestas:   <Apuestas />,
    operadores: <Operadores />,
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0d1120", color: "#fff", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px } ::-webkit-scrollbar-thumb { background: rgba(255,255,255,.12); border-radius: 4px }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,.25) !important }
        @keyframes fadeUp { from { transform: translateY(20px); opacity: 0 } to { transform: none; opacity: 1 } }
        @keyframes spin   { to { transform: rotate(360deg) } }
      `}</style>

      {/* ── Sidebar ── */}
      <aside style={{ width: sidebarOpen ? 220 : 64, flexShrink: 0, background: "#080c18", borderRight: "1px solid rgba(255,255,255,.06)", display: "flex", flexDirection: "column", transition: "width .25s ease", overflow: "hidden", position: "sticky", top: 0, height: "100vh" }}>
        <div style={{ padding: "20px 16px", borderBottom: "1px solid rgba(255,255,255,.06)", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg,#00c2ff,#0066ff)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0, fontWeight: 900 }}>B</div>
          {sidebarOpen && <div>
            <div style={{ fontSize: 16, fontWeight: 900, letterSpacing: -.5 }}>Betvora</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,.3)", letterSpacing: 1 }}>BACKOFFICE</div>
          </div>}
        </div>

        <nav style={{ flex: 1, padding: "12px 8px" }}>
          {nav.map(n => (
            <button key={n.id} onClick={() => setSection(n.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "10px", borderRadius: 10, border: "none", cursor: "pointer", marginBottom: 2, transition: "all .15s", background: section === n.id ? "rgba(0,194,255,.12)" : "transparent", color: section === n.id ? "#00c2ff" : "rgba(255,255,255,.45)" }}>
              <span style={{ fontSize: 16, flexShrink: 0, width: 20, textAlign: "center" }}>{n.icon}</span>
              {sidebarOpen && <span style={{ fontSize: 14, fontWeight: section === n.id ? 700 : 500, whiteSpace: "nowrap" }}>{n.label}</span>}
              {sidebarOpen && section === n.id && <div style={{ marginLeft: "auto", width: 4, height: 4, borderRadius: "50%", background: "#00c2ff" }} />}
            </button>
          ))}
        </nav>

        <div style={{ padding: "12px 8px", borderTop: "1px solid rgba(255,255,255,.06)" }}>
          <button onClick={() => setSidebarOpen(p => !p)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "10px", borderRadius: 10, border: "none", cursor: "pointer", background: "transparent", color: "rgba(255,255,255,.3)", fontSize: 13 }}>
            <span style={{ fontSize: 16, width: 20, textAlign: "center" }}>{sidebarOpen ? "◀" : "▶"}</span>
            {sidebarOpen && <span>Colapsar</span>}
          </button>
          {sidebarOpen && (
            <div style={{ marginTop: 10, padding: "10px", background: "rgba(255,255,255,.04)", borderRadius: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 700 }}>Admin Principal</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.3)", marginTop: 2 }}>admin@betvora.com</div>
              <div style={{ marginTop: 6 }}><RoleBadge role="superadmin" /></div>
            </div>
          )}
        </div>
      </aside>

      {/* ── Main ── */}
      <main style={{ flex: 1, overflowY: "auto", padding: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, paddingBottom: 20, borderBottom: "1px solid rgba(255,255,255,.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,.25)" }}>Bvradar</span>
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
