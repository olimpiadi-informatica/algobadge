(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[294],{7137:function(e,r,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/bulk",function(){return n(8820)}])},9519:function(e,r,n){"use strict";n.d(r,{h:function(){return d},E:function(){return h}});var t=n(5893),o=n(674),a=n.n(o),s=n(885),i=n(3489),l=n(2050),c=n(4162);function u(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function d(e){var r=e.color,n=e.size;return r?(n||(n=35),(0,t.jsx)("svg",{fill:r,width:"".concat(n,"px"),height:"".concat(n,"px"),viewBox:"0 0 1024 1024",children:(0,t.jsx)("path",{d:"M547 304.2h-451l108.2-207.8h481.4z M685.6 754.4c0 95.656-77.544 173.2-173.2 173.2s-173.2-77.544-173.2-173.2c0-95.656 77.544-173.2 173.2-173.2s173.2 77.544 173.2 173.2z M697.8 598.2l230.2-294-138.6-207.8-276.6 415.6c64.6 0 125.4 25.4 171 71 5 5 9.6 10 14 15.2z M411.6 533.2l-107-161.2h-207.8l180.2 323c10.4-42.4 32.2-81.2 64-112.8 20.8-20.6 44.6-37.2 70.6-49z"})})):null}function f(e){var r=e.color;return(0,t.jsx)("svg",{width:"35px",height:"35px",viewBox:"0 0 170 170",children:(0,t.jsxs)("g",{children:[(0,t.jsx)("path",{style:{fillRule:"evenodd",fill:r},d:"m112.5 4.1909c-20.072 0-36.231 16.159-36.231 36.231v40.256h10.064v-40.256c0-14.497 11.671-26.167 26.167-26.167 14.5 0 26.17 11.67 26.17 26.167v27.756h10.06v-27.756c0-20.072-16.16-36.231-36.23-36.231z"}),(0,t.jsx)("rect",{style:{fillRule:"evenodd",fill:r},rx:"0.5",ry:".5",height:"66.259",width:"85.603",y:"74.55",x:"7.1987"})]})})}function v(e){var r=e.withUnlock,n=[{position:s.Rc,color:s.Iy},{position:s.tY,color:s.sI},{position:s.Ko,color:s.qs}];return(0,t.jsxs)(t.Fragment,{children:[r&&(0,t.jsx)("div",{className:a().checkpoint,style:{"--position":"".concat(100*s.Lw,"%")},children:(0,t.jsx)(f,{color:"black"})}),n.map((function(e){return(0,t.jsx)("div",{className:a().checkpoint,style:{"--position":"".concat(100*e.position,"%")},children:(0,t.jsx)(d,{color:e.color})},e.position)}))]})}function h(e){var r=e.score,n=e.numTasks,o=e.nextCategories;if(r===n*s.O1)return(0,t.jsx)("div",{className:a().progress,children:(0,t.jsxs)(l.Z,{children:[(0,t.jsx)(l.Z,{className:a().progressGold,animated:!0,now:100}),(0,t.jsx)(v,{withUnlock:o.length>0})]})});var d=[],f=[{from:s.tY,to:s.Ko,className:a().progressSilver},{from:s.Rc,to:s.tY,className:a().progressBronze},{from:0,to:s.Rc,className:a().progressNone}],h=r/n/s.O1,m=!0,p=!1,b=void 0;try{for(var y,g=f[Symbol.iterator]();!(m=(y=g.next()).done);m=!0){var x=y.value;if(h>=x.from){d.push((0,t.jsx)(l.Z,{className:x.className,animated:!0,now:100*h},x.from));break}}}catch(j){p=!0,b=j}finally{try{m||null==g.return||g.return()}finally{if(p)throw b}}return(0,t.jsx)(c.Z,{placement:"top",overlay:function(e){var a="";if(h<s.Lw&&o.length>0)a="Ancora ".concat(n*s.O1*s.Lw-r," punti per sbloccare le prossime categorie");else if(h<s.Rc)a="Ancora ".concat(n*s.O1*s.Rc-r," punti per sbloccare il badge di bronzo!");else if(h<s.tY)a="Ancora ".concat(n*s.O1*s.tY-r," punti per sbloccare il badge di argento!");else{if(!(h<s.Ko))return null;a="Ancora ".concat(n*s.O1*s.Ko-r," punti per sbloccare il badge d'oro!")}return(0,t.jsx)(i.Z,function(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{},t=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),t.forEach((function(r){u(e,r,n[r])}))}return e}({id:"progress-overlay"},e,{children:a}))},children:(0,t.jsx)("div",{children:(0,t.jsx)("div",{className:a().progress,children:(0,t.jsxs)(l.Z,{children:[d,(0,t.jsx)(v,{withUnlock:o.length>0})]})})})})}},885:function(e,r,n){"use strict";n.d(r,{O1:function(){return t},Lw:function(){return o},Rc:function(){return a},tY:function(){return s},Ko:function(){return i},Iy:function(){return l},sI:function(){return c},qs:function(){return u},Cj:function(){return f},Yf:function(){return h},Pb:function(){return m}});var t=100,o=.25,a=.5,s=.75,i=1,l="#cd7f32",c="#c0c0c0",u="#ffdf00";function d(e){switch(e){case"locked":return 0;case"none":return 1;case"bronze":return 2;case"silver":return 3;case"gold":return 4}}function f(e){switch(e){case"locked":case"none":return null;case"bronze":return l;case"silver":return c;case"gold":return u}}function v(e,r){return e>=t*r*i?"gold":e>=t*r*s?"silver":e>=t*r*a?"bronze":"none"}function h(e,r,n){var a={};console.log(r.scores,r);var s=Object.fromEntries(r.scores.map((function(e){return[e.name,e.score]}))),i=!0,l=!1,c=void 0;try{for(var u,d=e.nodes[Symbol.iterator]();!(i=(u=d.next()).done);i=!0){var f=u.value,h=0,m={},p=!0,b=!1,y=void 0;try{for(var g,x=f.tasks[Symbol.iterator]();!(p=(g=x.next()).done);p=!0){var j,w=g.value,N=null!==(j=s[w.name])&&void 0!==j?j:0;m[w.name]=N,h+=N}}catch(A){b=!0,y=A}finally{try{p||null==x.return||x.return()}finally{if(b)throw y}}a[f.id]={node:f,score:h,badge:v(h,f.tasks.length),tasks:m}}}catch(A){l=!0,c=A}finally{try{i||null==d.return||d.return()}finally{if(l)throw c}}var _=new Set,k=function(e){if(!_.has(e)){_.add(e);var r=a[e],s=!1,i=!0,l=!1,c=void 0;try{for(var u,d=r.node.prerequisites[Symbol.iterator]();!(i=(u=d.next()).done);i=!0){var f=u.value;k(f);var v=a[f],h=v.node.tasks.length*t*o;("locked"===v.badge||v.score<h)&&(s=!0)}}catch(A){l=!0,c=A}finally{try{i||null==d.return||d.return()}finally{if(l)throw c}}s&&!n&&(r.badge="locked")}},O=!0,S=!1,C=void 0;try{for(var P,z=e.nodes[Symbol.iterator]();!(O=(P=z.next()).done);O=!0){var $=P.value;k($.id)}}catch(A){S=!0,C=A}finally{try{O||null==z.return||z.return()}finally{if(S)throw C}}return a}function m(e){var r=Object.values(e).map((function(e){return e.badge})),n="gold",t=!0,o=!1,a=void 0;try{for(var s,i=r[Symbol.iterator]();!(t=(s=i.next()).done);t=!0){var l=s.value;d(l)<d(n)&&(n=l)}}catch(c){o=!0,a=c}finally{try{t||null==i.return||i.return()}finally{if(o)throw a}}return n}},2106:function(e,r,n){"use strict";n.d(r,{b:function(){return i}});var t=n(4051),o=n.n(t);function a(e,r,n,t,o,a,s){try{var i=e[a](s),l=i.value}catch(c){return void n(c)}i.done?r(l):Promise.resolve(l).then(t,o)}function s(e){return function(){var r=this,n=arguments;return new Promise((function(t,o){var s=e.apply(r,n);function i(e){a(s,t,o,i,l,"next",e)}function l(e){a(s,t,o,i,l,"throw",e)}i(void 0)}))}}function i(e){return l.apply(this,arguments)}function l(){return(l=s(o().mark((function e(r){var n,t,a;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n={action:"get",username:r},e.next=4,fetch("https://training.olinfo.it/api/user",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n),credentials:"include"});case 4:if(200===(t=e.sent).status){e.next=7;break}return e.abrupt("return",null);case 7:return e.next=9,t.json();case 9:if(1===(a=e.sent).success){e.next=12;break}return e.abrupt("return",null);case 12:return e.abrupt("return",a);case 15:return e.prev=15,e.t0=e.catch(0),e.abrupt("return",null);case 18:case"end":return e.stop()}}),e,null,[[0,15]])})))).apply(this,arguments)}},8820:function(e,r,n){"use strict";n.r(r),n.d(r,{__N_SSG:function(){return I},default:function(){return B}});var t=n(5893),o=n(9519),a=n(885),s=n(2106),i=n(7294),l=n(4184),c=n.n(l),u=(n(2473),n(5697)),d=n.n(u);const f={type:d().string,tooltip:d().bool,as:d().elementType},v=i.forwardRef((({as:e="div",className:r,type:n="valid",tooltip:o=!1,...a},s)=>(0,t.jsx)(e,{...a,ref:s,className:c()(r,`${n}-${o?"tooltip":"feedback"}`)})));v.displayName="Feedback",v.propTypes=f;var h=v;var m=i.createContext({}),p=n(6792);const b=i.forwardRef((({bsPrefix:e,type:r,size:n,htmlSize:o,id:a,className:s,isValid:l=!1,isInvalid:u=!1,plaintext:d,readOnly:f,as:v="input",...h},b)=>{const{controlId:y}=(0,i.useContext)(m);let g;return e=(0,p.vE)(e,"form-control"),g=d?{[`${e}-plaintext`]:!0}:{[e]:!0,[`${e}-${n}`]:n},(0,t.jsx)(v,{...h,type:r,size:o,ref:b,readOnly:f,id:a||y,className:c()(s,g,l&&"is-valid",u&&"is-invalid","color"===r&&`${e}-color`)})}));b.displayName="FormControl";var y=Object.assign(b,{Feedback:h});const g=["as","disabled"];function x({tagName:e,disabled:r,href:n,target:t,rel:o,onClick:a,tabIndex:s=0,type:i}){e||(e=null!=n||null!=t||null!=o?"a":"button");const l={tagName:e};if("button"===e)return[{type:i||"button",disabled:r},l];const c=t=>{(r||"a"===e&&function(e){return!e||"#"===e.trim()}(n))&&t.preventDefault(),r?t.stopPropagation():null==a||a(t)};return"a"===e&&(n||(n="#"),r&&(n=void 0)),[{role:"button",disabled:void 0,tabIndex:r?void 0:s,href:n,target:"a"===e?t:void 0,"aria-disabled":r||void 0,rel:"a"===e?o:void 0,onClick:c,onKeyDown:e=>{" "===e.key&&(e.preventDefault(),c(e))}},l]}const j=i.forwardRef(((e,r)=>{let{as:n,disabled:o}=e,a=function(e,r){if(null==e)return{};var n,t,o={},a=Object.keys(e);for(t=0;t<a.length;t++)n=a[t],r.indexOf(n)>=0||(o[n]=e[n]);return o}(e,g);const[s,{tagName:i}]=x(Object.assign({tagName:n,disabled:o},a));return(0,t.jsx)(i,Object.assign({},a,s,{ref:r}))}));j.displayName="Button";const w=i.forwardRef((({as:e,bsPrefix:r,variant:n,size:o,active:a,className:s,...i},l)=>{const u=(0,p.vE)(r,"btn"),[d,{tagName:f}]=x({tagName:e,...i}),v=f;return(0,t.jsx)(v,{...d,...i,ref:l,className:c()(s,u,a&&"active",n&&`${u}-${n}`,o&&`${u}-${o}`,i.href&&i.disabled&&"disabled")})}));w.displayName="Button",w.defaultProps={variant:"primary",active:!1,disabled:!1};var N=w;var _=i.forwardRef((({bsPrefix:e,className:r,striped:n,bordered:o,borderless:a,hover:s,size:i,variant:l,responsive:u,...d},f)=>{const v=(0,p.vE)(e,"table"),h=c()(r,v,l&&`${v}-${l}`,i&&`${v}-${i}`,n&&`${v}-striped`,o&&`${v}-bordered`,a&&`${v}-borderless`,s&&`${v}-hover`),m=(0,t.jsx)("table",{...d,className:h,ref:f});if(u){let e=`${v}-responsive`;return"string"===typeof u&&(e=`${e}-${u}`),(0,t.jsx)("div",{className:e,children:m})}return m})),k=n(6136),O=n.n(k);function S(e,r){(null==r||r>e.length)&&(r=e.length);for(var n=0,t=new Array(r);n<r;n++)t[n]=e[n];return t}function C(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function P(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var t,o,a=[],s=!0,i=!1;try{for(n=n.call(e);!(s=(t=n.next()).done)&&(a.push(t.value),!r||a.length!==r);s=!0);}catch(l){i=!0,o=l}finally{try{s||null==n.return||n.return()}finally{if(i)throw o}}return a}}(e,r)||$(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function z(e){return function(e){if(Array.isArray(e))return S(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||$(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function $(e,r){if(e){if("string"===typeof e)return S(e,r);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?S(e,r):void 0}}function A(e){var r=e.sum;return(0,t.jsxs)(t.Fragment,{children:[["gold","silver","bronze"].map((function(e){return(0,t.jsxs)("div",{className:O().medalSummary,children:[(0,t.jsx)(o.h,{color:(0,a.Cj)(e),size:20}),"\xa0",r[e]]},e)})),(0,t.jsxs)("div",{className:O().medalSummary,children:[(0,t.jsx)(o.h,{color:"#555",size:20}),"\xa0",r.none]})]})}function E(e){var r=e.taskGraph,n=(0,i.useState)(""),l=n[0],c=n[1],u=(0,i.useState)({}),d=u[0],f=u[1],v=z(new Set(l.split("\n").map((function(e){return e.trim()})).filter((function(e){return""!==e})))),h=function(){f({});var e=!0,n=!1,t=void 0;try{for(var o,i=function(e,n){var t=n.value;(0,s.b)(t).then((function(e){return e?(0,a.Yf)(r,e,!1):null})).then((function(e){e&&f((function(r){return function(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{},t=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),t.forEach((function(r){C(e,r,n[r])}))}return e}({},r,C({},t,e))}))}))},l=v[Symbol.iterator]();!(e=(o=l.next()).done);e=!0)i(0,o)}catch(c){n=!0,t=c}finally{try{e||null==l.return||l.return()}finally{if(n)throw t}}},m={},p={gold:0,silver:0,bronze:0,none:0},b=!0,g=!1,x=void 0;try{for(var j,w=Object.values(d)[Symbol.iterator]();!(b=(j=w.next()).done);b=!0){var k=j.value,S=!0,$=!1,E=void 0;try{for(var I,B=Object.entries(k)[Symbol.iterator]();!(S=(I=B.next()).done);S=!0){var R=P(I.value,2),T=R[0],Y=R[1];T in m||(m[T]={gold:0,silver:0,bronze:0,none:0}),"gold"===Y.badge||"silver"===Y.badge||"bronze"===Y.badge?m[T][Y.badge]+=1:m[T].none+=1}}catch(G){$=!0,E=G}finally{try{S||null==B.return||B.return()}finally{if($)throw E}}var F=(0,a.Pb)(k);"gold"===F||"silver"===F||"bronze"===F?p[F]+=1:p.none+=1}}catch(G){g=!0,x=G}finally{try{b||null==w.return||w.return()}finally{if(g)throw x}}return(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:O().title,children:"Bulk"}),(0,t.jsx)(y,{as:"textarea",placeholder:"Inserisci la lista di username, uno per riga",onChange:function(e){return c(e.target.value)},value:l,className:O().usernames}),(0,t.jsx)(N,{onClick:function(){return h()},children:"Via!"}),(0,t.jsx)("hr",{}),Object.entries(d).length>0&&(0,t.jsxs)(_,{striped:!0,hover:!0,responsive:!0,children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{children:[(0,t.jsx)("th",{children:"Username"}),(0,t.jsx)("th",{className:O().totalColumn,children:"Total"}),r.nodes.map((function(e){return(0,t.jsx)("th",{className:O().badgeColumn,children:(0,t.jsx)("code",{children:e.id})},e.id)}))]})}),(0,t.jsxs)("tbody",{children:[v.map((function(e){return(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{children:(0,t.jsx)("a",{href:"/?impersonate=".concat(e),target:"_blank",rel:"noreferrer",children:(0,t.jsx)("code",{children:e})})}),e in d?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("td",{className:O().totalColumn,children:(0,t.jsx)(o.h,{color:(0,a.Cj)((0,a.Pb)(d[e]))})}),r.nodes.map((function(r){return(0,t.jsx)("td",{className:O().badgeColumn,children:(0,t.jsx)(o.h,{color:(0,a.Cj)(d[e][r.id].badge)})},r.id)}))]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("td",{className:O().totalColumn,children:"?"}),r.nodes.map((function(e){return(0,t.jsx)("td",{className:O().badgeColumn,children:"?"},e.id)}))]})]},e)})),(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{}),(0,t.jsx)("td",{className:O().totalColumn,children:(0,t.jsx)(A,{sum:p})}),r.nodes.map((function(e){return(0,t.jsx)("td",{className:O().badgeColumn,children:(0,t.jsx)(A,{sum:m[e.id]})},e.id)}))]})]})]})]})}var I=!0;function B(e){var r=e.taskGraph;return(0,t.jsx)(E,{taskGraph:r})}},6136:function(e){e.exports={title:"Bulk_title__A_7Np",usernames:"Bulk_usernames__N8p9U",badgeColumn:"Bulk_badgeColumn__cQCAf",totalColumn:"Bulk_totalColumn__Q4ymg",medalSummary:"Bulk_medalSummary__xrmLs"}},674:function(e){e.exports={progressNone:"Progress_progressNone__o_ttj",progressBronze:"Progress_progressBronze__TJD81",progressSilver:"Progress_progressSilver__LQ8l3",progressGold:"Progress_progressGold__7qQo3",progress:"Progress_progress__axvfY",checkpoint:"Progress_checkpoint__TZ_n2"}}},function(e){e.O(0,[592,774,888,179],(function(){return r=7137,e(e.s=r);var r}));var r=e.O();_N_E=r}]);