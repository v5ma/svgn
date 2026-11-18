import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {validateNewStoryVisuals,digest} from '../scripts/visual-preflight.mjs';
const source=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const template=JSON.parse(fs.readFileSync(path.join(source,'content/manifest.json'))).records.find(x=>x.id==='svgn-2026111801');
function fixture(fn){const root=fs.mkdtempSync(path.join(os.tmpdir(),'svgn-visual-test-'));const record=structuredClone(template);try{for(const p of [record.article,record.cards,record.markdown,...record.media.map(x=>x.path)]){const f=path.join(root,p);fs.mkdirSync(path.dirname(f),{recursive:true});fs.copyFileSync(path.join(source,p),f);}fn(root,record);}finally{fs.rmSync(root,{recursive:true,force:true});}}
const credits=(r)=>`content/articles/media/${r.id}/credits.json`;
const review=(r)=>`content/articles/media/${r.id}/visual-review.json`;
function editJSON(root,r,p,fn){const v=JSON.parse(fs.readFileSync(path.join(root,p)));fn(v);const bytes=JSON.stringify(v);fs.writeFileSync(path.join(root,p),bytes);const a=r.media.find(x=>x.path===p);if(a)a.sha256=digest(bytes);}
function fails(fn,pattern){fixture((root,r)=>{fn(root,r);assert.throws(()=>validateNewStoryVisuals(root,r,new Set()),pattern);});}
test('complete new story has structurally documented visual package',()=>fixture((root,r)=>assert.equal(validateNewStoryVisuals(root,r,new Set()).checked,true)));
test('fixed historical IDs remain explicitly unreviewed, not passed',()=>assert.deepEqual(validateNewStoryVisuals('/missing',{id:'old'},new Set(['old'])),{checked:false,legacyUnreviewed:true}));
test('unknown/backdated new story cannot use date to skip media',()=>assert.throws(()=>validateNewStoryVisuals('/missing',{id:'new',date:'2001-01-01'},new Set(['old'])),/no committed media/));
test('missing media rejected',()=>fails((_,r)=>r.media=[],/no committed media/));
test('missing credits rejected',()=>fails((_,r)=>r.media=r.media.filter(a=>!a.path.endsWith('credits.json')),/credits.json not tracked/));
test('infographic cannot substitute for subject photo',()=>fails((root,r)=>editJSON(root,r,credits(r),c=>c.assets[0].role='infographic'),/distinct authentic/));
test('missing infographic rejected',()=>fails((root,r)=>editJSON(root,r,credits(r),c=>c.assets.pop()),/distinct authentic/));
test('same file cannot satisfy both roles',()=>fails((root,r)=>editJSON(root,r,credits(r),c=>c.assets[1].path=c.assets[0].path),/duplicate visual/));
test('missing source rights URL rejected',()=>fails((root,r)=>editJSON(root,r,credits(r),c=>c.assets[0].rights_url=null),/rights_url required/));
test('missing alt rejected',()=>fails((root,r)=>editJSON(root,r,credits(r),c=>c.assets[1].alt=''),/missing alt/));
test('missing bytes rejected',()=>fails((root,r)=>fs.unlinkSync(path.join(root,r.hero.path)),/missing file/));
test('corrupt bytes rejected',()=>fails((root,r)=>fs.appendFileSync(path.join(root,r.hero.path),'bad'),/media hash/));
test('wrong hero rejected',()=>fails((_,r)=>r.hero.path=r.media.find(a=>a.path.endsWith('.webp')).path,/hero must select/));
test('wrong card cover rejected',()=>fails((root,r)=>editJSON(root,r,r.cards,d=>d.slides[0].image=''),/lead card/));
test('missing review rejected',()=>fails((_,r)=>r.media=r.media.filter(a=>!a.path.endsWith('visual-review.json')),/recorded visual review missing/));
test('pending review cannot pass',()=>fails((root,r)=>editJSON(root,r,review(r),v=>v.status='pending'),/review incomplete/));
test('missing art check cannot pass',()=>fails((root,r)=>editJSON(root,r,review(r),v=>delete v.checks.editorial_art),/review lacks editorial_art/));
test('new image hash requires fresh recorded review',()=>fails((root,r)=>editJSON(root,r,review(r),v=>v.asset_sha256[r.hero.path]='stale'),/review stale for image/));
test('changed credits requires fresh recorded review',()=>fails((root,r)=>editJSON(root,r,credits(r),v=>v.assets[0].caption+=' revised'),/review stale for credits/));
test('changed article requires fresh recorded review',()=>fails((root,r)=>fs.appendFileSync(path.join(root,r.article),'\n'),/review stale for article/));
test('path traversal rejected',()=>fails((_,r)=>r.media[0].path='../escape',/media hash\/path/));

test("reader-facing credit cannot be omitted",()=>fails((root,r)=>{const p=path.join(root,r.article);fs.writeFileSync(p,fs.readFileSync(p,"utf8").replaceAll("<figcaption>","<div>"));},/reader-facing captions/));
