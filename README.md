# Which Brain?

A fast, visual game about how AI models *actually* work. Each round shows two
model diagrams; you tap the one the question asks for, then a reveal breaks down
the real answer. Every play draws a fresh random **6 rounds** from a pool of
**30**, ramping warm-up → expert, over a dark network background. 25-second timer
per round. Fully self-contained, no server required.

Live game: `which-brain.html` (open it, or host it — see **Deploy** below).

---

## Files

| File | What it is |
|------|------------|
| `which-brain.html` | The whole game — HTML, CSS, JS, and the diagram drawings, in one file. |
| `questions.json` | **The question bank. Edit this to add / change / reorder questions.** |
| `build.js` | Optional. Refreshes the offline copy of the questions embedded in the HTML. |
| `README.md` | This file. |

### How the data loads

The game **fetches `questions.json` at runtime**, so on a hosted site you just
edit that file and refresh — no code changes. The HTML also carries an *embedded
snapshot* of the questions as an offline fallback (so opening the single file
straight from disk still works). If you edit `questions.json` and want that
offline copy to match, run `node build.js` once. On a real host the live fetch
always wins, so `build.js` is only for keeping the single-file version current.

---

## Editing questions

Open `questions.json`. It looks like:

```json
{
  "version": 1,
  "questions": [ { …one object per round… } ]
}
```

Each question object:

| Field | Meaning |
|-------|---------|
| `id` | Any number/label for your own reference (not used by the game). |
| `concept` | Short topic name, shown as the blue tag (e.g. `"Quantization"`). |
| `diff` | Difficulty for ordering within a run: `1` warm-up, `2` hard, `3` expert. |
| `tier` | Optional. `"machinery"` shows the teal **MACHINERY** tag and sorts just before the `2`s. |
| `prompt` | The question text (shown big and bold). |
| `smart` | Which side is the correct answer: `"A"` or `"B"`. |
| `A`, `B` | The two choices. `A` is drawn in **blue**, `B` in **orange**. See below. |
| `verdictLabel` | Short badge shown on the correct card in the reveal (e.g. `"CHEAPER"`). |
| `bd` | Array of 2–3 sentences: the "breaking it down" explanation on the reveal. |
| `caveat` | One sentence naming the regime where the claim flips (keeps it honest). |
| `cost` | The "why it matters" line (shown with a 💸). |
| `terms` | Array of `["term", "plain-words definition"]` pairs for the glossary. |

Each choice (`A` / `B`) has:

| Field | Meaning |
|-------|---------|
| `spec` | The one-word label on the card (e.g. `"4-bit"`). |
| `cap` | Plain-words caption under the diagram (e.g. `"Each weight stored in coarse steps"`). |
| `render` | Which diagram to draw — a name from the list below. |
| `args` | Arguments to that diagram (usually one string like `"int4"`, sometimes numbers). |

### To add a question

Copy an existing object, paste it into the `questions` array, and change the
text fields. For the picture, set `render` + `args` to one of the built-in
diagrams below (reuse the same `render` another question uses and just change
`args`). Save. On a hosted site, refresh the page. Done.

You do **not** need to touch the HTML to add, edit, reword, or reorder questions.
(The only thing that lives in code is the *drawing* functions themselves — adding
a brand-new **kind** of picture means adding a renderer in `which-brain.html`.)

### Available `render` names

`stack`, `moe`, `stream`, `bottleneck`, `attnScale`, `quant`, `specDec`,
`residual`, `distill`, `tokenize`, `gqa`, `fit`, `flex`, `visionArch`,
`ensemble`, `ddescent`, `embed`, `posenc`, `temp`, `knowledge`, `finetune`,
`rag`, `batch`, `lrate`, `dropout`, `scaling`, `boundary`, `reg`, `prnet`,
`landscape`.

Look at any existing question using a renderer to see what `args` it expects.

---

## Other tweaks

- **Rounds per game** — in `which-brain.html`, search for `ROUNDS_PER_RUN = 6`.
- **Timer length** — search for `ROUND_SECONDS = 25`.
- **Colors / theme** — the `:root { … }` block at the top of `which-brain.html`.

---

## Deploy (free, permanent) — GitHub Pages

1. Create a new **public** repository on github.com (e.g. `which-brain`).
2. Upload `which-brain.html`, `questions.json`, and `build.js` (drag-and-drop via
   *Add file → Upload files*, or push with git — commands below).
3. Repo **Settings → Pages → Branch: `main`, folder `/ (root)` → Save**.
4. After ~1 minute your game is live at
   `https://YOUR-USERNAME.github.io/which-brain/which-brain.html`.

To make the root URL open the game, rename `which-brain.html` to `index.html`
(then the address is just `https://YOUR-USERNAME.github.io/which-brain/`).

After that, editing questions is: change `questions.json` on GitHub → commit →
the live game picks it up on next load.

---

Diagrams are simplified teaching models. Every reveal names the regime where the
claim holds and where it flips.
