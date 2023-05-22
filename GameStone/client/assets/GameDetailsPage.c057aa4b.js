import{_ as I,k as P,m as S,A as n,n as B,b as m,g as x,P as f,l as d,d as T,M as F,G as L,c as s,f as t,t as c,F as y,q as G,s as k,h as w,w as b,j as i,r as M,o as a,p as N,i as j}from"./index.7ff72629.js";const A={setup(){const _=P();async function h(){try{const e=_.params.gameId;await x.getGameById(e)}catch(e){d.log(e),f.error(e.message)}}async function C(){try{const e=n.account.id;d.log("is this stupid thing working? pls be",e),await x.getProfileGames(e)}catch(e){d.error(e.message),f.error(e.message)}}return S(()=>{h(),n.gatherings=[]}),B(()=>{n.account.id&&C()}),{game:m(()=>n.activeGame),profileGames:m(()=>n.profileGames.find(e=>e.gameId==n.activeGame.id)),account:m(()=>n.account),gatherings:m(()=>n.gatherings),activeCategories:m(()=>{var g;const e=n.activeGame,l=[];return(g=e.categories)==null||g.forEach(u=>{let v=n.gameCategories.find(p=>p.id==u.id);l.push(v)}),l}),activeMechanics:m(()=>{var g;const e=n.activeGame,l=[];return(g=e.mechanics)==null||g.forEach(u=>{let v=n.gameMechanics.find(p=>p.id==u.id);l.push(v)}),l}),async addGame(){try{let e={gameId:this.game.id,gameName:this.game.name,gameImg:this.game.image_url};await x.addGame(e),await f.toast("Added game to your collection","success","center")}catch(e){d.log(e.message),f.error(e.message)}},async searchGatherings(){try{const e=n.activeGame.name;d.log(e);const l=await T.searchGatherings(e);d.log("game search page",l)}catch(e){d.log(e.message),f.error(e.message)}}}},components:{Modal:F,GatheringCard:L}},r=_=>(N("data-v-5959216f"),_=_(),j(),_),E={class:"container-fluid"},H={class:"row justify-content-center"},V={class:"col-xl-11 py-3"},D={class:"row"},q=["innerHTML"],R=["innerHTML"],z={class:"col-xl-5 text-center"},J=["src"],K={class:"row justify-content-center mt-4"},O={class:"col-xl-11"},Q={class:"row"},U={class:"col-xl-7"},W={class:"row"},X={class:"col-4"},Y={key:0},Z=i("Players: "),$={class:"text-secondary"},ee={key:1},te=i("Players: "),se={class:"text-white"},ae={key:2},oe=i("Categories: "),ne=r(()=>t("br",null,null,-1)),ce={key:3},ie=i("Categories: "),re=r(()=>t("br",null,null,-1)),le={class:"col-4"},de={key:0},_e=i("Playtime:"),he={class:"text-secondary"},ge={key:1},me=i("Playtime: "),ye={class:"text-white"},ue={key:2},ve=i("Mechanics: "),pe=r(()=>t("br",null,null,-1)),fe={key:3},Ge=i("Mechanics: "),xe=r(()=>t("br",null,null,-1)),ke={class:"col-md-4"},we=r(()=>t("div",{class:"col-md-4"},null,-1)),Me={class:"col-xl-5"},Ce={key:0,class:"row text-center"},be=r(()=>t("h4",null,"Gatherings Playing This Game",-1)),Ie=[be],Pe={key:1,class:"row"},Se=r(()=>t("div",{class:"row"},null,-1)),Be=r(()=>t("div",{class:"row justify-content-center my-4"},null,-1)),Te=r(()=>t("h5",null,"Create Gathering!",-1));function Fe(_,h,C,e,l,g){const u=M("GatheringCard"),v=M("CreateGatheringForm"),p=M("Modal");return a(),s(y,null,[t("div",E,[t("div",H,[t("div",V,[t("div",D,[t("h2",null,c(e.game.name),1),e.account.lightMode?(a(),s("div",{key:0,class:"text-secondary col-xl-7",innerHTML:e.game.description},null,8,q)):(a(),s("div",{key:1,class:"text-white col-xl-7",innerHTML:e.game.description},null,8,R)),t("div",z,[t("img",{src:e.game.image_url,class:"imgContainer ms-4 mb-3"},null,8,J)])])])]),t("div",K,[t("div",O,[t("div",Q,[t("div",U,[t("div",W,[t("div",X,[e.account.lightMode?(a(),s("p",Y,[Z,t("span",$,c(e.game.min_players)+" - "+c(e.game.max_players),1)])):(a(),s("p",ee,[te,t("span",se,c(e.game.min_players)+" - "+c(e.game.max_players),1)])),e.account.lightMode?(a(),s("p",ae,[oe,(a(!0),s(y,null,G(e.activeCategories,o=>(a(),s("span",{class:"text-secondary",id:"gameCategories",key:o.id},[ne,i(c(o.name),1)]))),128))])):(a(),s("p",ce,[ie,(a(!0),s(y,null,G(e.activeCategories,o=>(a(),s("span",{class:"text-white",id:"gameCategories",key:o.id},[re,i(c(o.name),1)]))),128))]))]),t("div",le,[e.account.lightMode?(a(),s("p",de,[_e,t("span",he,c(e.game.min_playtime)+" - "+c(e.game.max_playtime),1)])):(a(),s("p",ge,[me,t("span",ye,c(e.game.min_playtime)+" - "+c(e.game.max_playtime),1)])),e.account.lightMode?(a(),s("p",ue,[ve,(a(!0),s(y,null,G(e.activeMechanics,o=>(a(),s("span",{class:"text-secondary",id:"gameMechanics",key:o.id},[pe,i(c(o.name),1)]))),128))])):(a(),s("p",fe,[Ge,(a(!0),s(y,null,G(e.activeMechanics,o=>(a(),s("span",{class:"text-white",id:"gameMechanics",key:o.id},[xe,i(c(o.name),1)]))),128))]))]),t("div",ke,[t("button",{class:"btn btn-info border rounded-pill selectable my-2",onClick:h[0]||(h[0]=o=>e.searchGatherings())},"Find Gatherings"),!e.profileGames&&e.account.id?(a(),s("button",{key:0,onClick:h[1]||(h[1]=o=>e.addGame()),class:"btn btn-info border rounded-pill selectable"},"Add Game to Collection")):k("",!0)]),we])]),t("div",Me,[e.gatherings.length>0?(a(),s("div",Ce,Ie)):k("",!0),e.gatherings.length>0?(a(),s("div",Pe,[(a(!0),s(y,null,G(e.gatherings,o=>(a(),s("div",{class:"col-12",key:o==null?void 0:o.id},[w(u,{gathering:o},null,8,["gathering"])]))),128))])):k("",!0)])])])]),Se,Be]),w(p,{id:"gatheringModal"},{header:b(()=>[Te]),modalBody:b(()=>[w(v)]),_:1})],64)}const Ne=I(A,[["render",Fe],["__scopeId","data-v-5959216f"]]);export{Ne as default};