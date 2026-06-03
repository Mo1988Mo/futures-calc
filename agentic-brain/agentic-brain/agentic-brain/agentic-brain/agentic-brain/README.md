# TradeSmart Co. — Futures Calculator & Knowledge Bot

A full-stack trading tool built with AI assistance.

## 🚀 What's Inside

| Tool | Description |
|------|-------------|
| `futures-trading-tool.jsx` | React calculator for PnL, ROE, SL/TP, fees |
| `bot.py` | CLI knowledge bot powered by Claude API |
| `docs/` | Company knowledge base (FAQ, policies, support) |
| `agentic-brain/` | AI context management files |

## 🤖 Run the Knowledge Bot
```bash
pip install anthropic
export ANTHROPIC_API_KEY=your_key_here
python bot.py
```

## 📊 Futures Calculator Features
- Long/Short PnL calculation
- Maker/Taker fee breakdown
- Funding rate cost
- SL/TP analysis with ROE
- Position add/reduce legs
- Liquidation price estimate

## 🧠 Built With
- Claude (Anthropic) — AI coding assistant
- React/JSX — Frontend calculator
- Python — Knowledge bot backend
- GitHub — Version control

## 📁 Repo Structure
```
futures-calc/
├── futures-trading-tool.jsx
├── bot.py
├── docs/
│   ├── faq.md
│   ├── leave-policy.md
│   └── support-guide.md
└── agentic-brain/
    ├── PROJECT_BRIEF.md
    ├── AGENT_CONTEXT.md
    ├── MEMORY.md
    ├── TASKS.md
    └── EVALS.md
```
