/* Visual renderer upgrade only: lesson copy, controls and animation selection stay untouched. */
function bbTag(ctx, text, x, y, color){
  ctx.save();ctx.font="600 11px system-ui";const width=ctx.measureText(text).width+18;
  ctx.fillStyle="rgba(3,15,35,.88)";ctx.strokeStyle=color+"88";ctx.lineWidth=1;
  if(ctx.roundRect){ctx.beginPath();ctx.roundRect(x,y-16,width,25,8);ctx.fill();ctx.stroke();}
  else {ctx.fillRect(x,y-16,width,25);ctx.strokeRect(x,y-16,width,25);}
  ctx.fillStyle=color;ctx.fillText(text,x+9,y+1);ctx.restore();
}
function bbGlow(ctx, fn, color, width=2.5, blur=12){
  ctx.save();ctx.beginPath();fn();ctx.strokeStyle=color;ctx.lineWidth=width;ctx.lineCap="round";ctx.lineJoin="round";ctx.shadowColor=color;ctx.shadowBlur=blur;ctx.stroke();ctx.restore();
}
function bbArrow(ctx,x1,y1,x2,y2,color){
  ctx.save();ctx.strokeStyle=color;ctx.fillStyle=color;ctx.lineWidth=1.6;ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();
  const a=Math.atan2(y2-y1,x2-x1),n=8;ctx.beginPath();ctx.moveTo(x2,y2);ctx.lineTo(x2-n*Math.cos(a-.48),y2-n*Math.sin(a-.48));ctx.lineTo(x2-n*Math.cos(a+.48),y2-n*Math.sin(a+.48));ctx.closePath();ctx.fill();ctx.restore();
}
function bbGrid(ctx,w,h){
  ctx.save();ctx.strokeStyle="rgba(91,181,255,.075)";ctx.lineWidth=1;
  for(let x=0;x<w;x+=25){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke()}
  for(let y=0;y<h;y+=25){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke()}
  ctx.restore();
}
drawReflection = function(ctx,w,h){
  const wall=w*.72,mid=h*.52,t=anim.t;
  bbGrid(ctx,w,h);
  const grad=ctx.createLinearGradient(0,0,w,0);grad.addColorStop(0,"rgba(33,202,255,.08)");grad.addColorStop(.7,"rgba(45,120,255,.02)");grad.addColorStop(1,"rgba(179,126,255,.08)");
  ctx.fillStyle=grad;ctx.fillRect(0,0,w,h);
  bbGlow(ctx,()=>{ctx.moveTo(wall,20);ctx.lineTo(wall,h-20)},"#9bb9d2",3,10);
  bbTag(ctx,"REFLECTING SURFACE",Math.max(8,wall-72),20,"#b9d9ff");
  // Incoming ray
  bbGlow(ctx,()=>{ctx.moveTo(22,mid+70);ctx.lineTo(wall-3,mid)},"#31e6ff",3,16);
  bbGlow(ctx,()=>{ctx.moveTo(wall-3,mid);ctx.lineTo(22,mid-70)},"#b49aff",3,16);
  // Animated wavefront arcs approaching and returning from boundary
  for(let k=0;k<5;k++){
    const r=((t*48+k*43)%(wall*.76))+8;
    ctx.save();ctx.globalAlpha=.76-k*.1;
    bbGlow(ctx,()=>{ctx.arc(22,mid+70,r,-.9,.05)},"#31dfff",1.8,8);
    const rr=((t*48+k*43)%(wall*.6))+8;
    bbGlow(ctx,()=>{ctx.arc(wall-3,mid,rr,Math.PI*.65,Math.PI*1.35)},"#b49aff",1.8,9);
    ctx.restore();
  }
  ctx.save();ctx.strokeStyle="rgba(255,255,255,.32)";ctx.setLineDash([4,5]);ctx.beginPath();ctx.moveTo(wall,mid-100);ctx.lineTo(wall,mid+100);ctx.stroke();ctx.restore();
  bbTag(ctx,"INCIDENT WAVE",18,h-25,"#5beaff");bbTag(ctx,"REFLECTED WAVE",Math.max(20,wall-140),h-25,"#c5adff");
  bbArrow(ctx,wall+12,mid-3,w-18,mid-3,"#a8c5ff");
};
drawRefraction = function(ctx,w,h){
  const b=w*.5,t=anim.t;
  bbGrid(ctx,w,h);
  const g1=ctx.createLinearGradient(0,0,b,h);g1.addColorStop(0,"rgba(22,177,255,.18)");g1.addColorStop(1,"rgba(14,70,143,.12)");
  const g2=ctx.createLinearGradient(b,0,w,h);g2.addColorStop(0,"rgba(149,104,255,.18)");g2.addColorStop(1,"rgba(32,177,190,.12)");
  ctx.fillStyle=g1;ctx.fillRect(0,0,b,h);ctx.fillStyle=g2;ctx.fillRect(b,0,w-b,h);
  bbGlow(ctx,()=>{ctx.moveTo(b,8);ctx.lineTo(b,h-8)},"#d7e9ff",2,12);
  // Normal line
  ctx.save();ctx.strokeStyle="rgba(255,255,255,.42)";ctx.setLineDash([5,6]);ctx.beginPath();ctx.moveTo(b,12);ctx.lineTo(b,h-12);ctx.stroke();ctx.restore();
  const y0=h*.19,y1=h*.8,x0=b*.48,x2=b+(w-b)*.67;
  bbGlow(ctx,()=>{ctx.moveTo(12,y0);ctx.lineTo(b,y1*.57)},"#31e6ff",3,15);
  bbGlow(ctx,()=>{ctx.moveTo(b,y1*.57);ctx.lineTo(x2,h*.38)},"#ffce72",3,15);
  // Moving wavefronts: tighter spacing in second medium
  for(let i=0;i<5;i++){
    const y=((t*38+i*48)%(h+45))-20;
    bbGlow(ctx,()=>{ctx.moveTo(10,y);ctx.lineTo(b,y+22)},"#31dfff",1.5,6);
  }
  for(let i=0;i<7;i++){
    const y=((t*28+i*29)%(h+30))-15;
    bbGlow(ctx,()=>{ctx.moveTo(b+3,y);ctx.lineTo(w-8,y+10)},"#ffcf78",1.5,6);
  }
  bbTag(ctx,"MEDIUM 1 · FASTER",12,25,"#68efff");
  bbTag(ctx,"MEDIUM 2 · SLOWER",Math.min(w-160,b+12),25,"#d0b4ff");
  bbTag(ctx,"DIRECTION CHANGES",Math.max(10,b-70),h-18,"#ffe09a");
};
drawDiffraction = function(ctx,w,h){
  const wall=w*.46,gap=Math.min(70,h*.28),cy=h*.53,t=anim.t;
  bbGrid(ctx,w,h);
  // Wall and narrow slit
  const metal=ctx.createLinearGradient(wall-7,0,wall+8,0);metal.addColorStop(0,"#4e7598");metal.addColorStop(.5,"#b5d6ec");metal.addColorStop(1,"#456583");
  ctx.fillStyle=metal;ctx.fillRect(wall-5,0,10,cy-gap);ctx.fillRect(wall-5,cy+gap,10,h-cy-gap);
  // Incoming parallel wavefronts
  for(let i=0;i<7;i++){
    const x=18+((t*45+i*35)%(wall-10));
    bbGlow(ctx,()=>{ctx.moveTo(x,12);ctx.lineTo(x,h-12)},"#31e6ff",1.8,8);
  }
  // Semi-circular spreading wavefronts from slit
  for(let i=0;i<8;i++){
    const r=((t*42+i*24)%(w*.86))+6;
    ctx.save();ctx.globalAlpha=Math.max(.18,1-r/(w*1.15));
    bbGlow(ctx,()=>{ctx.arc(wall+3,cy,r,-Math.PI/2,Math.PI/2)},"#4fe8ff",2,11);
    ctx.restore();
  }
  bbTag(ctx,"PLANE WAVES",12,24,"#6cf0ff");
  bbTag(ctx,"NARROW SLIT",Math.max(8,wall-46),cy-gap-10,"#ffe09a");
  bbTag(ctx,"WAVE SPREADING",Math.min(w-145,wall+30),28,"#8ddcff");
  bbArrow(ctx,wall+18,h-24,w-16,h-24,"#70dfff");
};
drawRipple = function(ctx,w,h){
  const cx=w*.29,cy=h*.48,t=anim.t;
  bbGrid(ctx,w,h);
  // Tank glass frame and water surface
  ctx.save();ctx.strokeStyle="rgba(99,213,255,.52)";ctx.lineWidth=2;
  if(ctx.roundRect){ctx.beginPath();ctx.roundRect(10,12,w-20,h-24,16);ctx.stroke()}else ctx.strokeRect(10,12,w-20,h-24);
  const water=ctx.createLinearGradient(0,0,0,h);water.addColorStop(0,"rgba(26,173,255,.12)");water.addColorStop(1,"rgba(24,76,190,.06)");
  ctx.fillStyle=water;ctx.fillRect(12,14,w-24,h-28);ctx.restore();
  // Concentric ripples with fading neon glow
  for(let i=0;i<9;i++){
    const r=((t*38+i*23)%(w*.68))+3,alpha=Math.max(.08,1-r/(w*.9));
    ctx.save();ctx.globalAlpha=alpha;
    bbGlow(ctx,()=>{ctx.arc(cx,cy,r,0,Math.PI*2)},"#31e6ff",2,13);
    ctx.restore();
  }
  const glow=ctx.createRadialGradient(cx,cy,0,cx,cy,24);glow.addColorStop(0,"#ffffff");glow.addColorStop(.22,"#72f4ff");glow.addColorStop(1,"rgba(48,219,255,0)");
  ctx.fillStyle=glow;ctx.beginPath();ctx.arc(cx,cy,24,0,Math.PI*2);ctx.fill();
  ctx.fillStyle="#eaffff";ctx.beginPath();ctx.arc(cx,cy,5,0,Math.PI*2);ctx.fill();
  bbTag(ctx,"RIPPLE TANK",20,32,"#70f4ff");
  bbTag(ctx,"CIRCULAR WAVEFRONTS",Math.min(w-190,cx+35),h-22,"#8ccfff");
  // Tiny floating reflection sparkles
  for(let i=0;i<14;i++){
    const x=(i*71+t*11)%w,y=25+(i*37)%(h-50);
    ctx.fillStyle=`rgba(190,248,255,${.18+.22*(Math.sin(t+i)+1)/2})`;ctx.beginPath();ctx.arc(x,y,1.4,0,Math.PI*2);ctx.fill();
  }
};
drawPendulum = function(ctx,w,h){
  const L=Math.min(150,h*.55),px=w*.5,py=34,angle=.58*Math.sin(anim.t*1.7),bx=px+Math.sin(angle)*L,by=py+Math.cos(angle)*L;
  bbGrid(ctx,w,h);
  // Swing arc and center equilibrium
  ctx.save();ctx.setLineDash([5,6]);ctx.strokeStyle="rgba(180,213,255,.42)";ctx.lineWidth=1.5;
  ctx.beginPath();ctx.arc(px,py,L,Math.PI*.18,Math.PI*.82);ctx.stroke();
  ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(px,py+L+20);ctx.stroke();ctx.restore();
  // Faint extreme-position guides
  for(const a of [-.58,.58]){
    const ex=px+Math.sin(a)*L,ey=py+Math.cos(a)*L;
    ctx.save();ctx.setLineDash([3,6]);ctx.strokeStyle="rgba(180,145,255,.35)";ctx.beginPath();ctx.moveTo(ex,ey);ctx.lineTo(ex,py);ctx.stroke();ctx.restore();
    ctx.fillStyle="rgba(183,155,255,.65)";ctx.beginPath();ctx.arc(ex,ey,4,0,Math.PI*2);ctx.fill();
  }
  // String with luminous core
  bbGlow(ctx,()=>{ctx.moveTo(px,py);ctx.lineTo(bx,by)},"#8deeff",2.5,8);
  // Pendulum bob with metallic gradient
  const rg=ctx.createRadialGradient(bx-6,by-7,2,bx,by,20);rg.addColorStop(0,"#ffffff");rg.addColorStop(.25,"#8cf6ff");rg.addColorStop(.68,"#20bfe8");rg.addColorStop(1,"#1753b7");
  ctx.save();ctx.shadowColor="#27dfff";ctx.shadowBlur=24;ctx.fillStyle=rg;ctx.beginPath();ctx.arc(bx,by,17,0,Math.PI*2);ctx.fill();ctx.restore();
  ctx.fillStyle="#eaffff";ctx.beginPath();ctx.arc(px,py,5,0,Math.PI*2);ctx.fill();
  // Direction marker and motion trail
  bbArrow(ctx,bx,by,bx+Math.cos(angle)*25,by-Math.sin(angle)*25,"#ffcf72");
  bbTag(ctx,"PENDULUM",14,25,"#72efff");
  bbTag(ctx,"T ≈ 2π√(L/g)",14,h-18,"#ffd17b");
  bbTag(ctx,"OSCILLATION",Math.max(12,w-120),h-18,"#c3adff");
};
