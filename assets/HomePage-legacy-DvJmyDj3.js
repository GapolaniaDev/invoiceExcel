System.register(["./index-legacy-DDogIXDl.js","./utils-legacy-DYBGy2vf.js"],(function(e,l){"use strict";var a,t,u,n,o,d,m,s,c,i,r,p,V,v,f,_,y,b,g,h,U,N,w,D;return{setters:[e=>{a=e._,t=e.r,u=e.u,n=e.o,o=e.c,d=e.w,m=e.a,s=e.b,c=e.I,i=e.d,r=e.e,p=e.f,V=e.g,v=e.h,f=e.i,_=e.j,y=e.k,b=e.l,g=e.m,h=e.n,U=e.p},e=>{N=e.g,w=e.a,D=e.b}],execute:function(){var l=document.createElement("style");l.textContent=".example-content[data-v-2fa0003e]{display:flex;align-items:center;justify-content:center;height:100%}\n",document.head.appendChild(l),e("default",a({__name:"HomePage",setup(e){const l=t(!1),a=t(null),I=t(null),x=t(!1);x.value=!1;const E=u(),C=E.state.mainExcel,S=E.state.itemExcel;E.commit("setInvoiceNumber",N(new Date));const T=E.state.employee,A=E.state.company,j=t(null),k=t(null),B=()=>{E.commit("setStartDate",k.value),E.commit("setEndDate",j.value),E.commit("setInvoiceNumber",new Date(k.value||Date())),l.value=!0,k.value&&j.value||(l.value=!1);const e=new Date(k.value),t=new Date(j.value);(isNaN(e.getTime())||isNaN(t.getTime()))&&(l.value=!1),e>=t&&(l.value=!1),l.value&&(console.log("ass"),E.dispatch("actionRemoveItemsKitchen"),a.value=w(new Date(k.value),new Date(j.value)),a.value.forEach((e=>{const l={id:null,date:e.date,room:e.room,type:"1",description:e.description,time:"",amount:e.amount};E.commit("setItem",l),E.commit("SetNewItem",S),E.dispatch("calculateTotal")})),I.value=D(new Date(k.value),new Date(j.value)),I.value.forEach((e=>{const l={id:null,date:e.date,room:e.room,type:"1",description:e.description,time:"",amount:e.amount};E.commit("setItem",l),E.commit("SetNewItem",S),E.dispatch("calculateTotal")})))};return(e,l)=>(n(),o(m(U),null,{default:d((()=>[s(m(p),null,{default:d((()=>[s(m(c),null,{default:d((()=>[s(m(i),null,{default:d((()=>[r("Make your invoice")])),_:1})])),_:1})])),_:1}),s(m(h),{class:"ion-padding"},{default:d((()=>[s(m(V),{slot:"fixed",onIonRefresh:l[0]||(l[0]=e=>{return l=e,void setTimeout((()=>{l.target.complete()}),2e3);var l})},{default:d((()=>[s(m(v))])),_:1}),s(m(f),{class:"ion-padding"},{default:d((()=>[s(m(_),null,{default:d((()=>[s(m(y),null,{default:d((()=>[s(m(b),{label:"Name",modelValue:m(T).name,"onUpdate:modelValue":l[1]||(l[1]=e=>m(T).name=e),readonly:!0},null,8,["modelValue"])])),_:1}),s(m(y),null,{default:d((()=>[s(m(b),{label:"Last name",modelValue:m(T).lastname,"onUpdate:modelValue":l[2]||(l[2]=e=>m(T).lastname=e),readonly:!0},null,8,["modelValue"])])),_:1}),s(m(y),null,{default:d((()=>[s(m(b),{label:"ABN",modelValue:m(T).abn,"onUpdate:modelValue":l[3]||(l[3]=e=>m(T).abn=e),readonly:!0},null,8,["modelValue"])])),_:1}),s(m(y),null,{default:d((()=>[s(m(b),{label:"Start",type:"date",modelValue:k.value,"onUpdate:modelValue":l[4]||(l[4]=e=>k.value=e),onChange:B},null,8,["modelValue"])])),_:1}),s(m(y),null,{default:d((()=>[s(m(b),{label:"End",type:"date",modelValue:j.value,"onUpdate:modelValue":l[5]||(l[5]=e=>j.value=e),onChange:B},null,8,["modelValue"])])),_:1}),s(m(y),null,{default:d((()=>[s(m(b),{label:"BSB",modelValue:m(T).bsb,"onUpdate:modelValue":l[6]||(l[6]=e=>m(T).bsb=e),readonly:!0},null,8,["modelValue"])])),_:1}),s(m(y),null,{default:d((()=>[s(m(b),{label:"ACC",modelValue:m(T).acc,"onUpdate:modelValue":l[7]||(l[7]=e=>m(T).acc=e),readonly:!0},null,8,["modelValue"])])),_:1})])),_:1})])),_:1}),x.value?(n(),o(m(f),{key:0,class:"ion-padding"},{default:d((()=>[s(m(_),null,{default:d((()=>[s(m(y),null,{default:d((()=>[s(m(b),{label:"To",modelValue:m(A).name,"onUpdate:modelValue":l[8]||(l[8]=e=>m(A).name=e),readonly:!0},null,8,["modelValue"])])),_:1}),s(m(y),null,{default:d((()=>[s(m(b),{label:"Address",modelValue:m(A).address,"onUpdate:modelValue":l[9]||(l[9]=e=>m(A).address=e),readonly:!0},null,8,["modelValue"])])),_:1}),s(m(y),null,{default:d((()=>[s(m(b),{modelValue:m(A).city,"onUpdate:modelValue":l[10]||(l[10]=e=>m(A).city=e),readonly:!0},null,8,["modelValue"])])),_:1}),s(m(y),null,{default:d((()=>[s(m(b),{modelValue:m(A).stateA,"onUpdate:modelValue":l[11]||(l[11]=e=>m(A).stateA=e),readonly:!0},null,8,["modelValue"])])),_:1}),s(m(y),null,{default:d((()=>[s(m(b),{modelValue:m(A).postcode,"onUpdate:modelValue":l[12]||(l[12]=e=>m(A).postcode=e),readonly:!0},null,8,["modelValue"])])),_:1}),s(m(y),null,{default:d((()=>[s(m(b),{modelValue:m(C).invoiceNumber,"onUpdate:modelValue":l[13]||(l[13]=e=>m(C).invoiceNumber=e),readonly:!0},null,8,["modelValue"])])),_:1})])),_:1})])),_:1})):g("",!0)])),_:1})])),_:1}))}},[["__scopeId","data-v-2fa0003e"]]))}}}));
