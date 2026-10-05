import * as E from './engine.js?v=0.3';

export const CORE = [['ability','智力','violet'],['luck','运气','gold'],['appearance','颜值','rose'],['mood','心情','blue']];
export const TRAITS = [
  {id:'bright',name:'过目不忘',icon:'book',effect:{ability:8},desc:'智力 +8；成年后学习行动的智力收益提高 20%。'},
  {id:'lucky',name:'小小锦鲤',icon:'spark',effect:{luck:8},desc:'运气 +8；成长时遇到幸运小事的概率更高。'},
  {id:'charming',name:'天生出众',icon:'flower',effect:{appearance:8},desc:'颜值 +8；成年后约会更容易增进亲密。'},
  {id:'sunny',name:'天生乐天',icon:'heart',effect:{mood:8},desc:'心情 +8；每次成长选择额外恢复 1 点心情。'},
  {id:'curious',name:'好奇宝宝',icon:'book',effect:{ability:5,luck:5},desc:'智力 +5、运气 +5，愿意探索未知。'},
  {id:'gentle',name:'温暖笑容',icon:'users',effect:{appearance:5,mood:5},desc:'颜值 +5、心情 +5，带着笑容长大。'}
];
const option=(label,effect)=>({label,effect});
const event=(title,text,...options)=>({title,text,options});
export const CHILDHOOD = [
  event('伸向世界的第一只手','床边摆着彩色积木，你听见家人轻轻呼唤。这个世界的一切都很新鲜。',option('伸手研究积木',{ability:3}),option('对着家人咯咯笑',{mood:3,appearance:1})),
  event('摇摇晃晃的第一步','你已经能扶着沙发站起来。喜欢的玩具在几步之外，家人张开双臂等着你。',option('自己试着走过去',{ability:2,luck:1}),option('牵着家人的手走',{mood:3})),
  event('睡前故事里的秘密','故事讲到一半，你发现每次兔子都会回到同一棵树下。你有了自己的想法。',option('追问兔子为什么回家',{ability:3}),option('给故事编个快乐结尾',{mood:2,luck:1})),
  event('幼儿园的陌生面孔','第一次进入幼儿园，你看见有人搭积木，也有人抱着玩偶不肯松手。',option('邀请小朋友一起玩',{mood:3,appearance:1}),option('试试把积木搭得更高',{ability:3})),
  event('画纸上的自己','老师请大家画一幅自画像。彩笔铺满桌子，你仔细看看镜子里的脸。',option('观察五官，认真画下',{appearance:3,ability:1}),option('画一个会飞的自己',{mood:3,luck:1})),
  event('公园里的四叶草','周末和家人散步，你在草地里发现了一片形状特别的叶子。',option('耐心观察每一种叶子',{ability:2,luck:2}),option('把幸运分享给家人',{luck:3,mood:1})),
  event('第一天背上书包','小学教室里有崭新的课本，也有陌生的同桌。你想给这一天留下一点纪念。',option('工整地写下自己的名字',{ability:3}),option('和同桌交换小贴纸',{mood:3,luck:1})),
  event('一道不会的应用题','作业上最后一道题让你停下了笔。时间还早，你决定再试一种办法。',option('画图，把条件理清楚',{ability:4,mood:-1}),option('请家人陪你一起想',{ability:2,mood:2})),
  event('合唱团的邀请','学校合唱团招募新成员。你有点紧张，但很喜欢站在阳光下唱歌的感觉。',option('练习站姿和表情',{appearance:3,mood:1}),option('大胆报名，试试运气',{luck:3,mood:1})),
  event('自己的第一笔零花钱','攒了很久的零花钱终于够买一件小礼物。书店与玩具店都让你忍不住驻足。',option('买一本喜欢的故事书',{ability:3,mood:1}),option('和伙伴分享一个玩具',{mood:4})),
  event('运动会前的准备','班级选你参加开幕式。每天放学后，你都会留一点时间练习。',option('认真练习，精神饱满地出场',{appearance:3,mood:1}),option('帮大家想一个新口号',{ability:2,luck:2})),
  event('小学毕业的留言册','翻开留言册，有人说你认真，有人说和你在一起很开心。你想怎样记住这六年？',option('写下学到的事与未来目标',{ability:3}),option('收集每个人的祝福',{mood:3,luck:2})),
  event('初中的第一次小测','新的课程比想象中难。成绩单发下来，你决定给自己一点调整的时间。',option('整理错题，找到薄弱处',{ability:4,mood:-1}),option('制定学习和休息的平衡计划',{ability:2,mood:3})),
  event('镜子前的青春期','你开始在意自己的样子。穿什么、怎样说话，都慢慢有了自己的偏好。',option('找到适合自己的整洁穿搭',{appearance:4}),option('接纳自己，培养喜欢的兴趣',{mood:4,ability:1})),
  event('第一次为未来做打算','老师让大家写下想走的路。答案可以改变，但你愿意认真想一想。',option('查资料，了解感兴趣的方向',{ability:4}),option('参加开放日，看看不同生活',{luck:3,mood:2})),
  event('校园活动里的机会','校园文化节就要开始，你可以选择在幕前展示，也可以参与幕后策划。',option('登台主持，练习表达和仪态',{appearance:4,mood:1}),option('设计谜题，负责活动策划',{ability:3,luck:1})),
  event('疲惫时的一次选择','课业让生活变得紧凑。周末到来，你想把这段时间用在最需要的地方。',option('有计划地复习重点',{ability:4,mood:-2}),option('出去走走，再带着好心情回来',{mood:5,luck:1})),
  event('写给十八岁的自己','走到成年的门口，你回望那些小小的选择。新的生活，就要由你自己安排。',option('带着求知的心走向下一章',{ability:3,mood:2}),option('相信自己，也拥抱未知',{luck:3,appearance:1,mood:2}))
];

// Fifteen simple questions. The first option is correct in the source; both
// question order and option order are shuffled once and persisted per attempt.
export const QUESTIONS = [
  ['一边画蛇，一边给蛇添上脚。这个故事对应哪个成语？',['画蛇添足','守株待兔','掩耳盗铃','井底之蛙'],'多做了不必要的事，反而坏事，叫作「画蛇添足」。'],
  ['农夫守着树桩，盼望每天都有兔子撞上来。猜一个成语。',['守株待兔','亡羊补牢','叶公好龙','一举两得'],'守着偶然的好运，期待不劳而获，就是「守株待兔」。'],
  ['羊丢了之后，把羊圈修好。对应哪个成语？',['亡羊补牢','画龙点睛','杯弓蛇影','对牛弹琴'],'出了问题及时补救，叫作「亡羊补牢」。'],
  ['捂住自己的耳朵去偷铃铛。猜一个成语。',['掩耳盗铃','闻鸡起舞','刻舟求剑','水滴石穿'],'以为自己听不见别人也听不见，是「掩耳盗铃」。'],
  ['坐在井里，只能看见井口大小的天空。猜一个成语。',['坐井观天','海阔天空','天衣无缝','如鱼得水'],'「坐井观天」比喻眼界狭小。'],
  ['「千里之行」的下一句是什么？',['始于足下','更上一层楼','只争朝夕','路遥知马力'],'「千里之行，始于足下」，强调从眼前的一步开始。'],
  ['「床前明月光」的下一句是什么？',['疑是地上霜','低头思故乡','举头望明月','春眠不觉晓'],'李白《静夜思》开头是「床前明月光，疑是地上霜」。'],
  ['「欲穷千里目」的下一句是什么？',['更上一层楼','黄河入海流','白日依山尽','明月松间照'],'王之涣《登鹳雀楼》写道「欲穷千里目，更上一层楼」。'],
  ['一件衣服 100 元，打八折后多少钱？',['80 元','8 元','20 元','90 元'],'八折是原价的 80%，100 × 0.8 = 80。'],
  ['数列 2、4、6、8 的下一个数是什么？',['10','9','12','16'],'相邻两项相差 2，所以下一项是 10。'],
  ['长方形长 5、宽 3，面积是多少？',['15','16','8','30'],'长方形面积 = 长 × 宽，5 × 3 = 15。'],
  ['一天有多少个小时？',['24','12','36','60'],'一天有 24 个小时。'],
  ['一年四季中，春天之后是什么季节？',['夏天','秋天','冬天','仍是春天'],'四季依次为春、夏、秋、冬。'],
  ['英语单词 apple 通常表示什么？',['苹果','香蕉','橘子','葡萄'],'apple 表示苹果。'],
  ['「一石二鸟」最接近下面哪个意思？',['做一件事，得到两方面的好处','两个人各走各的路','把事情重复两遍','同时失去两样东西'],'「一石二鸟」与「一举两得」意思相近。']
];
export const UNIVERSITIES = [
  {id:'xinghe',name:'星河大学',min:650,type:'大学在读',years:4,tag:'研究型本科',desc:'深入学术与研究，入学智力 +5。',effect:{ability:5}},
  {id:'jiangcheng',name:'江城大学',min:500,type:'大学在读',years:4,tag:'综合本科',desc:'探索多样专业，入学智力 +3、心情 +2。',effect:{ability:3,mood:2}},
  {id:'qinghe',name:'清禾应用大学',min:350,type:'大学在读',years:4,tag:'应用型本科',desc:'侧重实践，入学智力 +2、运气 +2。',effect:{ability:2,luck:2}},
  {id:'haicheng',name:'海城职业学院',min:150,type:'专科在读',years:3,tag:'职业专科',desc:'学习职业技能，入学智力 +2、心情 +2。',effect:{ability:2,mood:2}}
];
export function effectsText(e){return CORE.filter(([k])=>e[k]).map(([k,label])=>`${label} ${e[k]>0?'+':''}${e[k]}`).join(' · ');}
export function randomName(){return E.active(E.newGame()).name;}
export function createLife(name,traits,seed){
  name=String(name).trim();
  if(!name||Array.from(name).length>12||/[\u0000-\u001f<>]/.test(name))throw Error('请输入 1—12 个字的名字，不含特殊控制字符');
  if(!Array.isArray(traits)||traits.length!==2||new Set(traits).size!==2||traits.some(id=>!TRAITS.some(t=>t.id===id)))throw Error('请选择两个不同的开局特质');
  const g=E.newGame(seed),p=E.active(g);
  p.name=name;p.ability=30;p.luck=30;p.appearance=30;p.mood=60;p.startTraits=[...traits];
  traits.forEach(id=>E.applyStats(p,TRAITS.find(t=>t.id===id).effect));
  g.opening={person:p.id,phase:'childhood',index:0,history:[],intro:true};
  g.guide={version:2,stage:'skipped'};
  g.logs=[];p.moments=[];E.addLog(g,'你好，世界',`你以「${name}」之名出生在${g.origin}，带着${traits.map(id=>TRAITS.find(t=>t.id===id).name).join('、')}的特质开始这一生。`,'milestone');
  return g;
}
export function isOpening(g){return !!g?.opening&&g.opening.person===g.active&&g.opening.phase!=='adult';}
export function migrate(g){
  for(const p of g.people){if(!Number.isFinite(p.luck))p.luck=50;if(!Array.isArray(p.startTraits))p.startTraits=[];}
  // Old lives retain their names, stats, relationships and completed events.
  // Remaining childhood years switch to one event per year after any pending event.
  if((!g.opening||g.opening.person!==g.active)&&E.age(g)<18&&!g.ended){g.opening={person:g.active,phase:'childhood',index:E.age(g),history:[],intro:true,legacy:true};g.plan=[];g.guide={version:2,stage:'skipped'};}
  return g;
}
export function chooseChildhood(g,index){
  const o=g.opening,p=E.active(g);if(!isOpening(g)||o.phase!=='childhood'||g.pending)throw Error('请先完成当前事件');
  const ev=CHILDHOOD[o.index],op=ev?.options[index];if(!Number.isInteger(index)||!op)throw Error('请选择有效的成长选项');
  const before=Object.fromEntries(CORE.map(([k])=>[k,p[k]]));E.applyStats(p,op.effect);
  if(p.startTraits.includes('sunny'))E.applyStats(p,{mood:1});
  const lucky=E.random(g)<p.luck/250;if(lucky)E.applyStats(p,{luck:1,mood:2});
  o.index++;g.time=p.born+o.index*12;p.education=o.index<3?'尚未入学':o.index<6?'幼儿园':o.index<12?'小学在读':o.index<15?'初中在读':o.index<18?'高中在读':'高中毕业';
  const deltas=Object.fromEntries(CORE.map(([k])=>[k,Math.round(p[k]-before[k])]));
  const record={age:o.index,title:ev.title,choice:op.label,deltas,lucky};o.history.push(record);o.last=record;
  E.addLog(g,ev.title,`你选择了「${op.label}」。${effectsText(deltas)}。${lucky?'幸运小事：在家人的鼓励里，你对未来多了一点信心。':''}`,'milestone');
  if(o.index===18){o.phase='choice';o.initial=Object.fromEntries(CORE.map(([k])=>[k,p[k]]));}
}
const shuffle=(g,a)=>{const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(E.random(g)*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;};
export function startExam(g){
  if(!isOpening(g)||g.opening.phase!=='choice')throw Error('现在无法开始考试');
  g.opening.phase='exam';g.opening.exam={paper:shuffle(g,QUESTIONS.map((_,i)=>i)).map(id=>({id,options:shuffle(g,[0,1,2,3])})),answers:[],cursor:0};
}
export function answerExam(g,optionIndex){
  const o=g.opening,x=o?.exam;if(!isOpening(g)||o.phase!=='exam'||x.answers.length!==x.cursor||!Number.isInteger(optionIndex)||optionIndex<0||optionIndex>3)throw Error('这道题已经提交或选项无效');
  x.answers.push(optionIndex);
}
export function examScore(g){const x=g.opening?.exam;return x?x.answers.reduce((sum,a,i)=>sum+(x.paper[i].options[a]===0?50:0),0):0;}
export function nextQuestion(g){
  const o=g.opening,x=o?.exam;if(!isOpening(g)||o.phase!=='exam'||x.answers.length!==x.cursor+1)throw Error('请先回答这道题');
  if(x.cursor<14)x.cursor++;else{o.phase='result';E.active(g).flags.examScore=examScore(g);E.addLog(g,'十八岁的答卷',`你完成了 15 道题，答对 ${examScore(g)/50} 道，获得 ${examScore(g)} / 750 分。`,'milestone');}
}
export function enterAdult(g,universityId=null){
  const o=g.opening,p=E.active(g);if(!isOpening(g)||!['choice','result'].includes(o.phase))throw Error('请先完成成长与考试选择');
  if(universityId){
    const u=UNIVERSITIES.find(u=>u.id===universityId);if(o.phase!=='result'||!u||examScore(g)<u.min)throw Error('当前成绩未达到这所学校的申请要求');
    p.education=u.type;p.flags.university=u.name;E.applyStats(p,u.effect);E.addLog(g,'大学录取通知',`以 ${examScore(g)} 分申请并进入${u.name}，将学习 ${u.years} 年。${effectsText(u.effect)}。`,'milestone');
  }else{p.education='高中毕业';p.flags.skippedExam=o.phase==='choice';E.addLog(g,'走向自己的生活',o.phase==='choice'?'你决定不参加考试，先走进社会。工作、学习和新的相遇都在前方。':'你决定暂不入学，带着这段成长经历走向社会。','milestone');}
  o.phase='adult';g.plan=[];g.guide={version:2,stage:'welcome'};
}
export function validateOpening(g){
  const o=g.opening;if(!o)return g;
  if(!g.people.some(p=>p.id===o.person)||!['childhood','choice','exam','result','adult'].includes(o.phase)||!Number.isInteger(o.index)||o.index<0||o.index>18||!Array.isArray(o.history)||o.history.length>18)throw Error('成长存档不完整');
  if(o.person===g.active&&o.phase!=='adult'&&(o.phase==='childhood'?o.index!==E.age(g)||o.index>=18:E.age(g)!==18||o.index!==18))throw Error('成长年龄与进度不一致');
  if(['exam','result'].includes(o.phase)||o.exam){const x=o.exam;if(!x||!Array.isArray(x.paper)||x.paper.length!==15||new Set(x.paper.map(q=>q.id)).size!==15||x.paper.some(q=>!Number.isInteger(q.id)||!QUESTIONS[q.id]||!Array.isArray(q.options)||q.options.length!==4||new Set(q.options).size!==4||q.options.some(a=>!Number.isInteger(a)||a<0||a>3))||!Array.isArray(x.answers)||x.answers.length>15||x.answers.some(a=>!Number.isInteger(a)||a<0||a>3)||!Number.isInteger(x.cursor)||x.cursor<0||x.cursor>14||x.answers.length<x.cursor||x.answers.length>x.cursor+1||o.phase==='result'&&x.answers.length!==15)throw Error('考试存档不完整');}
  return g;
}
