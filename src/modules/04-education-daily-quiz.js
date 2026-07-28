/**
 * OTTHI World Edu V643 — módulo-fonte
 * Arquivo: 04-education-daily-quiz.js
 * Escopo: Desafios diários, educação, quiz e coleção
 * Linhas de origem V642: 659-786
 *
 * Este arquivo é compilado em app.js por tools/build_project.py.
 * Não deve ser carregado diretamente por index.html.
 */
// @otthi-module-body
  function localDateKey(){const d=new Date();return`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
  function daysBetween(a,b){if(!a||!b)return 99;return Math.round((new Date(`${b}T12:00:00`)-new Date(`${a}T12:00:00`))/86400000)}
  function ensureDailyChallenges(){const key=localDateKey();if(state.daily.date===key&&state.daily.quests?.length)return;const gap=daysBetween(state.daily.lastDate,key);state.daily.streak=gap===1?(state.daily.streak||0)+1:gap===0?(state.daily.streak||1):1;let seed=Number(key.replaceAll('-',''));const pool=[...DAILY_QUEST_POOL],picked=[];while(picked.length<3&&pool.length){seed=(seed*9301+49297)%233280;const q=pool.splice(Math.floor(seed/233280*pool.length),1)[0];picked.push({id:q.id,progress:0,target:q.target,reward:q.reward,xp:q.xp,claimed:false});}state.daily={date:key,lastDate:key,streak:state.daily.streak||1,quests:picked};saveState();}
  function dailyDefinition(id){return DAILY_QUEST_POOL.find(q=>q.id===id)}
  function trackDaily(type,amount=1){
    ensureDailyChallenges();let changed=false,completedNow=false;
    for(const q of state.daily.quests){if(q.id!==type||q.claimed)continue;const before=q.progress;q.progress=clamp((q.progress||0)+amount,0,q.target);if(q.progress!==before){changed=true;if(before<q.target&&q.progress>=q.target)completedNow=true;}}
    if(!changed)return;updateDailyBadge();const now=performance.now();
    if(completedNow||!trackDaily.lastSave||now-trackDaily.lastSave>6000){trackDaily.lastSave=now;saveState();}
  }
  function updateDailyBadge(){if(!els.dailyBtn)return;ensureDailyChallenges();const ready=state.daily.quests.filter(q=>!q.claimed&&q.progress>=q.target).length;els.dailyBtn.classList.toggle('reward-ready',ready>0);const span=$('span',els.dailyBtn);if(span)span.textContent=ready?`Prêmio ${ready}`:'Desafios';}
  function claimDailyQuest(index){const q=state.daily.quests[index],def=dailyDefinition(q?.id);if(!q||!def||q.claimed||q.progress<q.target)return;q.claimed=true;addCoins(q.reward);addXP(q.xp);addReputation(3);beep(980,90);vibrate(30);toast(`Desafio concluído! +${q.reward} moedas`,'good',2200);saveState(true);openDailyChallenges();}
  const EDUCATION_SUBJECTS={
    math:{id:'math',title:'Matemática Kids',icon:'🔢',color:'#27b36a',description:'Contagem, soma, subtração, padrões e lógica.'},
    portuguese:{id:'portuguese',title:'Português Kids',icon:'📚',color:'#7b5ce6',description:'Letras, sílabas, palavras e frases.'},
    english:{id:'english',title:'English Kids',icon:'🌎',color:'#168de2',description:'Palavras, imagens, sons e expressões.'}
  };
  const WORD_BANK=[
    {pt:'CASA',en:'HOUSE',emoji:'🏠',syllables:['CA','SA']},{pt:'GATO',en:'CAT',emoji:'🐱',syllables:['GA','TO']},{pt:'BOLA',en:'BALL',emoji:'⚽',syllables:['BO','LA']},{pt:'SOL',en:'SUN',emoji:'☀️',syllables:['SOL']},{pt:'LIVRO',en:'BOOK',emoji:'📘',syllables:['LI','VRO']},{pt:'ÁGUA',en:'WATER',emoji:'💧',syllables:['Á','GUA']},{pt:'CARRO',en:'CAR',emoji:'🚗',syllables:['CAR','RO']},{pt:'CACHORRO',en:'DOG',emoji:'🐶',syllables:['CA','CHOR','RO']},{pt:'MAÇÃ',en:'APPLE',emoji:'🍎',syllables:['MA','ÇÃ']},{pt:'PEIXE',en:'FISH',emoji:'🐟',syllables:['PEI','XE']},{pt:'PÁSSARO',en:'BIRD',emoji:'🐦',syllables:['PÁS','SA','RO']},{pt:'LEITE',en:'MILK',emoji:'🥛',syllables:['LEI','TE']}
  ];
  const SUBJECT_LEVELS={
    math:[['Contagem divertida','Conte objetos e escolha o número.'],['Somas rápidas','Junte quantidades.'],['Subtração kids','Descubra quanto sobrou.'],['Complete a sequência','Encontre o número que falta.'],['Compare números','Maior, menor ou igual.'],['Desafio misto','Misture tudo o que aprendeu.']],
    portuguese:[['Primeira letra','Descubra como a palavra começa.'],['Imagem e palavra','Ligue a imagem ao nome.'],['Vogal perdida','Complete a palavra.'],['Monte a palavra','Coloque as sílabas na ordem.'],['Frase correta','Escolha a frase que faz sentido.'],['Desafio de leitura','Misture letras, palavras e frases.']],
    english:[['Picture words','Ligue imagem e palavra em inglês.'],['Português → English','Encontre a tradução.'],['Listen and choose','Ouça e escolha a palavra.'],['Missing letter','Complete a palavra em inglês.'],['Useful phrases','Aprenda frases simples.'],['English challenge','Misture tudo o que aprendeu.']]
  };
  function seeded(seed){let s=(Number(seed)||1)>>>0;return()=>((s=(s*1664525+1013904223)>>>0)/4294967296);}
  function shuffled(values,rand=Math.random){return [...values].sort(()=>rand()-.5);}
  function choiceSet(answer,candidates,rand){const pool=shuffled([...new Set(candidates.filter(x=>String(x)!==String(answer)))],rand).slice(0,3);return shuffled([answer,...pool],rand);}
  function mathRound(level,rand,index){
    const emoji=['🍎','⭐','🚗','🐟'][Math.floor(rand()*4)];
    if(level===1){const n=1+Math.floor(rand()*9);return{kind:'choice',visual:emoji.repeat(n),prompt:'Quantos objetos aparecem?',answer:String(n),options:choiceSet(String(n),[n-2,n-1,n+1,n+2].filter(x=>x>0).map(String),rand)};}
    if(level===2){const a=1+Math.floor(rand()*8),b=1+Math.floor(rand()*7),ans=a+b;return{kind:'choice',visual:`${emoji.repeat(a)} + ${emoji.repeat(b)}`,prompt:`Quanto é ${a} + ${b}?`,answer:String(ans),options:choiceSet(String(ans),[ans-2,ans-1,ans+1,ans+2].map(String),rand)};}
    if(level===3){const a=5+Math.floor(rand()*10),b=1+Math.floor(rand()*Math.min(8,a)),ans=a-b;return{kind:'choice',visual:`${a} − ${b}`,prompt:'Quanto sobrou?',answer:String(ans),options:choiceSet(String(ans),[ans-2,ans-1,ans+1,ans+2].filter(x=>x>=0).map(String),rand)};}
    if(level===4){const start=1+Math.floor(rand()*5),step=1+Math.floor(rand()*3),seq=[start,start+step,'?',start+step*3],ans=start+step*2;return{kind:'choice',visual:seq.join('  •  '),prompt:'Qual número completa a sequência?',answer:String(ans),options:choiceSet(String(ans),[ans-step,ans+step,ans+2,ans-1].map(String),rand)};}
    if(level===5){const a=1+Math.floor(rand()*20),b=1+Math.floor(rand()*20),ans=a===b?'=':a>b?'>':'<';return{kind:'choice',visual:`${a}  ?  ${b}`,prompt:'Escolha o sinal correto.',answer:ans,options:['>','<','=']};}
    return mathRound(1+Math.floor(rand()*5),rand,index);
  }
  function portugueseRound(level,rand,index){
    const word=WORD_BANK[Math.floor(rand()*WORD_BANK.length)];
    if(level===1){const ans=word.pt[0];return{kind:'choice',visual:word.emoji,prompt:`Com qual letra começa ${word.pt}?`,answer:ans,options:choiceSet(ans,['A','B','C','G','L','M','P','S','T'],rand)};}
    if(level===2){return{kind:'choice',visual:word.emoji,prompt:'Qual é o nome desta imagem?',answer:word.pt,options:choiceSet(word.pt,WORD_BANK.map(w=>w.pt),rand)};}
    if(level===3){const positions=[...word.pt].map((c,i)=>/[AEIOUÁÉÍÓÚÃÕ]/.test(c)?i:-1).filter(i=>i>=0),pos=positions[Math.floor(rand()*positions.length)]??1,ans=word.pt[pos],masked=[...word.pt];masked[pos]='_';return{kind:'choice',visual:word.emoji,prompt:`Complete: ${masked.join('')}`,answer:ans,options:choiceSet(ans,['A','E','I','O','U'],rand)};}
    if(level===4){return{kind:'sequence',visual:word.emoji,prompt:'Toque nas sílabas para montar a palavra.',answer:word.syllables.join(''),tokens:shuffled(word.syllables,rand),displayAnswer:word.pt};}
    if(level===5){const correct=`O ${word.pt.toLowerCase()} aparece na imagem.`;return{kind:'choice',visual:word.emoji,prompt:'Qual frase está escrita corretamente?',answer:correct,options:shuffled([correct,`A ${word.pt.toLowerCase()} aparecem na imagem.`,`Os ${word.pt.toLowerCase()} aparece na imagem.`],rand)};}
    return portugueseRound(1+Math.floor(rand()*5),rand,index);
  }
  function englishRound(level,rand,index){
    const word=WORD_BANK[Math.floor(rand()*WORD_BANK.length)];
    if(level===1){return{kind:'choice',visual:word.emoji,prompt:'Choose the English word.',answer:word.en,options:choiceSet(word.en,WORD_BANK.map(w=>w.en),rand),speak:word.en};}
    if(level===2){return{kind:'choice',visual:word.pt,prompt:`Como se diz “${word.pt.toLowerCase()}” em inglês?`,answer:word.en,options:choiceSet(word.en,WORD_BANK.map(w=>w.en),rand),speak:word.en};}
    if(level===3){return{kind:'choice',visual:'🔊',prompt:'Ouça e escolha a palavra.',answer:word.en,options:choiceSet(word.en,WORD_BANK.map(w=>w.en),rand),speak:word.en,autoSpeak:true};}
    if(level===4){const pos=Math.floor(rand()*word.en.length),ans=word.en[pos],masked=[...word.en];masked[pos]='_';return{kind:'choice',visual:word.emoji,prompt:`Complete: ${masked.join('')}`,answer:ans,options:choiceSet(ans,'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),rand),speak:word.en};}
    if(level===5){const phrases=[['HELLO','Olá'],['THANK YOU','Obrigado'],['GOOD MORNING','Bom dia'],['PLEASE','Por favor'],['GOODBYE','Tchau']],pair=phrases[Math.floor(rand()*phrases.length)];return{kind:'choice',visual:'💬',prompt:`Qual é o significado de “${pair[0]}”?`,answer:pair[1],options:choiceSet(pair[1],phrases.map(p=>p[1]),rand),speak:pair[0]};}
    return englishRound(1+Math.floor(rand()*5),rand,index);
  }
  function generateEducationRounds(subject,level=1,seed=Date.now(),count=5){const rand=seeded(seed+level*997),maker=subject==='math'?mathRound:subject==='portuguese'?portugueseRound:englishRound;return Array.from({length:count},(_,i)=>maker(level,rand,i));}
  function subjectLevelRecord(subject,level){return state.learning.lessons[`${subject}-${level}`]||{completed:false,stars:0,best:0,attempts:0};}
  function subjectUnlocked(subject,level){return level===1||subjectLevelRecord(subject,level-1).completed;}
  function educationSummary(){let done=0,total=0;for(const id of Object.keys(EDUCATION_SUBJECTS))for(let l=1;l<=6;l++){total++;if(subjectLevelRecord(id,l).completed)done++;}return{done,total,pct:Math.round(done/total*100)};}
  function speakKidWord(text){try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(String(text));u.lang='en-US';u.rate=.78;u.pitch=1.08;speechSynthesis.speak(u);}catch{}}
  function dailyChallengesHtml(){ensureDailyChallenges();return state.daily.quests.map((q,i)=>{const d=dailyDefinition(q.id),pct=clamp(q.progress/q.target*100,0,100),ready=q.progress>=q.target&&!q.claimed;return`<article class="daily-card ${ready?'ready':''} ${q.claimed?'claimed':''}"><div class="daily-icon">${d.icon}</div><div><b>${d.title}</b><span>${d.label(q.progress)}</span><div class="daily-progress"><i style="width:${pct}%"></i></div><small>${q.reward} moedas • ${q.xp} XP</small></div><button data-daily-claim="${i}" ${ready?'':'disabled'}>${q.claimed?'✓':ready?'Receber':'Em andamento'}</button></article>`}).join('');}
  function educationSubjectHtml(subject){const s=EDUCATION_SUBJECTS[subject],levels=SUBJECT_LEVELS[subject];return`<section class="edu-subject" style="--edu:${s.color}"><header><span>${s.icon}</span><div><b>${s.title}</b><small>${s.description}</small></div></header><div class="edu-path">${levels.map((data,i)=>{const level=i+1,rec=subjectLevelRecord(subject,level),unlocked=subjectUnlocked(subject,level);return`<button class="edu-node ${rec.completed?'done':''} ${unlocked?'':'locked'}" data-edu-play="${subject}" data-edu-level="${level}" ${unlocked?'':'disabled'}><i>${rec.completed?'✓':unlocked?s.icon:'🔒'}</i><span><b>${level}. ${data[0]}</b><small>${rec.completed?`${'⭐'.repeat(rec.stars||1)} • recorde ${rec.best}/5`:data[1]}</small></span></button>`}).join('')}</div></section>`;}
  function openEducationHub(tab='math'){
    ensureDailyChallenges();const summary=educationSummary(),valid=(EDUCATION_SUBJECTS[tab]||tab==='multiplayer'||tab==='daily')?tab:'math';
    const tabs=`<div class="edu-tabs"><button data-edu-tab="math" class="${valid==='math'?'active':''}">🔢 Matemática</button><button data-edu-tab="portuguese" class="${valid==='portuguese'?'active':''}">📚 Português</button><button data-edu-tab="english" class="${valid==='english'?'active':''}">🌎 English</button><button data-edu-tab="multiplayer" class="${valid==='multiplayer'?'active':''}">⚔️ Duelo</button><button data-edu-tab="daily" class="${valid==='daily'?'active':''}">🎯 Diários</button></div>`;
    const startCards=`<div class="academy-start"><button data-academy-start="math"><span>🔢</span><b>Jogar Matemática</b><small>Contagem, soma e lógica</small></button><button data-academy-start="portuguese"><span>📚</span><b>Jogar Português</b><small>Letras, sílabas e leitura</small></button><button data-academy-start="english"><span>🌎</span><b>Jogar English</b><small>Imagens, palavras e áudio</small></button></div>`;
    const multi=`<div class="edu-multiplayer-intro"><div>⚔️</div><h3>Duelo educativo em tempo real</h3><p>Escolha um jogador online, envie o convite e os dois recebem a mesma partida. O convite aparece na tela com <b>Aceitar e jogar</b>.</p><button class="btn primary xl" data-open-online>Escolher jogador online</button></div>`;
    const content=valid==='daily'?`<div class="daily-header"><b>Desafios de hoje</b><span>Complete atividades dentro do mundo aberto.</span></div><div class="daily-list">${dailyChallengesHtml()}</div>`:valid==='multiplayer'?multi:`${startCards}${educationSubjectHtml(valid)}`;
    openModal(`Academia Kids de ${playerDisplayName()}`,`<div class="academy-banner"><div>🎓</div><section><b>JOGOS KIDS</b><span>Aprenda jogando dentro do mundo aberto.</span></section></div><div class="learning-top"><div><b>🔥 ${state.daily.streak||1}</b><small>sequência</small></div><div><b>👑 ${state.learning.crowns||0}</b><small>coroas</small></div><div><b>⭐ ${summary.pct}%</b><small>trilha</small></div></div>${tabs}<div class="learning-content">${content}</div>`,root=>{
      root.onclick=e=>{const tabBtn=e.target.closest('[data-edu-tab]'),playBtn=e.target.closest('[data-edu-play]'),startBtn=e.target.closest('[data-academy-start]'),claimBtn=e.target.closest('[data-daily-claim]'),onlineBtn=e.target.closest('[data-open-online]');if(tabBtn){openEducationHub(tabBtn.dataset.eduTab);return;}if(startBtn){startSoloEducationGame(startBtn.dataset.academyStart,1);return;}if(playBtn){startSoloEducationGame(playBtn.dataset.eduPlay,Number(playBtn.dataset.eduLevel));return;}if(claimBtn){claimDailyQuest(Number(claimBtn.dataset.dailyClaim));return;}if(onlineBtn){openSocialHub();}};
    });
  }
  function openChallengeHub(tab='math'){openEducationHub(tab==='path'?'math':tab);}
  function openDailyChallenges(){openEducationHub('daily');}
  function runEducationGame({subject,level=1,seed=Date.now(),rounds=5,multiplayer=false,opponent='',onFinish=null}){
    const def=EDUCATION_SUBJECTS[subject]||EDUCATION_SUBJECTS.math,items=generateEducationRounds(subject,level,seed,rounds);let step=0,hearts=3,score=0,locked=false,sequence=[];const started=performance.now();
    const complete=()=>{const elapsed=Math.round(performance.now()-started),result={score,total:items.length,elapsed,subject,level};if(onFinish)return onFinish(result);finishSoloEducationGame(result);};
    const render=()=>{if(step>=items.length||hearts<=0)return complete();const q=items[step],progress=Math.round(step/items.length*100),speak=q.speak?`<button class="edu-speak" data-edu-speak>🔊 Ouvir</button>`:'';
      const options=q.kind==='sequence'?`<div class="sequence-built" id="sequenceBuilt">${sequence.join('')||'Toque nas sílabas'}</div><div class="sequence-options">${q.tokens.map((t,i)=>`<button data-sequence-token="${i}">${t}</button>`).join('')}</div><div class="sequence-actions"><button data-sequence-clear>Limpar</button><button class="primary" data-sequence-check>Confirmar</button></div>`:`<div class="edu-options">${q.options.map((opt,i)=>`<button data-edu-answer="${escapeHtml(String(opt))}"><span>${String.fromCharCode(65+i)}</span>${escapeHtml(String(opt))}</button>`).join('')}</div>`;
      openModal(multiplayer?`Duelo: ${def.title}`:`${def.title} • Nível ${level}`,`<div class="lesson-hud"><b>❤️ ${hearts}</b><div><i style="width:${progress}%"></i></div><b>${step+1}/${items.length}</b></div>${multiplayer?`<div class="duel-opponent">⚔️ contra <b>${escapeHtml(opponent)}</b></div>`:''}<div class="edu-question" style="--edu:${def.color}"><small>${def.icon} ${def.title}</small><div class="edu-visual">${q.visual}</div><h3>${q.prompt}</h3>${speak}</div>${options}<div id="eduFeedback" class="lesson-feedback" hidden></div>`,root=>{
        if(q.autoSpeak)setTimeout(()=>speakKidWord(q.speak),180);$('[data-edu-speak]',root)?.addEventListener('click',()=>speakKidWord(q.speak));
        const resolveAnswer=(answer,button=null)=>{if(locked)return;locked=true;const correct=String(answer).toUpperCase()===String(q.answer).toUpperCase(),feedback=$('#eduFeedback',root);if(correct){score++;state.learning.totalCorrect++;button?.classList.add('correct');feedback.hidden=false;feedback.className='lesson-feedback good';feedback.innerHTML='<b>Correto!</b><span>Continue assim.</span>';beep(780,80);addXP(5);}else{hearts--;button?.classList.add('wrong');feedback.hidden=false;feedback.className='lesson-feedback bad';feedback.innerHTML=`<b>Quase!</b><span>Resposta: ${escapeHtml(q.displayAnswer||q.answer)}</span>`;beep(180,110,'sawtooth');}setTimeout(()=>{step++;sequence=[];locked=false;render();},780);};
        $$('[data-edu-answer]',root).forEach(btn=>btn.onclick=()=>resolveAnswer(btn.dataset.eduAnswer,btn));
        $$('[data-sequence-token]',root).forEach(btn=>btn.onclick=()=>{if(locked||btn.disabled)return;sequence.push(q.tokens[Number(btn.dataset.sequenceToken)]);btn.disabled=true;$('#sequenceBuilt',root).textContent=sequence.join('');});
        $('[data-sequence-clear]',root)?.addEventListener('click',()=>{sequence=[];render();});$('[data-sequence-check]',root)?.addEventListener('click',()=>resolveAnswer(sequence.join(''),$('[data-sequence-check]',root)));
      });
    };render();
  }
  function startSoloEducationGame(subject,level){try{closeChallengePrompt();runEducationGame({subject,level:Number(level)||1,seed:Date.now()});}catch(error){console.error('Academia Kids:',error);toast('Não foi possível abrir o jogo. Atualize a página.','bad',3000);}}
  function finishSoloEducationGame(result){const passed=result.score>=3,stars=passed?(result.score===result.total?3:result.score>=4?2:1):0,key=`${result.subject}-${result.level}`,old=subjectLevelRecord(result.subject,result.level);state.learning.lessons[key]={completed:old.completed||passed,stars:Math.max(old.stars||0,stars),best:Math.max(old.best||0,result.score),attempts:(old.attempts||0)+1};state.learning.lastLesson=key;state.learning.subjectXP[result.subject]=(state.learning.subjectXP[result.subject]||0)+result.score*10;if(passed){state.learning.crowns+=(old.completed?0:1);if(result.score===result.total)state.learning.perfectLessons++;const coins=30+stars*18;addCoins(coins);addXP(25+stars*12);awardMedal(result.score===result.total?`${EDUCATION_SUBJECTS[result.subject].title} Perfeito`:`Aluno ${EDUCATION_SUBJECTS[result.subject].title}`);saveState(true);openModal('Fase concluída!',`<div class="lesson-result"><div>${result.score===result.total?'🏆':'🎉'}</div><h3>${result.score}/${result.total}</h3><p>${'⭐'.repeat(stars)} Você ganhou ${coins} moedas.</p><button class="btn primary" data-edu-continue>Continuar</button></div>`,root=>$('[data-edu-continue]',root).onclick=()=>openEducationHub(result.subject));}else{saveState(true);openModal('Treine mais um pouco',`<div class="lesson-result"><div>💪</div><h3>${result.score}/${result.total}</h3><p>Você precisa acertar pelo menos 3 atividades.</p><button class="btn primary" data-edu-retry>Tentar novamente</button><button class="btn" data-edu-back>Voltar</button></div>`,root=>{$('[data-edu-retry]',root).onclick=()=>startSoloEducationGame(result.subject,result.level);$('[data-edu-back]',root).onclick=()=>openEducationHub(result.subject);});}}

  let cinematicEmoteTimer=0;
  function startCinematicEmote(type,duration=2800){
    if(!['dance','play','selfie','highfive','hug'].includes(type))return;clearTimeout(cinematicEmoteTimer);document.body.classList.add('cinematic-emote');cinematicEmoteTimer=setTimeout(()=>document.body.classList.remove('cinematic-emote'),Math.max(900,duration));
  }
  function triggerEmote(type,npc=null){
    const duration=type==='selfie'?5200:type==='dance'?3200:2400;startCinematicEmote(type,duration);player.emoteType=type;player.emoteUntil=performance.now()+duration;player.emoteSeq=(player.emoteSeq||0)+1;
    if(npc){npc.emoteType=type;npc.emoteUntil=performance.now()+duration;}
    if(['dance','play','selfie','highfive','hug'].includes(type)){
      const token=String(performance.now());triggerEmote.cinemaToken=token;document.body.classList.add('social-moment');
      setTimeout(()=>{if(triggerEmote.cinemaToken===token)document.body.classList.remove('social-moment');},duration+180);
    }
    if(type==='play')state.needs.fun=clamp(state.needs.fun+8,0,100);
    const msg={wave:'Acenou!',dance:'Hora da dança!',play:'Hora de brincar!',selfie:'Selfie da amizade!',highfive:'Toca aqui!',hug:'Abraço de amizade!'};toast(msg[type]||'Ação social!','good',1100);beep(type==='highfive'?820:type==='play'?700:620,55);vibrate(15);addXP(3);
  }

  function openQuiz(){openEducationHub('math');}


  function openCollection() {
    const medals = state.medals.length ? state.medals.map(m => `<div class="inventory-item"><b>🏅</b><span>${m}</span></div>`).join('') : '<p>Nenhuma medalha ainda. Complete missões, quiz e desafios.</p>';
    openModal('Coleção e conquistas', `<div class="inventory-grid">${medals}</div>`);
  }

  const avatarCatalog = {
    outfit: [
      ['classic','Clássico','⬛'], ['blue','Jaqueta azul','🟦'], ['red','Jaqueta vermelha','🟥'], ['explorer','Explorador','🟩']
    ],
    hat: [
      ['none','Sem chapéu','🚫'], ['cap','Boné','🧢'], ['crown','Coroa','👑'], ['helmet','Capacete','⛑️']
    ],
    accessory: [
      ['none','Sem acessório','🚫'], ['backpack','Mochila','🎒'], ['glasses','Óculos','🕶️'], ['cape','Capa','🦸']
    ],
    uniform: [
      ['none','Roupa livre','👕'], ['firefighter','Bombeiro Kids','🚒'], ['police','Patrulha Kids','👮'], ['paramedic','Socorrista Kids','🚑'], ['teacher','Professor','🧑‍🏫'], ['delivery','Entregador','📦'], ['mechanic','Mecânico Kids','🔧'], ['miner','Minerador Kids','⛏️'], ['builder','Construtor Kids','🦺']
    ]
  };
