const pages=[...document.querySelectorAll('.page')];let page=0;const $=id=>document.getElementById(id);
function go(n){page=Math.max(0,Math.min(pages.length-1,n));pages.forEach((p,i)=>p.classList.toggle('active',i===page));$('progress').style.width=((page+1)/pages.length*100)+'%';$('counter').textContent=`${page+1} / ${pages.length}`;$('prev').disabled=page===0;$('next').textContent=page===pages.length-1?'La început ↺':'Înainte →';document.querySelectorAll('#dots button').forEach((b,i)=>b.classList.toggle('active',i===page));window.scrollTo({top:0,behavior:'smooth'});$('menu').classList.add('hidden')}
function goHome(){go(0)}
function toggleMenu(){$('menu').classList.toggle('hidden')}
const dots=$('dots');pages.forEach((p,i)=>{let b=document.createElement('button');b.title=p.dataset.title;b.setAttribute('aria-label',p.dataset.title);b.onclick=()=>go(i);dots.append(b);let m=document.createElement('button');m.textContent=`${i+1}. ${p.dataset.title}`;m.onclick=()=>go(i);$('menuLinks').append(m)});
$('prev').onclick=()=>go(page-1);$('next').onclick=()=>go(page===pages.length-1?0:page+1);go(0);
document.querySelectorAll('.quiz[data-quiz]').forEach(q=>{let buttons=[...q.querySelectorAll('button[data-answer]')];buttons.forEach(b=>b.onclick=()=>{if(q.dataset.done)return;q.dataset.done='1';let ok=b.dataset.answer==='1';b.classList.add(ok?'correct':'wrong');q.querySelector('.feedback').textContent=ok?'Corect! Ai reținut bine.':'Mai încearcă data viitoare. Răspunsul corect este evidențiat cu verde.';buttons.forEach(x=>{if(x.dataset.answer==='1')x.classList.add('correct');x.disabled=true})})});
const questions=[
 ['Unde se afla Chivotul înainte ca David să-l aducă?',['În casa lui Abinadab, la Chiriat-Iearim','În Egipt','În palatul lui David'],0,'1 Samuel 7:1–2'],
 ['Din ce era făcut Chivotul?',['Din piatră și argint','Din lemn de salcâm poleit cu aur','Din bronz'],1,'Exodul 25:10–11'],
 ['Ce se afla pe capacul ispășirii?',['Doi heruvimi','Doi lei','Un sfeșnic'],0,'Exodul 25:18–20'],
 ['În ce a fost pus Chivotul la prima încercare?',['Într-o corabie','Într-un car nou','Pe un cal'],1,'2 Samuel 6:3'],
 ['Cât timp a stat Chivotul la Obed-Edom?',['Trei zile','Trei luni','Trei ani'],1,'2 Samuel 6:11'],
 ['Cine l-a purtat la a doua aducere?',['Leviții, pe umeri, cu drugii','Soldații','Boii într-un car'],0,'1 Cronici 15:2, 15'],
 ['Cum s-a bucurat David?',['A dansat înaintea Domnului','A ascuns Chivotul','A părăsit cetatea'],0,'2 Samuel 6:14–15']
];let qi=0,answered=false,scores=[0,0,0,0];function renderQ(){let q=questions[qi];$('quizMeta').textContent=`Întrebarea ${qi+1} / ${questions.length} · ${q[3]}`;$('question').textContent=q[0];$('answers').innerHTML='';q[1].forEach((a,i)=>{let b=document.createElement('button');b.textContent=a;b.onclick=()=>answer(i);$('answers').append(b)});$('quizFeedback').textContent='Alege un răspuns.';$('nextQuestion').disabled=true;answered=false}
function answer(i){if(answered)return;answered=true;let q=questions[qi],team=Number($('team').value),ok=i===q[2],bs=[...$('answers').children];bs.forEach((b,j)=>{b.disabled=true;if(j===q[2])b.classList.add('correct');else if(j===i)b.classList.add('wrong')});if(ok){scores[team]+=10;$(`score${team}`).textContent=scores[team];$('quizFeedback').textContent=`Foarte bine! +10 puncte pentru Echipa ${team+1}. Referință: ${q[3]}`}else $('quizFeedback').textContent=`Răspunsul corect: ${q[1][q[2]]}. Referință: ${q[3]}`;$('nextQuestion').disabled=false}
function nextQ(){if(!answered)return;qi=(qi+1)%questions.length;renderQ()}$('nextQuestion').onclick=nextQ;renderQ();
const roles=['David – conduce procesiunea','Narator – prezintă evenimentele','Preot – explică pregătirea obiectelor sfinte','Levit chehatit – poartă Chivotul','Obed-Edom – primește Chivotul','Uza – rol simbolic, fără mimarea atingerii','Ahio – însoțește carul','Cântăreț – conduce lauda','Muzicieni – ritm și cântare','Poporul – răspunde și se bucură','Mesager – aduce vestea la David','Grup de leviți'];function assignRoles(){let names=$('names').value.split(/[\n,;]+/).map(x=>x.trim()).filter(Boolean),out=$('cast');out.innerHTML='';if(!names.length){out.textContent='Adaugă cel puțin un nume.';return}names.forEach((n,i)=>{let card=document.createElement('div'),b=document.createElement('b'),p=document.createElement('span');b.textContent=n;p.textContent=roles[i%roles.length];card.append(b,p);out.append(card)})}

// Deschide orice fotografie din lecție într-o fereastră pe tot ecranul.
(function setupImageLightbox(){
 const overlay=document.createElement('div');
 overlay.className='lightbox';
 overlay.id='imageLightbox';
 overlay.setAttribute('role','dialog');
 overlay.setAttribute('aria-modal','true');
 overlay.setAttribute('aria-label','Imagine mărită');
 overlay.innerHTML='<button class="lightbox-close" type="button" aria-label="Închide imaginea">×</button><figure><img alt=""><figcaption></figcaption></figure><div class="lightbox-help">Apasă pe imagine sau pe × pentru închidere · Tasta Esc</div>';
 document.body.appendChild(overlay);
 const largeImage=overlay.querySelector('img');
 const caption=overlay.querySelector('figcaption');
 const closeButton=overlay.querySelector('.lightbox-close');
 let previousFocus=null;
 function close(){overlay.classList.remove('open');document.body.style.overflow='';largeImage.removeAttribute('src');if(previousFocus)previousFocus.focus();}
 function open(img){previousFocus=img;largeImage.src=img.currentSrc||img.src;largeImage.alt=img.alt||'Imagine mărită';const fig=img.closest('figure');const cap=fig?.querySelector('figcaption');caption.textContent=cap?.textContent||img.alt||'';overlay.classList.add('open');document.body.style.overflow='hidden';closeButton.focus();}
 document.querySelectorAll('.visual img').forEach(img=>{img.tabIndex=0;img.setAttribute('role','button');img.setAttribute('aria-label',(img.alt||'Imagine')+' – apasă pentru mărire');img.addEventListener('click',()=>open(img));img.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open(img);}});});
 closeButton.addEventListener('click',close);
 overlay.addEventListener('click',e=>{if(e.target===overlay||e.target===largeImage)close();});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&overlay.classList.contains('open'))close();});
})();
