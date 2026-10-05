import assert from 'node:assert/strict';
import * as E from '../engine.js';
const KEY='renjian-chronicles-v1';
let serial=0;
async function boot(initial){
  const events=new Map(),storage=new Map(initial?[[KEY,JSON.stringify(initial)]]:[]),nodes=new Map();
  for(const id of ['#app','#modal','#toast','#import-file'])nodes.set(id,{innerHTML:'',dataset:{},open:false,classList:{add(){},remove(){}},showModal(){this.open=true},close(){this.open=false},addEventListener(t,fn){events.set(id+t,fn)},click(){}});
  globalThis.document={querySelector:s=>nodes.get(s),addEventListener:(t,fn)=>events.set(t,fn)};
  globalThis.localStorage={getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)};
  globalThis.window={scrollTo(){},addEventListener(){}};
  await import(`../app.js?menu-test=${serial++}`);
  return {nodes,storage,events,html:()=>nodes.get('#app').innerHTML,modal:()=>nodes.get('#modal'),db:()=>JSON.parse(storage.get(KEY)),click:(act,id)=>events.get('click')({target:{closest:()=>({dataset:{act,id},tagName:'BUTTON'})},preventDefault(){}})};
}
const h=await boot();
assert.match(h.html(),/开启新人生/);assert.equal(h.storage.size,0);
h.click('help');assert.match(h.modal().innerHTML,/为自己写下名字/);h.click('help-step','4');h.click('close');assert.equal(h.storage.size,0);
h.click('new-life');h.click('choose-new-slot','0');assert.match(h.html(),/这一生，你想成为谁/);assert.equal(h.storage.size,0);
h.events.get('input')({target:{id:'character-name',value:'我的角色'}});h.click('pick-trait','bright');h.click('pick-trait','sunny');h.click('create-character');
assert.equal(E.active(h.db().slots[0].game).name,'我的角色');assert.match(h.html(),/伸向世界的第一只手/);
for(let i=0;i<18;i++)h.click('child-choice','0');assert.equal(h.db().slots[0].game.time,216);assert.match(h.html(),/参加考试/);
h.click('start-exam');for(let i=0;i<15;i++){const x=h.db().slots[0].game.opening.exam;h.click('exam-answer',String(x.paper[i].options.indexOf(0)));assert.match(h.html(),/答对了/);h.click('exam-next');}
assert.match(h.html(),/星河大学/);assert.equal(E.active(h.db().slots[0].game).flags.examScore,750);
h.click('apply-university','xinghe');assert.match(h.modal().innerHTML,/确认入学/);h.click('confirm-university','xinghe');assert.match(h.modal().innerHTML,/成年后的生活按月推进/);
h.click('guide-start');for(const id of ['study','exercise','family','rest'])h.click('plan',id);h.click('advance');assert.equal(h.db().slots[0].game.time,217);h.click('event','0');h.click('guide-finish');
for(const id of ['people','growth','assets','family','life']){h.click('nav',id);assert.ok(!h.html().includes('undefined'));}
h.click('menu');const first=structuredClone(h.db().slots[0].game);h.click('new-life');h.click('choose-new-slot','0');h.click('close');assert.deepEqual(h.db().slots[0].game,first);
h.click('new-life');h.click('choose-new-slot','1');h.click('menu');assert.equal(h.db().slots[1],null,'Cancel setup without creating a save');
h.click('new-life');h.click('choose-new-slot','1');h.click('pick-trait','lucky');h.click('pick-trait','charming');h.click('create-character');assert.equal(h.db().current,1);assert.deepEqual(h.db().slots[0].game,first);
h.click('child-choice','1');h.click('menu');const snapshot=h.db();const refresh=await boot(snapshot);assert.deepEqual(refresh.db(),snapshot,'Title screen never writes');refresh.click('continue');assert.equal(refresh.db().slots[1].game.opening.index,1);
const legacy=E.newGame(909);legacy.pending={id:'legacy',tag:'成长碎片',title:'既有事件',text:'保持原有选择',options:[{label:'继续',desc:'心情 +1',effect:{mood:1}}]};
const legacyDb={current:0,slots:[{game:legacy,updated:1},null,null]},old=await boot(legacyDb);assert.deepEqual(old.db(),legacyDb);old.click('continue');assert.match(old.modal().innerHTML,/既有事件/);old.click('event','0');assert.match(old.html(),/伸向世界的第一只手/);
const mature=E.newGame(300);mature.time=360;const oldAdult=await boot({current:0,slots:[{game:mature,updated:1},null,null]});oldAdult.click('continue');assert.match(oldAdult.html(),/这个月，想做些什么/);assert.equal(oldAdult.db().slots[0].game.opening,undefined);
console.log('PASS: title, setup input, traits, full childhood + exam + admission + monthly guide, 5 views, cancel, slot isolation, legacy saves');
