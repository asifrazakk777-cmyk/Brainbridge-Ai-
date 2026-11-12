/* Visual-only upgrade: retains the same wave concepts, controls, labels and learning text. */
function bbGlowLine(ctx, draw, color, width=3, blur=16){
  ctx.save();ctx.beginPath();draw();ctx.strokeStyle=color;ctx.lineWidth=width;ctx.lineCap="round";ctx.lineJoin="round";ctx.shadowColor=color;ctx.shadowBlur=blur;ctx.stroke();ctx.restore();
}
function bbPill(ctx,text,x,y,color){
  ctx.save();ctx.font="600 12px system-ui";const pad=9,w=ctx.measureText(text).width+pad*2;
  ctx.fillStyle="rgba(3,17,39,.82)";ctx.strokeStyle=color+"88";ctx.lineWidth=1;
  ctx.beginPath();ctx.roundRect(x,y-16,w,25,9);ctx.fill();ctx.stroke();
  ctx.fillStyle=color;ctx.fillText(text,x+pad,y+1);ctx.restore();
}
function drawTransverse(ctx,w,h){
  const mid=h*.52,A=Math.min(58,h*.22),L=Math.max(110,Math.min(170,w*.23)),t=anim.t;
  // Subtle scientific grid and luminous equilibrium line
  ctx.save();ctx.strokeStyle="rgba(82,174,255,.075)";ctx.lineWidth=1;
  for(let x=0;x<w;x+=24){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke()}
  for(let y=0;y<h;y+=24){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke()}
  ctx.setLineDash([5,7]);ctx.strokeStyle="rgba(160,205,255,.38)";ctx.beginPath();ctx.moveTo(12,mid);ctx.lineTo(w-12,mid);ctx.stroke();ctx.setLineDash([]);
  // Soft underglow and main wave
  const wave=()=>{for(let x=0;x<=w;x++){const y=waveY(x,mid,A,L,t);if(x===0)ctx.moveTo(x,y);else ctx.lineTo(x,y)}};
  bbGlowLine(ctx,wave,"rgba(19,134,255,.48)",9,24);
  bbGlowLine(ctx,wave,"#31e6ff",3.4,17);
  // Animated luminous particles travelling with the wave
  for(let x=12;x<w;x+=22){
    const y=waveY(x,mid,A,L,t);
    const g=ctx.createRadialGradient(x,y,0,x,y,9);g.addColorStop(0,"rgba(230,255,255,.98)");g.addColorStop(.35,"rgba(50,232,255,.8)");g.addColorStop(1,"rgba(50,232,255,0)");
    ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,9,0,Math.PI*2);ctx.fill();
    ctx.fillStyle="#e8fcff";ctx.beginPath();ctx.arc(x,y,2.1,0,Math.PI*2);ctx.fill();
  }
  const crestX=((L/4+t*L/Math.PI)%L)+L*.15,cy=waveY(crestX,mid,A,L,t);
  ctx.setLineDash([4,5]);ctx.strokeStyle="rgba(255,209,102,.72)";ctx.beginPath();ctx.moveTo(crestX,mid);ctx.lineTo(crestX,cy);ctx.stroke();ctx.setLineDash([]);
  drawArrow(ctx,crestX,mid,crestX,cy,"#ffd166");
  bbPill(ctx,"AMPLITUDE A",Math.min(w-118,crestX+12),(mid+cy)/2,"#ffd166");
  bbPill(ctx,"CREST",Math.min(w-84,Math.max(8,crestX-22)),cy-13,"#71f4ff");
  let troughX=crestX+L/2;if(troughX>w-20)troughX-=L;const ty=waveY(troughX,mid,A,L,t);
  bbPill(ctx,"TROUGH",Math.min(w-100,Math.max(8,troughX-24)),ty+28,"#b8a0ff");
  const ly=h-42;drawArrow(ctx,Math.max(20,w*.16),ly,Math.min(w-20,w*.16+L),ly,"#6ba8ff");
  bbPill(ctx,"WAVELENGTH  λ",Math.max(10,w*.16+L/2-55),ly-12,"#8abaff");
  ctx.fillStyle="rgba(208,232,255,.72)";ctx.font="11px system-ui";ctx.fillText("EQUILIBRIUM",14,mid-9);
  bbPill(ctx,"PARTICLE MOTION  ↕",14,25,"#7cf4ff");
  bbPill(ctx,"ENERGY / WAVE DIRECTION  →",Math.max(20,w-214),25,"#7daeff");
  ctx.restore();
}
function drawLongitudinal(ctx,w,h){
  const mid=h*.53,t=anim.t,spacing=22,count=Math.ceil(w/spacing)+5;
  ctx.save();
  // Depth grid
  ctx.strokeStyle="rgba(82,174,255,.07)";ctx.lineWidth=1;
  for(let x=0;x<w;x+=24){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke()}
  for(let y=0;y<h;y+=24){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke()}
  // Wave travel line
  ctx.setLineDash([5,7]);ctx.strokeStyle="rgba(140,205,255,.3)";ctx.beginPath();ctx.moveTo(10,mid);ctx.lineTo(w-10,mid);ctx.stroke();ctx.setLineDash([]);
  // Particle locations oscillate parallel to propagation; density creates visible compression bands.
  for(let i=0;i<count;i++){
    const base=i*spacing-18;
    const xx=base+8.5*Math.sin(base/43-t*2.25);
    const pulse=(Math.cos(base/43-t*2.25)+1)/2;
    const radius=3.2+1.3*pulse;
    const glow=ctx.createRadialGradient(xx,mid,0,xx,mid,12);
    glow.addColorStop(0,`rgba(87,241,255,${.68+.25*pulse})`);glow.addColorStop(1,"rgba(30,150,255,0)");
    ctx.fillStyle=glow;ctx.beginPath();ctx.arc(xx,mid,12,0,Math.PI*2);ctx.fill();
    ctx.fillStyle=pulse>.65?"#eaffff":"#6edfff";ctx.beginPath();ctx.arc(xx,mid,radius,0,Math.PI*2);ctx.fill();
  }
  // Soft moving compression / rarefaction zones
  for(let i=0;i<4;i++){
    const cx=((i*170+t*43)%(w+220))-110;
    const g=ctx.createLinearGradient(cx-55,0,cx+55,0);
    g.addColorStop(0,"rgba(55,212,255,0)");g.addColorStop(.5,"rgba(55,212,255,.13)");g.addColorStop(1,"rgba(55,212,255,0)");
    ctx.fillStyle=g;ctx.fillRect(cx-55,mid-62,110,124);
    ctx.strokeStyle="rgba(80,220,255,.25)";ctx.beginPath();ctx.moveTo(cx,mid-55);ctx.lineTo(cx,mid+55);ctx.stroke();
  }
  bbPill(ctx,"COMPRESSION · HIGH DENSITY",14,35,"#70f3ff");
  bbPill(ctx,"RAREFACTION · LOW DENSITY",Math.max(14,w*.51),35,"#c0a7ff");
  drawArrow(ctx,20,h-58,w-28,h-58,"#38d9ff");
  bbPill(ctx,"PARTICLE VIBRATION  ↔",14,h-20,"#7cf4ff");
  bbPill(ctx,"WAVE PROPAGATION  →",Math.max(20,w-190),h-20,"#8abaff");
  ctx.restore();
}
