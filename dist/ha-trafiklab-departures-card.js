/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3=globalThis,e$4=t$3.ShadowRoot&&(void 0===t$3.ShadyCSS||t$3.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$5=new WeakMap;let n$4 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$4&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$5.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$5.set(s,t));}return t}toString(){return this.cssText}};const r$4=t=>new n$4("string"==typeof t?t:t+"",void 0,s$2),i$5=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new n$4(o,t,s$2)},S$1=(s,o)=>{if(e$4)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t$3.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$4?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$4(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$4,defineProperty:e$3,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$3,getOwnPropertySymbols:o$4,getPrototypeOf:n$3}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$4(t,s),b$1={attribute:true,type:String,converter:u$1,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b$1){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$3(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$3(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$3(t),...o$4(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(t=>t.hostConnected?.());}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.());}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i,e=false,h){if(void 0!==t){const r=this.constructor;if(false===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=globalThis,i$3=t=>t,s$1=t$2.trustedTypes,e$2=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,h="$lit$",o$3=`lit$${Math.random().toFixed(9).slice(2)}$`,n$2="?"+o$3,r$2=`<${n$2}>`,l=document,c=()=>l.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l.createTreeWalker(l,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e$2?e$2.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p):void 0!==u[3]&&(c=p):c===p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p:'"'===u[3]?$:g):c===$||c===g?c=p:c===_||c===m?c=v:(c=p,n=void 0);const x=c===p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r$2:d>=0?(e.push(a),s.slice(0,d)+h+s.slice(d)+o$3+x):s+o$3+(-2===d?i:x);}return [V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h)){const i=v[a++],s=r.getAttribute(t).split(o$3),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t);}else t.startsWith(o$3)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o$3),i=t.length-1;if(i>0){r.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c());}}}else if(8===r.nodeType)if(r.data===n$2)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$3,t+1));)d.push({type:7,index:l}),t+=o$3.length-1;}l++;}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,true);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P.nextNode(),o++);}return P.currentNode=l,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$3(t).nextSibling;i$3(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class I extends H{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A);}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t);}}const B=t$2.litHtmlPolyfillSupport;B?.(S,k),(t$2.litHtmlVersions??=[]).push("3.3.2");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;let i$2 = class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return E}};i$2._$litElement$=true,i$2["finalized"]=true,s.litElementHydrateSupport?.({LitElement:i$2});const o$2=s.litElementPolyfillSupport;o$2?.({LitElement:i$2});(s.litElementVersions??=[]).push("4.2.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=t=>(e,o)=>{ void 0!==o?o.addInitializer(()=>{customElements.define(t,e);}):customElements.define(t,e);};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o$1={attribute:true,type:String,converter:u$1,reflect:false,hasChanged:f$1},r$1=(t=o$1,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),"setter"===n&&((t=Object.create(t)).wrapped=true),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t,true,r);},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t,true,r);}}throw Error("Unsupported decorator location: "+n)};function n$1(t){return (e,o)=>"object"==typeof o?r$1(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function r(r){return n$1({...r,state:true,attribute:false})}

// ─── Enums ───────────────────────────────────────────────────────────────────
var CardTheme;
(function (CardTheme) {
    CardTheme["BASIC"] = "basic";
    CardTheme["BLACK_WHITE"] = "black-white";
    CardTheme["BLUE_OCEAN"] = "blue-ocean";
    CardTheme["CAPPUCINO"] = "cappucino";
    CardTheme["TABLE"] = "table";
})(CardTheme || (CardTheme = {}));
var CardOrientation;
(function (CardOrientation) {
    CardOrientation["HORIZONTAL"] = "horizontal";
    CardOrientation["VERTICAL"] = "vertical";
})(CardOrientation || (CardOrientation = {}));
var CanceledStyle;
(function (CanceledStyle) {
    CanceledStyle["DIM_STRIKETHROUGH"] = "dim-strikethrough";
    CanceledStyle["STRIKETHROUGH"] = "strikethrough";
    CanceledStyle["DIM"] = "dim";
    CanceledStyle["HIDE"] = "hide";
    CanceledStyle["LABEL"] = "label";
})(CanceledStyle || (CanceledStyle = {}));
var AnimateTarget;
(function (AnimateTarget) {
    AnimateTarget["ROW"] = "row";
    AnimateTarget["ICON"] = "icon";
    AnimateTarget["TIME"] = "time";
    AnimateTarget["ICON_TIME"] = "icon-time";
})(AnimateTarget || (AnimateTarget = {}));
var LayoutCell;
(function (LayoutCell) {
    LayoutCell["DELAY"] = "delay";
    LayoutCell["DESTINATION"] = "destination";
    LayoutCell["ESTIMATED_TIME"] = "estimated-time";
    LayoutCell["ICON"] = "icon";
    LayoutCell["LINE"] = "line";
    LayoutCell["PLANNED_TIME"] = "planned-time";
    LayoutCell["TIME_DIFF"] = "time-diff";
    LayoutCell["PLATFORM"] = "platform";
})(LayoutCell || (LayoutCell = {}));

const CARD_NAME = "trafiklab-departures-card";
const CARD_EDITOR_NAME = "trafiklab-departures-card-editor";
const CARD_VERSION = "1.0.0";
const DEFAULT_TITLE = "Departures";
const DEFAULT_ICON = "mdi:bus-clock";
const DEFAULT_LINE_COLOR = "#888888";
const DEFAULT_ORIENTATION = CardOrientation.VERTICAL;
CardTheme.BASIC;
const DEFAULT_DEPARTURES_TO_SHOW = 5;
const DEFAULT_ARRIVAL_OFFSET = 2;
const DEFAULT_UPDATE_INTERVAL = 10000; // ms
const DEFAULT_LAYOUT = [
    LayoutCell.ICON,
    LayoutCell.LINE,
    LayoutCell.DESTINATION,
    LayoutCell.PLATFORM,
    LayoutCell.TIME_DIFF,
    LayoutCell.PLANNED_TIME,
    LayoutCell.DELAY,
];

/**
 * Wraps a single departure's timing information from the Trafiklab sensor.
 *
 * Prefers pre-computed values from the sensor (`minutesUntil`, `timeFormatted`)
 * over re-parsing ISO timestamps, which avoids timezone ambiguity.
 */
class DepartureTime {
    constructor(opts) {
        this._planned = opts.planned;
        this._estimated = opts.estimated;
        this.delaySeconds = opts.delaySeconds ?? 0;
        this.canceled = opts.canceled ?? false;
        this.realTime = opts.realTime ?? false;
        this._minutesUntil = opts.minutesUntil ?? null;
        this._timeFormatted = opts.timeFormatted ?? null;
        this._createdAt = Date.now();
    }
    /** Minutes until departure, aged from when the object was created */
    timeDiff() {
        if (this._minutesUntil !== null) {
            const elapsedMinutes = (Date.now() - this._createdAt) / 60000;
            return Math.round(this._minutesUntil - elapsedMinutes);
        }
        // Fallback: compute from parsed timestamps
        const ref = isValidDate(this._estimated) ? this._estimated : this._planned;
        return Math.round((ref.getTime() - Date.now()) / 60000);
    }
    /** Delay in whole minutes */
    get delayMinutes() {
        return Math.round(this.delaySeconds / 60);
    }
    isDelayed() {
        return this.delayMinutes > 0;
    }
    isEarlier() {
        return this.delayMinutes < 0;
    }
    /** Returns true when the departure is within `offsetMinutes` minutes */
    isArriving(offsetMinutes = 2) {
        const diff = this.timeDiff();
        return diff >= 0 && diff <= offsetMinutes;
    }
    /** HH:mm for the scheduled departure */
    plannedTimeStr() {
        return formatHHMM(this._planned);
    }
    /** HH:mm for the estimated/realtime departure */
    estimatedTimeStr() {
        // _timeFormatted comes from the sensor's `time_formatted` which is derived
        // from realtime_time (or scheduled_time as fallback) — i.e. the estimated time.
        if (this._timeFormatted)
            return this._timeFormatted;
        if (isValidDate(this._estimated))
            return formatHHMM(this._estimated);
        return this.plannedTimeStr();
    }
    /** Human-readable countdown: "Now"/"Nu", "Xm", or "HH:MM" for >60m */
    timeDiffStr(nowStr = "Now") {
        const diff = this.timeDiff();
        if (diff <= 0)
            return nowStr;
        if (diff < 60)
            return `${diff}m`;
        return this.estimatedTimeStr();
    }
}
function isValidDate(d) {
    return d instanceof Date && !isNaN(d.getTime());
}
function formatHHMM(date) {
    if (!isValidDate(date))
        return "--:--";
    return date.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" });
}

/** Returns a contrasting text color (black or white) for a given hex background */
function getContrastTextColor(hexColor) {
    const hex = hexColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    // Luminance formula
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? "#000000" : "#ffffff";
}
/** Returns the MDI icon string for a transport mode */
function transportModeIcon(mode) {
    switch (mode?.toUpperCase()) {
        case "TRAIN":
            return "mdi:train";
        case "METRO":
            return "mdi:subway-variant";
        case "TRAM":
            return "mdi:tram";
        case "BOAT":
            return "mdi:ferry";
        case "TAXI":
            return "mdi:taxi";
        case "BUS":
        default:
            return "mdi:bus";
    }
}

/**
 * Parses a Trafiklab sensor entity and returns DeparturesDataRow[] by applying
 * the card's line-group filters and color mappings.
 */
function parseTrafiklabEntity(entity, config) {
    const attrs = entity.attributes;
    const upcoming = attrs.upcoming ?? [];
    if (!upcoming.length)
        return [];
    const lineConfigs = config.lines?.length ? config.lines : [{}];
    const rows = [];
    for (const dep of upcoming) {
        const matchedLine = findMatchingLine(dep, lineConfigs);
        if (!matchedLine)
            continue; // filtered out
        const planned = parseISO(dep.scheduled_time);
        const estimated = dep.expected_time ? parseISO(dep.expected_time) : planned;
        const departureTime = new DepartureTime({
            planned,
            estimated,
            delaySeconds: dep.delay ?? 0,
            canceled: dep.canceled ?? false,
            realTime: dep.real_time ?? false,
            minutesUntil: dep.minutes_until ?? null,
            timeFormatted: dep.time_formatted ?? null,
        });
        rows.push({
            time: departureTime,
            lineColor: matchedLine.line_color ?? DEFAULT_LINE_COLOR,
            lineName: matchedLine.line_name ?? dep.line,
            icon: matchedLine.icon ?? transportModeIcon(dep.transport_mode),
            destination: dep.destination,
            platform: dep.platform ?? "",
            canceled: dep.canceled ?? false,
            notices: dep.notices ?? [],
            transportMode: dep.transport_mode,
        });
    }
    return rows;
}
/** Find the first LineConfig whose filter matches this departure, or null if no match */
function findMatchingLine(dep, lineConfigs) {
    for (const lc of lineConfigs) {
        if (!lc.filter)
            return lc; // no filter = match everything
        if (matchesFilter(dep, lc.filter))
            return lc;
    }
    return null;
}
function matchesFilter(dep, filter) {
    // transport_mode filter
    if (filter.transport_mode !== undefined) {
        const allowed = Array.isArray(filter.transport_mode)
            ? filter.transport_mode.map((m) => m.toUpperCase())
            : [filter.transport_mode.toUpperCase()];
        if (!allowed.includes(dep.transport_mode?.toUpperCase()))
            return false;
    }
    // line number filter
    if (filter.line !== undefined) {
        const allowed = Array.isArray(filter.line)
            ? filter.line.map(String)
            : [String(filter.line)];
        if (!allowed.includes(String(dep.line)))
            return false;
    }
    // destination substring filter — string or array, OR logic (case-insensitive)
    if (filter.destination !== undefined) {
        const dest = dep.destination?.toLowerCase() ?? "";
        const needles = Array.isArray(filter.destination)
            ? filter.destination
            : [filter.destination];
        if (!needles.some((n) => dest.includes(n.toLowerCase())))
            return false;
    }
    // platform filter — exact match, string or array
    if (filter.platform !== undefined) {
        const allowed = Array.isArray(filter.platform)
            ? filter.platform.map(String)
            : [String(filter.platform)];
        if (!allowed.includes(String(dep.platform ?? "")))
            return false;
    }
    // direction filter
    if (filter.direction !== undefined) {
        if (String(dep.direction) !== String(filter.direction))
            return false;
    }
    return true;
}
function parseISO(isoStr) {
    if (!isoStr)
        return new Date(NaN);
    // Handle both "2025-08-08T14:30:00" and "2025-08-08T14:30:00+02:00"
    return new Date(isoStr);
}

const BASE_STYLES = i$5 `
  :host {
    --delay-ok: #23a043;
    --delay-bad: #f44336;
    --delay-none: #888888;
    --rt-color: #2196f3;
    --card-border-color: rgba(0, 0, 0, 0.12);
  }

  ha-card {
    overflow: hidden;
    padding: 0;
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px 4px 16px;
    font-size: 1.1em;
    font-weight: 500;
  }

  .card-header ha-icon {
    --mdc-icon-size: 22px;
  }

  .departures-container {
    padding: 4px 0 8px 0;
  }

  .list-header,
  .departure-row {
    display: grid;
    align-items: center;
    gap: 4px;
    padding: 4px 12px;
    min-height: 36px;
  }

  .list-header {
    font-size: 0.75em;
    font-weight: 600;
    opacity: 0.6;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .departure-row {
    border-bottom: 1px solid var(--card-border-color);
    cursor: pointer;
  }

  .departure-row:last-child {
    border-bottom: none;
  }

  /* canceled styles — applied via data-canceled-style attribute on the row */
  .departure-row.canceled-dim-strikethrough {
    opacity: 0.4;
    text-decoration: line-through;
  }
  .departure-row.canceled-strikethrough {
    text-decoration: line-through;
  }
  .departure-row.canceled-dim {
    opacity: 0.4;
  }
  .departure-row.canceled-label .cell-destination::after {
    content: "CANCELLED";
    margin-left: 6px;
    font-size: 0.7em;
    font-weight: 700;
    color: var(--error-color, #c0392b);
    vertical-align: middle;
    letter-spacing: 0.04em;
  }

  /* deviation badge */
  .deviation-badge {
    --mdc-icon-size: 14px;
    color: var(--warning-color, #f39c12);
    margin-left: 4px;
    vertical-align: middle;
    cursor: pointer;
    flex-shrink: 0;
    transition: transform 0.15s ease;
  }
  .deviation-badge.active {
    transform: scale(1.25);
    color: var(--error-color, #e67e22);
  }

  /* alert panel — shown below a departure row when the badge is tapped */
  .alert-panel {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 8px 12px;
    margin: -1px 0 4px 0;
    background: color-mix(in srgb, var(--warning-color, #f39c12) 12%, transparent);
    border-left: 3px solid var(--warning-color, #f39c12);
    border-radius: 0 4px 4px 0;
    font-size: 0.82em;
    line-height: 1.4;
    animation: alertSlideIn 0.15s ease;
  }
  @keyframes alertSlideIn {
    from { opacity: 0; transform: translateY(-4px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .alert-panel-icon {
    --mdc-icon-size: 16px;
    color: var(--warning-color, #f39c12);
    flex-shrink: 0;
    margin-top: 1px;
  }
  .alert-panel-text {
    flex: 1;
    color: var(--primary-text-color);
  }
  .alert-panel-text div + div {
    margin-top: 4px;
    padding-top: 4px;
    border-top: 1px solid color-mix(in srgb, var(--warning-color, #f39c12) 25%, transparent);
  }
  .alert-panel-close {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--secondary-text-color);
    font-size: 0.9em;
    padding: 0;
    line-height: 1;
    flex-shrink: 0;
    opacity: 0.6;
  }
  .alert-panel-close:hover {
    opacity: 1;
  }

  /* Transport icon */
  .cell-icon ha-icon {
    --mdc-icon-size: 20px;
    display: flex;
  }

  /* Line badge */
  .cell-line .line-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: 700;
    font-size: 0.82em;
    min-width: 28px;
    background: var(--line-color, #888);
    color: var(--line-text-color, #fff);
    white-space: nowrap;
  }

  /* Destination */
  .cell-destination {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.9em;
  }

  /* Time diff */
  .cell-time-diff {
    font-weight: 600;
    font-size: 0.9em;
    text-align: right;
  }

  /* Planned / estimated time */
  .cell-planned-time,
  .cell-estimated-time {
    font-size: 0.82em;
    opacity: 0.75;
    text-align: right;
  }

  /* Delay */
  .cell-delay {
    font-size: 0.8em;
    font-weight: 600;
    text-align: right;
  }
  .cell-delay.ok { color: var(--delay-ok); }
  .cell-delay.bad { color: var(--delay-bad); }
  .cell-delay.none { color: var(--delay-none); }

  /* Platform */
  .cell-platform {
    font-size: 0.78em;
    opacity: 0.7;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Real-time badge */
  .rt-badge {
    display: inline-block;
    font-size: 0.65em;
    font-weight: 700;
    color: var(--rt-color);
    border: 1px solid var(--rt-color);
    border-radius: 3px;
    padding: 0 3px;
    margin-left: 4px;
    vertical-align: middle;
    line-height: 1.4;
  }

  /* State messages */
  .state-message {
    padding: 12px 16px;
    font-size: 0.9em;
    opacity: 0.7;
  }
  .state-message.error {
    color: var(--error-color, red);
    opacity: 1;
  }

  /* Footer */
  .card-footer {
    font-size: 0.72em;
    opacity: 0.5;
    text-align: right;
    padding: 2px 12px 6px 12px;
  }
`;
const THEME_STYLES = {
    [CardTheme.BASIC]: i$5 ``,
    [CardTheme.BLACK_WHITE]: i$5 `
    ha-card {
      background: #000;
      color: #fff;
    }
    .departure-row {
      border-color: #333;
    }
    .cell-destination {
      text-transform: uppercase;
      font-family: "Roboto Mono", monospace;
    }
  `,
    [CardTheme.BLUE_OCEAN]: i$5 `
    ha-card {
      background: #0d2f55;
      color: #fff;
    }
    .departure-row {
      border-color: rgba(255,255,255,0.1);
    }
    .list-header {
      color: rgba(255,255,255,0.5);
    }
  `,
    [CardTheme.CAPPUCINO]: i$5 `
    ha-card {
      background: #f5efe6;
      color: #6f4e37;
    }
    .departure-row {
      border-left: 4px solid var(--line-color, #8B5E3C);
      border-bottom-color: rgba(111,78,55,0.15);
      padding-left: 8px;
    }
    .card-header {
      font-weight: 700;
    }
  `,
    [CardTheme.TABLE]: i$5 `
    .departure-row {
      border: 1px solid var(--card-border-color);
      border-radius: 4px;
      margin: 2px 8px;
    }
  `,
};

class CardError extends Error {
    constructor(message) {
        super(message);
        this.name = "CardError";
    }
}
class ConfigError extends CardError {
    constructor(message) {
        super(message);
        this.name = "ConfigError";
    }
}

const en = {
    col: {
        icon: "Icon",
        line: "Line",
        destination: "Destination",
        time_diff: "In",
        planned_time: "Sched.",
        estimated_time: "Est.",
        delay: "Delay",
        platform: "Plat.",
    },
    time: {
        now: "Now",
    },
    state: {
        unavailable: "Sensor unavailable",
        not_found: (entity) => `Entity ${entity} not found.`,
        updated: (time) => `Updated ${time} · Trafiklab`,
    },
};

const sv = {
    col: {
        icon: "Ikon",
        line: "Linje",
        destination: "Destination",
        time_diff: "Om",
        planned_time: "Avg.",
        estimated_time: "Beräkn.",
        delay: "Försening",
        platform: "Spår",
    },
    time: {
        now: "Nu",
    },
    state: {
        unavailable: "Sensor ej tillgänglig",
        not_found: (entity) => `Entitet ${entity} hittades inte.`,
        updated: (time) => `Uppdaterad ${time} · Trafiklab`,
    },
};

const LOCALES = { en, sv };
/** Returns the translation bundle for the given HA language code (e.g. "sv", "sv-SE", "en"). */
function getLocale(language) {
    const lang = language?.split("-")[0]?.toLowerCase() ?? "en";
    return LOCALES[lang] ?? en;
}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t={ATTRIBUTE:1},e$1=t=>(...e)=>({_$litDirective$:t,values:e});let i$1 = class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const n="important",i=" !"+n,o=e$1(class extends i$1{constructor(t$1){if(super(t$1),t$1.type!==t.ATTRIBUTE||"style"!==t$1.name||t$1.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,r)=>{const s=t[r];return null==s?e:e+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(e,[r]){const{style:s}=e.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(r)),this.render(r);for(const t of this.ft)null==r[t]&&(this.ft.delete(t),t.includes("-")?s.removeProperty(t):s[t]=null);for(const t in r){const e=r[t];if(null!=e){this.ft.add(t);const r="string"==typeof e&&e.endsWith(i);t.includes("-")||r?s.setProperty(t,r?e.slice(0,-11):e,r?n:""):s[t]=e;}}return E}});

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const e=e$1(class extends i$1{constructor(t$1){if(super(t$1),t$1.type!==t.ATTRIBUTE||"class"!==t$1.name||t$1.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return " "+Object.keys(t).filter(s=>t[s]).join(" ")+" "}update(s,[i]){if(void 0===this.st){this.st=new Set,void 0!==s.strings&&(this.nt=new Set(s.strings.join(" ").split(/\s/).filter(t=>""!==t)));for(const t in i)i[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(i)}const r=s.element.classList;for(const t of this.st)t in i||(r.remove(t),this.st.delete(t));for(const t in i){const s=!!i[t];s===this.st.has(t)||this.nt?.has(t)||(s?(r.add(t),this.st.add(t)):(r.remove(t),this.st.delete(t)));}return E}});

const ANIMATION_PRESETS = {
    flash: {
        keyframes: [
            { opacity: "1" },
            { opacity: "0" },
            { opacity: "1" },
            { opacity: "0" },
            { opacity: "1" },
        ],
        options: { duration: 3000, iterations: Infinity },
    },
    shakeX: {
        keyframes: [
            { transform: "translateX(0)" },
            { transform: "translateX(-10px)" },
            { transform: "translateX(10px)" },
            { transform: "translateX(-10px)" },
            { transform: "translateX(10px)" },
            { transform: "translateX(0)" },
        ],
        options: { duration: 800, iterations: Infinity },
    },
    shakeY: {
        keyframes: [
            { transform: "translateY(0)" },
            { transform: "translateY(-10px)" },
            { transform: "translateY(10px)" },
            { transform: "translateY(-10px)" },
            { transform: "translateY(10px)" },
            { transform: "translateY(0)" },
        ],
        options: { duration: 800, iterations: Infinity },
    },
    fadeIn: {
        keyframes: [{ opacity: "0" }, { opacity: "1" }],
        options: { duration: 2000, iterations: Infinity },
    },
    fadeOut: {
        keyframes: [{ opacity: "1" }, { opacity: "0" }],
        options: { duration: 2000, iterations: Infinity },
    },
    zoomIn: {
        keyframes: [
            { transform: "scale(0.5)", opacity: "0" },
            { transform: "scale(1)", opacity: "1" },
        ],
        options: { duration: 2000, iterations: Infinity },
    },
    bounce: {
        keyframes: [
            { transform: "translateY(0)", animationTimingFunction: "cubic-bezier(0.215,0.61,0.355,1)" },
            { transform: "translateY(-30px)", animationTimingFunction: "cubic-bezier(0.755,0.05,0.855,0.06)" },
            { transform: "translateY(0)", animationTimingFunction: "cubic-bezier(0.215,0.61,0.355,1)" },
        ],
        options: { duration: 1000, iterations: Infinity },
    },
};

/** CSS grid-template-columns value for each cell */
const CELL_WIDTHS = {
    [LayoutCell.ICON]: "28px",
    [LayoutCell.LINE]: "52px",
    [LayoutCell.DESTINATION]: "1fr",
    [LayoutCell.TIME_DIFF]: "44px",
    [LayoutCell.PLANNED_TIME]: "58px",
    [LayoutCell.ESTIMATED_TIME]: "58px",
    [LayoutCell.DELAY]: "52px",
    [LayoutCell.PLATFORM]: "52px",
};
function buildGridTemplate(layout) {
    return layout
        .map((cell) => CELL_WIDTHS[cell] ?? "auto")
        .join(" ");
}

class ContentBase extends i$2 {
    constructor() {
        super(...arguments);
        this.rows = [];
        this._activeAlertRow = null;
    }
    get layout() {
        return this.config.layout ?? DEFAULT_LAYOUT;
    }
    get gridTemplate() {
        return buildGridTemplate(this.layout);
    }
    updated() {
        this._syncAnimations();
    }
    _syncAnimations() {
        const type = this.config?.departure_animation;
        const preset = type ? ANIMATION_PRESETS[type] : undefined;
        const animTarget = this.config.animate_target ?? AnimateTarget.ICON_TIME;
        this.shadowRoot?.querySelectorAll(".departure-row").forEach((row) => {
            const shouldAnimate = row.dataset.arriving === "true" && !!preset;
            const targets = animTarget === AnimateTarget.ROW
                ? [row]
                : [
                    animTarget !== AnimateTarget.TIME
                        ? row.querySelector(".cell-icon")
                        : null,
                    animTarget !== AnimateTarget.ICON
                        ? row.querySelector(".cell-time-diff")
                        : null,
                ].filter((el) => el !== null);
            targets.forEach((el) => {
                if (shouldAnimate) {
                    if (!el._trafiklabAnim) {
                        const options = { ...preset.options };
                        const override = this.config.departure_animation_duration;
                        if (override)
                            options.duration = override;
                        el._trafiklabAnim = el.animate(preset.keyframes, options);
                    }
                }
                else {
                    if (el._trafiklabAnim) {
                        el._trafiklabAnim.cancel();
                        el._trafiklabAnim = undefined;
                    }
                }
            });
        });
    }
    renderListHeader() {
        if (!this.config.show_list_header)
            return b `${A}`;
        return b `
      <div
        class="list-header"
        style=${o({ gridTemplateColumns: this.gridTemplate })}
      >
        ${this.layout.map((cell) => this.renderHeaderCell(cell))}
      </div>
    `;
    }
    renderHeaderCell(cell) {
        const loc = getLocale(this.hass?.language ?? "en");
        const labels = {
            [LayoutCell.ICON]: "",
            [LayoutCell.LINE]: loc.col.line,
            [LayoutCell.DESTINATION]: loc.col.destination,
            [LayoutCell.TIME_DIFF]: loc.col.time_diff,
            [LayoutCell.PLANNED_TIME]: loc.col.planned_time,
            [LayoutCell.ESTIMATED_TIME]: loc.col.estimated_time,
            [LayoutCell.DELAY]: loc.col.delay,
            [LayoutCell.PLATFORM]: loc.col.platform,
        };
        const rightAligned = new Set([
            LayoutCell.TIME_DIFF,
            LayoutCell.PLANNED_TIME,
            LayoutCell.ESTIMATED_TIME,
            LayoutCell.DELAY,
        ]);
        const centeredAligned = new Set([LayoutCell.PLATFORM]);
        const style = rightAligned.has(cell)
            ? "text-align:right"
            : centeredAligned.has(cell)
                ? "text-align:center"
                : "";
        return b `<span style=${style}>${labels[cell] ?? cell}</span>`;
    }
    renderDepartureRow(row, index) {
        const arrivalOffset = this.config.arrival_time_offset ?? DEFAULT_ARRIVAL_OFFSET;
        const isArriving = row.time.isArriving(arrivalOffset);
        const hasAnimation = !!this.config.departure_animation;
        const canceledStyle = this.config.canceled_style ?? CanceledStyle.DIM_STRIKETHROUGH;
        if (row.canceled && canceledStyle === CanceledStyle.HIDE)
            return b ``;
        const canceledClass = row.canceled ? `canceled-${canceledStyle}` : "";
        const alertOpen = this._activeAlertRow === index;
        return b `
      <div
        class=${e({ "departure-row": true, [canceledClass]: !!canceledClass })}
        style=${o({ gridTemplateColumns: this.gridTemplate })}
        data-index=${index}
        data-arriving=${isArriving && hasAnimation ? "true" : "false"}
      >
        ${this.layout.map((cell) => this.renderCell(cell, row, index))}
      </div>
      ${alertOpen && row.notices.length > 0 ? b `
        <div class="alert-panel">
          <ha-icon icon="mdi:alert-circle" class="alert-panel-icon"></ha-icon>
          <div class="alert-panel-text">
            ${row.notices.map((n) => b `<div>${n}</div>`)}
          </div>
          <button class="alert-panel-close" @click=${() => { this._activeAlertRow = null; }}>✕</button>
        </div>
      ` : A}
    `;
    }
    renderCell(cell, row, index = 0) {
        switch (cell) {
            case LayoutCell.ICON: return this.renderIconCell(row);
            case LayoutCell.LINE: return this.renderLineCell(row);
            case LayoutCell.DESTINATION: return this.renderDestinationCell(row, index);
            case LayoutCell.TIME_DIFF: return this.renderTimeDiffCell(row);
            case LayoutCell.PLANNED_TIME: return this.renderPlannedTimeCell(row);
            case LayoutCell.ESTIMATED_TIME: return this.renderEstimatedTimeCell(row);
            case LayoutCell.DELAY: return this.renderDelayCell(row);
            case LayoutCell.PLATFORM: return this.renderPlatformCell(row);
            default: return b `<span></span>`;
        }
    }
    renderIconCell(row) {
        return b `<span class="cell-icon"><ha-icon .icon=${row.icon ?? "mdi:bus"}></ha-icon></span>`;
    }
    renderLineCell(row) {
        const color = row.lineColor ?? "#888";
        const textColor = getContrastTextColor(color);
        return b `
      <span class="cell-line" style=${o({ "--line-color": color, "--line-text-color": textColor })}>
        <span class="line-badge">${row.lineName ?? "?"}</span>
      </span>
    `;
    }
    renderDestinationCell(row, index) {
        const showRtBadge = this.config.show_realtime_badge === true && row.time.realTime;
        const showDeviationBadge = this.config.show_deviation_badge === true && row.notices.length > 0;
        const alertOpen = this._activeAlertRow === index;
        return b `
      <span class="cell-destination">
        ${row.destination}
        ${showRtBadge ? b `<span class="rt-badge">RT</span>` : A}
        ${showDeviationBadge ? b `
          <ha-icon
            class=${e({ "deviation-badge": true, active: alertOpen })}
            icon="mdi:alert-circle"
            title=${row.notices.join(" | ")}
            @click=${(ev) => {
            ev.stopPropagation();
            this._activeAlertRow = alertOpen ? null : index;
        }}
          ></ha-icon>
        ` : A}
      </span>
    `;
    }
    renderTimeDiffCell(row) {
        const nowStr = getLocale(this.hass?.language ?? "en").time.now;
        return b `<span class="cell-time-diff">${row.time.timeDiffStr(nowStr)}</span>`;
    }
    renderPlannedTimeCell(row) {
        return b `<span class="cell-planned-time">${row.time.plannedTimeStr()}</span>`;
    }
    renderEstimatedTimeCell(row) {
        return b `<span class="cell-estimated-time">${row.time.estimatedTimeStr()}</span>`;
    }
    renderDelayCell(row) {
        const dm = row.time.delayMinutes;
        const cls = dm === 0 ? "none" : dm > 0 ? "bad" : "ok";
        const label = dm === 0 ? "" : dm > 0 ? `+${dm}m` : `${dm}m`;
        return b `<span class="cell-delay ${cls}">${label}</span>`;
    }
    renderPlatformCell(row) {
        return b `<span class="cell-platform" style="text-align:center;display:block">${row.platform}</span>`;
    }
}
__decorate([
    n$1({ attribute: false })
], ContentBase.prototype, "hass", void 0);
__decorate([
    n$1({ attribute: false })
], ContentBase.prototype, "config", void 0);
__decorate([
    n$1({ attribute: false })
], ContentBase.prototype, "rows", void 0);
__decorate([
    r()
], ContentBase.prototype, "_activeAlertRow", void 0);

let ContentList = class ContentList extends ContentBase {
    renderContent() {
        const limit = this.config.departures_to_show ?? DEFAULT_DEPARTURES_TO_SHOW;
        const visible = this.rows.slice(0, limit);
        return b `
      <div class="departures-container">
        ${this.renderListHeader()}
        ${visible.map((row, i) => this.renderDepartureRow(row, i))}
      </div>
    `;
    }
    render() {
        return this.renderContent();
    }
};
ContentList.styles = [BASE_STYLES, i$5 `
    .departures-container {
      overflow-y: auto;
      max-height: 400px;
    }
  `];
ContentList = __decorate([
    t$1("trafiklab-content-list")
], ContentList);

let ContentTable = class ContentTable extends ContentBase {
    renderContent() {
        const limit = this.config.departures_to_show ?? DEFAULT_DEPARTURES_TO_SHOW;
        const rows = this.config.sort_departures
            ? [...this.rows].sort((a, b) => a.time.timeDiff() - b.time.timeDiff())
            : this.rows;
        const visible = rows.slice(0, limit);
        return b `
      <div class="departures-container">
        ${this.renderListHeader()}
        ${visible.map((row, i) => this.renderDepartureRow(row, i))}
      </div>
    `;
    }
    render() {
        return this.renderContent();
    }
};
ContentTable.styles = [BASE_STYLES, i$5 `
    .departures-container {
      width: 100%;
      overflow-x: auto;
    }
    .departure-row {
      min-width: 400px;
    }
  `];
ContentTable = __decorate([
    t$1("trafiklab-content-table")
], ContentTable);

const ALL_COLUMNS = [
    { cell: LayoutCell.ICON, label: "Icon" },
    { cell: LayoutCell.LINE, label: "Line" },
    { cell: LayoutCell.DESTINATION, label: "Destination" },
    { cell: LayoutCell.PLATFORM, label: "Platform" },
    { cell: LayoutCell.TIME_DIFF, label: "In (countdown)" },
    { cell: LayoutCell.PLANNED_TIME, label: "Scheduled time" },
    { cell: LayoutCell.ESTIMATED_TIME, label: "Estimated time" },
    { cell: LayoutCell.DELAY, label: "Delay" },
];
let DeparturesCardEditor = class DeparturesCardEditor extends i$2 {
    setConfig(config) {
        this._config = config;
    }
    _updateConfig(updates) {
        this.dispatchEvent(new CustomEvent("config-changed", {
            detail: { config: { ...this._config, ...updates } },
        }));
    }
    _updateLine(index, updates) {
        const lines = [...(this._config.lines ?? [{}])];
        lines[index] = { ...lines[index], ...updates };
        this._updateConfig({ lines });
    }
    _updateLineFilter(index, key, value) {
        const lines = [...(this._config.lines ?? [{}])];
        const filter = { ...(lines[index]?.filter ?? {}), [key]: value || undefined };
        lines[index] = { ...lines[index], filter };
        this._updateConfig({ lines });
    }
    _parseCSV(raw) {
        const parts = raw.split(",").map((s) => s.trim()).filter(Boolean);
        if (parts.length === 0)
            return undefined;
        return parts.length === 1 ? parts[0] : parts;
    }
    _serializeCSV(value) {
        if (!value)
            return "";
        return Array.isArray(value) ? value.join(", ") : value;
    }
    _toggleColumn(cell, enabled) {
        const current = this._config.layout ?? DEFAULT_LAYOUT;
        let updated;
        if (enabled) {
            const order = ALL_COLUMNS.map((c) => c.cell);
            updated = order.filter((c) => c === cell || current.includes(c));
        }
        else {
            updated = current.filter((c) => c !== cell);
        }
        this._updateConfig({ layout: updated });
    }
    _addLine() {
        const lines = [...(this._config.lines ?? [])];
        lines.push({ line_color: "#1565c0" });
        this._updateConfig({ lines });
    }
    _removeLine(index) {
        const lines = [...(this._config.lines ?? [])];
        lines.splice(index, 1);
        this._updateConfig({ lines });
    }
    /** Native select that reliably works inside shadow DOM */
    _renderSelect(label, value, options, onChange) {
        return b `
      <div class="select-wrapper">
        <label>${label}</label>
        <select
          .value=${value}
          @change=${(ev) => onChange(ev.target.value)}
        >
          ${options.map((o) => b `<option value=${o.value} ?selected=${o.value === value}>${o.label}</option>`)}
        </select>
      </div>
    `;
    }
    render() {
        if (!this._config)
            return b ``;
        const lines = this._config.lines ?? [{}];
        return b `
      <!-- General -->
      <div class="section-title">General</div>
      <div class="grid">
        <div class="full-width">
          <ha-entity-picker
            .hass=${this.hass}
            .value=${this._config.entity ?? ""}
            .includeDomains=${["sensor"]}
            label="Trafiklab Departures Sensor"
            allow-custom-entity
            @value-changed=${(ev) => this._updateConfig({ entity: ev.detail.value })}
          ></ha-entity-picker>
        </div>
        <ha-textfield
          label="Title"
          .value=${this._config.title ?? "Departures"}
          @change=${(ev) => this._updateConfig({ title: ev.target.value || undefined })}
        ></ha-textfield>
        <ha-textfield
          label="Icon"
          .value=${this._config.icon ?? "mdi:bus-clock"}
          @change=${(ev) => this._updateConfig({ icon: ev.target.value || undefined })}
        ></ha-textfield>
        <ha-formfield label="Show header">
          <ha-switch
            .checked=${this._config.show_header !== false}
            @change=${(ev) => this._updateConfig({ show_header: ev.target.checked })}
          ></ha-switch>
        </ha-formfield>
        <ha-formfield label="Show column headers">
          <ha-switch
            .checked=${this._config.show_list_header === true}
            @change=${(ev) => this._updateConfig({ show_list_header: ev.target.checked })}
          ></ha-switch>
        </ha-formfield>
        <ha-formfield label="Show real-time badge">
          <ha-switch
            .checked=${this._config.show_realtime_badge === true}
            @change=${(ev) => this._updateConfig({ show_realtime_badge: ev.target.checked })}
          ></ha-switch>
        </ha-formfield>
      </div>

      <!-- Display -->
      <div class="section-title">Display</div>
      <div class="grid">
        ${this._renderSelect("Orientation", this._config.orientation ?? CardOrientation.VERTICAL, [
            { value: CardOrientation.VERTICAL, label: "Vertical (list)" },
            { value: CardOrientation.HORIZONTAL, label: "Horizontal (table)" },
        ], (v) => this._updateConfig({ orientation: v }))}
        ${this._renderSelect("Theme", this._config.theme ?? CardTheme.BASIC, [
            { value: CardTheme.BASIC, label: "Basic" },
            { value: CardTheme.BLACK_WHITE, label: "Black & White" },
            { value: CardTheme.BLUE_OCEAN, label: "Blue Ocean" },
            { value: CardTheme.CAPPUCINO, label: "Cappuccino" },
            { value: CardTheme.TABLE, label: "Table" },
        ], (v) => this._updateConfig({ theme: v }))}
        <ha-textfield
          label="Departures to show"
          type="number"
          .value=${String(this._config.departures_to_show ?? DEFAULT_DEPARTURES_TO_SHOW)}
          @change=${(ev) => {
            const val = parseInt(ev.target.value);
            this._updateConfig({ departures_to_show: isNaN(val) ? DEFAULT_DEPARTURES_TO_SHOW : val });
        }}
        ></ha-textfield>
        <ha-formfield label="Sort by time">
          <ha-switch
            .checked=${this._config.sort_departures === true}
            @change=${(ev) => this._updateConfig({ sort_departures: ev.target.checked })}
          ></ha-switch>
        </ha-formfield>
        ${this._renderSelect("Canceled departure style", this._config.canceled_style ?? CanceledStyle.DIM_STRIKETHROUGH, [
            { value: CanceledStyle.DIM_STRIKETHROUGH, label: "Dim + strikethrough (default)" },
            { value: CanceledStyle.STRIKETHROUGH, label: "Strikethrough only" },
            { value: CanceledStyle.DIM, label: "Dim only" },
            { value: CanceledStyle.LABEL, label: "Show CANCELLED label" },
            { value: CanceledStyle.HIDE, label: "Hide canceled departures" },
        ], (v) => this._updateConfig({ canceled_style: v }))}
        <ha-formfield label="Show deviation badge">
          <ha-switch
            .checked=${this._config.show_deviation_badge === true}
            @change=${(ev) => this._updateConfig({ show_deviation_badge: ev.target.checked })}
          ></ha-switch>
        </ha-formfield>
      </div>

      <!-- Animations -->
      <div class="section-title">Animations</div>
      <div class="grid">
        ${this._renderSelect("Animation on arrival", this._config.departure_animation ?? "none", [
            { value: "none", label: "None" },
            { value: "flash", label: "Flash" },
            { value: "bounce", label: "Bounce" },
            { value: "shakeX", label: "Shake horizontal" },
            { value: "shakeY", label: "Shake vertical" },
            { value: "fadeIn", label: "Fade in" },
            { value: "fadeOut", label: "Fade out" },
            { value: "zoomIn", label: "Zoom in" },
        ], (v) => this._updateConfig({ departure_animation: v === "none" ? undefined : v }))}
        ${this._renderSelect("Animate", this._config.animate_target ?? AnimateTarget.ICON_TIME, [
            { value: AnimateTarget.ICON_TIME, label: "Icon + countdown" },
            { value: AnimateTarget.TIME, label: "Countdown only" },
            { value: AnimateTarget.ICON, label: "Icon only" },
            { value: AnimateTarget.ROW, label: "Whole row" },
        ], (v) => this._updateConfig({ animate_target: v }))}
        <ha-textfield
          label="Trigger (minutes before departure)"
          type="number"
          .value=${String(this._config.arrival_time_offset ?? 2)}
          @change=${(ev) => {
            const val = parseInt(ev.target.value);
            this._updateConfig({ arrival_time_offset: isNaN(val) ? 2 : val });
        }}
        ></ha-textfield>
        <ha-textfield
          label="Duration override (ms, 0 = default)"
          type="number"
          .value=${String(this._config.departure_animation_duration ?? 0)}
          @change=${(ev) => {
            const val = parseInt(ev.target.value);
            this._updateConfig({ departure_animation_duration: !val ? undefined : val });
        }}
        ></ha-textfield>
      </div>

      <!-- Columns -->
      <div class="section-title">Columns</div>
      <div class="columns-grid">
        ${ALL_COLUMNS.map(({ cell, label }) => {
            const active = (this._config.layout ?? DEFAULT_LAYOUT).includes(cell);
            return b `
            <ha-formfield .label=${label}>
              <ha-checkbox
                .checked=${active}
                @change=${(ev) => this._toggleColumn(cell, ev.target.checked)}
              ></ha-checkbox>
            </ha-formfield>
          `;
        })}
      </div>

      <!-- Line groups -->
      <div class="section-title">Line Groups</div>
      ${lines.map((line, i) => this._renderLineEditor(line, i))}
      <mwc-button class="add-btn" @click=${this._addLine}>
        + Add line group
      </mwc-button>
    `;
    }
    _renderLineEditor(line, index) {
        const filter = line.filter ?? {};
        const transportMode = Array.isArray(filter.transport_mode)
            ? filter.transport_mode[0] ?? ""
            : filter.transport_mode ?? "";
        return b `
      <div class="line-card">
        <div class="line-card-header">
          <span>Group ${index + 1}</span>
          <button class="remove-btn" @click=${() => this._removeLine(index)}>✕</button>
        </div>
        <div class="grid">
          <ha-textfield
            label="Line color (hex)"
            .value=${line.line_color ?? "#1565c0"}
            @change=${(ev) => this._updateLine(index, { line_color: ev.target.value })}
          ></ha-textfield>
          <ha-textfield
            label="Line name override"
            .value=${line.line_name ?? ""}
            placeholder="(from sensor)"
            @change=${(ev) => {
            const v = ev.target.value;
            this._updateLine(index, { line_name: v || undefined });
        }}
          ></ha-textfield>
          ${this._renderSelect("Transport mode", transportMode, [
            { value: "", label: "All modes" },
            { value: "BUS", label: "Bus" },
            { value: "TRAIN", label: "Train" },
            { value: "METRO", label: "Metro" },
            { value: "TRAM", label: "Tram" },
            { value: "BOAT", label: "Boat" },
            { value: "TAXI", label: "Taxi" },
        ], (v) => this._updateLineFilter(index, "transport_mode", v || undefined))}
          <ha-textfield
            label="Line number(s)"
            .value=${this._serializeCSV(filter.line)}
            placeholder="e.g. 7 or 1, 4, 7"
            @change=${(ev) => {
            const v = ev.target.value;
            this._updateLineFilter(index, "line", this._parseCSV(v));
        }}
          ></ha-textfield>
          <ha-textfield
            label="Destination(s)"
            .value=${this._serializeCSV(filter.destination)}
            placeholder="e.g. Stockholm or Stockholm, Solna"
            class="full-width"
            @change=${(ev) => {
            const v = ev.target.value;
            this._updateLineFilter(index, "destination", this._parseCSV(v));
        }}
          ></ha-textfield>
          <span class="hint">Comma-separated substrings, any match included (OR logic)</span>
          <ha-textfield
            label="Platform(s)"
            .value=${this._serializeCSV(filter.platform)}
            placeholder="e.g. 3 or 1, 2"
            @change=${(ev) => {
            const v = ev.target.value;
            this._updateLineFilter(index, "platform", this._parseCSV(v));
        }}
          ></ha-textfield>
          <ha-textfield
            label="Direction"
            .value=${filter.direction ?? ""}
            placeholder="e.g. 0 or 1"
            @change=${(ev) => {
            const v = ev.target.value.trim();
            this._updateLineFilter(index, "direction", v || undefined);
        }}
          ></ha-textfield>
        </div>
      </div>
    `;
    }
};
DeparturesCardEditor.styles = i$5 `
    :host {
      display: block;
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      padding: 8px 0;
    }
    .full-width {
      grid-column: 1 / -1;
    }
    .section-title {
      font-weight: 600;
      font-size: 0.9em;
      margin: 12px 0 4px 0;
      padding-bottom: 4px;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
    }
    .line-card {
      border: 1px solid var(--divider-color, #ddd);
      border-radius: 6px;
      padding: 8px;
      margin-bottom: 8px;
    }
    .line-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
      font-weight: 600;
      font-size: 0.85em;
    }
    .remove-btn {
      cursor: pointer;
      color: var(--error-color, red);
      background: none;
      border: none;
      font-size: 1.2em;
      padding: 0 4px;
    }
    .add-btn {
      margin-top: 8px;
      width: 100%;
    }
    .hint {
      font-size: 0.75em;
      opacity: 0.6;
      grid-column: 1 / -1;
      margin-top: -4px;
    }
    ha-textfield {
      width: 100%;
    }
    .select-wrapper {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .select-wrapper label {
      font-size: 0.75em;
      opacity: 0.7;
      padding-left: 2px;
    }
    .select-wrapper select {
      width: 100%;
      padding: 10px 8px;
      border: 1px solid var(--divider-color, #ccc);
      border-radius: 4px;
      background: var(--card-background-color, white);
      color: var(--primary-text-color, black);
      font-size: 1em;
      cursor: pointer;
    }
    .columns-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2px 8px;
      padding: 4px 0;
    }
  `;
__decorate([
    n$1({ attribute: false })
], DeparturesCardEditor.prototype, "hass", void 0);
__decorate([
    r()
], DeparturesCardEditor.prototype, "_config", void 0);
DeparturesCardEditor = __decorate([
    t$1(CARD_EDITOR_NAME)
], DeparturesCardEditor);

// Register card in the custom card picker
window.customCards = window.customCards || [];
window.customCards.push({
    type: CARD_NAME,
    name: "Trafiklab Departures Card",
    description: "Public transport departures from the Trafiklab integration",
    preview: true,
    documentationURL: "https://github.com/vitords/ha-trafiklab-departures-card",
});
console.info(`%c TRAFIKLAB-DEPARTURES-CARD %c v${CARD_VERSION} `, "color: white; background: #1565c0; font-weight: bold;", "color: #1565c0; background: white; font-weight: bold;");
let TrafiklabDeparturesCard = class TrafiklabDeparturesCard extends i$2 {
    constructor() {
        super(...arguments);
        this._rows = [];
    }
    static async getConfigElement() {
        return document.createElement(CARD_EDITOR_NAME);
    }
    static getStubConfig() {
        return {
            type: `custom:${CARD_NAME}`,
            entity: "",
            title: DEFAULT_TITLE,
            lines: [{ line_color: "#1565c0" }],
        };
    }
    setConfig(config) {
        if (!config.entity) {
            throw new ConfigError("A Trafiklab sensor entity must be specified.");
        }
        this._config = config;
    }
    connectedCallback() {
        super.connectedCallback();
        this._updateTimer = setInterval(() => this._refresh(), DEFAULT_UPDATE_INTERVAL);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        if (this._updateTimer) {
            clearInterval(this._updateTimer);
            this._updateTimer = undefined;
        }
    }
    updated(changed) {
        if (changed.has("hass") || changed.has("_config")) {
            this._refresh();
        }
    }
    _refresh() {
        if (!this.hass || !this._config?.entity)
            return;
        const entity = this.hass.states[this._config.entity];
        if (!entity)
            return;
        this._rows = parseTrafiklabEntity(entity, this._config);
    }
    render() {
        if (!this._config || !this.hass)
            return b ``;
        const loc = getLocale(this.hass.language);
        const entity = this.hass.states[this._config.entity];
        if (!entity) {
            return b `
        <ha-card>
          ${this._renderHeader()}
          <div class="state-message error">
            ${loc.state.not_found(this._config.entity)}
          </div>
        </ha-card>
      `;
        }
        const state = entity.state;
        const isUnavailable = state === "unavailable" || state === "unknown";
        const orientation = this._config.orientation ?? DEFAULT_ORIENTATION;
        const theme = this._config.theme;
        const themeStyle = theme ? THEME_STYLES[theme] : undefined;
        return b `
      <ha-card>
        ${themeStyle ? b `<style>${themeStyle}</style>` : A}
        ${this._renderHeader()}
        ${isUnavailable
            ? b `<div class="state-message unavailable">${loc.state.unavailable}</div>`
            : orientation === CardOrientation.HORIZONTAL
                ? b `
              <trafiklab-content-table
                .hass=${this.hass}
                .config=${this._config}
                .rows=${this._rows}
              ></trafiklab-content-table>
            `
                : b `
              <trafiklab-content-list
                .hass=${this.hass}
                .config=${this._config}
                .rows=${this._rows}
              ></trafiklab-content-list>
            `}
        ${this._renderFooter(entity)}
      </ha-card>
    `;
    }
    _renderHeader() {
        if (this._config.show_header === false)
            return b `${A}`;
        const title = this._config.title ?? DEFAULT_TITLE;
        const icon = this._config.icon ?? DEFAULT_ICON;
        return b `
      <div class="card-header">
        <ha-icon .icon=${icon}></ha-icon>
        <span>${title}</span>
      </div>
    `;
    }
    _renderFooter(entity) {
        const lastUpdate = entity?.attributes?.last_update;
        if (!lastUpdate)
            return b `${A}`;
        const time = new Date(lastUpdate).toLocaleTimeString("sv-SE", {
            hour: "2-digit",
            minute: "2-digit",
        });
        const loc = getLocale(this.hass.language);
        return b `
      <div class="card-footer">${loc.state.updated(time)}</div>
    `;
    }
    getCardSize() {
        const n = this._config?.departures_to_show ?? 5;
        return Math.ceil(n / 2) + 1;
    }
};
TrafiklabDeparturesCard.styles = [
    BASE_STYLES,
    i$5 `
      :host {
        display: block;
      }
      ha-card {
        --card-background-color: var(--ha-card-background, var(--card-background-color, white));
      }
    `,
];
__decorate([
    n$1({ attribute: false })
], TrafiklabDeparturesCard.prototype, "hass", void 0);
__decorate([
    r()
], TrafiklabDeparturesCard.prototype, "_config", void 0);
__decorate([
    r()
], TrafiklabDeparturesCard.prototype, "_rows", void 0);
TrafiklabDeparturesCard = __decorate([
    t$1(CARD_NAME)
], TrafiklabDeparturesCard);
