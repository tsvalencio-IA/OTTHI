/**
 * OTTHI World Edu V643 — módulo-fonte
 * Arquivo: 14-world-district-decoration.js
 * Escopo: Cogumelos, portais, praça, distrito e decoração urbana
 * Linhas de origem V642: 2418-2505
 *
 * Este arquivo é compilado em app.js por tools/build_project.py.
 * Não deve ser carregado diretamente por index.html.
 */
// @otthi-module-body
  function createVoxelMushroom(x,z,scale=1,color=0xe34242){
    const g=new THREE.Group();g.position.set(x,0,z);worldGroup.add(g);
    const stem=renderMat(0xe5bd82,{roughness:.86}),stemLight=renderMat(0xf2d8a8,{roughness:.78}),cap=renderMat(color,{roughness:.56}),capLight=renderMat(shadeColor(color,22),{roughness:.5}),spot=renderMat(0xfff2df,{roughness:.48});
    box(1.45*scale,3.15*scale,1.45*scale,stem,0,1.58*scale,0,g);box(.55*scale,2.7*scale,.08*scale,stemLight,-.34*scale,1.68*scale,.74*scale,g);
    box(4.5*scale,.82*scale,3.6*scale,cap,0,3.22*scale,0,g);box(3.65*scale,.86*scale,4.45*scale,cap,0,3.34*scale,0,g);
    box(3.2*scale,.74*scale,3.2*scale,capLight,0,3.9*scale,0,g);box(2.25*scale,.5*scale,2.25*scale,cap,0,4.42*scale,0,g);
    [[-1.3,.35,.72],[1.1,.5,.62],[0,-1.2,.75],[.5,1.22,.58],[-.35,.1,.48]].forEach(([sx,sz,s])=>box(s*scale,.17*scale,s*scale,spot,sx*scale,4.7*scale,sz*scale,g));
    if(scale>.95)addVoxelOutline(g.children[0],0x5d3b24,.24);world.landmarks.push(g);return g;
  }
  function iconTexture(symbol,bg='#f5c739',fg='#10263f'){
    const c=document.createElement('canvas');c.width=c.height=256;const ctx=c.getContext('2d');ctx.fillStyle=bg;ctx.fillRect(0,0,256,256);ctx.strokeStyle='rgba(255,255,255,.75)';ctx.lineWidth=18;ctx.strokeRect(12,12,232,232);ctx.fillStyle=fg;ctx.font='900 150px system-ui';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(symbol,128,137);const tex=new THREE.CanvasTexture(c);tex.magFilter=THREE.NearestFilter;tex.minFilter=THREE.LinearMipmapLinearFilter;return tex;
  }
  function createChallengeCube(x,y,z,symbol='◆',color='#ffd33f'){const material=new THREE.MeshStandardMaterial({map:iconTexture(symbol,color),roughness:.5,emissive:0x5c3f00,emissiveIntensity:.16});const cube=box(1.75,1.75,1.75,material,x,y,z);cube.userData.floatBase=y;world.landmarks.push(cube);return cube;}
  function createPortalArch(x,z){
    const g=new THREE.Group();g.position.set(x,0,z);worldGroup.add(g);const stone=mat(0x46546c,{roughness:.55,metalness:.08}),glow=mat(0x28ddff,{emissive:0x00a9d6,emissiveIntensity:1.6,roughness:.15});
    box(1.2,7,1.2,stone,-3,3.5,0,g);box(1.2,7,1.2,stone,3,3.5,0,g);box(7.2,1.2,1.2,stone,0,7,0,g);
    for(let i=0;i<9;i++){const ang=Math.PI*i/8;const p=new THREE.Mesh(new THREE.BoxGeometry(.55,.55,.35),glow);p.position.set(Math.cos(ang)*2.35,3.3+Math.sin(ang)*2.35,.25);p.rotation.z=-ang;g.add(p);}
    addGlow(x,3.4,z,0x2de8ff,14);world.landmarks.push(g);return g;
  }
  function createPlayground(x,z){
    const g=new THREE.Group();g.position.set(x,0,z);worldGroup.add(g);box(8,.18,6,0x64bf49,0,.09,0,g);box(1.2,2.2,1.2,0x3b82f6,-2,1.1,0,g);box(1.2,2.2,1.2,0xf97316,2,1.1,0,g);
    const slide=box(1.35,.22,4.2,0xfacc15,1.7,1.1,1.5,g);slide.rotation.x=-.42;for(const sx of [-2.4,2.4]){box(.18,3.4,.18,materials.wood,sx,1.7,-2,g);box(.18,3.4,.18,materials.wood,sx+1.1,1.7,-2,g);}box(5.3,.18,.18,0xef4444,.55,3.25,-2,g);world.landmarks.push(g);return g;
  }
  function createFountain(x,z){const g=new THREE.Group();g.position.set(x,0,z);worldGroup.add(g);cylinder(3,.32,0x9aa9b8,0,.16,0,g,16);cylinder(2.35,.22,0x31b7e8,0,.36,0,g,16);cylinder(.45,2.3,0xb8c4cf,0,1.35,0,g,12);const orb=new THREE.Mesh(new THREE.OctahedronGeometry(.55,0),mat(0x42e7ff,{emissive:0x05a8cc,emissiveIntensity:1.2,roughness:.2}));orb.position.y=2.8;g.add(orb);addGlow(x,2.8,z,0x42e7ff,7);world.landmarks.push(g);return g;}
  function createAwning(x,z,color=0xef4444,rotation=0){const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=rotation;worldGroup.add(g);for(let i=-3;i<=3;i++)box(.55,.18,1.25,i%2?0xfff7e8:color,i*.55,2.15,0,g);world.landmarks.push(g);return g;}
  function createStreetTree(x,z,scale=1){
    const g=new THREE.Group();g.position.set(x,0,z);worldGroup.add(g);
    premiumBox(.54,2.15,.54,0x89512c,0,1.08,0,g);premiumBox(2.3,.86,2.05,0x278f43,0,2.5,0,g);
    premiumBox(1.7,.8,1.9,0x4ebd57,-.38,3.15,.12,g);premiumBox(1.45,.68,1.45,0x70d86a,.42,3.62,-.12,g);
    makePlanter(g,0,.2,0,0xffd24d);return g;
  }
  function createBackdropBuilding(x,z,w,h,d,color,accent=0xffffff){
    const g=new THREE.Group();g.position.set(x,0,z);worldGroup.add(g);
    const main=renderMat(color,{roughness:.78}),dark=renderMat(shadeColor(color,-34),{roughness:.82}),windowMat=renderMat(0x54cfff,{emissive:0x145f82,emissiveIntensity:.13,roughness:.2});
    const building=box(w,h,d,main,0,h/2,0,g);addVoxelOutline(building,0x24354b,.2);box(w+.3,.35,d+.3,dark,0,h+.18,0,g);
    const front=z<0?d/2+.03:-d/2-.03;
    for(let yy=1.25;yy<h-1;yy+=1.65)for(let xx=-w/2+.85;xx<w/2-.35;xx+=1.5)box(.76,.7,.08,windowMat,xx,yy,front,g);
    box(w*.54,.28,.42,renderMat(accent,{roughness:.58}),0,.86,front+(z<0?.18:-.18),g);
    box(w*.7,.22,d*.35,dark,0,h+.47,0,g);world.landmarks.push(g);return g;
  }
  function createFloatingIsland(x,y,z,scale=1){
    const g=new THREE.Group();g.position.set(x,y,z);worldGroup.add(g);premiumBox(8*scale,1.2*scale,7*scale,0x4ba944,0,0,0,g);premiumBox(6.8*scale,.5*scale,6.2*scale,0x7bd45b,0,.82*scale,0,g);
    for(let i=0;i<4;i++){const rock=new THREE.Mesh(new THREE.ConeGeometry((2.7-i*.45)*scale,2.1*scale,4),materials.stone);rock.position.y=-1.3*scale-i*.65*scale;rock.rotation.y=Math.PI/4;g.add(rock);}const crystal=new THREE.Mesh(new THREE.OctahedronGeometry(.65*scale,0),mat(0x4de5ff,{emissive:0x009ac8,emissiveIntensity:1.3,roughness:.15}));crystal.position.y=1.9*scale;g.add(crystal);addVoxelOutline(crystal,0x15334c,.35);world.landmarks.push(g);return g;
  }
  function createCoinTrail(points){
    const coinMat=mat(0xffd52e,{emissive:0xb26b00,emissiveIntensity:.32,metalness:.18,roughness:.3});points.forEach(([x,z],i)=>{const c=new THREE.Mesh(new THREE.TorusGeometry(.34,.11,7,14),coinMat);c.position.set(x,1.15+Math.sin(i*.7)*.18,z);c.rotation.y=Math.PI/2;worldGroup.add(c);world.landmarks.push(c);});
  }
  function createCommercialDistrict(){
    // Peripheral skyline preserves gameplay coordinates while giving a premium city silhouette.
    [[-108,-92,12,12,10,0xe77a32,0xffd75a],[-88,-105,11,17,9,0x35a8e8,0xffffff],[-64,-108,13,14,9,0x8b5cf6,0xf4d35e],[-35,-109,11,18,9,0x46b96a,0xffffff],[38,-109,12,16,9,0xe84a6f,0xffef98],[68,-107,13,20,10,0x2f7fd8,0xffffff],[99,-93,12,14,10,0xf09c35,0x45d7ff]].forEach(v=>createBackdropBuilding(...v));
    [[-104,92,13,16,10,0x4f9fd7,0xffffff],[-74,107,11,19,9,0xe86a3d,0xffed84],[-36,108,12,14,9,0x65b85d,0xffffff],[35,108,12,18,10,0x8a62d4,0x5ee7ff],[69,106,13,15,9,0xe44a4a,0xffffff],[103,88,11,20,10,0x3b91d1,0xffed84]].forEach(v=>createBackdropBuilding(...v));
    createFloatingIsland(-78,36,-138,.75);createFloatingIsland(18,48,-150,.9);createFloatingIsland(96,30,-132,.65);
    [[-17,-8],[-10,-8],[10,-8],[17,-8],[-17,8],[-10,8],[10,8],[17,8]].forEach(p=>createStreetTree(...p,.72));
    createCoinTrail([[34,-28],[39,-31],[44,-34],[49,-37],[54,-40],[59,-43],[64,-46]]);
  }

  function createDistrictVisuals(){
    [[-13,34,1.05,0xe64343],[-37,35,.82,0x4b78e8],[14,-34,.95,0xec4c4c],[40,-5,.78,0x8b5cf6],[-70,-20,1.35,0xdf3f3f],[-82,-76,.9,0x5c7ce2],[72,28,1.1,0xe94d4d],[92,22,.82,0x8b5cf6]].forEach(v=>createVoxelMushroom(...v));
    createPlayground(-8,-38);createFountain(0,-2);createPortalArch(88,51);createChallengeCube(36,1.3,-27,'◆','#ffd43b');createChallengeCube(66,1.3,-50,'★','#53d8ff');createChallengeCube(-43,1.3,35,'◈','#ff756f');createAwning(-22,-14,0xef4444,0);createAwning(22,-14,0x2563eb,0);createCommercialDistrict();
  }

  const BUS_ROUTES=[
    {id:'solar',name:'Linha Solar',number:'101',color:0x168de2,speed:6.6,copies:2,dwell:3600,laneOffset:1.72,points:[
      {x:0,z:10,stopId:'central-norte',stopName:'Central Norte'},{x:7,z:11},{x:7,z:27},{x:0,z:34},{x:0,z:55},{x:0,z:94,stopId:'bairro-norte',stopName:'Bairro Norte'},{x:0,z:55},{x:0,z:34},{x:7,z:27},{x:7,z:11},{x:7,z:0},{x:0,z:0},{x:55,z:0,stopId:'fazenda',stopName:'Fazenda'},{x:55,z:48,stopId:'castelo',stopName:'Castelo'},{x:55,z:88,stopId:'ginasio',stopName:'Ginásio'},{x:55,z:48},{x:55,z:0},{x:0,z:0}
    ]},
    {id:'verde',name:'Linha Verde',number:'202',color:0x27b36a,speed:6.4,copies:2,dwell:3600,laneOffset:1.38,points:[
      {x:0,z:-10,stopId:'central-sul',stopName:'Central Sul'},{x:0,z:-55,stopId:'academia',stopName:'Academia'},{x:0,z:-94,stopId:'vale',stopName:'Vale dos Cristais'},{x:0,z:-55},{x:-55,z:-55,stopId:'floresta',stopName:'Floresta'},{x:-55,z:-10,stopId:'mercado',stopName:'Mercadinho'},{x:-55,z:0},{x:-70,z:0,stopId:'escola-sol',stopName:'Escola Vila do Sol'},{x:-55,z:0},{x:0,z:0}
    ]},
    {id:'escolar',name:'Circular Escolar',number:'E10',color:0xf0b62d,speed:5.9,copies:1,dwell:4200,schoolBus:true,laneOffset:1.18,points:[
      {x:-70,z:0,stopId:'escola-sol',stopName:'Escola Vila do Sol'},{x:-55,z:0},{x:0,z:0,stopId:'central-escolar',stopName:'Praça Central'},{x:55,z:0},{x:55,z:18,stopId:'escola-horizonte',stopName:'Escola Horizonte'},{x:55,z:0},{x:0,z:0},{x:-55,z:0}
    ]},
    {id:'circular',name:'Circular da Cidade',number:'303',color:0x8b5cf6,speed:6.3,copies:1,dwell:3500,laneOffset:1.62,points:[
      {x:0,z:0,stopId:'praca-central',stopName:'Praça Central'},{x:55,z:0,stopId:'delegacia-central',stopName:'Delegacia Central'},{x:55,z:-18},{x:55,z:-68,stopId:'bombeiros',stopName:'Corpo de Bombeiros'},{x:55,z:-18},{x:0,z:-18,stopId:'comercio',stopName:'Mercado e Oficina'},{x:-55,z:-18},{x:-55,z:0},{x:-55,z:22,stopId:'posto-bairro',stopName:'Posto Policial do Bairro'},{x:-55,z:0},{x:0,z:0}
    ]},
    {id:'turismo',name:'Linha Turismo Kids',number:'404',color:0xe05c42,speed:6.1,copies:1,dwell:3900,laneOffset:1.28,points:[
      {x:0,z:10,stopId:'central-norte',stopName:'Central Norte'},{x:0,z:50,stopId:'lago-acesso',stopName:'Acesso ao Lago'},{x:0,z:78},{x:55,z:78},{x:55,z:88,stopId:'ginasio',stopName:'Ginásio'},{x:55,z:48,stopId:'castelo',stopName:'Castelo'},{x:55,z:18,stopId:'escola-horizonte',stopName:'Escola Horizonte'},{x:55,z:0},{x:0,z:0}
    ]}
  ];
  const ADVENTURE_DEFS={
    castle:{icon:'👑',name:'Coroas do Castelo',description:'Encontre 6 coroas reais em 75 segundos.',target:6,reward:180,xp:130},
    metro:{icon:'Ⓜ️',name:'Explorador do Metrô',description:'Visite 3 destinos diferentes pela rede.',target:3,reward:150,xp:105},
    bus:{icon:'🚌',name:'Volta pela Cidade',description:'Desembarque em 3 paradas diferentes.',target:3,reward:145,xp:100},
    skills:{icon:'✨',name:'Combo de Skills',description:'Use as 5 skills avançadas diferentes.',target:5,reward:175,xp:125},
    resources:{icon:'🧰',name:'Mestre das Ferramentas',description:'Colete madeira, pedra/minério e água com as ferramentas certas.',target:3,reward:155,xp:115}
  };
  let transitPanel=null,metroOverlay=null;
  const BUS_STATES=Object.freeze({SPAWNING:'SPAWNING',MOVING:'MOVING',WAITING_TRAFFIC:'WAITING_TRAFFIC',APPROACHING_STOP:'APPROACHING_STOP',ALIGNING_TO_STOP:'ALIGNING_TO_STOP',BRAKING:'BRAKING',STOPPED:'STOPPED',OPENING_DOORS:'OPENING_DOORS',DOORS_OPEN:'DOORS_OPEN',OFFERING_BOARDING:'OFFERING_BOARDING',BOARDING:'BOARDING',CLOSING_DOORS:'CLOSING_DOORS',LEAVING_STOP:'LEAVING_STOP',TURNING_AROUND:'TURNING_AROUND',REROUTING:'REROUTING',ACCIDENT:'ACCIDENT',RECOVERING:'RECOVERING'});
  const BUS_LANE_OFFSET=1.55;
