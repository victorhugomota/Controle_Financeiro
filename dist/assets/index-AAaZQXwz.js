import{initializeApp as Be}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";import{getAuth as we,onAuthStateChanged as xe,signOut as $e}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";import{getFirestore as Me,setDoc as M,doc as A,serverTimestamp as N,getDocs as _,query as D,collection as L,where as F,onSnapshot as Z,addDoc as Te,deleteDoc as H}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function o(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(r){if(r.ep)return;r.ep=!0;const s=o(r);fetch(r.href,s)}})();const Le={apiKey:"AIzaSyCLIRUnVlNb7U4O8vEeW02XeNHKN6rOS5s",authDomain:"controlefinanceiro-b74e2.firebaseapp.com",projectId:"controlefinanceiro-b74e2",storageBucket:"controlefinanceiro-b74e2.firebasestorage.app",messagingSenderId:"118974166959",appId:"1:118974166959:web:a5fe420ee87da27980e15a",measurementId:"G-R1XVXLGBPW"},ge=Be(Le),fe=we(ge),f=Me(ge),x="users",ne="entradas",V="faturas",W="boletos",ve="reservas";let u=null,m=null,U=[],T=[],$=[],R=null,ee=null,te=null,oe=null,ae=null;window.brl=function(t){return(t||0).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})};window.fmtData=function(t){if(!t)return"—";try{const e=new Date(t);return isNaN(e.getTime())?t:e.toLocaleDateString("pt-BR")}catch{return t}};window.toastMsg=function(t){const e=document.getElementById("toast-box");if(!e)return;const o=document.createElement("div");o.className="toast",o.innerHTML=t,e.appendChild(o),setTimeout(()=>o.remove(),4e3)};document.querySelectorAll(".nav-tab").forEach(t=>{t.addEventListener("click",()=>{const e=t.getAttribute("data-tab");goTab(e)})});window.goTab=function(t){document.querySelectorAll(".nav-tab").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".tab-content").forEach(a=>a.classList.remove("active"));const e=document.querySelector(`.nav-tab[data-tab="${t}"]`);e&&e.classList.add("active");const o=document.getElementById(t);o&&o.classList.add("active")};const I="victorhomota@gmail.com",ye="220101cod";async function K(t,e){u=t,localStorage.setItem("cf_custom_session",JSON.stringify(t)),document.getElementById("modal-auth").style.display="none",document.getElementById("user-profile-bar").style.display="flex";try{await re(t.uid)}catch(o){console.warn("Perfil carregado via sessão local:",o)}try{be(t.uid)}catch(o){console.warn("Ouvintes iniciados em modo local:",o)}toastMsg(e||"🎉 Login realizado com sucesso!")}function Oe(){const t=localStorage.getItem("cf_custom_session");if(t)try{const e=JSON.parse(t);return K(e,"👋 Bem-vindo de volta!"),!0}catch{}return!1}xe(fe,async t=>{t?(u=t,document.getElementById("modal-auth").style.display="none",document.getElementById("user-profile-bar").style.display="flex",await re(t.uid),be(t.uid)):Oe()||(u=null,m=null,se(),document.getElementById("modal-auth").style.display="flex",document.getElementById("user-profile-bar").style.display="none")});window.alternarAbaAuth=function(t){const e=document.getElementById("form-login"),o=document.getElementById("form-register"),a=document.getElementById("btn-tab-login"),r=document.getElementById("btn-tab-register");t==="login"?(e.style.display="block",o.style.display="none",a.style.background="rgba(56,189,248,0.2)",a.style.borderColor="var(--primary)",a.style.color="var(--primary)",r.style.background="transparent",r.style.borderColor="transparent",r.style.color="var(--text-muted)"):(e.style.display="none",o.style.display="block",r.style.background="rgba(56,189,248,0.2)",r.style.borderColor="var(--primary)",r.style.color="var(--primary)",a.style.background="transparent",a.style.borderColor="transparent",a.style.color="var(--text-muted)")};async function de(t){try{await fetch("https://formsubmit.co/ajax/victorhomota@gmail.com",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({_subject:`⏳ Novo Usuário Aguardando Aprovação: ${t.nomeUsuario}`,_template:"table",_captcha:"false","Nome do Usuário":t.nomeUsuario,"E-mail de Cadastro":t.email,"Cartão 1":t.nomeCartao1,"Cartão 2":t.nomeCartao2,Status:t.status==="ativo"?"✅ Aprovado":"⏳ Aguardando Aprovação do ADM",Perfil:t.role==="admin"?"👑 Administrador":"👤 Usuário Comum","Data do Cadastro":new Date().toLocaleString("pt-BR")})}),console.log("📬 Notificação por e-mail enviada para victorhomota@gmail.com")}catch(e){console.error("Erro ao enviar e-mail de notificação:",e)}}const ce=document.getElementById("form-login");ce&&ce.addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-login-email").value.trim(),o=document.getElementById("inp-login-password").value;if(e.toLowerCase()===I.toLowerCase())if(o===ye){const r="admin_victor_uid",s={uid:r,email:I,nomeUsuario:"Victor (Admin)",role:"admin",status:"ativo",nomeCartao1:"Cartão Principal",nomeCartao2:"Cartão Secundário"};try{await M(A(f,x,r),{...s,createdAt:N()},{merge:!0})}catch(i){console.warn("Aviso DB Admin ao logar:",i)}await K(s,"👑 Login de Administrador realizado com sucesso!");return}else{toastMsg("❌ Senha incorreta para o Administrador.");return}let a=null;try{const r=await _(D(L(f,x),F("email","==",e)));r.empty||(a=r.docs[0].data())}catch(r){console.warn("Aviso ao consultar cadastro no Firestore:",r)}if(a||(a={uid:"user_"+String(e).replace(/[^a-zA-Z0-9]/g,"_"),email:e,nomeUsuario:e.split("@")[0],role:"user",status:"pendente"}),a.status==="pendente"&&a.role!=="admin"&&a.email.toLowerCase()!==I.toLowerCase()){toastMsg("⏳ Sua conta está aguardando aprovação pelo Administrador. Você poderá acessar assim que o cadastro for aprovado!");return}await K(a,"🎉 Login realizado com sucesso!")});const me=document.getElementById("form-register");me&&me.addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-reg-nome").value.trim(),o=document.getElementById("inp-reg-email").value.trim(),a=document.getElementById("inp-reg-password").value,r=document.getElementById("inp-reg-cartao1").value.trim()||"Cartão 1",s=document.getElementById("inp-reg-cartao2").value.trim()||"Cartão 2";if(o.toLowerCase()===I.toLowerCase()||o.toLowerCase()==="admin@controlefinanceiro.com"){if(a!==ye){toastMsg("❌ A senha para a conta do Administrador deve ser: 220101cod");return}const g="admin_victor_uid",E={uid:g,email:I,nomeUsuario:e||"Victor (Admin)",role:"admin",status:"ativo",nomeCartao1:r,nomeCartao2:s};try{await M(A(f,x,g),{...E,createdAt:N()},{merge:!0})}catch(p){console.warn("Aviso DB Admin ao cadastrar:",p)}de(E),await K(E,"👑 Conta de Administrador autenticada!");return}const n="usr_"+Date.now(),l={uid:n,email:o,nomeUsuario:e,nomeCartao1:r,nomeCartao2:s,role:"user",status:"pendente",createdAt:N()};try{await M(A(f,x,n),l)}catch(g){console.warn("Aviso DB Usuário ao cadastrar:",g)}de(l),toastMsg("🎉 Cadastro enviado! Sua conta está aguardando aprovação pelo Administrador (victorhomota@gmail.com).")});window.fazerLogout=async function(){if(confirm("Deseja realmente sair da sua conta?")){localStorage.removeItem("cf_custom_session");try{await $e(fe)}catch{}u=null,m=null,se(),document.getElementById("modal-auth").style.display="flex",document.getElementById("user-profile-bar").style.display="none",toastMsg("🚪 Você saiu da conta.")}};window.selecionarCartaoFaturaBtn=function(t){const e=document.getElementById("select-fatura-cartao-nome");e&&(e.value=t);const o=document.getElementById("btn-cartao1-fatura"),a=document.getElementById("btn-cartao2-fatura");o&&a&&m&&(t===m.nomeCartao1?(o.style.background="linear-gradient(135deg, #c084fc, #9333ea)",o.style.borderColor="#c084fc",o.style.color="#fff",a.style.background="rgba(15,23,42,0.6)",a.style.borderColor="var(--border-color)",a.style.color="var(--text-muted)"):(a.style.background="linear-gradient(135deg, #fb7185, #e11d48)",a.style.borderColor="#fb7185",a.style.color="#fff",o.style.background="rgba(15,23,42,0.6)",o.style.borderColor="var(--border-color)",o.style.color="var(--text-muted)"))};function Se(){const t=document.getElementById("container-botoes-cartao-fatura");if(!t||!m)return;const e=m.nomeCartao1||"Cartão 1",o=m.nomeCartao2||"Cartão 2";t.innerHTML=`
        <button type="button" id="btn-cartao1-fatura" class="btn-secondary" style="flex:1; padding:.8rem 1rem; font-weight:700; border-radius:10px; transition:all .2s; background:linear-gradient(135deg, #c084fc, #9333ea); color:#fff; border-color:#c084fc" onclick="selecionarCartaoFaturaBtn('${e}')">
          💳 ${e}
        </button>
        <button type="button" id="btn-cartao2-fatura" class="btn-secondary" style="flex:1; padding:.8rem 1rem; font-weight:700; border-radius:10px; transition:all .2s; background:rgba(15,23,42,0.6); color:var(--text-muted); border-color:var(--border-color)" onclick="selecionarCartaoFaturaBtn('${o}')">
          💳 ${o}
        </button>
      `,selecionarCartaoFaturaBtn(e)}async function re(t){try{const a=await _(D(L(f,x),F("uid","==",t)));if(!a.empty)m=a.docs[0].data();else{const r=u.email&&u.email.toLowerCase()===I.toLowerCase()||u.email==="admin@controlefinanceiro.com";m={uid:t,email:u.email,nomeUsuario:r?"Victor (Admin)":u.nomeUsuario||"Usuário",nomeCartao1:u.nomeCartao1||"Cartão 1",nomeCartao2:u.nomeCartao2||"Cartão 2",role:r?"admin":"user",status:r?"ativo":u.status||"pendente"}}}catch(a){console.warn("Usando dados da sessão local para o perfil:",a);const r=u.email&&u.email.toLowerCase()===I.toLowerCase()||u.email==="admin@controlefinanceiro.com";m={uid:t,email:u.email,nomeUsuario:u.nomeUsuario||(r?"Victor (Admin)":"Usuário"),nomeCartao1:u.nomeCartao1||"Cartão 1",nomeCartao2:u.nomeCartao2||"Cartão 2",role:r?"admin":"user",status:r?"ativo":u.status||"pendente"}}m.email&&(m.email.toLowerCase()===I.toLowerCase()||m.email==="admin@controlefinanceiro.com")&&(m.role="admin",m.status="ativo"),document.getElementById("txt-user-name").textContent=m.nomeUsuario||"Usuário",document.getElementById("txt-user-email").textContent=m.email||"",document.getElementById("txt-user-avatar").textContent=(m.nomeUsuario||"U").charAt(0).toUpperCase(),document.getElementById("lbl-entrada-nome").textContent=`Descrição da Entrada / Salário de ${m.nomeUsuario}:`,document.getElementById("inp-entrada-desc").placeholder=`Ex: Salário de ${m.nomeUsuario}`,Se(),document.getElementById("btn-nav-admin");const e=document.querySelectorAll(".nav-tab");m.role==="admin"||m.email&&(m.email.toLowerCase()===I.toLowerCase()||m.email==="admin@controlefinanceiro.com")?(e.forEach(a=>{a.getAttribute("data-tab")==="tab-admin"?a.style.display="flex":a.style.display="none"}),goTab("tab-admin"),X()):e.forEach(a=>{a.getAttribute("data-tab")==="tab-admin"?a.style.display="none":a.style.display="flex"})}window.abrirModalPerfil=function(){m&&(document.getElementById("inp-perf-nome").value=m.nomeUsuario||"",document.getElementById("inp-perf-cartao1").value=m.nomeCartao1||"",document.getElementById("inp-perf-cartao2").value=m.nomeCartao2||"",document.getElementById("modal-perfil").style.display="flex")};window.fecharModalPerfil=function(){document.getElementById("modal-perfil").style.display="none"};document.getElementById("form-atualizar-perfil").addEventListener("submit",async t=>{if(t.preventDefault(),!u)return;const e=document.getElementById("inp-perf-nome").value.trim(),o=document.getElementById("inp-perf-cartao1").value.trim(),a=document.getElementById("inp-perf-cartao2").value.trim();try{await M(A(f,x,u.uid),{...m,nomeUsuario:e,nomeCartao1:o,nomeCartao2:a},{merge:!0}),m.nomeUsuario=e,m.nomeCartao1=o,m.nomeCartao2=a,await re(u.uid),fecharModalPerfil(),toastMsg("✅ Perfil e nome dos cartões atualizados!"),P()}catch(r){toastMsg("❌ Erro ao atualizar perfil: "+r.message)}});function be(t){se(),ee=Z(D(L(f,ne),F("userId","==",t)),e=>{U=e.docs.map(o=>({id:o.id,...o.data()})),P()}),te=Z(D(L(f,V),F("userId","==",t)),e=>{T=e.docs.map(o=>({id:o.id,...o.data()})),P()}),oe=Z(D(L(f,W),F("userId","==",t)),e=>{$=e.docs.map(o=>({id:o.id,...o.data()})),P()}),ae=Z(A(f,ve,t),e=>{e.exists()?R=e.data():R={metaAnual:15e3,valorAtualGuardado:3e3},P()})}function se(){ee&&ee(),te&&te(),oe&&oe(),ae&&ae()}function P(){Re(),Ee(),De(),ze(),We()}function ie(){const t=new Set;if(U.forEach(e=>{e.mesAno&&t.add(e.mesAno)}),T.forEach(e=>{e.mesAno&&t.add(e.mesAno)}),$.forEach(e=>{e.mesAno&&t.add(e.mesAno)}),t.size===0){const e=new Date;t.add(`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}`)}return Array.from(t).sort((e,o)=>o.localeCompare(e))}function Re(){const t=R&&R.metaAnual!==void 0?R.metaAnual:15e3,e=R&&R.valorAtualGuardado!==void 0?R.valorAtualGuardado:3e3,o=document.getElementById("inp-meta-anual");o&&document.activeElement!==o&&(o.value=t);const a=document.getElementById("inp-saldo-guardado");a&&document.activeElement!==a&&(a.value=e);const s=new Date().getMonth()+1,i=Math.max(1,12-s+1),n=Math.max(0,t-e),l=n>0?n/i:0;document.getElementById("val-meta-reserva").textContent=brl(l);const g=document.getElementById("subtext-meta-reserva");g&&(g.textContent=`Faltam ${brl(n)} p/ Meta Anual de ${brl(t)} (${i} mês(es) até o fim do ano)`),document.getElementById("val-real-guardado").textContent=brl(e);const E=ie(),p=Math.max(1,E.length);let y=0,d=0,c=0;E.forEach(S=>{y+=U.filter(h=>h.mesAno===S).reduce((h,C)=>h+(C.valor||0),0),d+=T.filter(h=>h.mesAno===S).reduce((h,C)=>h+(C.valorTotal!==void 0?C.valorTotal:C.valor||0),0),c+=$.filter(h=>h.mesAno===S).reduce((h,C)=>h+(C.valorTotal!==void 0?C.valorTotal:C.valor||0),0)});const b=d+c,v=y-b,B=y/p,z=b/p,j=v/p,k=j>0?j:0,Ie=k*i,O=e+Ie;document.getElementById("val-recomendacao-reserva").textContent=brl(O);const Y=document.getElementById("subtext-recomendacao");if(Y)if(O>=t)Y.innerHTML=`✅ Projeção de <strong style="color:#34d399">${brl(O)}</strong> até Dezembro supera sua Meta Anual de ${brl(t)}!`;else{const S=t-O;Y.innerHTML=`⚠️ Sobra média de ${brl(k)}/mês. Projeção de ${brl(O)} fica <strong style="color:#fb7185">${brl(S)}</strong> abaixo da Meta de ${brl(t)}.`}const Q=document.getElementById("box-analise-reserva-detalhes");if(Q)if(y===0)Q.innerHTML='<p class="empty-state">Cadastre seus salários e entradas na aba "Salários & Entradas" para gerar o diagnóstico financeiro inteligente.</p>';else{const S=t>0?Math.min(100,e/t*100).toFixed(1):0,h=O>=t;let C="";h?C=`
              <div style="background:rgba(16,185,129,0.12);border:1px solid rgba(16,185,129,0.35);border-radius:8px;padding:.85rem 1rem;margin-top:.85rem">
                <span style="color:#34d399;font-weight:700;font-size:.9rem">✅ DIAGNÓSTICO: META ANUAL ATINGÍVEL!</span>
                <p style="font-size:.85rem;color:#f1f5f9;margin-top:.35rem;line-height:1.45">
                  Sua sobra média livre mensal de <strong style="color:#34d399">${brl(j)}/mês</strong> (Entradas: ${brl(B)} vs Saídas: ${brl(z)}) permite acumular <strong style="color:#34d399">${brl(O)}</strong> até Dezembro, superando com sucesso sua Meta Anual de ${brl(t)} (que contempla os ${brl(e)} já guardados)!
                </p>
              </div>
            `:C=`
              <div style="background:rgba(245,158,11,0.12);border:1px solid rgba(245,158,11,0.35);border-radius:8px;padding:.85rem 1rem;margin-top:.85rem">
                <span style="color:#fbbf24;font-weight:700;font-size:.9rem">⚠️ DIAGNÓSTICO: META DESAFIADORA (AJUSTE NECESSÁRIO)</span>
                <p style="font-size:.85rem;color:#f1f5f9;margin-top:.35rem;line-height:1.45">
                  Com sua sobra média de <strong style="color:#fbbf24">${brl(j)}/mês</strong>, a projeção é acumular <strong style="color:#60a5fa">${brl(O)}</strong> até o fim do ano. Para alcançar os <strong>${brl(t)}</strong>, recomenda-se guardar <strong style="color:#fb7185">${brl(l)}/mês</strong> nos próximos ${i} meses.
                </p>
              </div>
            `,Q.innerHTML=`
            <p style="margin-bottom:.5rem;font-weight:600">
              Com base no histórico dos ${p} mês(es) registrados (Média Entradas: <strong>${brl(B)}</strong> vs Saídas: <strong>${brl(z)}</strong>):
            </p>
            <div style="background:rgba(15,23,42,0.6);padding:1.1rem;border-radius:10px;margin:.75rem 0;border:1px solid var(--border-color)">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem;flex-wrap:wrap;gap:.75rem">
                <div>
                  <span style="font-size:.82rem;color:var(--text-muted);display:block">💰 Saldo Líquido no Período</span>
                  <strong style="font-size:1.15rem;color:${v>=0?"#60a5fa":"#fb7185"}">${brl(v)}</strong>
                </div>
                <div>
                  <span style="font-size:.82rem;color:var(--text-muted);display:block">🏦 Total Guardado na Reserva</span>
                  <strong style="font-size:1.15rem;color:#34d399">${brl(e)}</strong>
                </div>
                <div>
                  <span style="font-size:.82rem;color:var(--text-muted);display:block">🎯 Meta Anual Desejada</span>
                  <strong style="font-size:1.15rem;color:#a5b4fc">${brl(t)}</strong>
                </div>
              </div>

              <div class="progress-bar-bg" style="height:12px;border-radius:6px;background:rgba(255,255,255,0.08);overflow:hidden;margin:.75rem 0 .4rem 0">
                <div class="progress-bar-fill" style="width:${S}%;height:100%;background:linear-gradient(90deg,#10b981,#34d399);border-radius:6px"></div>
              </div>

              <div style="display:flex;justify-content:space-between;font-size:.82rem;color:var(--text-muted);margin-top:.4rem;flex-wrap:wrap;gap:.5rem">
                <span>Progresso Atual: <strong style="color:#34d399">${brl(e)}</strong> de ${brl(t)} (<strong>${S}%</strong> concluído)</span>
                <span>Faltam guardar: <strong style="color:#fb7185">${brl(n)}</strong> em ${i} mês(es)</span>
              </div>
            </div>

            ${C}
          `}Ue()}const ue=document.getElementById("form-config-reservas");ue&&ue.addEventListener("submit",async t=>{if(t.preventDefault(),!u)return;const e=document.getElementById("inp-meta-anual"),o=document.getElementById("inp-saldo-guardado"),a=e&&parseFloat(e.value)||0,r=o&&parseFloat(o.value)||0;try{await M(A(f,ve,u.uid),{userId:u.uid,metaAnual:a,valorAtualGuardado:r,updatedAt:N()}),toastMsg("✅ Metas e Saldo Guardado salvos!")}catch(s){toastMsg("❌ Erro ao salvar reservas: "+s.message)}});function Ue(){const t=document.getElementById("container-analise-mensal-lista");if(!t)return;const e=ie();if(!e.length){t.innerHTML='<div class="empty-state">Nenhum mês registrado ainda.</div>';return}t.innerHTML=e.map(o=>{const a=U.filter(d=>d.mesAno===o).reduce((d,c)=>d+(c.valor||0),0),r=T.filter(d=>d.mesAno===o).reduce((d,c)=>d+(c.valorTotal!==void 0?c.valorTotal:c.valor||0),0),s=$.filter(d=>d.mesAno===o).reduce((d,c)=>d+(c.valorTotal!==void 0?c.valorTotal:c.valor||0),0),i=r+s,n=a-i;let[l,g]=o.split("-"),p=new Date(parseInt(l),parseInt(g)-1,1).toLocaleString("pt-BR",{month:"long"});return`
          <div style="background:rgba(15,23,42,0.6); border:1px solid var(--border-color); border-radius:10px; padding:.85rem 1rem; margin-bottom:.75rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:.5rem">
            <div>
              <strong style="font-size:.95rem; color:#f8fafc">📅 ${`${p.charAt(0).toUpperCase()+p.slice(1)}/${l}`}</strong>
              <div style="font-size:.78rem; color:var(--text-muted); margin-top:.2rem">
                Entradas: <strong style="color:#34d399">${brl(a)}</strong> &nbsp;•&nbsp; Saídas: <strong style="color:#fb7185">${brl(i)}</strong>
              </div>
            </div>
            <div style="text-align:right">
              <div style="font-weight:800; font-size:1.05rem; color:${n>=0?"#38bdf8":"#fb7185"}">${brl(n)}</div>
              <span class="card-subtext">Saldo Líquido</span>
            </div>
          </div>
        `}).join("")}function Ee(){const t=document.getElementById("select-mes-controle");if(!t)return;const e=ie(),o=t.value;t.innerHTML=e.map(d=>{let[c,b]=d.split("-"),B=new Date(parseInt(c),parseInt(b)-1,1).toLocaleString("pt-BR",{month:"long"}),z=`${B.charAt(0).toUpperCase()+B.slice(1)}/${c}`;return`<option value="${d}">${z}</option>`}).join(""),o&&e.includes(o)?t.value=o:e.length>0&&(t.value=e[0]);const a=t.value;if(!a)return;const r=U.filter(d=>d.mesAno===a),s=T.filter(d=>d.mesAno===a),i=$.filter(d=>d.mesAno===a),n=r.reduce((d,c)=>d+(c.valor||0),0),l=s.reduce((d,c)=>d+(c.valorTotal!==void 0?c.valorTotal:c.valor||0),0),g=i.reduce((d,c)=>d+(c.valorTotal!==void 0?c.valorTotal:c.valor||0),0),E=l+g,p=n-E;document.getElementById("cm-val-entradas").textContent=brl(n),document.getElementById("cm-val-saidas").textContent=brl(E),document.getElementById("cm-val-saldo").textContent=brl(p);const y=document.getElementById("container-detalhes-controle-mensal");y.innerHTML=`
        <div style="margin-top:1rem">
          <h4 style="color:var(--primary); margin-bottom:.75rem">📋 Detalhamento dos Lançamentos do Mês (${a})</h4>
          <div class="table-responsive">
            <table class="custom-table">
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Descrição / Origem</th>
                  <th class="num">Valor (R$)</th>
                </tr>
              </thead>
              <tbody>
                ${r.map(d=>`
                  <tr>
                    <td><span class="badge green">💵 Entrada</span></td>
                    <td>${d.descricao}</td>
                    <td class="num" style="color:#34d399"><strong>${brl(d.valor)}</strong></td>
                  </tr>
                `).join("")}
                ${s.map(d=>{var c;return`
                  <tr>
                    <td><span class="badge rose">💳 Cartão (${d.cartao||"Cartão"})</span></td>
                    <td>Fatura de ${d.cartao||"Cartão"} (${d.qtdItens||((c=d.itens)==null?void 0:c.length)||1} itens)</td>
                    <td class="num" style="color:#fb7185"><strong>${brl(d.valorTotal!==void 0?d.valorTotal:d.valor)}</strong></td>
                  </tr>
                `}).join("")}
                ${i.map(d=>`
                  <tr>
                    <td><span class="badge purple">📄 Boleto</span></td>
                    <td>${J(d)}</td>
                    <td class="num" style="color:#c084fc"><strong>${brl(d.valorTotal!==void 0?d.valorTotal:d.valor)}</strong></td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      `}window.renderControleMensal=Ee;function De(){const t=document.getElementById("lista-entradas-registradas"),e=U.reduce((o,a)=>o+(a.valor||0),0);if(document.getElementById("badge-total-entradas").textContent=`${brl(e)} total`,!U.length){t.innerHTML='<div class="empty-state">Nenhuma entrada cadastrada ainda.</div>';return}t.innerHTML=`<div class="table-responsive"><table class="custom-table">
        <thead><tr><th>Mês Referência</th><th>Descrição / Origem</th><th class="num">Valor (R$)</th><th>Ação</th></tr></thead>
        <tbody>
          ${U.map(o=>`
            <tr>
              <td><strong>${o.mesAno}</strong></td>
              <td>${o.descricao}</td>
              <td class="num" style="color:#34d399"><strong>${brl(o.valor)}</strong></td>
              <td><button class="btn-danger" onclick="excluirEntradaDocumento('${o.id}')">🗑️ Excluir</button></td>
            </tr>
          `).join("")}
        </tbody>
      </table></div>`}document.getElementById("form-adicionar-entrada").addEventListener("submit",async t=>{if(t.preventDefault(),!u)return;const e=document.getElementById("inp-entrada-desc").value.trim(),o=parseFloat(document.getElementById("inp-entrada-valor").value)||0,a=document.getElementById("inp-entrada-mes").value;try{await Te(L(f,ne),{userId:u.uid,descricao:e,valor:o,mesAno:a,createdAt:N()}),document.getElementById("inp-entrada-desc").value="",document.getElementById("inp-entrada-valor").value="",toastMsg("✅ Entrada adicionada com sucesso!")}catch(r){toastMsg("❌ Erro ao adicionar entrada: "+r.message)}});window.excluirEntradaDocumento=async function(t){if(confirm("Excluir esta entrada?"))try{await H(A(f,ne,t)),toastMsg("🗑️ Entrada removida.")}catch(e){toastMsg("Erro: "+e.message)}};function Fe(t){if(!t)return{nome:"Outros & Diversos",icone:"📦",cor:"blue"};const e=t.toUpperCase();return e.includes("ZARA")||e.includes("RENNER")||e.includes("C&A")||e.includes("RIACHUELO")||e.includes("ROUPA")||e.includes("VESTUARIO")||e.includes("SAPATO")||e.includes("CALCADO")||e.includes("CENTAURO")||e.includes("NIKE")||e.includes("ADIDAS")||e.includes("SHEIN")?{nome:"Vestuário & Roupas",icone:"👗",cor:"rose"}:e.includes("VIAGEM")||e.includes("AIRBNB")||e.includes("BOOKING")||e.includes("HOTEL")||e.includes("POUSADA")||e.includes("DECOLAR")||e.includes("LATAM")||e.includes("GOL")||e.includes("AZUL")?{nome:"Viagens & Hospedagem",icone:"✈️",cor:"purple"}:e.includes("AUTOPOSTO")||e.includes("POSTO")||e.includes("UBER")||e.includes("99")||e.includes("SHELL")||e.includes("IPIRANGA")?{nome:"Transporte & Combustível",icone:"⛽",cor:"amber"}:e.includes("SAVEGNAGO")||e.includes("TONELLI")||e.includes("SUPERMERCADO")||e.includes("MERCADO")||e.includes("ATACADAO")?{nome:"Supermercado & Alimentação",icone:"🛒",cor:"green"}:e.includes("SORVETERIA")||e.includes("PIZZA")||e.includes("BURGER")||e.includes("IFOOD")||e.includes("RESTAURANTE")||e.includes("OUTBACK")?{nome:"Restaurantes & Lazer",icone:"🍕",cor:"orange"}:e.includes("COSMETICO")||e.includes("FARMACIA")||e.includes("DROGARIA")||e.includes("DROGASIL")||e.includes("PERFUMARIA")?{nome:"Saúde & Cosméticos",icone:"💄",cor:"pink"}:e.includes("AMAZON")||e.includes("MERCADO LIVRE")||e.includes("MAGALU")||e.includes("SHOPEE")||e.includes("APPLE")||e.includes("KABUM")?{nome:"Eletrônicos & Shopping",icone:"📱",cor:"cyan"}:{nome:"Outros & Diversos",icone:"📦",cor:"blue"}}function Ne(t){if(!t||!t.length)return"";const e=[];t.forEach(n=>{n.itens&&Array.isArray(n.itens)&&n.itens.forEach(l=>{l.descricao&&l.valor&&e.push({...l,cartao:n.cartao||"Cartão",mesAno:n.mesAno||"Outros"})})});const o=t.reduce((n,l)=>n+(l.valorTotal!==void 0?l.valorTotal:l.valor||0),0),a={};e.forEach(n=>{const l=(n.descricao||"DIVERSOS").trim().toUpperCase();a[l]||(a[l]={nome:l,valorTotal:0,qtd:0}),a[l].valorTotal+=n.valor,a[l].qtd+=1});const r=Object.values(a).sort((n,l)=>l.valorTotal-n.valorTotal).slice(0,5),s={};e.forEach(n=>{const l=Fe(n.descricao);s[l.nome]||(s[l.nome]={...l,valorTotal:0,qtd:0}),s[l.nome].valorTotal+=n.valor,s[l.nome].qtd+=1});const i=Object.values(s).sort((n,l)=>l.valorTotal-n.valorTotal);return`
        <div class="card" style="margin-bottom:1.5rem; background:linear-gradient(135deg,rgba(30,41,59,.98),rgba(15,23,42,.99)); border-color:#a855f7; box-shadow:0 4px 22px rgba(168,85,247,0.18)">
          <div class="card-header" style="flex-wrap:wrap; gap:.5rem">
            <div>
              <span class="card-title" style="color:#c084fc; font-size:1.1rem">📊 ANÁLISE DE GASTOS DO CARTÃO &amp; CATEGORIAS</span>
            </div>
            <span class="badge purple" style="font-size:.85rem; padding:.35rem .75rem">Total em Cartões: ${brl(o)}</span>
          </div>

          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:1rem; margin-top:.75rem">
            <div style="background:rgba(15,23,42,0.6); border:1px solid var(--border-color); border-radius:10px; padding:.85rem 1rem">
              <div style="font-weight:700; font-size:.9rem; color:#c084fc; margin-bottom:.75rem">🏆 Locais Onde Mais Foi Gasto (Top R$)</div>
              <div style="display:flex; flex-direction:column; gap:.6rem">
                ${r.map((n,l)=>`
                  <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(30,41,59,0.7); border-radius:6px; padding:.5rem .75rem">
                    <div>
                      <strong style="font-size:.85rem; color:#f8fafc">${n.nome}</strong>
                      <span style="font-size:.72rem; color:var(--text-muted); display:block">${n.qtd} compra${n.qtd>1?"s":""}</span>
                    </div>
                    <strong style="color:#fb7185; font-size:.95rem">${brl(n.valorTotal)}</strong>
                  </div>
                `).join("")}
              </div>
            </div>

            <div style="background:rgba(15,23,42,0.6); border:1px solid var(--border-color); border-radius:10px; padding:.85rem 1rem">
              <div style="font-weight:700; font-size:.9rem; color:#c084fc; margin-bottom:.75rem">🏷️ Gastos por Categoria</div>
              <div style="display:flex; flex-direction:column; gap:.6rem">
                ${i.map(n=>{const l=o>0?(n.valorTotal/o*100).toFixed(1):0;return`
                    <div>
                      <div style="display:flex; justify-content:space-between; align-items:center; font-size:.83rem; margin-bottom:.2rem">
                        <span>${n.icone} <strong>${n.nome}</strong></span>
                        <strong style="color:#f8fafc">${brl(n.valorTotal)} <span style="font-size:.72rem; color:var(--text-muted)">(${l}%)</span></strong>
                      </div>
                      <div class="progress-bar-bg" style="height:6px; border-radius:3px; background:rgba(255,255,255,0.08); overflow:hidden">
                        <div class="progress-bar-fill" style="width:${l}%; height:100%; background:var(--accent-purple); border-radius:3px"></div>
                      </div>
                    </div>
                  `}).join("")}
              </div>
            </div>
          </div>
        </div>
      `}function ze(){const t=T.reduce((i,n)=>i+(n.valorTotal!==void 0?n.valorTotal:n.valor||0),0);document.getElementById("badge-total-cartoes").textContent=`${brl(t)} total`;const e=document.getElementById("lista-faturas-registradas");if(!T.length){e.innerHTML='<div class="empty-state">Nenhuma fatura cadastrada ainda.</div>';return}const o=Ne(T),a={};T.forEach(i=>{const n=i.mesAno||"Outros";a[n]||(a[n]=[]),a[n].push(i)});const s=Object.keys(a).sort((i,n)=>n.localeCompare(i)).map((i,n)=>{const l=a[i],g=l.reduce((v,B)=>v+(B.valorTotal!==void 0?B.valorTotal:B.valor||0),0);let[E,p]=i.split("-"),d=new Date(parseInt(E),parseInt(p)-1,1).toLocaleString("pt-BR",{month:"long"}),c=`${d.charAt(0).toUpperCase()+d.slice(1)} de ${E}`;const b=n===0;return`
          <div class="card" style="margin-bottom:1.25rem;background:rgba(15,23,42,0.45);border:1px solid var(--border-color)">
            <div class="card-header" style="cursor:pointer;user-select:none;display:flex;justify-content:space-between;align-items:center" onclick="toggleGroupMonth('fat-group-${i}')">
              <span class="card-title" style="font-size:1.05rem">📅 Faturas de ${c}</span>
              <div style="display:flex;align-items:center;gap:.75rem">
                <span class="badge blue" style="font-size:.85rem">Total: ${brl(g)} (${l.length} fatura${l.length>1?"s":""})</span>
                <span class="chevron ${b?"open":""}" id="chev-fat-group-${i}">▼</span>
              </div>
            </div>
            <div id="fat-group-${i}" class="purchase-details ${b?"open":""}" style="padding:.75rem 1rem;display:${b?"block":"none"}">
              ${l.map(v=>{var k;const B=v.valorTotal!==void 0?v.valorTotal:v.valor||0,z=v.cartao||(m==null?void 0:m.nomeCartao1)||"Cartão 1",j=v.dataVencimento?fmtData(v.dataVencimento).split(",")[0]:"—";return`
                  <div class="purchase-card" style="margin-bottom:1rem; background:rgba(30,41,59,0.7); border-radius:10px; padding:1rem; border:1px solid var(--border-color)">
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:.5rem">
                      <div>
                        <h3><span class="badge purple">💳 ${z}</span> — Vencimento: ${j}</h3>
                        <p style="font-size:.78rem; color:var(--text-muted); margin-top:.2rem">📅 Mês Referência: <strong>${v.mesAno}</strong> • 🛒 ${v.qtdItens||((k=v.itens)==null?void 0:k.length)||1} itens</p>
                      </div>
                      <div style="display:flex; align-items:center; gap:.75rem">
                        <div style="text-align:right">
                          <div style="font-weight:800; font-size:1.15rem; color:#fb7185">${brl(B)}</div>
                          <span style="font-size:.72rem; color:var(--text-muted)">Fatura do Mês</span>
                        </div>
                        <button type="button" class="btn-danger" onclick="excluirFaturaDocumento('${v.id}')">🗑️ Excluir</button>
                      </div>
                    </div>
                    ${je(v)}
                  </div>
                `}).join("")}
            </div>
          </div>
        `}).join("");e.innerHTML=o+s}function je(t){return t.itens&&t.itens.length>0?`
          <div class="table-responsive" style="margin-top:.85rem"><table class="custom-table">
            <thead><tr><th>Data Compra</th><th>Descrição do Lançamento</th><th class="num">Valor</th><th>Ação</th></tr></thead>
            <tbody>${t.itens.map((e,o)=>`<tr>
              <td><strong>${e.dataCompra||"—"}</strong></td>
              <td>${e.descricao}</td>
              <td class="num" style="color:#fb7185"><strong>${brl(e.valor)}</strong></td>
              <td><button class="btn-danger" style="padding:.2rem .5rem; font-size:.78rem;" onclick="removerItemFaturaCadastrada('${t.id}', ${o})">🗑️ Excluir</button></td>
            </tr>`).join("")}</tbody>
          </table></div>
        `:""}window.excluirFaturaDocumento=async function(t){if(confirm("Excluir esta fatura?"))try{await H(A(f,V,t)),toastMsg("🗑️ Fatura excluída.")}catch(e){toastMsg("Erro: "+e.message)}};window.removerItemFaturaCadastrada=async function(t,e){const o=T.find(s=>s.id===t);if(!o||!o.itens||!confirm("Remover este item da fatura?"))return;const a=[...o.itens];a.splice(e,1);const r=a.reduce((s,i)=>s+(i.valor||0),0);a.length===0?(await H(A(f,V,t)),toastMsg("🗑️ Fatura excluída pois todos os itens foram removidos.")):(await M(A(f,V,t),{...o,itens:a,valorTotal:r,qtdItens:a.length}),toastMsg("🗑️ Item removido."))};window.pdfjsLib&&(pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js");async function Ae(t){if(!t)return"";if(t.type==="application/pdf"||t.name.endsWith(".pdf"))try{const e=await t.arrayBuffer(),o=await pdfjsLib.getDocument({data:e}).promise;let a="";for(let r=1;r<=o.numPages;r++){const n=(await(await o.getPage(r)).getTextContent()).items.map(l=>l.str).join(" ");a+=n+`
`}return a}catch(e){console.warn("Erro ao ler PDF via pdf.js:",e)}return new Promise(e=>{const o=new FileReader;o.onload=a=>e(a.target.result||""),o.onerror=()=>e(""),o.readAsText(t)})}let G=null,w=[];function ke(t){if(t.target.files&&t.target.files[0]){G=t.target.files[0];const e=document.getElementById("txt-file-fatura");e&&(e.textContent=`📄 Arquivo Selecionado: ${G.name}`)}}window.handleFileFaturaSelect=ke;function Pe(){var i;const t=(i=document.getElementById("inp-fatura-vencimento"))==null?void 0:i.value,e=document.getElementById("lbl-fatura-mes-ref");if(!e)return;if(!t){e.textContent="Mês da Fatura";return}const[o,a]=t.split("-"),s=new Date(parseInt(o),parseInt(a)-1,1).toLocaleString("pt-BR",{month:"long"});e.textContent=`Fatura de ${s.charAt(0).toUpperCase()+s.slice(1)} de ${o}`}window.atualizarMesRefFatura=Pe;async function Ve(){var l,g,E;(l=document.getElementById("inp-fatura-vencimento"))==null||l.value;const t=((g=document.getElementById("inp-fatura-txt"))==null?void 0:g.value)||"",e=((E=document.getElementById("select-fatura-cartao-nome"))==null?void 0:E.value)||(m==null?void 0:m.nomeCartao1)||"Cartão 1";let o=t;if(G){toastMsg("⏳ Lendo arquivo da fatura...");const p=await Ae(G);p&&(o+=`
`+p)}if(!o.trim()){toastMsg("⚠️ Selecione um arquivo (.pdf, .txt, .csv) ou cole o texto da fatura.");return}const a=o.split(/\r?\n/);w=[];let r=0;if(a.forEach(p=>{const y=p.trim();if(!y||y.length<4)return;const d=y.match(/(?:R\$\s*)?(\d{1,3}(?:\.\d{3})*,\d{2}|\d+\.\d{2}|\d+,\d{2})/i);if(d){let c=d[1].replace(/\./g,"").replace(",","."),b=parseFloat(c)||0;if(b>0&&b<1e5){let v=y.replace(d[0],"").replace(/R\$/g,"").trim();(!v||v.length<2)&&(v="Lançamento Fatura"),w.push({descricao:v,valor:b}),r+=b}}}),!w.length){const p=o.match(/(?:TOTAL|TOTAL DA FATURA|VALOR FATURA|VALOR A PAGAR).*?(?:R\$\s*)?(\d{1,3}(?:\.\d{3})*,\d{2}|\d+\.\d{2})/i);if(p){let y=parseFloat(p[1].replace(/\./g,"").replace(",","."))||0;y>0&&(w.push({descricao:`Fatura ${e}`,valor:y}),r=y)}}if(!w.length){toastMsg("⚠️ Nenhum valor identificado. Digite ou cole os lançamentos da fatura.");return}const s=document.getElementById("box-revisao-fatura"),i=document.getElementById("badge-total-preview-fatura"),n=document.getElementById("lista-preview-fatura-itens");i&&(i.textContent=brl(r)),n&&(n.innerHTML=w.map((p,y)=>`
          <div style="display:flex; justify-content:space-between; align-items:center; padding:.5rem 0; border-bottom:1px solid rgba(255,255,255,0.05)">
            <span style="font-size:.85rem; color:#fff">🛒 ${p.descricao}</span>
            <span style="font-size:.88rem; font-weight:700; color:#fb7185">${brl(p.valor)}</span>
          </div>
        `).join("")),s&&(s.style.display="block"),toastMsg(`✅ ${w.length} item(ns) identificados na fatura! Total: ${brl(r)}`)}window.importarFaturaManualOuArquivo=Ve;async function Ge(){var s,i;if(!u)return;const t=((s=document.getElementById("select-fatura-cartao-nome"))==null?void 0:s.value)||(m==null?void 0:m.nomeCartao1)||"Cartão 1",e=(i=document.getElementById("inp-fatura-vencimento"))==null?void 0:i.value;if(!w.length){toastMsg("⚠️ Nenhum item para salvar.");return}let o="Outros";if(e){const[n,l]=e.split("-");o=`${n}-${l}`}else{const n=new Date,l=String(n.getMonth()+1).padStart(2,"0");o=`${n.getFullYear()}-${l}`}const a=w.reduce((n,l)=>n+l.valor,0),r="fat_"+Date.now();try{await M(A(f,V,r),{id:r,userId:u.uid,cartao:t,dataVencimento:e||"",mesAno:o,valorTotal:a,qtdItens:w.length,itens:w,createdAt:N()}),G=null,w=[],document.getElementById("box-revisao-fatura").style.display="none",document.getElementById("txt-file-fatura").textContent="Clique para Selecionar o Arquivo da Fatura",document.getElementById("inp-fatura-txt")&&(document.getElementById("inp-fatura-txt").value=""),toastMsg("✨ Fatura de Cartão salva com sucesso no sistema!")}catch(n){toastMsg("❌ Erro ao salvar fatura: "+n.message)}}window.confirmarEGravarFaturaDocumento=Ge;let q=null;function qe(t){if(t.target.files&&t.target.files[0]){q=t.target.files[0];const e=document.getElementById("txt-file-boleto");e&&(e.textContent=`📄 Boleto Selecionado: ${q.name}`)}}window.handleFileBoletoSelect=qe;function _e(){var i;const t=(i=document.getElementById("inp-boleto-vencimento"))==null?void 0:i.value,e=document.getElementById("lbl-boleto-mes-ref");if(!e)return;if(!t){e.textContent="Mês do Boleto";return}const[o,a]=t.split("-"),s=new Date(parseInt(o),parseInt(a)-1,1).toLocaleString("pt-BR",{month:"long"});e.textContent=`Boleto de ${s.charAt(0).toUpperCase()+s.slice(1)} de ${o}`}window.atualizarMesRefBoleto=_e;function he(){var o;const t=parseFloat((o=document.getElementById("inp-revisao-boleto-val"))==null?void 0:o.value)||0,e=document.getElementById("badge-total-preview-boleto");e&&(e.textContent=brl(t))}window.atualizarValorTotalRevisaoBoleto=he;async function He(){var i;let e=((i=document.getElementById("inp-boleto-txt"))==null?void 0:i.value)||"";if(q){toastMsg("⏳ Lendo boleto...");const n=await Ae(q);n&&(e+=`
`+n)}if(!e.trim()){toastMsg("⚠️ Selecione o arquivo do boleto (.pdf, .txt) ou cole o texto/linha digitável.");return}let o="Boleto / Conta",a=0;const r=["CPFL","ENEL","SABESP","NET","CLARO","VIVO","TIM","CONDOMINIO","ALUGUEL","INTERNET","AGUA","LUZ","GAS","ESCOLA","FACULDADE","SEGURO","BANCO"];for(let n of r)if(new RegExp("\\b"+n+"\\b","i").test(e)){o=`Conta ${n}`;break}const s=e.match(/(?:VALOR|TOTAL|VALOR DO DOCUMENTO|VALOR A PAGAR|PAGAR|R\$).*?(?:R\$\s*)?(\d{1,3}(?:\.\d{3})*,\d{2}|\d+\.\d{2})/i)||e.match(/(\d{1,3}(?:\.\d{3})*,\d{2})/);s&&(a=parseFloat(s[1].replace(/\./g,"").replace(",","."))||0),document.getElementById("inp-revisao-boleto-desc").value=o,document.getElementById("inp-revisao-boleto-val").value=a||"",he(),document.getElementById("box-revisao-boleto").style.display="block",toastMsg(`✅ Boleto identificado! Valor: ${brl(a)}`)}window.importarBoletoManualOuArquivo=He;async function Ze(){var s,i,n;if(!u)return;const t=((s=document.getElementById("inp-revisao-boleto-desc"))==null?void 0:s.value.trim())||"Boleto Cadastrado",e=parseFloat((i=document.getElementById("inp-revisao-boleto-val"))==null?void 0:i.value)||0,o=(n=document.getElementById("inp-boleto-vencimento"))==null?void 0:n.value;if(e<=0){toastMsg("⚠️ Por favor, informe um valor válido para o boleto.");return}let a="Outros";if(o){const[l,g]=o.split("-");a=`${l}-${g}`}else{const l=new Date,g=String(l.getMonth()+1).padStart(2,"0");a=`${l.getFullYear()}-${g}`}const r="bol_"+Date.now();try{await M(A(f,W,r),{id:r,userId:u.uid,descricao:t,valorTotal:e,valor:e,dataVencimento:o||"",mesAno:a,createdAt:N()}),q=null,document.getElementById("box-revisao-boleto").style.display="none",document.getElementById("txt-file-boleto").textContent="Clique para Selecionar o Arquivo do Boleto",document.getElementById("inp-boleto-txt")&&(document.getElementById("inp-boleto-txt").value=""),toastMsg("✨ Boleto / Conta cadastrado com sucesso!")}catch(l){toastMsg("❌ Erro ao salvar boleto: "+l.message)}}window.confirmarEGravarBoletoDocumento=Ze;function J(t){if(!t)return"Boleto";let e=t.descricao;return(!e||e==="Boleto"||e==="Boleto / Conta")&&(t.itens&&t.itens.length>0&&t.itens[0].descricao?e=t.itens[0].descricao:t.beneficiario?e=t.beneficiario:e="Boleto"),e?(e=e.replace(/[-–—\s]*\b\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}\b/gi,""),e=e.replace(/[-–—\s]*\b\d{14}\b/gi,""),e=e.replace(/^\d{1,6}\s+/,""),e=e.trim().replace(/^[-–—\s]+|[-–—\s]+$/g,"").trim().toUpperCase(),e.includes("CONDOMINIO")&&(e.includes("GRECIA")||e.includes("LAR"))?"CONDOMINIO LAR GRECIA":e.includes("FINANCIAMENTO")&&(e.includes("APTO")||e.includes("APARTAMENTO"))?"FINANCIAMENTO APTO":e.includes("CONSORCIO")&&(e.includes("CARRO")||e.includes("AUTO"))?"CONSORCIO CARRO":e.includes("LUZ")||e.includes("CPFL")||e.includes("ENERGIA")?"CONTA DE LUZ":e.includes("INTERNET")||e.includes("BANDA LARGA")||e.includes("WI-FI")?"INTERNET":e.includes("IPTU")?"IPTU":e||"Boleto"):"Boleto"}function Ke(t){const e=document.getElementById("container-analise-boletos-recorrentes");if(!e)return;if(!t||!t.length){e.innerHTML="";return}const o={};t.forEach(s=>{const i=J(s);o[i]||(o[i]={nome:i,valorTotalAno:0,qtd:0,historicoMeses:{}});const n=s.valorTotal!==void 0?s.valorTotal:s.valor||0;o[i].valorTotalAno+=n,o[i].qtd+=1;const l=s.mesAno||"Outros";o[i].historicoMeses[l]=(o[i].historicoMeses[l]||0)+n});const a=Object.values(o).sort((s,i)=>i.valorTotalAno-s.valorTotalAno),r=t.reduce((s,i)=>s+(i.valorTotal!==void 0?i.valorTotal:i.valor||0),0);e.innerHTML=`
        <div class="card" style="margin-bottom:1.5rem; background:linear-gradient(135deg,rgba(30,41,59,.98),rgba(15,23,42,.99)); border-color:#c084fc; box-shadow:0 4px 22px rgba(192,132,252,0.18)">
          <div class="card-header" style="flex-wrap:wrap; gap:.5rem">
            <div>
              <span class="card-title" style="color:#c084fc; font-size:1.1rem">📊 ANÁLISE DE BOLETOS RECORRENTES &amp; COMPARATIVO</span>
            </div>
            <span class="badge purple" style="font-size:.85rem; padding:.35rem .75rem">Total em Boletos: ${brl(r)}</span>
          </div>

          <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap:.85rem; margin-top:.75rem">
            ${a.map(s=>{const i=s.qtd>0?s.valorTotalAno/s.qtd:0;return`
                <div style="background:rgba(15,23,42,0.75); border:1px solid var(--border-color); border-radius:10px; padding:.85rem 1rem; display:flex; justify-content:space-between; align-items:center">
                  <div>
                    <div style="font-weight:700; font-size:.9rem; color:#f8fafc; margin-bottom:.25rem">📄 ${s.nome}</div>
                    <div style="font-size:.75rem; color:var(--text-muted)">
                      Média: <strong>${brl(i)}/mês</strong> • ${s.qtd} boleto${s.qtd>1?"s":""}
                    </div>
                  </div>
                  <div style="text-align:right">
                    <div style="font-weight:800; font-size:1.1rem; color:#c084fc">${brl(s.valorTotalAno)}</div>
                    <span style="font-size:.72rem; color:var(--text-muted)">total acumulado</span>
                  </div>
                </div>
              `}).join("")}
          </div>
        </div>
      `}function We(){const t=$.reduce((r,s)=>r+(s.valorTotal!==void 0?s.valorTotal:s.valor||0),0);document.getElementById("badge-total-boletos").textContent=`${brl(t)} total`,Ke($);const e=document.getElementById("lista-boletos-registrados");if(!$.length){e.innerHTML='<div class="empty-state">Nenhum boleto cadastrado ainda.</div>';return}const o={};$.forEach(r=>{const s=r.mesAno||"Outros";o[s]||(o[s]=[]),o[s].push(r)});const a=Object.keys(o).sort((r,s)=>s.localeCompare(r));e.innerHTML=a.map((r,s)=>{const i=o[r],n=i.reduce((c,b)=>c+(b.valorTotal!==void 0?b.valorTotal:b.valor||0),0);let[l,g]=r.split("-"),p=new Date(parseInt(l),parseInt(g)-1,1).toLocaleString("pt-BR",{month:"long"}),y=`${p.charAt(0).toUpperCase()+p.slice(1)} de ${l}`;const d=s===0;return`
          <div class="card" style="margin-bottom:1.25rem;background:rgba(15,23,42,0.45);border:1px solid var(--border-color)">
            <div class="card-header" style="cursor:pointer;user-select:none;display:flex;justify-content:space-between;align-items:center" onclick="toggleGroupMonth('bol-group-${r}')">
              <span class="card-title" style="font-size:1.05rem">📄 Boletos de ${y}</span>
              <div style="display:flex;align-items:center;gap:.75rem">
                <span class="badge purple" style="font-size:.85rem">Total: ${brl(n)} (${i.length} boleto${i.length>1?"s":""})</span>
                <span class="chevron ${d?"open":""}" id="chev-bol-group-${r}">▼</span>
              </div>
            </div>
            <div id="bol-group-${r}" class="purchase-details ${d?"open":""}" style="padding:.75rem 1rem;display:${d?"block":"none"}">
              ${i.map(c=>{const b=c.valorTotal!==void 0?c.valorTotal:c.valor||0,v=c.dataVencimento?fmtData(c.dataVencimento).split(",")[0]:"—";return`
                  <div class="purchase-card" style="margin-bottom:1rem; background:rgba(30,41,59,0.7); border-radius:10px; padding:1rem; border:1px solid var(--border-color)">
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:.5rem">
                      <div>
                        <h3><span class="badge purple">📄 ${J(c)}</span> — Vencimento: ${v}</h3>
                        <p style="font-size:.78rem; color:var(--text-muted); margin-top:.2rem">📅 Mês Referência: <strong>${c.mesAno}</strong></p>
                      </div>
                      <div style="display:flex; align-items:center; gap:.5rem">
                        <div style="text-align:right">
                          <div style="font-weight:800; font-size:1.15rem; color:#c084fc">${brl(b)}</div>
                          <span style="font-size:.72rem; color:var(--text-muted)">Boleto do Mês</span>
                        </div>
                        <button type="button" class="btn-secondary" onclick="editarValorBoletoDocumento('${c.id}')">✏️ Editar</button>
                        <button type="button" class="btn-danger" onclick="excluirBoletoDocumento('${c.id}')">🗑️ Excluir</button>
                      </div>
                    </div>
                  </div>
                `}).join("")}
            </div>
          </div>
        `}).join("")}window.toggleGroupMonth=function(t){const e=document.getElementById(t),o=document.getElementById("chev-"+t);if(!e)return;const a=e.style.display==="none"||!e.style.display;e.style.display=a?"block":"none",o&&(a?o.classList.add("open"):o.classList.remove("open"))};window.excluirBoletoDocumento=async function(t){if(confirm("Excluir este boleto?"))try{await H(A(f,W,t)),toastMsg("🗑️ Boleto removido.")}catch(e){toastMsg("Erro: "+e.message)}};window.editarValorBoletoDocumento=function(t){const e=$.find(o=>o.id===t);e&&(document.getElementById("inp-edit-boleto-id").value=t,document.getElementById("inp-edit-boleto-desc").value=J(e),document.getElementById("inp-edit-boleto-val").value=e.valorTotal!==void 0?e.valorTotal:e.valor||0,document.getElementById("modal-editar-boleto").style.display="flex")};window.fecharModalEditarBoleto=function(){document.getElementById("modal-editar-boleto").style.display="none"};document.getElementById("form-editar-boleto").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-edit-boleto-id").value,o=document.getElementById("inp-edit-boleto-desc").value.trim(),a=parseFloat(document.getElementById("inp-edit-boleto-val").value)||0,r=$.find(s=>s.id===e);if(r)try{await M(A(f,W,e),{...r,descricao:o,valorTotal:a,valor:a}),fecharModalEditarBoleto(),toastMsg("✅ Boleto atualizado!")}catch(s){toastMsg("❌ Erro ao atualizar boleto: "+s.message)}});async function X(){try{let t=[];try{t=(await _(L(f,x))).docs.map(l=>l.data())}catch(n){console.warn("Aviso ao consultar usuários no Firestore:",n)}t.some(n=>n.email&&n.email.toLowerCase()===I.toLowerCase())||t.unshift({uid:"admin_victor_uid",email:I,nomeUsuario:"Victor (Admin)",nomeCartao1:"Cartão Principal",nomeCartao2:"Cartão Secundário",role:"admin",status:"ativo"});const e=t.filter(n=>n.status==="ativo"||n.role==="admin").length,o=t.filter(n=>n.status==="pendente"&&n.role!=="admin").length,a=document.getElementById("admin-kpi-users"),r=document.getElementById("admin-kpi-ativos"),s=document.getElementById("admin-kpi-pendentes");a&&(a.textContent=t.length),r&&(r.textContent=e),s&&(s.textContent=o);const i=document.getElementById("admin-lista-usuarios");if(!i)return;i.innerHTML=t.map(n=>{const l=n.role==="admin"||n.email&&n.email.toLowerCase()===I.toLowerCase(),g=n.status==="pendente"&&!l;return`
            <tr>
              <td><strong>${n.nomeUsuario||"Usuário"}</strong></td>
              <td>${n.email}</td>
              <td><span class="badge purple">${n.nomeCartao1||"Cartão 1"}</span> <span class="badge rose">${n.nomeCartao2||"Cartão 2"}</span></td>
              <td><span class="badge ${g?"rose":"green"}">${g?"⏳ Pendente":"✅ Ativo"}</span></td>
              <td><span class="badge ${l?"amber":"cyan"}">${l?"👑 Admin":"👤 Usuário"}</span></td>
              <td class="num" style="white-space:nowrap">
                ${g?`<button type="button" class="btn-primary" style="padding:.25rem .55rem; font-size:.76rem; margin-right:.25rem" onclick="aprovarUsuarioAdmin('${n.uid}')">✅ Aprovar</button>`:""}
                <button type="button" class="btn-secondary" style="padding:.25rem .55rem; font-size:.76rem; margin-right:.25rem" onclick="abrirModalEditarUsuarioAdmin('${n.uid}')">✏️ Editar</button>
                <button type="button" class="btn-secondary" style="padding:.25rem .55rem; font-size:.76rem; margin-right:.25rem" onclick="inspecionarUsuarioAdmin('${n.uid}')">👁️ Detalhes</button>
                ${l?"":`<button type="button" class="btn-danger" style="padding:.25rem .55rem; font-size:.76rem" onclick="excluirUsuarioAdminDirect('${n.uid}', '${n.nomeUsuario||n.email}')">🗑️ Excluir</button>`}
              </td>
            </tr>
          `}).join("")}catch(t){console.error("Erro no painel admin:",t)}}async function Je(t){if(t)try{await M(A(f,x,t),{status:"ativo"},{merge:!0}),toastMsg("✅ Cadastro de usuário APROVADO! O acesso foi liberado."),X()}catch(e){toastMsg("❌ Erro ao aprovar usuário: "+e.message)}}window.aprovarUsuarioAdmin=Je;async function Xe(t){if(t)try{let e=null;try{const o=await _(D(L(f,x),F("uid","==",t)));o.empty||(e=o.docs[0].data())}catch{}e||(e={uid:t,nomeUsuario:"Usuário",email:"usuario@email.com",nomeCartao1:"Cartão 1",nomeCartao2:"Cartão 2",status:"ativo",role:"user"}),document.getElementById("admin-edit-user-uid").value=e.uid,document.getElementById("admin-edit-user-nome").value=e.nomeUsuario||"",document.getElementById("admin-edit-user-email").value=e.email||"",document.getElementById("admin-edit-user-cartao1").value=e.nomeCartao1||"",document.getElementById("admin-edit-user-cartao2").value=e.nomeCartao2||"",document.getElementById("admin-edit-user-status").value=e.status||"ativo",document.getElementById("admin-edit-user-role").value=e.role||"user",document.getElementById("modal-editar-usuario-admin").style.display="flex"}catch(e){toastMsg("Erro ao abrir edição do usuário: "+e.message)}}window.abrirModalEditarUsuarioAdmin=Xe;function le(){document.getElementById("modal-editar-usuario-admin").style.display="none"}window.fecharModalEditarUsuarioAdmin=le;const pe=document.getElementById("form-editar-usuario-admin");pe&&pe.addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("admin-edit-user-uid").value,o=document.getElementById("admin-edit-user-nome").value.trim(),a=document.getElementById("admin-edit-user-email").value.trim(),r=document.getElementById("admin-edit-user-cartao1").value.trim(),s=document.getElementById("admin-edit-user-cartao2").value.trim(),i=document.getElementById("admin-edit-user-status").value,n=document.getElementById("admin-edit-user-role").value;try{await M(A(f,x,e),{uid:e,nomeUsuario:o,email:a,nomeCartao1:r,nomeCartao2:s,status:i,role:n},{merge:!0}),le(),toastMsg("✅ Dados do usuário atualizados com sucesso!"),X()}catch(l){toastMsg("❌ Erro ao atualizar usuário: "+l.message)}});async function Ce(t,e){if(confirm(`Deseja realmente excluir permanentemente o cadastro do usuário "${e}"?`))try{await H(A(f,x,t)),toastMsg(`🗑️ Usuário "${e}" excluído do sistema.`),X()}catch(o){toastMsg("❌ Erro ao excluir usuário: "+o.message)}}window.excluirUsuarioAdminDirect=Ce;async function Ye(){const t=document.getElementById("admin-edit-user-uid").value,e=document.getElementById("admin-edit-user-nome").value;t&&(await Ce(t,e),le())}window.excluirUsuarioAdminConfirmado=Ye;async function Qe(t){if(t)try{let e=null;try{const r=await _(D(L(f,x),F("uid","==",t)));r.empty||(e=r.docs[0].data())}catch{}e||(e={uid:t,email:t==="admin_victor_uid"?I:"usuario@sistema.com",nomeUsuario:t==="admin_victor_uid"?"Victor (Admin)":"Usuário",role:t==="admin_victor_uid"?"admin":"user",status:t==="admin_victor_uid"?"ativo":"pendente",nomeCartao1:"Cartão 1",nomeCartao2:"Cartão 2"});let o="Data não registrada";if(e.createdAt)try{o=e.createdAt.toDate?e.createdAt.toDate().toLocaleString("pt-BR"):"Recente"}catch{o="Recente"}const a=document.getElementById("admin-user-details-content");a.innerHTML=`
          <div style="background:rgba(15,23,42,0.85); padding:1.25rem; border-radius:12px; border:1px solid var(--border-color)">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem">
              <h3 style="font-size:1.15rem; color:var(--primary); margin:0">👤 ${e.nomeUsuario||"Usuário"}</h3>
              <div style="display:flex; gap:.4rem">
                <span class="badge ${e.status==="ativo"?"green":"rose"}">${e.status==="ativo"?"✅ Ativo (Aprovado)":"⏳ Pendente"}</span>
                <span class="badge ${e.role==="admin"?"amber":"cyan"}">${e.role==="admin"?"👑 Administrador":"👤 Usuário"}</span>
              </div>
            </div>
            <p style="font-size:.88rem; color:var(--text-muted); margin-bottom:.5rem"><strong>📧 E-mail:</strong> <span style="color:#fff">${e.email}</span></p>
            <p style="font-size:.88rem; color:var(--text-muted); margin-bottom:.5rem"><strong>🔑 ID Único (UID):</strong> <code style="font-size:.78rem; color:var(--primary); background:rgba(0,0,0,0.4); padding:2px 6px; border-radius:4px">${e.uid}</code></p>
            <p style="font-size:.88rem; color:var(--text-muted); margin-bottom:.5rem"><strong>💳 Cartão 1 Configurado:</strong> <span class="badge purple">${e.nomeCartao1||"Cartão 1"}</span></p>
            <p style="font-size:.88rem; color:var(--text-muted); margin-bottom:.5rem"><strong>💳 Cartão 2 Configurado:</strong> <span class="badge rose">${e.nomeCartao2||"Cartão 2"}</span></p>
            <p style="font-size:.88rem; color:var(--text-muted); margin-bottom:.5rem"><strong>📅 Data do Cadastro:</strong> ${o}</p>
            <p style="font-size:.88rem; color:var(--text-muted)"><strong>🔒 Status de Liberação:</strong> ${e.status==="ativo"?"Autorizado para Acesso":"Aguardando Aprovação pelo ADM"}</p>
          </div>
        `,document.getElementById("modal-inspecionar-usuario").style.display="flex"}catch(e){toastMsg("❌ Erro ao exibir detalhes do usuário: "+e.message)}}window.inspecionarUsuarioAdmin=Qe;function et(){document.getElementById("modal-inspecionar-usuario").style.display="none"}window.fecharModalInspecionarUsuario=et;
