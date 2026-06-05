# MEMORY — Decisions & Learnings

- Chose CLI over web app for simplicity and speed
- SSH blocked on local network — used GitHub web editor instead
- Token auth also blocked — solved via direct web commits
- Used Claude as pair programmer throughout entire build
- JSX file too large to drag-drop upload — pasted via web editor
- Kept bot.py simple: load docs → build context → query Claude
- Found bug: calculator ran with empty Close Price producing fake results (e.g. +$15,000 profit on SHORT with no close price) → fixed with input validation blocking calculation if Entry, Close, Margin, or Leverage are missing or zero. Error message displayed in red below CALCULATE button.
