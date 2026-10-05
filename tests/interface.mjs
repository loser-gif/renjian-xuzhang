import assert from 'node:assert/strict';
// DOM-contract smoke test; this is not a visual browser test.
const events=new Map(),store=new Map(),nodes=new Map();
for(const id of ['#app','#modal','#toast','#import-file'])nodes.set(id,{innerHTML:'',textContent:'',dataset:{},open:false,classList:{add(){},remove(){}},showModal(){this.open=true},close(){this.open=false},addEventListener(type,fn){events.set(id+type,fn)},click(){}});
globalThis.document={querySelector:s=>nodes.get(s),addEventListener:(t,fn)=>events.set(t,fn)};
globalThis.localStorage={getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)};
globalThis.window={scrollTo(){},addEventListener(){}};
await import('../app.js');
const click=(act,id,kind)=>events.get('click')({target:{closest:()=>({dataset:{act,id,kind},disabled:false,tagName:'BUTTON'})},preventDefault(){}});
const current=()=>JSON.parse(store.get('renjian-chronicles-v1')).slots[0].game;
assert.ok(nodes.get('#app').innerHTML.includes('开启新人生'));
assert.equal(store.size,0);
click('new-life');click('choose-new-slot','0');click('pick-trait','bright');click('pick-trait','sunny');click('create-character');for(let i=0;i<18;i++)click('child-choice','0');click('skip-exam');click('confirm-society');click('guide-skip');
assert.ok(nodes.get('#app').innerHTML.includes('这个月，想做些什么'));
for(const id of ['people','growth','assets','family','life']){click('nav',id);assert.ok(!nodes.get('#app').innerHTML.includes('undefined'));assert.ok(nodes.get('#app').innerHTML.includes('<main'));}
click('settings');assert.ok(nodes.get('#modal').open);assert.ok(nodes.get('#modal').innerHTML.includes('存档与设置'));click('close');
for(const id of ['study','exercise','family','rest'])click('plan',id);
assert.equal(current().plan.length,4);click('advance');assert.equal(current().time,217);
if(current().pending){click('event','0');assert.equal(current().pending,null);}
const father=current().people[0];click('person',father.id);assert.ok(nodes.get('#modal').innerHTML.includes(father.name));
click('interact',father.id,'talk');assert.equal(current().plan[0],'talk');
click('close');click('remove-plan','0');assert.equal(current().plan[0],'talk','Completed interaction cannot be undone');
console.log(JSON.stringify({passed:true,checks:['all-five-views-render','settings-dialog','four-action-month','event-resolution','person-memory-interaction','completed-action-protection']},null,2));
