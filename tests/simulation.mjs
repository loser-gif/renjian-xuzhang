import assert from 'node:assert/strict';
import * as E from '../engine.js';

function finishEvent(g){if(g.pending)E.resolveEvent(g,g.pending.id==='parenthood'?1:0);}
function next(g,desired){finishEvent(g);if(g.ended)return;const available=E.actions(g).map(x=>x.id);const defaults=E.age(g)<3?['explore','express','family','rest']:E.age(g)<22?['study','exercise','family','rest']:['work','exercise','family','rest'];while(g.plan.length<4){const choice=(desired||defaults)[g.plan.length];E.setPlan(g,available.includes(choice)?choice:'rest');}E.advance(g);finishEvent(g);}
function until(g,age){while(E.age(g)<age&&!g.ended)next(g);}

const g=E.newGame(640);
assert.equal(E.age(g),0);
assert.equal(g.people.length,3);
assert.throws(()=>E.advance(g));
assert.throws(()=>E.setPlan(g,'work'));
until(g,18);
assert.equal(E.age(g),18);
assert.ok(['大学在读','专科在读'].includes(E.active(g).education));
assert.ok(E.active(g).moments.some(m=>m.title==='十八岁，路向远方'));
until(g,23);
assert.ok(E.active(g).job,'A job must be obtainable');
assert.ok(E.income(g)>0);
const original=E.active(g);
// Meet and build a relationship through the actual action loop.
for(let i=0;i<18;i++)next(g,['date','date','exercise','rest']);
const partner=g.people.filter(q=>!q.family&&q.alive&&E.age(g,q)>=22).sort((a,b)=>E.bond(g,original.id,b.id).closeness-E.bond(g,original.id,a.id).closeness)[0];
assert.ok(partner);
while(E.bond(g,original.id,partner.id).closeness<70||E.bond(g,original.id,partner.id).trust<55){E.interact(g,partner.id,'talk');next(g);}
E.interact(g,partner.id,'marry');
assert.equal(partner.spouse,original.id);
assert.equal(original.spouse,partner.id);
assert.ok(g.plan.includes('talk'));
E.validateGame(g);
const child=E.haveChild(g);
assert.ok(child.parents.includes(original.id));
assert.equal(child.generation,2);
assert.throws(()=>E.handoff(g,child.id));
assert.throws(()=>E.haveChild(g),'Birth cooldown must prevent duplicates');
while(E.age(g,child)<18&&!g.ended)next(g);
assert.ok(!g.ended,'Parent survived to succession in deterministic fixture');
assert.ok(E.successors(g).some(c=>c.id===child.id));
const before=original.savings,childBefore=child.savings;
E.handoff(g,child.id);
assert.equal(g.active,child.id);
assert.equal(original.savings,before,'Handoff cannot duplicate or move assets');
assert.equal(child.savings,childBefore);
assert.ok(original.alive);
assert.equal(E.relationship(g,original),original.gender==='男'?'父亲':'母亲');
const roundtrip=E.validateGame(JSON.parse(JSON.stringify(g)));
const a=structuredClone(roundtrip),b=structuredClone(roundtrip);next(a);next(b);
assert.deepEqual(a,b,'Saved random state must resume deterministically');
assert.throws(()=>E.validateGame({...g,active:'missing'}));
assert.throws(()=>E.validateGame({...g,people:[{...child,savings:NaN}]}));
assert.throws(()=>E.resolveEvent(g,-1));

// Asset operations and gifts conserve value and never transfer control.
E.active(g).savings=700000;E.active(g).debt=0;
E.assetAction(g,'buyHome');assert.equal(E.active(g).debt,480000);assert.equal(E.active(g).homes,1);
E.assetAction(g,'sellHome');assert.equal(E.active(g).debt,0);assert.equal(E.active(g).savings,700000);
const donor=E.active(g),parentBefore=original.savings;
E.gift(g,original.id,10000);assert.equal(donor.savings,690000);assert.equal(original.savings,parentBefore+10000);

// Estate settlement on the previous generation death.
original.health=0;original.savings=20000;original.debt=5000;original.homes=0;original.business=0;
const oldId=original.id;next(g,['rest','rest','rest','rest']);
assert.equal(g.people.find(p=>p.id===oldId).alive,false);
assert.equal(g.active,child.id);assert.equal(original.savings,0);assert.equal(original.debt,0);

// Simulate multiple independent lifetimes, including retirement, death and succession.
const results=[];
for(const seed of [11,22,33]){const x=E.newGame(seed);let months=0;while(!x.ended&&months<1250){next(x);months++;if(months%120===0)E.validateGame(x);}assert.ok(x.ended);assert.ok(E.age(x)>=60);assert.ok(E.active(x).moments.some(m=>m.title==='把时间还给自己'));E.validateGame(x);results.push({seed,months,lifespan:E.age(x)});}
console.log(JSON.stringify({passed:true,checks:['birth-to-graduation','employment','relationship-and-marriage','child-development','adult-succession','asset-ownership','estate-settlement','save-roundtrip','deterministic-resume','invalid-inputs','three-full-lifetimes'],lifetimes:results},null,2));
