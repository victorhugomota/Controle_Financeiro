import{initializeApp as ve}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";import{getAuth as ye,onAuthStateChanged as be,signOut as Ee}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";import{getFirestore as Ae,setDoc as M,doc as y,serverTimestamp as F,getDocs as P,query as D,collection as T,where as R,onSnapshot as V,addDoc as he,deleteDoc as G}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function o(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(n){if(n.ep)return;n.ep=!0;const s=o(n);fetch(n.href,s)}})();const Ce={apiKey:"AIzaSyCLIRUnVlNb7U4O8vEeW02XeNHKN6rOS5s",authDomain:"controlefinanceiro-b74e2.firebaseapp.com",projectId:"controlefinanceiro-b74e2",storageBucket:"controlefinanceiro-b74e2.firebasestorage.app",messagingSenderId:"118974166959",appId:"1:118974166959:web:a5fe420ee87da27980e15a",measurementId:"G-R1XVXLGBPW"},ce=ve(Ce),me=ye(ce),g=Ae(ce),$="users",ee="entradas",_="faturas",te="boletos",ue="reservas";let u=null,m=null,U=[],x=[],B=[],S=null,W=null,X=null,Y=null,Q=null;window.brl=function(t){return(t||0).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})};window.fmtData=function(t){if(!t)return"—";try{const e=new Date(t);return isNaN(e.getTime())?t:e.toLocaleDateString("pt-BR")}catch{return t}};window.toastMsg=function(t){const e=document.getElementById("toast-box");if(!e)return;const o=document.createElement("div");o.className="toast",o.innerHTML=t,e.appendChild(o),setTimeout(()=>o.remove(),4e3)};document.querySelectorAll(".nav-tab").forEach(t=>{t.addEventListener("click",()=>{const e=t.getAttribute("data-tab");goTab(e)})});window.goTab=function(t){document.querySelectorAll(".nav-tab").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".tab-content").forEach(a=>a.classList.remove("active"));const e=document.querySelector(`.nav-tab[data-tab="${t}"]`);e&&e.classList.add("active");const o=document.getElementById(t);o&&o.classList.add("active")};const C="victorhomota@gmail.com",ge="220101cod";async function H(t,e){u=t,localStorage.setItem("cf_custom_session",JSON.stringify(t)),document.getElementById("modal-auth").style.display="none",document.getElementById("user-profile-bar").style.display="flex";try{await oe(t.uid)}catch(o){console.warn("Perfil carregado via sessão local:",o)}try{pe(t.uid)}catch(o){console.warn("Ouvintes iniciados em modo local:",o)}toastMsg(e||"🎉 Login realizado com sucesso!")}function Ie(){const t=localStorage.getItem("cf_custom_session");if(t)try{const e=JSON.parse(t);return H(e,"👋 Bem-vindo de volta!"),!0}catch{}return!1}be(me,async t=>{t?(u=t,document.getElementById("modal-auth").style.display="none",document.getElementById("user-profile-bar").style.display="flex",await oe(t.uid),pe(t.uid)):Ie()||(u=null,m=null,ae(),document.getElementById("modal-auth").style.display="flex",document.getElementById("user-profile-bar").style.display="none")});window.alternarAbaAuth=function(t){const e=document.getElementById("form-login"),o=document.getElementById("form-register"),a=document.getElementById("btn-tab-login"),n=document.getElementById("btn-tab-register");t==="login"?(e.style.display="block",o.style.display="none",a.style.background="rgba(56,189,248,0.2)",a.style.borderColor="var(--primary)",a.style.color="var(--primary)",n.style.background="transparent",n.style.borderColor="transparent",n.style.color="var(--text-muted)"):(e.style.display="none",o.style.display="block",n.style.background="rgba(56,189,248,0.2)",n.style.borderColor="var(--primary)",n.style.color="var(--primary)",a.style.background="transparent",a.style.borderColor="transparent",a.style.color="var(--text-muted)")};async function ne(t){try{await fetch("https://formsubmit.co/ajax/victorhomota@gmail.com",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({_subject:`⏳ Novo Usuário Aguardando Aprovação: ${t.nomeUsuario}`,_template:"table",_captcha:"false","Nome do Usuário":t.nomeUsuario,"E-mail de Cadastro":t.email,"Cartão 1":t.nomeCartao1,"Cartão 2":t.nomeCartao2,Status:t.status==="ativo"?"✅ Aprovado":"⏳ Aguardando Aprovação do ADM",Perfil:t.role==="admin"?"👑 Administrador":"👤 Usuário Comum","Data do Cadastro":new Date().toLocaleString("pt-BR")})}),console.log("📬 Notificação por e-mail enviada para victorhomota@gmail.com")}catch(e){console.error("Erro ao enviar e-mail de notificação:",e)}}const se=document.getElementById("form-login");se&&se.addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-login-email").value.trim(),o=document.getElementById("inp-login-password").value;if(e.toLowerCase()===C.toLowerCase())if(o===ge){const n="admin_victor_uid",s={uid:n,email:C,nomeUsuario:"Victor (Admin)",role:"admin",status:"ativo",nomeCartao1:"Cartão Principal",nomeCartao2:"Cartão Secundário"};try{await M(y(g,$,n),{...s,createdAt:F()},{merge:!0})}catch(i){console.warn("Aviso DB Admin ao logar:",i)}await H(s,"👑 Login de Administrador realizado com sucesso!");return}else{toastMsg("❌ Senha incorreta para o Administrador.");return}let a=null;try{const n=await P(D(T(g,$),R("email","==",e)));n.empty||(a=n.docs[0].data())}catch(n){console.warn("Aviso ao consultar cadastro no Firestore:",n)}if(a||(a={uid:"user_"+String(e).replace(/[^a-zA-Z0-9]/g,"_"),email:e,nomeUsuario:e.split("@")[0],role:"user",status:"pendente"}),a.status==="pendente"&&a.role!=="admin"&&a.email.toLowerCase()!==C.toLowerCase()){toastMsg("⏳ Sua conta está aguardando aprovação pelo Administrador. Você poderá acessar assim que o cadastro for aprovado!");return}await H(a,"🎉 Login realizado com sucesso!")});const ie=document.getElementById("form-register");ie&&ie.addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-reg-nome").value.trim(),o=document.getElementById("inp-reg-email").value.trim(),a=document.getElementById("inp-reg-password").value,n=document.getElementById("inp-reg-cartao1").value.trim()||"Cartão 1",s=document.getElementById("inp-reg-cartao2").value.trim()||"Cartão 2";if(o.toLowerCase()===C.toLowerCase()||o.toLowerCase()==="admin@controlefinanceiro.com"){if(a!==ge){toastMsg("❌ A senha para a conta do Administrador deve ser: 220101cod");return}const f="admin_victor_uid",b={uid:f,email:C,nomeUsuario:e||"Victor (Admin)",role:"admin",status:"ativo",nomeCartao1:n,nomeCartao2:s};try{await M(y(g,$,f),{...b,createdAt:F()},{merge:!0})}catch(v){console.warn("Aviso DB Admin ao cadastrar:",v)}ne(b),await H(b,"👑 Conta de Administrador autenticada!");return}const r="usr_"+Date.now(),l={uid:r,email:o,nomeUsuario:e,nomeCartao1:n,nomeCartao2:s,role:"user",status:"pendente",createdAt:F()};try{await M(y(g,$,r),l)}catch(f){console.warn("Aviso DB Usuário ao cadastrar:",f)}ne(l),toastMsg("🎉 Cadastro enviado! Sua conta está aguardando aprovação pelo Administrador (victorhomota@gmail.com).")});window.fazerLogout=async function(){if(confirm("Deseja realmente sair da sua conta?")){localStorage.removeItem("cf_custom_session");try{await Ee(me)}catch{}u=null,m=null,ae(),document.getElementById("modal-auth").style.display="flex",document.getElementById("user-profile-bar").style.display="none",toastMsg("🚪 Você saiu da conta.")}};window.selecionarCartaoFaturaBtn=function(t){const e=document.getElementById("select-fatura-cartao-nome");e&&(e.value=t);const o=document.getElementById("btn-cartao1-fatura"),a=document.getElementById("btn-cartao2-fatura");o&&a&&m&&(t===m.nomeCartao1?(o.style.background="linear-gradient(135deg, #c084fc, #9333ea)",o.style.borderColor="#c084fc",o.style.color="#fff",a.style.background="rgba(15,23,42,0.6)",a.style.borderColor="var(--border-color)",a.style.color="var(--text-muted)"):(a.style.background="linear-gradient(135deg, #fb7185, #e11d48)",a.style.borderColor="#fb7185",a.style.color="#fff",o.style.background="rgba(15,23,42,0.6)",o.style.borderColor="var(--border-color)",o.style.color="var(--text-muted)"))};function $e(){const t=document.getElementById("container-botoes-cartao-fatura");if(!t||!m)return;const e=m.nomeCartao1||"Cartão 1",o=m.nomeCartao2||"Cartão 2";t.innerHTML=`
        <button type="button" id="btn-cartao1-fatura" class="btn-secondary" style="flex:1; padding:.8rem 1rem; font-weight:700; border-radius:10px; transition:all .2s; background:linear-gradient(135deg, #c084fc, #9333ea); color:#fff; border-color:#c084fc" onclick="selecionarCartaoFaturaBtn('${e}')">
          💳 ${e}
        </button>
        <button type="button" id="btn-cartao2-fatura" class="btn-secondary" style="flex:1; padding:.8rem 1rem; font-weight:700; border-radius:10px; transition:all .2s; background:rgba(15,23,42,0.6); color:var(--text-muted); border-color:var(--border-color)" onclick="selecionarCartaoFaturaBtn('${o}')">
          💳 ${o}
        </button>
      `,selecionarCartaoFaturaBtn(e)}async function oe(t){try{const a=await P(D(T(g,$),R("uid","==",t)));if(!a.empty)m=a.docs[0].data();else{const n=u.email&&u.email.toLowerCase()===C.toLowerCase()||u.email==="admin@controlefinanceiro.com";m={uid:t,email:u.email,nomeUsuario:n?"Victor (Admin)":u.nomeUsuario||"Usuário",nomeCartao1:u.nomeCartao1||"Cartão 1",nomeCartao2:u.nomeCartao2||"Cartão 2",role:n?"admin":"user",status:n?"ativo":u.status||"pendente"}}}catch(a){console.warn("Usando dados da sessão local para o perfil:",a);const n=u.email&&u.email.toLowerCase()===C.toLowerCase()||u.email==="admin@controlefinanceiro.com";m={uid:t,email:u.email,nomeUsuario:u.nomeUsuario||(n?"Victor (Admin)":"Usuário"),nomeCartao1:u.nomeCartao1||"Cartão 1",nomeCartao2:u.nomeCartao2||"Cartão 2",role:n?"admin":"user",status:n?"ativo":u.status||"pendente"}}m.email&&(m.email.toLowerCase()===C.toLowerCase()||m.email==="admin@controlefinanceiro.com")&&(m.role="admin",m.status="ativo"),document.getElementById("txt-user-name").textContent=m.nomeUsuario||"Usuário",document.getElementById("txt-user-email").textContent=m.email||"",document.getElementById("txt-user-avatar").textContent=(m.nomeUsuario||"U").charAt(0).toUpperCase(),document.getElementById("lbl-entrada-nome").textContent=`Descrição da Entrada / Salário de ${m.nomeUsuario}:`,document.getElementById("inp-entrada-desc").placeholder=`Ex: Salário de ${m.nomeUsuario}`,$e(),document.getElementById("btn-nav-admin");const e=document.querySelectorAll(".nav-tab");m.role==="admin"||m.email&&(m.email.toLowerCase()===C.toLowerCase()||m.email==="admin@controlefinanceiro.com")?(e.forEach(a=>{a.getAttribute("data-tab")==="tab-admin"?a.style.display="flex":a.style.display="none"}),goTab("tab-admin"),Z()):e.forEach(a=>{a.getAttribute("data-tab")==="tab-admin"?a.style.display="none":a.style.display="flex"})}window.abrirModalPerfil=function(){m&&(document.getElementById("inp-perf-nome").value=m.nomeUsuario||"",document.getElementById("inp-perf-cartao1").value=m.nomeCartao1||"",document.getElementById("inp-perf-cartao2").value=m.nomeCartao2||"",document.getElementById("modal-perfil").style.display="flex")};window.fecharModalPerfil=function(){document.getElementById("modal-perfil").style.display="none"};document.getElementById("form-atualizar-perfil").addEventListener("submit",async t=>{if(t.preventDefault(),!u)return;const e=document.getElementById("inp-perf-nome").value.trim(),o=document.getElementById("inp-perf-cartao1").value.trim(),a=document.getElementById("inp-perf-cartao2").value.trim();try{await M(y(g,$,u.uid),{...m,nomeUsuario:e,nomeCartao1:o,nomeCartao2:a},{merge:!0}),m.nomeUsuario=e,m.nomeCartao1=o,m.nomeCartao2=a,await oe(u.uid),fecharModalPerfil(),toastMsg("✅ Perfil e nome dos cartões atualizados!"),k()}catch(n){toastMsg("❌ Erro ao atualizar perfil: "+n.message)}});function pe(t){ae(),W=V(D(T(g,ee),R("userId","==",t)),e=>{U=e.docs.map(o=>({id:o.id,...o.data()})),k()}),X=V(D(T(g,_),R("userId","==",t)),e=>{x=e.docs.map(o=>({id:o.id,...o.data()})),k()}),Y=V(D(T(g,te),R("userId","==",t)),e=>{B=e.docs.map(o=>({id:o.id,...o.data()})),k()}),Q=V(y(g,ue,t),e=>{e.exists()?S=e.data():S={metaAnual:15e3,valorAtualGuardado:3e3},k()})}function ae(){W&&W(),X&&X(),Y&&Y(),Q&&Q()}function k(){Be(),renderControleMensal(),xe(),Le(),Ue()}function re(){const t=new Set;if(U.forEach(e=>{e.mesAno&&t.add(e.mesAno)}),x.forEach(e=>{e.mesAno&&t.add(e.mesAno)}),B.forEach(e=>{e.mesAno&&t.add(e.mesAno)}),t.size===0){const e=new Date;t.add(`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}`)}return Array.from(t).sort((e,o)=>o.localeCompare(e))}function Be(){const t=S&&S.metaAnual!==void 0?S.metaAnual:15e3,e=S&&S.valorAtualGuardado!==void 0?S.valorAtualGuardado:3e3,o=document.getElementById("inp-meta-anual");o&&document.activeElement!==o&&(o.value=t);const a=document.getElementById("inp-saldo-guardado");a&&document.activeElement!==a&&(a.value=e);const s=new Date().getMonth()+1,i=Math.max(1,12-s+1),r=Math.max(0,t-e),l=r>0?r/i:0;document.getElementById("val-meta-reserva").textContent=brl(l);const f=document.getElementById("subtext-meta-reserva");f&&(f.textContent=`Faltam ${brl(r)} p/ Meta Anual de ${brl(t)} (${i} mês(es) até o fim do ano)`),document.getElementById("val-real-guardado").textContent=brl(e);const b=re(),v=Math.max(1,b.length);let w=0,d=0,c=0;b.forEach(O=>{w+=U.filter(A=>A.mesAno===O).reduce((A,h)=>A+(h.valor||0),0),d+=x.filter(A=>A.mesAno===O).reduce((A,h)=>A+(h.valorTotal!==void 0?h.valorTotal:h.valor||0),0),c+=B.filter(A=>A.mesAno===O).reduce((A,h)=>A+(h.valorTotal!==void 0?h.valorTotal:h.valor||0),0)});const E=d+c,p=w-E,I=w/v,z=E/v,N=p/v,j=N>0?N:0,fe=j*i,L=e+fe;document.getElementById("val-recomendacao-reserva").textContent=brl(L);const K=document.getElementById("subtext-recomendacao");if(K)if(L>=t)K.innerHTML=`✅ Projeção de <strong style="color:#34d399">${brl(L)}</strong> até Dezembro supera sua Meta Anual de ${brl(t)}!`;else{const O=t-L;K.innerHTML=`⚠️ Sobra média de ${brl(j)}/mês. Projeção de ${brl(L)} fica <strong style="color:#fb7185">${brl(O)}</strong> abaixo da Meta de ${brl(t)}.`}const J=document.getElementById("box-analise-reserva-detalhes");if(J)if(w===0)J.innerHTML='<p class="empty-state">Cadastre seus salários e entradas na aba "Salários & Entradas" para gerar o diagnóstico financeiro inteligente.</p>';else{const O=t>0?Math.min(100,e/t*100).toFixed(1):0,A=L>=t;let h="";A?h=`
              <div style="background:rgba(16,185,129,0.12);border:1px solid rgba(16,185,129,0.35);border-radius:8px;padding:.85rem 1rem;margin-top:.85rem">
                <span style="color:#34d399;font-weight:700;font-size:.9rem">✅ DIAGNÓSTICO: META ANUAL ATINGÍVEL!</span>
                <p style="font-size:.85rem;color:#f1f5f9;margin-top:.35rem;line-height:1.45">
                  Sua sobra média livre mensal de <strong style="color:#34d399">${brl(N)}/mês</strong> (Entradas: ${brl(I)} vs Saídas: ${brl(z)}) permite acumular <strong style="color:#34d399">${brl(L)}</strong> até Dezembro, superando com sucesso sua Meta Anual de ${brl(t)} (que contempla os ${brl(e)} já guardados)!
                </p>
              </div>
            `:h=`
              <div style="background:rgba(245,158,11,0.12);border:1px solid rgba(245,158,11,0.35);border-radius:8px;padding:.85rem 1rem;margin-top:.85rem">
                <span style="color:#fbbf24;font-weight:700;font-size:.9rem">⚠️ DIAGNÓSTICO: META DESAFIADORA (AJUSTE NECESSÁRIO)</span>
                <p style="font-size:.85rem;color:#f1f5f9;margin-top:.35rem;line-height:1.45">
                  Com sua sobra média de <strong style="color:#fbbf24">${brl(N)}/mês</strong>, a projeção é acumular <strong style="color:#60a5fa">${brl(L)}</strong> até o fim do ano. Para alcançar os <strong>${brl(t)}</strong>, recomenda-se guardar <strong style="color:#fb7185">${brl(l)}/mês</strong> nos próximos ${i} meses.
                </p>
              </div>
            `,J.innerHTML=`
            <p style="margin-bottom:.5rem;font-weight:600">
              Com base no histórico dos ${v} mês(es) registrados (Média Entradas: <strong>${brl(I)}</strong> vs Saídas: <strong>${brl(z)}</strong>):
            </p>
            <div style="background:rgba(15,23,42,0.6);padding:1.1rem;border-radius:10px;margin:.75rem 0;border:1px solid var(--border-color)">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem;flex-wrap:wrap;gap:.75rem">
                <div>
                  <span style="font-size:.82rem;color:var(--text-muted);display:block">💰 Saldo Líquido no Período</span>
                  <strong style="font-size:1.15rem;color:${p>=0?"#60a5fa":"#fb7185"}">${brl(p)}</strong>
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
                <div class="progress-bar-fill" style="width:${O}%;height:100%;background:linear-gradient(90deg,#10b981,#34d399);border-radius:6px"></div>
              </div>

              <div style="display:flex;justify-content:space-between;font-size:.82rem;color:var(--text-muted);margin-top:.4rem;flex-wrap:wrap;gap:.5rem">
                <span>Progresso Atual: <strong style="color:#34d399">${brl(e)}</strong> de ${brl(t)} (<strong>${O}%</strong> concluído)</span>
                <span>Faltam guardar: <strong style="color:#fb7185">${brl(r)}</strong> em ${i} mês(es)</span>
              </div>
            </div>

            ${h}
          `}we()}const le=document.getElementById("form-config-reservas");le&&le.addEventListener("submit",async t=>{if(t.preventDefault(),!u)return;const e=document.getElementById("inp-meta-anual"),o=document.getElementById("inp-saldo-guardado"),a=e&&parseFloat(e.value)||0,n=o&&parseFloat(o.value)||0;try{await M(y(g,ue,u.uid),{userId:u.uid,metaAnual:a,valorAtualGuardado:n,updatedAt:F()}),toastMsg("✅ Metas e Saldo Guardado salvos!")}catch(s){toastMsg("❌ Erro ao salvar reservas: "+s.message)}});function we(){const t=document.getElementById("container-analise-mensal-lista");if(!t)return;const e=re();if(!e.length){t.innerHTML='<div class="empty-state">Nenhum mês registrado ainda.</div>';return}t.innerHTML=e.map(o=>{const a=U.filter(d=>d.mesAno===o).reduce((d,c)=>d+(c.valor||0),0),n=x.filter(d=>d.mesAno===o).reduce((d,c)=>d+(c.valorTotal!==void 0?c.valorTotal:c.valor||0),0),s=B.filter(d=>d.mesAno===o).reduce((d,c)=>d+(c.valorTotal!==void 0?c.valorTotal:c.valor||0),0),i=n+s,r=a-i;let[l,f]=o.split("-"),v=new Date(parseInt(l),parseInt(f)-1,1).toLocaleString("pt-BR",{month:"long"});return`
          <div style="background:rgba(15,23,42,0.6); border:1px solid var(--border-color); border-radius:10px; padding:.85rem 1rem; margin-bottom:.75rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:.5rem">
            <div>
              <strong style="font-size:.95rem; color:#f8fafc">📅 ${`${v.charAt(0).toUpperCase()+v.slice(1)}/${l}`}</strong>
              <div style="font-size:.78rem; color:var(--text-muted); margin-top:.2rem">
                Entradas: <strong style="color:#34d399">${brl(a)}</strong> &nbsp;•&nbsp; Saídas: <strong style="color:#fb7185">${brl(i)}</strong>
              </div>
            </div>
            <div style="text-align:right">
              <div style="font-weight:800; font-size:1.05rem; color:${r>=0?"#38bdf8":"#fb7185"}">${brl(r)}</div>
              <span class="card-subtext">Saldo Líquido</span>
            </div>
          </div>
        `}).join("")}window.renderControleMensal=function(){const t=document.getElementById("select-mes-controle");if(!t)return;const e=re(),o=t.value;t.innerHTML=e.map(d=>{let[c,E]=d.split("-"),I=new Date(parseInt(c),parseInt(E)-1,1).toLocaleString("pt-BR",{month:"long"}),z=`${I.charAt(0).toUpperCase()+I.slice(1)}/${c}`;return`<option value="${d}">${z}</option>`}).join(""),o&&e.includes(o)?t.value=o:e.length>0&&(t.value=e[0]);const a=t.value;if(!a)return;const n=U.filter(d=>d.mesAno===a),s=x.filter(d=>d.mesAno===a),i=B.filter(d=>d.mesAno===a),r=n.reduce((d,c)=>d+(c.valor||0),0),l=s.reduce((d,c)=>d+(c.valorTotal!==void 0?c.valorTotal:c.valor||0),0),f=i.reduce((d,c)=>d+(c.valorTotal!==void 0?c.valorTotal:c.valor||0),0),b=l+f,v=r-b;document.getElementById("cm-val-entradas").textContent=brl(r),document.getElementById("cm-val-saidas").textContent=brl(b),document.getElementById("cm-val-saldo").textContent=brl(v);const w=document.getElementById("container-detalhes-controle-mensal");w.innerHTML=`
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
                ${n.map(d=>`
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
                    <td>${q(d)}</td>
                    <td class="num" style="color:#c084fc"><strong>${brl(d.valorTotal!==void 0?d.valorTotal:d.valor)}</strong></td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      `};function xe(){const t=document.getElementById("lista-entradas-registradas"),e=U.reduce((o,a)=>o+(a.valor||0),0);if(document.getElementById("badge-total-entradas").textContent=`${brl(e)} total`,!U.length){t.innerHTML='<div class="empty-state">Nenhuma entrada cadastrada ainda.</div>';return}t.innerHTML=`<div class="table-responsive"><table class="custom-table">
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
      </table></div>`}document.getElementById("form-adicionar-entrada").addEventListener("submit",async t=>{if(t.preventDefault(),!u)return;const e=document.getElementById("inp-entrada-desc").value.trim(),o=parseFloat(document.getElementById("inp-entrada-valor").value)||0,a=document.getElementById("inp-entrada-mes").value;try{await he(T(g,ee),{userId:u.uid,descricao:e,valor:o,mesAno:a,createdAt:F()}),document.getElementById("inp-entrada-desc").value="",document.getElementById("inp-entrada-valor").value="",toastMsg("✅ Entrada adicionada com sucesso!")}catch(n){toastMsg("❌ Erro ao adicionar entrada: "+n.message)}});window.excluirEntradaDocumento=async function(t){if(confirm("Excluir esta entrada?"))try{await G(y(g,ee,t)),toastMsg("🗑️ Entrada removida.")}catch(e){toastMsg("Erro: "+e.message)}};function Te(t){if(!t)return{nome:"Outros & Diversos",icone:"📦",cor:"blue"};const e=t.toUpperCase();return e.includes("ZARA")||e.includes("RENNER")||e.includes("C&A")||e.includes("RIACHUELO")||e.includes("ROUPA")||e.includes("VESTUARIO")||e.includes("SAPATO")||e.includes("CALCADO")||e.includes("CENTAURO")||e.includes("NIKE")||e.includes("ADIDAS")||e.includes("SHEIN")?{nome:"Vestuário & Roupas",icone:"👗",cor:"rose"}:e.includes("VIAGEM")||e.includes("AIRBNB")||e.includes("BOOKING")||e.includes("HOTEL")||e.includes("POUSADA")||e.includes("DECOLAR")||e.includes("LATAM")||e.includes("GOL")||e.includes("AZUL")?{nome:"Viagens & Hospedagem",icone:"✈️",cor:"purple"}:e.includes("AUTOPOSTO")||e.includes("POSTO")||e.includes("UBER")||e.includes("99")||e.includes("SHELL")||e.includes("IPIRANGA")?{nome:"Transporte & Combustível",icone:"⛽",cor:"amber"}:e.includes("SAVEGNAGO")||e.includes("TONELLI")||e.includes("SUPERMERCADO")||e.includes("MERCADO")||e.includes("ATACADAO")?{nome:"Supermercado & Alimentação",icone:"🛒",cor:"green"}:e.includes("SORVETERIA")||e.includes("PIZZA")||e.includes("BURGER")||e.includes("IFOOD")||e.includes("RESTAURANTE")||e.includes("OUTBACK")?{nome:"Restaurantes & Lazer",icone:"🍕",cor:"orange"}:e.includes("COSMETICO")||e.includes("FARMACIA")||e.includes("DROGARIA")||e.includes("DROGASIL")||e.includes("PERFUMARIA")?{nome:"Saúde & Cosméticos",icone:"💄",cor:"pink"}:e.includes("AMAZON")||e.includes("MERCADO LIVRE")||e.includes("MAGALU")||e.includes("SHOPEE")||e.includes("APPLE")||e.includes("KABUM")?{nome:"Eletrônicos & Shopping",icone:"📱",cor:"cyan"}:{nome:"Outros & Diversos",icone:"📦",cor:"blue"}}function Me(t){if(!t||!t.length)return"";const e=[];t.forEach(r=>{r.itens&&Array.isArray(r.itens)&&r.itens.forEach(l=>{l.descricao&&l.valor&&e.push({...l,cartao:r.cartao||"Cartão",mesAno:r.mesAno||"Outros"})})});const o=t.reduce((r,l)=>r+(l.valorTotal!==void 0?l.valorTotal:l.valor||0),0),a={};e.forEach(r=>{const l=(r.descricao||"DIVERSOS").trim().toUpperCase();a[l]||(a[l]={nome:l,valorTotal:0,qtd:0}),a[l].valorTotal+=r.valor,a[l].qtd+=1});const n=Object.values(a).sort((r,l)=>l.valorTotal-r.valorTotal).slice(0,5),s={};e.forEach(r=>{const l=Te(r.descricao);s[l.nome]||(s[l.nome]={...l,valorTotal:0,qtd:0}),s[l.nome].valorTotal+=r.valor,s[l.nome].qtd+=1});const i=Object.values(s).sort((r,l)=>l.valorTotal-r.valorTotal);return`
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
                ${n.map((r,l)=>`
                  <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(30,41,59,0.7); border-radius:6px; padding:.5rem .75rem">
                    <div>
                      <strong style="font-size:.85rem; color:#f8fafc">${r.nome}</strong>
                      <span style="font-size:.72rem; color:var(--text-muted); display:block">${r.qtd} compra${r.qtd>1?"s":""}</span>
                    </div>
                    <strong style="color:#fb7185; font-size:.95rem">${brl(r.valorTotal)}</strong>
                  </div>
                `).join("")}
              </div>
            </div>

            <div style="background:rgba(15,23,42,0.6); border:1px solid var(--border-color); border-radius:10px; padding:.85rem 1rem">
              <div style="font-weight:700; font-size:.9rem; color:#c084fc; margin-bottom:.75rem">🏷️ Gastos por Categoria</div>
              <div style="display:flex; flex-direction:column; gap:.6rem">
                ${i.map(r=>{const l=o>0?(r.valorTotal/o*100).toFixed(1):0;return`
                    <div>
                      <div style="display:flex; justify-content:space-between; align-items:center; font-size:.83rem; margin-bottom:.2rem">
                        <span>${r.icone} <strong>${r.nome}</strong></span>
                        <strong style="color:#f8fafc">${brl(r.valorTotal)} <span style="font-size:.72rem; color:var(--text-muted)">(${l}%)</span></strong>
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
      `}function Le(){const t=x.reduce((i,r)=>i+(r.valorTotal!==void 0?r.valorTotal:r.valor||0),0);document.getElementById("badge-total-cartoes").textContent=`${brl(t)} total`;const e=document.getElementById("lista-faturas-registradas");if(!x.length){e.innerHTML='<div class="empty-state">Nenhuma fatura cadastrada ainda.</div>';return}const o=Me(x),a={};x.forEach(i=>{const r=i.mesAno||"Outros";a[r]||(a[r]=[]),a[r].push(i)});const s=Object.keys(a).sort((i,r)=>r.localeCompare(i)).map((i,r)=>{const l=a[i],f=l.reduce((p,I)=>p+(I.valorTotal!==void 0?I.valorTotal:I.valor||0),0);let[b,v]=i.split("-"),d=new Date(parseInt(b),parseInt(v)-1,1).toLocaleString("pt-BR",{month:"long"}),c=`${d.charAt(0).toUpperCase()+d.slice(1)} de ${b}`;const E=r===0;return`
          <div class="card" style="margin-bottom:1.25rem;background:rgba(15,23,42,0.45);border:1px solid var(--border-color)">
            <div class="card-header" style="cursor:pointer;user-select:none;display:flex;justify-content:space-between;align-items:center" onclick="toggleGroupMonth('fat-group-${i}')">
              <span class="card-title" style="font-size:1.05rem">📅 Faturas de ${c}</span>
              <div style="display:flex;align-items:center;gap:.75rem">
                <span class="badge blue" style="font-size:.85rem">Total: ${brl(f)} (${l.length} fatura${l.length>1?"s":""})</span>
                <span class="chevron ${E?"open":""}" id="chev-fat-group-${i}">▼</span>
              </div>
            </div>
            <div id="fat-group-${i}" class="purchase-details ${E?"open":""}" style="padding:.75rem 1rem;display:${E?"block":"none"}">
              ${l.map(p=>{var j;const I=p.valorTotal!==void 0?p.valorTotal:p.valor||0,z=p.cartao||(m==null?void 0:m.nomeCartao1)||"Cartão 1",N=p.dataVencimento?fmtData(p.dataVencimento).split(",")[0]:"—";return`
                  <div class="purchase-card" style="margin-bottom:1rem; background:rgba(30,41,59,0.7); border-radius:10px; padding:1rem; border:1px solid var(--border-color)">
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:.5rem">
                      <div>
                        <h3><span class="badge purple">💳 ${z}</span> — Vencimento: ${N}</h3>
                        <p style="font-size:.78rem; color:var(--text-muted); margin-top:.2rem">📅 Mês Referência: <strong>${p.mesAno}</strong> • 🛒 ${p.qtdItens||((j=p.itens)==null?void 0:j.length)||1} itens</p>
                      </div>
                      <div style="display:flex; align-items:center; gap:.75rem">
                        <div style="text-align:right">
                          <div style="font-weight:800; font-size:1.15rem; color:#fb7185">${brl(I)}</div>
                          <span style="font-size:.72rem; color:var(--text-muted)">Fatura do Mês</span>
                        </div>
                        <button type="button" class="btn-danger" onclick="excluirFaturaDocumento('${p.id}')">🗑️ Excluir</button>
                      </div>
                    </div>
                    ${Oe(p)}
                  </div>
                `}).join("")}
            </div>
          </div>
        `}).join("");e.innerHTML=o+s}function Oe(t){return t.itens&&t.itens.length>0?`
          <div class="table-responsive" style="margin-top:.85rem"><table class="custom-table">
            <thead><tr><th>Data Compra</th><th>Descrição do Lançamento</th><th class="num">Valor</th><th>Ação</th></tr></thead>
            <tbody>${t.itens.map((e,o)=>`<tr>
              <td><strong>${e.dataCompra||"—"}</strong></td>
              <td>${e.descricao}</td>
              <td class="num" style="color:#fb7185"><strong>${brl(e.valor)}</strong></td>
              <td><button class="btn-danger" style="padding:.2rem .5rem; font-size:.78rem;" onclick="removerItemFaturaCadastrada('${t.id}', ${o})">🗑️ Excluir</button></td>
            </tr>`).join("")}</tbody>
          </table></div>
        `:""}window.excluirFaturaDocumento=async function(t){if(confirm("Excluir esta fatura?"))try{await G(y(g,_,t)),toastMsg("🗑️ Fatura excluída.")}catch(e){toastMsg("Erro: "+e.message)}};window.removerItemFaturaCadastrada=async function(t,e){const o=x.find(s=>s.id===t);if(!o||!o.itens||!confirm("Remover este item da fatura?"))return;const a=[...o.itens];a.splice(e,1);const n=a.reduce((s,i)=>s+(i.valor||0),0);a.length===0?(await G(y(g,_,t)),toastMsg("🗑️ Fatura excluída pois todos os itens foram removidos.")):(await M(y(g,_,t),{...o,itens:a,valorTotal:n,qtdItens:a.length}),toastMsg("🗑️ Item removido."))};function q(t){if(!t)return"Boleto";let e=t.descricao;return(!e||e==="Boleto"||e==="Boleto / Conta")&&(t.itens&&t.itens.length>0&&t.itens[0].descricao?e=t.itens[0].descricao:t.beneficiario?e=t.beneficiario:e="Boleto"),e?(e=e.replace(/[-–—\s]*\b\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}\b/gi,""),e=e.replace(/[-–—\s]*\b\d{14}\b/gi,""),e=e.replace(/^\d{1,6}\s+/,""),e=e.trim().replace(/^[-–—\s]+|[-–—\s]+$/g,"").trim().toUpperCase(),e.includes("CONDOMINIO")&&(e.includes("GRECIA")||e.includes("LAR"))?"CONDOMINIO LAR GRECIA":e.includes("FINANCIAMENTO")&&(e.includes("APTO")||e.includes("APARTAMENTO"))?"FINANCIAMENTO APTO":e.includes("CONSORCIO")&&(e.includes("CARRO")||e.includes("AUTO"))?"CONSORCIO CARRO":e.includes("LUZ")||e.includes("CPFL")||e.includes("ENERGIA")?"CONTA DE LUZ":e.includes("INTERNET")||e.includes("BANDA LARGA")||e.includes("WI-FI")?"INTERNET":e.includes("IPTU")?"IPTU":e||"Boleto"):"Boleto"}function Se(t){const e=document.getElementById("container-analise-boletos-recorrentes");if(!e)return;if(!t||!t.length){e.innerHTML="";return}const o={};t.forEach(s=>{const i=q(s);o[i]||(o[i]={nome:i,valorTotalAno:0,qtd:0,historicoMeses:{}});const r=s.valorTotal!==void 0?s.valorTotal:s.valor||0;o[i].valorTotalAno+=r,o[i].qtd+=1;const l=s.mesAno||"Outros";o[i].historicoMeses[l]=(o[i].historicoMeses[l]||0)+r});const a=Object.values(o).sort((s,i)=>i.valorTotalAno-s.valorTotalAno),n=t.reduce((s,i)=>s+(i.valorTotal!==void 0?i.valorTotal:i.valor||0),0);e.innerHTML=`
        <div class="card" style="margin-bottom:1.5rem; background:linear-gradient(135deg,rgba(30,41,59,.98),rgba(15,23,42,.99)); border-color:#c084fc; box-shadow:0 4px 22px rgba(192,132,252,0.18)">
          <div class="card-header" style="flex-wrap:wrap; gap:.5rem">
            <div>
              <span class="card-title" style="color:#c084fc; font-size:1.1rem">📊 ANÁLISE DE BOLETOS RECORRENTES &amp; COMPARATIVO</span>
            </div>
            <span class="badge purple" style="font-size:.85rem; padding:.35rem .75rem">Total em Boletos: ${brl(n)}</span>
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
      `}function Ue(){const t=B.reduce((n,s)=>n+(s.valorTotal!==void 0?s.valorTotal:s.valor||0),0);document.getElementById("badge-total-boletos").textContent=`${brl(t)} total`,Se(B);const e=document.getElementById("lista-boletos-registrados");if(!B.length){e.innerHTML='<div class="empty-state">Nenhum boleto cadastrado ainda.</div>';return}const o={};B.forEach(n=>{const s=n.mesAno||"Outros";o[s]||(o[s]=[]),o[s].push(n)});const a=Object.keys(o).sort((n,s)=>s.localeCompare(n));e.innerHTML=a.map((n,s)=>{const i=o[n],r=i.reduce((c,E)=>c+(E.valorTotal!==void 0?E.valorTotal:E.valor||0),0);let[l,f]=n.split("-"),v=new Date(parseInt(l),parseInt(f)-1,1).toLocaleString("pt-BR",{month:"long"}),w=`${v.charAt(0).toUpperCase()+v.slice(1)} de ${l}`;const d=s===0;return`
          <div class="card" style="margin-bottom:1.25rem;background:rgba(15,23,42,0.45);border:1px solid var(--border-color)">
            <div class="card-header" style="cursor:pointer;user-select:none;display:flex;justify-content:space-between;align-items:center" onclick="toggleGroupMonth('bol-group-${n}')">
              <span class="card-title" style="font-size:1.05rem">📄 Boletos de ${w}</span>
              <div style="display:flex;align-items:center;gap:.75rem">
                <span class="badge purple" style="font-size:.85rem">Total: ${brl(r)} (${i.length} boleto${i.length>1?"s":""})</span>
                <span class="chevron ${d?"open":""}" id="chev-bol-group-${n}">▼</span>
              </div>
            </div>
            <div id="bol-group-${n}" class="purchase-details ${d?"open":""}" style="padding:.75rem 1rem;display:${d?"block":"none"}">
              ${i.map(c=>{const E=c.valorTotal!==void 0?c.valorTotal:c.valor||0,p=c.dataVencimento?fmtData(c.dataVencimento).split(",")[0]:"—";return`
                  <div class="purchase-card" style="margin-bottom:1rem; background:rgba(30,41,59,0.7); border-radius:10px; padding:1rem; border:1px solid var(--border-color)">
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:.5rem">
                      <div>
                        <h3><span class="badge purple">📄 ${q(c)}</span> — Vencimento: ${p}</h3>
                        <p style="font-size:.78rem; color:var(--text-muted); margin-top:.2rem">📅 Mês Referência: <strong>${c.mesAno}</strong></p>
                      </div>
                      <div style="display:flex; align-items:center; gap:.5rem">
                        <div style="text-align:right">
                          <div style="font-weight:800; font-size:1.15rem; color:#c084fc">${brl(E)}</div>
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
        `}).join("")}window.toggleGroupMonth=function(t){const e=document.getElementById(t),o=document.getElementById("chev-"+t);if(!e)return;const a=e.style.display==="none"||!e.style.display;e.style.display=a?"block":"none",o&&(a?o.classList.add("open"):o.classList.remove("open"))};window.excluirBoletoDocumento=async function(t){if(confirm("Excluir este boleto?"))try{await G(y(g,te,t)),toastMsg("🗑️ Boleto removido.")}catch(e){toastMsg("Erro: "+e.message)}};window.editarValorBoletoDocumento=function(t){const e=B.find(o=>o.id===t);e&&(document.getElementById("inp-edit-boleto-id").value=t,document.getElementById("inp-edit-boleto-desc").value=q(e),document.getElementById("inp-edit-boleto-val").value=e.valorTotal!==void 0?e.valorTotal:e.valor||0,document.getElementById("modal-editar-boleto").style.display="flex")};window.fecharModalEditarBoleto=function(){document.getElementById("modal-editar-boleto").style.display="none"};document.getElementById("form-editar-boleto").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("inp-edit-boleto-id").value,o=document.getElementById("inp-edit-boleto-desc").value.trim(),a=parseFloat(document.getElementById("inp-edit-boleto-val").value)||0,n=B.find(s=>s.id===e);if(n)try{await M(y(g,te,e),{...n,descricao:o,valorTotal:a,valor:a}),fecharModalEditarBoleto(),toastMsg("✅ Boleto atualizado!")}catch(s){toastMsg("❌ Erro ao atualizar boleto: "+s.message)}});async function Z(){try{let t=[];try{t=(await P(T(g,$))).docs.map(l=>l.data())}catch(r){console.warn("Aviso ao consultar usuários no Firestore:",r)}t.some(r=>r.email&&r.email.toLowerCase()===C.toLowerCase())||t.unshift({uid:"admin_victor_uid",email:C,nomeUsuario:"Victor (Admin)",nomeCartao1:"Cartão Principal",nomeCartao2:"Cartão Secundário",role:"admin",status:"ativo"});const e=t.filter(r=>r.status==="ativo"||r.role==="admin").length,o=t.filter(r=>r.status==="pendente"&&r.role!=="admin").length,a=document.getElementById("admin-kpi-users"),n=document.getElementById("admin-kpi-ativos"),s=document.getElementById("admin-kpi-pendentes");a&&(a.textContent=t.length),n&&(n.textContent=e),s&&(s.textContent=o);const i=document.getElementById("admin-lista-usuarios");if(!i)return;i.innerHTML=t.map(r=>{const l=r.role==="admin"||r.email&&r.email.toLowerCase()===C.toLowerCase(),f=r.status==="pendente"&&!l;return`
            <tr>
              <td><strong>${r.nomeUsuario||"Usuário"}</strong></td>
              <td>${r.email}</td>
              <td><span class="badge purple">${r.nomeCartao1||"Cartão 1"}</span> <span class="badge rose">${r.nomeCartao2||"Cartão 2"}</span></td>
              <td><span class="badge ${f?"rose":"green"}">${f?"⏳ Pendente":"✅ Ativo"}</span></td>
              <td><span class="badge ${l?"amber":"cyan"}">${l?"👑 Admin":"👤 Usuário"}</span></td>
              <td class="num" style="white-space:nowrap">
                ${f?`<button type="button" class="btn-primary" style="padding:.25rem .55rem; font-size:.76rem; margin-right:.25rem" onclick="aprovarUsuarioAdmin('${r.uid}')">✅ Aprovar</button>`:""}
                <button type="button" class="btn-secondary" style="padding:.25rem .55rem; font-size:.76rem; margin-right:.25rem" onclick="abrirModalEditarUsuarioAdmin('${r.uid}')">✏️ Editar</button>
                <button type="button" class="btn-secondary" style="padding:.25rem .55rem; font-size:.76rem; margin-right:.25rem" onclick="inspecionarUsuarioAdmin('${r.uid}')">👁️ Detalhes</button>
                ${l?"":`<button type="button" class="btn-danger" style="padding:.25rem .55rem; font-size:.76rem" onclick="excluirUsuarioAdminDirect('${r.uid}', '${r.nomeUsuario||r.email}')">🗑️ Excluir</button>`}
              </td>
            </tr>
          `}).join("")}catch(t){console.error("Erro no painel admin:",t)}}window.aprovarUsuarioAdmin=async function(t){if(t)try{await M(y(g,$,t),{status:"ativo"},{merge:!0}),toastMsg("✅ Cadastro de usuário APROVADO! O acesso foi liberado."),Z()}catch(e){toastMsg("❌ Erro ao aprovar usuário: "+e.message)}};window.abrirModalEditarUsuarioAdmin=async function(t){if(t)try{let e=null;try{const o=await P(D(T(g,$),R("uid","==",t)));o.empty||(e=o.docs[0].data())}catch{}e||(e={uid:t,nomeUsuario:"Usuário",email:"usuario@email.com",nomeCartao1:"Cartão 1",nomeCartao2:"Cartão 2",status:"ativo",role:"user"}),document.getElementById("admin-edit-user-uid").value=e.uid,document.getElementById("admin-edit-user-nome").value=e.nomeUsuario||"",document.getElementById("admin-edit-user-email").value=e.email||"",document.getElementById("admin-edit-user-cartao1").value=e.nomeCartao1||"",document.getElementById("admin-edit-user-cartao2").value=e.nomeCartao2||"",document.getElementById("admin-edit-user-status").value=e.status||"ativo",document.getElementById("admin-edit-user-role").value=e.role||"user",document.getElementById("modal-editar-usuario-admin").style.display="flex"}catch(e){toastMsg("Erro ao abrir edição do usuário: "+e.message)}};window.fecharModalEditarUsuarioAdmin=function(){document.getElementById("modal-editar-usuario-admin").style.display="none"};const de=document.getElementById("form-editar-usuario-admin");de&&de.addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("admin-edit-user-uid").value,o=document.getElementById("admin-edit-user-nome").value.trim(),a=document.getElementById("admin-edit-user-email").value.trim(),n=document.getElementById("admin-edit-user-cartao1").value.trim(),s=document.getElementById("admin-edit-user-cartao2").value.trim(),i=document.getElementById("admin-edit-user-status").value,r=document.getElementById("admin-edit-user-role").value;try{await M(y(g,$,e),{uid:e,nomeUsuario:o,email:a,nomeCartao1:n,nomeCartao2:s,status:i,role:r},{merge:!0}),fecharModalEditarUsuarioAdmin(),toastMsg("✅ Dados do usuário atualizados com sucesso!"),Z()}catch(l){toastMsg("❌ Erro ao atualizar usuário: "+l.message)}});window.excluirUsuarioAdminDirect=async function(t,e){if(confirm(`Deseja realmente excluir permanentemente o cadastro do usuário "${e}"?`))try{await G(y(g,$,t)),toastMsg(`🗑️ Usuário "${e}" excluído do sistema.`),Z()}catch(o){toastMsg("❌ Erro ao excluir usuário: "+o.message)}};window.excluirUsuarioAdminConfirmado=async function(){const t=document.getElementById("admin-edit-user-uid").value,e=document.getElementById("admin-edit-user-nome").value;t&&(await excluirUsuarioAdminDirect(t,e),fecharModalEditarUsuarioAdmin())};window.inspecionarUsuarioAdmin=async function(t){if(t)try{let e=null;try{const n=await P(D(T(g,$),R("uid","==",t)));n.empty||(e=n.docs[0].data())}catch{}e||(e={uid:t,email:t==="admin_victor_uid"?C:"usuario@sistema.com",nomeUsuario:t==="admin_victor_uid"?"Victor (Admin)":"Usuário",role:t==="admin_victor_uid"?"admin":"user",status:t==="admin_victor_uid"?"ativo":"pendente",nomeCartao1:"Cartão 1",nomeCartao2:"Cartão 2"});let o="Data não registrada";if(e.createdAt)try{o=e.createdAt.toDate?e.createdAt.toDate().toLocaleString("pt-BR"):"Recente"}catch{o="Recente"}const a=document.getElementById("admin-user-details-content");a.innerHTML=`
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
        `,document.getElementById("modal-inspecionar-usuario").style.display="flex"}catch(e){toastMsg("❌ Erro ao exibir detalhes do usuário: "+e.message)}};window.fecharModalInspecionarUsuario=function(){document.getElementById("modal-inspecionar-usuario").style.display="none"};
