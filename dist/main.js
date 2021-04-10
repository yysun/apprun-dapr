(()=>{var S=class{constructor(){this._events={}}on(t,n,o={}){this._events[t]=this._events[t]||[],this._events[t].push({fn:n,options:o})}off(t,n){let o=this._events[t]||[];this._events[t]=o.filter(s=>s.fn!==n)}find(t){return this._events[t]}run(t,...n){let o=this.getSubscribers(t,this._events);return console.assert(o&&o.length>0,"No subscriber for event: "+t),o.forEach(s=>{let{fn:i,options:a}=s;return a.delay?this.delay(t,i,n,a):Object.keys(a).length>0?i.apply(this,[...n,a]):i.apply(this,n),!s.options.once}),o.length}once(t,n,o={}){this.on(t,n,Object.assign(Object.assign({},o),{once:!0}))}delay(t,n,o,s){s._t&&clearTimeout(s._t),s._t=setTimeout(()=>{clearTimeout(s._t),Object.keys(s).length>0?n.apply(this,[...o,s]):n.apply(this,o)},s.delay)}query(t,...n){let o=this.getSubscribers(t,this._events);console.assert(o&&o.length>0,"No subscriber for event: "+t);let s=o.map(i=>{let{fn:a,options:h}=i;return Object.keys(h).length>0?a.apply(this,[...n,h]):a.apply(this,n)});return Promise.all(s)}getSubscribers(t,n){let o=n[t]||[];return t.indexOf("*")<0&&(n[t]=o.filter(s=>!s.options.once)),Object.keys(n).filter(s=>s.endsWith("*")&&t.startsWith(s.replace("*",""))).sort((s,i)=>i.length-s.length).forEach(s=>o.push(...n[s].map(i=>Object.assign(Object.assign({},i),{options:Object.assign(Object.assign({},i.options),{event:t})})))),o}},w,v=typeof self=="object"&&self.self===self&&self||typeof global=="object"&&global.global===global&&global;v.app&&v._AppRunVersions?w=v.app:(w=new S,v.app=w,v._AppRunVersions="AppRun-2");var c=w;function F(e,...t){return W(t)}function W(e){let t=[],n=o=>{o!=null&&o!==""&&o!==!1&&t.push(typeof o=="function"||typeof o=="object"?o:`${o}`)};return e&&e.forEach(o=>{Array.isArray(o)?o.forEach(s=>n(s)):n(o)}),t}var L=new WeakMap,U=function(e,t,n={}){if(t==null||t===!1)return;t=k(t,n);let o=(e==null?void 0:e.nodeName)==="SVG";!e||(Array.isArray(t)?x(e,t,o):x(e,[t],o))};function M(e,t,n){t._op!==3&&(n=n||t.tag==="svg",function(o,s){let i=o.nodeName,a=`${s.tag||""}`;return i.toUpperCase()===a.toUpperCase()}(e,t)?(!(2&t._op)&&x(e,t.children,n),!(1&t._op)&&C(e,t.props,n)):e.parentNode.replaceChild(O(t,n),e))}function x(e,t,n){var o;let s=((o=e.childNodes)===null||o===void 0?void 0:o.length)||0,i=(t==null?void 0:t.length)||0,a=Math.min(s,i);for(let u=0;u<a;u++){let r=t[u];if(r._op===3)continue;let f=e.childNodes[u];if(typeof r=="string")f.textContent!==r&&(f.nodeType===3?f.nodeValue=r:e.replaceChild(N(r),f));else if(r instanceof HTMLElement||r instanceof SVGElement)e.insertBefore(r,f);else{let p=r.props&&r.props.key;if(p)if(f.key===p)M(e.childNodes[u],r,n);else{let m=L[p];if(m){let d=m.nextSibling;e.insertBefore(m,f),d?e.insertBefore(f,d):e.appendChild(f),M(e.childNodes[u],r,n)}else e.replaceChild(O(r,n),f)}else M(e.childNodes[u],r,n)}}let h=e.childNodes.length;for(;h>a;)e.removeChild(e.lastChild),h--;if(i>a){let u=document.createDocumentFragment();for(let r=a;r<t.length;r++)u.appendChild(O(t[r],n));e.appendChild(u)}}function N(e){if((e==null?void 0:e.indexOf("_html:"))===0){let t=document.createElement("div");return t.insertAdjacentHTML("afterbegin",e.substring(6)),t}return document.createTextNode(e??"")}function O(e,t){if(e instanceof HTMLElement||e instanceof SVGElement)return e;if(typeof e=="string")return N(e);if(!e.tag||typeof e.tag=="function")return N(JSON.stringify(e));let n=(t=t||e.tag==="svg")?document.createElementNS("http://www.w3.org/2000/svg",e.tag):document.createElement(e.tag);return C(n,e.props,t),e.children&&e.children.forEach(o=>n.appendChild(O(o,t))),n}function C(e,t,n){let o=e._props||{};t=function(s,i){i.class=i.class||i.className,delete i.className;let a={};return s&&Object.keys(s).forEach(h=>a[h]=null),i&&Object.keys(i).forEach(h=>a[h]=i[h]),a}(o,t||{}),e._props=t;for(let s in t){let i=t[s];if(s.startsWith("data-")){let a=s.substring(5).replace(/-(\w)/g,h=>h[1].toUpperCase());e.dataset[a]!==i&&(i||i===""?e.dataset[a]=i:delete e.dataset[a])}else if(s==="style")if(e.style.cssText&&(e.style.cssText=""),typeof i=="string")e.style.cssText=i;else for(let a in i)e.style[a]!==i[a]&&(e.style[a]=i[a]);else if(s.startsWith("xlink")){let a=s.replace("xlink","").toLowerCase();i==null||i===!1?e.removeAttributeNS("http://www.w3.org/1999/xlink",a):e.setAttributeNS("http://www.w3.org/1999/xlink",a,i)}else s.startsWith("on")?i&&typeof i!="function"?typeof i=="string"&&(i?e.setAttribute(s,i):e.removeAttribute(s)):e[s]=i:/^id$|^class$|^list$|^readonly$|^contenteditable$|^role|-/g.test(s)||n?e.getAttribute(s)!==i&&(i?e.setAttribute(s,i):e.removeAttribute(s)):e[s]!==i&&(e[s]=i);s==="key"&&i&&(L[i]=e)}t&&typeof t.ref=="function"&&window.requestAnimationFrame(()=>t.ref(e))}function k(e,t,n=0){var o;if(typeof e=="string")return e;if(Array.isArray(e))return e.map(i=>k(i,t,n++));let s=e;if(e&&typeof e.tag=="function"&&Object.getPrototypeOf(e.tag).t&&(s=function(i,a,h){let{tag:u,props:r,children:f}=i,p=`_${h}`,m=r&&r.id;m?p=m:m=`_${h}${Date.now()}`;let d="section";r&&r.as&&(d=r.as,delete r.as),a.i||(a.i={});let l=a.i[p];if(!(l&&l instanceof u&&l.element)){let g=document.createElement(d);l=a.i[p]=new u(Object.assign(Object.assign({},r),{children:f})).start(g)}if(l.mounted){let g=l.mounted(r,f,l.state);g!==void 0&&l.setState(g)}return C(l.element,r,!1),l.element}(e,t,n)),s&&Array.isArray(s.children)){let i=(o=s.props)===null||o===void 0?void 0:o._component;if(i){let a=0;s.children=s.children.map(h=>k(h,i,a++))}else s.children=s.children.map(a=>k(a,t,n++))}return s}var H=(e,t={})=>class extends HTMLElement{constructor(){super()}get component(){return this._component}get state(){return this._component.state}static get observedAttributes(){return(t.observedAttributes||[]).map(n=>n.toLowerCase())}connectedCallback(){if(this.isConnected&&!this._component){let n=t||{};this._shadowRoot=n.shadow?this.attachShadow({mode:"open"}):this;let o=n.observedAttributes||[],s=o.reduce((h,u)=>{let r=u.toLowerCase();return r!==u&&(h[r]=u),h},{});this._attrMap=h=>s[h]||h;let i={};Array.from(this.attributes).forEach(h=>i[this._attrMap(h.name)]=h.value),o.forEach(h=>{this[h]!==void 0&&(i[h]=this[h]),Object.defineProperty(this,h,{get:()=>i[h],set(u){this.attributeChangedCallback(h,i[h],u)},configurable:!0,enumerable:!0})});let a=this.children?Array.from(this.children):[];if(a.forEach(h=>h.parentElement.removeChild(h)),this._component=new e(Object.assign(Object.assign({},i),{children:a})).mount(this._shadowRoot,n),this._component._props=i,this._component.dispatchEvent=this.dispatchEvent.bind(this),this._component.mounted){let h=this._component.mounted(i,a,this._component.state);h!==void 0&&(this._component.state=h)}this.on=this._component.on.bind(this._component),this.run=this._component.run.bind(this._component),n.render!==!1&&this._component.run(".")}}disconnectedCallback(){var n,o,s,i;(o=(n=this._component)===null||n===void 0?void 0:n.unload)===null||o===void 0||o.call(n),(i=(s=this._component)===null||s===void 0?void 0:s.unmount)===null||i===void 0||i.call(s),this._component=null}attributeChangedCallback(n,o,s){if(this._component){let i=this._attrMap(n);this._component._props[i]=s,this._component.run("attributeChanged",i,o,s),s!==o&&t.render!==!1&&window.requestAnimationFrame(()=>{this._component.run(".")})}}},R=(e,t,n)=>{typeof customElements!="undefined"&&customElements.define(e,H(t,n))},$={meta:new WeakMap,defineMetadata(e,t,n){this.meta.has(n)||this.meta.set(n,{}),this.meta.get(n)[e]=t},getMetadataKeys(e){return e=Object.getPrototypeOf(e),this.meta.get(e)?Object.keys(this.meta.get(e)):[]},getMetadata(e,t){return t=Object.getPrototypeOf(t),this.meta.get(t)?this.meta.get(t)[e]:null}};function B(e,t={}){return function(n,o){let s=e?e.toString():o;$.defineMetadata(`apprun-update:${s}`,{name:s,key:o,options:t},n)}}function D(e,t){return function(n){return R(e,n,t),n}}var b=(e,t)=>(t?e.state[t]:e.state)||"",_=(e,t,n)=>{if(t){let o=e.state||{};o[t]=n,e.setState(o)}else e.setState(n)},E=new Map;c.on("get-components",e=>e.components=E);var V=e=>e,y=class{constructor(t,n,o,s){this.state=t,this.view=n,this.update=o,this.options=s,this._app=new S,this._actions=[],this._global_events=[],this._history=[],this._history_idx=-1,this._history_prev=()=>{this._history_idx--,this._history_idx>=0?this.setState(this._history[this._history_idx],{render:!0,history:!1}):this._history_idx=0},this._history_next=()=>{this._history_idx++,this._history_idx<this._history.length?this.setState(this._history[this._history_idx],{render:!0,history:!1}):this._history_idx=this._history.length-1},this.start=(i=null,a)=>this.mount(i,Object.assign(Object.assign({},a),{render:!0}))}render(t,n){c.render(t,n,this)}_view(t){if(!this.view)return;let n=c.createElement;c.h=c.createElement=(s,i,...a)=>(i&&Object.keys(i).forEach(h=>{h.startsWith("$")&&(((u,r,f,p)=>{if(u.startsWith("$on")){let m=r[u];if(u=u.substring(1),typeof m=="boolean")r[u]=d=>p.run(u,d);else if(typeof m=="string")r[u]=d=>p.run(m,d);else if(typeof m=="function")r[u]=d=>p.setState(m(p.state,d));else if(Array.isArray(m)){let[d,...l]=m;typeof d=="string"?r[u]=g=>p.run(d,...l,g):typeof d=="function"&&(r[u]=g=>p.setState(d(p.state,...l,g)))}}else if(u==="$bind"){let m=r.type||"text",d=typeof r[u]=="string"?r[u]:r.name;if(f==="input")switch(m){case"checkbox":r.checked=b(p,d),r.onclick=l=>_(p,d||l.target.name,l.target.checked);break;case"radio":r.checked=b(p,d)===r.value,r.onclick=l=>_(p,d||l.target.name,l.target.value);break;case"number":case"range":r.value=b(p,d),r.oninput=l=>_(p,d||l.target.name,Number(l.target.value));break;default:r.value=b(p,d),r.oninput=l=>_(p,d||l.target.name,l.target.value)}else f==="select"?(r.value=b(p,d),r.onchange=l=>{l.target.multiple||_(p,d||l.target.name,l.target.value)}):f==="option"?(r.selected=b(p,d),r.onclick=l=>_(p,d||l.target.name,l.target.selected)):f==="textarea"&&(r.innerHTML=b(p,d),r.oninput=l=>_(p,d||l.target.name,l.target.value))}else c.run("$",{key:u,tag:f,props:r,component:p})})(h,i,s,this),delete i[h])}),n(s,i,...a));let o=this.view(t);return c.h=c.createElement=n,o}renderState(t,n=null){if(!this.view)return;let o=n||this._view(t);if(c.debug&&c.run("debug",{component:this,_:o?".":"-",state:t,vdom:o,el:this.element}),typeof document!="object")return;let s=typeof this.element=="string"?document.getElementById(this.element):this.element;if(s){let i="_c";this.unload?s._component===this&&s.getAttribute(i)===this.tracking_id||(this.tracking_id=new Date().valueOf().toString(),s.setAttribute(i,this.tracking_id),typeof MutationObserver!="undefined"&&(this.observer||(this.observer=new MutationObserver(a=>{a[0].oldValue!==this.tracking_id&&document.body.contains(s)||(this.unload(this.state),this.observer.disconnect(),this.observer=null)})),this.observer.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeOldValue:!0,attributeFilter:[i]}))):s.removeAttribute&&s.removeAttribute(i),s._component=this}n||this.render(s,o),this.rendered&&this.rendered(this.state)}setState(t,n={render:!0,history:!1}){if(t instanceof Promise)Promise.all([t,this._state]).then(o=>{o[0]&&this.setState(o[0])}).catch(o=>{throw console.error(o),o}),this._state=t;else{if(this._state=t,t==null)return;this.state=t,n.render!==!1&&this.renderState(t),n.history!==!1&&this.enable_history&&(this._history=[...this._history,t],this._history_idx=this._history.length-1),typeof n.callback=="function"&&n.callback(this.state)}}mount(t=null,n){var o,s;return console.assert(!this.element,"Component already mounted."),this.options=n=Object.assign(Object.assign({},this.options),n),this.element=t,this.global_event=n.global_event,this.enable_history=!!n.history,this.enable_history&&(this.on(n.history.prev||"history-prev",this._history_prev),this.on(n.history.next||"history-next",this._history_next)),n.route&&(this.update=this.update||{},this.update[n.route]=V),this.add_actions(),this.state=(s=(o=this.state)!==null&&o!==void 0?o:this.model)!==null&&s!==void 0?s:{},typeof this.state=="function"&&(this.state=this.state()),n.render?this.setState(this.state,{render:!0,history:!0}):this.setState(this.state,{render:!1,history:!0}),c.debug&&(E.get(t)?E.get(t).push(this):E.set(t,[this])),this}is_global_event(t){return t&&(this.global_event||this._global_events.indexOf(t)>=0||t.startsWith("#")||t.startsWith("/")||t.startsWith("@"))}add_action(t,n,o={}){n&&typeof n=="function"&&(o.global&&this._global_events.push(t),this.on(t,(...s)=>{c.debug&&c.run("debug",{component:this,_:">",event:t,p:s,current_state:this.state,options:o});let i=n(this.state,...s);c.debug&&c.run("debug",{component:this,_:"<",event:t,p:s,newState:i,state:this.state,options:o}),this.setState(i,o)},o))}add_actions(){let t=this.update||{};$.getMetadataKeys(this).forEach(o=>{if(o.startsWith("apprun-update:")){let s=$.getMetadata(o,this);t[s.name]=[this[s.key].bind(this),s.options]}});let n={};Array.isArray(t)?t.forEach(o=>{let[s,i,a]=o;s.toString().split(",").forEach(h=>n[h.trim()]=[i,a])}):Object.keys(t).forEach(o=>{let s=t[o];(typeof s=="function"||Array.isArray(s))&&o.split(",").forEach(i=>n[i.trim()]=s)}),n["."]||(n["."]=V),Object.keys(n).forEach(o=>{let s=n[o];typeof s=="function"?this.add_action(o,s):Array.isArray(s)&&this.add_action(o,s[0],s[1])})}run(t,...n){let o=t.toString();return this.is_global_event(o)?c.run(o,...n):this._app.run(o,...n)}on(t,n,o){let s=t.toString();return this._actions.push({name:s,fn:n}),this.is_global_event(s)?c.on(s,n,o):this._app.on(s,n,o)}unmount(){var t;(t=this.observer)===null||t===void 0||t.disconnect(),this._actions.forEach(n=>{let{name:o,fn:s}=n;this.is_global_event(o)?c.off(o,s):this._app.off(o,s)})}};y.t=!0;var A=e=>{if(e||(e="#"),e.startsWith("#")){let[t,...n]=e.split("/");c.run(t,...n)||c.run("///",t,...n),c.run("//",t,...n)}else if(e.startsWith("/")){let[t,n,...o]=e.split("/");c.run("/"+n,...o)||c.run("///","/"+n,...o),c.run("//","/"+n,...o)}else c.run(e)||c.run("///",e),c.run("//",e)};c.h=c.createElement=function(e,t,...n){let o=W(n);if(typeof e=="string")return{tag:e,props:t,children:o};if(Array.isArray(e))return e;if(e===void 0&&n)return o;if(Object.getPrototypeOf(e).t)return{tag:e,props:t,children:o};if(typeof e=="function")return e(t,o);throw new Error(`Unknown tag in vdom ${e}`)},c.render=function(e,t,n){U(e,t,n)},c.Fragment=F,c.webComponent=R,c.start=(e,t,n,o,s)=>{let i=Object.assign(Object.assign({},s),{render:!0,global_event:!0}),a=new y(t,n,o);return s&&s.rendered&&(a.rendered=s.rendered),a.mount(e,i),a};var j=e=>{};c.on("$",j),c.on("debug",e=>j),c.on("//",j),c.on("#",j),c.route=A,c.on("route",e=>c.route&&c.route(e)),typeof document=="object"&&document.addEventListener("DOMContentLoaded",()=>{c.route===A&&(window.onpopstate=()=>A(location.hash),document.body.hasAttribute("apprun-no-init")||A(location.hash))}),typeof window=="object"&&(window.Component=y,window.React=c,window.on=B,window.customElement=D);var P=class extends y{constructor(){super(...arguments);this.state=0;this.view=t=>c.h("div",null,c.h("h1",null,t),c.h("button",{$onclick:["add",-1]},"-1"),c.h("button",{$onclick:["@add",t,1]},"+1"));this.update={add:(t,n)=>t+n,"@@":(t,n)=>n}}};new P().start(document.body);var T=new WebSocket(`ws://${location.host}`);T.onopen=()=>console.log("websocket connected");T.onmessage=function(e){console.log("received: ",e.data);let{event:t,data:n}=JSON.parse(e.data);c.run("@@",n)};c.on("@add",(e,t)=>{let n={event:"add",data:[e,t]};console.log("sending: ",n),T.send(JSON.stringify(n))});})();
//# sourceMappingURL=main.js.map
