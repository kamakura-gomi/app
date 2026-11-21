// Regenerates public/embeddings.json from the `clip:` photo prompts in public/data.js.
// Only needed when you add or change `clip:` prompts. Usage (from the tools/ folder):
//   npm install
//   node embed.mjs
import { AutoTokenizer, CLIPTextModelWithProjection } from '@huggingface/transformers';
import fs from 'node:fs';

const DATA = new URL('../public/data.js', import.meta.url);
const OUT = new URL('../public/embeddings.json', import.meta.url);
const { ITEMS } = await import(DATA.href);
const M = 'Xenova/clip-vit-base-patch32';
const tok = await AutoTokenizer.from_pretrained(M);
const txt = await CLIPTextModelWithProjection.from_pretrained(M, { dtype: 'q8' });

const out = [];
for (const it of ITEMS) {
  if (!it.clip) continue;
  const prompts = it.clip.map(p => 'a photo of ' + p.replace(/^(a|an) /, 'a '));
  const { text_embeds } = await txt(tok(prompts, { padding: true, truncation: true }));
  const d = text_embeds.dims[1];
  for (let i = 0; i < prompts.length; i++) {
    let v = Array.from(text_embeds.data.slice(i * d, (i + 1) * d));
    const n = Math.hypot(...v);
    out.push([it.id, v.map(x => +(x / n).toFixed(4))]);
  }
}
fs.writeFileSync(OUT, JSON.stringify(out));
console.log(`Wrote ${out.length} prompt embeddings.`);
