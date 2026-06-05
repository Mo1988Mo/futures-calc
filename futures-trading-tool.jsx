import { useState, useEffect, useCallback } from "react";

const FONT = `
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@700;800&display=swap');
`;

const css = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #090c10;
    --surface: #0e1318;
    --border: #1c2530;
    --border2: #243040;
    --accent: #00d4aa;
    --accent2: #0099ff;
    --red: #ff4560;
    --green: #00d4aa;
    --yellow: #f5c842;
    --muted: #4a5c6a;
    --text: #c8d8e8;
    --label: #6a7f8f;
    --mono: 'Space Mono', monospace;
    --display: 'Syne', sans-serif;
  }
  body { background: var(--bg); color: var(--text); font-family: var(--mono); }

  .app {
    min-height: 100vh;
    background: var(--bg);
    background-image:
      radial-gradient(ellipse 80% 40% at 50% -10%, rgba(0,212,170,0.07) 0%, transparent 60%),
      repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(0,212,170,0.03) 40px),
      repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(0,212,170,0.02) 40px);
    padding: 24px 16px 48px;
  }

  .header {
    text-align: center;
    margin-bottom: 32px;
  }
  .header h1 {
    font-family: var(--display);
    font-size: 28px;
    font-weight: 800;
    letter-spacing: -0.5px;
    color: #fff;
    text-transform: uppercase;
  }
  .header h1 span { color: var(--accent); }
  .header p {
    font-size: 10px;
    letter-spacing: 3px;
    color: var(--muted);
    text-transform: uppercase;
    margin-top: 4px;
  }

  .layout {
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  @media (max-width: 760px) {
    .layout { grid-template-columns: 1fr; }
  }

  .panel {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 4px;
    overflow: hidden;
  }
  .panel-title {
    font-family: var(--display);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: var(--accent);
    padding: 10px 14px;
    border-bottom: 1px solid var(--border);
    background: rgba(0,212,170,0.04);
  }
  .panel-body { padding: 14px; }

  /* SIDE TOGGLE */
  .side-toggle {
    display: flex;
    gap: 0;
    margin-bottom: 14px;
    border: 1px solid var(--border2);
    border-radius: 3px;
    overflow: hidden;
  }
  .side-btn {
    flex: 1;
    padding: 9px;
    font-family: var(--mono);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 2px;
    border: none;
    cursor: pointer;
    transition: all 0.15s;
    text-transform: uppercase;
  }
  .side-btn.long { background: rgba(0,212,170,0.08); color: var(--muted); }
  .side-btn.long.active { background: var(--green); color: #000; }
  .side-btn.short { background: rgba(255,69,96,0.06); color: var(--muted); }
  .side-btn.short.active { background: var(--red); color: #fff; }

  /* INPUTS */
  .field-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  .field-grid.single { grid-template-columns: 1fr; }
  .field {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .field label {
    font-size: 9px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--label);
  }
  .field input, .field select {
    background: var(--bg);
    border: 1px solid var(--border);
    color: var(--text);
    font-family: var(--mono);
    font-size: 13px;
    padding: 7px 9px;
    border-radius: 3px;
    outline: none;
    transition: border 0.15s;
    width: 100%;
  }
  .field input:focus, .field select:focus {
    border-color: var(--accent2);
  }
  .field input::placeholder { color: var(--muted); font-size: 11px; }

  .section-divider {
    margin: 12px 0 10px;
    font-size: 9px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--muted);
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .section-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  /* TRADE LEGS */
  .leg-list { display: flex; flex-direction: column; gap: 6px; margin-bottom: 10px; }
  .leg-row {
    display: grid;
    grid-template-columns: 1fr 1fr 80px 28px;
    gap: 6px;
    align-items: center;
  }
  .leg-row .leg-type {
    font-size: 9px;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 3px 6px;
    border-radius: 2px;
  }
  .leg-row .leg-type.add { background: rgba(0,212,170,0.15); color: var(--green); }
  .leg-row .leg-type.reduce { background: rgba(255,69,96,0.15); color: var(--red); }

  .add-leg-row {
    display: grid;
    grid-template-columns: 1fr 1fr 80px 1fr 100px;
    gap: 6px;
    align-items: end;
    margin-top: 4px;
  }

  .btn {
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    border: none;
    border-radius: 3px;
    padding: 7px 12px;
    transition: all 0.15s;
  }
  .btn-add { background: rgba(0,212,170,0.12); color: var(--accent); border: 1px solid rgba(0,212,170,0.3); }
  .btn-add:hover { background: rgba(0,212,170,0.2); }
  .btn-del { background: rgba(255,69,96,0.1); color: var(--red); border: 1px solid rgba(255,69,96,0.2); width: 28px; height: 28px; padding: 0; font-size: 13px; }
  .btn-calc {
    width: 100%;
    padding: 12px;
    background: var(--accent);
    color: #000;
    font-family: var(--display);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    margin-top: 14px;
  }
  .btn-calc:hover { background: #00f0c0; }
  .btn-reset {
    width: 100%;
    padding: 8px;
    background: transparent;
    color: var(--muted);
    border: 1px solid var(--border);
    font-size: 9px;
    letter-spacing: 2px;
    margin-top: 6px;
  }
  .btn-reset:hover { color: var(--text); border-color: var(--border2); }

  /* OUTPUT */
  .output-panel {
    grid-column: 1 / -1;
  }

  .results-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 14px;
  }
  @media (max-width: 760px) {
    .results-grid { grid-template-columns: repeat(2, 1fr); }
  }

  .result-cell {
    background: var(--surface);
    padding: 12px 14px;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .result-cell .rc-label {
    font-size: 9px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--label);
  }
  .result-cell .rc-val {
    font-family: var(--mono);
    font-size: 16px;
    font-weight: 700;
    color: var(--text);
  }
  .result-cell .rc-val.pos { color: var(--green); }
  .result-cell .rc-val.neg { color: var(--red); }
  .result-cell .rc-val.warn { color: var(--yellow); }
  .result-cell .rc-sub {
    font-size: 10px;
    color: var(--muted);
  }

  .breakdown {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 3px;
    padding: 12px 14px;
    margin-bottom: 10px;
  }
  .breakdown-title {
    font-size: 9px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 10px;
  }
  .bd-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;
    border-bottom: 1px solid rgba(28,37,48,0.6);
    font-size: 12px;
  }
  .bd-row:last-child { border-bottom: none; }
  .bd-label { color: var(--label); }
  .bd-val { font-weight: 700; }
  .bd-val.pos { color: var(--green); }
  .bd-val.neg { color: var(--red); }
  .bd-val.neutral { color: var(--text); }
  .bd-val.warn { color: var(--yellow); }

  .tag-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 10px;
  }
  .tag {
    font-size: 9px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 4px 8px;
    border-radius: 2px;
    border: 1px solid;
  }
  .tag.long { background: rgba(0,212,170,0.08); color: var(--green); border-color: rgba(0,212,170,0.25); }
  .tag.short { background: rgba(255,69,96,0.08); color: var(--red); border-color: rgba(255,69,96,0.25); }
  .tag.neutral { background: rgba(100,150,200,0.08); color: var(--accent2); border-color: rgba(0,153,255,0.25); }
  .tag.warn { background: rgba(245,200,66,0.08); color: var(--yellow); border-color: rgba(245,200,66,0.25); }

  .empty-state {
    padding: 40px;
    text-align: center;
    color: var(--muted);
    font-size: 12px;
    letter-spacing: 1px;
  }
  .empty-state .icon { font-size: 32px; margin-bottom: 10px; opacity: 0.3; }

  .sl-tp-status {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-bottom: 10px;
  }
  .slt-card {
    border: 1px solid var(--border);
    border-radius: 3px;
    padding: 10px 12px;
    background: var(--bg);
  }
  .slt-label { font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); margin-bottom: 4px; }
  .slt-price { font-size: 14px; font-weight: 700; margin-bottom: 2px; }
  .slt-pnl { font-size: 11px; }
`;

// ─── helpers ────────────────────────────────────────────────────────────────

const fmt = (n, d = 2) => {
  if (n == null || isNaN(n)) return "—";
  return new Intl.NumberFormat("en-US", { minimumFractionDigits: d, maximumFractionDigits: d }).format(n);
};
const fmtPct = (n, d = 2) => (n == null || isNaN(n) ? "—" : fmt(n, d) + "%");
const sign = (n) => (n >= 0 ? "+" : "");

function calcLiquidationPrice(side, entryPrice, leverage, mmRate = 0.005) {
  // simplified liq: Entry ± Entry * (1/leverage - mmRate)
  const margin = entryPrice / leverage;
  const liqMove = margin - entryPrice * mmRate;
  if (side === "long") return entryPrice - liqMove;
  else return entryPrice + liqMove;
}

function computeTrade({
  side, entryPrice, closePrice, leverage,
  usdtMargin, nominalValue,
  sl, tp,
  legs,
  makerFee, takerFee, useMaker, useTakerClose,
  fundingRate, fundingPeriods,
}) {
  const ep = parseFloat(entryPrice) || 0;
  const cp = parseFloat(closePrice) || 0;
  const lev = parseFloat(leverage) || 1;

  // Determine margin & nominal
  let margin = parseFloat(usdtMargin) || 0;
  let nominal = parseFloat(nominalValue) || 0;
  if (margin && !nominal) nominal = margin * lev;
  if (nominal && !margin) margin = nominal / lev;

  const contractQty = ep ? nominal / ep : 0;

  // Entry fee
  const entryFeeRate = useMaker ? (parseFloat(makerFee) || 0) / 100 : (parseFloat(takerFee) || 0) / 100;
  const closeFeeRate = useTakerClose ? (parseFloat(takerFee) || 0) / 100 : (parseFloat(makerFee) || 0) / 100;
  const entryFee = nominal * entryFeeRate;
  const closeFee = nominal * closeFeeRate;
  const totalTradeFees = entryFee + closeFee;

  // Funding
  const fr = (parseFloat(fundingRate) || 0) / 100;
  const fp = parseFloat(fundingPeriods) || 0;
  const fundingCost = nominal * fr * fp;

  // Base PnL
  let priceDiff = cp - ep;
  if (side === "short") priceDiff = ep - cp;
  const basePnl = contractQty * priceDiff; // = nominal * (priceDiff / ep)

  // Legs contribution
  let legsPnl = 0;
  let legsSummary = [];
  for (const leg of legs) {
    const lp = parseFloat(leg.price) || 0;
    const lsize = parseFloat(leg.size) || 0; // USDT
    const lNom = lsize * lev;
    const lQty = ep ? lNom / ep : 0;
    if (leg.type === "add") {
      // Added to position: PnL from leg entry to close
      let legDiff = cp - lp;
      if (side === "short") legDiff = lp - cp;
      const legPnl = lQty * legDiff;
      legsPnl += legPnl;
      legsSummary.push({ ...leg, pnl: legPnl });
    } else {
      // Reduced: PnL at reduction price
      let legDiff = lp - ep;
      if (side === "short") legDiff = ep - lp;
      const legPnl = lQty * legDiff;
      legsPnl += legPnl;
      legsSummary.push({ ...leg, pnl: legPnl });
    }
  }

  const grossPnl = basePnl + legsPnl;
  const netPnl = grossPnl - totalTradeFees - fundingCost;
  const roe = margin ? (netPnl / margin) * 100 : 0;
  const roeGross = margin ? (grossPnl / margin) * 100 : 0;

  // SL / TP
  const slPrice = parseFloat(sl) || null;
  const tpPrice = parseFloat(tp) || null;

  let slPnl = null, slRoe = null;
  let tpPnl = null, tpRoe = null;

  if (slPrice && ep) {
    let slDiff = slPrice - ep;
    if (side === "short") slDiff = ep - slPrice;
    slPnl = contractQty * slDiff - totalTradeFees - fundingCost;
    slRoe = margin ? (slPnl / margin) * 100 : 0;
  }
  if (tpPrice && ep) {
    let tpDiff = tpPrice - ep;
    if (side === "short") tpDiff = ep - tpPrice;
    tpPnl = contractQty * tpDiff - totalTradeFees - fundingCost;
    tpRoe = margin ? (tpPnl / margin) * 100 : 0;
  }

  const liqPrice = ep ? calcLiquidationPrice(side, ep, lev) : null;

  // R:R
  let rr = null;
  if (slPrice && tpPrice && ep) {
    const risk = Math.abs(slPrice - ep);
    const reward = Math.abs(tpPrice - ep);
    rr = risk > 0 ? reward / risk : null;
  }

  // Price % moves
  const pctMove = ep ? ((cp - ep) / ep) * 100 : 0;
  const pctMoveSl = ep && slPrice ? ((slPrice - ep) / ep) * 100 : null;
  const pctMoveTp = ep && tpPrice ? ((tpPrice - ep) / ep) * 100 : null;
  const pctMoveLiq = ep && liqPrice ? ((liqPrice - ep) / ep) * 100 : null;

  return {
    margin, nominal, contractQty,
    entryFee, closeFee, totalTradeFees,
    fundingCost,
    basePnl, legsPnl, grossPnl, netPnl,
    roe, roeGross,
    slPnl, slRoe, tpPnl, tpRoe,
    liqPrice,
    rr,
    pctMove, pctMoveSl, pctMoveTp, pctMoveLiq,
    legsSummary,
    slPrice, tpPrice,
  };
}

// ─── component ──────────────────────────────────────────────────────────────

export default function FuturesCalc() {
  const [side, setSide] = useState("long");
  const [entry, setEntry] = useState("");
  const [close, setClose] = useState("");
  const [leverage, setLeverage] = useState("10");
  const [usdtMargin, setUsdtMargin] = useState("");
  const [nominalValue, setNominalValue] = useState("");
  const [sl, setSl] = useState("");
  const [tp, setTp] = useState("");
  const [makerFee, setMakerFee] = useState("0.02");
  const [takerFee, setTakerFee] = useState("0.05");
  const [useMaker, setUseMaker] = useState(false);
  const [useTakerClose, setUseTakerClose] = useState(true);
  const [fundingRate, setFundingRate] = useState("0.01");
  const [fundingPeriods, setFundingPeriods] = useState("3");
  const [legs, setLegs] = useState([]);
  const [legForm, setLegForm] = useState({ type: "add", price: "", size: "" });
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // Auto-sync margin <-> nominal
  useEffect(() => {
    if (usdtMargin && leverage) {
      const nom = (parseFloat(usdtMargin) * parseFloat(leverage)).toFixed(2);
      if (nom !== nominalValue) setNominalValue(nom);
    }
  }, [usdtMargin, leverage]);

  const addLeg = () => {
    if (!legForm.price || !legForm.size) return;
    setLegs([...legs, { ...legForm, id: Date.now() }]);
    setLegForm({ type: "add", price: "", size: "" });
  };
  const removeLeg = (id) => setLegs(legs.filter((l) => l.id !== id));

  const calculate = () => {
    setError("");
    if (!entry || parseFloat(entry) <= 0) {
      setError("⚠ Entry Price is required and must be greater than 0.");
      return;
    }
    if (!close || parseFloat(close) <= 0) {
      setError("⚠ Close Price is required and must be greater than 0.");
      return;
    }
    if (!usdtMargin && !nominalValue) {
      setError("⚠ Please enter either Margin (USDT) or Nominal Value.");
      return;
    }
    if (!leverage || parseFloat(leverage) <= 0) {
      setError("⚠ Leverage must be greater than 0.");
      return;
    }
    const res = computeTrade({
      side, entryPrice: entry, closePrice: close, leverage,
      usdtMargin, nominalValue,
      sl, tp, legs,
      makerFee, takerFee, useMaker, useTakerClose,
      fundingRate, fundingPeriods,
    });
    setResult(res);
  };

  const reset = () => {
    setEntry(""); setClose(""); setLeverage("10");
    setUsdtMargin(""); setNominalValue("");
    setSl(""); setTp(""); setLegs([]);
    setMakerFee("0.02"); setTakerFee("0.05");
    setFundingRate("0.01"); setFundingPeriods("3");
    setUseMaker(false); setUseTakerClose(true);
    setResult(null); setError("");
  };

  const pnlClass = (n) => (n == null ? "" : n >= 0 ? "pos" : "neg");

  return (
    <>
      <style>{FONT + css}</style>
      <div className="app">
        <div className="header">
          <h1>FUTURES <span>CALC</span></h1>
          <p>Position Analysis &amp; Risk Calculator</p>
        </div>

        <div className="layout">
          {/* LEFT PANEL — POSITION */}
          <div className="panel">
            <div className="panel-title">Position Setup</div>
            <div className="panel-body">
              <div className="side-toggle">
                <button className={`side-btn long${side === "long" ? " active" : ""}`} onClick={() => setSide("long")}>▲ Long</button>
                <button className={`side-btn short${side === "short" ? " active" : ""}`} onClick={() => setSide("short")}>▼ Short</button>
              </div>

              <div className="field-grid">
                <div className="field">
                  <label>Entry Price</label>
                  <input placeholder="0.00" value={entry} onChange={e => setEntry(e.target.value)} type="number" />
                </div>
                <div className="field">
                  <label>Close Price</label>
                  <input placeholder="0.00" value={close} onChange={e => setClose(e.target.value)} type="number" />
                </div>
                <div className="field">
                  <label>Leverage ×</label>
                  <input placeholder="10" value={leverage} onChange={e => setLeverage(e.target.value)} type="number" />
                </div>
                <div className="field">
                  <label>Margin (USDT)</label>
                  <input placeholder="0.00" value={usdtMargin} onChange={e => { setUsdtMargin(e.target.value); }} type="number" />
                </div>
                <div className="field">
                  <label>Nominal Value (USDT)</label>
                  <input placeholder="auto" value={nominalValue} onChange={e => setNominalValue(e.target.value)} type="number" />
                </div>
                <div className="field">
                  <label>Contract Qty (approx)</label>
                  <input
                    readOnly
                    value={entry && nominalValue ? fmt(parseFloat(nominalValue) / parseFloat(entry), 4) : ""}
                    placeholder="—"
                    style={{ opacity: 0.5, cursor: "not-allowed" }}
                  />
                </div>
              </div>

              <div className="section-divider">Risk Levels</div>
              <div className="field-grid">
                <div className="field">
                  <label>Stop Loss (SL)</label>
                  <input placeholder="price" value={sl} onChange={e => setSl(e.target.value)} type="number" />
                </div>
                <div className="field">
                  <label>Take Profit (TP)</label>
                  <input placeholder="price" value={tp} onChange={e => setTp(e.target.value)} type="number" />
                </div>
              </div>

              <button className="btn btn-calc" onClick={calculate}>CALCULATE</button>
              {error && (
                <div style={{
                  marginTop: 8,
                  padding: "8px 10px",
                  background: "rgba(255,69,96,0.1)",
                  border: "1px solid rgba(255,69,96,0.3)",
                  borderRadius: 3,
                  color: "var(--red)",
                  fontSize: 11,
                  letterSpacing: "0.5px"
                }}>
                  {error}
                </div>
              )}
              <button className="btn btn-reset" onClick={reset}>↺ RESET ALL</button>
            </div>
          </div>

          {/* RIGHT PANEL — FEES + LEGS */}
          <div className="panel">
            <div className="panel-title">Fees &amp; Position Management</div>
            <div className="panel-body">
              <div className="section-divider">Trading Fees</div>
              <div className="field-grid">
                <div className="field">
                  <label>Maker Fee %</label>
                  <input value={makerFee} onChange={e => setMakerFee(e.target.value)} type="number" step="0.001" />
                </div>
                <div className="field">
                  <label>Taker Fee %</label>
                  <input value={takerFee} onChange={e => setTakerFee(e.target.value)} type="number" step="0.001" />
                </div>
              </div>
              <div className="field-grid" style={{ marginTop: 8 }}>
                <div className="field">
                  <label>Entry Order Type</label>
                  <select value={useMaker ? "maker" : "taker"} onChange={e => setUseMaker(e.target.value === "maker")}>
                    <option value="taker">Taker (market)</option>
                    <option value="maker">Maker (limit)</option>
                  </select>
                </div>
                <div className="field">
                  <label>Close Order Type</label>
                  <select value={useTakerClose ? "taker" : "maker"} onChange={e => setUseTakerClose(e.target.value === "taker")}>
                    <option value="taker">Taker (market)</option>
                    <option value="maker">Maker (limit)</option>
                  </select>
                </div>
              </div>

              <div className="section-divider">Funding Rate</div>
              <div className="field-grid">
                <div className="field">
                  <label>Rate per Period %</label>
                  <input value={fundingRate} onChange={e => setFundingRate(e.target.value)} type="number" step="0.001" />
                </div>
                <div className="field">
                  <label>Periods Held</label>
                  <input value={fundingPeriods} onChange={e => setFundingPeriods(e.target.value)} type="number" placeholder="3" />
                </div>
              </div>

              <div className="section-divider">Position Additions / Reductions</div>

              {legs.length > 0 && (
                <div className="leg-list">
                  {legs.map(leg => (
                    <div className="leg-row" key={leg.id}>
                      <span className={`leg-type ${leg.type}`}>{leg.type === "add" ? "▲ Add" : "▼ Reduce"}</span>
                      <span style={{ fontSize: 12 }}>@ {leg.price}</span>
                      <span style={{ fontSize: 12 }}>{leg.size} USDT</span>
                      <button className="btn btn-del" onClick={() => removeLeg(leg.id)}>×</button>
                    </div>
                  ))}
                </div>
              )}

              <div className="add-leg-row">
                <div className="field">
                  <label>Type</label>
                  <select value={legForm.type} onChange={e => setLegForm({ ...legForm, type: e.target.value })}>
                    <option value="add">Add</option>
                    <option value="reduce">Reduce</option>
                  </select>
                </div>
                <div className="field">
                  <label>Price</label>
                  <input type="number" placeholder="0.00" value={legForm.price} onChange={e => setLegForm({ ...legForm, price: e.target.value })} />
                </div>
                <div className="field">
                  <label>Size (USDT)</label>
                  <input type="number" placeholder="0.00" value={legForm.size} onChange={e => setLegForm({ ...legForm, size: e.target.value })} />
                </div>
                <div className="field">
                  <label>&nbsp;</label>
                  <button className="btn btn-add" onClick={addLeg}>+ Add</button>
                </div>
              </div>
            </div>
          </div>

          {/* OUTPUT */}
          <div className="panel output-panel">
            <div className="panel-title">Position Analysis</div>
            <div className="panel-body">
              {!result ? (
                <div className="empty-state">
                  <div className="icon">◈</div>
                  <div>Fill in your trade details and hit CALCULATE</div>
                </div>
              ) : (
                <>
                  {/* TAG ROW */}
                  <div className="tag-row">
                    <span className={`tag ${result.netPnl >= 0 ? "long" : "short"}`}>
                      {side.toUpperCase()} {result.netPnl >= 0 ? "PROFIT" : "LOSS"}
                    </span>
                    <span className="tag neutral">{leverage}× LEV</span>
                    <span className={`tag ${result.roe >= 0 ? "long" : "short"}`}>
                      ROE {sign(result.roe)}{fmtPct(result.roe)}
                    </span>
                    {result.rr && (
                      <span className={`tag ${result.rr >= 1.5 ? "long" : "warn"}`}>
                        R:R {fmt(result.rr, 2)}
                      </span>
                    )}
                    {result.liqPrice && (
                      <span className="tag warn">LIQ @ {fmt(result.liqPrice, 4)}</span>
                    )}
                  </div>

                  {/* MAIN METRICS */}
                  <div className="results-grid">
                    <div className="result-cell">
                      <span className="rc-label">Net PnL</span>
                      <span className={`rc-val ${pnlClass(result.netPnl)}`}>{sign(result.netPnl)}${fmt(result.netPnl)}</span>
                      <span className="rc-sub">after all fees</span>
                    </div>
                    <div className="result-cell">
                      <span className="rc-label">Gross PnL</span>
                      <span className={`rc-val ${pnlClass(result.grossPnl)}`}>{sign(result.grossPnl)}${fmt(result.grossPnl)}</span>
                      <span className="rc-sub">before fees</span>
                    </div>
                    <div className="result-cell">
                      <span className="rc-label">ROE (net)</span>
                      <span className={`rc-val ${pnlClass(result.roe)}`}>{sign(result.roe)}{fmtPct(result.roe)}</span>
                      <span className="rc-sub">on margin used</span>
                    </div>
                    <div className="result-cell">
                      <span className="rc-label">Price Move</span>
                      <span className={`rc-val ${result.pctMove >= 0 ? "pos" : "neg"}`}>{sign(result.pctMove)}{fmtPct(result.pctMove)}</span>
                      <span className="rc-sub">{fmt(parseFloat(entry))} → {fmt(parseFloat(close))}</span>
                    </div>
                    <div className="result-cell">
                      <span className="rc-label">Margin Used</span>
                      <span className="rc-val">${fmt(result.margin)}</span>
                      <span className="rc-sub">USDT collateral</span>
                    </div>
                    <div className="result-cell">
                      <span className="rc-label">Nominal Size</span>
                      <span className="rc-val">${fmt(result.nominal)}</span>
                      <span className="rc-sub">position value</span>
                    </div>
                    <div className="result-cell">
                      <span className="rc-label">Total Fees</span>
                      <span className="rc-val neg">-${fmt(result.totalTradeFees)}</span>
                      <span className="rc-sub">entry + close</span>
                    </div>
                    <div className="result-cell">
                      <span className="rc-label">Funding Cost</span>
                      <span className={`rc-val ${result.fundingCost > 0 ? "neg" : "pos"}`}>-${fmt(result.fundingCost)}</span>
                      <span className="rc-sub">{fundingPeriods} × {fundingRate}%</span>
                    </div>
                  </div>

                  {/* SL / TP CARDS */}
                  {(result.slPrice || result.tpPrice) && (
                    <div className="sl-tp-status">
                      {result.slPrice && (
                        <div className="slt-card">
                          <div className="slt-label">Stop Loss</div>
                          <div className="slt-price" style={{ color: "var(--red)" }}>{fmt(result.slPrice, 4)}</div>
                          <div className="slt-pnl" style={{ color: "var(--red)" }}>
                            {sign(result.slPnl)}${fmt(result.slPnl)} / ROE {sign(result.slRoe)}{fmtPct(result.slRoe)}
                          </div>
                          {result.pctMoveSl != null && (
                            <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 2 }}>
                              {sign(result.pctMoveSl)}{fmtPct(result.pctMoveSl)} from entry
                            </div>
                          )}
                        </div>
                      )}
                      {result.tpPrice && (
                        <div className="slt-card">
                          <div className="slt-label">Take Profit</div>
                          <div className="slt-price" style={{ color: "var(--green)" }}>{fmt(result.tpPrice, 4)}</div>
                          <div className="slt-pnl" style={{ color: "var(--green)" }}>
                            {sign(result.tpPnl)}${fmt(result.tpPnl)} / ROE {sign(result.tpRoe)}{fmtPct(result.tpRoe)}
                          </div>
                          {result.pctMoveTp != null && (
                            <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 2 }}>
                              {sign(result.pctMoveTp)}{fmtPct(result.pctMoveTp)} from entry
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* FEE BREAKDOWN */}
                  <div className="breakdown">
                    <div className="breakdown-title">Cost Breakdown</div>
                    <div className="bd-row"><span className="bd-label">Entry Fee ({useMaker ? "maker" : "taker"})</span><span className="bd-val neg">-${fmt(result.entryFee, 4)}</span></div>
                    <div className="bd-row"><span className="bd-label">Close Fee ({useTakerClose ? "taker" : "maker"})</span><span className="bd-val neg">-${fmt(result.closeFee, 4)}</span></div>
                    <div className="bd-row"><span className="bd-label">Funding ({fundingPeriods} periods)</span><span className="bd-val neg">-${fmt(result.fundingCost, 4)}</span></div>
                    <div className="bd-row"><span className="bd-label">Total Costs</span><span className="bd-val neg">-${fmt(result.totalTradeFees + result.fundingCost, 4)}</span></div>
                    <div className="bd-row"><span className="bd-label">Gross PnL</span><span className={`bd-val ${pnlClass(result.grossPnl)}`}>{sign(result.grossPnl)}${fmt(result.grossPnl)}</span></div>
                    <div className="bd-row" style={{ borderTop: "1px solid var(--border2)", marginTop: 2, paddingTop: 6 }}>
                      <span className="bd-label" style={{ color: "var(--text)" }}>Net PnL</span>
                      <span className={`bd-val ${pnlClass(result.netPnl)}`} style={{ fontSize: 14 }}>{sign(result.netPnl)}${fmt(result.netPnl)}</span>
                    </div>
                  </div>

                  {/* LEGS BREAKDOWN */}
                  {result.legsSummary.length > 0 && (
                    <div className="breakdown">
                      <div className="breakdown-title">Position Management Legs</div>
                      {result.legsSummary.map((leg, i) => (
                        <div className="bd-row" key={i}>
                          <span className="bd-label">
                            {leg.type === "add" ? "▲ Add" : "▼ Reduce"} @ {leg.price} — {leg.size} USDT
                          </span>
                          <span className={`bd-val ${pnlClass(leg.pnl)}`}>{sign(leg.pnl)}${fmt(leg.pnl)}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* LIQUIDATION */}
                  {result.liqPrice && (
                    <div className="breakdown">
                      <div className="breakdown-title">Liquidation Risk</div>
                      <div className="bd-row"><span className="bd-label">Entry Price</span><span className="bd-val neutral">{fmt(parseFloat(entry), 4)}</span></div>
                      <div className="bd-row"><span className="bd-label">Est. Liquidation Price</span><span className="bd-val warn">{fmt(result.liqPrice, 4)}</span></div>
                      <div className="bd-row"><span className="bd-label">Move to Liquidation</span><span className="bd-val warn">{sign(result.pctMoveLiq)}{fmtPct(result.pctMoveLiq)}</span></div>
                      <div className="bd-row"><span className="bd-label">Leverage</span><span className="bd-val neutral">{leverage}×</span></div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
