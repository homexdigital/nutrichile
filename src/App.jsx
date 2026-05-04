import { useState, useEffect } from "react";

/* ═══════════════════════════ STYLES ═══════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
:root{
  --g:#0C3829;--g1:#1B5E4E;--g2:#2E7D65;--g3:#EAF5F0;--g4:#F2FBF7;
  --a:#C9843A;--a1:#E8A85A;--a2:#FFF3E0;
  --bg:#F0EDE5;--card:#FAFAF7;--bd:#DDD9D0;--bd2:#C8C4BB;
  --t:#1a2421;--tm:#6B7168;--tl:#9E9B94;
  --r:#C0392B;--sw:258px;
}
body{font-family:'DM Sans',sans-serif;color:var(--t);background:var(--bg);}
.app{display:flex;height:100vh;overflow:hidden;}

/* ── Sidebar ── */
.sb{width:var(--sw);background:var(--g);display:flex;flex-direction:column;overflow:hidden;flex-shrink:0;}
.sb-hd{padding:20px 16px 14px;border-bottom:1px solid rgba(255,255,255,.07);}
.logo{font-family:'DM Serif Display',serif;color:#fff;font-size:22px;letter-spacing:-.3px;}
.logo em{color:var(--a1);font-style:normal;}
.logo-sub{color:rgba(255,255,255,.3);font-size:10px;letter-spacing:1.8px;text-transform:uppercase;margin-top:3px;}
.sb-srch{padding:10px 12px;border-bottom:1px solid rgba(255,255,255,.07);}
.sb-srch input{width:100%;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.06);border-radius:8px;padding:7px 11px;color:#fff;font-family:inherit;font-size:12px;outline:none;}
.sb-srch input::placeholder{color:rgba(255,255,255,.28);}
.sb-list{flex:1;overflow-y:auto;padding:6px 8px;}
.sb-list::-webkit-scrollbar{width:3px;}
.sb-list::-webkit-scrollbar-thumb{background:rgba(255,255,255,.12);border-radius:2px;}
.pi{padding:9px 11px;border-radius:9px;cursor:pointer;transition:background .13s;margin-bottom:2px;}
.pi:hover{background:rgba(255,255,255,.07);}
.pi.act{background:rgba(255,255,255,.13);}
.pi-nm{color:#fff;font-size:13px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.pi-rt{color:rgba(255,255,255,.36);font-size:11px;margin-top:1px;}
.pi-bd{display:inline-block;padding:2px 7px;border-radius:4px;font-size:9px;font-weight:600;letter-spacing:.6px;text-transform:uppercase;background:rgba(201,132,58,.22);color:var(--a1);margin-top:3px;}
.sb-new{margin:10px;padding:10px;background:var(--a);color:#fff;border:none;border-radius:9px;font-family:inherit;font-size:13px;font-weight:500;cursor:pointer;transition:background .13s;}
.sb-new:hover{background:#b3752e;}

/* ── Main ── */
.main{flex:1;display:flex;flex-direction:column;overflow:hidden;}
.welcome{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;text-align:center;padding:40px;}
.w-ico{width:76px;height:76px;background:linear-gradient(135deg,var(--g1),var(--g2));border-radius:20px;display:flex;align-items:center;justify-content:center;font-size:34px;margin-bottom:20px;box-shadow:0 8px 24px rgba(27,94,78,.3);}
.welcome h2{font-family:'DM Serif Display',serif;font-size:26px;color:var(--g);margin-bottom:8px;}
.welcome p{color:var(--tm);max-width:340px;line-height:1.6;font-size:14px;}

/* ── Patient header ── */
.ph{background:linear-gradient(135deg,var(--g),var(--g1));padding:16px 22px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;}
.ph h2{font-family:'DM Serif Display',serif;color:#fff;font-size:20px;}
.ph p{color:rgba(255,255,255,.52);font-size:11px;margin-top:2px;}

/* ── Consult bar ── */
.cb{background:var(--card);border-bottom:1px solid var(--bd);padding:8px 22px;display:flex;align-items:center;gap:10px;flex-shrink:0;flex-wrap:wrap;}
.cb-lbl{font-size:10px;color:var(--tm);font-weight:700;letter-spacing:.7px;text-transform:uppercase;}
.cb-sel{background:var(--bg);border:1px solid var(--bd);border-radius:7px;padding:5px 10px;font-family:inherit;font-size:12px;color:var(--t);outline:none;cursor:pointer;}
.cb-ct{font-size:11px;color:var(--tl);margin-left:auto;}

/* ── Tabs ── */
.tabs{background:var(--card);border-bottom:1px solid var(--bd);display:flex;padding:0 22px;overflow-x:auto;flex-shrink:0;}
.tabs::-webkit-scrollbar{height:0;}
.tab{padding:11px 14px;font-size:12px;font-weight:500;color:var(--tm);cursor:pointer;border-bottom:2px solid transparent;white-space:nowrap;transition:all .12s;}
.tab:hover{color:var(--g1);}
.tab.act{color:var(--g1);border-bottom-color:var(--g1);}

/* ── Content ── */
.ca{flex:1;overflow-y:auto;}
.fc{padding:20px;max-width:920px;}

/* ── Cards ── */
.sc{background:var(--card);border:1px solid var(--bd);border-radius:12px;padding:18px 22px;margin-bottom:14px;}
.st{font-family:'DM Serif Display',serif;font-size:15px;color:var(--g);margin-bottom:14px;padding-bottom:9px;border-bottom:1px solid var(--bd);display:flex;align-items:center;gap:7px;}

/* ── Grid ── */
.g2{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;}
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;}
.gf{grid-column:1/-1;}
.ff{display:flex;flex-direction:column;gap:4px;}
.fl{font-size:10px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;color:var(--tm);}

/* ── Inputs ── */
.fi{background:var(--bg);border:1px solid var(--bd);border-radius:7px;padding:7px 11px;font-family:inherit;font-size:13px;color:var(--t);outline:none;width:100%;transition:border-color .13s,background .13s;}
.fi:focus{border-color:var(--g2);background:#fff;}
.fi-ro{background:var(--g3)!important;border-color:var(--g2)!important;color:var(--g)!important;cursor:default;}
textarea.fi{resize:vertical;min-height:64px;line-height:1.5;}

/* ── Buttons ── */
.btn{padding:7px 16px;border-radius:8px;font-family:inherit;font-size:12px;font-weight:500;cursor:pointer;transition:all .13s;border:none;display:inline-flex;align-items:center;gap:5px;}
.btn-p{background:var(--g1);color:#fff;}
.btn-p:hover{background:var(--g2);}
.btn-s{background:transparent;color:var(--t);border:1px solid var(--bd2);}
.btn-s:hover{background:rgba(0,0,0,.04);}
.btn-a{background:var(--a);color:#fff;}
.btn-a:hover{background:#b3752e;}
.btn-d{background:var(--r);color:#fff;padding:4px 10px;font-size:11px;}
.btn-d:hover{background:#a93226;}

/* ── Calc result cards ── */
.cr{display:grid;grid-template-columns:repeat(auto-fill,minmax(148px,1fr));gap:10px;margin-top:4px;}
.cc{background:var(--bg);border:1px solid var(--bd);border-radius:10px;padding:12px 14px;}
.cc.hl{background:var(--g3);border-color:var(--g2);}
.cc-l{font-size:10px;text-transform:uppercase;letter-spacing:.5px;color:var(--tm);font-weight:700;margin-bottom:4px;}
.cc-v{font-family:'DM Serif Display',serif;font-size:22px;color:var(--g);}
.cc-v.a{color:var(--a);}
.cc-s{font-size:11px;color:var(--tl);margin-top:1px;}

/* ── Tags ── */
.tag{display:inline-block;padding:2px 9px;border-radius:20px;font-size:11px;font-weight:600;}
.tn{background:#d4edda;color:#155724;}
.tw{background:#fff3cd;color:#856404;}
.td{background:#f8d7da;color:#721c24;}
.ti{background:#d1ecf1;color:#0c5460;}
.tg{background:var(--g3);color:var(--g);}

/* ── Food frequency table ── */
.ft{width:100%;border-collapse:collapse;font-size:12px;}
.ft th{background:var(--g1);color:#fff;padding:7px 10px;text-align:left;font-weight:500;font-size:10px;letter-spacing:.4px;text-transform:uppercase;}
.ft td{padding:5px 10px;border-bottom:1px solid var(--bd);vertical-align:middle;}
.ft tr:hover td{background:rgba(0,0,0,.015);}
.ft-gh td{background:#EAF5F0;font-weight:700;color:var(--g);font-size:10px;text-transform:uppercase;letter-spacing:.5px;}
.fs{background:var(--bg);border:1px solid var(--bd);border-radius:5px;padding:3px 7px;font-family:inherit;font-size:11px;color:var(--t);outline:none;}

/* ── Recall table ── */
.rt{width:100%;border-collapse:collapse;font-size:12px;}
.rt th{background:var(--g);color:rgba(255,255,255,.7);padding:8px 12px;text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:.5px;}
.rt td{padding:7px 10px;border-bottom:1px solid var(--bd);vertical-align:top;}
.rt tr:last-child td{border:none;}
.rt-l{font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:.3px;color:var(--g);}

/* ── Macro bars ── */
.mb{margin-bottom:10px;}
.mb-row{display:flex;justify-content:space-between;font-size:11px;color:var(--tm);margin-bottom:3px;}
.mb-trk{background:var(--bd);border-radius:4px;height:8px;overflow:hidden;}
.mb-fl{height:100%;border-radius:4px;transition:width .6s;}
.mb-p{background:#2D9CDB;}
.mb-c{background:#27AE60;}
.mb-l{background:#F39C12;}

/* ── Modal ── */
.mo{position:fixed;inset:0;background:rgba(0,0,0,.42);display:flex;align-items:center;justify-content:center;z-index:200;backdrop-filter:blur(3px);}
.md{background:var(--card);border-radius:16px;padding:28px;width:480px;max-width:92vw;box-shadow:0 20px 60px rgba(0,0,0,.2);}
.md h3{font-family:'DM Serif Display',serif;font-size:20px;color:var(--g);margin-bottom:18px;}
.ma{display:flex;justify-content:flex-end;gap:8px;margin-top:20px;}

/* ── Misc ── */
.divider{border:none;border-top:1px solid var(--bd);margin:14px 0;}
.info-box{background:var(--a2);border:1px solid #f0c080;border-radius:8px;padding:10px 14px;font-size:12px;color:#6B4A1A;margin-bottom:14px;}
@media(max-width:700px){.g2,.g3,.g4{grid-template-columns:1fr;}.sb{width:200px;}}
`;

/* ═══════════════════════════ CALCULATIONS ═══════════════════════════ */
const bmiV   = (w,h) => w&&h?w/(h*h):null;
const bmiDA  = b => !b?'':b<18.5?'Bajo peso':b<25?'Normal':b<30?'Sobrepeso':b<35?'Obesidad I':b<40?'Obesidad II':'Obesidad III';
const bmiDE  = b => !b?'':b<23?'Bajo peso':b<28?'Normal':b<32?'Sobrepeso':'Obesidad';
const harrisFn = (w,h,a,g) => w&&h&&a?(g==='M'?88.362+13.397*w+4.799*h-5.677*a:447.593+9.247*w+3.098*h-4.33*a):null;
const mifflinFn= (w,h,a,g) => w&&h&&a?(g==='M'?10*w+6.25*h-5*a+5:10*w+6.25*h-5*a-161):null;
const faoFn = (w,a,g) => {
  if(!w||!a)return null;
  if(g==='M')return a<18?17.5*w+651:a<30?15.3*w+679:a<60?11.6*w+879:13.5*w+487;
  return a<18?12.2*w+746:a<30?14.7*w+496:a<60?8.7*w+829:10.5*w+596;
};
const lorenzM = h => h?(h*100-100-(h*100-150)/4):null;
const lorenzF = h => h?(h*100-100-(h*100-150)/2.5):null;
const maxAccW = h => h?24.9*h*h:null;
const adjW    = (ibw,w) => ibw&&w>ibw?ibw+0.32*(w-ibw):ibw;
const bodyDens= (b,t,s,sc,g) => {const sum=b+t+s+sc;if(sum<=0)return null;return g==='M'?1.1765-0.0744*Math.log10(sum):1.1567-0.0717*Math.log10(sum);};
const siriFn  = d => d?(4.95/d-4.5)*100:null;
const brozekFn= d => d?(4.57/d-4.142)*100:null;
const fatCls  = (f,g) => {if(!f)return'';if(g==='M')return f<5?'Déficit':f<11?'Bajo':f<22?'Aceptable (bajo)':f<26?'Aceptable (alto)':f<32?'Exceso':'Obesidad';return f<8?'Déficit':f<14?'Bajo':f<25?'Aceptable (bajo)':f<32?'Aceptable (alto)':f<38?'Exceso':'Obesidad';};
const iccV    = (w,h) => w&&h?w/h:null;
const iccCls  = (v,g) => !v?'':g==='M'?(v<0.95?'Bajo riesgo':v<1.0?'Riesgo moderado':'Alto riesgo'):(v<0.8?'Bajo riesgo':v<0.85?'Riesgo moderado':'Alto riesgo');
const abdObsFn= (w,g) => !w?'':(w>=(g==='M'?102:88)?'Obesidad abdominal':'Normal');
const calcAge = bd=>{if(!bd)return null;const t=new Date(),b=new Date(bd),a=t.getFullYear()-b.getFullYear();return a-(t.getMonth()<b.getMonth()||(t.getMonth()===b.getMonth()&&t.getDate()<b.getDate())?1:0);};
const uid     = ()=>Date.now().toString(36)+Math.random().toString(36).slice(2);
const fmtD    = d=>d?new Date(d+'T12:00').toLocaleDateString('es-CL',{day:'2-digit',month:'2-digit',year:'numeric'}):'';

/* ═══════════════════════════ CONSTANTS ═══════════════════════════ */
const PT={adulto:'Adulto/a',ninos:'Niño/a',embarazada:'Embarazada',puerpera:'Nodriza/Puérpera'};
const TABS={
  adulto:   ['Datos','Anam. General','Anam. Clínica','Anam. Alimentaria','Recordatorio 24h','Tend. Consumo','Antropometría','Diagnóstico'],
  ninos:    ['Datos','Anam. General','Anam. Clínica','Nacimiento','Anam. Alimentaria','Recordatorio 24h','Tend. Consumo','Antropometría','Diagnóstico'],
  embarazada:['Datos','Anam. General','Anam. Clínica','Gestación','Anam. Alimentaria','Recordatorio 24h','Tend. Consumo','Antropometría','Diagnóstico'],
  puerpera: ['Datos','Anam. General','Anam. Clínica','Lactancia','Anam. Alimentaria','Recordatorio 24h','Tend. Consumo','Antropometría','Diagnóstico'],
};
const TAB_MAP={
  adulto:   ['datos','gen','cli','alim','rec','tend','antrop','diag'],
  ninos:    ['datos','gen','cli','nac','alim','rec','tend','antrop','diag'],
  embarazada:['datos','gen','cli','gest','alim','rec','tend','antrop','diag'],
  puerpera: ['datos','gen','cli','lact','alim','rec','tend','antrop','diag'],
};
const FOOD_GRP=[
  {g:'Cereales',f:['Pan','Cereales / Avena','Fideos o Arroz','Papas o Puré']},
  {g:'Frutas',f:['Uva','Plátano','Ciruela']},
  {g:'Verduras',f:['Lechuga','Tomate','Zanahoria','Cebolla']},
  {g:'Legumbres',f:['Porotos','Lentejas','Garbanzos','Arvejas']},
  {g:'Lácteos',f:['Leche','Yogur','Quesillo','Queso']},
  {g:'Carnes / Pescados / Huevo',f:['Pollo/Pavo','Vacuno','Atún, Salmón u otros','Huevo','Cordero/Cerdo']},
  {g:'Productos Azucarados',f:['Azúcar','Productos de pastelería','Galletas, dulces, chocolates','Bebidas / Jugos']},
  {g:'Aceites y Grasas',f:['Aceite','Mantequilla/Margarina','Palta','Frutos secos','Aceitunas']},
  {g:'Aderezos',f:['Mayonesa, mostaza, otros']},
];
const FREQS=['Diario','5-6/semana','3-4/semana','1-2/semana','Quincenal','Mensual','Nunca'];
const MEALS=['Desayuno','Colación AM','Almuerzo','Once','Cena','Colación PM'];
const MKEYS=['desayuno','colacion1','almuerzo','once','cena','colacion2'];
const AF=[[1.2,'Sedentario (sin AF)'],[1.375,'Ligeramente activo (1-3 días/sem)'],[1.55,'Moderadamente activo (3-5 días/sem)'],[1.725,'Muy activo (6-7 días/sem)'],[1.9,'Extremadamente activo']];
const ECUAS=[['Fao','FAO/OMS (recomendada)'],['Harris','Harris-Benedict'],['Mifflin','Mifflin-St Jeor']];

/* ═══════════════════════════ INITIAL FORM DATA ═══════════════════════════ */
const initFD=()=>({
  motivoConsulta:'', ocupacion:'', escolaridad:'', grupoFamiliar:'', encargadoCompras:'',
  tabaco:'No', tabacoCant:'', alcohol:'No', alcoholCant:'', actFisica:'Sí', actDetalle:'', horasSueno:'',
  antPersonales:'', medicamentos:'', examenSangre:'', antQuirurgicos:'', antFamiliares:'',
  alergias:'', sintomatologia:'', digestion:'', cambiosPeso:'', masticar:'',
  prefAlimentaria:'', consumoAgua:'', alergiasAlim:'', nComidas:'',
  tipoAlimActual:'', nivelApetito:'', horariosLM:'',
  recalls:{desayuno:{t:'08:30',p:''},colacion1:{t:'11:00',p:''},almuerzo:{t:'13:00',p:''},once:{t:'17:00',p:''},cena:{t:'20:00',p:''},colacion2:{t:'',p:''}},
  freq:{},
  peso:'', talla:'', cintura:'', cadera:'',
  plBic:'', plTric:'', plSup:'', plSub:'',
  presion:'', pctGrasa:'', pctMusculo:'', grasaVisceral:'', edadBiol:'',
  ecuacion:'Fao', factorAF:'1.2',
  pctProt:22, pctCHO:50, pctLip:28,
  diagnostico:'', indicaciones:'', atencionPor:'', proximaConsulta:'',
  semanasGestNac:'', pesoNac:'', tallaNac:'', perCef:'', prematuro:'No', edadCorregida:'',
  semanasGest:'', histObstetrica:'', gestaciones:'', partos:'', abortos:'', tipoParto:'',
  patologiasEmb:'', lacManterior:'', deseaAmantar:'No', lmActual:'No',
  semanasPP:'', tipoLact:'', frecLact:'', durToma:'', congestion:'No', difLact:'',
});

/* ═══════════════════════════ STORAGE (localStorage) ═══════════════════════════ */
const STORAGE_KEY = 'nutriapp_patients_v1';
const loadPts = () => {
  try { const v = localStorage.getItem(STORAGE_KEY); return v ? JSON.parse(v) : []; }
  catch { return []; }
};
const savePts = (pts) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(pts)); } catch {}
};

/* ═══════════════════════════ HELPERS ═══════════════════════════ */
const F=({l,sp,children})=><div className={`ff${sp?' gf':''}`}><label className="fl">{l}</label>{children}</div>;
const I=({v,ov,ro,...p})=><input className={`fi${ro?' fi-ro':''}`} value={v??''} onChange={e=>!ro&&ov(e.target.value)} readOnly={!!ro} {...p}/>;
const Sel=({v,ov,opts,...p})=><select className="fi" value={v??''} onChange={e=>ov(e.target.value)} {...p}>{opts.map(([val,lab])=><option key={val} value={val}>{lab}</option>)}</select>;
const TA=({v,ov,rows=3,...p})=><textarea className="fi" value={v??''} onChange={e=>ov(e.target.value)} rows={rows} {...p}/>;
const Ro=({children})=><span className="fi fi-ro" style={{display:'block'}}>{children||'—'}</span>;
const tagCls=d=>{if(!d)return'ti';const l=d.toLowerCase();if(l.includes('normal')||l.includes('bajo riesgo'))return'tn';if(l.includes('sobrepeso')||l.includes('aceptable')||l.includes('moderado'))return'tw';if(l.includes('bajo')||l.includes('déficit')||l.includes('insuf'))return'ti';return'td';};
const Tag=({text})=><span className={`tag ${tagCls(text)}`}>{text}</span>;
const MacroBar=({label,pctV,cls,kcal,gr,grkg})=>(
  <div className="mb">
    <div className="mb-row"><span>{label} — <strong>{pctV||0}%</strong></span><span style={{gap:8,display:'flex'}}>{kcal?<>{Math.round(kcal)} kcal</>:null}{gr?<>· {Math.round(gr)} g</>:null}{grkg?<>· {grkg.toFixed(1)} g/kg</>:null}</span></div>
    <div className="mb-trk"><div className={`mb-fl ${cls}`} style={{width:`${Math.min(pctV||0,100)}%`}}/></div>
  </div>
);

/* ═══════════════════════════ MAIN APP ═══════════════════════════ */
export default function App() {
  const [pts,setPtsState]=useState(loadPts);
  const [pid,setPid]=useState(null);
  const [cid,setCid]=useState(null);
  const [tab,setTab]=useState(0);
  const [srch,setSrch]=useState('');
  const [npMod,setNpMod]=useState(false);
  const [ncMod,setNcMod]=useState(false);
  const [npd,setNpd]=useState({name:'',rut:'',gender:'F',birthDate:'',phone:'',email:'',patientType:'adulto'});

  const setPts = (updater) => {
    setPtsState(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      savePts(next);
      return next;
    });
  };

  const selP=pts.find(p=>p.id===pid);
  const selC=selP?.consultations?.find(c=>c.id===cid);
  const filtered=pts.filter(p=>p.name.toLowerCase().includes(srch.toLowerCase())||(p.rut||'').includes(srch));

  const upFD=(k,v)=>setPts(prev=>prev.map(p=>{
    if(p.id!==pid)return p;
    return{...p,consultations:p.consultations.map(c=>c.id!==cid?c:{...c,formData:{...c.formData,[k]:v}})};
  }));
  const upNN=(path,v)=>setPts(prev=>prev.map(p=>{
    if(p.id!==pid)return p;
    return{...p,consultations:p.consultations.map(c=>{
      if(c.id!==cid)return c;
      const fd={...c.formData};
      const ps=path.split('.');
      if(ps.length===1)fd[ps[0]]=v;
      else if(ps.length===2)fd[ps[0]]={...fd[ps[0]],[ps[1]]:v};
      else if(ps.length===3)fd[ps[0]]={...fd[ps[0]],[ps[1]]:{...fd[ps[0]][ps[1]],[ps[2]]:v}};
      return{...c,formData:fd};
    })};
  }));

  const createPt=()=>{
    if(!npd.name.trim())return;
    const c={id:uid(),date:new Date().toISOString().split('T')[0],formData:initFD(),createdAt:new Date().toISOString()};
    const p={id:uid(),...npd,consultations:[c],createdAt:new Date().toISOString()};
    setPts(prev=>[p,...prev]);setPid(p.id);setCid(c.id);setTab(0);setNpMod(false);
    setNpd({name:'',rut:'',gender:'F',birthDate:'',phone:'',email:'',patientType:'adulto'});
  };
  const createC=()=>{
    const c={id:uid(),date:new Date().toISOString().split('T')[0],formData:initFD(),createdAt:new Date().toISOString()};
    setPts(prev=>prev.map(p=>p.id!==pid?p:{...p,consultations:[c,...p.consultations]}));
    setCid(c.id);setTab(0);setNcMod(false);
  };
  const delC=()=>{
    if(!confirm('¿Eliminar esta consulta? Esta acción no se puede deshacer.'))return;
    const rem=selP.consultations.filter(c=>c.id!==cid);
    setPts(prev=>prev.map(p=>p.id!==pid?p:{...p,consultations:rem}));
    setCid(rem[0]?.id||null);
  };

  const getCalcs=()=>{
    if(!selP||!selC?.formData)return{};
    const fd=selC.formData;
    const w=parseFloat(fd.peso),h=parseFloat(fd.talla),age=calcAge(selP.birthDate),g=selP.gender;
    const bmi=bmiV(w,h),elderly=age>=65;
    const bmiD=elderly?bmiDE(bmi):bmiDA(bmi);
    const H=harrisFn(w,h*100,age,g),M=mifflinFn(w,h*100,age,g),Fa=faoFn(w,age,g);
    const tmb=fd.ecuacion==='Harris'?H:fd.ecuacion==='Mifflin'?M:Fa;
    const af=parseFloat(fd.factorAF)||1.2,totReq=tmb?tmb*af:null;
    const ibw=g==='M'?lorenzM(h):lorenzF(h),maxW=maxAccW(h),adjWt=ibw&&w?adjW(ibw,w):null;
    const b=parseFloat(fd.plBic),t=parseFloat(fd.plTric),s=parseFloat(fd.plSup),sc=parseFloat(fd.plSub);
    const dens=b&&t&&s&&sc?bodyDens(b,t,s,sc,g):null;
    const fatS=dens?siriFn(dens):null,fatB=dens?brozekFn(dens):null;
    const wst=parseFloat(fd.cintura),hip=parseFloat(fd.cadera),icc=iccV(wst,hip);
    const pP=(parseFloat(fd.pctProt)||22)/100,pC=(parseFloat(fd.pctCHO)||50)/100,pL=(parseFloat(fd.pctLip)||28)/100;
    const req=totReq||0;
    return{bmi,bmiD,H,M,Fa,tmb,totReq,ibw,maxW,adjWt,dens,fatS,fatB,fatCls:fatCls(fatS,g),
      icc,iccCls:iccCls(icc,g),abdObs:abdObsFn(wst,g),
      protKcal:req*pP,choKcal:req*pC,lipKcal:req*pL,
      protGr:req*pP/4,choGr:req*pC/4,lipGr:req*pL/9,
      protGrKg:w?req*pP/4/w:null,choGrKg:w?req*pC/4/w:null,lipGrKg:w?req*pL/9/w:null};
  };

  const calcs=getCalcs();
  const tabs=selP?TABS[selP.patientType]:[];

  return(<><style>{CSS}</style>
  <div className="app">
    <div className="sb">
      <div className="sb-hd"><div className="logo">Nutri<em>Ficha</em></div><div className="logo-sub">Sistema Nutricional · Chile</div></div>
      <div className="sb-srch"><input placeholder="Buscar paciente…" value={srch} onChange={e=>setSrch(e.target.value)}/></div>
      <div className="sb-list">
        {filtered.map(p=>(
          <div key={p.id} className={`pi ${pid===p.id?'act':''}`} onClick={()=>{setPid(p.id);setCid(p.consultations[0]?.id||null);setTab(0);}}>
            <div className="pi-nm">{p.name}</div>
            <div className="pi-rt">{p.rut||'Sin RUT'}{p.birthDate?` · ${calcAge(p.birthDate)} años`:''}</div>
            <div className="pi-bd">{PT[p.patientType]}</div>
          </div>
        ))}
        {filtered.length===0&&<div style={{color:'rgba(255,255,255,.22)',fontSize:11,padding:'14px',textAlign:'center'}}>{pts.length===0?'Sin pacientes aún':'Sin resultados'}</div>}
      </div>
      <button className="sb-new" onClick={()=>setNpMod(true)}>+ Nuevo Paciente</button>
    </div>

    <div className="main">
      {!selP?(
        <div className="ca">
          <div className="welcome">
            <div className="w-ico">🥗</div>
            <h2>NutriApp Chile</h2>
            <p>Selecciona un paciente del panel lateral o crea uno nuevo para iniciar una evaluación nutricional completa.</p>
            <div style={{marginTop:20}}><button className="btn btn-p" onClick={()=>setNpMod(true)}>+ Nuevo Paciente</button></div>
          </div>
        </div>
      ):(
        <>
        <div className="ph">
          <div><h2>{selP.name}</h2><p>{selP.rut||'Sin RUT'} · {selP.gender==='M'?'Masculino':'Femenino'}{selP.birthDate?` · ${calcAge(selP.birthDate)} años`:''} · {PT[selP.patientType]}</p></div>
          <button className="btn btn-a" onClick={()=>setNcMod(true)}>+ Nueva Consulta</button>
        </div>
        <div className="cb">
          <span className="cb-lbl">Consulta:</span>
          <select className="cb-sel" value={cid||''} onChange={e=>{setCid(e.target.value);setTab(0);}}>
            {selP.consultations.map((c,i)=><option key={c.id} value={c.id}>{fmtD(c.date)}{i===0?' ★ más reciente':''}</option>)}
          </select>
          {selP.consultations.length>1&&cid!==selP.consultations[0].id&&(
            <button className="btn btn-d" onClick={delC}>Eliminar</button>
          )}
          <span className="cb-ct">{selP.consultations.length} consulta{selP.consultations.length!==1?'s':''}</span>
        </div>
        {selC&&<>
          <div className="tabs">{tabs.map((t,i)=><div key={i} className={`tab ${tab===i?'act':''}`} onClick={()=>setTab(i)}>{t}</div>)}</div>
          <div className="ca">
            <TabContent section={TAB_MAP[selP.patientType]?.[tab]} fd={selC.formData} up={upFD} unn={upNN} calcs={calcs} patient={selP}/>
          </div>
        </>}
        </>
      )}
    </div>

    {npMod&&<div className="mo" onClick={()=>setNpMod(false)}><div className="md" onClick={e=>e.stopPropagation()}>
      <h3>Nuevo Paciente</h3>
      <div className="g2" style={{gap:12}}>
        <F l="Nombre completo *" sp><I v={npd.name} ov={v=>setNpd(p=>({...p,name:v}))}/></F>
        <F l="RUT"><I v={npd.rut} ov={v=>setNpd(p=>({...p,rut:v}))} placeholder="12.345.678-9"/></F>
        <F l="Fecha de nacimiento"><I type="date" v={npd.birthDate} ov={v=>setNpd(p=>({...p,birthDate:v}))}/></F>
        <F l="Sexo"><Sel v={npd.gender} ov={v=>setNpd(p=>({...p,gender:v}))} opts={[['F','Femenino'],['M','Masculino']]}/></F>
        <F l="Tipo de paciente" sp><Sel v={npd.patientType} ov={v=>setNpd(p=>({...p,patientType:v}))} opts={Object.entries(PT)}/></F>
        <F l="Teléfono"><I v={npd.phone} ov={v=>setNpd(p=>({...p,phone:v}))}/></F>
        <F l="Correo electrónico"><I type="email" v={npd.email} ov={v=>setNpd(p=>({...p,email:v}))}/></F>
      </div>
      <div className="ma">
        <button className="btn btn-s" onClick={()=>setNpMod(false)}>Cancelar</button>
        <button className="btn btn-p" onClick={createPt} disabled={!npd.name.trim()}>Crear Paciente</button>
      </div>
    </div></div>}

    {ncMod&&<div className="mo" onClick={()=>setNcMod(false)}><div className="md" onClick={e=>e.stopPropagation()}>
      <h3>Nueva Consulta</h3>
      <p style={{color:'var(--tm)',fontSize:13,lineHeight:1.6}}>Se creará una nueva ficha de evaluación para <strong>{selP?.name}</strong>. La consulta anterior quedará guardada en el historial.</p>
      <div className="ma"><button className="btn btn-s" onClick={()=>setNcMod(false)}>Cancelar</button><button className="btn btn-p" onClick={createC}>Crear Consulta</button></div>
    </div></div>}
  </div>
  </>);
}

/* ═══════════════════════════ TAB CONTENT ═══════════════════════════ */
function TabContent({section,fd,up,unn,calcs,patient}) {
  switch(section){
    case 'datos':   return <TabDatos    fd={fd} up={up} patient={patient}/>;
    case 'gen':     return <TabGen      fd={fd} up={up}/>;
    case 'cli':     return <TabCli      fd={fd} up={up} ptype={patient.patientType}/>;
    case 'nac':     return <TabNac      fd={fd} up={up}/>;
    case 'gest':    return <TabGest     fd={fd} up={up}/>;
    case 'lact':    return <TabLact     fd={fd} up={up}/>;
    case 'alim':    return <TabAlim     fd={fd} up={up} ptype={patient.patientType}/>;
    case 'rec':     return <TabRec      fd={fd} unn={unn}/>;
    case 'tend':    return <TabTend     fd={fd} up={up}/>;
    case 'antrop':  return <TabAntrop   fd={fd} up={up} calcs={calcs} patient={patient}/>;
    case 'diag':    return <TabDiag     fd={fd} up={up} calcs={calcs}/>;
    default: return null;
  }
}

function TabDatos({fd,up,patient}){return(
  <div className="fc">
    <div className="sc">
      <div className="st">📋 Identificación del Paciente</div>
      <div className="g2">
        <F l="Nombre"><Ro>{patient.name}</Ro></F>
        <F l="RUT"><Ro>{patient.rut}</Ro></F>
        <F l="Sexo"><Ro>{patient.gender==='M'?'Masculino':'Femenino'}</Ro></F>
        <F l="Fecha de nacimiento"><Ro>{fmtD(patient.birthDate)}</Ro></F>
        <F l="Edad"><Ro>{patient.birthDate?`${calcAge(patient.birthDate)} años`:''}</Ro></F>
        <F l="Teléfono"><Ro>{patient.phone}</Ro></F>
        <F l="Correo electrónico" sp><Ro>{patient.email}</Ro></F>
      </div>
    </div>
    <div className="sc">
      <div className="st">🎯 Motivo de Consulta</div>
      <F l="Describa el motivo de consulta" sp><TA v={fd.motivoConsulta} ov={v=>up('motivoConsulta',v)} rows={4}/></F>
    </div>
  </div>
);}

function TabGen({fd,up}){return(
  <div className="fc">
    <div className="sc">
      <div className="st">🏠 Anamnesis General</div>
      <div className="g2">
        <F l="Ocupación / Horarios de trabajo"><I v={fd.ocupacion} ov={v=>up('ocupacion',v)}/></F>
        <F l="Nivel de escolaridad"><I v={fd.escolaridad} ov={v=>up('escolaridad',v)}/></F>
        <F l="Grupo familiar"><I v={fd.grupoFamiliar} ov={v=>up('grupoFamiliar',v)}/></F>
        <F l="Encargado/a de compras y cocina"><I v={fd.encargadoCompras} ov={v=>up('encargadoCompras',v)}/></F>
      </div>
    </div>
    <div className="sc">
      <div className="st">🌿 Hábitos</div>
      <div className="g2">
        <F l="Tabaco">
          <div style={{display:'flex',gap:8}}>
            <Sel v={fd.tabaco} ov={v=>up('tabaco',v)} opts={[['No','No'],['Sí','Sí'],['Ex-fumador','Ex-fumador']]} style={{width:130}}/>
            {fd.tabaco!=='No'&&<I v={fd.tabacoCant} ov={v=>up('tabacoCant',v)} placeholder="Frecuencia / cantidad"/>}
          </div>
        </F>
        <F l="Alcohol">
          <div style={{display:'flex',gap:8}}>
            <Sel v={fd.alcohol} ov={v=>up('alcohol',v)} opts={[['No','No'],['Sí','Sí']]} style={{width:80}}/>
            {fd.alcohol==='Sí'&&<I v={fd.alcoholCant} ov={v=>up('alcoholCant',v)} placeholder="Frecuencia / cantidad"/>}
          </div>
        </F>
        <F l="Actividad física">
          <div style={{display:'flex',gap:8}}>
            <Sel v={fd.actFisica} ov={v=>up('actFisica',v)} opts={[['Sí','Sí'],['No','No']]} style={{width:80}}/>
            {fd.actFisica==='Sí'&&<I v={fd.actDetalle} ov={v=>up('actDetalle',v)} placeholder="Tipo y frecuencia"/>}
          </div>
        </F>
        <F l="Horas de sueño / noche"><I v={fd.horasSueno} ov={v=>up('horasSueno',v)} placeholder="Ej: 8 horas"/></F>
      </div>
    </div>
  </div>
);}

function TabCli({fd,up,ptype}){return(
  <div className="fc">
    <div className="sc">
      <div className="st">🏥 Anamnesis Clínica</div>
      <div className="g2">
        <F l="Antecedentes mórbidos personales" sp><TA v={fd.antPersonales} ov={v=>up('antPersonales',v)}/></F>
        <F l="Medicamentos y/o suplementos" sp><TA v={fd.medicamentos} ov={v=>up('medicamentos',v)}/></F>
        <F l="Examen de sangre"><TA v={fd.examenSangre} ov={v=>up('examenSangre',v)}/></F>
        <F l="Antecedentes quirúrgicos"><TA v={fd.antQuirurgicos} ov={v=>up('antQuirurgicos',v)}/></F>
        <F l="Antecedentes mórbidos familiares" sp><TA v={fd.antFamiliares} ov={v=>up('antFamiliares',v)}/></F>
        <F l="Alergias / Intolerancias"><I v={fd.alergias} ov={v=>up('alergias',v)}/></F>
        <F l="Sintomatología y/o signos físicos"><TA v={fd.sintomatologia} ov={v=>up('sintomatologia',v)}/></F>
        <F l="Digestión"><TA v={fd.digestion} ov={v=>up('digestion',v)}/></F>
        {(ptype==='adulto'||ptype==='embarazada'||ptype==='puerpera')&&<>
          <F l="Cambios de peso"><TA v={fd.cambiosPeso} ov={v=>up('cambiosPeso',v)}/></F>
          <F l="Problemas para masticar o deglutir"><I v={fd.masticar} ov={v=>up('masticar',v)}/></F>
        </>}
      </div>
    </div>
  </div>
);}

function TabNac({fd,up}){return(
  <div className="fc">
    <div className="sc">
      <div className="st">👶 Antecedentes de Nacimiento</div>
      <div className="g3">
        <F l="Semanas gestación al nacer"><I v={fd.semanasGestNac} ov={v=>up('semanasGestNac',v)} type="number" placeholder="Ej: 39"/></F>
        <F l="Peso de nacimiento (kg)"><I v={fd.pesoNac} ov={v=>up('pesoNac',v)} type="number" step="0.01" placeholder="Ej: 3.20"/></F>
        <F l="Talla de nacimiento (cm)"><I v={fd.tallaNac} ov={v=>up('tallaNac',v)} type="number" step="0.1" placeholder="Ej: 50"/></F>
        <F l="Prematuro"><Sel v={fd.prematuro} ov={v=>up('prematuro',v)} opts={[['No','No'],['Sí','Sí']]}/></F>
        {fd.prematuro==='Sí'&&<F l="Edad corregida"><I v={fd.edadCorregida} ov={v=>up('edadCorregida',v)} placeholder="Ej: 3 meses"/></F>}
      </div>
    </div>
    <div className="sc">
      <div className="st">🍼 Evaluación Lactancia Materna</div>
      <div className="g2">
        {['Pechos y pezones sanos','Congestión mamaria','Grietas/cicatrices','Postura adecuada','Boca del lactante cubre areola','Acople correcto (nariz y mentón)','Sonido de deglución audible'].map(item=>{const k='lm_'+item.replace(/[^a-zA-Z]/g,'');return(
          <F key={item} l={item}><Sel v={fd[k]} ov={v=>up(k,v)} opts={[['','—'],['Adecuado','Adecuado'],['Inadecuado','Inadecuado'],['N/A','N/A']]}/></F>
        );})}
      </div>
    </div>
  </div>
);}

function TabGest({fd,up}){return(
  <div className="fc">
    <div className="sc">
      <div className="st">🤰 Antecedentes del Embarazo</div>
      <div className="g3">
        <F l="Semanas de gestación actuales"><I v={fd.semanasGest} ov={v=>up('semanasGest',v)} type="number" placeholder="Ej: 28"/></F>
        <F l="Historia obstétrica"><I v={fd.histObstetrica} ov={v=>up('histObstetrica',v)} placeholder="Primigesta / multípara"/></F>
        <F l="Tipo de parto esperado"><Sel v={fd.tipoParto} ov={v=>up('tipoParto',v)} opts={[['','—'],['Normal','Normal (vaginal)'],['Cesarea','Cesárea'],['No definido','No definido']]}/></F>
        <F l="N° Gestaciones"><I v={fd.gestaciones} ov={v=>up('gestaciones',v)} type="number"/></F>
        <F l="N° Partos"><I v={fd.partos} ov={v=>up('partos',v)} type="number"/></F>
        <F l="N° Abortos"><I v={fd.abortos} ov={v=>up('abortos',v)} type="number"/></F>
      </div>
    </div>
    <div className="sc">
      <div className="st">⚕️ Patologías y Lactancia</div>
      <div className="g2">
        <F l="Patologías / Sintomatología" sp><TA v={fd.patologiasEmb} ov={v=>up('patologiasEmb',v)} placeholder="Diabetes G., Preeclampsia, Anemia, Constipación, Náuseas…"/></F>
        <F l="Lactancia materna anterior"><Sel v={fd.lacManterior} ov={v=>up('lacManterior',v)} opts={[['','—'],['Sí, exitosa','Sí, exitosa'],['Sí, dificultades','Sí, con dificultades'],['No','No']]}/></F>
        <F l="¿Desea amamantar?"><Sel v={fd.deseaAmantar} ov={v=>up('deseaAmantar',v)} opts={[['Sí','Sí'],['No','No'],['No sabe','No sabe']]}/></F>
        <F l="LM actualmente"><Sel v={fd.lmActual} ov={v=>up('lmActual',v)} opts={[['No','No'],['Sí','Sí']]}/></F>
      </div>
    </div>
  </div>
);}

function TabLact({fd,up}){return(
  <div className="fc">
    <div className="sc">
      <div className="st">🤱 Datos de Lactancia</div>
      <div className="g2">
        <F l="Semanas posparto"><I v={fd.semanasPP} ov={v=>up('semanasPP',v)} type="number"/></F>
        <F l="Tipo de lactancia"><Sel v={fd.tipoLact} ov={v=>up('tipoLact',v)} opts={[['','—'],['Exclusiva','LM exclusiva'],['Mixta','LM mixta'],['Artificial','Lactancia artificial']]}/></F>
        <F l="Frecuencia de amamantamiento"><I v={fd.frecLact} ov={v=>up('frecLact',v)} placeholder="Ej: 8 veces/día"/></F>
        <F l="Duración de cada toma (min)"><I v={fd.durToma} ov={v=>up('durToma',v)} type="number"/></F>
        <F l="Congestión mamaria"><Sel v={fd.congestion} ov={v=>up('congestion',v)} opts={[['No','No'],['Sí','Sí']]}/></F>
        <F l="Dificultades con la lactancia" sp><TA v={fd.difLact} ov={v=>up('difLact',v)}/></F>
      </div>
    </div>
  </div>
);}

function TabAlim({fd,up,ptype}){return(
  <div className="fc">
    <div className="sc">
      <div className="st">🥦 Anamnesis Alimentaria</div>
      <div className="g2">
        <F l="Preferencias alimentarias" sp><I v={fd.prefAlimentaria} ov={v=>up('prefAlimentaria',v)} placeholder="Vegano, vegetariano, omnívoro, etc."/></F>
        <F l="Consumo de agua / día"><I v={fd.consumoAgua} ov={v=>up('consumoAgua',v)} placeholder="Ej: 2 litros"/></F>
        <F l="N° de comidas al día"><I v={fd.nComidas} ov={v=>up('nComidas',v)} type="number" placeholder="Ej: 4"/></F>
        <F l="Alergias / intolerancias alimentarias"><I v={fd.alergiasAlim} ov={v=>up('alergiasAlim',v)}/></F>
        {ptype==='ninos'&&<>
          <F l="Tipo de alimentación actual" sp><I v={fd.tipoAlimActual} ov={v=>up('tipoAlimActual',v)} placeholder="LM, fórmula, alimentación complementaria…"/></F>
          <F l="Nivel de apetito"><Sel v={fd.nivelApetito} ov={v=>up('nivelApetito',v)} opts={[['','—'],['Bueno','Bueno'],['Regular','Regular'],['Malo','Malo'],['Selectivo','Selectivo']]}/></F>
          <F l="Horarios y N° LM o fórmula" sp><TA v={fd.horariosLM} ov={v=>up('horariosLM',v)}/></F>
        </>}
      </div>
    </div>
  </div>
);}

function TabRec({fd,unn}){return(
  <div className="fc">
    <div className="sc">
      <div className="st">⏰ Recordatorio de 24 Horas</div>
      <table className="rt">
        <thead><tr><th style={{width:'15%'}}>Servicio</th><th style={{width:'11%'}}>Horario</th><th>Preparación y alimentos consumidos</th></tr></thead>
        <tbody>{MKEYS.map((k,i)=>(
          <tr key={k}>
            <td><span className="rt-l">{MEALS[i]}</span></td>
            <td><input className="fi" type="time" value={fd.recalls?.[k]?.t||''} onChange={e=>unn(`recalls.${k}.t`,e.target.value)} style={{padding:'5px 8px',fontSize:12}}/></td>
            <td><textarea className="fi" value={fd.recalls?.[k]?.p||''} onChange={e=>unn(`recalls.${k}.p`,e.target.value)} rows={2} style={{minHeight:42}}/></td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  </div>
);}

function TabTend({fd,up}){
  const gF=(f)=>fd.freq?.[f]?.f||'';
  const gC=(f)=>fd.freq?.[f]?.c||'';
  const gO=(f)=>fd.freq?.[f]?.o||'';
  const set=(food,field,val)=>up('freq',{...fd.freq,[food]:{...(fd.freq?.[food]||{}),[field]:val}});
  return(
  <div className="fc">
    <div className="sc">
      <div className="st">📊 Encuesta de Tendencia de Consumo</div>
      <table className="ft">
        <thead><tr><th style={{width:'18%'}}>Grupo</th><th style={{width:'22%'}}>Alimento</th><th style={{width:'18%'}}>Frecuencia</th><th style={{width:'13%'}}>Cantidad</th><th>Observaciones</th></tr></thead>
        <tbody>{FOOD_GRP.map(({g,f})=>[
          <tr key={g} className="ft-gh"><td colSpan={5}>{g}</td></tr>,
          ...f.map(food=><tr key={food}>
            <td/>
            <td style={{fontWeight:500,color:'var(--t)'}}>{food}</td>
            <td><select className="fs" value={gF(food)} onChange={e=>set(food,'f',e.target.value)}><option value="">—</option>{FREQS.map(o=><option key={o} value={o}>{o}</option>)}</select></td>
            <td><input className="fs" style={{width:80}} value={gC(food)} onChange={e=>set(food,'c',e.target.value)}/></td>
            <td><input className="fs" style={{width:'100%'}} value={gO(food)} onChange={e=>set(food,'o',e.target.value)}/></td>
          </tr>)
        ])}</tbody>
      </table>
    </div>
  </div>
);}

function TabAntrop({fd,up,calcs,patient}){
  const {bmi,bmiD,H,M,Fa,tmb,totReq,ibw,maxW,adjWt,dens,fatS,fatB,fatCls,icc,iccCls,abdObs}=calcs;
  return(
  <div className="fc">
    <div className="sc">
      <div className="st">📏 Mediciones Antropométricas</div>
      <div className="g4">
        <F l="Peso (kg)"><I v={fd.peso} ov={v=>up('peso',v)} type="number" step="0.1" placeholder="kg"/></F>
        <F l="Talla (m)"><I v={fd.talla} ov={v=>up('talla',v)} type="number" step="0.01" placeholder="1.65"/></F>
        <F l="Circ. cintura (cm)"><I v={fd.cintura} ov={v=>up('cintura',v)} type="number" step="0.1"/></F>
        <F l="Circ. cadera (cm)"><I v={fd.cadera} ov={v=>up('cadera',v)} type="number" step="0.1"/></F>
        <F l="Presión arterial"><I v={fd.presion} ov={v=>up('presion',v)} placeholder="120/80"/></F>
        <F l="% Grasa (bioimpedancia)"><I v={fd.pctGrasa} ov={v=>up('pctGrasa',v)} type="number" step="0.1"/></F>
        <F l="% Músculo"><I v={fd.pctMusculo} ov={v=>up('pctMusculo',v)} type="number" step="0.1"/></F>
        <F l="Grasa visceral"><I v={fd.grasaVisceral} ov={v=>up('grasaVisceral',v)} type="number"/></F>
      </div>
    </div>
    {bmi&&<div className="sc">
      <div className="st">📊 Resultados IMC y Composición Corporal</div>
      <div className="cr">
        <div className="cc hl"><div className="cc-l">IMC</div><div className="cc-v a">{bmi.toFixed(1)}</div><div className="cc-s">kg/m²</div></div>
        <div className="cc"><div className="cc-l">Diagnóstico</div><div style={{marginTop:6}}><Tag text={bmiD}/></div></div>
        {ibw&&<div className="cc"><div className="cc-l">Peso ideal</div><div className="cc-v">{ibw.toFixed(1)}</div><div className="cc-s">kg · Lorentz</div></div>}
        {maxW&&<div className="cc"><div className="cc-l">Peso máx. aceptable</div><div className="cc-v">{maxW.toFixed(1)}</div><div className="cc-s">kg · IMC 24.9</div></div>}
        {adjWt&&bmi>=30&&<div className="cc"><div className="cc-l">Peso ajustado</div><div className="cc-v">{adjWt.toFixed(1)}</div><div className="cc-s">kg · para cálculo kcal</div></div>}
        {icc&&<div className="cc"><div className="cc-l">ICC</div><div className="cc-v">{icc.toFixed(2)}</div><div className="cc-s"><Tag text={iccCls}/></div></div>}
        {abdObs&&<div className="cc"><div className="cc-l">Obesidad abdominal</div><div style={{marginTop:6}}><Tag text={abdObs}/></div></div>}
      </div>
    </div>}
    <div className="sc">
      <div className="st">📐 Pliegues Cutáneos (Durnin-Womersley)</div>
      <div className="g4">
        <F l="Bicipital (mm)"><I v={fd.plBic} ov={v=>up('plBic',v)} type="number" step="0.1"/></F>
        <F l="Tricipital (mm)"><I v={fd.plTric} ov={v=>up('plTric',v)} type="number" step="0.1"/></F>
        <F l="Suprailíaco (mm)"><I v={fd.plSup} ov={v=>up('plSup',v)} type="number" step="0.1"/></F>
        <F l="Subescapular (mm)"><I v={fd.plSub} ov={v=>up('plSub',v)} type="number" step="0.1"/></F>
      </div>
      {fatS!==null&&<div className="cr" style={{marginTop:12}}>
        <div className="cc"><div className="cc-l">Densidad corporal</div><div className="cc-v">{dens?.toFixed(4)}</div></div>
        <div className="cc hl"><div className="cc-l">% Grasa (Siri)</div><div className="cc-v a">{fatS?.toFixed(1)}</div><div className="cc-s">%</div></div>
        <div className="cc"><div className="cc-l">% Grasa (Brozek)</div><div className="cc-v">{fatB?.toFixed(1)}</div><div className="cc-s">%</div></div>
        <div className="cc"><div className="cc-l">Clasificación</div><div style={{marginTop:6}}><Tag text={fatCls}/></div></div>
      </div>}
    </div>
    <div className="sc">
      <div className="st">⚡ Requerimiento Energético</div>
      <div className="g3" style={{marginBottom:12}}>
        <F l="Ecuación TMB"><Sel v={fd.ecuacion} ov={v=>up('ecuacion',v)} opts={ECUAS}/></F>
        <F l="Factor de actividad física"><Sel v={fd.factorAF} ov={v=>up('factorAF',v)} opts={AF.map(([v,l])=>[String(v),l])}/></F>
        <F l="Requerimiento calculado"><Ro>{totReq?`${Math.round(totReq)} kcal/día`:''}</Ro></F>
      </div>
      <div className="cr">
        <div className="cc"><div className="cc-l">Harris-Benedict</div><div className="cc-v">{H?Math.round(H):'—'}</div><div className="cc-s">kcal/día (TMB)</div></div>
        <div className="cc"><div className="cc-l">Mifflin-St Jeor</div><div className="cc-v">{M?Math.round(M):'—'}</div><div className="cc-s">kcal/día (TMB)</div></div>
        <div className="cc"><div className="cc-l">FAO / OMS</div><div className="cc-v">{Fa?Math.round(Fa):'—'}</div><div className="cc-s">kcal/día (TMB)</div></div>
        <div className="cc hl"><div className="cc-l">Requerimiento total</div><div className="cc-v a">{totReq?Math.round(totReq):'—'}</div><div className="cc-s">kcal/día ({fd.ecuacion} × {fd.factorAF})</div></div>
      </div>
    </div>
  </div>
);}

function TabDiag({fd,up,calcs}){
  const {bmiD,totReq,fatCls,iccCls,abdObs,protKcal,choKcal,lipKcal,protGr,choGr,lipGr,protGrKg,choGrKg,lipGrKg}=calcs;
  const pp=parseFloat(fd.pctProt)||22,pc=parseFloat(fd.pctCHO)||50,pl=parseFloat(fd.pctLip)||28;
  return(
  <div className="fc">
    {totReq&&<div className="sc">
      <div className="st">⚖️ Distribución de Macronutrientes</div>
      <div className="info-box">Ingrese los porcentajes como números enteros. La suma debe ser 100%.</div>
      <div className="g3" style={{marginBottom:16}}>
        <F l="% Proteínas"><I v={fd.pctProt} ov={v=>up('pctProt',parseFloat(v)||22)} type="number" step="1" min="0" max="100" placeholder="22"/></F>
        <F l="% Carbohidratos"><I v={fd.pctCHO} ov={v=>up('pctCHO',parseFloat(v)||50)} type="number" step="1" min="0" max="100" placeholder="50"/></F>
        <F l="% Lípidos"><I v={fd.pctLip} ov={v=>up('pctLip',parseFloat(v)||28)} type="number" step="1" min="0" max="100" placeholder="28"/></F>
      </div>
      <MacroBar label="Proteínas" pctV={pp} cls="mb-p" kcal={protKcal} gr={protGr} grkg={protGrKg}/>
      <MacroBar label="Carbohidratos" pctV={pc} cls="mb-c" kcal={choKcal} gr={choGr} grkg={choGrKg}/>
      <MacroBar label="Lípidos" pctV={pl} cls="mb-l" kcal={lipKcal} gr={lipGr} grkg={lipGrKg}/>
      <div className="cr" style={{marginTop:14}}>
        <div className="cc hl"><div className="cc-l">Energía total</div><div className="cc-v a">{Math.round(totReq||0)}</div><div className="cc-s">kcal/día</div></div>
        <div className="cc"><div className="cc-l">Proteínas</div><div className="cc-v">{Math.round(protGr||0)} g</div><div className="cc-s">{protGrKg?.toFixed(1)} g/kg/día</div></div>
        <div className="cc"><div className="cc-l">Carbohidratos</div><div className="cc-v">{Math.round(choGr||0)} g</div><div className="cc-s">{choGrKg?.toFixed(1)} g/kg/día</div></div>
        <div className="cc"><div className="cc-l">Lípidos</div><div className="cc-v">{Math.round(lipGr||0)} g</div><div className="cc-s">{lipGrKg?.toFixed(1)} g/kg/día</div></div>
      </div>
    </div>}
    <div className="sc">
      <div className="st">🩺 Diagnóstico Nutricional Integral</div>
      {(bmiD||fatCls||abdObs||iccCls)&&<div style={{display:'flex',flexWrap:'wrap',gap:8,marginBottom:14}}>
        {bmiD&&<div><span style={{fontSize:10,color:'var(--tm)',marginRight:5,fontWeight:700,textTransform:'uppercase',letterSpacing:'.5px'}}>IMC:</span><Tag text={bmiD}/></div>}
        {fatCls&&<div><span style={{fontSize:10,color:'var(--tm)',marginRight:5,fontWeight:700,textTransform:'uppercase',letterSpacing:'.5px'}}>Grasa:</span><Tag text={fatCls}/></div>}
        {abdObs&&<div><span style={{fontSize:10,color:'var(--tm)',marginRight:5,fontWeight:700,textTransform:'uppercase',letterSpacing:'.5px'}}>Abdominal:</span><Tag text={abdObs}/></div>}
        {iccCls&&<div><span style={{fontSize:10,color:'var(--tm)',marginRight:5,fontWeight:700,textTransform:'uppercase',letterSpacing:'.5px'}}>ICC:</span><Tag text={iccCls}/></div>}
      </div>}
      <F l="Diagnóstico nutricional integral" sp><TA v={fd.diagnostico} ov={v=>up('diagnostico',v)} rows={4} placeholder="Redacte el diagnóstico nutricional completo del paciente…"/></F>
    </div>
    <div className="sc">
      <div className="st">📋 Indicaciones y Plan Nutricional</div>
      <F l="Indicaciones nutricionales" sp><TA v={fd.indicaciones} ov={v=>up('indicaciones',v)} rows={6} placeholder="Plan alimentario, indicaciones específicas y metas terapéuticas…"/></F>
      <div className="g2" style={{marginTop:12}}>
        <F l="Próxima consulta"><I type="date" v={fd.proximaConsulta} ov={v=>up('proximaConsulta',v)}/></F>
        <F l="Atención realizada por"><I v={fd.atencionPor} ov={v=>up('atencionPor',v)} placeholder="Nombre del/la nutricionista"/></F>
      </div>
    </div>
  </div>
);}
