(()=> {
 const KEY="bb_game_v1", today=()=>new Date().toLocaleDateString("en-CA");
 let g=JSON.parse(localStorage.getItem(KEY)||'{"xp":0,"streak":0,"lastDay":"","todayXp":0,"today":"", "badges":[]}');
 const achievements=[
  ["first","🌱","First Steps","Complete 1 topic",()=>done.length>=1],
  ["five","📚","Curious Mind","Complete 5 topics",()=>done.length>=5],
  ["all","🎓","Wave Scholar","Complete every Physics topic",()=>done.length>=T.length],
  ["quiz","🎯","Quiz Starter","Finish a quiz",()=>g.badges.includes("quiz")],
  ["perfect","💯","Perfect Run","Get 100% in a quiz",()=>g.badges.includes("perfect")],
  ["streak","🔥","Consistency","Study on 3 days",()=>g.streak>=3]
 ];
 function save(){localStorage.setItem(KEY,JSON.stringify(g));draw()}
 function dayCheck(){let d=today();if(g.today!==d){g.today=d;g.todayXp=0}if(g.lastDay!==d){let prev=new Date();prev.setDate(prev.getDate()-1);let p=prev.toLocaleDateString("en-CA");g.streak=(g.lastDay===p)?g.streak+1:1;g.lastDay=d} }
 function addXP(n,label="XP"){dayCheck();g.xp+=n;g.todayXp+=n;save();floatXP("+"+n+" XP");if(label)showToast("✨ "+label+" • +"+n+" XP")}
 function unlock(id){if(!g.badges.includes(id)){g.badges.push(id);let b=achievements.find(x=>x[0]===id);if(b){addXP(25,"Badge unlocked: "+b[2]);burst();}}}
 function draw(){let level=Math.floor(g.xp/100)+1,into=g.xp%100;let set=(id,v)=>{let e=document.getElementById(id);if(e)e.textContent=v};set("bbLevel",level);set("bbXpText",into+" / 100 XP");set("bbXpTotal","✨ "+g.xp+" XP total");set("bbStreak",g.streak);set("bbTodayXp",g.todayXp);set("bbBadgeCount",g.badges.length+"/"+achievements.length);let bar=document.getElementById("bbXpBar");if(bar)bar.style.width=into+"%";let holder=document.getElementById("bbBadges");if(holder)holder.innerHTML=achievements.map(a=>`<div class="bb-ach ${g.badges.includes(a[0])?"unlocked":""}"><span class="em">${a[1]}</span><strong>${a[2]}</strong><small>${a[3]}</small></div>`).join("");}
 function floatXP(t){let e=document.createElement("div");e.className="bb-float-xp";e.textContent=t;document.body.appendChild(e);setTimeout(()=>e.remove(),1000)}
 function burst(){for(let i=0;i<22;i++){let e=document.createElement("i");e.className="bb-confetti";e.style.left="50%";e.style.top="42%";e.style.background=["#43eaff","#a58aff","#62f4bb","#ffd166"][i%4];e.style.setProperty("--dx",(Math.random()*260-130)+"px");e.style.setProperty("--dy",(Math.random()*220-110)+"px");document.body.appendChild(e);setTimeout(()=>e.remove(),1100)}}
 // award topic completion
 const oldToggle=window.toggle;window.toggle=function(i){let was=done.includes(i);oldToggle(i);if(!was){addXP(10,"Topic completed");unlock("first");unlock("five");unlock("all");}};
 // award main quiz points; preserve original answer behavior
 const oldSubmit=window.submitQ;window.submitQ=function(){if(sel<0){oldSubmit();return}let correct=sel===Q[quizI][2];oldSubmit();if(correct){addXP(10,"Correct answer");let exp=document.getElementById("exp");if(exp){exp.classList.add("bb-correct-pop");burst()}}};
 // award quiz finish (main quiz + chemistry/carbon)
 const oldRender=window.renderQuiz;window.renderQuiz=function(){if(quizI>=Q.length&&!g.badges.includes("quiz")){unlock("quiz");if(score===Q.length)unlock("perfect")}oldRender()};
 const oldChem=window.renderChemQuiz;if(oldChem)window.renderChemQuiz=function(){if(typeof chemQuizIndex!=="undefined"&&chemQuizIndex>=CHEM_Q.length&&!g.badges.includes("quiz"))unlock("quiz");oldChem()};
 const oldCarbon=window.renderCarbonQuiz;if(oldCarbon)window.renderCarbonQuiz=function(){if(typeof carbonQuizIndex!=="undefined"&&carbonQuizIndex>=CARBON_Q.length&&!g.badges.includes("quiz"))unlock("quiz");oldCarbon()};
 dayCheck();draw();window.addEventListener("load",draw);
})();
