/**
 * OTTHI World Edu V642 — módulo-fonte
 * Arquivo: 11-render-materials-player-model.js
 * Escopo: Texturas, materiais, geometria, personagem e avatar 3D
 * Linhas de origem V642: 1692-1962
 *
 * Este arquivo é compilado em app.js por tools/build_project.py.
 * Não deve ser carregado diretamente por index.html.
 */
// @otthi-module-body
  function canvasTexture(kind, colors) {
    const c = document.createElement('canvas'); c.width = c.height = 256;
    const ctx = c.getContext('2d');
    let seed=[kind,...colors].join('|').split('').reduce((value,char)=>(value*31+char.charCodeAt(0))>>>0,2166136261);
    const rand=()=>{seed^=seed<<13;seed^=seed>>>17;seed^=seed<<5;return(seed>>>0)/4294967296;};
    const pick=()=>colors[1+Math.floor(rand()*Math.max(1,colors.length-1))]||colors[0];
    ctx.imageSmoothingEnabled=false;ctx.fillStyle = colors[0]; ctx.fillRect(0, 0, 256, 256);
    if (kind === 'grass') {
      for (let i = 0; i < 720; i++) { ctx.fillStyle=pick();const x=rand()*256,y=rand()*256;ctx.fillRect(x,y,2+rand()*7,2+rand()*7);if(i%9===0)ctx.fillRect(x+2,y-5,2,8); }
      ctx.fillStyle='rgba(15,65,22,.14)';for(let i=0;i<95;i++)ctx.fillRect(rand()*256,rand()*256,12+rand()*26,2);
    } else if (kind === 'road') {
      for (let i=0;i<260;i++){ctx.fillStyle=pick();ctx.globalAlpha=.18+rand()*.2;ctx.fillRect(rand()*256,rand()*256,2+rand()*7,1+rand()*4);}ctx.globalAlpha=1;
      ctx.strokeStyle='rgba(10,16,23,.22)';ctx.lineWidth=2;for(let i=0;i<8;i++){const x=rand()*256,y=rand()*256;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+10+rand()*22,y-5+rand()*10);ctx.lineTo(x+18+rand()*28,y+rand()*20);ctx.stroke();}
    } else if (kind === 'wood') {
      for(let x=0;x<256;x+=48){ctx.fillStyle=x%96?colors[0]:pick();ctx.fillRect(x,0,47,256);ctx.fillStyle='rgba(255,238,190,.12)';ctx.fillRect(x+3,0,3,256);ctx.fillStyle='rgba(50,22,8,.25)';ctx.fillRect(x+45,0,3,256);}
      ctx.strokeStyle='rgba(66,31,13,.28)';ctx.lineWidth=2;for(let i=0;i<28;i++){const x=rand()*256;ctx.beginPath();ctx.moveTo(x,0);ctx.bezierCurveTo(x+8,65,x-7,150,x+4,256);ctx.stroke();}
      for(let i=0;i<9;i++){ctx.strokeStyle='rgba(58,28,13,.35)';ctx.strokeRect(rand()*245,rand()*245,5+rand()*9,3+rand()*6);}
    } else if (kind === 'brick') {
      ctx.fillStyle=colors[1];ctx.fillRect(0,0,256,256);for(let y=0;y<256;y+=42){const offset=(y/42)%2?32:0;for(let x=-64+offset;x<256;x+=64){ctx.fillStyle=rand()>.5?colors[0]:pick();ctx.fillRect(x+3,y+3,58,36);ctx.fillStyle='rgba(255,255,255,.10)';ctx.fillRect(x+5,y+5,54,3);}}
    } else if (kind === 'sidewalk') {
      ctx.strokeStyle='rgba(54,66,80,.22)';ctx.lineWidth=4;for(let y=0;y<=256;y+=48){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(256,y);ctx.stroke();}for(let x=0;x<=256;x+=48){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,256);ctx.stroke();}
      for(let i=0;i<150;i++){ctx.fillStyle=pick();ctx.globalAlpha=.16;ctx.fillRect(rand()*256,rand()*256,2+rand()*5,2+rand()*5);}ctx.globalAlpha=1;
    } else if (kind === 'water') {
      ctx.strokeStyle=colors[1]; ctx.lineWidth=3; ctx.globalAlpha=.5;
      for(let y=10;y<256;y+=24){ctx.beginPath();ctx.moveTo(0,y+Math.sin(y)*4);for(let x=0;x<=256;x+=12)ctx.lineTo(x,y+Math.sin((x+y)*.09)*5);ctx.stroke();}
      ctx.globalAlpha=1;
    } else if(kind==='stone'){
      ctx.fillStyle=colors[1];ctx.fillRect(0,0,256,256);for(let y=0;y<256;y+=50){for(let x=((y/50)%2?-28:0);x<256;x+=58){ctx.fillStyle=rand()>.45?colors[0]:pick();ctx.fillRect(x+3,y+3,52,44);ctx.fillStyle='rgba(255,255,255,.09)';ctx.fillRect(x+5,y+5,48,4);}}
    } else if(kind==='tile'){
      ctx.strokeStyle=colors[1];ctx.lineWidth=7;for(let p=0;p<=256;p+=64){ctx.beginPath();ctx.moveTo(p,0);ctx.lineTo(p,256);ctx.stroke();ctx.beginPath();ctx.moveTo(0,p);ctx.lineTo(256,p);ctx.stroke();}ctx.fillStyle='rgba(255,255,255,.18)';for(let y=7;y<256;y+=64)for(let x=7;x<256;x+=64)ctx.fillRect(x,y,48,5);
    } else if(kind==='fabric'){
      for(let y=0;y<256;y+=12)for(let x=0;x<256;x+=12){ctx.fillStyle=(x/12+y/12)%2?colors[0]:colors[1];ctx.globalAlpha=.62;ctx.fillRect(x,y,12,12);}ctx.globalAlpha=1;
    } else if(kind==='metal'){
      for(let y=0;y<256;y+=32){ctx.fillStyle=y%64?colors[0]:colors[1];ctx.fillRect(0,y,256,32);ctx.fillStyle='rgba(255,255,255,.14)';ctx.fillRect(0,y,256,3);}for(const x of [10,246])for(let y=14;y<256;y+=42){ctx.fillStyle='#6c7b88';ctx.fillRect(x-3,y-3,6,6);}
    }
    const tex = new THREE.CanvasTexture(c); tex.magFilter = THREE.NearestFilter; tex.minFilter = THREE.LinearMipmapLinearFilter; tex.generateMipmaps = true; tex.anisotropy = (renderer && renderer.capabilities) ? Math.min(12,renderer.capabilities.getMaxAnisotropy()) : 4; tex.wrapS = tex.wrapT = THREE.RepeatWrapping;tex.encoding=THREE.sRGBEncoding; return tex;
  }
  function professionalTexture(path,kind,colors,repeatX=1,repeatY=1){
    const texture=canvasTexture(kind,colors);texture.name=`fallback:${path}`;texture.repeat.set(repeatX,repeatY);texture.userData={source:path,status:'fallback'};
    const configure=target=>{target.wrapS=target.wrapT=THREE.RepeatWrapping;target.repeat.set(repeatX,repeatY);target.magFilter=THREE.LinearFilter;target.minFilter=THREE.LinearMipmapLinearFilter;target.generateMipmaps=true;target.anisotropy=(renderer&&renderer.capabilities)?Math.min(12,renderer.capabilities.getMaxAnisotropy()):4;if('colorSpace' in target&&THREE.SRGBColorSpace)target.colorSpace=THREE.SRGBColorSpace;else target.encoding=THREE.sRGBEncoding;};configure(texture);
    new THREE.TextureLoader().load(path,loaded=>{texture.image=loaded.image;texture.name=path;texture.userData={source:path,status:'loaded',width:loaded.image?.naturalWidth||loaded.image?.width||0,height:loaded.image?.naturalHeight||loaded.image?.height||0};configure(texture);texture.needsUpdate=true;},undefined,error=>{texture.userData.error=String(error?.message||'load-failed');console.warn('[OTTHOS] Textura local indisponível; fallback mantido:',path);});
    return texture;
  }
  function initMaterials() {
    textures.grass = professionalTexture('./assets/textures/grass-v628.png','grass',['#348f32','#62c94e','#28762c','#91df63'],46,46);
    textures.road = professionalTexture('./assets/textures/asphalt-v628.png','road',['#252d38','#3d4652'],10,30);
    textures.sidewalk = professionalTexture('./assets/textures/sidewalk-v632.png','sidewalk',['#d9dde3','#aeb7c2'],7,16);
    textures.water = canvasTexture('water', ['#2fb8ec','#bdf1ff']); textures.water.repeat.set(5,5);
    textures.wood = professionalTexture('./assets/textures/wood-v628.png','wood',['#9a5a28','#693819'],2,2);
    textures.brick = professionalTexture('./assets/textures/brick-v628.png','brick',['#c38142','#8a4e25'],3,2);
    textures.stone = professionalTexture('./assets/textures/stone-v628.png','stone',['#8795a6','#677482','#aab5bf'],4,3);
    textures.roof = professionalTexture('./assets/textures/roof-v628.png','brick',['#7c3030','#481d22'],3,3);
    textures.busSeat = professionalTexture('./assets/textures/bus-seat-v628.png','fabric',['#2e6db2','#173c69'],4,4);
    textures.schoolWall = professionalTexture('./assets/textures/school-wall-v628.png','brick',['#ead89a','#c49b58'],3,2);
    textures.policeWall = professionalTexture('./assets/textures/police-wall-v628.png','brick',['#dce8ef','#1f5c9d'],3,2);
    textures.goldOre = professionalTexture('./assets/textures/gold-ore-v628.png','stone',['#565c64','#f0c230'],2,2);
    textures.interiorFloor = professionalTexture('./assets/textures/home-floor-v632.png','wood',['#a4703e','#67411f'],4,4);
    textures.interiorWall = professionalTexture('./assets/textures/interior-wall-v632.png','sidewalk',['#e7decc','#cdbda8'],3,2);
    textures.marketFloor = professionalTexture('./assets/textures/market-floor-v632.png','tile',['#e9eee8','#7da68b'],4,4);
    textures.marketWall = professionalTexture('./assets/textures/market-wall-v632.png','brick',['#f5f1de','#4e8f65'],3,2);
    textures.schoolFloor = professionalTexture('./assets/textures/school-floor-v632.png','tile',['#d8e0e4','#4a90c4'],4,4);
    textures.fireWall = professionalTexture('./assets/textures/fire-station-wall-v632.png','brick',['#b93131','#f4f4ee'],3,2);
    textures.concrete = professionalTexture('./assets/textures/concrete-v632.png','metal',['#70777e','#4b5158'],5,6);
    textures.cityGlass = professionalTexture('./assets/textures/city-glass-v632.png','water',['#4c91b5','#9cd9ec'],2,2);
    textures.emergencyMetal = professionalTexture('./assets/textures/emergency-metal-v632.png','metal',['#bf2b2a','#e55d4d'],3,3);
    textures.tile = canvasTexture('tile', ['#e8f3f6','#78b8c9']); textures.tile.repeat.set(4,4);
    textures.fabric = textures.busSeat;
    textures.metal = canvasTexture('metal', ['#8c9dab','#657481']); textures.metal.repeat.set(2,3);
    materials.grass = new THREE.MeshStandardMaterial({ map: textures.grass, roughness: .88 });
    materials.road = new THREE.MeshStandardMaterial({ map: textures.road, roughness: .82 });
    materials.sidewalk = new THREE.MeshStandardMaterial({ map: textures.sidewalk, roughness: .92 });
    materials.wood = new THREE.MeshStandardMaterial({ map: textures.wood, roughness: .8 });
    materials.brick = new THREE.MeshStandardMaterial({ map: textures.brick, roughness: .82 });
    materials.tile = new THREE.MeshStandardMaterial({ map:textures.tile,roughness:.42,metalness:.03 });
    materials.fabric = new THREE.MeshStandardMaterial({ map:textures.fabric,roughness:.86 });
    materials.metal = new THREE.MeshStandardMaterial({ map:textures.metal,roughness:.38,metalness:.48 });
    materials.water = new THREE.MeshStandardMaterial({ map:textures.water, color:0x2fc8f4, emissive:0x087aa7, emissiveIntensity:.18, transparent:true, opacity:.76, roughness:.2, metalness:.1 });
    materials.interiorFloor = new THREE.MeshStandardMaterial({map:textures.interiorFloor,roughness:.68});
    materials.interiorWall = new THREE.MeshStandardMaterial({map:textures.interiorWall,roughness:.82});
    materials.marketFloor = new THREE.MeshStandardMaterial({map:textures.marketFloor,roughness:.58});
    materials.schoolFloor = new THREE.MeshStandardMaterial({map:textures.schoolFloor,roughness:.62});
    materials.concrete = new THREE.MeshStandardMaterial({map:textures.concrete,roughness:.88});
    materials.cityGlass = new THREE.MeshStandardMaterial({map:textures.cityGlass,color:0xb9ecff,transparent:true,opacity:.52,roughness:.08,metalness:.18});
    materials.emergencyMetal = new THREE.MeshStandardMaterial({map:textures.emergencyMetal,color:0xffffff,roughness:.38,metalness:.28});
    materials.fireWall = new THREE.MeshStandardMaterial({map:textures.fireWall,color:0xffffff,roughness:.78});
    materials.stone = new THREE.MeshStandardMaterial({ map:textures.stone,color:0xaab2bb,roughness:.88,flatShading:true });
    materials.goldOre = new THREE.MeshStandardMaterial({ map:textures.goldOre,color:0xffffff,emissive:0x6b3f00,emissiveIntensity:.22,roughness:.62,metalness:.28,flatShading:true });
    materials.dark = new THREE.MeshStandardMaterial({ color:0x080b11, roughness:.55, flatShading:true });
  }
  function mat(color, opts = {}) { return new THREE.MeshStandardMaterial({ color, roughness: opts.roughness ?? .72, metalness: opts.metalness ?? .03, emissive: opts.emissive ?? 0x000000, emissiveIntensity: opts.emissiveIntensity ?? 0, transparent: !!opts.transparent, opacity: opts.opacity ?? 1, flatShading: opts.flatShading ?? true }); }

  // V626: cache somente de geometrias e materiais visuais imutáveis.
  // Reduz memória e tempo de criação sem alterar física, colisões ou IDs.
  const sharedGeometryCache={box:new Map(),cylinder:new Map()};
  const immutableVisualMaterials=new Map();
  function geometryKey(...values){return values.map(v=>Number(v).toFixed(3)).join('|');}
  function sharedBoxGeometry(w,h,d){
    const key=geometryKey(w,h,d);
    if(!sharedGeometryCache.box.has(key))sharedGeometryCache.box.set(key,new THREE.BoxGeometry(w,h,d));
    return sharedGeometryCache.box.get(key);
  }
  function sharedCylinderGeometry(r,h,sides=10){
    const key=geometryKey(r,h,sides);
    if(!sharedGeometryCache.cylinder.has(key))sharedGeometryCache.cylinder.set(key,new THREE.CylinderGeometry(r,r,h,sides));
    return sharedGeometryCache.cylinder.get(key);
  }
  function renderMat(color,opts={}){
    const key=[color,opts.roughness??.72,opts.metalness??.03,opts.emissive??0,opts.emissiveIntensity??0,opts.transparent?1:0,opts.opacity??1,opts.flatShading??true].join('|');
    if(!immutableVisualMaterials.has(key))immutableVisualMaterials.set(key,mat(color,opts));
    return immutableVisualMaterials.get(key);
  }
  const roofMaterialCache=new Map();
  function tintedBrickMaterial(color,texture=textures.brick){
    return new THREE.MeshStandardMaterial({map:texture||textures.brick,color:new THREE.Color(color).lerp(new THREE.Color(0xffffff),.34),roughness:.8,metalness:0,flatShading:true});
  }
  function texturedRoofMaterial(color){
    const key=Number(color);if(!roofMaterialCache.has(key))roofMaterialCache.set(key,new THREE.MeshStandardMaterial({map:textures.roof,color:new THREE.Color(color).lerp(new THREE.Color(0xffffff),.12),roughness:.76,metalness:0,flatShading:true}));return roofMaterialCache.get(key);
  }
  function addSoftHighlight(parent,w,h,d,x,y,z,color=0xffffff,opacity=.22){
    const m=new THREE.MeshBasicMaterial({color,transparent:true,opacity,depthWrite:false,fog:true});
    const highlight=new THREE.Mesh(sharedBoxGeometry(w,h,d),m);highlight.position.set(x,y,z);highlight.renderOrder=4;highlight.frustumCulled=false;parent.add(highlight);return highlight;
  }

  function box(w, h, d, materialOrColor, x = 0, y = 0, z = 0, parent = worldGroup) {
    const material = typeof materialOrColor === 'number' ? mat(materialOrColor) : materialOrColor;
    const mesh = new THREE.Mesh(sharedBoxGeometry(w,h,d), material);
    mesh.position.set(x, y, z); mesh.castShadow = true; mesh.receiveShadow = true; mesh.frustumCulled=false; parent.add(mesh); return mesh;
  }
  function stabilizeSurface(mesh,renderOrder=0){if(!mesh)return mesh;mesh.frustumCulled=false;mesh.castShadow=false;mesh.receiveShadow=false;mesh.renderOrder=renderOrder;mesh.userData.stableSurface=true;world.criticalSurfaces.push(mesh);return mesh;}
  function stableBox(w,h,d,materialOrColor,x=0,y=0,z=0,parent=worldGroup,renderOrder=0){return stabilizeSurface(box(w,h,d,materialOrColor,x,y,z,parent),renderOrder);}
  function cylinder(r, h, color, x, y, z, parent = worldGroup, sides = 10) {
    const material=typeof color==='number'?mat(color):color;
    const mesh = new THREE.Mesh(sharedCylinderGeometry(r,h,sides), material);
    mesh.position.set(x,y,z); mesh.castShadow = true; mesh.receiveShadow = true; mesh.frustumCulled=false; parent.add(mesh); return mesh;
  }
  function addGlow(x, y, z, color = 0x5ae5ff, size = 4) {
    const light = new THREE.PointLight(color, .5, size * 3); light.position.set(x,y,z); light.userData.v615Glow=true; worldGroup.add(light); world.glows.push(light); return light;
  }

  function addVoxelOutline(mesh,color=0x142033,opacity=.36){
    if(!mesh?.geometry||mesh.userData?.voxelOutline)return mesh;
    const lines=new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry,22),new THREE.LineBasicMaterial({color,transparent:true,opacity,depthWrite:false}));
    lines.renderOrder=5;lines.userData.v615Outline=true;mesh.add(lines);mesh.userData.voxelOutline=lines;world.outlines.push(lines);return mesh;
  }
  function premiumBox(w,h,d,materialOrColor,x=0,y=0,z=0,parent=worldGroup,outline=0x142033){
    return addVoxelOutline(box(w,h,d,materialOrColor,x,y,z,parent),outline,.34);
  }
  function premiumCylinder(r,h,color,x,y,z,parent=worldGroup,sides=10){
    return addVoxelOutline(cylinder(r,h,color,x,y,z,parent,sides),0x142033,.3);
  }
  function makeWindow(parent,x,y,z,w=1.1,h=.9,frame=0xf7f3ea,glass=0x73d9ff){
    premiumBox(w+.2,h+.2,.16,frame,x,y,z,parent);premiumBox(w,h,.18,mat(glass,{emissive:0x1d739b,emissiveIntensity:.18,roughness:.16}),x,y,z+.02,parent,0x23445e);
    premiumBox(.08,h,.2,frame,x,y,z+.04,parent);premiumBox(w,.07,.2,frame,x,y,z+.04,parent);return parent;
  }
  function makePlanter(parent,x,y,z,color=0xe24f72){
    premiumBox(1.35,.34,.48,0x8a522d,x,y,z,parent);for(const ox of [-.42,0,.42]){premiumBox(.08,.4,.08,0x2f9d46,x+ox,y+.32,z,parent);premiumBox(.28,.16,.28,color,x+ox,y+.55,z,parent);}return parent;
  }

  function createPlayerModel() {
    playerGroup = new THREE.Group();playerGroup.name='OTTHOS_PLAYER';scene.add(playerGroup);
    playerModel = new THREE.Group();playerGroup.add(playerModel);
    const black=renderMat(0x090c12,{roughness:.48}),blackSoft=renderMat(0x151a23,{roughness:.58});
    const blue=renderMat(0x099fe5,{roughness:.46}),blueDark=renderMat(0x0875bd,{roughness:.52}),blueLight=renderMat(0x38c8ff,{roughness:.38});
    const white=renderMat(0xf4f7ff,{roughness:.3}),red=renderMat(0xff2947,{emissive:0x9b0018,emissiveIntensity:.62,roughness:.24});
    const sole=renderMat(0xdfe8f4,{roughness:.42}),parts={};
    parts.body=new THREE.Group();parts.body.position.set(0,1.55,0);playerModel.add(parts.body);
    box(1.02,1.22,.72,blue,0,0,0,parts.body);
    box(1.12,.28,.78,blueDark,0,.62,0,parts.body);
    box(.92,.3,.08,blueLight,0,.28,.39,parts.body);
    box(.9,.12,.08,blueDark,0,-.46,.4,parts.body);
    box(.08,.66,.06,white,-.18,.32,.43,parts.body);box(.08,.66,.06,white,.18,.32,.43,parts.body);
    box(.14,.14,.08,black,-.18,-.02,.46,parts.body);box(.14,.14,.08,black,.18,-.02,.46,parts.body);
    parts.head=box(1.08,1.02,1.02,black,0,2.72,0,playerModel);
    box(1.2,1.08,.28,blueDark,0,2.72,-.55,playerModel);
    box(1.22,.28,1.08,blue,0,3.17,-.04,playerModel);
    box(.26,.2,.05,white,-.27,2.78,.545,playerModel);box(.26,.2,.05,white,.27,2.78,.545,playerModel);
    box(.15,.09,.06,red,-.27,2.76,.575,playerModel);box(.15,.09,.06,red,.27,2.76,.575,playerModel);
    parts.leftArm=new THREE.Group();parts.rightArm=new THREE.Group();parts.leftLeg=new THREE.Group();parts.rightLeg=new THREE.Group();
    parts.leftArm.position.set(-.72,2.0,0);parts.rightArm.position.set(.72,2.0,0);parts.leftLeg.position.set(-.28,.92,0);parts.rightLeg.position.set(.28,.92,0);
    playerModel.add(parts.leftArm,parts.rightArm,parts.leftLeg,parts.rightLeg);
    for(const arm of [parts.leftArm,parts.rightArm]){
      box(.38,.52,.38,blue,0,-.24,0,arm);box(.34,.44,.34,blueDark,0,-.69,0,arm);box(.34,.26,.36,black,0,-1.02,.03,arm);
      addSoftHighlight(arm,.08,.62,.02,-.13,-.42,.2,0xffffff,.18);
    }
    for(const leg of [parts.leftLeg,parts.rightLeg]){
      box(.4,.58,.4,black,0,-.28,0,leg);box(.38,.42,.38,blackSoft,0,-.72,.02,leg);
      box(.43,.29,.52,blue,0,-1.02,.09,leg);box(.44,.11,.54,sole,0,-1.18,.1,leg);box(.22,.08,.55,blueLight,0,-1.08,.13,leg);
    }
    playerModel.userData.parts=parts;playerModel.userData.baseY=.24;playerModel.userData.minFootY=-.23;playerModel.userData.proceduralOtthos=true;
    const shadowMat=new THREE.MeshBasicMaterial({color:0x000000,transparent:true,opacity:.25,depthWrite:false,side:THREE.DoubleSide});
    contactShadow=new THREE.Mesh(new THREE.CircleGeometry(.88,24),shadowMat);contactShadow.rotation.x=-Math.PI/2;contactShadow.position.y=.025;scene.add(contactShadow);

    vehicleVisual=new THREE.Group();vehicleVisual.visible=false;playerGroup.add(vehicleVisual);
    // Materiais exclusivos: a cor do veículo ativo não pode alterar carros estacionados que usam o cache visual.
    const chassis=mat(0x26384e,{roughness:.5,metalness:.16}),orange=mat(0xf28a22,{roughness:.4,metalness:.18}),orangeDark=mat(0xc85b16,{roughness:.48});
    const teal=mat(0x0aa7b8,{roughness:.38,metalness:.22}),glass=mat(0x102338,{roughness:.12,metalness:.38,transparent:true,opacity:.84});
    box(1.84,.36,2.56,chassis,0,.28,0,vehicleVisual);box(1.72,.48,1.35,orange,0,.55,.55,vehicleVisual);
    box(1.48,.46,.92,teal,0,.78,-.48,vehicleVisual);box(1.32,.31,.72,glass,0,.93,-.42,vehicleVisual);
    box(1.94,.18,.28,white,0,.32,1.34,vehicleVisual);box(1.9,.18,.24,orangeDark,0,.34,-1.32,vehicleVisual);
    box(.18,.34,2.2,teal,-.92,.42,0,vehicleVisual);box(.18,.34,2.2,teal,.92,.42,0,vehicleVisual);
    box(.72,.42,.58,blackSoft,0,.72,-.12,vehicleVisual);
    const wheelRing=new THREE.Mesh(new THREE.TorusGeometry(.17,.035,8,14),black);wheelRing.position.set(-.31,.95,.32);wheelRing.rotation.x=Math.PI/2.3;vehicleVisual.add(wheelRing);
    const headlight=renderMat(0xfff1a8,{emissive:0xffd75b,emissiveIntensity:.9,roughness:.2}),taillight=renderMat(0xff334d,{emissive:0xa90018,emissiveIntensity:.8});
    box(.3,.17,.08,headlight,-.58,.5,1.27,vehicleVisual);box(.3,.17,.08,headlight,.58,.5,1.27,vehicleVisual);
    box(.28,.16,.07,taillight,-.59,.45,-1.3,vehicleVisual);box(.28,.16,.07,taillight,.59,.45,-1.3,vehicleVisual);
    vehicleVisual.userData.wheels=[];vehicleVisual.userData.frontWheels=[];vehicleVisual.userData.appearanceMaterials={chassis,primary:orange,primaryDark:orangeDark,secondary:teal,glass};
    const wheelMat=renderMat(0x10151d,{roughness:.9}),hubMat=renderMat(0xf5a623,{roughness:.35,metalness:.46});
    [[-.84,.24,-.79,false],[.84,.24,-.79,false],[-.84,.24,.79,true],[.84,.24,.79,true]].forEach(([x,y,z,front])=>{
      const holder=new THREE.Group();holder.position.set(x,y,z);vehicleVisual.add(holder);
      const wheel=new THREE.Mesh(sharedCylinderGeometry(.34,.28,14),wheelMat);wheel.rotation.z=Math.PI/2;wheel.castShadow=true;holder.add(wheel);
      const hub=new THREE.Mesh(sharedCylinderGeometry(.12,.3,10),hubMat);hub.rotation.z=Math.PI/2;holder.add(hub);
      vehicleVisual.userData.wheels.push(wheel);if(front)vehicleVisual.userData.frontWheels.push(holder);
    });
    playerModel.traverse(o=>{if(o.isMesh)addVoxelOutline(o,0x0a1a2d,.4);});
    vehicleVisual.traverse(o=>{if(o.isMesh)addVoxelOutline(o,0x14243a,.3);});
    const ownLabel=new THREE.Sprite(new THREE.SpriteMaterial({map:multiplayerNameTexture(playerDisplayName()),transparent:true,depthWrite:false,depthTest:false}));
    ownLabel.position.set(0,3.65,0);ownLabel.scale.set(2.65,.66,1);ownLabel.renderOrder=1000;ownLabel.visible=false;playerGroup.add(ownLabel);playerGroup.userData.nameLabel=ownLabel;playerGroup.userData.displayName=playerDisplayName();
    refreshEquippedToolVisual();
  }

  function loadFaithfulAthosModel() {
    // Regra V606 (herdada da V605): athos.glb pertence apenas ao visualizador/AR do lobby.
    // A jogabilidade usa o Otthos procedural animado para preservar física, escala e desempenho.
    return false;
  }

  function clearAvatarLayer() {
    if (avatarLayer && playerGroup) playerGroup.remove(avatarLayer);
    avatarLayer = new THREE.Group();
    avatarLayer.name = 'OTTHOS_AVATAR_ACCESSORIES';
    playerGroup?.add(avatarLayer);
  }
  function applyAvatarCustomization() {
    if (!playerGroup || !window.THREE) return;
    clearAvatarLayer();
    const outfit = state.avatar?.outfit || 'classic', hat = state.avatar?.hat || 'none', accessory = state.avatar?.accessory || 'none', uniform = effectiveAvatarUniform();
    const outfitColors = { blue:0x2477d4, red:0xd93645, explorer:0x3f9b4b };
    const uniformColors = { firefighter:0xd93d35, police:0x245da8, teacher:0x4a9b65, delivery:0xe59a2f, mechanic:0x315f91, miner:0xc68b24, builder:0xe9782b };
    if (uniform !== 'none') {
      const uniformVest=box(1.08,1.14,.79,uniformColors[uniform]||0x2477d4,0,1.55,0,avatarLayer);uniformVest.material.transparent=true;uniformVest.material.opacity=.94;
      box(.86,.18,.82,uniform==='firefighter'?0xffd548:0xf4f6f8,0,1.88,.02,avatarLayer);
      if(uniform==='firefighter'){const helm=new THREE.Mesh(new THREE.SphereGeometry(.64,12,8,0,Math.PI*2,0,Math.PI*.62),mat(0xffcf35,{metalness:.06}));helm.position.set(0,3.08,0);avatarLayer.add(helm);box(.72,.12,.2,0xd83b35,0,3.14,.51,avatarLayer);}
      else if(uniform==='police'){box(1.0,.2,1.0,0x245da8,0,3.28,0,avatarLayer);box(.5,.09,.55,0x245da8,0,3.18,.58,avatarLayer);box(.2,.22,.06,0xffd84d,.28,1.62,.42,avatarLayer);}
      else if(uniform==='teacher'){box(.18,.7,.08,0x6e4a2f,.48,1.55,.48,avatarLayer);box(.42,.28,.08,0xf7f1d0,.48,1.87,.48,avatarLayer);}
      else if(uniform==='delivery'){box(.82,.95,.42,0x8b5a2b,0,1.62,-.58,avatarLayer);box(.68,.18,.08,0xffffff,0,1.72,.43,avatarLayer);}
      else if(uniform==='mechanic'){box(.78,.2,.08,0xdce8f2,0,1.83,.43,avatarLayer);box(.22,.32,.1,0xf3bd37,.34,1.52,.43,avatarLayer);box(.9,.16,.85,0x26384e,0,3.25,0,avatarLayer);}
      else if(uniform==='miner'){const helm=new THREE.Mesh(new THREE.SphereGeometry(.64,12,8,0,Math.PI*2,0,Math.PI*.62),mat(0xf0bb2d,{metalness:.08}));helm.position.set(0,3.08,0);avatarLayer.add(helm);box(.22,.22,.08,0xf8f4c6,0,3.17,.58,avatarLayer);box(.75,.18,.08,0x3b2c1b,0,1.75,.43,avatarLayer);}
      else if(uniform==='builder'){box(1.14,.2,.82,0xf8d54a,0,3.24,0,avatarLayer);box(.72,.15,.85,0xf8d54a,0,3.15,.5,avatarLayer);box(.12,1.02,.08,0xfff2a1,-.33,1.55,.43,avatarLayer);box(.12,1.02,.08,0xfff2a1,.33,1.55,.43,avatarLayer);}
    } else if (outfit !== 'classic') {
      const vest = box(1.02,1.08,.76,outfitColors[outfit]||0x2477d4,0,1.55,0,avatarLayer);
      vest.material.transparent = true; vest.material.opacity = .86;
    }
    if(uniform==='none'){
      if (hat === 'cap') { box(1.0,.22,1.0,0x2477d4,0,3.28,0,avatarLayer); box(.55,.10,.55,0x2477d4,0,3.18,.58,avatarLayer); }
      else if (hat === 'crown') { box(.92,.25,.92,0xffd84d,0,3.32,0,avatarLayer); [[-.32,.22],[0,.34],[.32,.22]].forEach(([x,h])=>box(.18,h,.18,0xffd84d,x,3.48+h/2,0,avatarLayer)); }
      else if (hat === 'helmet') { const helm = new THREE.Mesh(new THREE.SphereGeometry(.62,12,8,0,Math.PI*2,0,Math.PI*.62),mat(0xf97316,{metalness:.08})); helm.position.set(0,3.08,0); avatarLayer.add(helm); }
      if (accessory === 'backpack') { box(.78,1.05,.42,0x9a5b2b,0,1.65,-.58,avatarLayer); }
      else if (accessory === 'glasses') { box(.38,.18,.08,0x111827,-.26,2.78,.59,avatarLayer); box(.38,.18,.08,0x111827,.26,2.78,.59,avatarLayer); box(.18,.06,.08,0x111827,0,2.78,.59,avatarLayer); }
      else if (accessory === 'cape') { const cape=box(.92,1.35,.08,0x8b5cf6,0,1.58,-.60,avatarLayer); cape.rotation.x=-.08; }
    }
    avatarLayer.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});
  }


  function registerCollider(x,z,w,d,options={}) { world.colliders.push({x,z,w,d,...options}); }
  function registerPlatform(x,z,w,d,top,options={}) { world.platforms.push({x,z,w,d,top,...options}); }
  function registerInteractable(data) { world.interactables.push({...data}); return data; }
  function worldPos(entry) {
    if (entry.getPos) return entry.getPos();
    return {x:entry.x,z:entry.z,y:entry.y||0};
  }
