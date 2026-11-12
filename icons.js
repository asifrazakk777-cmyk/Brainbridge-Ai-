(()=>{
 const paths={
  book:'<path d="M4 5.5c4-2 8-1.4 12 1v13c-4-2.4-8-3-12-1z"/><path d="M20 5.5c-4-2-8-1.4-12 1v13c4-2.4 8-3 12-1z"/><path d="M12 6.5v13"/>',
  settings:'<circle cx="12" cy="12" r="3.2"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-1.8 1.8-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V20h-2.55v-.1a1.7 1.7 0 0 0-1.03-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06-1.8-1.8.06-.06A1.7 1.7 0 0 0 8.1 15a1.7 1.7 0 0 0-1.56-1.03H6v-2.55h.1A1.7 1.7 0 0 0 7.66 10a1.7 1.7 0 0 0-.34-1.88l-.06-.06 1.8-1.8.06.06A1.7 1.7 0 0 0 11 6.66 1.7 1.7 0 0 0 12.03 5.1V5h2.55v.1A1.7 1.7 0 0 0 15.6 6.66a1.7 1.7 0 0 0 1.88-.34l.06-.06 1.8 1.8-.06.06A1.7 1.7 0 0 0 18.94 10 1.7 1.7 0 0 0 20.5 11.03h.1v2.55h-.1A1.7 1.7 0 0 0 19.4 15z"/>',
  brain:'<path d="M12 4.5a3 3 0 0 0-5.8 1.1A3.6 3.6 0 0 0 4.8 12a3.4 3.4 0 0 0 2.4 5.8A3 3 0 0 0 12 19z"/><path d="M12 4.5a3 3 0 0 1 5.8 1.1A3.6 3.6 0 0 1 19.2 12a3.4 3.4 0 0 1-2.4 5.8A3 3 0 0 1 12 19z"/><path d="M8 8l2 2-2 2m8-4-2 2 2 2M12 4v15"/>',
  bolt:'<path d="M13.2 2.5 5.8 13h5l-.8 8.5L18.2 11h-5z"/>',
  target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5.5"/><circle cx="12" cy="12" r="1.7"/>',
  spark:'<path d="m12 2 1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9z"/><path d="m19 15 .9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z"/>',
  save:'<path d="M5 3h12l3 3v15H4V3z"/><path d="M8 3v6h8V3M8 21v-7h8v7"/>',
  calc:'<rect x="4" y="2.5" width="16" height="19" rx="2.5"/><path d="M8 6h8v4H8zM8 14h1m3 0h1m3 0h1M8 18h1m3 0h1m3 0h1"/>',
  wave:'<path d="M2 12h3l3-7 4 14 4-14 3 7h3"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8h.01"/>',
  pin:'<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0z"/><circle cx="12" cy="10" r="2.2"/>',
  download:'<path d="M12 3v12m-5-5 5 5 5-5"/><path d="M4 17v3h16v-3"/>',
  printer:'<path d="M6 8V3h12v5M6 17H4V9h16v8h-2"/><path d="M7 14h10v7H7zM17 11h.01"/>',
  volume:'<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16 9a4 4 0 0 1 0 6m2-9a8 8 0 0 1 0 12"/>',
  robot:'<rect x="4" y="7" width="16" height="13" rx="3"/><path d="M12 3v4M9 12h.01M15 12h.01M8 16h8M2 12h2m16 0h2"/>',
  play:'<path d="M7 4.5 19 12 7 19.5z"/>',
  redo:'<path d="M20 7v6h-6M19 13a7 7 0 1 1-2-6"/>',
  search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon:'<path d="M20.5 14A8.5 8.5 0 0 1 10 3.5 8.7 8.7 0 1 0 20.5 14z"/>',
  trophy:'<path d="M7 4h10v5a5 5 0 0 1-10 0zM7 6H3v2a4 4 0 0 0 4 4m10-6h4v2a4 4 0 0 1-4 4M12 14v4m-4 3h8m-7-3h6"/>',
  globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  waves:'<path d="M2 8c2.5 0 2.5-3 5-3s2.5 3 5 3 2.5-3 5-3 2.5 3 5 3M2 16c2.5 0 2.5-3 5-3s2.5 3 5 3 2.5-3 5-3 2.5 3 5 3"/>',
  home:'<path d="m3 11 9-8 9 8M5.5 9v11h13V9M9 20v-6h6v6"/>',
  bookcheck:'<path d="M4 4h13a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3z"/><path d="M7 4v13a3 3 0 0 0 3 3M9 9l2 2 4-4"/>'
 };
 const rules=[
  [/📚|📖/gu,'book'],[/⚙️|⚙/gu,'settings'],[/🧠/gu,'brain'],[/⚡/gu,'bolt'],[/🎯/gu,'target'],[/✨|💫|💡/gu,'spark'],[/💾/gu,'save'],[/🧮/gu,'calc'],[/🌊|〰/gu,'waves'],[/ℹ️|ℹ/gu,'info'],[/📌/gu,'pin'],[/⬇️|⬇/gu,'download'],[/🖨️|🖨/gu,'printer'],[/🔊/gu,'volume'],[/🤖/gu,'robot'],[/▶️|▶/gu,'play'],[/🔄|↻/gu,'redo'],[/🔎|🔍/gu,'search'],[/☀️|☀/gu,'sun'],[/🌙/gu,'moon'],[/🏆|🎉/gu,'trophy'],[/🌐/gu,'globe'],[/🏠/gu,'home'],[/📝|📋/gu,'bookcheck'],[/⏸/gu,'settings'],[/↩|↪|↔/gu,'wave'],[/⚖/gu,'target'],[/◉/gu,'target'],[/🔔/gu,'spark'],[/🔁/gu,'redo']
 ];
 function icon(name){return `<svg class="bb-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${paths[name]||paths.spark}</svg>`}
 function convert(root){
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(n){if(!n.nodeValue||!n.nodeValue.trim())return NodeFilter.FILTER_REJECT;const p=n.parentElement;if(!p||p.closest('script,style,svg,textarea,input,select,option'))return NodeFilter.FILTER_REJECT;return rules.some(([re])=>{re.lastIndex=0;return re.test(n.nodeValue)})?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}});
  const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
  for(const n of nodes){let value=n.nodeValue;const frag=document.createDocumentFragment();let last=0;const all=[];for(const [re,name] of rules){re.lastIndex=0;let m;while((m=re.exec(value))!==null)all.push({start:m.index,end:m.index+m[0].length,name});}all.sort((a,b)=>a.start-b.start);let cursor=0;for(const x of all){if(x.start<cursor)continue;frag.append(document.createTextNode(value.slice(cursor,x.start)));const holder=document.createElement('span');holder.innerHTML=icon(x.name);frag.append(holder.firstElementChild);cursor=x.end;}frag.append(document.createTextNode(value.slice(cursor)));n.parentNode.replaceChild(frag,n);}
 }
 function safeConvert(root){try{convert(root)}catch(e){}}
 document.addEventListener('DOMContentLoaded',()=>{safeConvert(document.body);const observer=new MutationObserver(records=>{for(const r of records){for(const node of r.addedNodes){if(node.nodeType===Node.TEXT_NODE){const parent=node.parentElement;if(parent)safeConvert(parent)}else if(node.nodeType===Node.ELEMENT_NODE&&!node.matches('svg,script,style'))safeConvert(node)}}});observer.observe(document.body,{childList:true,subtree:true});});
})();
