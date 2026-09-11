const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const ts=require('typescript');
const base=path.resolve(__dirname,'..');
const dictionaries=[];
for(const file of ['app/i18n/messages.ts','app/i18n/extra-messages.ts']) {
 const tree=ts.createSourceFile(file,fs.readFileSync(path.join(base,file),'utf8'),ts.ScriptTarget.Latest,true);
 const visit=n=>{if(ts.isArrayLiteralExpression(n)&&n.elements.length&&n.elements.every(ts.isStringLiteral)){const row=n.elements.map(v=>v.text);assert.equal(row.length,7,`Wrong language count: ${row[0]}`);dictionaries.push(row);} ts.forEachChild(n,visit);}; visit(tree);
}
const dict=new Map(dictionaries.map(row=>[row[0].trim(),row]));
const keys=new Set();
const allFiles=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?allFiles(path.join(dir,entry.name)):[path.join(dir,entry.name)]);
for(const file of [...allFiles(path.join(base,'app/views')),...allFiles(path.join(base,'app/components'))]) {
 if(!file.endsWith('.tsx')) continue;
 const tree=ts.createSourceFile(file,fs.readFileSync(file,'utf8'),ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
 const collect=n=>{if(ts.isStringLiteral(n))keys.add(n.text.trim());else ts.forEachChild(n,collect);};
 const visit=n=>{
  if(ts.isCallExpression(n)&&n.expression.getText(tree)==='t')collect(n.arguments[0]);
  if(ts.isJsxText(n))assert.ok(!/[\u0590-\u05ff]/.test(n.text),`Untranslated JSX in ${file}: ${n.text}`);
  ts.forEachChild(n,visit);
 };visit(tree);
}
for(const key of keys){
 const row=dict.get(key);assert.ok(row,`Missing key: ${key}`);
 const placeholders=Array.from(key.matchAll(/\{\d+\}/g),m=>m[0]).sort();
 for(let i=1;i<7;i++) {
  assert.ok(row[i].trim(),`Empty locale ${i}: ${key}`);
  assert.ok(!/[\u0590-\u05ff]/.test(row[i]),`Hebrew leaked into locale ${i}: ${key}`);
  if(i!==2)assert.ok(!/[\u0400-\u04ff]/.test(row[i]),`Cyrillic leaked into locale ${i}: ${key}`);
  assert.deepEqual(Array.from(row[i].matchAll(/\{\d+\}/g),m=>m[0]).sort(),placeholders,`Placeholder mismatch ${i}: ${key}`);
 }
}
console.log(`Translation coverage: ${keys.size} UI/message keys x 7 languages; no missing keys or placeholder mismatches.`);
if(!fs.existsSync(path.join(base,'out')))process.exit(0);
const langs=['he','en','ru','ar','am','ti','es'];
const slugs=['','projects','certificates','guide'];
let pages=0;
for(const lang of langs)for(const slug of slugs) {
 const route=(lang==='he'?'':'/'+lang)+(slug?'/'+slug:'');
 const file=path.join(base,'out',route?route.slice(1)+'.html':'index.html');
 const html=fs.readFileSync(file,'utf8');
 const rootTag=html.match(/<html\b[^>]*>/)?.[0]||'';
 assert.ok(rootTag.includes(`lang="${lang}"`),`Wrong HTML language: ${route}: ${rootTag}`);
 assert.ok(rootTag.includes(`dir="${['he','ar'].includes(lang)?'rtl':'ltr'}"`),`Wrong HTML direction: ${route}: ${rootTag}`);
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`H1 count: ${route}`);
 assert.ok(html.includes('rel="canonical"'),`Canonical: ${route}`);
 for(const alternate of [...langs,'x-default'])assert.ok(html.includes(`hrefLang="${alternate}"`)||html.includes(`hreflang="${alternate}"`),`Missing alternate ${alternate}: ${route}`);
 assert.ok(html.includes('application/ld+json'),`Structured data: ${route}`);
 for(const m of html.matchAll(/src="(\/images\/[^"?]+)(?:\?[^" ]*)?"/g))assert.ok(fs.existsSync(path.join(base,'public',m[1])),`Missing asset ${m[1]}`);
 // Inspect static body text without scripts, styles, or the multilingual language menu.
 let body=html.split('<body>')[1]?.split('</body>')[0]||'';
 body=body.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'').replace(/<style\b[^>]*>[\s\S]*?<\/style>/g,'').replace(/<details class="language-menu">[\s\S]*?<\/details>/g,'').replace(/<[^>]+>/g,'');
 if(lang!=='he')assert.ok(!/[\u0590-\u05ff]/.test(body),`Hebrew body text: ${route}`);
 if(slug==='certificates')assert.ok(html.includes('noindex'),`Demo certificates should not index: ${route}`);
 pages++;
}
const sitemap=fs.readFileSync(path.join(base,'out/sitemap.xml'),'utf8');
assert.equal((sitemap.match(/<url>/g)||[]).length,21);
assert.ok(!sitemap.includes('/certificates'));
assert.ok(fs.readFileSync(path.join(base,'out/robots.txt'),'utf8').includes('Sitemap:'));
console.log(`Static SEO checks: ${pages} localized pages; 21 sitemap entries; languages, directions, headings, canonical, alternates, JSON-LD, and assets passed.`);
