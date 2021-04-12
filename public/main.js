(()=>{var C=class{constructor(){this._events={}}on(t,n,s={}){this._events[t]=this._events[t]||[],this._events[t].push({fn:n,options:s})}off(t,n){let s=this._events[t]||[];this._events[t]=s.filter(o=>o.fn!==n)}find(t){return this._events[t]}run(t,...n){let s=this.getSubscribers(t,this._events);return console.assert(s&&s.length>0,"No subscriber for event: "+t),s.forEach(o=>{let{fn:i,options:a}=o;return a.delay?this.delay(t,i,n,a):Object.keys(a).length>0?i.apply(this,[...n,a]):i.apply(this,n),!o.options.once}),s.length}once(t,n,s={}){this.on(t,n,Object.assign(Object.assign({},s),{once:!0}))}delay(t,n,s,o){o._t&&clearTimeout(o._t),o._t=setTimeout(()=>{clearTimeout(o._t),Object.keys(o).length>0?n.apply(this,[...s,o]):n.apply(this,s)},o.delay)}query(t,...n){let s=this.getSubscribers(t,this._events);console.assert(s&&s.length>0,"No subscriber for event: "+t);let o=s.map(i=>{let{fn:a,options:l}=i;return Object.keys(l).length>0?a.apply(this,[...n,l]):a.apply(this,n)});return Promise.all(o)}getSubscribers(t,n){let s=n[t]||[];return t.indexOf("*")<0&&(n[t]=s.filter(o=>!o.options.once)),Object.keys(n).filter(o=>o.endsWith("*")&&t.startsWith(o.replace("*",""))).sort((o,i)=>i.length-o.length).forEach(o=>s.push(...n[o].map(i=>Object.assign(Object.assign({},i),{options:Object.assign(Object.assign({},i.options),{event:t})})))),s}},O,k=typeof self=="object"&&self.self===self&&self||typeof global=="object"&&global.global===global&&global;k.app&&k._AppRunVersions?O=k.app:(O=new C,k.app=O,k._AppRunVersions="AppRun-2");var c=O;function q(e,...t){return R(t)}function R(e){let t=[],n=s=>{s!=null&&s!==""&&s!==!1&&t.push(typeof s=="function"||typeof s=="object"?s:`${s}`)};return e&&e.forEach(s=>{Array.isArray(s)?s.forEach(o=>n(o)):n(s)}),t}var V=new WeakMap,B=function(e,t,n={}){if(t==null||t===!1)return;t=E(t,n);let s=(e==null?void 0:e.nodeName)==="SVG";!e||(Array.isArray(t)?M(e,t,s):M(e,[t],s))};function $(e,t,n){t._op!==3&&(n=n||t.tag==="svg",function(s,o){let i=s.nodeName,a=`${o.tag||""}`;return i.toUpperCase()===a.toUpperCase()}(e,t)?(!(2&t._op)&&M(e,t.children,n),!(1&t._op)&&N(e,t.props,n)):e.parentNode.replaceChild(A(t,n),e))}function M(e,t,n){var s;let o=((s=e.childNodes)===null||s===void 0?void 0:s.length)||0,i=(t==null?void 0:t.length)||0,a=Math.min(o,i);for(let u=0;u<a;u++){let r=t[u];if(r._op===3)continue;let m=e.childNodes[u];if(typeof r=="string")m.textContent!==r&&(m.nodeType===3?m.nodeValue=r:e.replaceChild(T(r),m));else if(r instanceof HTMLElement||r instanceof SVGElement)e.insertBefore(r,m);else{let p=r.props&&r.props.key;if(p)if(m.key===p)$(e.childNodes[u],r,n);else{let g=V[p];if(g){let d=g.nextSibling;e.insertBefore(g,m),d?e.insertBefore(m,d):e.appendChild(m),$(e.childNodes[u],r,n)}else e.replaceChild(A(r,n),m)}else $(e.childNodes[u],r,n)}}let l=e.childNodes.length;for(;l>a;)e.removeChild(e.lastChild),l--;if(i>a){let u=document.createDocumentFragment();for(let r=a;r<t.length;r++)u.appendChild(A(t[r],n));e.appendChild(u)}}function T(e){if((e==null?void 0:e.indexOf("_html:"))===0){let t=document.createElement("div");return t.insertAdjacentHTML("afterbegin",e.substring(6)),t}return document.createTextNode(e??"")}function A(e,t){if(e instanceof HTMLElement||e instanceof SVGElement)return e;if(typeof e=="string")return T(e);if(!e.tag||typeof e.tag=="function")return T(JSON.stringify(e));let n=(t=t||e.tag==="svg")?document.createElementNS("http://www.w3.org/2000/svg",e.tag):document.createElement(e.tag);return N(n,e.props,t),e.children&&e.children.forEach(s=>n.appendChild(A(s,t))),n}function N(e,t,n){let s=e._props||{};t=function(o,i){i.class=i.class||i.className,delete i.className;let a={};return o&&Object.keys(o).forEach(l=>a[l]=null),i&&Object.keys(i).forEach(l=>a[l]=i[l]),a}(s,t||{}),e._props=t;for(let o in t){let i=t[o];if(o.startsWith("data-")){let a=o.substring(5).replace(/-(\w)/g,l=>l[1].toUpperCase());e.dataset[a]!==i&&(i||i===""?e.dataset[a]=i:delete e.dataset[a])}else if(o==="style")if(e.style.cssText&&(e.style.cssText=""),typeof i=="string")e.style.cssText=i;else for(let a in i)e.style[a]!==i[a]&&(e.style[a]=i[a]);else if(o.startsWith("xlink")){let a=o.replace("xlink","").toLowerCase();i==null||i===!1?e.removeAttributeNS("http://www.w3.org/1999/xlink",a):e.setAttributeNS("http://www.w3.org/1999/xlink",a,i)}else o.startsWith("on")?i&&typeof i!="function"?typeof i=="string"&&(i?e.setAttribute(o,i):e.removeAttribute(o)):e[o]=i:/^id$|^class$|^list$|^readonly$|^contenteditable$|^role|-/g.test(o)||n?e.getAttribute(o)!==i&&(i?e.setAttribute(o,i):e.removeAttribute(o)):e[o]!==i&&(e[o]=i);o==="key"&&i&&(V[i]=e)}t&&typeof t.ref=="function"&&window.requestAnimationFrame(()=>t.ref(e))}function E(e,t,n=0){var s;if(typeof e=="string")return e;if(Array.isArray(e))return e.map(i=>E(i,t,n++));let o=e;if(e&&typeof e.tag=="function"&&Object.getPrototypeOf(e.tag).t&&(o=function(i,a,l){let{tag:u,props:r,children:m}=i,p=`_${l}`,g=r&&r.id;g?p=g:g=`_${l}${Date.now()}`;let d="section";r&&r.as&&(d=r.as,delete r.as),a.i||(a.i={});let h=a.i[p];if(!(h&&h instanceof u&&h.element)){let b=document.createElement(d);h=a.i[p]=new u(Object.assign(Object.assign({},r),{children:m})).start(b)}if(h.mounted){let b=h.mounted(r,m,h.state);b!==void 0&&h.setState(b)}return N(h.element,r,!1),h.element}(e,t,n)),o&&Array.isArray(o.children)){let i=(s=o.props)===null||s===void 0?void 0:s._component;if(i){let a=0;o.children=o.children.map(l=>E(l,i,a++))}else o.children=o.children.map(a=>E(a,t,n++))}return o}var G=(e,t={})=>class extends HTMLElement{constructor(){super()}get component(){return this._component}get state(){return this._component.state}static get observedAttributes(){return(t.observedAttributes||[]).map(n=>n.toLowerCase())}connectedCallback(){if(this.isConnected&&!this._component){let n=t||{};this._shadowRoot=n.shadow?this.attachShadow({mode:"open"}):this;let s=n.observedAttributes||[],o=s.reduce((l,u)=>{let r=u.toLowerCase();return r!==u&&(l[r]=u),l},{});this._attrMap=l=>o[l]||l;let i={};Array.from(this.attributes).forEach(l=>i[this._attrMap(l.name)]=l.value),s.forEach(l=>{this[l]!==void 0&&(i[l]=this[l]),Object.defineProperty(this,l,{get:()=>i[l],set(u){this.attributeChangedCallback(l,i[l],u)},configurable:!0,enumerable:!0})});let a=this.children?Array.from(this.children):[];if(a.forEach(l=>l.parentElement.removeChild(l)),this._component=new e(Object.assign(Object.assign({},i),{children:a})).mount(this._shadowRoot,n),this._component._props=i,this._component.dispatchEvent=this.dispatchEvent.bind(this),this._component.mounted){let l=this._component.mounted(i,a,this._component.state);l!==void 0&&(this._component.state=l)}this.on=this._component.on.bind(this._component),this.run=this._component.run.bind(this._component),n.render!==!1&&this._component.run(".")}}disconnectedCallback(){var n,s,o,i;(s=(n=this._component)===null||n===void 0?void 0:n.unload)===null||s===void 0||s.call(n),(i=(o=this._component)===null||o===void 0?void 0:o.unmount)===null||i===void 0||i.call(o),this._component=null}attributeChangedCallback(n,s,o){if(this._component){let i=this._attrMap(n);this._component._props[i]=o,this._component.run("attributeChanged",i,s,o),o!==s&&t.render!==!1&&window.requestAnimationFrame(()=>{this._component.run(".")})}}},H=(e,t,n)=>{typeof customElements!="undefined"&&customElements.define(e,G(t,n))},W={meta:new WeakMap,defineMetadata(e,t,n){this.meta.has(n)||this.meta.set(n,{}),this.meta.get(n)[e]=t},getMetadataKeys(e){return e=Object.getPrototypeOf(e),this.meta.get(e)?Object.keys(this.meta.get(e)):[]},getMetadata(e,t){return t=Object.getPrototypeOf(t),this.meta.get(t)?this.meta.get(t)[e]:null}};function J(e,t={}){return function(n,s){let o=e?e.toString():s;W.defineMetadata(`apprun-update:${o}`,{name:o,key:s,options:t},n)}}function K(e,t){return function(n){return H(e,n,t),n}}var _=(e,t)=>(t?e.state[t]:e.state)||"",v=(e,t,n)=>{if(t){let s=e.state||{};s[t]=n,e.setState(s)}else e.setState(n)},S=new Map;c.on("get-components",e=>e.components=S);var P=e=>e,w=class{constructor(t,n,s,o){this.state=t,this.view=n,this.update=s,this.options=o,this._app=new C,this._actions=[],this._global_events=[],this._history=[],this._history_idx=-1,this._history_prev=()=>{this._history_idx--,this._history_idx>=0?this.setState(this._history[this._history_idx],{render:!0,history:!1}):this._history_idx=0},this._history_next=()=>{this._history_idx++,this._history_idx<this._history.length?this.setState(this._history[this._history_idx],{render:!0,history:!1}):this._history_idx=this._history.length-1},this.start=(i=null,a)=>this.mount(i,Object.assign(Object.assign({},a),{render:!0}))}render(t,n){c.render(t,n,this)}_view(t){if(!this.view)return;let n=c.createElement;c.h=c.createElement=(o,i,...a)=>(i&&Object.keys(i).forEach(l=>{l.startsWith("$")&&(((u,r,m,p)=>{if(u.startsWith("$on")){let g=r[u];if(u=u.substring(1),typeof g=="boolean")r[u]=d=>p.run(u,d);else if(typeof g=="string")r[u]=d=>p.run(g,d);else if(typeof g=="function")r[u]=d=>p.setState(g(p.state,d));else if(Array.isArray(g)){let[d,...h]=g;typeof d=="string"?r[u]=b=>p.run(d,...h,b):typeof d=="function"&&(r[u]=b=>p.setState(d(p.state,...h,b)))}}else if(u==="$bind"){let g=r.type||"text",d=typeof r[u]=="string"?r[u]:r.name;if(m==="input")switch(g){case"checkbox":r.checked=_(p,d),r.onclick=h=>v(p,d||h.target.name,h.target.checked);break;case"radio":r.checked=_(p,d)===r.value,r.onclick=h=>v(p,d||h.target.name,h.target.value);break;case"number":case"range":r.value=_(p,d),r.oninput=h=>v(p,d||h.target.name,Number(h.target.value));break;default:r.value=_(p,d),r.oninput=h=>v(p,d||h.target.name,h.target.value)}else m==="select"?(r.value=_(p,d),r.onchange=h=>{h.target.multiple||v(p,d||h.target.name,h.target.value)}):m==="option"?(r.selected=_(p,d),r.onclick=h=>v(p,d||h.target.name,h.target.selected)):m==="textarea"&&(r.innerHTML=_(p,d),r.oninput=h=>v(p,d||h.target.name,h.target.value))}else c.run("$",{key:u,tag:m,props:r,component:p})})(l,i,o,this),delete i[l])}),n(o,i,...a));let s=this.view(t);return c.h=c.createElement=n,s}renderState(t,n=null){if(!this.view)return;let s=n||this._view(t);if(c.debug&&c.run("debug",{component:this,_:s?".":"-",state:t,vdom:s,el:this.element}),typeof document!="object")return;let o=typeof this.element=="string"?document.getElementById(this.element):this.element;if(o){let i="_c";this.unload?o._component===this&&o.getAttribute(i)===this.tracking_id||(this.tracking_id=new Date().valueOf().toString(),o.setAttribute(i,this.tracking_id),typeof MutationObserver!="undefined"&&(this.observer||(this.observer=new MutationObserver(a=>{a[0].oldValue!==this.tracking_id&&document.body.contains(o)||(this.unload(this.state),this.observer.disconnect(),this.observer=null)})),this.observer.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeOldValue:!0,attributeFilter:[i]}))):o.removeAttribute&&o.removeAttribute(i),o._component=this}n||this.render(o,s),this.rendered&&this.rendered(this.state)}setState(t,n={render:!0,history:!1}){if(t instanceof Promise)Promise.all([t,this._state]).then(s=>{s[0]&&this.setState(s[0])}).catch(s=>{throw console.error(s),s}),this._state=t;else{if(this._state=t,t==null)return;this.state=t,n.render!==!1&&this.renderState(t),n.history!==!1&&this.enable_history&&(this._history=[...this._history,t],this._history_idx=this._history.length-1),typeof n.callback=="function"&&n.callback(this.state)}}mount(t=null,n){var s,o;return console.assert(!this.element,"Component already mounted."),this.options=n=Object.assign(Object.assign({},this.options),n),this.element=t,this.global_event=n.global_event,this.enable_history=!!n.history,this.enable_history&&(this.on(n.history.prev||"history-prev",this._history_prev),this.on(n.history.next||"history-next",this._history_next)),n.route&&(this.update=this.update||{},this.update[n.route]=P),this.add_actions(),this.state=(o=(s=this.state)!==null&&s!==void 0?s:this.model)!==null&&o!==void 0?o:{},typeof this.state=="function"&&(this.state=this.state()),n.render?this.setState(this.state,{render:!0,history:!0}):this.setState(this.state,{render:!1,history:!0}),c.debug&&(S.get(t)?S.get(t).push(this):S.set(t,[this])),this}is_global_event(t){return t&&(this.global_event||this._global_events.indexOf(t)>=0||t.startsWith("#")||t.startsWith("/")||t.startsWith("@"))}add_action(t,n,s={}){n&&typeof n=="function"&&(s.global&&this._global_events.push(t),this.on(t,(...o)=>{c.debug&&c.run("debug",{component:this,_:">",event:t,p:o,current_state:this.state,options:s});let i=n(this.state,...o);c.debug&&c.run("debug",{component:this,_:"<",event:t,p:o,newState:i,state:this.state,options:s}),this.setState(i,s)},s))}add_actions(){let t=this.update||{};W.getMetadataKeys(this).forEach(s=>{if(s.startsWith("apprun-update:")){let o=W.getMetadata(s,this);t[o.name]=[this[o.key].bind(this),o.options]}});let n={};Array.isArray(t)?t.forEach(s=>{let[o,i,a]=s;o.toString().split(",").forEach(l=>n[l.trim()]=[i,a])}):Object.keys(t).forEach(s=>{let o=t[s];(typeof o=="function"||Array.isArray(o))&&s.split(",").forEach(i=>n[i.trim()]=o)}),n["."]||(n["."]=P),Object.keys(n).forEach(s=>{let o=n[s];typeof o=="function"?this.add_action(s,o):Array.isArray(o)&&this.add_action(s,o[0],o[1])})}run(t,...n){let s=t.toString();return this.is_global_event(s)?c.run(s,...n):this._app.run(s,...n)}on(t,n,s){let o=t.toString();return this._actions.push({name:o,fn:n}),this.is_global_event(o)?c.on(o,n,s):this._app.on(o,n,s)}unmount(){var t;(t=this.observer)===null||t===void 0||t.disconnect(),this._actions.forEach(n=>{let{name:s,fn:o}=n;this.is_global_event(s)?c.off(s,o):this._app.off(s,o)})}};w.t=!0;var j=e=>{if(e||(e="#"),e.startsWith("#")){let[t,...n]=e.split("/");c.run(t,...n)||c.run("///",t,...n),c.run("//",t,...n)}else if(e.startsWith("/")){let[t,n,...s]=e.split("/");c.run("/"+n,...s)||c.run("///","/"+n,...s),c.run("//","/"+n,...s)}else c.run(e)||c.run("///",e),c.run("//",e)};c.h=c.createElement=function(e,t,...n){let s=R(n);if(typeof e=="string")return{tag:e,props:t,children:s};if(Array.isArray(e))return e;if(e===void 0&&n)return s;if(Object.getPrototypeOf(e).t)return{tag:e,props:t,children:s};if(typeof e=="function")return e(t,s);throw new Error(`Unknown tag in vdom ${e}`)},c.render=function(e,t,n){B(e,t,n)},c.Fragment=q,c.webComponent=H,c.start=(e,t,n,s,o)=>{let i=Object.assign(Object.assign({},o),{render:!0,global_event:!0}),a=new w(t,n,s);return o&&o.rendered&&(a.rendered=o.rendered),a.mount(e,i),a};var x=e=>{};c.on("$",x),c.on("debug",e=>x),c.on("//",x),c.on("#",x),c.route=j,c.on("route",e=>c.route&&c.route(e)),typeof document=="object"&&document.addEventListener("DOMContentLoaded",()=>{c.route===j&&(window.onpopstate=()=>j(location.hash),document.body.hasAttribute("apprun-no-init")||j(location.hash))}),typeof window=="object"&&(window.Component=w,window.React=c,window.on=J,window.customElement=K);var f=c;f.on("//",e=>{let t=document.querySelectorAll(".navbar-nav li");for(let s=0;s<t.length;++s)t[s].classList.remove("active");let n=document.querySelector(`[href='${e}']`);n&&n.parentElement.classList.add("active")});var D=()=>f.h("div",{class:"container"},f.h("nav",{class:"navbar navbar-expand-lg navbar-light bg-light"},f.h("a",{class:"navbar-brand",href:"#"},"AppRun \u2764\uFE0F Dapr"),f.h("button",{class:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"},f.h("span",{class:"navbar-toggler-icon"})),f.h("div",{class:"collapse navbar-collapse",id:"navbarSupportedContent"},f.h("ul",{class:"navbar-nav mr-auto"},f.h("li",{class:"nav-item active"},f.h("a",{class:"nav-link",href:"#Home"},"Home",f.h("span",{class:"sr-only"},"(current)"))),f.h("li",{class:"nav-item"},f.h("a",{class:"nav-link",href:"#Counter"},"Counter")),f.h("li",{class:"nav-item"},f.h("a",{class:"nav-link",href:"#Todo"},"Todo"))))),f.h("div",{class:"container",id:"my-app"}));var y;function F(){y=new WebSocket(`ws://${location.host}`),y.onopen=()=>console.log("websocket connected"),y.onclose=()=>{console.log("websocket disconnected"),y=null},y.onmessage=e=>{console.log("received: ",e.data);let{event:t,data:n}=JSON.parse(e.data);f.run("@@"+t,n)}}F();f.on("@ws",(e,t)=>{(!y||y.readyState===WebSocket.CLOSED)&&F();let n={event:e,data:t};console.log("sending: ",n),y.send(JSON.stringify(n))});var L=class extends w{constructor(){super(...arguments);this.state=0;this.view=t=>c.h("div",null,c.h("h1",null,t),c.h("button",{$onclick:"-1"},"-1"),c.h("button",{$onclick:"+1"},"+1"));this.update={"#, #Home, #Counter":t=>t,"-1":t=>{c.run("@ws","add",[t,-1])},"+1":t=>{c.run("@ws","add",[t,1])},"@@add":(t,n)=>n}}},U=L;f.render(document.body,f.h(D,null));var I="my-app";new U().start(I);})();
//# sourceMappingURL=main.js.map
