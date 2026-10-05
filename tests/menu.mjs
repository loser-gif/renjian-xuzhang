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
assert.match(h.html(),/开启新人生/);assert.match(h.html(),/存档管理/);assert.match(h.html(),/玩法说明/);
assert.equal(h.storage.size,0,'Opening title screen must not create a game or write a save');
h.click('help');assert.match(h.modal().innerHTML,/每个月，做四次选择/);h.click('help-step','4');assert.match(h.modal().innerHTML,/把故事好好保存/);h.click('close');
assert.equal(h.storage.size,0,'Reading instructions must not create a save');
h.click('settings');assert.match(h.modal().innerHTML,/disabled/);h.click('close');
h.click('new-life');assert.match(h.modal().innerHTML,/为故事选一个位置/);h.click('choose-new-slot','0');
assert.equal(h.db().slots[0].game.time,0);assert.equal(h.db().slots[0].game.guide.stage,'welcome');assert.match(h.modal().innerHTML,/带我开始/);
h.click('guide-start');assert.equal(h.db().slots[0].game.guide.stage,'plan');
for(const id of ['explore','express','family','rest'])h.click('plan',id);
assert.match(h.html(),/安排好了，让第一个月开始/);
h.click('advance');assert.equal(h.db().slots[0].game.time,1);assert.equal(h.db().slots[0].game.guide.stage,'event');assert.ok(h.db().slots[0].game.pending);
h.click('event','0');assert.equal(h.db().slots[0].game.pending,null);assert.equal(h.db().slots[0].game.guide.stage,'complete');assert.match(h.modal().innerHTML,/你已经走过第一个月/);
h.click('guide-finish');assert.equal(h.db().slots[0].game.guide.stage,'done');assert.equal(h.modal().open,false);
h.click('menu');const first=structuredClone(h.db().slots[0].game);assert.match(h.html(),/继续人生/);
h.click('new-life');h.click('choose-new-slot','0');assert.match(h.modal().innerHTML,/替换这段人生/);h.click('close');assert.deepEqual(h.db().slots[0].game,first,'Cancelled replacement must preserve the current life');
h.click('new-life');h.click('choose-new-slot','1');h.click('guide-skip');assert.equal(h.db().current,1);assert.equal(h.db().slots[1].game.guide.stage,'skipped');assert.deepEqual(h.db().slots[0].game,first,'New slot must preserve previous life');
h.click('menu');h.click('settings');h.click('switch-slot','0');assert.equal(h.db().current,0);assert.deepEqual(h.db().slots[0].game,first);assert.equal(h.modal().open,false,'Completed guide must not replay automatically');
const snapshot=h.db(),fresh=await boot(snapshot);assert.match(fresh.html(),/继续人生/);assert.deepEqual(fresh.db(),snapshot,'Opening menu on reload must be read-only');fresh.click('continue');assert.deepEqual(fresh.db().slots[0].game,first);

// Existing v1 saves have no guide. Pending events should wait until Continue.
const legacy=E.newGame(909);legacy.pending={id:'legacy',tag:'成长碎片',title:'既有事件',text:'保持原有选择',options:[{label:'继续',desc:'心情 +1',effect:{mood:1}}]};
const legacyDb={current:0,slots:[{game:legacy,updated:1},null,null]},old=await boot(legacyDb);
assert.equal(old.modal().open,false);assert.deepEqual(old.db(),legacyDb);old.click('continue');assert.match(old.modal().innerHTML,/既有事件/);assert.equal(old.db().slots[0].game.guide,undefined);old.click('event','0');assert.equal(old.db().slots[0].game.pending,null);assert.equal(old.modal().open,false);

// An interrupted first-month guide resumes its stage and already chosen actions.
const interrupted=E.newGame(101);interrupted.guide={version:1,stage:'plan',startTime:0};E.setPlan(interrupted,'explore');
const resume=await boot({current:0,slots:[{game:interrupted,updated:2},null,null]});resume.click('continue');assert.match(resume.html(),/新手引导/);assert.deepEqual(resume.db().slots[0].game.plan,['explore']);
console.log(JSON.stringify({passed:true,checks:['read-only-title-screen','guide-four-step-flow','skip-and-resume','existing-v1-save-compatibility','pending-event-resume','new-slot-isolation','cancelled-replacement','reload-preserves-life','help-without-save']},null,2));
