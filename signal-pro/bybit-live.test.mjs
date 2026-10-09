import { readFileSync } from 'node:fs';
const html = readFileSync(new URL('./index.html', import.meta.url), 'utf8');
const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]).filter(x=>x.trim());
for (const script of scripts) new Function(script);
new Function(scripts.join('\n'));
const scaffold = "\n\nconst calls=[],notices=[],storage=new Map();\nconst navigator={locks:{request:async(name,opt,fn)=>fn(cfg.lockUnavailable?null:{name})}};\nconst localStorage={getItem:k=>storage.get(k)||null,setItem:(k,v)=>{if(cfg.storageFails)throw Error(\"storage unavailable\");storage.set(k,v);}};\nlet seq=0;const crypto={randomUUID:()=>String(++seq).padStart(32,\"0\")};\nconst S={live:null,cfg:{beAfterR:0},trades:[{id:\"t1\",symbol:\"BTCUSDT\",entry:100,stop:98,target:104,signalAt:Date.now(),status:\"open\"}]};\nconst KEY=\"test\",view=\"live\";const document={};const window={addEventListener:()=>{}};\nconst $=()=>null,fin=Number.isFinite,usd=x=>\"$\"+x,base=x=>x,nx=x=>x,esc=String,stamp=String,ago=String,cls=()=>\"\",kpi=()=>\"\";\nconst logit=(...a)=>notices.push(a),notify=()=>{},renderNav=()=>{},toast=(...a)=>notices.push(a),go=()=>{},beep=()=>{};\nconst save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}};\nconst setTimeout=()=>1,clearTimeout=()=>{};\n\n__SIGNAL_PURE__\n__SIGNAL_LIVE__\nconst actualPrivate=bbPrivate;\nlet transportCount=0;\nclass URLSearchParams { constructor(p){this.p=p;} toString(){return Object.entries(this.p).map(([k,v])=>encodeURIComponent(k)+\"=\"+encodeURIComponent(v)).join(\"&\");} }\nclass AbortController { constructor(){this.signal={};} abort(){} }\nconst fetch=async(url,options)=>{transportCount++;calls.push({transport:true,url,options});if(cfg.transportHook)await cfg.transportHook({LK,BB,state});return {status:200,json:async()=>cfg.transportResult || {retCode:0,result:{ok:true}}};};\nhmacHex=async(secret,msg)=>{state.signatureMsg=msg;return \"test-signature\";};\nconst state={entry:null,position:null,close:null,cp:[],exitOrders:[],last:100,available:\"100\",mode:\"REGULAR_MARGIN\",idx:0,leverage:\"1\",repairFails:false,...cfg.state};\nbbPublic=async(path,params)=>{\n if(path.includes(\"instruments\"))return {result:{list:[{symbol:params.symbol,settleCoin:\"USDT\",contractType:\"LinearPerpetual\",status:\"Trading\",lotSizeFilter:{qtyStep:\"0.001\",minOrderQty:\"0.001\",maxMktOrderQty:\"1000\",maxOrderQty:\"1000\",minNotionalValue:\"5\"},priceFilter:{tickSize:\"0.01\"}}]}};\n if(path.includes(\"tickers\"))return {result:{list:[{lastPrice:String(state.last)}]}};\n return {time:Date.now()};\n};\nbbPrivate=async(method,path,params={})=>{\n calls.push({method,path,params});\n if(cfg.onCall)await cfg.onCall(method,path,params,{S,LK,BB,LV,state});\n if(path===\"/v5/user/query-api\")return {userID:7,readOnly:0,isMaster:false,permissions:{ContractTrade:[\"Order\",\"Position\"],Wallet:[]},...(cfg.keyInfo||{})};\n if(path===\"/v5/account/info\")return {unifiedMarginStatus:5,marginMode:state.mode};\n if(path===\"/v5/account/wallet-balance\")return {list:[{accountType:\"UNIFIED\",totalAvailableBalance:state.available,coin:[{coin:\"USDT\",walletBalance:\"100\",equity:\"100\",totalPositionIM:\"0\",totalOrderIM:\"0\",locked:\"0\",bonus:\"0\",spotBorrow:\"0\"}]}]};\n if(path===\"/v5/account/fee-rate\")return {list:[{symbol:params.symbol,takerFeeRate:\"0.00055\"}]};\n if(path===\"/v5/position/list\")return {list:state.position?[state.position]:params.symbol?[{symbol:params.symbol,size:\"0\",positionIdx:state.idx,leverage:state.leverage}]:[],nextPageCursor:\"\"};\n if(path===\"/v5/order/realtime\"||path===\"/v5/order/history\"){\n  let list=[state.entry,state.close,...state.exitOrders].filter(Boolean);\n  if(params.orderLinkId)list=list.filter(x=>x.orderLinkId===params.orderLinkId);\n  else if(params.orderId)list=list.filter(x=>x.orderId===params.orderId);\n  else list=list.filter(x=>[\"New\",\"PartiallyFilled\"].includes(x.orderStatus)||x.stopOrderType);\n  return {list,nextPageCursor:\"\"};\n }\n if(path===\"/v5/position/set-leverage\"){state.leverage=\"1\";return {};}\n if(path===\"/v5/order/create\"){\n  if(params.side===\"Buy\"){\n   state.entry={...params,orderId:\"entry1\",orderStatus:cfg.ackOnly?\"New\":\"Filled\",cumExecQty:cfg.ackOnly?\"0\":String(+params.qty*(cfg.partial?.5:1)),avgPrice:\"100\"};\n   if(!cfg.ackOnly)state.position={symbol:\"BTCUSDT\",size:state.entry.cumExecQty,side:\"Buy\",positionIdx:0,leverage:\"1\",avgPrice:\"100\",markPrice:\"100\",stopLoss:cfg.missingProtection?\"0\":params.stopLoss,takeProfit:cfg.missingProtection?\"0\":params.takeProfit,unrealisedPnl:\"0\"};\n   if(cfg.entryTimeout)throw new BybitError(-2,\"timeout\");\n   return {orderId:\"entry1\"};\n  }\n  state.close={...params,orderId:\"close1\",orderStatus:cfg.closeAckOnly?\"New\":\"Filled\",cumExecQty:cfg.closeAckOnly?\"0\":params.qty};\n  if(!cfg.closeAckOnly){state.position=null;state.cp=[{orderId:\"close1\",symbol:\"BTCUSDT\",closedSize:params.qty,closedPnl:\"1.25\",avgExitPrice:\"102\",updatedTime:String(Date.now())}];}\n  return {orderId:\"close1\"};\n }\n if(path===\"/v5/position/trading-stop\"){\n   if(state.repairFails)throw new BybitError(10001,\"repair failed\");\n   if(state.position){if(params.stopLoss)state.position.stopLoss=params.stopLoss;if(params.takeProfit)state.position.takeProfit=params.takeProfit;}\n   return {};\n }\n if(path===\"/v5/position/closed-pnl\")return {list:state.cp,nextPageCursor:\"\"};\n throw Error(\"unmocked \"+path);\n};\nreturn {S,L,LK,BB,LV,state,calls,notices,storage,LIVECORE,walletAvailable,numericField,exposureBudget,\n actualPrivate,liveConnect,liveSet,livePrepare,liveExecute,liveSync,liveSyncOnce,liveClose,liveCloseAll,submitLiveClose,\n buildLivePreparation,assertLiveApproval,configStamp,lookupOrder,ownedPosition,positionProtection,\n liveOpen,liveClosed,liveRealized,checkLock,vLive};\n";
const factory = new Function('cfg', scaffold.replace('__SIGNAL_PURE__',scripts[1]).replace('__SIGNAL_LIVE__',scripts[3]));
const runTests = async function(factory){
const out=[];const check=(name,condition)=>{if(!condition)throw Error("FAIL: "+name);out.push(name);};
const setup=async(cfg={})=>{const a=factory(cfg);a.LK.key="testkey";a.LK.secret="secret";await a.liveConnect();a.liveSet("enabled",true);return a;};
const entries=a=>a.calls.filter(x=>x.path==="/v5/order/create"&&x.params.side==="Buy");
const a=await setup();await a.livePrepare("t1");await a.liveExecute();
check("entry uses IOC price limit and 1x leverage",entries(a).length===1&&entries(a)[0].params.timeInForce==="IOC"&&a.calls.some(x=>x.path==="/v5/position/set-leverage"&&x.params.buyLeverage==="1"));
check("entry risk includes fees and stays in budget",a.L().orders[0].riskUsd<=2);
check("fill and protections verified",a.L().orders[0].status==="open"&&a.L().orders[0].protectionOk);
check("render live page",typeof a.vLive()==="string"&&a.vLive().includes("3.9"));
await a.liveClose(a.L().orders[0].linkId);await a.liveClose(a.L().orders[0].linkId);
check("close only exact verified size with reduceOnly",a.calls.find(x=>x.path==="/v5/order/create"&&x.params.side==="Sell").params.qty==="0.643"&&a.calls.find(x=>x.params.side==="Sell").params.reduceOnly===true);
check("closed pnl tied to exit ID",a.L().orders[0].status==="closed"&&a.liveRealized()===1.25);
check("testnet gate unlocks only after verified round trip",!!a.L().testnetVerified);
const av=await setup({state:{available:"0"}});
check("zero available never falls back to wallet balance",av.BB.wallet.avail===0);
await av.livePrepare("t1");check("zero balance blocks entry",av.LV.prep.blocks.length>0);
for(const action of ["disabled","loss","env","risk"]){
 const b=await setup();await b.livePrepare("t1");
 if(action==="disabled")b.L().enabled=false;
 if(action==="loss")b.L().locked="loss";
 if(action==="env")b.L().env="mainnet";
 if(action==="risk")b.L().riskPct=1;
 await b.liveExecute();check("stale approval blocked: "+action,entries(b).length===0);
}
const u=await setup({entryTimeout:true});await u.livePrepare("t1");await u.liveExecute();
check("timeout retains reservation and disables new entries",u.L().orders[0].status==="pending"&&!u.L().enabled);
await u.liveSync();check("timeout recovered using orderLinkId",u.L().orders[0].status==="open"&&u.L().orders[0].protectionOk&&entries(u).length===1);
const ack=await setup({ackOnly:true});await ack.livePrepare("t1");await ack.liveExecute();
check("acknowledgement is not treated as a fill",ack.L().orders[0].status==="pending"&&!ack.L().orders[0].entryConfirmed);
const partial=await setup({partial:true});await partial.livePrepare("t1");await partial.liveExecute();
check("partial fill uses actual executed quantity",partial.L().orders[0].filledQty===partial.L().orders[0].qty/2);
const repair=await setup({missingProtection:true});await repair.livePrepare("t1");await repair.liveExecute();
check("missing protection repaired and re-read",repair.L().orders[0].protectionOk&&repair.calls.some(x=>x.path==="/v5/position/trading-stop"));
const badRepair=await setup({missingProtection:true,state:{repairFails:true}});await badRepair.livePrepare("t1");await badRepair.liveExecute();
check("failed protection repair disables entries",!badRepair.L().enabled&&!badRepair.L().orders[0].protectionOk);
const foreign=await setup({state:{position:{symbol:"ETHUSDT",size:"1",side:"Buy",positionIdx:0,avgPrice:"60",markPrice:"60",unrealisedPnl:"0"}}});
await foreign.livePrepare("t1");check("external position blocks new entries",foreign.LV.prep.blocks.some(x=>x.includes("אינה במעקב")));
const hedge=await setup({state:{idx:1}});await hedge.livePrepare("t1");check("hedge mode blocks preparation",hedge.LV.prep.state==="error");
const noStorage=await setup();await noStorage.livePrepare("t1"); // change config used by factory after preparation
const storageFailureCfg={};const sf=await setup(storageFailureCfg);await sf.livePrepare("t1");storageFailureCfg.storageFails=true;await sf.liveExecute();
check("failed persistence prevents submission",entries(sf).length===0);
const lock=await setup({lockUnavailable:true});await lock.livePrepare("t1");await lock.liveExecute();check("concurrent tab lock blocks execution",entries(lock).length===0);
const move=await setup();await move.livePrepare("t1");move.state.last=102;await move.liveExecute();check("price above approved limit blocks submission",entries(move).length===0);
const closeAck=await setup({closeAckOnly:true});await closeAck.livePrepare("t1");await closeAck.liveExecute();await closeAck.liveClose(closeAck.L().orders[0].linkId);await closeAck.liveClose(closeAck.L().orders[0].linkId);
check("close acknowledgement remains pending",closeAck.L().orders[0].status==="closing"&&closeAck.liveClosed().length===0);
check("transfer-enabled keys refused",!a.LIVECORE.keyVerdict({readOnly:0,permissions:{ContractTrade:["Order","Position"],Wallet:["AccountTransfer"]}}).ok);
check("missing readonly status refused",!a.LIVECORE.keyVerdict({permissions:{ContractTrade:["Order","Position"],Wallet:[]}}).ok);
const snap={positions:[{symbol:"BTCUSDT",size:"1",avgPrice:"60",markPrice:"60",unrealisedPnl:"0"}],orders:[],wallet:{avail:100}};
const budget=a.exposureBudget(snap);check("aggregate exposure subtracts existing positions",budget.used===60&&budget.remaining===40);
const main=await setup();main.liveSet("env","mainnet");check("mainnet blocked without verified testnet round trip",main.L().env==="testnet");
const noRecord=await setup({ackOnly:true});await noRecord.livePrepare("t1");await noRecord.liveExecute();noRecord.state.entry=null;await noRecord.liveSync();check("missing record is not proof of rejection",noRecord.L().orders[0].status==="pending");
const refused=await setup({ackOnly:true});await refused.livePrepare("t1");await refused.liveExecute();refused.state.entry.orderStatus="Rejected";await refused.liveSync();check("confirmed zero-fill rejection releases reservation",refused.L().orders[0].status==="failed");
const mismatch=await setup();await mismatch.livePrepare("t1");await mismatch.liveExecute();mismatch.state.position.size="10";await mismatch.liveSync();await mismatch.liveClose(mismatch.L().orders[0].linkId);await mismatch.liveClose(mismatch.L().orders[0].linkId);
check("foreign added quantity cannot be closed by app",!mismatch.calls.some(x=>x.path==="/v5/order/create"&&x.params.side==="Sell"));

const tp=factory({transportResult:{retCode:10002,retMsg:"clock"}});tp.LK.key="key";tp.LK.secret="sec";
try{await tp.actualPrivate("POST","/v5/order/create",{symbol:"BTCUSDT"});}catch(e){}
check("POST is never automatically repeated after clock rejection",tp.calls.filter(x=>x.transport).length===1);
check("signature input and headers match submitted JSON",tp.state.signatureMsg.endsWith('key10000{"symbol":"BTCUSDT"}')&&tp.calls.find(x=>x.transport).options.body==='{"symbol":"BTCUSDT"}');
const tg=factory({transportHook:({BB})=>BB.generation++});tg.LK.key="key";tg.LK.secret="sec";let staleResponse=false;
try{await tg.actualPrivate("GET","/v5/account/info");}catch(e){staleResponse=e.message.includes("החיבור השתנה");}
check("response from changed connection is rejected",staleResponse);
const tamper=await setup();await tamper.livePrepare("t1");await tamper.liveExecute();tamper.state.position.stopLoss="99";
await tamper.liveSync();check("externally modified protection is not overwritten",!tamper.L().enabled&&!tamper.calls.some(x=>x.path==="/v5/position/trading-stop"));
const float=await setup();float.BB.snapshot.positions=[{symbol:"BTCUSDT",unrealisedPnl:"-21"}];float.checkLock();
check("floating losses trigger entry lock",!!float.L().locked);
const polluted=await setup();polluted.L().orders.push({env:"mainnet",status:"closed",accountUid:"other",pnl:-99});
check("testnet and mainnet pnl stay separate",polluted.liveRealized()===0);
const cpOther=await setup();await cpOther.livePrepare("t1");await cpOther.liveExecute();
await cpOther.submitLiveClose(cpOther.L().orders[0]);cpOther.state.cp.push({orderId:"unrelated",closedSize:"10",closedPnl:"999",avgExitPrice:"500",updatedTime:String(Date.now())});
await cpOther.liveSync();check("unrelated closed pnl never enters results",cpOther.liveRealized()===1.25);
const malformed=await setup();let walletBlocked=false;
try{malformed.walletAvailable({coin:[{coin:"USDT",walletBalance:"100"}],totalAvailableBalance:"100"},"REGULAR_MARGIN");}catch(e){walletBlocked=true;}
check("incomplete wallet data fails closed",walletBlocked);
let finalPriceCalls=0;
const late=await setup({onCall:(method,path,params,{L,S,BB,LV,state})=>{}});
await late.livePrepare("t1");
// A change during final leverage verification invalidates the original authorization.
const lateCfg={onCall:(method,path,params,{S})=>{if(method==="POST"&&path==="/v5/position/set-leverage")S.live.enabled=false;}};
const late2=await setup(lateCfg);await late2.livePrepare("t1");await late2.liveExecute();
check("approval rechecked after leverage request",entries(late2).length===0);
return out;
};
const results = await runTests(factory);
console.log('PASS: '+results.length+' regression checks');
for(const result of results) console.log('✓ '+result);
