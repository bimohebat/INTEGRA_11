const ROS={XI:[["AMMAR FADHILLAH TSAQIIF","XI GIM 1"],["BIMO HADI WIJAYA","XI GIM 1"],["HILAL MAHDI ATS TSAQOFI","XI GIM 1"],["EILDIVO PUREPIOUS FAITHRI","XI GIM 1"],["BENEDICTUS MADA PUTRA HARTANTO","XI GIM 1"],["EKA GILANG KURNIAWAN","XI GIM 1"],["INDRA SAPUTRA","XI GIM 2"],["RADITYA BINTANG PAMUNGKAS","XI GIM 2"],["MIKHAEL ALFARADO","XI GIM 2"],["TOMI JOVISA RAGIL PAMUNGKAS","XI GIM 2"],["DANENDRA ARVEL FEBIAN W.","XI GIM 3"],["MUHAMMAD EXCELL ADYTRIANSYAH","XI GIM 3"],["RAFAEL FALENTINO ZACKY","XI GIM 3"]],
X:[["DYLAN FAVIAN YARDANI","X PPLG 1"],["MUHAMMAD NIZAM AL-JABBAR HIDAYATULLAH","X PPLG 1"],["LUTHFI HISYAM RAMADHAN","X PPLG 1"],["RONNY DWI HERMANTYO","X PPLG 1"],["ALLURA NAYA CALISTA","X PPLG 2"],["BAGAS ADITYA","X PPLG 2"],["MAULANA MUHAMMAD MUCHSIN","X PPLG 2"],["JAUZA ALYA","X PPLG 2"],["TASYA JIHAN SABIRA","X PPLG 2"],["YUDATAMA TUNGGAL CAHYA","X PPLG 2"],["JIHAN NAILA JAZILA HUSEIN","X PPLG 2"],["ARFA DANISH AL-JUMRI","X PPLG 3"],["ARYA SAID SETIAWAN","X PPLG 3"],["AULYA PUTRI HIDHAYAH","X PPLG 3"],["SYAUQI JANNATAN ABDILLAH","X PPLG 3"]]};
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const mem={};const ST={get(k){try{return localStorage.getItem(k)}catch(e){return mem[k]||null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){mem[k]=v}}};
const users=()=>{try{return JSON.parse(ST.get('i11u')||'[]')}catch(e){return[]}};
async function hash(p){try{const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode('i11'+p));return[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}catch(e){return btoa(p)}}
function view(id){$$('.view').forEach(v=>v.classList.toggle('on',v.id===id));scrollTo(0,0)}
let me=null,photos=[],done=false;
// intro
function endIntro(){const i=$('#intro');if(!i)return;i.style.opacity=0;setTimeout(()=>i.remove(),800);view('landing')}
$('#vid').addEventListener('ended',endIntro);$('#skip').onclick=endIntro;setTimeout(endIntro,9000);
$('#vid').play&&$('#vid').play().catch(()=>{});
new IntersectionObserver(e=>e.forEach(x=>x.isIntersecting&&x.target.classList.add('in'))).observe($('.rv'));
$('#enter').onclick=()=>view('auth');
// auth
const tab=r=>{$('#fR').hidden=!r;$('#fL').hidden=r;$('#tR').classList.toggle('on',r);$('#tL').classList.toggle('on',!r)};
$('#tR').onclick=()=>tab(1);$('#tL').onclick=()=>tab(0);
$$('[data-eye]').forEach(b=>b.onclick=()=>{const i=$('#'+b.dataset.eye),s=i.type==='password';i.type=s?'text':'password';const A='<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">';b.innerHTML=s?A+'<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>':A+'<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';b.setAttribute('aria-label',s?'Sembunyikan password':'Tampilkan password')});
$('#bR').onclick=async()=>{const n=$('#rn').value.trim(),k=$('#rk').value,j=$('#rj').value,p=$('#rp').value,m=$('#mR');m.className='msg e';
 if(!n||!k||!j||!p){m.textContent='Lengkapi semua isian.';return}if(p.length<4){m.textContent='Password minimal 4 karakter.';return}
 const u=users();if(u.some(x=>x.n.toLowerCase()===n.toLowerCase())){m.textContent='Nama sudah terdaftar, silakan login.';return}
 u.push({n,k,j,h:await hash(p)});ST.set('i11u',JSON.stringify(u));tab(0);$('#ln').value=n;$('#lp').value='';$('#mL').className='msg';$('#mL').textContent='Pendaftaran berhasil. Silakan login.'};
$('#bL').onclick=async()=>{const n=$('#ln').value.trim().toLowerCase(),h=await hash($('#lp').value),u=users().find(x=>x.n.toLowerCase()===n&&x.h===h),m=$('#mL');
 if(!u){m.className='msg e';m.textContent='Nama atau password salah.';return}me=u;ST.set('i11s',u.n);
 $('#wn').textContent=u.n+' · '+u.j;$('#welcome').classList.add('on');$$('.view').forEach(v=>v.classList.remove('on'));
 setTimeout(()=>{$('#welcome').classList.remove('on');openApp()},2800)};
$('#out').onclick=()=>{me=null;ST.set('i11s','');tab(0);$('#lp').value='';view('auth')};
// app
const lvl=()=>me.k.startsWith('XI')?'XI':'X';
function openApp(){$('#un').textContent=me.n;$('#ui').textContent=me.j+' · '+me.k;$('#dt').value=new Date().toISOString().slice(0,10);
 $('#rt').textContent='Presensi Kelas '+(lvl()==='XI'?'XI GIM':'X PPLG')+' – TEFA PPLG';
 $('#tb').innerHTML=ROS[lvl()].map((r,i)=>`<tr><td>${i+1}</td><td><b>${r[0]}</b></td><td>${r[1]}</td><td><div class="st">${[['H','h','Hadir'],['I','i','Ijin'],['S','s','Sakit'],['A','a','Alpa']].map(s=>`<label><input type="radio" name="s${i}" value="${s[2]}"><span class="${s[1]}">${s[2]}</span></label>`).join('')}</div><input class="note" id="n${i}" placeholder="Catatan (wajib diisi)" hidden></td></tr>`).join('');
 $$('#tb input[type=radio]').forEach(r=>r.onchange=()=>{const i=r.name.slice(1),n=$('#n'+i),v=r.value;n.hidden=!(v==='Ijin'||v==='Sakit');n.placeholder=v==='Sakit'?'Catatan sakit (mis. demam, surat dokter)':'Catatan ijin (mis. keperluan keluarga)';if(n.hidden)n.value='';sum()});
 $('#all').checked=false;photos=[];drawPh();$('#dn').classList.remove('on');$('#mS').textContent='';sum();view('app')}
$('#all').onchange=e=>{ROS[lvl()].forEach((_,i)=>{const r=$(`input[name=s${i}][value=${e.target.checked?'Hadir':'x'}]`);if(r){r.checked=true;r.onchange()}else{$$(`input[name=s${i}]`).forEach(x=>x.checked=false);$('#n'+i).hidden=true}});sum()};
function sum(){const c={Hadir:0,Ijin:0,Sakit:0,Alpa:0};ROS[lvl()].forEach((_,i)=>{const r=$(`input[name=s${i}]:checked`);if(r)c[r.value]++});
 $('#sm').innerHTML=Object.entries(c).map(([k,v])=>`<span>${k}: ${v}</span>`).join('<span>·</span>')}
// photos
$('#fi').onchange=e=>{const m=$('#mP');m.textContent='';for(const f of e.target.files){if(photos.length>=3){m.textContent='Maksimal 3 foto.';break}if(f.size>3*1024**3){m.textContent=f.name+' melebihi 3 GB.';continue}if(!f.type.startsWith('image/')){m.textContent='Hanya file gambar.';continue}photos.push(f)}e.target.value='';drawPh()};
function drawPh(){const p=$('#ph');p.innerHTML='';photos.forEach((f,i)=>{const d=document.createElement('div'),im=new Image();im.src=URL.createObjectURL(f);const b=document.createElement('button');b.textContent='×';b.onclick=()=>{photos.splice(i,1);drawPh()};d.append(im,b);p.append(d)})}
const small=f=>new Promise(res=>{const u=URL.createObjectURL(f),im=new Image();im.onload=()=>{const k=Math.min(1,900/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=im.width*k;c.height=im.height*k;c.getContext('2d').drawImage(im,0,0,c.width,c.height);res({d:c.toDataURL('image/jpeg',.8),w:c.width,h:c.height});URL.revokeObjectURL(u)};im.onerror=()=>res(null);im.src=u});
// submit
$('#sub').onclick=()=>{const m=$('#mS');m.className='msg e';let miss=0;
 for(let i=0;i<ROS[lvl()].length;i++){const r=$(`input[name=s${i}]:checked`);if(!r){miss++;continue}if((r.value==='Ijin'||r.value==='Sakit')&&!$('#n'+i).value.trim()){m.textContent='Isi catatan untuk '+ROS[lvl()][i][0]+'.';return}}
 if(miss){m.textContent=miss+' siswa belum diisi kehadirannya.';return}
 m.className='msg';m.textContent='Jurnal berhasil disubmit. Silakan ekspor dokumen.';$('#dn').classList.add('on')};
async function data(){const rows=ROS[lvl()].map((r,i)=>({no:i+1,nama:r[0],kls:r[1],st:$(`input[name=s${i}]:checked`).value,note:$('#n'+i).value.trim()}));
 const ph=(await Promise.all(photos.map(small))).filter(Boolean);
 const t=new Date($('#dt').value+'T00:00:00').toLocaleDateString('id-ID',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
 return{rows,ph,t,kg:$('#kg').value.trim(),grp:lvl()==='XI'?'XI GIM':'X PPLG'}}
const KOP=["TEACHING FACTORY PPLG","SEKOLAH MENENGAH KEJURUAN","SMK NEGERI 11 SEMARANG"],ADR="Jl. Cemara Raya, Padangsari, Kec. Banyumanik, Kota Semarang, Jawa Tengah 50266",KKK="Agustiawan, S.Kom",PIC="Bimo Hadi Wijaya";
$('#xp').onclick=async()=>{const D=await data(),{jsPDF}=window.jspdf,d=new jsPDF({unit:'mm',format:'a4'}),W=210,h=24;
 const sI=$('#lgS'),tI=$('#lgT');d.addImage(LOGO_S,'PNG',15,10,h*sI.naturalWidth/sI.naturalHeight,h);const tw=h*tI.naturalWidth/tI.naturalHeight;d.addImage(LOGO_T,'PNG',W-15-tw,10,tw,h);
 d.setFont('helvetica','bold');d.setFontSize(14);d.text(KOP[0],W/2,15,{align:'center'});d.setFontSize(11);d.text(KOP[1],W/2,21,{align:'center'});d.setFontSize(14);d.text(KOP[2],W/2,27,{align:'center'});
 d.setFont('helvetica','normal');d.setFontSize(8);d.text(ADR,W/2,32,{align:'center'});d.setLineWidth(.8);d.line(15,37,W-15,37);d.setLineWidth(.2);d.line(15,38.2,W-15,38.2);
 d.setFont('helvetica','bold');d.setFontSize(12);d.text('JURNAL KEHADIRAN TEFA PPLG',W/2,46,{align:'center'});
 d.setFont('helvetica','normal');d.setFontSize(10);d.text('Hari/Tanggal : '+D.t,15,54);d.text('Kelas : '+D.grp,15,59);if(D.kg)d.text('Kegiatan : '+D.kg,15,64);
 d.autoTable({startY:D.kg?68:63,head:[['No','Nama','Kelas','Status','Catatan']],body:D.rows.map(r=>[r.no,r.nama,r.kls,r.st,r.note]),styles:{fontSize:9},headStyles:{fillColor:[11,42,107]},margin:{left:15,right:15}});
 let y=d.lastAutoTable.finalY+10;if(y>200){d.addPage();y=20}
 d.setFontSize(10);d.text('Semarang, '+D.t,W-15,y,{align:'right'});d.text('Melaporkan,',W/2,y+7,{align:'center'});d.setFont('helvetica','bold');d.text(me.n,W/2,y+30,{align:'center'});d.setFont('helvetica','normal');d.text(me.k,W/2,y+35,{align:'center'});
 y+=46;d.text('Menyetujui,',15,y);d.text('KKK PPLG',15,y+5);d.text('Mengetahui,',W-15,y,{align:'right'});d.text('PIC TEFA PPLG',W-15,y+5,{align:'right'});
 d.setFont('helvetica','bold');d.text(KKK,15,y+28);d.text(PIC,W-15,y+28,{align:'right'});
 if(D.ph.length){d.addPage();d.setFont('helvetica','bold');d.setFontSize(12);d.text('LAMPIRAN DOKUMENTASI KEGIATAN',W/2,20,{align:'center'});let py=28;
  D.ph.forEach(p=>{const k=Math.min(120/p.w,70/p.h),w=p.w*k,hh=p.h*k;d.addImage(p.d,'JPEG',(W-w)/2,py,w,hh);py+=hh+8})}
 d.save('Jurnal-Kehadiran-TEFA-'+D.grp.replace(' ','-')+'.pdf')};
$('#xw').onclick=async()=>{const D=await data(),L=LOGO_S,R=LOGO_T,e=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
 const html=`<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word"><head><meta charset="utf-8"><style>@page{size:A4;margin:2cm}body{font-family:Arial;font-size:11pt}td,th{border:1px solid #000;padding:4px;font-size:10pt}.n td{border:0}</style></head><body>
 <table class="n" width="100%" style="border-bottom:3px double #000"><tr><td width="15%" align="left"><img src="${L}" height="85"></td><td align="center"><b style="font-size:14pt">${KOP[0]}</b><br><b style="font-size:12pt">${KOP[1]}</b><br><b style="font-size:14pt">${KOP[2]}</b><br><span style="font-size:9pt">${ADR}</span></td><td width="15%" align="right"><img src="${R}" height="85"></td></tr></table>
 <h3 align="center">JURNAL KEHADIRAN TEFA PPLG</h3><p>Hari/Tanggal : ${D.t}<br>Kelas : ${D.grp}${D.kg?'<br>Kegiatan : '+e(D.kg):''}</p>
 <table width="100%" style="border-collapse:collapse"><tr style="background:#0b2a6b;color:#fff"><th>No</th><th>Nama</th><th>Kelas</th><th>Status</th><th>Catatan</th></tr>${D.rows.map(r=>`<tr><td>${r.no}</td><td>${r.nama}</td><td>${r.kls}</td><td>${r.st}</td><td>${e(r.note)}</td></tr>`).join('')}</table>
 <p align="right">Semarang, ${D.t}</p><p align="center">Melaporkan,<br><br><br><br><b>${e(me.n)}</b><br>${me.k}</p>
 <table class="n" width="100%"><tr><td align="left">Menyetujui,<br>KKK PPLG<br><br><br><br><b>${KKK}</b></td><td align="right">Mengetahui,<br>PIC TEFA PPLG<br><br><br><br><b>${PIC}</b></td></tr></table>
 ${D.ph.length?`<br style="page-break-before:always"><h3 align="center">LAMPIRAN DOKUMENTASI KEGIATAN</h3>${D.ph.map(p=>`<p align="center"><img src="${p.d}" width="360"></p>`).join('')}`:''}</body></html>`;
 const a=document.createElement('a');a.href=URL.createObjectURL(new Blob(['\ufeff',html],{type:'application/msword'}));a.download='Jurnal-Kehadiran-TEFA-'+D.grp.replace(' ','-')+'.doc';a.click()};
