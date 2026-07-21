(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=e(i);fetch(i.href,s)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Aa="165",Hu=0,Ja=1,Gu=2,Uh=1,Wu=2,Tn=3,Pn=0,Le=1,ln=2,qn=0,Gi=1,Or=2,Qa=3,tc=4,Xu=5,pi=100,qu=101,ju=102,Yu=103,Ku=104,Zu=200,$u=201,Ju=202,Qu=203,ca=204,la=205,td=206,ed=207,nd=208,id=209,sd=210,rd=211,od=212,ad=213,cd=214,ld=0,hd=1,ud=2,kr=3,dd=4,fd=5,pd=6,md=7,Ta=0,gd=1,_d=2,jn=0,xd=1,vd=2,yd=3,Nh=4,Md=5,Sd=6,bd=7,ec="attached",Ed="detached",zh=300,ji=301,Yi=302,ha=303,ua=304,to=306,Ki=1e3,Wn=1001,Br=1002,Pe=1003,Fh=1004,ws=1005,ze=1006,Ur=1007,Rn=1008,Kn=1009,Ad=1010,Td=1011,Vr=1012,Oh=1013,Zi=1014,un=1015,eo=1016,kh=1017,Bh=1018,$i=1020,wd=35902,Rd=1021,Cd=1022,Ze=1023,Pd=1024,Ld=1025,Wi=1026,Ji=1027,Vh=1028,Hh=1029,Id=1030,Gh=1031,Wh=1033,uo=33776,fo=33777,po=33778,mo=33779,nc=35840,ic=35841,sc=35842,rc=35843,oc=36196,ac=37492,cc=37496,lc=37808,hc=37809,uc=37810,dc=37811,fc=37812,pc=37813,mc=37814,gc=37815,_c=37816,xc=37817,vc=37818,yc=37819,Mc=37820,Sc=37821,go=36492,bc=36494,Ec=36495,Dd=36283,Ac=36284,Tc=36285,wc=36286,Ns=2300,zs=2301,_o=2302,Rc=2400,Cc=2401,Pc=2402,Ud=2500,Nd=0,Xh=1,da=2,zd=3200,Fd=3201,wa=0,Od=1,Gn="",ve="srgb",Me="srgb-linear",Ra="display-p3",no="display-p3-linear",Hr="linear",ne="srgb",Gr="rec709",Wr="p3",xi=7680,Lc=519,kd=512,Bd=513,Vd=514,qh=515,Hd=516,Gd=517,Wd=518,Xd=519,fa=35044,Ic="300 es",Cn=2e3,Xr=2001;class ss{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,t);t.target=null}}}const Se=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Dc=1234567;const Ls=Math.PI/180,Qi=180/Math.PI;function Je(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Se[r&255]+Se[r>>8&255]+Se[r>>16&255]+Se[r>>24&255]+"-"+Se[t&255]+Se[t>>8&255]+"-"+Se[t>>16&15|64]+Se[t>>24&255]+"-"+Se[e&63|128]+Se[e>>8&255]+"-"+Se[e>>16&255]+Se[e>>24&255]+Se[n&255]+Se[n>>8&255]+Se[n>>16&255]+Se[n>>24&255]).toLowerCase()}function Te(r,t,e){return Math.max(t,Math.min(e,r))}function Ca(r,t){return(r%t+t)%t}function qd(r,t,e,n,i){return n+(r-t)*(i-n)/(e-t)}function jd(r,t,e){return r!==t?(e-r)/(t-r):0}function Is(r,t,e){return(1-e)*r+e*t}function Yd(r,t,e,n){return Is(r,t,1-Math.exp(-e*n))}function Kd(r,t=1){return t-Math.abs(Ca(r,t*2)-t)}function Zd(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*(3-2*r))}function $d(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*r*(r*(r*6-15)+10))}function Jd(r,t){return r+Math.floor(Math.random()*(t-r+1))}function Qd(r,t){return r+Math.random()*(t-r)}function tf(r){return r*(.5-Math.random())}function ef(r){r!==void 0&&(Dc=r);let t=Dc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function nf(r){return r*Ls}function sf(r){return r*Qi}function rf(r){return(r&r-1)===0&&r!==0}function of(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function af(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function cf(r,t,e,n,i){const s=Math.cos,o=Math.sin,a=s(e/2),c=o(e/2),l=s((t+n)/2),h=o((t+n)/2),u=s((t-n)/2),d=o((t-n)/2),f=s((n-t)/2),m=o((n-t)/2);switch(i){case"XYX":r.set(a*h,c*u,c*d,a*l);break;case"YZY":r.set(c*d,a*h,c*u,a*l);break;case"ZXZ":r.set(c*u,c*d,a*h,a*l);break;case"XZX":r.set(a*h,c*m,c*f,a*l);break;case"YXY":r.set(c*f,a*h,c*m,a*l);break;case"ZYZ":r.set(c*m,c*f,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Ke(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Kt(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const lf={DEG2RAD:Ls,RAD2DEG:Qi,generateUUID:Je,clamp:Te,euclideanModulo:Ca,mapLinear:qd,inverseLerp:jd,lerp:Is,damp:Yd,pingpong:Kd,smoothstep:Zd,smootherstep:$d,randInt:Jd,randFloat:Qd,randFloatSpread:tf,seededRandom:ef,degToRad:nf,radToDeg:sf,isPowerOfTwo:rf,ceilPowerOfTwo:of,floorPowerOfTwo:af,setQuaternionFromProperEuler:cf,normalize:Kt,denormalize:Ke};class Nt{constructor(t=0,e=0){Nt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Te(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*n-o*i+t.x,this.y=s*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ut{constructor(t,e,n,i,s,o,a,c,l){Ut.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,c,l)}set(t,e,n,i,s,o,a,c,l){const h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=s,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],m=n[8],_=i[0],p=i[3],g=i[6],v=i[1],x=i[4],S=i[7],P=i[2],T=i[5],w=i[8];return s[0]=o*_+a*v+c*P,s[3]=o*p+a*x+c*T,s[6]=o*g+a*S+c*w,s[1]=l*_+h*v+u*P,s[4]=l*p+h*x+u*T,s[7]=l*g+h*S+u*w,s[2]=d*_+f*v+m*P,s[5]=d*p+f*x+m*T,s[8]=d*g+f*S+m*w,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*s*h+n*a*c+i*s*l-i*o*c}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*o-a*l,d=a*c-h*s,f=l*s-o*c,m=e*u+n*d+i*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/m;return t[0]=u*_,t[1]=(i*l-h*n)*_,t[2]=(a*n-i*o)*_,t[3]=d*_,t[4]=(h*e-i*c)*_,t[5]=(i*s-a*e)*_,t[6]=f*_,t[7]=(n*c-l*e)*_,t[8]=(o*e-n*s)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,o,a){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-i*l,i*c,-i*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(xo.makeScale(t,e)),this}rotate(t){return this.premultiply(xo.makeRotation(-t)),this}translate(t,e){return this.premultiply(xo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const xo=new Ut;function jh(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function Fs(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function hf(){const r=Fs("canvas");return r.style.display="block",r}const Uc={};function Pa(r){r in Uc||(Uc[r]=!0,console.warn(r))}function uf(r,t,e){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}const Nc=new Ut().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),zc=new Ut().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),js={[Me]:{transfer:Hr,primaries:Gr,toReference:r=>r,fromReference:r=>r},[ve]:{transfer:ne,primaries:Gr,toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[no]:{transfer:Hr,primaries:Wr,toReference:r=>r.applyMatrix3(zc),fromReference:r=>r.applyMatrix3(Nc)},[Ra]:{transfer:ne,primaries:Wr,toReference:r=>r.convertSRGBToLinear().applyMatrix3(zc),fromReference:r=>r.applyMatrix3(Nc).convertLinearToSRGB()}},df=new Set([Me,no]),qt={enabled:!0,_workingColorSpace:Me,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!df.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,t,e){if(this.enabled===!1||t===e||!t||!e)return r;const n=js[t].toReference,i=js[e].fromReference;return i(n(r))},fromWorkingColorSpace:function(r,t){return this.convert(r,this._workingColorSpace,t)},toWorkingColorSpace:function(r,t){return this.convert(r,t,this._workingColorSpace)},getPrimaries:function(r){return js[r].primaries},getTransfer:function(r){return r===Gn?Hr:js[r].transfer}};function Xi(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function vo(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let vi;class ff{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{vi===void 0&&(vi=Fs("canvas")),vi.width=t.width,vi.height=t.height;const n=vi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=vi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Fs("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=Xi(s[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Xi(e[n]/255)*255):e[n]=Xi(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let pf=0;class Yh{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:pf++}),this.uuid=Je(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(yo(i[o].image)):s.push(yo(i[o]))}else s=yo(i);n.url=s}return e||(t.images[this.uuid]=n),n}}function yo(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?ff.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let mf=0;class fe extends ss{constructor(t=fe.DEFAULT_IMAGE,e=fe.DEFAULT_MAPPING,n=Wn,i=Wn,s=ze,o=Rn,a=Ze,c=Kn,l=fe.DEFAULT_ANISOTROPY,h=Gn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:mf++}),this.uuid=Je(),this.name="",this.source=new Yh(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Nt(0,0),this.repeat=new Nt(1,1),this.center=new Nt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ut,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==zh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ki:t.x=t.x-Math.floor(t.x);break;case Wn:t.x=t.x<0?0:1;break;case Br:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ki:t.y=t.y-Math.floor(t.y);break;case Wn:t.y=t.y<0?0:1;break;case Br:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}fe.DEFAULT_IMAGE=null;fe.DEFAULT_MAPPING=zh;fe.DEFAULT_ANISOTROPY=1;class te{constructor(t=0,e=0,n=0,i=1){te.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*s,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s;const c=t.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],m=c[9],_=c[2],p=c[6],g=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(m-p)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(m+p)<.1&&Math.abs(l+f+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const x=(l+1)/2,S=(f+1)/2,P=(g+1)/2,T=(h+d)/4,w=(u+_)/4,D=(m+p)/4;return x>S&&x>P?x<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(x),i=T/n,s=w/n):S>P?S<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(S),n=T/i,s=D/i):P<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(P),n=w/s,i=D/s),this.set(n,i,s,e),this}let v=Math.sqrt((p-m)*(p-m)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(v)<.001&&(v=1),this.x=(p-m)/v,this.y=(u-_)/v,this.z=(d-h)/v,this.w=Math.acos((l+f+g-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class gf extends ss{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new te(0,0,t,e),this.scissorTest=!1,this.viewport=new te(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ze,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new fe(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Yh(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class _i extends gf{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Kh extends fe{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Pe,this.minFilter=Pe,this.wrapR=Wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class _f extends fe{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Pe,this.minFilter=Pe,this.wrapR=Wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Oe{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,o,a){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3];const d=s[o+0],f=s[o+1],m=s[o+2],_=s[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=m,t[e+3]=_;return}if(u!==_||c!==d||l!==f||h!==m){let p=1-a;const g=c*d+l*f+h*m+u*_,v=g>=0?1:-1,x=1-g*g;if(x>Number.EPSILON){const P=Math.sqrt(x),T=Math.atan2(P,g*v);p=Math.sin(p*T)/P,a=Math.sin(a*T)/P}const S=a*v;if(c=c*p+d*S,l=l*p+f*S,h=h*p+m*S,u=u*p+_*S,p===1-a){const P=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=P,l*=P,h*=P,u*=P}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,s,o){const a=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=s[o],d=s[o+1],f=s[o+2],m=s[o+3];return t[e]=a*m+h*u+c*f-l*d,t[e+1]=c*m+h*d+l*u-a*f,t[e+2]=l*m+h*f+a*d-c*u,t[e+3]=h*m-a*u-c*d-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,s=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(i/2),u=a(s/2),d=c(n/2),f=c(i/2),m=c(s/2);switch(o){case"XYZ":this._x=d*h*u+l*f*m,this._y=l*f*u-d*h*m,this._z=l*h*m+d*f*u,this._w=l*h*u-d*f*m;break;case"YXZ":this._x=d*h*u+l*f*m,this._y=l*f*u-d*h*m,this._z=l*h*m-d*f*u,this._w=l*h*u+d*f*m;break;case"ZXY":this._x=d*h*u-l*f*m,this._y=l*f*u+d*h*m,this._z=l*h*m+d*f*u,this._w=l*h*u-d*f*m;break;case"ZYX":this._x=d*h*u-l*f*m,this._y=l*f*u+d*h*m,this._z=l*h*m-d*f*u,this._w=l*h*u+d*f*m;break;case"YZX":this._x=d*h*u+l*f*m,this._y=l*f*u+d*h*m,this._z=l*h*m-d*f*u,this._w=l*h*u-d*f*m;break;case"XZY":this._x=d*h*u-l*f*m,this._y=l*f*u-d*h*m,this._z=l*h*m+d*f*u,this._w=l*h*u+d*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],s=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(s-l)*f,this._z=(o-i)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-c)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(s+l)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(s-l)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-i)/f,this._x=(s+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Te(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,s=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+i*l-s*c,this._y=i*h+o*c+s*a-n*l,this._z=s*h+o*l+n*c-i*a,this._w=o*h-n*a-i*c-s*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*t._w+n*t._x+i*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const c=1-a*a;if(c<=Number.EPSILON){const f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*s+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,d=Math.sin(e*h)/l;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class A{constructor(t=0,e=0,n=0){A.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Fc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Fc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=t.elements,o=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,s=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*i-a*n),h=2*(a*e-s*i),u=2*(s*n-o*e);return this.x=e+c*l+o*u-a*h,this.y=n+c*h+a*l-s*u,this.z=i+c*u+s*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,s=t.z,o=e.x,a=e.y,c=e.z;return this.x=i*c-s*a,this.y=s*o-n*c,this.z=n*a-i*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Mo.copy(this).projectOnVector(t),this.sub(Mo)}reflect(t){return this.sub(Mo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Te(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Mo=new A,Fc=new Oe;class en{constructor(t=new A(1/0,1/0,1/0),e=new A(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Xe.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Xe.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Xe.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Xe):Xe.fromBufferAttribute(s,o),Xe.applyMatrix4(t.matrixWorld),this.expandByPoint(Xe);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ys.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ys.copy(n.boundingBox)),Ys.applyMatrix4(t.matrixWorld),this.union(Ys)}const i=t.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,Xe),Xe.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ls),Ks.subVectors(this.max,ls),yi.subVectors(t.a,ls),Mi.subVectors(t.b,ls),Si.subVectors(t.c,ls),In.subVectors(Mi,yi),Dn.subVectors(Si,Mi),Qn.subVectors(yi,Si);let e=[0,-In.z,In.y,0,-Dn.z,Dn.y,0,-Qn.z,Qn.y,In.z,0,-In.x,Dn.z,0,-Dn.x,Qn.z,0,-Qn.x,-In.y,In.x,0,-Dn.y,Dn.x,0,-Qn.y,Qn.x,0];return!So(e,yi,Mi,Si,Ks)||(e=[1,0,0,0,1,0,0,0,1],!So(e,yi,Mi,Si,Ks))?!1:(Zs.crossVectors(In,Dn),e=[Zs.x,Zs.y,Zs.z],So(e,yi,Mi,Si,Ks))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Xe).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Xe).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(gn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),gn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),gn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),gn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),gn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),gn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),gn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),gn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(gn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const gn=[new A,new A,new A,new A,new A,new A,new A,new A],Xe=new A,Ys=new en,yi=new A,Mi=new A,Si=new A,In=new A,Dn=new A,Qn=new A,ls=new A,Ks=new A,Zs=new A,ti=new A;function So(r,t,e,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){ti.fromArray(r,s);const a=i.x*Math.abs(ti.x)+i.y*Math.abs(ti.y)+i.z*Math.abs(ti.z),c=t.dot(ti),l=e.dot(ti),h=n.dot(ti);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const xf=new en,hs=new A,bo=new A;class nn{constructor(t=new A,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):xf.setFromPoints(t).getCenter(n);let i=0;for(let s=0,o=t.length;s<o;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;hs.subVectors(t,this.center);const e=hs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(hs,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(bo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(hs.copy(t.center).add(bo)),this.expandByPoint(hs.copy(t.center).sub(bo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const _n=new A,Eo=new A,$s=new A,Un=new A,Ao=new A,Js=new A,To=new A;class ks{constructor(t=new A,e=new A(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,_n)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=_n.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(_n.copy(this.origin).addScaledVector(this.direction,e),_n.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Eo.copy(t).add(e).multiplyScalar(.5),$s.copy(e).sub(t).normalize(),Un.copy(this.origin).sub(Eo);const s=t.distanceTo(e)*.5,o=-this.direction.dot($s),a=Un.dot(this.direction),c=-Un.dot($s),l=Un.lengthSq(),h=Math.abs(1-o*o);let u,d,f,m;if(h>0)if(u=o*c-a,d=o*a-c,m=s*h,u>=0)if(d>=-m)if(d<=m){const _=1/h;u*=_,d*=_,f=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d=-s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d<=-m?(u=Math.max(0,-(-o*s+a)),d=u>0?-s:Math.min(Math.max(-s,-c),s),f=-u*u+d*(d+2*c)+l):d<=m?(u=0,d=Math.min(Math.max(-s,-c),s),f=d*(d+2*c)+l):(u=Math.max(0,-(o*s+a)),d=u>0?s:Math.min(Math.max(-s,-c),s),f=-u*u+d*(d+2*c)+l);else d=o>0?-s:s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Eo).addScaledVector($s,d),f}intersectSphere(t,e){_n.subVectors(t.center,this.origin);const n=_n.dot(this.direction),i=_n.dot(_n)-n*n,s=t.radius*t.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(t.min.x-d.x)*l,i=(t.max.x-d.x)*l):(n=(t.max.x-d.x)*l,i=(t.min.x-d.x)*l),h>=0?(s=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(s=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),u>=0?(a=(t.min.z-d.z)*u,c=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,c=(t.min.z-d.z)*u),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,_n)!==null}intersectTriangle(t,e,n,i,s){Ao.subVectors(e,t),Js.subVectors(n,t),To.crossVectors(Ao,Js);let o=this.direction.dot(To),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Un.subVectors(this.origin,t);const c=a*this.direction.dot(Js.crossVectors(Un,Js));if(c<0)return null;const l=a*this.direction.dot(Ao.cross(Un));if(l<0||c+l>o)return null;const h=-a*Un.dot(To);return h<0?null:this.at(h/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Et{constructor(t,e,n,i,s,o,a,c,l,h,u,d,f,m,_,p){Et.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,c,l,h,u,d,f,m,_,p)}set(t,e,n,i,s,o,a,c,l,h,u,d,f,m,_,p){const g=this.elements;return g[0]=t,g[4]=e,g[8]=n,g[12]=i,g[1]=s,g[5]=o,g[9]=a,g[13]=c,g[2]=l,g[6]=h,g[10]=u,g[14]=d,g[3]=f,g[7]=m,g[11]=_,g[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Et().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/bi.setFromMatrixColumn(t,0).length(),s=1/bi.setFromMatrixColumn(t,1).length(),o=1/bi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,s=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(t.order==="XYZ"){const d=o*h,f=o*u,m=a*h,_=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=f+m*l,e[5]=d-_*l,e[9]=-a*c,e[2]=_-d*l,e[6]=m+f*l,e[10]=o*c}else if(t.order==="YXZ"){const d=c*h,f=c*u,m=l*h,_=l*u;e[0]=d+_*a,e[4]=m*a-f,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=f*a-m,e[6]=_+d*a,e[10]=o*c}else if(t.order==="ZXY"){const d=c*h,f=c*u,m=l*h,_=l*u;e[0]=d-_*a,e[4]=-o*u,e[8]=m+f*a,e[1]=f+m*a,e[5]=o*h,e[9]=_-d*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const d=o*h,f=o*u,m=a*h,_=a*u;e[0]=c*h,e[4]=m*l-f,e[8]=d*l+_,e[1]=c*u,e[5]=_*l+d,e[9]=f*l-m,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const d=o*c,f=o*l,m=a*c,_=a*l;e[0]=c*h,e[4]=_-d*u,e[8]=m*u+f,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=f*u+m,e[10]=d-_*u}else if(t.order==="XZY"){const d=o*c,f=o*l,m=a*c,_=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=d*u+_,e[5]=o*h,e[9]=f*u-m,e[2]=m*u-f,e[6]=a*h,e[10]=_*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(vf,t,yf)}lookAt(t,e,n){const i=this.elements;return Ue.subVectors(t,e),Ue.lengthSq()===0&&(Ue.z=1),Ue.normalize(),Nn.crossVectors(n,Ue),Nn.lengthSq()===0&&(Math.abs(n.z)===1?Ue.x+=1e-4:Ue.z+=1e-4,Ue.normalize(),Nn.crossVectors(n,Ue)),Nn.normalize(),Qs.crossVectors(Ue,Nn),i[0]=Nn.x,i[4]=Qs.x,i[8]=Ue.x,i[1]=Nn.y,i[5]=Qs.y,i[9]=Ue.y,i[2]=Nn.z,i[6]=Qs.z,i[10]=Ue.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],m=n[2],_=n[6],p=n[10],g=n[14],v=n[3],x=n[7],S=n[11],P=n[15],T=i[0],w=i[4],D=i[8],E=i[12],y=i[1],C=i[5],z=i[9],N=i[13],O=i[2],G=i[6],X=i[10],K=i[14],q=i[3],ct=i[7],dt=i[11],nt=i[15];return s[0]=o*T+a*y+c*O+l*q,s[4]=o*w+a*C+c*G+l*ct,s[8]=o*D+a*z+c*X+l*dt,s[12]=o*E+a*N+c*K+l*nt,s[1]=h*T+u*y+d*O+f*q,s[5]=h*w+u*C+d*G+f*ct,s[9]=h*D+u*z+d*X+f*dt,s[13]=h*E+u*N+d*K+f*nt,s[2]=m*T+_*y+p*O+g*q,s[6]=m*w+_*C+p*G+g*ct,s[10]=m*D+_*z+p*X+g*dt,s[14]=m*E+_*N+p*K+g*nt,s[3]=v*T+x*y+S*O+P*q,s[7]=v*w+x*C+S*G+P*ct,s[11]=v*D+x*z+S*X+P*dt,s[15]=v*E+x*N+S*K+P*nt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],d=t[10],f=t[14],m=t[3],_=t[7],p=t[11],g=t[15];return m*(+s*c*u-i*l*u-s*a*d+n*l*d+i*a*f-n*c*f)+_*(+e*c*f-e*l*d+s*o*d-i*o*f+i*l*h-s*c*h)+p*(+e*l*u-e*a*f-s*o*u+n*o*f+s*a*h-n*l*h)+g*(-i*a*h-e*c*u+e*a*d+i*o*u-n*o*d+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],d=t[10],f=t[11],m=t[12],_=t[13],p=t[14],g=t[15],v=u*p*l-_*d*l+_*c*f-a*p*f-u*c*g+a*d*g,x=m*d*l-h*p*l-m*c*f+o*p*f+h*c*g-o*d*g,S=h*_*l-m*u*l+m*a*f-o*_*f-h*a*g+o*u*g,P=m*u*c-h*_*c-m*a*d+o*_*d+h*a*p-o*u*p,T=e*v+n*x+i*S+s*P;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/T;return t[0]=v*w,t[1]=(_*d*s-u*p*s-_*i*f+n*p*f+u*i*g-n*d*g)*w,t[2]=(a*p*s-_*c*s+_*i*l-n*p*l-a*i*g+n*c*g)*w,t[3]=(u*c*s-a*d*s-u*i*l+n*d*l+a*i*f-n*c*f)*w,t[4]=x*w,t[5]=(h*p*s-m*d*s+m*i*f-e*p*f-h*i*g+e*d*g)*w,t[6]=(m*c*s-o*p*s-m*i*l+e*p*l+o*i*g-e*c*g)*w,t[7]=(o*d*s-h*c*s+h*i*l-e*d*l-o*i*f+e*c*f)*w,t[8]=S*w,t[9]=(m*u*s-h*_*s-m*n*f+e*_*f+h*n*g-e*u*g)*w,t[10]=(o*_*s-m*a*s+m*n*l-e*_*l-o*n*g+e*a*g)*w,t[11]=(h*a*s-o*u*s-h*n*l+e*u*l+o*n*f-e*a*f)*w,t[12]=P*w,t[13]=(h*_*i-m*u*i+m*n*d-e*_*d-h*n*p+e*u*p)*w,t[14]=(m*a*i-o*_*i-m*n*c+e*_*c+o*n*p-e*a*p)*w,t[15]=(o*u*i-h*a*i+h*n*c-e*u*c-o*n*d+e*a*d)*w,this}scale(t){const e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),s=1-n,o=t.x,a=t.y,c=t.z,l=s*o,h=s*a;return this.set(l*o+n,l*a-i*c,l*c+i*a,0,l*a+i*c,h*a+n,h*c-i*o,0,l*c-i*a,h*c+i*o,s*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,o){return this.set(1,n,s,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,s=e._x,o=e._y,a=e._z,c=e._w,l=s+s,h=o+o,u=a+a,d=s*l,f=s*h,m=s*u,_=o*h,p=o*u,g=a*u,v=c*l,x=c*h,S=c*u,P=n.x,T=n.y,w=n.z;return i[0]=(1-(_+g))*P,i[1]=(f+S)*P,i[2]=(m-x)*P,i[3]=0,i[4]=(f-S)*T,i[5]=(1-(d+g))*T,i[6]=(p+v)*T,i[7]=0,i[8]=(m+x)*w,i[9]=(p-v)*w,i[10]=(1-(d+_))*w,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let s=bi.set(i[0],i[1],i[2]).length();const o=bi.set(i[4],i[5],i[6]).length(),a=bi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),t.x=i[12],t.y=i[13],t.z=i[14],qe.copy(this);const l=1/s,h=1/o,u=1/a;return qe.elements[0]*=l,qe.elements[1]*=l,qe.elements[2]*=l,qe.elements[4]*=h,qe.elements[5]*=h,qe.elements[6]*=h,qe.elements[8]*=u,qe.elements[9]*=u,qe.elements[10]*=u,e.setFromRotationMatrix(qe),n.x=s,n.y=o,n.z=a,this}makePerspective(t,e,n,i,s,o,a=Cn){const c=this.elements,l=2*s/(e-t),h=2*s/(n-i),u=(e+t)/(e-t),d=(n+i)/(n-i);let f,m;if(a===Cn)f=-(o+s)/(o-s),m=-2*o*s/(o-s);else if(a===Xr)f=-o/(o-s),m=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,s,o,a=Cn){const c=this.elements,l=1/(e-t),h=1/(n-i),u=1/(o-s),d=(e+t)*l,f=(n+i)*h;let m,_;if(a===Cn)m=(o+s)*u,_=-2*u;else if(a===Xr)m=s*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=_,c[14]=-m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const bi=new A,qe=new Et,vf=new A(0,0,0),yf=new A(1,1,1),Nn=new A,Qs=new A,Ue=new A,Oc=new Et,kc=new Oe;class Fe{constructor(t=0,e=0,n=0,i=Fe.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,s=i[0],o=i[4],a=i[8],c=i[1],l=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(Te(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Te(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Te(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Te(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Te(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Te(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Oc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Oc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return kc.setFromEuler(this),this.setFromQuaternion(kc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Fe.DEFAULT_ORDER="XYZ";class La{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Mf=0;const Bc=new A,Ei=new Oe,xn=new Et,tr=new A,us=new A,Sf=new A,bf=new Oe,Vc=new A(1,0,0),Hc=new A(0,1,0),Gc=new A(0,0,1),Wc={type:"added"},Ef={type:"removed"},Ai={type:"childadded",child:null},wo={type:"childremoved",child:null};class se extends ss{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Mf++}),this.uuid=Je(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=se.DEFAULT_UP.clone();const t=new A,e=new Fe,n=new Oe,i=new A(1,1,1);function s(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Et},normalMatrix:{value:new Ut}}),this.matrix=new Et,this.matrixWorld=new Et,this.matrixAutoUpdate=se.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=se.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new La,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ei.setFromAxisAngle(t,e),this.quaternion.multiply(Ei),this}rotateOnWorldAxis(t,e){return Ei.setFromAxisAngle(t,e),this.quaternion.premultiply(Ei),this}rotateX(t){return this.rotateOnAxis(Vc,t)}rotateY(t){return this.rotateOnAxis(Hc,t)}rotateZ(t){return this.rotateOnAxis(Gc,t)}translateOnAxis(t,e){return Bc.copy(t).applyQuaternion(this.quaternion),this.position.add(Bc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Vc,t)}translateY(t){return this.translateOnAxis(Hc,t)}translateZ(t){return this.translateOnAxis(Gc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(xn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?tr.copy(t):tr.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),us.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xn.lookAt(us,tr,this.up):xn.lookAt(tr,us,this.up),this.quaternion.setFromRotationMatrix(xn),i&&(xn.extractRotation(i.matrixWorld),Ei.setFromRotationMatrix(xn),this.quaternion.premultiply(Ei.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Wc),Ai.child=t,this.dispatchEvent(Ai),Ai.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Ef),wo.child=t,this.dispatchEvent(wo),wo.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),xn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),xn.multiply(t.parent.matrixWorld)),t.applyMatrix4(xn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Wc),Ai.child=t,this.dispatchEvent(Ai),Ai.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(us,t,Sf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(us,bf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++){const s=e[n];(s.matrixWorldAutoUpdate===!0||t===!0)&&s.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++){const a=i[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];s(t.shapes,u)}else s(t.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(t.materials,this.material[c]));i.material=a}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];i.animations.push(s(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),f=o(t.animations),m=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=i,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}se.DEFAULT_UP=new A(0,1,0);se.DEFAULT_MATRIX_AUTO_UPDATE=!0;se.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const je=new A,vn=new A,Ro=new A,yn=new A,Ti=new A,wi=new A,Xc=new A,Co=new A,Po=new A,Lo=new A;class hn{constructor(t=new A,e=new A,n=new A){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),je.subVectors(t,e),i.cross(je);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){je.subVectors(i,e),vn.subVectors(n,e),Ro.subVectors(t,e);const o=je.dot(je),a=je.dot(vn),c=je.dot(Ro),l=vn.dot(vn),h=vn.dot(Ro),u=o*l-a*a;if(u===0)return s.set(0,0,0),null;const d=1/u,f=(l*c-a*h)*d,m=(o*h-a*c)*d;return s.set(1-f-m,m,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,yn)===null?!1:yn.x>=0&&yn.y>=0&&yn.x+yn.y<=1}static getInterpolation(t,e,n,i,s,o,a,c){return this.getBarycoord(t,e,n,i,yn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,yn.x),c.addScaledVector(o,yn.y),c.addScaledVector(a,yn.z),c)}static isFrontFacing(t,e,n,i){return je.subVectors(n,e),vn.subVectors(t,e),je.cross(vn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return je.subVectors(this.c,this.b),vn.subVectors(this.a,this.b),je.cross(vn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return hn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return hn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,s){return hn.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return hn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return hn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,s=this.c;let o,a;Ti.subVectors(i,n),wi.subVectors(s,n),Co.subVectors(t,n);const c=Ti.dot(Co),l=wi.dot(Co);if(c<=0&&l<=0)return e.copy(n);Po.subVectors(t,i);const h=Ti.dot(Po),u=wi.dot(Po);if(h>=0&&u<=h)return e.copy(i);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(Ti,o);Lo.subVectors(t,s);const f=Ti.dot(Lo),m=wi.dot(Lo);if(m>=0&&f<=m)return e.copy(s);const _=f*l-c*m;if(_<=0&&l>=0&&m<=0)return a=l/(l-m),e.copy(n).addScaledVector(wi,a);const p=h*m-f*u;if(p<=0&&u-h>=0&&f-m>=0)return Xc.subVectors(s,i),a=(u-h)/(u-h+(f-m)),e.copy(i).addScaledVector(Xc,a);const g=1/(p+_+d);return o=_*g,a=d*g,e.copy(n).addScaledVector(Ti,o).addScaledVector(wi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Zh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},zn={h:0,s:0,l:0},er={h:0,s:0,l:0};function Io(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}class Mt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ve){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,qt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=qt.workingColorSpace){return this.r=t,this.g=e,this.b=n,qt.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=qt.workingColorSpace){if(t=Ca(t,1),e=Te(e,0,1),n=Te(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,o=2*n-s;this.r=Io(o,s,t+1/3),this.g=Io(o,s,t),this.b=Io(o,s,t-1/3)}return qt.toWorkingColorSpace(this,i),this}setStyle(t,e=ve){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ve){const n=Zh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Xi(t.r),this.g=Xi(t.g),this.b=Xi(t.b),this}copyLinearToSRGB(t){return this.r=vo(t.r),this.g=vo(t.g),this.b=vo(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ve){return qt.fromWorkingColorSpace(be.copy(this),t),Math.round(Te(be.r*255,0,255))*65536+Math.round(Te(be.g*255,0,255))*256+Math.round(Te(be.b*255,0,255))}getHexString(t=ve){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=qt.workingColorSpace){qt.fromWorkingColorSpace(be.copy(this),e);const n=be.r,i=be.g,s=be.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(i-s)/u+(i<s?6:0);break;case i:c=(s-n)/u+2;break;case s:c=(n-i)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=qt.workingColorSpace){return qt.fromWorkingColorSpace(be.copy(this),e),t.r=be.r,t.g=be.g,t.b=be.b,t}getStyle(t=ve){qt.fromWorkingColorSpace(be.copy(this),t);const e=be.r,n=be.g,i=be.b;return t!==ve?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(zn),this.setHSL(zn.h+t,zn.s+e,zn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(zn),t.getHSL(er);const n=Is(zn.h,er.h,e),i=Is(zn.s,er.s,e),s=Is(zn.l,er.l,e);return this.setHSL(n,i,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*i,this.g=s[1]*e+s[4]*n+s[7]*i,this.b=s[2]*e+s[5]*n+s[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const be=new Mt;Mt.NAMES=Zh;let Af=0;class Qe extends ss{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Af++}),this.uuid=Je(),this.name="",this.type="Material",this.blending=Gi,this.side=Pn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ca,this.blendDst=la,this.blendEquation=pi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Mt(0,0,0),this.blendAlpha=0,this.depthFunc=kr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Lc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=xi,this.stencilZFail=xi,this.stencilZPass=xi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Gi&&(n.blending=this.blending),this.side!==Pn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ca&&(n.blendSrc=this.blendSrc),this.blendDst!==la&&(n.blendDst=this.blendDst),this.blendEquation!==pi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==kr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Lc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==xi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==xi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==xi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const c=s[a];delete c.metadata,o.push(c)}return o}if(e){const s=i(t.textures),o=i(t.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class ue extends Qe{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Mt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fe,this.combine=Ta,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const le=new A,nr=new Nt;class de{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=fa,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=un,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return Pa("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)nr.fromBufferAttribute(this,e),nr.applyMatrix3(t),this.setXY(e,nr.x,nr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)le.fromBufferAttribute(this,e),le.applyMatrix3(t),this.setXYZ(e,le.x,le.y,le.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)le.fromBufferAttribute(this,e),le.applyMatrix4(t),this.setXYZ(e,le.x,le.y,le.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)le.fromBufferAttribute(this,e),le.applyNormalMatrix(t),this.setXYZ(e,le.x,le.y,le.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)le.fromBufferAttribute(this,e),le.transformDirection(t),this.setXYZ(e,le.x,le.y,le.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Ke(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Kt(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ke(e,this.array)),e}setX(t,e){return this.normalized&&(e=Kt(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ke(e,this.array)),e}setY(t,e){return this.normalized&&(e=Kt(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ke(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Kt(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ke(e,this.array)),e}setW(t,e){return this.normalized&&(e=Kt(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Kt(e,this.array),n=Kt(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=Kt(e,this.array),n=Kt(n,this.array),i=Kt(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=Kt(e,this.array),n=Kt(n,this.array),i=Kt(i,this.array),s=Kt(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==fa&&(t.usage=this.usage),t}}class $h extends de{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Jh extends de{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Ie extends de{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Tf=0;const Ve=new Et,Do=new se,Ri=new A,Ne=new en,ds=new en,xe=new A;class ke extends ss{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Tf++}),this.uuid=Je(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(jh(t)?Jh:$h)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ut().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ve.makeRotationFromQuaternion(t),this.applyMatrix4(Ve),this}rotateX(t){return Ve.makeRotationX(t),this.applyMatrix4(Ve),this}rotateY(t){return Ve.makeRotationY(t),this.applyMatrix4(Ve),this}rotateZ(t){return Ve.makeRotationZ(t),this.applyMatrix4(Ve),this}translate(t,e,n){return Ve.makeTranslation(t,e,n),this.applyMatrix4(Ve),this}scale(t,e,n){return Ve.makeScale(t,e,n),this.applyMatrix4(Ve),this}lookAt(t){return Do.lookAt(t),Do.updateMatrix(),this.applyMatrix4(Do.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ri).negate(),this.translate(Ri.x,Ri.y,Ri.z),this}setFromPoints(t){const e=[];for(let n=0,i=t.length;n<i;n++){const s=t[n];e.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Ie(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new en);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new A(-1/0,-1/0,-1/0),new A(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const s=e[n];Ne.setFromBufferAttribute(s),this.morphTargetsRelative?(xe.addVectors(this.boundingBox.min,Ne.min),this.boundingBox.expandByPoint(xe),xe.addVectors(this.boundingBox.max,Ne.max),this.boundingBox.expandByPoint(xe)):(this.boundingBox.expandByPoint(Ne.min),this.boundingBox.expandByPoint(Ne.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new nn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new A,1/0);return}if(t){const n=this.boundingSphere.center;if(Ne.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];ds.setFromBufferAttribute(a),this.morphTargetsRelative?(xe.addVectors(Ne.min,ds.min),Ne.expandByPoint(xe),xe.addVectors(Ne.max,ds.max),Ne.expandByPoint(xe)):(Ne.expandByPoint(ds.min),Ne.expandByPoint(ds.max))}Ne.getCenter(n);let i=0;for(let s=0,o=t.count;s<o;s++)xe.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(xe));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)xe.fromBufferAttribute(a,l),c&&(Ri.fromBufferAttribute(t,l),xe.add(Ri)),i=Math.max(i,n.distanceToSquared(xe))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new de(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let D=0;D<n.count;D++)a[D]=new A,c[D]=new A;const l=new A,h=new A,u=new A,d=new Nt,f=new Nt,m=new Nt,_=new A,p=new A;function g(D,E,y){l.fromBufferAttribute(n,D),h.fromBufferAttribute(n,E),u.fromBufferAttribute(n,y),d.fromBufferAttribute(s,D),f.fromBufferAttribute(s,E),m.fromBufferAttribute(s,y),h.sub(l),u.sub(l),f.sub(d),m.sub(d);const C=1/(f.x*m.y-m.x*f.y);isFinite(C)&&(_.copy(h).multiplyScalar(m.y).addScaledVector(u,-f.y).multiplyScalar(C),p.copy(u).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(C),a[D].add(_),a[E].add(_),a[y].add(_),c[D].add(p),c[E].add(p),c[y].add(p))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let D=0,E=v.length;D<E;++D){const y=v[D],C=y.start,z=y.count;for(let N=C,O=C+z;N<O;N+=3)g(t.getX(N+0),t.getX(N+1),t.getX(N+2))}const x=new A,S=new A,P=new A,T=new A;function w(D){P.fromBufferAttribute(i,D),T.copy(P);const E=a[D];x.copy(E),x.sub(P.multiplyScalar(P.dot(E))).normalize(),S.crossVectors(T,E);const C=S.dot(c[D])<0?-1:1;o.setXYZW(D,x.x,x.y,x.z,C)}for(let D=0,E=v.length;D<E;++D){const y=v[D],C=y.start,z=y.count;for(let N=C,O=C+z;N<O;N+=3)w(t.getX(N+0)),w(t.getX(N+1)),w(t.getX(N+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new de(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new A,s=new A,o=new A,a=new A,c=new A,l=new A,h=new A,u=new A;if(t)for(let d=0,f=t.count;d<f;d+=3){const m=t.getX(d+0),_=t.getX(d+1),p=t.getX(d+2);i.fromBufferAttribute(e,m),s.fromBufferAttribute(e,_),o.fromBufferAttribute(e,p),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),a.fromBufferAttribute(n,m),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,p),a.add(h),c.add(h),l.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(p,l.x,l.y,l.z)}else for(let d=0,f=e.count;d<f;d+=3)i.fromBufferAttribute(e,d+0),s.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)xe.fromBufferAttribute(t,e),xe.normalize(),t.setXYZ(e,xe.x,xe.y,xe.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h);let f=0,m=0;for(let _=0,p=c.length;_<p;_++){a.isInterleavedBufferAttribute?f=c[_]*a.data.stride+a.offset:f=c[_]*h;for(let g=0;g<h;g++)d[m++]=l[f++]}return new de(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new ke,n=this.index.array,i=this.attributes;for(const a in i){const c=i[a],l=t(c,n);e.setAttribute(a,l)}const s=this.morphAttributes;for(const a in s){const c=[],l=s[a];for(let h=0,u=l.length;h<u;h++){const d=l[h],f=t(d,n);c.push(f)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const i={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const f=l[u];h.push(f.toJSON(t.data))}h.length>0&&(i[c]=h,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const l in i){const h=i[l];this.setAttribute(l,h.clone(e))}const s=t.morphAttributes;for(const l in s){const h=[],u=s[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const qc=new Et,ei=new ks,ir=new nn,jc=new A,Ci=new A,Pi=new A,Li=new A,Uo=new A,sr=new A,rr=new Nt,or=new Nt,ar=new Nt,Yc=new A,Kc=new A,Zc=new A,cr=new A,lr=new A;class It extends se{constructor(t=new ke,e=new ue){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(s&&a){sr.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const h=a[c],u=s[c];h!==0&&(Uo.fromBufferAttribute(u,t),o?sr.addScaledVector(Uo,h):sr.addScaledVector(Uo.sub(e),h))}e.add(sr)}return e}raycast(t,e){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ir.copy(n.boundingSphere),ir.applyMatrix4(s),ei.copy(t.ray).recast(t.near),!(ir.containsPoint(ei.origin)===!1&&(ei.intersectSphere(ir,jc)===null||ei.origin.distanceToSquared(jc)>(t.far-t.near)**2))&&(qc.copy(s).invert(),ei.copy(t.ray).applyMatrix4(qc),!(n.boundingBox!==null&&ei.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ei)))}_computeIntersections(t,e,n){let i;const s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,_=d.length;m<_;m++){const p=d[m],g=o[p.materialIndex],v=Math.max(p.start,f.start),x=Math.min(a.count,Math.min(p.start+p.count,f.start+f.count));for(let S=v,P=x;S<P;S+=3){const T=a.getX(S),w=a.getX(S+1),D=a.getX(S+2);i=hr(this,g,t,n,l,h,u,T,w,D),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{const m=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let p=m,g=_;p<g;p+=3){const v=a.getX(p),x=a.getX(p+1),S=a.getX(p+2);i=hr(this,o,t,n,l,h,u,v,x,S),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}else if(c!==void 0)if(Array.isArray(o))for(let m=0,_=d.length;m<_;m++){const p=d[m],g=o[p.materialIndex],v=Math.max(p.start,f.start),x=Math.min(c.count,Math.min(p.start+p.count,f.start+f.count));for(let S=v,P=x;S<P;S+=3){const T=S,w=S+1,D=S+2;i=hr(this,g,t,n,l,h,u,T,w,D),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{const m=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let p=m,g=_;p<g;p+=3){const v=p,x=p+1,S=p+2;i=hr(this,o,t,n,l,h,u,v,x,S),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}}}function wf(r,t,e,n,i,s,o,a){let c;if(t.side===Le?c=n.intersectTriangle(o,s,i,!0,a):c=n.intersectTriangle(i,s,o,t.side===Pn,a),c===null)return null;lr.copy(a),lr.applyMatrix4(r.matrixWorld);const l=e.ray.origin.distanceTo(lr);return l<e.near||l>e.far?null:{distance:l,point:lr.clone(),object:r}}function hr(r,t,e,n,i,s,o,a,c,l){r.getVertexPosition(a,Ci),r.getVertexPosition(c,Pi),r.getVertexPosition(l,Li);const h=wf(r,t,e,n,Ci,Pi,Li,cr);if(h){i&&(rr.fromBufferAttribute(i,a),or.fromBufferAttribute(i,c),ar.fromBufferAttribute(i,l),h.uv=hn.getInterpolation(cr,Ci,Pi,Li,rr,or,ar,new Nt)),s&&(rr.fromBufferAttribute(s,a),or.fromBufferAttribute(s,c),ar.fromBufferAttribute(s,l),h.uv1=hn.getInterpolation(cr,Ci,Pi,Li,rr,or,ar,new Nt)),o&&(Yc.fromBufferAttribute(o,a),Kc.fromBufferAttribute(o,c),Zc.fromBufferAttribute(o,l),h.normal=hn.getInterpolation(cr,Ci,Pi,Li,Yc,Kc,Zc,new A),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:c,c:l,normal:new A,materialIndex:0};hn.getNormal(Ci,Pi,Li,u.normal),h.face=u}return h}class dn extends ke{constructor(t=1,e=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const c=[],l=[],h=[],u=[];let d=0,f=0;m("z","y","x",-1,-1,n,e,t,o,s,0),m("z","y","x",1,-1,n,e,-t,o,s,1),m("x","z","y",1,1,t,n,e,i,o,2),m("x","z","y",1,-1,t,n,-e,i,o,3),m("x","y","z",1,-1,t,e,n,i,s,4),m("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(c),this.setAttribute("position",new Ie(l,3)),this.setAttribute("normal",new Ie(h,3)),this.setAttribute("uv",new Ie(u,2));function m(_,p,g,v,x,S,P,T,w,D,E){const y=S/w,C=P/D,z=S/2,N=P/2,O=T/2,G=w+1,X=D+1;let K=0,q=0;const ct=new A;for(let dt=0;dt<X;dt++){const nt=dt*C-N;for(let pt=0;pt<G;pt++){const Rt=pt*y-z;ct[_]=Rt*v,ct[p]=nt*x,ct[g]=O,l.push(ct.x,ct.y,ct.z),ct[_]=0,ct[p]=0,ct[g]=T>0?1:-1,h.push(ct.x,ct.y,ct.z),u.push(pt/w),u.push(1-dt/D),K+=1}}for(let dt=0;dt<D;dt++)for(let nt=0;nt<w;nt++){const pt=d+nt+G*dt,Rt=d+nt+G*(dt+1),H=d+(nt+1)+G*(dt+1),$=d+(nt+1)+G*dt;c.push(pt,Rt,$),c.push(Rt,H,$),q+=6}a.addGroup(f,q,E),f+=q,d+=K}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new dn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function ts(r){const t={};for(const e in r){t[e]={};for(const n in r[e]){const i=r[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Ce(r){const t={};for(let e=0;e<r.length;e++){const n=ts(r[e]);for(const i in n)t[i]=n[i]}return t}function Rf(r){const t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function Qh(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:qt.workingColorSpace}const Cf={clone:ts,merge:Ce};var Pf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Lf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Zn extends Qe{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Pf,this.fragmentShader=Lf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ts(t.uniforms),this.uniformsGroups=Rf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class tu extends se{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Et,this.projectionMatrix=new Et,this.projectionMatrixInverse=new Et,this.coordinateSystem=Cn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Fn=new A,$c=new Nt,Jc=new Nt;class ye extends tu{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Qi*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ls*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Qi*2*Math.atan(Math.tan(Ls*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Fn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Fn.x,Fn.y).multiplyScalar(-t/Fn.z),Fn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Fn.x,Fn.y).multiplyScalar(-t/Fn.z)}getViewSize(t,e){return this.getViewBounds(t,$c,Jc),e.subVectors(Jc,$c)}setViewOffset(t,e,n,i,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Ls*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*i/c,e-=o.offsetY*n/l,i*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ii=-90,Di=1;class If extends se{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new ye(Ii,Di,t,e);i.layers=this.layers,this.add(i);const s=new ye(Ii,Di,t,e);s.layers=this.layers,this.add(s);const o=new ye(Ii,Di,t,e);o.layers=this.layers,this.add(o);const a=new ye(Ii,Di,t,e);a.layers=this.layers,this.add(a);const c=new ye(Ii,Di,t,e);c.layers=this.layers,this.add(c);const l=new ye(Ii,Di,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,s,o,a,c]=e;for(const l of e)this.remove(l);if(t===Cn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Xr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,c,l,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,s),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,c),t.setRenderTarget(n,4,i),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class eu extends fe{constructor(t,e,n,i,s,o,a,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:ji,super(t,e,n,i,s,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Df extends _i{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new eu(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:ze}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new dn(5,5,5),s=new Zn({name:"CubemapFromEquirect",uniforms:ts(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Le,blending:qn});s.uniforms.tEquirect.value=e;const o=new It(i,s),a=e.minFilter;return e.minFilter===Rn&&(e.minFilter=ze),new If(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(s)}}const No=new A,Uf=new A,Nf=new Ut;class ci{constructor(t=new A(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=No.subVectors(n,e).cross(Uf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(No),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Nf.getNormalMatrix(t),i=this.coplanarPoint(No).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ni=new nn,ur=new A;class Ia{constructor(t=new ci,e=new ci,n=new ci,i=new ci,s=new ci,o=new ci){this.planes=[t,e,n,i,s,o]}set(t,e,n,i,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Cn){const n=this.planes,i=t.elements,s=i[0],o=i[1],a=i[2],c=i[3],l=i[4],h=i[5],u=i[6],d=i[7],f=i[8],m=i[9],_=i[10],p=i[11],g=i[12],v=i[13],x=i[14],S=i[15];if(n[0].setComponents(c-s,d-l,p-f,S-g).normalize(),n[1].setComponents(c+s,d+l,p+f,S+g).normalize(),n[2].setComponents(c+o,d+h,p+m,S+v).normalize(),n[3].setComponents(c-o,d-h,p-m,S-v).normalize(),n[4].setComponents(c-a,d-u,p-_,S-x).normalize(),e===Cn)n[5].setComponents(c+a,d+u,p+_,S+x).normalize();else if(e===Xr)n[5].setComponents(a,u,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ni.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ni.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ni)}intersectsSprite(t){return ni.center.set(0,0,0),ni.radius=.7071067811865476,ni.applyMatrix4(t.matrixWorld),this.intersectsSphere(ni)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(ur.x=i.normal.x>0?t.max.x:t.min.x,ur.y=i.normal.y>0?t.max.y:t.min.y,ur.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(ur)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function nu(){let r=null,t=!1,e=null,n=null;function i(s,o){e(s,o),n=r.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=r.requestAnimationFrame(i),t=!0)},stop:function(){r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){r=s}}}function zf(r){const t=new WeakMap;function e(a,c){const l=a.array,h=a.usage,u=l.byteLength,d=r.createBuffer();r.bindBuffer(c,d),r.bufferData(c,l,h),a.onUploadCallback();let f;if(l instanceof Float32Array)f=r.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=r.HALF_FLOAT:f=r.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=r.SHORT;else if(l instanceof Uint32Array)f=r.UNSIGNED_INT;else if(l instanceof Int32Array)f=r.INT;else if(l instanceof Int8Array)f=r.BYTE;else if(l instanceof Uint8Array)f=r.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){const h=c.array,u=c._updateRange,d=c.updateRanges;if(r.bindBuffer(l,a),u.count===-1&&d.length===0&&r.bufferSubData(l,0,h),d.length!==0){for(let f=0,m=d.length;f<m;f++){const _=d[f];r.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}u.count!==-1&&(r.bufferSubData(l,u.offset*h.BYTES_PER_ELEMENT,h,u.offset,u.count),u.count=-1),c.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(r.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:i,remove:s,update:o}}class We extends ke{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const s=t/2,o=e/2,a=Math.floor(n),c=Math.floor(i),l=a+1,h=c+1,u=t/a,d=e/c,f=[],m=[],_=[],p=[];for(let g=0;g<h;g++){const v=g*d-o;for(let x=0;x<l;x++){const S=x*u-s;m.push(S,-v,0),_.push(0,0,1),p.push(x/a),p.push(1-g/c)}}for(let g=0;g<c;g++)for(let v=0;v<a;v++){const x=v+l*g,S=v+l*(g+1),P=v+1+l*(g+1),T=v+1+l*g;f.push(x,S,T),f.push(S,P,T)}this.setIndex(f),this.setAttribute("position",new Ie(m,3)),this.setAttribute("normal",new Ie(_,3)),this.setAttribute("uv",new Ie(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new We(t.width,t.height,t.widthSegments,t.heightSegments)}}var Ff=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Of=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,kf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Bf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Vf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Hf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Gf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Wf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Xf=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,qf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,jf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Yf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Kf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Zf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,$f=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Jf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Qf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,tp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ep=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,np=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ip=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,sp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,rp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( batchId );
	vColor.xyz *= batchingColor.xyz;
#endif`,op=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,ap=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,cp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,lp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,hp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,up=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,dp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,fp="gl_FragColor = linearToOutputTexel( gl_FragColor );",pp=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,mp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,gp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,_p=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,xp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,vp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,yp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Mp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Sp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,bp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ep=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Ap=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Tp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,wp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Rp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Cp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Pp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Lp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ip=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Dp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Up=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Np=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,zp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Fp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Op=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,kp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Bp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Vp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Hp=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Gp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Wp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Xp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,qp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,jp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Yp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Kp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Zp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,$p=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Jp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Qp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,tm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,em=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,nm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,im=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,rm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,om=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,am=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,cm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,lm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,hm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,um=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,dm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,fm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,pm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,mm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,gm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,_m=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,xm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return shadow;
	}
#endif`,vm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,ym=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Mm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Sm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,bm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Em=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Am=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Tm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,wm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Rm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Cm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Pm=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Lm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Im=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Dm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Um=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Nm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const zm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Fm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Om=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,km=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Vm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Gm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Wm=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Xm=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,qm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,jm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ym=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Km=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Zm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,$m=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Qm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,eg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ng=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,ig=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,sg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,rg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,og=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,ag=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,lg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,ug=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,dg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,pg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,mg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Dt={alphahash_fragment:Ff,alphahash_pars_fragment:Of,alphamap_fragment:kf,alphamap_pars_fragment:Bf,alphatest_fragment:Vf,alphatest_pars_fragment:Hf,aomap_fragment:Gf,aomap_pars_fragment:Wf,batching_pars_vertex:Xf,batching_vertex:qf,begin_vertex:jf,beginnormal_vertex:Yf,bsdfs:Kf,iridescence_fragment:Zf,bumpmap_pars_fragment:$f,clipping_planes_fragment:Jf,clipping_planes_pars_fragment:Qf,clipping_planes_pars_vertex:tp,clipping_planes_vertex:ep,color_fragment:np,color_pars_fragment:ip,color_pars_vertex:sp,color_vertex:rp,common:op,cube_uv_reflection_fragment:ap,defaultnormal_vertex:cp,displacementmap_pars_vertex:lp,displacementmap_vertex:hp,emissivemap_fragment:up,emissivemap_pars_fragment:dp,colorspace_fragment:fp,colorspace_pars_fragment:pp,envmap_fragment:mp,envmap_common_pars_fragment:gp,envmap_pars_fragment:_p,envmap_pars_vertex:xp,envmap_physical_pars_fragment:Cp,envmap_vertex:vp,fog_vertex:yp,fog_pars_vertex:Mp,fog_fragment:Sp,fog_pars_fragment:bp,gradientmap_pars_fragment:Ep,lightmap_pars_fragment:Ap,lights_lambert_fragment:Tp,lights_lambert_pars_fragment:wp,lights_pars_begin:Rp,lights_toon_fragment:Pp,lights_toon_pars_fragment:Lp,lights_phong_fragment:Ip,lights_phong_pars_fragment:Dp,lights_physical_fragment:Up,lights_physical_pars_fragment:Np,lights_fragment_begin:zp,lights_fragment_maps:Fp,lights_fragment_end:Op,logdepthbuf_fragment:kp,logdepthbuf_pars_fragment:Bp,logdepthbuf_pars_vertex:Vp,logdepthbuf_vertex:Hp,map_fragment:Gp,map_pars_fragment:Wp,map_particle_fragment:Xp,map_particle_pars_fragment:qp,metalnessmap_fragment:jp,metalnessmap_pars_fragment:Yp,morphinstance_vertex:Kp,morphcolor_vertex:Zp,morphnormal_vertex:$p,morphtarget_pars_vertex:Jp,morphtarget_vertex:Qp,normal_fragment_begin:tm,normal_fragment_maps:em,normal_pars_fragment:nm,normal_pars_vertex:im,normal_vertex:sm,normalmap_pars_fragment:rm,clearcoat_normal_fragment_begin:om,clearcoat_normal_fragment_maps:am,clearcoat_pars_fragment:cm,iridescence_pars_fragment:lm,opaque_fragment:hm,packing:um,premultiplied_alpha_fragment:dm,project_vertex:fm,dithering_fragment:pm,dithering_pars_fragment:mm,roughnessmap_fragment:gm,roughnessmap_pars_fragment:_m,shadowmap_pars_fragment:xm,shadowmap_pars_vertex:vm,shadowmap_vertex:ym,shadowmask_pars_fragment:Mm,skinbase_vertex:Sm,skinning_pars_vertex:bm,skinning_vertex:Em,skinnormal_vertex:Am,specularmap_fragment:Tm,specularmap_pars_fragment:wm,tonemapping_fragment:Rm,tonemapping_pars_fragment:Cm,transmission_fragment:Pm,transmission_pars_fragment:Lm,uv_pars_fragment:Im,uv_pars_vertex:Dm,uv_vertex:Um,worldpos_vertex:Nm,background_vert:zm,background_frag:Fm,backgroundCube_vert:Om,backgroundCube_frag:km,cube_vert:Bm,cube_frag:Vm,depth_vert:Hm,depth_frag:Gm,distanceRGBA_vert:Wm,distanceRGBA_frag:Xm,equirect_vert:qm,equirect_frag:jm,linedashed_vert:Ym,linedashed_frag:Km,meshbasic_vert:Zm,meshbasic_frag:$m,meshlambert_vert:Jm,meshlambert_frag:Qm,meshmatcap_vert:tg,meshmatcap_frag:eg,meshnormal_vert:ng,meshnormal_frag:ig,meshphong_vert:sg,meshphong_frag:rg,meshphysical_vert:og,meshphysical_frag:ag,meshtoon_vert:cg,meshtoon_frag:lg,points_vert:hg,points_frag:ug,shadow_vert:dg,shadow_frag:fg,sprite_vert:pg,sprite_frag:mg},st={common:{diffuse:{value:new Mt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ut},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ut}},envmap:{envMap:{value:null},envMapRotation:{value:new Ut},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ut}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ut}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ut},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ut},normalScale:{value:new Nt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ut},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ut}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ut}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ut}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Mt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Mt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0},uvTransform:{value:new Ut}},sprite:{diffuse:{value:new Mt(16777215)},opacity:{value:1},center:{value:new Nt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ut},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0}}},cn={basic:{uniforms:Ce([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.fog]),vertexShader:Dt.meshbasic_vert,fragmentShader:Dt.meshbasic_frag},lambert:{uniforms:Ce([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.fog,st.lights,{emissive:{value:new Mt(0)}}]),vertexShader:Dt.meshlambert_vert,fragmentShader:Dt.meshlambert_frag},phong:{uniforms:Ce([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.fog,st.lights,{emissive:{value:new Mt(0)},specular:{value:new Mt(1118481)},shininess:{value:30}}]),vertexShader:Dt.meshphong_vert,fragmentShader:Dt.meshphong_frag},standard:{uniforms:Ce([st.common,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.roughnessmap,st.metalnessmap,st.fog,st.lights,{emissive:{value:new Mt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Dt.meshphysical_vert,fragmentShader:Dt.meshphysical_frag},toon:{uniforms:Ce([st.common,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.gradientmap,st.fog,st.lights,{emissive:{value:new Mt(0)}}]),vertexShader:Dt.meshtoon_vert,fragmentShader:Dt.meshtoon_frag},matcap:{uniforms:Ce([st.common,st.bumpmap,st.normalmap,st.displacementmap,st.fog,{matcap:{value:null}}]),vertexShader:Dt.meshmatcap_vert,fragmentShader:Dt.meshmatcap_frag},points:{uniforms:Ce([st.points,st.fog]),vertexShader:Dt.points_vert,fragmentShader:Dt.points_frag},dashed:{uniforms:Ce([st.common,st.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Dt.linedashed_vert,fragmentShader:Dt.linedashed_frag},depth:{uniforms:Ce([st.common,st.displacementmap]),vertexShader:Dt.depth_vert,fragmentShader:Dt.depth_frag},normal:{uniforms:Ce([st.common,st.bumpmap,st.normalmap,st.displacementmap,{opacity:{value:1}}]),vertexShader:Dt.meshnormal_vert,fragmentShader:Dt.meshnormal_frag},sprite:{uniforms:Ce([st.sprite,st.fog]),vertexShader:Dt.sprite_vert,fragmentShader:Dt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ut},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Dt.background_vert,fragmentShader:Dt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ut}},vertexShader:Dt.backgroundCube_vert,fragmentShader:Dt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Dt.cube_vert,fragmentShader:Dt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Dt.equirect_vert,fragmentShader:Dt.equirect_frag},distanceRGBA:{uniforms:Ce([st.common,st.displacementmap,{referencePosition:{value:new A},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Dt.distanceRGBA_vert,fragmentShader:Dt.distanceRGBA_frag},shadow:{uniforms:Ce([st.lights,st.fog,{color:{value:new Mt(0)},opacity:{value:1}}]),vertexShader:Dt.shadow_vert,fragmentShader:Dt.shadow_frag}};cn.physical={uniforms:Ce([cn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ut},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ut},clearcoatNormalScale:{value:new Nt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ut},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ut},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ut},sheen:{value:0},sheenColor:{value:new Mt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ut},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ut},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ut},transmissionSamplerSize:{value:new Nt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ut},attenuationDistance:{value:0},attenuationColor:{value:new Mt(0)},specularColor:{value:new Mt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ut},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ut},anisotropyVector:{value:new Nt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ut}}]),vertexShader:Dt.meshphysical_vert,fragmentShader:Dt.meshphysical_frag};const dr={r:0,b:0,g:0},ii=new Fe,gg=new Et;function _g(r,t,e,n,i,s,o){const a=new Mt(0);let c=s===!0?0:1,l,h,u=null,d=0,f=null;function m(v){let x=v.isScene===!0?v.background:null;return x&&x.isTexture&&(x=(v.backgroundBlurriness>0?e:t).get(x)),x}function _(v){let x=!1;const S=m(v);S===null?g(a,c):S&&S.isColor&&(g(S,1),x=!0);const P=r.xr.getEnvironmentBlendMode();P==="additive"?n.buffers.color.setClear(0,0,0,1,o):P==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function p(v,x){const S=m(x);S&&(S.isCubeTexture||S.mapping===to)?(h===void 0&&(h=new It(new dn(1,1,1),new Zn({name:"BackgroundCubeMaterial",uniforms:ts(cn.backgroundCube.uniforms),vertexShader:cn.backgroundCube.vertexShader,fragmentShader:cn.backgroundCube.fragmentShader,side:Le,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(P,T,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),ii.copy(x.backgroundRotation),ii.x*=-1,ii.y*=-1,ii.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(ii.y*=-1,ii.z*=-1),h.material.uniforms.envMap.value=S,h.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(gg.makeRotationFromEuler(ii)),h.material.toneMapped=qt.getTransfer(S.colorSpace)!==ne,(u!==S||d!==S.version||f!==r.toneMapping)&&(h.material.needsUpdate=!0,u=S,d=S.version,f=r.toneMapping),h.layers.enableAll(),v.unshift(h,h.geometry,h.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new It(new We(2,2),new Zn({name:"BackgroundMaterial",uniforms:ts(cn.background.uniforms),vertexShader:cn.background.vertexShader,fragmentShader:cn.background.fragmentShader,side:Pn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,l.material.toneMapped=qt.getTransfer(S.colorSpace)!==ne,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||d!==S.version||f!==r.toneMapping)&&(l.material.needsUpdate=!0,u=S,d=S.version,f=r.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function g(v,x){v.getRGB(dr,Qh(r)),n.buffers.color.setClear(dr.r,dr.g,dr.b,x,o)}return{getClearColor:function(){return a},setClearColor:function(v,x=1){a.set(v),c=x,g(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(v){c=v,g(a,c)},render:_,addToRenderList:p}}function xg(r,t){const e=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=d(null);let s=i,o=!1;function a(y,C,z,N,O){let G=!1;const X=u(N,z,C);s!==X&&(s=X,l(s.object)),G=f(y,N,z,O),G&&m(y,N,z,O),O!==null&&t.update(O,r.ELEMENT_ARRAY_BUFFER),(G||o)&&(o=!1,S(y,C,z,N),O!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(O).buffer))}function c(){return r.createVertexArray()}function l(y){return r.bindVertexArray(y)}function h(y){return r.deleteVertexArray(y)}function u(y,C,z){const N=z.wireframe===!0;let O=n[y.id];O===void 0&&(O={},n[y.id]=O);let G=O[C.id];G===void 0&&(G={},O[C.id]=G);let X=G[N];return X===void 0&&(X=d(c()),G[N]=X),X}function d(y){const C=[],z=[],N=[];for(let O=0;O<e;O++)C[O]=0,z[O]=0,N[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:z,attributeDivisors:N,object:y,attributes:{},index:null}}function f(y,C,z,N){const O=s.attributes,G=C.attributes;let X=0;const K=z.getAttributes();for(const q in K)if(K[q].location>=0){const dt=O[q];let nt=G[q];if(nt===void 0&&(q==="instanceMatrix"&&y.instanceMatrix&&(nt=y.instanceMatrix),q==="instanceColor"&&y.instanceColor&&(nt=y.instanceColor)),dt===void 0||dt.attribute!==nt||nt&&dt.data!==nt.data)return!0;X++}return s.attributesNum!==X||s.index!==N}function m(y,C,z,N){const O={},G=C.attributes;let X=0;const K=z.getAttributes();for(const q in K)if(K[q].location>=0){let dt=G[q];dt===void 0&&(q==="instanceMatrix"&&y.instanceMatrix&&(dt=y.instanceMatrix),q==="instanceColor"&&y.instanceColor&&(dt=y.instanceColor));const nt={};nt.attribute=dt,dt&&dt.data&&(nt.data=dt.data),O[q]=nt,X++}s.attributes=O,s.attributesNum=X,s.index=N}function _(){const y=s.newAttributes;for(let C=0,z=y.length;C<z;C++)y[C]=0}function p(y){g(y,0)}function g(y,C){const z=s.newAttributes,N=s.enabledAttributes,O=s.attributeDivisors;z[y]=1,N[y]===0&&(r.enableVertexAttribArray(y),N[y]=1),O[y]!==C&&(r.vertexAttribDivisor(y,C),O[y]=C)}function v(){const y=s.newAttributes,C=s.enabledAttributes;for(let z=0,N=C.length;z<N;z++)C[z]!==y[z]&&(r.disableVertexAttribArray(z),C[z]=0)}function x(y,C,z,N,O,G,X){X===!0?r.vertexAttribIPointer(y,C,z,O,G):r.vertexAttribPointer(y,C,z,N,O,G)}function S(y,C,z,N){_();const O=N.attributes,G=z.getAttributes(),X=C.defaultAttributeValues;for(const K in G){const q=G[K];if(q.location>=0){let ct=O[K];if(ct===void 0&&(K==="instanceMatrix"&&y.instanceMatrix&&(ct=y.instanceMatrix),K==="instanceColor"&&y.instanceColor&&(ct=y.instanceColor)),ct!==void 0){const dt=ct.normalized,nt=ct.itemSize,pt=t.get(ct);if(pt===void 0)continue;const Rt=pt.buffer,H=pt.type,$=pt.bytesPerElement,rt=H===r.INT||H===r.UNSIGNED_INT||ct.gpuType===Oh;if(ct.isInterleavedBufferAttribute){const it=ct.data,xt=it.stride,gt=ct.offset;if(it.isInstancedInterleavedBuffer){for(let At=0;At<q.locationSize;At++)g(q.location+At,it.meshPerAttribute);y.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=it.meshPerAttribute*it.count)}else for(let At=0;At<q.locationSize;At++)p(q.location+At);r.bindBuffer(r.ARRAY_BUFFER,Rt);for(let At=0;At<q.locationSize;At++)x(q.location+At,nt/q.locationSize,H,dt,xt*$,(gt+nt/q.locationSize*At)*$,rt)}else{if(ct.isInstancedBufferAttribute){for(let it=0;it<q.locationSize;it++)g(q.location+it,ct.meshPerAttribute);y.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=ct.meshPerAttribute*ct.count)}else for(let it=0;it<q.locationSize;it++)p(q.location+it);r.bindBuffer(r.ARRAY_BUFFER,Rt);for(let it=0;it<q.locationSize;it++)x(q.location+it,nt/q.locationSize,H,dt,nt*$,nt/q.locationSize*it*$,rt)}}else if(X!==void 0){const dt=X[K];if(dt!==void 0)switch(dt.length){case 2:r.vertexAttrib2fv(q.location,dt);break;case 3:r.vertexAttrib3fv(q.location,dt);break;case 4:r.vertexAttrib4fv(q.location,dt);break;default:r.vertexAttrib1fv(q.location,dt)}}}}v()}function P(){D();for(const y in n){const C=n[y];for(const z in C){const N=C[z];for(const O in N)h(N[O].object),delete N[O];delete C[z]}delete n[y]}}function T(y){if(n[y.id]===void 0)return;const C=n[y.id];for(const z in C){const N=C[z];for(const O in N)h(N[O].object),delete N[O];delete C[z]}delete n[y.id]}function w(y){for(const C in n){const z=n[C];if(z[y.id]===void 0)continue;const N=z[y.id];for(const O in N)h(N[O].object),delete N[O];delete z[y.id]}}function D(){E(),o=!0,s!==i&&(s=i,l(s.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:D,resetDefaultState:E,dispose:P,releaseStatesOfGeometry:T,releaseStatesOfProgram:w,initAttributes:_,enableAttribute:p,disableUnusedAttributes:v}}function vg(r,t,e){let n;function i(l){n=l}function s(l,h){r.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,u){u!==0&&(r.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function a(l,h,u){if(u===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let f=0;f<u;f++)this.render(l[f],h[f]);else{d.multiDrawArraysWEBGL(n,l,0,h,0,u);let f=0;for(let m=0;m<u;m++)f+=h[m];e.update(f,n,1)}}function c(l,h,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<l.length;m++)o(l[m],h[m],d[m]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,u);let m=0;for(let _=0;_<u;_++)m+=h[_];for(let _=0;_<d.length;_++)e.update(m,n,d[_])}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function yg(r,t,e,n){let i;function s(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const T=t.get("EXT_texture_filter_anisotropic");i=r.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(T){return!(T!==Ze&&n.convert(T)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(T){const w=T===eo&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(T!==Kn&&n.convert(T)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==un&&!w)}function c(T){if(T==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=e.logarithmicDepthBuffer===!0,d=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),f=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=r.getParameter(r.MAX_TEXTURE_SIZE),_=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),g=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),v=r.getParameter(r.MAX_VARYING_VECTORS),x=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),S=f>0,P=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,maxTextures:d,maxVertexTextures:f,maxTextureSize:m,maxCubemapSize:_,maxAttributes:p,maxVertexUniforms:g,maxVaryings:v,maxFragmentUniforms:x,vertexTextures:S,maxSamples:P}}function Mg(r){const t=this;let e=null,n=0,i=!1,s=!1;const o=new ci,a=new Ut,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const m=u.clippingPlanes,_=u.clipIntersection,p=u.clipShadows,g=r.get(u);if(!i||m===null||m.length===0||s&&!p)s?h(null):l();else{const v=s?0:n,x=v*4;let S=g.clippingState||null;c.value=S,S=h(m,d,x,f);for(let P=0;P!==x;++P)S[P]=e[P];g.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,m){const _=u!==null?u.length:0;let p=null;if(_!==0){if(p=c.value,m!==!0||p===null){const g=f+_*4,v=d.matrixWorldInverse;a.getNormalMatrix(v),(p===null||p.length<g)&&(p=new Float32Array(g));for(let x=0,S=f;x!==_;++x,S+=4)o.copy(u[x]).applyMatrix4(v,a),o.normal.toArray(p,S),p[S+3]=o.constant}c.value=p,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,p}}function Sg(r){let t=new WeakMap;function e(o,a){return a===ha?o.mapping=ji:a===ua&&(o.mapping=Yi),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===ha||a===ua)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new Df(c.height);return l.fromEquirectangularTexture(r,o),t.set(o,l),o.addEventListener("dispose",i),e(l.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}class Da extends tu{constructor(t=-1,e=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-t,o=n+t,a=i+e,c=i-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Bi=4,Qc=[.125,.215,.35,.446,.526,.582],mi=20,zo=new Da,tl=new Mt;let Fo=null,Oo=0,ko=0,Bo=!1;const li=(1+Math.sqrt(5))/2,Ui=1/li,el=[new A(-li,Ui,0),new A(li,Ui,0),new A(-Ui,0,li),new A(Ui,0,li),new A(0,li,-Ui),new A(0,li,Ui),new A(-1,1,-1),new A(1,1,-1),new A(-1,1,1),new A(1,1,1)];class qr{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){Fo=this._renderer.getRenderTarget(),Oo=this._renderer.getActiveCubeFace(),ko=this._renderer.getActiveMipmapLevel(),Bo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,i,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=sl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=il(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Fo,Oo,ko),this._renderer.xr.enabled=Bo,t.scissorTest=!1,fr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ji||t.mapping===Yi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Fo=this._renderer.getRenderTarget(),Oo=this._renderer.getActiveCubeFace(),ko=this._renderer.getActiveMipmapLevel(),Bo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:ze,minFilter:ze,generateMipmaps:!1,type:eo,format:Ze,colorSpace:Me,depthBuffer:!1},i=nl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=nl(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=bg(s)),this._blurMaterial=Eg(s,t,e)}return i}_compileMaterial(t){const e=new It(this._lodPlanes[0],t);this._renderer.compile(e,zo)}_sceneToCubeUV(t,e,n,i){const a=new ye(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(tl),h.toneMapping=jn,h.autoClear=!1;const f=new ue({name:"PMREM.Background",side:Le,depthWrite:!1,depthTest:!1}),m=new It(new dn,f);let _=!1;const p=t.background;p?p.isColor&&(f.color.copy(p),t.background=null,_=!0):(f.color.copy(tl),_=!0);for(let g=0;g<6;g++){const v=g%3;v===0?(a.up.set(0,c[g],0),a.lookAt(l[g],0,0)):v===1?(a.up.set(0,0,c[g]),a.lookAt(0,l[g],0)):(a.up.set(0,c[g],0),a.lookAt(0,0,l[g]));const x=this._cubeSize;fr(i,v*x,g>2?x:0,x,x),h.setRenderTarget(i),_&&h.render(m,a),h.render(t,a)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=p}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===ji||t.mapping===Yi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=sl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=il());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new It(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const c=this._cubeSize;fr(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,zo)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=el[(i-s-1)%el.length];this._blur(t,s-1,s,o,a)}e.autoClear=n}_blur(t,e,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",s),this._halfBlur(o,t,n,n,i,"longitudinal",s)}_halfBlur(t,e,n,i,s,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new It(this._lodPlanes[i],l),d=l.uniforms,f=this._sizeLods[n]-1,m=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*mi-1),_=s/m,p=isFinite(s)?1+Math.floor(h*_):mi;p>mi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${mi}`);const g=[];let v=0;for(let w=0;w<mi;++w){const D=w/_,E=Math.exp(-D*D/2);g.push(E),w===0?v+=E:w<p&&(v+=2*E)}for(let w=0;w<g.length;w++)g[w]=g[w]/v;d.envMap.value=t.texture,d.samples.value=p,d.weights.value=g,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:x}=this;d.dTheta.value=m,d.mipInt.value=x-n;const S=this._sizeLods[i],P=3*S*(i>x-Bi?i-x+Bi:0),T=4*(this._cubeSize-S);fr(e,P,T,3*S,2*S),c.setRenderTarget(e),c.render(u,zo)}}function bg(r){const t=[],e=[],n=[];let i=r;const s=r-Bi+1+Qc.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);e.push(a);let c=1/a;o>r-Bi?c=Qc[o-r+Bi-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,m=6,_=3,p=2,g=1,v=new Float32Array(_*m*f),x=new Float32Array(p*m*f),S=new Float32Array(g*m*f);for(let T=0;T<f;T++){const w=T%3*2/3-1,D=T>2?0:-1,E=[w,D,0,w+2/3,D,0,w+2/3,D+1,0,w,D,0,w+2/3,D+1,0,w,D+1,0];v.set(E,_*m*T),x.set(d,p*m*T);const y=[T,T,T,T,T,T];S.set(y,g*m*T)}const P=new ke;P.setAttribute("position",new de(v,_)),P.setAttribute("uv",new de(x,p)),P.setAttribute("faceIndex",new de(S,g)),t.push(P),i>Bi&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function nl(r,t,e){const n=new _i(r,t,e);return n.texture.mapping=to,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function fr(r,t,e,n,i){r.viewport.set(t,e,n,i),r.scissor.set(t,e,n,i)}function Eg(r,t,e){const n=new Float32Array(mi),i=new A(0,1,0);return new Zn({name:"SphericalGaussianBlur",defines:{n:mi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Ua(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:qn,depthTest:!1,depthWrite:!1})}function il(){return new Zn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ua(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:qn,depthTest:!1,depthWrite:!1})}function sl(){return new Zn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ua(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:qn,depthTest:!1,depthWrite:!1})}function Ua(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Ag(r){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===ha||c===ua,h=c===ji||c===Yi;if(l||h){let u=t.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new qr(r)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return l&&f&&f.height>0||h&&f&&i(f)?(e===null&&(e=new qr(r)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",s),u.texture):null}}}return a}function i(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function s(a){const c=a.target;c.removeEventListener("dispose",s);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Tg(r){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&Pa("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function wg(r,t,e,n){const i={},s=new WeakMap;function o(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const m in d.attributes)t.remove(d.attributes[m]);for(const m in d.morphAttributes){const _=d.morphAttributes[m];for(let p=0,g=_.length;p<g;p++)t.remove(_[p])}d.removeEventListener("dispose",o),delete i[d.id];const f=s.get(d);f&&(t.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,e.memory.geometries++),d}function c(u){const d=u.attributes;for(const m in d)t.update(d[m],r.ARRAY_BUFFER);const f=u.morphAttributes;for(const m in f){const _=f[m];for(let p=0,g=_.length;p<g;p++)t.update(_[p],r.ARRAY_BUFFER)}}function l(u){const d=[],f=u.index,m=u.attributes.position;let _=0;if(f!==null){const v=f.array;_=f.version;for(let x=0,S=v.length;x<S;x+=3){const P=v[x+0],T=v[x+1],w=v[x+2];d.push(P,T,T,w,w,P)}}else if(m!==void 0){const v=m.array;_=m.version;for(let x=0,S=v.length/3-1;x<S;x+=3){const P=x+0,T=x+1,w=x+2;d.push(P,T,T,w,w,P)}}else return;const p=new(jh(d)?Jh:$h)(d,1);p.version=_;const g=s.get(u);g&&t.remove(g),s.set(u,p)}function h(u){const d=s.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return s.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function Rg(r,t,e){let n;function i(d){n=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function c(d,f){r.drawElements(n,f,s,d*o),e.update(f,n,1)}function l(d,f,m){m!==0&&(r.drawElementsInstanced(n,f,s,d*o,m),e.update(f,n,m))}function h(d,f,m){if(m===0)return;const _=t.get("WEBGL_multi_draw");if(_===null)for(let p=0;p<m;p++)this.render(d[p]/o,f[p]);else{_.multiDrawElementsWEBGL(n,f,0,s,d,0,m);let p=0;for(let g=0;g<m;g++)p+=f[g];e.update(p,n,1)}}function u(d,f,m,_){if(m===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<d.length;g++)l(d[g]/o,f[g],_[g]);else{p.multiDrawElementsInstancedWEBGL(n,f,0,s,d,0,_,0,m);let g=0;for(let v=0;v<m;v++)g+=f[v];for(let v=0;v<_.length;v++)e.update(g,n,_[v])}}this.setMode=i,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Cg(r){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(e.calls++,o){case r.TRIANGLES:e.triangles+=a*(s/3);break;case r.LINES:e.lines+=a*(s/2);break;case r.LINE_STRIP:e.lines+=a*(s-1);break;case r.LINE_LOOP:e.lines+=a*s;break;case r.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Pg(r,t,e){const n=new WeakMap,i=new te;function s(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let y=function(){D.dispose(),n.delete(a),a.removeEventListener("dispose",y)};var f=y;d!==void 0&&d.texture.dispose();const m=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],v=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let S=0;m===!0&&(S=1),_===!0&&(S=2),p===!0&&(S=3);let P=a.attributes.position.count*S,T=1;P>t.maxTextureSize&&(T=Math.ceil(P/t.maxTextureSize),P=t.maxTextureSize);const w=new Float32Array(P*T*4*u),D=new Kh(w,P,T,u);D.type=un,D.needsUpdate=!0;const E=S*4;for(let C=0;C<u;C++){const z=g[C],N=v[C],O=x[C],G=P*T*4*C;for(let X=0;X<z.count;X++){const K=X*E;m===!0&&(i.fromBufferAttribute(z,X),w[G+K+0]=i.x,w[G+K+1]=i.y,w[G+K+2]=i.z,w[G+K+3]=0),_===!0&&(i.fromBufferAttribute(N,X),w[G+K+4]=i.x,w[G+K+5]=i.y,w[G+K+6]=i.z,w[G+K+7]=0),p===!0&&(i.fromBufferAttribute(O,X),w[G+K+8]=i.x,w[G+K+9]=i.y,w[G+K+10]=i.z,w[G+K+11]=O.itemSize===4?i.w:1)}}d={count:u,texture:D,size:new Nt(P,T)},n.set(a,d),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(r,"morphTexture",o.morphTexture,e);else{let m=0;for(let p=0;p<l.length;p++)m+=l[p];const _=a.morphTargetsRelative?1:1-m;c.getUniforms().setValue(r,"morphTargetBaseInfluence",_),c.getUniforms().setValue(r,"morphTargetInfluences",l)}c.getUniforms().setValue(r,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(r,"morphTargetsTextureSize",d.size)}return{update:s}}function Lg(r,t,e,n){let i=new WeakMap;function s(c){const l=n.render.frame,h=c.geometry,u=t.get(c,h);if(i.get(u)!==l&&(t.update(u),i.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),i.get(c)!==l&&(e.update(c.instanceMatrix,r.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,r.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;i.get(d)!==l&&(d.update(),i.set(d,l))}return u}function o(){i=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:s,dispose:o}}class iu extends fe{constructor(t,e,n,i,s,o,a,c,l,h=Wi){if(h!==Wi&&h!==Ji)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Wi&&(n=Zi),n===void 0&&h===Ji&&(n=$i),super(null,i,s,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Pe,this.minFilter=c!==void 0?c:Pe,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const su=new fe,ru=new iu(1,1);ru.compareFunction=qh;const ou=new Kh,au=new _f,cu=new eu,rl=[],ol=[],al=new Float32Array(16),cl=new Float32Array(9),ll=new Float32Array(4);function rs(r,t,e){const n=r[0];if(n<=0||n>0)return r;const i=t*e;let s=rl[i];if(s===void 0&&(s=new Float32Array(i),rl[i]=s),t!==0){n.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,r[o].toArray(s,a)}return s}function pe(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function me(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function io(r,t){let e=ol[t];e===void 0&&(e=new Int32Array(t),ol[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function Ig(r,t){const e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function Dg(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(pe(e,t))return;r.uniform2fv(this.addr,t),me(e,t)}}function Ug(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(pe(e,t))return;r.uniform3fv(this.addr,t),me(e,t)}}function Ng(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(pe(e,t))return;r.uniform4fv(this.addr,t),me(e,t)}}function zg(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(pe(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),me(e,t)}else{if(pe(e,n))return;ll.set(n),r.uniformMatrix2fv(this.addr,!1,ll),me(e,n)}}function Fg(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(pe(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),me(e,t)}else{if(pe(e,n))return;cl.set(n),r.uniformMatrix3fv(this.addr,!1,cl),me(e,n)}}function Og(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(pe(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),me(e,t)}else{if(pe(e,n))return;al.set(n),r.uniformMatrix4fv(this.addr,!1,al),me(e,n)}}function kg(r,t){const e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function Bg(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(pe(e,t))return;r.uniform2iv(this.addr,t),me(e,t)}}function Vg(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(pe(e,t))return;r.uniform3iv(this.addr,t),me(e,t)}}function Hg(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(pe(e,t))return;r.uniform4iv(this.addr,t),me(e,t)}}function Gg(r,t){const e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function Wg(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(pe(e,t))return;r.uniform2uiv(this.addr,t),me(e,t)}}function Xg(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(pe(e,t))return;r.uniform3uiv(this.addr,t),me(e,t)}}function qg(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(pe(e,t))return;r.uniform4uiv(this.addr,t),me(e,t)}}function jg(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);const s=this.type===r.SAMPLER_2D_SHADOW?ru:su;e.setTexture2D(t||s,i)}function Yg(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||au,i)}function Kg(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||cu,i)}function Zg(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||ou,i)}function $g(r){switch(r){case 5126:return Ig;case 35664:return Dg;case 35665:return Ug;case 35666:return Ng;case 35674:return zg;case 35675:return Fg;case 35676:return Og;case 5124:case 35670:return kg;case 35667:case 35671:return Bg;case 35668:case 35672:return Vg;case 35669:case 35673:return Hg;case 5125:return Gg;case 36294:return Wg;case 36295:return Xg;case 36296:return qg;case 35678:case 36198:case 36298:case 36306:case 35682:return jg;case 35679:case 36299:case 36307:return Yg;case 35680:case 36300:case 36308:case 36293:return Kg;case 36289:case 36303:case 36311:case 36292:return Zg}}function Jg(r,t){r.uniform1fv(this.addr,t)}function Qg(r,t){const e=rs(t,this.size,2);r.uniform2fv(this.addr,e)}function t_(r,t){const e=rs(t,this.size,3);r.uniform3fv(this.addr,e)}function e_(r,t){const e=rs(t,this.size,4);r.uniform4fv(this.addr,e)}function n_(r,t){const e=rs(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function i_(r,t){const e=rs(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function s_(r,t){const e=rs(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function r_(r,t){r.uniform1iv(this.addr,t)}function o_(r,t){r.uniform2iv(this.addr,t)}function a_(r,t){r.uniform3iv(this.addr,t)}function c_(r,t){r.uniform4iv(this.addr,t)}function l_(r,t){r.uniform1uiv(this.addr,t)}function h_(r,t){r.uniform2uiv(this.addr,t)}function u_(r,t){r.uniform3uiv(this.addr,t)}function d_(r,t){r.uniform4uiv(this.addr,t)}function f_(r,t,e){const n=this.cache,i=t.length,s=io(e,i);pe(n,s)||(r.uniform1iv(this.addr,s),me(n,s));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||su,s[o])}function p_(r,t,e){const n=this.cache,i=t.length,s=io(e,i);pe(n,s)||(r.uniform1iv(this.addr,s),me(n,s));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||au,s[o])}function m_(r,t,e){const n=this.cache,i=t.length,s=io(e,i);pe(n,s)||(r.uniform1iv(this.addr,s),me(n,s));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||cu,s[o])}function g_(r,t,e){const n=this.cache,i=t.length,s=io(e,i);pe(n,s)||(r.uniform1iv(this.addr,s),me(n,s));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||ou,s[o])}function __(r){switch(r){case 5126:return Jg;case 35664:return Qg;case 35665:return t_;case 35666:return e_;case 35674:return n_;case 35675:return i_;case 35676:return s_;case 5124:case 35670:return r_;case 35667:case 35671:return o_;case 35668:case 35672:return a_;case 35669:case 35673:return c_;case 5125:return l_;case 36294:return h_;case 36295:return u_;case 36296:return d_;case 35678:case 36198:case 36298:case 36306:case 35682:return f_;case 35679:case 36299:case 36307:return p_;case 35680:case 36300:case 36308:case 36293:return m_;case 36289:case 36303:case 36311:case 36292:return g_}}class x_{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=$g(e.type)}}class v_{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=__(e.type)}}class y_{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(t,e[a.id],n)}}}const Vo=/(\w+)(\])?(\[|\.)?/g;function hl(r,t){r.seq.push(t),r.map[t.id]=t}function M_(r,t,e){const n=r.name,i=n.length;for(Vo.lastIndex=0;;){const s=Vo.exec(n),o=Vo.lastIndex;let a=s[1];const c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===i){hl(e,l===void 0?new x_(a,r,t):new v_(a,r,t));break}else{let u=e.map[a];u===void 0&&(u=new y_(a),hl(e,u)),e=u}}}class Nr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=t.getActiveUniform(e,i),o=t.getUniformLocation(e,s.name);M_(s,o,this)}}setValue(t,e,n,i){const s=this.map[e];s!==void 0&&s.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,o=e.length;s!==o;++s){const a=e[s],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,s=t.length;i!==s;++i){const o=t[i];o.id in e&&n.push(o)}return n}}function ul(r,t,e){const n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}const S_=37297;let b_=0;function E_(r,t){const e=r.split(`
`),n=[],i=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}function A_(r){const t=qt.getPrimaries(qt.workingColorSpace),e=qt.getPrimaries(r);let n;switch(t===e?n="":t===Wr&&e===Gr?n="LinearDisplayP3ToLinearSRGB":t===Gr&&e===Wr&&(n="LinearSRGBToLinearDisplayP3"),r){case Me:case no:return[n,"LinearTransferOETF"];case ve:case Ra:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),[n,"LinearTransferOETF"]}}function dl(r,t,e){const n=r.getShaderParameter(t,r.COMPILE_STATUS),i=r.getShaderInfoLog(t).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return e.toUpperCase()+`

`+i+`

`+E_(r.getShaderSource(t),o)}else return i}function T_(r,t){const e=A_(t);return`vec4 ${r}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function w_(r,t){let e;switch(t){case xd:e="Linear";break;case vd:e="Reinhard";break;case yd:e="OptimizedCineon";break;case Nh:e="ACESFilmic";break;case Sd:e="AgX";break;case bd:e="Neutral";break;case Md:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function R_(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Rs).join(`
`)}function C_(r){const t=[];for(const e in r){const n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function P_(r,t){const e={},n=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(t,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:r.getAttribLocation(t,o),locationSize:a}}return e}function Rs(r){return r!==""}function fl(r,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function pl(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const L_=/^[ \t]*#include +<([\w\d./]+)>/gm;function pa(r){return r.replace(L_,D_)}const I_=new Map;function D_(r,t){let e=Dt[t];if(e===void 0){const n=I_.get(t);if(n!==void 0)e=Dt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return pa(e)}const U_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ml(r){return r.replace(U_,N_)}function N_(r,t,e,n){let i="";for(let s=parseInt(t);s<parseInt(e);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function gl(r){let t=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function z_(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Uh?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===Wu?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Tn&&(t="SHADOWMAP_TYPE_VSM"),t}function F_(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case ji:case Yi:t="ENVMAP_TYPE_CUBE";break;case to:t="ENVMAP_TYPE_CUBE_UV";break}return t}function O_(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Yi:t="ENVMAP_MODE_REFRACTION";break}return t}function k_(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Ta:t="ENVMAP_BLENDING_MULTIPLY";break;case gd:t="ENVMAP_BLENDING_MIX";break;case _d:t="ENVMAP_BLENDING_ADD";break}return t}function B_(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function V_(r,t,e,n){const i=r.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=z_(e),l=F_(e),h=O_(e),u=k_(e),d=B_(e),f=R_(e),m=C_(s),_=i.createProgram();let p,g,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Rs).join(`
`),p.length>0&&(p+=`
`),g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Rs).join(`
`),g.length>0&&(g+=`
`)):(p=[gl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Rs).join(`
`),g=[gl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==jn?"#define TONE_MAPPING":"",e.toneMapping!==jn?Dt.tonemapping_pars_fragment:"",e.toneMapping!==jn?w_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Dt.colorspace_pars_fragment,T_("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Rs).join(`
`)),o=pa(o),o=fl(o,e),o=pl(o,e),a=pa(a),a=fl(a,e),a=pl(a,e),o=ml(o),a=ml(a),e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,g=["#define varying in",e.glslVersion===Ic?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ic?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const x=v+p+o,S=v+g+a,P=ul(i,i.VERTEX_SHADER,x),T=ul(i,i.FRAGMENT_SHADER,S);i.attachShader(_,P),i.attachShader(_,T),e.index0AttributeName!==void 0?i.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function w(C){if(r.debug.checkShaderErrors){const z=i.getProgramInfoLog(_).trim(),N=i.getShaderInfoLog(P).trim(),O=i.getShaderInfoLog(T).trim();let G=!0,X=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(G=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,_,P,T);else{const K=dl(i,P,"vertex"),q=dl(i,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+z+`
`+K+`
`+q)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(N===""||O==="")&&(X=!1);X&&(C.diagnostics={runnable:G,programLog:z,vertexShader:{log:N,prefix:p},fragmentShader:{log:O,prefix:g}})}i.deleteShader(P),i.deleteShader(T),D=new Nr(i,_),E=P_(i,_)}let D;this.getUniforms=function(){return D===void 0&&w(this),D};let E;this.getAttributes=function(){return E===void 0&&w(this),E};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=i.getProgramParameter(_,S_)),y},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=b_++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=P,this.fragmentShader=T,this}let H_=0;class G_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new W_(t),e.set(t,n)),n}}class W_{constructor(t){this.id=H_++,this.code=t,this.usedTimes=0}}function X_(r,t,e,n,i,s,o){const a=new La,c=new G_,l=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(E){return l.add(E),E===0?"uv":`uv${E}`}function p(E,y,C,z,N){const O=z.fog,G=N.geometry,X=E.isMeshStandardMaterial?z.environment:null,K=(E.isMeshStandardMaterial?e:t).get(E.envMap||X),q=K&&K.mapping===to?K.image.height:null,ct=m[E.type];E.precision!==null&&(f=i.getMaxPrecision(E.precision),f!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",f,"instead."));const dt=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,nt=dt!==void 0?dt.length:0;let pt=0;G.morphAttributes.position!==void 0&&(pt=1),G.morphAttributes.normal!==void 0&&(pt=2),G.morphAttributes.color!==void 0&&(pt=3);let Rt,H,$,rt;if(ct){const $t=cn[ct];Rt=$t.vertexShader,H=$t.fragmentShader}else Rt=E.vertexShader,H=E.fragmentShader,c.update(E),$=c.getVertexShaderID(E),rt=c.getFragmentShaderID(E);const it=r.getRenderTarget(),xt=N.isInstancedMesh===!0,gt=N.isBatchedMesh===!0,At=!!E.map,L=!!E.matcap,zt=!!K,Bt=!!E.aoMap,Qt=!!E.lightMap,St=!!E.bumpMap,Wt=!!E.normalMap,Ft=!!E.displacementMap,Lt=!!E.emissiveMap,ee=!!E.metalnessMap,R=!!E.roughnessMap,M=E.anisotropy>0,k=E.clearcoat>0,W=E.dispersion>0,Y=E.iridescence>0,J=E.sheen>0,yt=E.transmission>0,ot=M&&!!E.anisotropyMap,at=k&&!!E.clearcoatMap,Ot=k&&!!E.clearcoatNormalMap,Q=k&&!!E.clearcoatRoughnessMap,_t=Y&&!!E.iridescenceMap,Ht=Y&&!!E.iridescenceThicknessMap,Ct=J&&!!E.sheenColorMap,lt=J&&!!E.sheenRoughnessMap,kt=!!E.specularMap,Gt=!!E.specularColorMap,ae=!!E.specularIntensityMap,I=yt&&!!E.transmissionMap,ht=yt&&!!E.thicknessMap,j=!!E.gradientMap,Z=!!E.alphaMap,et=E.alphaTest>0,Pt=!!E.alphaHash,Xt=!!E.extensions;let ce=jn;E.toneMapped&&(it===null||it.isXRRenderTarget===!0)&&(ce=r.toneMapping);const ge={shaderID:ct,shaderType:E.type,shaderName:E.name,vertexShader:Rt,fragmentShader:H,defines:E.defines,customVertexShaderID:$,customFragmentShaderID:rt,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:f,batching:gt,batchingColor:gt&&N._colorsTexture!==null,instancing:xt,instancingColor:xt&&N.instanceColor!==null,instancingMorph:xt&&N.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:it===null?r.outputColorSpace:it.isXRRenderTarget===!0?it.texture.colorSpace:Me,alphaToCoverage:!!E.alphaToCoverage,map:At,matcap:L,envMap:zt,envMapMode:zt&&K.mapping,envMapCubeUVHeight:q,aoMap:Bt,lightMap:Qt,bumpMap:St,normalMap:Wt,displacementMap:d&&Ft,emissiveMap:Lt,normalMapObjectSpace:Wt&&E.normalMapType===Od,normalMapTangentSpace:Wt&&E.normalMapType===wa,metalnessMap:ee,roughnessMap:R,anisotropy:M,anisotropyMap:ot,clearcoat:k,clearcoatMap:at,clearcoatNormalMap:Ot,clearcoatRoughnessMap:Q,dispersion:W,iridescence:Y,iridescenceMap:_t,iridescenceThicknessMap:Ht,sheen:J,sheenColorMap:Ct,sheenRoughnessMap:lt,specularMap:kt,specularColorMap:Gt,specularIntensityMap:ae,transmission:yt,transmissionMap:I,thicknessMap:ht,gradientMap:j,opaque:E.transparent===!1&&E.blending===Gi&&E.alphaToCoverage===!1,alphaMap:Z,alphaTest:et,alphaHash:Pt,combine:E.combine,mapUv:At&&_(E.map.channel),aoMapUv:Bt&&_(E.aoMap.channel),lightMapUv:Qt&&_(E.lightMap.channel),bumpMapUv:St&&_(E.bumpMap.channel),normalMapUv:Wt&&_(E.normalMap.channel),displacementMapUv:Ft&&_(E.displacementMap.channel),emissiveMapUv:Lt&&_(E.emissiveMap.channel),metalnessMapUv:ee&&_(E.metalnessMap.channel),roughnessMapUv:R&&_(E.roughnessMap.channel),anisotropyMapUv:ot&&_(E.anisotropyMap.channel),clearcoatMapUv:at&&_(E.clearcoatMap.channel),clearcoatNormalMapUv:Ot&&_(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&_(E.clearcoatRoughnessMap.channel),iridescenceMapUv:_t&&_(E.iridescenceMap.channel),iridescenceThicknessMapUv:Ht&&_(E.iridescenceThicknessMap.channel),sheenColorMapUv:Ct&&_(E.sheenColorMap.channel),sheenRoughnessMapUv:lt&&_(E.sheenRoughnessMap.channel),specularMapUv:kt&&_(E.specularMap.channel),specularColorMapUv:Gt&&_(E.specularColorMap.channel),specularIntensityMapUv:ae&&_(E.specularIntensityMap.channel),transmissionMapUv:I&&_(E.transmissionMap.channel),thicknessMapUv:ht&&_(E.thicknessMap.channel),alphaMapUv:Z&&_(E.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(Wt||M),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!G.attributes.uv&&(At||Z),fog:!!O,useFog:E.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:N.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:nt,morphTextureStride:pt,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:r.shadowMap.enabled&&C.length>0,shadowMapType:r.shadowMap.type,toneMapping:ce,decodeVideoTexture:At&&E.map.isVideoTexture===!0&&qt.getTransfer(E.map.colorSpace)===ne,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===ln,flipSided:E.side===Le,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Xt&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:Xt&&E.extensions.multiDraw===!0&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return ge.vertexUv1s=l.has(1),ge.vertexUv2s=l.has(2),ge.vertexUv3s=l.has(3),l.clear(),ge}function g(E){const y=[];if(E.shaderID?y.push(E.shaderID):(y.push(E.customVertexShaderID),y.push(E.customFragmentShaderID)),E.defines!==void 0)for(const C in E.defines)y.push(C),y.push(E.defines[C]);return E.isRawShaderMaterial===!1&&(v(y,E),x(y,E),y.push(r.outputColorSpace)),y.push(E.customProgramCacheKey),y.join()}function v(E,y){E.push(y.precision),E.push(y.outputColorSpace),E.push(y.envMapMode),E.push(y.envMapCubeUVHeight),E.push(y.mapUv),E.push(y.alphaMapUv),E.push(y.lightMapUv),E.push(y.aoMapUv),E.push(y.bumpMapUv),E.push(y.normalMapUv),E.push(y.displacementMapUv),E.push(y.emissiveMapUv),E.push(y.metalnessMapUv),E.push(y.roughnessMapUv),E.push(y.anisotropyMapUv),E.push(y.clearcoatMapUv),E.push(y.clearcoatNormalMapUv),E.push(y.clearcoatRoughnessMapUv),E.push(y.iridescenceMapUv),E.push(y.iridescenceThicknessMapUv),E.push(y.sheenColorMapUv),E.push(y.sheenRoughnessMapUv),E.push(y.specularMapUv),E.push(y.specularColorMapUv),E.push(y.specularIntensityMapUv),E.push(y.transmissionMapUv),E.push(y.thicknessMapUv),E.push(y.combine),E.push(y.fogExp2),E.push(y.sizeAttenuation),E.push(y.morphTargetsCount),E.push(y.morphAttributeCount),E.push(y.numDirLights),E.push(y.numPointLights),E.push(y.numSpotLights),E.push(y.numSpotLightMaps),E.push(y.numHemiLights),E.push(y.numRectAreaLights),E.push(y.numDirLightShadows),E.push(y.numPointLightShadows),E.push(y.numSpotLightShadows),E.push(y.numSpotLightShadowsWithMaps),E.push(y.numLightProbes),E.push(y.shadowMapType),E.push(y.toneMapping),E.push(y.numClippingPlanes),E.push(y.numClipIntersection),E.push(y.depthPacking)}function x(E,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),E.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.skinning&&a.enable(4),y.morphTargets&&a.enable(5),y.morphNormals&&a.enable(6),y.morphColors&&a.enable(7),y.premultipliedAlpha&&a.enable(8),y.shadowMapEnabled&&a.enable(9),y.doubleSided&&a.enable(10),y.flipSided&&a.enable(11),y.useDepthPacking&&a.enable(12),y.dithering&&a.enable(13),y.transmission&&a.enable(14),y.sheen&&a.enable(15),y.opaque&&a.enable(16),y.pointsUvs&&a.enable(17),y.decodeVideoTexture&&a.enable(18),y.alphaToCoverage&&a.enable(19),E.push(a.mask)}function S(E){const y=m[E.type];let C;if(y){const z=cn[y];C=Cf.clone(z.uniforms)}else C=E.uniforms;return C}function P(E,y){let C;for(let z=0,N=h.length;z<N;z++){const O=h[z];if(O.cacheKey===y){C=O,++C.usedTimes;break}}return C===void 0&&(C=new V_(r,y,E,s),h.push(C)),C}function T(E){if(--E.usedTimes===0){const y=h.indexOf(E);h[y]=h[h.length-1],h.pop(),E.destroy()}}function w(E){c.remove(E)}function D(){c.dispose()}return{getParameters:p,getProgramCacheKey:g,getUniforms:S,acquireProgram:P,releaseProgram:T,releaseShaderCache:w,programs:h,dispose:D}}function q_(){let r=new WeakMap;function t(s){let o=r.get(s);return o===void 0&&(o={},r.set(s,o)),o}function e(s){r.delete(s)}function n(s,o,a){r.get(s)[o]=a}function i(){r=new WeakMap}return{get:t,remove:e,update:n,dispose:i}}function j_(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function _l(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function xl(){const r=[];let t=0;const e=[],n=[],i=[];function s(){t=0,e.length=0,n.length=0,i.length=0}function o(u,d,f,m,_,p){let g=r[t];return g===void 0?(g={id:u.id,object:u,geometry:d,material:f,groupOrder:m,renderOrder:u.renderOrder,z:_,group:p},r[t]=g):(g.id=u.id,g.object=u,g.geometry=d,g.material=f,g.groupOrder=m,g.renderOrder=u.renderOrder,g.z=_,g.group=p),t++,g}function a(u,d,f,m,_,p){const g=o(u,d,f,m,_,p);f.transmission>0?n.push(g):f.transparent===!0?i.push(g):e.push(g)}function c(u,d,f,m,_,p){const g=o(u,d,f,m,_,p);f.transmission>0?n.unshift(g):f.transparent===!0?i.unshift(g):e.unshift(g)}function l(u,d){e.length>1&&e.sort(u||j_),n.length>1&&n.sort(d||_l),i.length>1&&i.sort(d||_l)}function h(){for(let u=t,d=r.length;u<d;u++){const f=r[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:s,push:a,unshift:c,finish:h,sort:l}}function Y_(){let r=new WeakMap;function t(n,i){const s=r.get(n);let o;return s===void 0?(o=new xl,r.set(n,[o])):i>=s.length?(o=new xl,s.push(o)):o=s[i],o}function e(){r=new WeakMap}return{get:t,dispose:e}}function K_(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new A,color:new Mt};break;case"SpotLight":e={position:new A,direction:new A,color:new Mt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new A,color:new Mt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new A,skyColor:new Mt,groundColor:new Mt};break;case"RectAreaLight":e={color:new Mt,position:new A,halfWidth:new A,halfHeight:new A};break}return r[t.id]=e,e}}}function Z_(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Nt};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Nt};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Nt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}let $_=0;function J_(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function Q_(r){const t=new K_,e=Z_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new A);const i=new A,s=new Et,o=new Et;function a(l){let h=0,u=0,d=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let f=0,m=0,_=0,p=0,g=0,v=0,x=0,S=0,P=0,T=0,w=0;l.sort(J_);for(let E=0,y=l.length;E<y;E++){const C=l[E],z=C.color,N=C.intensity,O=C.distance,G=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)h+=z.r*N,u+=z.g*N,d+=z.b*N;else if(C.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(C.sh.coefficients[X],N);w++}else if(C.isDirectionalLight){const X=t.get(C);if(X.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const K=C.shadow,q=e.get(C);q.shadowBias=K.bias,q.shadowNormalBias=K.normalBias,q.shadowRadius=K.radius,q.shadowMapSize=K.mapSize,n.directionalShadow[f]=q,n.directionalShadowMap[f]=G,n.directionalShadowMatrix[f]=C.shadow.matrix,v++}n.directional[f]=X,f++}else if(C.isSpotLight){const X=t.get(C);X.position.setFromMatrixPosition(C.matrixWorld),X.color.copy(z).multiplyScalar(N),X.distance=O,X.coneCos=Math.cos(C.angle),X.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),X.decay=C.decay,n.spot[_]=X;const K=C.shadow;if(C.map&&(n.spotLightMap[P]=C.map,P++,K.updateMatrices(C),C.castShadow&&T++),n.spotLightMatrix[_]=K.matrix,C.castShadow){const q=e.get(C);q.shadowBias=K.bias,q.shadowNormalBias=K.normalBias,q.shadowRadius=K.radius,q.shadowMapSize=K.mapSize,n.spotShadow[_]=q,n.spotShadowMap[_]=G,S++}_++}else if(C.isRectAreaLight){const X=t.get(C);X.color.copy(z).multiplyScalar(N),X.halfWidth.set(C.width*.5,0,0),X.halfHeight.set(0,C.height*.5,0),n.rectArea[p]=X,p++}else if(C.isPointLight){const X=t.get(C);if(X.color.copy(C.color).multiplyScalar(C.intensity),X.distance=C.distance,X.decay=C.decay,C.castShadow){const K=C.shadow,q=e.get(C);q.shadowBias=K.bias,q.shadowNormalBias=K.normalBias,q.shadowRadius=K.radius,q.shadowMapSize=K.mapSize,q.shadowCameraNear=K.camera.near,q.shadowCameraFar=K.camera.far,n.pointShadow[m]=q,n.pointShadowMap[m]=G,n.pointShadowMatrix[m]=C.shadow.matrix,x++}n.point[m]=X,m++}else if(C.isHemisphereLight){const X=t.get(C);X.skyColor.copy(C.color).multiplyScalar(N),X.groundColor.copy(C.groundColor).multiplyScalar(N),n.hemi[g]=X,g++}}p>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=st.LTC_FLOAT_1,n.rectAreaLTC2=st.LTC_FLOAT_2):(n.rectAreaLTC1=st.LTC_HALF_1,n.rectAreaLTC2=st.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const D=n.hash;(D.directionalLength!==f||D.pointLength!==m||D.spotLength!==_||D.rectAreaLength!==p||D.hemiLength!==g||D.numDirectionalShadows!==v||D.numPointShadows!==x||D.numSpotShadows!==S||D.numSpotMaps!==P||D.numLightProbes!==w)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=p,n.point.length=m,n.hemi.length=g,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=S,n.spotShadowMap.length=S,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=S+P-T,n.spotLightMap.length=P,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=w,D.directionalLength=f,D.pointLength=m,D.spotLength=_,D.rectAreaLength=p,D.hemiLength=g,D.numDirectionalShadows=v,D.numPointShadows=x,D.numSpotShadows=S,D.numSpotMaps=P,D.numLightProbes=w,n.version=$_++)}function c(l,h){let u=0,d=0,f=0,m=0,_=0;const p=h.matrixWorldInverse;for(let g=0,v=l.length;g<v;g++){const x=l[g];if(x.isDirectionalLight){const S=n.directional[u];S.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),S.direction.sub(i),S.direction.transformDirection(p),u++}else if(x.isSpotLight){const S=n.spot[f];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(p),S.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),S.direction.sub(i),S.direction.transformDirection(p),f++}else if(x.isRectAreaLight){const S=n.rectArea[m];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(p),o.identity(),s.copy(x.matrixWorld),s.premultiply(p),o.extractRotation(s),S.halfWidth.set(x.width*.5,0,0),S.halfHeight.set(0,x.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),m++}else if(x.isPointLight){const S=n.point[d];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(p),d++}else if(x.isHemisphereLight){const S=n.hemi[_];S.direction.setFromMatrixPosition(x.matrixWorld),S.direction.transformDirection(p),_++}}}return{setup:a,setupView:c,state:n}}function vl(r){const t=new Q_(r),e=[],n=[];function i(h){l.camera=h,e.length=0,n.length=0}function s(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:a,setupLightsView:c,pushLight:s,pushShadow:o}}function t0(r){let t=new WeakMap;function e(i,s=0){const o=t.get(i);let a;return o===void 0?(a=new vl(r),t.set(i,[a])):s>=o.length?(a=new vl(r),o.push(a)):a=o[s],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class e0 extends Qe{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=zd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class n0 extends Qe{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const i0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,s0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function r0(r,t,e){let n=new Ia;const i=new Nt,s=new Nt,o=new te,a=new e0({depthPacking:Fd}),c=new n0,l={},h=e.maxTextureSize,u={[Pn]:Le,[Le]:Pn,[ln]:ln},d=new Zn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Nt},radius:{value:4}},vertexShader:i0,fragmentShader:s0}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const m=new ke;m.setAttribute("position",new de(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new It(m,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Uh;let g=this.type;this.render=function(T,w,D){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;const E=r.getRenderTarget(),y=r.getActiveCubeFace(),C=r.getActiveMipmapLevel(),z=r.state;z.setBlending(qn),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const N=g!==Tn&&this.type===Tn,O=g===Tn&&this.type!==Tn;for(let G=0,X=T.length;G<X;G++){const K=T[G],q=K.shadow;if(q===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;i.copy(q.mapSize);const ct=q.getFrameExtents();if(i.multiply(ct),s.copy(q.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/ct.x),i.x=s.x*ct.x,q.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/ct.y),i.y=s.y*ct.y,q.mapSize.y=s.y)),q.map===null||N===!0||O===!0){const nt=this.type!==Tn?{minFilter:Pe,magFilter:Pe}:{};q.map!==null&&q.map.dispose(),q.map=new _i(i.x,i.y,nt),q.map.texture.name=K.name+".shadowMap",q.camera.updateProjectionMatrix()}r.setRenderTarget(q.map),r.clear();const dt=q.getViewportCount();for(let nt=0;nt<dt;nt++){const pt=q.getViewport(nt);o.set(s.x*pt.x,s.y*pt.y,s.x*pt.z,s.y*pt.w),z.viewport(o),q.updateMatrices(K,nt),n=q.getFrustum(),S(w,D,q.camera,K,this.type)}q.isPointLightShadow!==!0&&this.type===Tn&&v(q,D),q.needsUpdate=!1}g=this.type,p.needsUpdate=!1,r.setRenderTarget(E,y,C)};function v(T,w){const D=t.update(_);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new _i(i.x,i.y)),d.uniforms.shadow_pass.value=T.map.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,r.setRenderTarget(T.mapPass),r.clear(),r.renderBufferDirect(w,null,D,d,_,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,r.setRenderTarget(T.map),r.clear(),r.renderBufferDirect(w,null,D,f,_,null)}function x(T,w,D,E){let y=null;const C=D.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(C!==void 0)y=C;else if(y=D.isPointLight===!0?c:a,r.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const z=y.uuid,N=w.uuid;let O=l[z];O===void 0&&(O={},l[z]=O);let G=O[N];G===void 0&&(G=y.clone(),O[N]=G,w.addEventListener("dispose",P)),y=G}if(y.visible=w.visible,y.wireframe=w.wireframe,E===Tn?y.side=w.shadowSide!==null?w.shadowSide:w.side:y.side=w.shadowSide!==null?w.shadowSide:u[w.side],y.alphaMap=w.alphaMap,y.alphaTest=w.alphaTest,y.map=w.map,y.clipShadows=w.clipShadows,y.clippingPlanes=w.clippingPlanes,y.clipIntersection=w.clipIntersection,y.displacementMap=w.displacementMap,y.displacementScale=w.displacementScale,y.displacementBias=w.displacementBias,y.wireframeLinewidth=w.wireframeLinewidth,y.linewidth=w.linewidth,D.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const z=r.properties.get(y);z.light=D}return y}function S(T,w,D,E,y){if(T.visible===!1)return;if(T.layers.test(w.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&y===Tn)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,T.matrixWorld);const N=t.update(T),O=T.material;if(Array.isArray(O)){const G=N.groups;for(let X=0,K=G.length;X<K;X++){const q=G[X],ct=O[q.materialIndex];if(ct&&ct.visible){const dt=x(T,ct,E,y);T.onBeforeShadow(r,T,w,D,N,dt,q),r.renderBufferDirect(D,null,N,dt,T,q),T.onAfterShadow(r,T,w,D,N,dt,q)}}}else if(O.visible){const G=x(T,O,E,y);T.onBeforeShadow(r,T,w,D,N,G,null),r.renderBufferDirect(D,null,N,G,T,null),T.onAfterShadow(r,T,w,D,N,G,null)}}const z=T.children;for(let N=0,O=z.length;N<O;N++)S(z[N],w,D,E,y)}function P(T){T.target.removeEventListener("dispose",P);for(const D in l){const E=l[D],y=T.target.uuid;y in E&&(E[y].dispose(),delete E[y])}}}function o0(r){function t(){let I=!1;const ht=new te;let j=null;const Z=new te(0,0,0,0);return{setMask:function(et){j!==et&&!I&&(r.colorMask(et,et,et,et),j=et)},setLocked:function(et){I=et},setClear:function(et,Pt,Xt,ce,ge){ge===!0&&(et*=ce,Pt*=ce,Xt*=ce),ht.set(et,Pt,Xt,ce),Z.equals(ht)===!1&&(r.clearColor(et,Pt,Xt,ce),Z.copy(ht))},reset:function(){I=!1,j=null,Z.set(-1,0,0,0)}}}function e(){let I=!1,ht=null,j=null,Z=null;return{setTest:function(et){et?rt(r.DEPTH_TEST):it(r.DEPTH_TEST)},setMask:function(et){ht!==et&&!I&&(r.depthMask(et),ht=et)},setFunc:function(et){if(j!==et){switch(et){case ld:r.depthFunc(r.NEVER);break;case hd:r.depthFunc(r.ALWAYS);break;case ud:r.depthFunc(r.LESS);break;case kr:r.depthFunc(r.LEQUAL);break;case dd:r.depthFunc(r.EQUAL);break;case fd:r.depthFunc(r.GEQUAL);break;case pd:r.depthFunc(r.GREATER);break;case md:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}j=et}},setLocked:function(et){I=et},setClear:function(et){Z!==et&&(r.clearDepth(et),Z=et)},reset:function(){I=!1,ht=null,j=null,Z=null}}}function n(){let I=!1,ht=null,j=null,Z=null,et=null,Pt=null,Xt=null,ce=null,ge=null;return{setTest:function($t){I||($t?rt(r.STENCIL_TEST):it(r.STENCIL_TEST))},setMask:function($t){ht!==$t&&!I&&(r.stencilMask($t),ht=$t)},setFunc:function($t,sn,rn){(j!==$t||Z!==sn||et!==rn)&&(r.stencilFunc($t,sn,rn),j=$t,Z=sn,et=rn)},setOp:function($t,sn,rn){(Pt!==$t||Xt!==sn||ce!==rn)&&(r.stencilOp($t,sn,rn),Pt=$t,Xt=sn,ce=rn)},setLocked:function($t){I=$t},setClear:function($t){ge!==$t&&(r.clearStencil($t),ge=$t)},reset:function(){I=!1,ht=null,j=null,Z=null,et=null,Pt=null,Xt=null,ce=null,ge=null}}}const i=new t,s=new e,o=new n,a=new WeakMap,c=new WeakMap;let l={},h={},u=new WeakMap,d=[],f=null,m=!1,_=null,p=null,g=null,v=null,x=null,S=null,P=null,T=new Mt(0,0,0),w=0,D=!1,E=null,y=null,C=null,z=null,N=null;const O=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,X=0;const K=r.getParameter(r.VERSION);K.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(K)[1]),G=X>=1):K.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),G=X>=2);let q=null,ct={};const dt=r.getParameter(r.SCISSOR_BOX),nt=r.getParameter(r.VIEWPORT),pt=new te().fromArray(dt),Rt=new te().fromArray(nt);function H(I,ht,j,Z){const et=new Uint8Array(4),Pt=r.createTexture();r.bindTexture(I,Pt),r.texParameteri(I,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(I,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Xt=0;Xt<j;Xt++)I===r.TEXTURE_3D||I===r.TEXTURE_2D_ARRAY?r.texImage3D(ht,0,r.RGBA,1,1,Z,0,r.RGBA,r.UNSIGNED_BYTE,et):r.texImage2D(ht+Xt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,et);return Pt}const $={};$[r.TEXTURE_2D]=H(r.TEXTURE_2D,r.TEXTURE_2D,1),$[r.TEXTURE_CUBE_MAP]=H(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[r.TEXTURE_2D_ARRAY]=H(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),$[r.TEXTURE_3D]=H(r.TEXTURE_3D,r.TEXTURE_3D,1,1),i.setClear(0,0,0,1),s.setClear(1),o.setClear(0),rt(r.DEPTH_TEST),s.setFunc(kr),St(!1),Wt(Ja),rt(r.CULL_FACE),Bt(qn);function rt(I){l[I]!==!0&&(r.enable(I),l[I]=!0)}function it(I){l[I]!==!1&&(r.disable(I),l[I]=!1)}function xt(I,ht){return h[I]!==ht?(r.bindFramebuffer(I,ht),h[I]=ht,I===r.DRAW_FRAMEBUFFER&&(h[r.FRAMEBUFFER]=ht),I===r.FRAMEBUFFER&&(h[r.DRAW_FRAMEBUFFER]=ht),!0):!1}function gt(I,ht){let j=d,Z=!1;if(I){j=u.get(ht),j===void 0&&(j=[],u.set(ht,j));const et=I.textures;if(j.length!==et.length||j[0]!==r.COLOR_ATTACHMENT0){for(let Pt=0,Xt=et.length;Pt<Xt;Pt++)j[Pt]=r.COLOR_ATTACHMENT0+Pt;j.length=et.length,Z=!0}}else j[0]!==r.BACK&&(j[0]=r.BACK,Z=!0);Z&&r.drawBuffers(j)}function At(I){return f!==I?(r.useProgram(I),f=I,!0):!1}const L={[pi]:r.FUNC_ADD,[qu]:r.FUNC_SUBTRACT,[ju]:r.FUNC_REVERSE_SUBTRACT};L[Yu]=r.MIN,L[Ku]=r.MAX;const zt={[Zu]:r.ZERO,[$u]:r.ONE,[Ju]:r.SRC_COLOR,[ca]:r.SRC_ALPHA,[sd]:r.SRC_ALPHA_SATURATE,[nd]:r.DST_COLOR,[td]:r.DST_ALPHA,[Qu]:r.ONE_MINUS_SRC_COLOR,[la]:r.ONE_MINUS_SRC_ALPHA,[id]:r.ONE_MINUS_DST_COLOR,[ed]:r.ONE_MINUS_DST_ALPHA,[rd]:r.CONSTANT_COLOR,[od]:r.ONE_MINUS_CONSTANT_COLOR,[ad]:r.CONSTANT_ALPHA,[cd]:r.ONE_MINUS_CONSTANT_ALPHA};function Bt(I,ht,j,Z,et,Pt,Xt,ce,ge,$t){if(I===qn){m===!0&&(it(r.BLEND),m=!1);return}if(m===!1&&(rt(r.BLEND),m=!0),I!==Xu){if(I!==_||$t!==D){if((p!==pi||x!==pi)&&(r.blendEquation(r.FUNC_ADD),p=pi,x=pi),$t)switch(I){case Gi:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Or:r.blendFunc(r.ONE,r.ONE);break;case Qa:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case tc:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case Gi:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Or:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case Qa:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case tc:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}g=null,v=null,S=null,P=null,T.set(0,0,0),w=0,_=I,D=$t}return}et=et||ht,Pt=Pt||j,Xt=Xt||Z,(ht!==p||et!==x)&&(r.blendEquationSeparate(L[ht],L[et]),p=ht,x=et),(j!==g||Z!==v||Pt!==S||Xt!==P)&&(r.blendFuncSeparate(zt[j],zt[Z],zt[Pt],zt[Xt]),g=j,v=Z,S=Pt,P=Xt),(ce.equals(T)===!1||ge!==w)&&(r.blendColor(ce.r,ce.g,ce.b,ge),T.copy(ce),w=ge),_=I,D=!1}function Qt(I,ht){I.side===ln?it(r.CULL_FACE):rt(r.CULL_FACE);let j=I.side===Le;ht&&(j=!j),St(j),I.blending===Gi&&I.transparent===!1?Bt(qn):Bt(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),s.setFunc(I.depthFunc),s.setTest(I.depthTest),s.setMask(I.depthWrite),i.setMask(I.colorWrite);const Z=I.stencilWrite;o.setTest(Z),Z&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),Lt(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?rt(r.SAMPLE_ALPHA_TO_COVERAGE):it(r.SAMPLE_ALPHA_TO_COVERAGE)}function St(I){E!==I&&(I?r.frontFace(r.CW):r.frontFace(r.CCW),E=I)}function Wt(I){I!==Hu?(rt(r.CULL_FACE),I!==y&&(I===Ja?r.cullFace(r.BACK):I===Gu?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):it(r.CULL_FACE),y=I}function Ft(I){I!==C&&(G&&r.lineWidth(I),C=I)}function Lt(I,ht,j){I?(rt(r.POLYGON_OFFSET_FILL),(z!==ht||N!==j)&&(r.polygonOffset(ht,j),z=ht,N=j)):it(r.POLYGON_OFFSET_FILL)}function ee(I){I?rt(r.SCISSOR_TEST):it(r.SCISSOR_TEST)}function R(I){I===void 0&&(I=r.TEXTURE0+O-1),q!==I&&(r.activeTexture(I),q=I)}function M(I,ht,j){j===void 0&&(q===null?j=r.TEXTURE0+O-1:j=q);let Z=ct[j];Z===void 0&&(Z={type:void 0,texture:void 0},ct[j]=Z),(Z.type!==I||Z.texture!==ht)&&(q!==j&&(r.activeTexture(j),q=j),r.bindTexture(I,ht||$[I]),Z.type=I,Z.texture=ht)}function k(){const I=ct[q];I!==void 0&&I.type!==void 0&&(r.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function W(){try{r.compressedTexImage2D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Y(){try{r.compressedTexImage3D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function J(){try{r.texSubImage2D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function yt(){try{r.texSubImage3D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ot(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function at(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ot(){try{r.texStorage2D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Q(){try{r.texStorage3D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function _t(){try{r.texImage2D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ht(){try{r.texImage3D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ct(I){pt.equals(I)===!1&&(r.scissor(I.x,I.y,I.z,I.w),pt.copy(I))}function lt(I){Rt.equals(I)===!1&&(r.viewport(I.x,I.y,I.z,I.w),Rt.copy(I))}function kt(I,ht){let j=c.get(ht);j===void 0&&(j=new WeakMap,c.set(ht,j));let Z=j.get(I);Z===void 0&&(Z=r.getUniformBlockIndex(ht,I.name),j.set(I,Z))}function Gt(I,ht){const Z=c.get(ht).get(I);a.get(ht)!==Z&&(r.uniformBlockBinding(ht,Z,I.__bindingPointIndex),a.set(ht,Z))}function ae(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),l={},q=null,ct={},h={},u=new WeakMap,d=[],f=null,m=!1,_=null,p=null,g=null,v=null,x=null,S=null,P=null,T=new Mt(0,0,0),w=0,D=!1,E=null,y=null,C=null,z=null,N=null,pt.set(0,0,r.canvas.width,r.canvas.height),Rt.set(0,0,r.canvas.width,r.canvas.height),i.reset(),s.reset(),o.reset()}return{buffers:{color:i,depth:s,stencil:o},enable:rt,disable:it,bindFramebuffer:xt,drawBuffers:gt,useProgram:At,setBlending:Bt,setMaterial:Qt,setFlipSided:St,setCullFace:Wt,setLineWidth:Ft,setPolygonOffset:Lt,setScissorTest:ee,activeTexture:R,bindTexture:M,unbindTexture:k,compressedTexImage2D:W,compressedTexImage3D:Y,texImage2D:_t,texImage3D:Ht,updateUBOMapping:kt,uniformBlockBinding:Gt,texStorage2D:Ot,texStorage3D:Q,texSubImage2D:J,texSubImage3D:yt,compressedTexSubImage2D:ot,compressedTexSubImage3D:at,scissor:Ct,viewport:lt,reset:ae}}function a0(r,t,e,n,i,s,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Nt,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(R,M){return f?new OffscreenCanvas(R,M):Fs("canvas")}function _(R,M,k){let W=1;const Y=ee(R);if((Y.width>k||Y.height>k)&&(W=k/Math.max(Y.width,Y.height)),W<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const J=Math.floor(W*Y.width),yt=Math.floor(W*Y.height);u===void 0&&(u=m(J,yt));const ot=M?m(J,yt):u;return ot.width=J,ot.height=yt,ot.getContext("2d").drawImage(R,0,0,J,yt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+J+"x"+yt+")."),ot}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),R;return R}function p(R){return R.generateMipmaps&&R.minFilter!==Pe&&R.minFilter!==ze}function g(R){r.generateMipmap(R)}function v(R,M,k,W,Y=!1){if(R!==null){if(r[R]!==void 0)return r[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let J=M;if(M===r.RED&&(k===r.FLOAT&&(J=r.R32F),k===r.HALF_FLOAT&&(J=r.R16F),k===r.UNSIGNED_BYTE&&(J=r.R8)),M===r.RED_INTEGER&&(k===r.UNSIGNED_BYTE&&(J=r.R8UI),k===r.UNSIGNED_SHORT&&(J=r.R16UI),k===r.UNSIGNED_INT&&(J=r.R32UI),k===r.BYTE&&(J=r.R8I),k===r.SHORT&&(J=r.R16I),k===r.INT&&(J=r.R32I)),M===r.RG&&(k===r.FLOAT&&(J=r.RG32F),k===r.HALF_FLOAT&&(J=r.RG16F),k===r.UNSIGNED_BYTE&&(J=r.RG8)),M===r.RG_INTEGER&&(k===r.UNSIGNED_BYTE&&(J=r.RG8UI),k===r.UNSIGNED_SHORT&&(J=r.RG16UI),k===r.UNSIGNED_INT&&(J=r.RG32UI),k===r.BYTE&&(J=r.RG8I),k===r.SHORT&&(J=r.RG16I),k===r.INT&&(J=r.RG32I)),M===r.RGB&&k===r.UNSIGNED_INT_5_9_9_9_REV&&(J=r.RGB9_E5),M===r.RGBA){const yt=Y?Hr:qt.getTransfer(W);k===r.FLOAT&&(J=r.RGBA32F),k===r.HALF_FLOAT&&(J=r.RGBA16F),k===r.UNSIGNED_BYTE&&(J=yt===ne?r.SRGB8_ALPHA8:r.RGBA8),k===r.UNSIGNED_SHORT_4_4_4_4&&(J=r.RGBA4),k===r.UNSIGNED_SHORT_5_5_5_1&&(J=r.RGB5_A1)}return(J===r.R16F||J===r.R32F||J===r.RG16F||J===r.RG32F||J===r.RGBA16F||J===r.RGBA32F)&&t.get("EXT_color_buffer_float"),J}function x(R,M){let k;return R?M===null||M===Zi||M===$i?k=r.DEPTH24_STENCIL8:M===un?k=r.DEPTH32F_STENCIL8:M===Vr&&(k=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Zi||M===$i?k=r.DEPTH_COMPONENT24:M===un?k=r.DEPTH_COMPONENT32F:M===Vr&&(k=r.DEPTH_COMPONENT16),k}function S(R,M){return p(R)===!0||R.isFramebufferTexture&&R.minFilter!==Pe&&R.minFilter!==ze?Math.log2(Math.max(M.width,M.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?M.mipmaps.length:1}function P(R){const M=R.target;M.removeEventListener("dispose",P),w(M),M.isVideoTexture&&h.delete(M)}function T(R){const M=R.target;M.removeEventListener("dispose",T),E(M)}function w(R){const M=n.get(R);if(M.__webglInit===void 0)return;const k=R.source,W=d.get(k);if(W){const Y=W[M.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&D(R),Object.keys(W).length===0&&d.delete(k)}n.remove(R)}function D(R){const M=n.get(R);r.deleteTexture(M.__webglTexture);const k=R.source,W=d.get(k);delete W[M.__cacheKey],o.memory.textures--}function E(R){const M=n.get(R);if(R.depthTexture&&R.depthTexture.dispose(),R.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(M.__webglFramebuffer[W]))for(let Y=0;Y<M.__webglFramebuffer[W].length;Y++)r.deleteFramebuffer(M.__webglFramebuffer[W][Y]);else r.deleteFramebuffer(M.__webglFramebuffer[W]);M.__webglDepthbuffer&&r.deleteRenderbuffer(M.__webglDepthbuffer[W])}else{if(Array.isArray(M.__webglFramebuffer))for(let W=0;W<M.__webglFramebuffer.length;W++)r.deleteFramebuffer(M.__webglFramebuffer[W]);else r.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&r.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&r.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let W=0;W<M.__webglColorRenderbuffer.length;W++)M.__webglColorRenderbuffer[W]&&r.deleteRenderbuffer(M.__webglColorRenderbuffer[W]);M.__webglDepthRenderbuffer&&r.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const k=R.textures;for(let W=0,Y=k.length;W<Y;W++){const J=n.get(k[W]);J.__webglTexture&&(r.deleteTexture(J.__webglTexture),o.memory.textures--),n.remove(k[W])}n.remove(R)}let y=0;function C(){y=0}function z(){const R=y;return R>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+i.maxTextures),y+=1,R}function N(R){const M=[];return M.push(R.wrapS),M.push(R.wrapT),M.push(R.wrapR||0),M.push(R.magFilter),M.push(R.minFilter),M.push(R.anisotropy),M.push(R.internalFormat),M.push(R.format),M.push(R.type),M.push(R.generateMipmaps),M.push(R.premultiplyAlpha),M.push(R.flipY),M.push(R.unpackAlignment),M.push(R.colorSpace),M.join()}function O(R,M){const k=n.get(R);if(R.isVideoTexture&&Ft(R),R.isRenderTargetTexture===!1&&R.version>0&&k.__version!==R.version){const W=R.image;if(W===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Rt(k,R,M);return}}e.bindTexture(r.TEXTURE_2D,k.__webglTexture,r.TEXTURE0+M)}function G(R,M){const k=n.get(R);if(R.version>0&&k.__version!==R.version){Rt(k,R,M);return}e.bindTexture(r.TEXTURE_2D_ARRAY,k.__webglTexture,r.TEXTURE0+M)}function X(R,M){const k=n.get(R);if(R.version>0&&k.__version!==R.version){Rt(k,R,M);return}e.bindTexture(r.TEXTURE_3D,k.__webglTexture,r.TEXTURE0+M)}function K(R,M){const k=n.get(R);if(R.version>0&&k.__version!==R.version){H(k,R,M);return}e.bindTexture(r.TEXTURE_CUBE_MAP,k.__webglTexture,r.TEXTURE0+M)}const q={[Ki]:r.REPEAT,[Wn]:r.CLAMP_TO_EDGE,[Br]:r.MIRRORED_REPEAT},ct={[Pe]:r.NEAREST,[Fh]:r.NEAREST_MIPMAP_NEAREST,[ws]:r.NEAREST_MIPMAP_LINEAR,[ze]:r.LINEAR,[Ur]:r.LINEAR_MIPMAP_NEAREST,[Rn]:r.LINEAR_MIPMAP_LINEAR},dt={[kd]:r.NEVER,[Xd]:r.ALWAYS,[Bd]:r.LESS,[qh]:r.LEQUAL,[Vd]:r.EQUAL,[Wd]:r.GEQUAL,[Hd]:r.GREATER,[Gd]:r.NOTEQUAL};function nt(R,M){if(M.type===un&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===ze||M.magFilter===Ur||M.magFilter===ws||M.magFilter===Rn||M.minFilter===ze||M.minFilter===Ur||M.minFilter===ws||M.minFilter===Rn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(R,r.TEXTURE_WRAP_S,q[M.wrapS]),r.texParameteri(R,r.TEXTURE_WRAP_T,q[M.wrapT]),(R===r.TEXTURE_3D||R===r.TEXTURE_2D_ARRAY)&&r.texParameteri(R,r.TEXTURE_WRAP_R,q[M.wrapR]),r.texParameteri(R,r.TEXTURE_MAG_FILTER,ct[M.magFilter]),r.texParameteri(R,r.TEXTURE_MIN_FILTER,ct[M.minFilter]),M.compareFunction&&(r.texParameteri(R,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(R,r.TEXTURE_COMPARE_FUNC,dt[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Pe||M.minFilter!==ws&&M.minFilter!==Rn||M.type===un&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const k=t.get("EXT_texture_filter_anisotropic");r.texParameterf(R,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,i.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function pt(R,M){let k=!1;R.__webglInit===void 0&&(R.__webglInit=!0,M.addEventListener("dispose",P));const W=M.source;let Y=d.get(W);Y===void 0&&(Y={},d.set(W,Y));const J=N(M);if(J!==R.__cacheKey){Y[J]===void 0&&(Y[J]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,k=!0),Y[J].usedTimes++;const yt=Y[R.__cacheKey];yt!==void 0&&(Y[R.__cacheKey].usedTimes--,yt.usedTimes===0&&D(M)),R.__cacheKey=J,R.__webglTexture=Y[J].texture}return k}function Rt(R,M,k){let W=r.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(W=r.TEXTURE_2D_ARRAY),M.isData3DTexture&&(W=r.TEXTURE_3D);const Y=pt(R,M),J=M.source;e.bindTexture(W,R.__webglTexture,r.TEXTURE0+k);const yt=n.get(J);if(J.version!==yt.__version||Y===!0){e.activeTexture(r.TEXTURE0+k);const ot=qt.getPrimaries(qt.workingColorSpace),at=M.colorSpace===Gn?null:qt.getPrimaries(M.colorSpace),Ot=M.colorSpace===Gn||ot===at?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,M.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,M.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ot);let Q=_(M.image,!1,i.maxTextureSize);Q=Lt(M,Q);const _t=s.convert(M.format,M.colorSpace),Ht=s.convert(M.type);let Ct=v(M.internalFormat,_t,Ht,M.colorSpace,M.isVideoTexture);nt(W,M);let lt;const kt=M.mipmaps,Gt=M.isVideoTexture!==!0,ae=yt.__version===void 0||Y===!0,I=J.dataReady,ht=S(M,Q);if(M.isDepthTexture)Ct=x(M.format===Ji,M.type),ae&&(Gt?e.texStorage2D(r.TEXTURE_2D,1,Ct,Q.width,Q.height):e.texImage2D(r.TEXTURE_2D,0,Ct,Q.width,Q.height,0,_t,Ht,null));else if(M.isDataTexture)if(kt.length>0){Gt&&ae&&e.texStorage2D(r.TEXTURE_2D,ht,Ct,kt[0].width,kt[0].height);for(let j=0,Z=kt.length;j<Z;j++)lt=kt[j],Gt?I&&e.texSubImage2D(r.TEXTURE_2D,j,0,0,lt.width,lt.height,_t,Ht,lt.data):e.texImage2D(r.TEXTURE_2D,j,Ct,lt.width,lt.height,0,_t,Ht,lt.data);M.generateMipmaps=!1}else Gt?(ae&&e.texStorage2D(r.TEXTURE_2D,ht,Ct,Q.width,Q.height),I&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,Q.width,Q.height,_t,Ht,Q.data)):e.texImage2D(r.TEXTURE_2D,0,Ct,Q.width,Q.height,0,_t,Ht,Q.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Gt&&ae&&e.texStorage3D(r.TEXTURE_2D_ARRAY,ht,Ct,kt[0].width,kt[0].height,Q.depth);for(let j=0,Z=kt.length;j<Z;j++)if(lt=kt[j],M.format!==Ze)if(_t!==null)if(Gt){if(I)if(M.layerUpdates.size>0){for(const et of M.layerUpdates){const Pt=lt.width*lt.height;e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,j,0,0,et,lt.width,lt.height,1,_t,lt.data.slice(Pt*et,Pt*(et+1)),0,0)}M.clearLayerUpdates()}else e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,j,0,0,0,lt.width,lt.height,Q.depth,_t,lt.data,0,0)}else e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,j,Ct,lt.width,lt.height,Q.depth,0,lt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Gt?I&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,j,0,0,0,lt.width,lt.height,Q.depth,_t,Ht,lt.data):e.texImage3D(r.TEXTURE_2D_ARRAY,j,Ct,lt.width,lt.height,Q.depth,0,_t,Ht,lt.data)}else{Gt&&ae&&e.texStorage2D(r.TEXTURE_2D,ht,Ct,kt[0].width,kt[0].height);for(let j=0,Z=kt.length;j<Z;j++)lt=kt[j],M.format!==Ze?_t!==null?Gt?I&&e.compressedTexSubImage2D(r.TEXTURE_2D,j,0,0,lt.width,lt.height,_t,lt.data):e.compressedTexImage2D(r.TEXTURE_2D,j,Ct,lt.width,lt.height,0,lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Gt?I&&e.texSubImage2D(r.TEXTURE_2D,j,0,0,lt.width,lt.height,_t,Ht,lt.data):e.texImage2D(r.TEXTURE_2D,j,Ct,lt.width,lt.height,0,_t,Ht,lt.data)}else if(M.isDataArrayTexture)if(Gt){if(ae&&e.texStorage3D(r.TEXTURE_2D_ARRAY,ht,Ct,Q.width,Q.height,Q.depth),I)if(M.layerUpdates.size>0){let j;switch(Ht){case r.UNSIGNED_BYTE:switch(_t){case r.ALPHA:j=1;break;case r.LUMINANCE:j=1;break;case r.LUMINANCE_ALPHA:j=2;break;case r.RGB:j=3;break;case r.RGBA:j=4;break;default:throw new Error(`Unknown texel size for format ${_t}.`)}break;case r.UNSIGNED_SHORT_4_4_4_4:case r.UNSIGNED_SHORT_5_5_5_1:case r.UNSIGNED_SHORT_5_6_5:j=1;break;default:throw new Error(`Unknown texel size for type ${Ht}.`)}const Z=Q.width*Q.height*j;for(const et of M.layerUpdates)e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,et,Q.width,Q.height,1,_t,Ht,Q.data.slice(Z*et,Z*(et+1)));M.clearLayerUpdates()}else e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,_t,Ht,Q.data)}else e.texImage3D(r.TEXTURE_2D_ARRAY,0,Ct,Q.width,Q.height,Q.depth,0,_t,Ht,Q.data);else if(M.isData3DTexture)Gt?(ae&&e.texStorage3D(r.TEXTURE_3D,ht,Ct,Q.width,Q.height,Q.depth),I&&e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,_t,Ht,Q.data)):e.texImage3D(r.TEXTURE_3D,0,Ct,Q.width,Q.height,Q.depth,0,_t,Ht,Q.data);else if(M.isFramebufferTexture){if(ae)if(Gt)e.texStorage2D(r.TEXTURE_2D,ht,Ct,Q.width,Q.height);else{let j=Q.width,Z=Q.height;for(let et=0;et<ht;et++)e.texImage2D(r.TEXTURE_2D,et,Ct,j,Z,0,_t,Ht,null),j>>=1,Z>>=1}}else if(kt.length>0){if(Gt&&ae){const j=ee(kt[0]);e.texStorage2D(r.TEXTURE_2D,ht,Ct,j.width,j.height)}for(let j=0,Z=kt.length;j<Z;j++)lt=kt[j],Gt?I&&e.texSubImage2D(r.TEXTURE_2D,j,0,0,_t,Ht,lt):e.texImage2D(r.TEXTURE_2D,j,Ct,_t,Ht,lt);M.generateMipmaps=!1}else if(Gt){if(ae){const j=ee(Q);e.texStorage2D(r.TEXTURE_2D,ht,Ct,j.width,j.height)}I&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,_t,Ht,Q)}else e.texImage2D(r.TEXTURE_2D,0,Ct,_t,Ht,Q);p(M)&&g(W),yt.__version=J.version,M.onUpdate&&M.onUpdate(M)}R.__version=M.version}function H(R,M,k){if(M.image.length!==6)return;const W=pt(R,M),Y=M.source;e.bindTexture(r.TEXTURE_CUBE_MAP,R.__webglTexture,r.TEXTURE0+k);const J=n.get(Y);if(Y.version!==J.__version||W===!0){e.activeTexture(r.TEXTURE0+k);const yt=qt.getPrimaries(qt.workingColorSpace),ot=M.colorSpace===Gn?null:qt.getPrimaries(M.colorSpace),at=M.colorSpace===Gn||yt===ot?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,M.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,M.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,at);const Ot=M.isCompressedTexture||M.image[0].isCompressedTexture,Q=M.image[0]&&M.image[0].isDataTexture,_t=[];for(let Z=0;Z<6;Z++)!Ot&&!Q?_t[Z]=_(M.image[Z],!0,i.maxCubemapSize):_t[Z]=Q?M.image[Z].image:M.image[Z],_t[Z]=Lt(M,_t[Z]);const Ht=_t[0],Ct=s.convert(M.format,M.colorSpace),lt=s.convert(M.type),kt=v(M.internalFormat,Ct,lt,M.colorSpace),Gt=M.isVideoTexture!==!0,ae=J.__version===void 0||W===!0,I=Y.dataReady;let ht=S(M,Ht);nt(r.TEXTURE_CUBE_MAP,M);let j;if(Ot){Gt&&ae&&e.texStorage2D(r.TEXTURE_CUBE_MAP,ht,kt,Ht.width,Ht.height);for(let Z=0;Z<6;Z++){j=_t[Z].mipmaps;for(let et=0;et<j.length;et++){const Pt=j[et];M.format!==Ze?Ct!==null?Gt?I&&e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,et,0,0,Pt.width,Pt.height,Ct,Pt.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,et,kt,Pt.width,Pt.height,0,Pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Gt?I&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,et,0,0,Pt.width,Pt.height,Ct,lt,Pt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,et,kt,Pt.width,Pt.height,0,Ct,lt,Pt.data)}}}else{if(j=M.mipmaps,Gt&&ae){j.length>0&&ht++;const Z=ee(_t[0]);e.texStorage2D(r.TEXTURE_CUBE_MAP,ht,kt,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(Q){Gt?I&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,_t[Z].width,_t[Z].height,Ct,lt,_t[Z].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,kt,_t[Z].width,_t[Z].height,0,Ct,lt,_t[Z].data);for(let et=0;et<j.length;et++){const Xt=j[et].image[Z].image;Gt?I&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,et+1,0,0,Xt.width,Xt.height,Ct,lt,Xt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,et+1,kt,Xt.width,Xt.height,0,Ct,lt,Xt.data)}}else{Gt?I&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,Ct,lt,_t[Z]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,kt,Ct,lt,_t[Z]);for(let et=0;et<j.length;et++){const Pt=j[et];Gt?I&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,et+1,0,0,Ct,lt,Pt.image[Z]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,et+1,kt,Ct,lt,Pt.image[Z])}}}p(M)&&g(r.TEXTURE_CUBE_MAP),J.__version=Y.version,M.onUpdate&&M.onUpdate(M)}R.__version=M.version}function $(R,M,k,W,Y,J){const yt=s.convert(k.format,k.colorSpace),ot=s.convert(k.type),at=v(k.internalFormat,yt,ot,k.colorSpace);if(!n.get(M).__hasExternalTextures){const Q=Math.max(1,M.width>>J),_t=Math.max(1,M.height>>J);Y===r.TEXTURE_3D||Y===r.TEXTURE_2D_ARRAY?e.texImage3D(Y,J,at,Q,_t,M.depth,0,yt,ot,null):e.texImage2D(Y,J,at,Q,_t,0,yt,ot,null)}e.bindFramebuffer(r.FRAMEBUFFER,R),Wt(M)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,W,Y,n.get(k).__webglTexture,0,St(M)):(Y===r.TEXTURE_2D||Y>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,W,Y,n.get(k).__webglTexture,J),e.bindFramebuffer(r.FRAMEBUFFER,null)}function rt(R,M,k){if(r.bindRenderbuffer(r.RENDERBUFFER,R),M.depthBuffer){const W=M.depthTexture,Y=W&&W.isDepthTexture?W.type:null,J=x(M.stencilBuffer,Y),yt=M.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ot=St(M);Wt(M)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ot,J,M.width,M.height):k?r.renderbufferStorageMultisample(r.RENDERBUFFER,ot,J,M.width,M.height):r.renderbufferStorage(r.RENDERBUFFER,J,M.width,M.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,yt,r.RENDERBUFFER,R)}else{const W=M.textures;for(let Y=0;Y<W.length;Y++){const J=W[Y],yt=s.convert(J.format,J.colorSpace),ot=s.convert(J.type),at=v(J.internalFormat,yt,ot,J.colorSpace),Ot=St(M);k&&Wt(M)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Ot,at,M.width,M.height):Wt(M)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Ot,at,M.width,M.height):r.renderbufferStorage(r.RENDERBUFFER,at,M.width,M.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function it(R,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(r.FRAMEBUFFER,R),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),O(M.depthTexture,0);const W=n.get(M.depthTexture).__webglTexture,Y=St(M);if(M.depthTexture.format===Wi)Wt(M)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,W,0,Y):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,W,0);else if(M.depthTexture.format===Ji)Wt(M)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,W,0,Y):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,W,0);else throw new Error("Unknown depthTexture format")}function xt(R){const M=n.get(R),k=R.isWebGLCubeRenderTarget===!0;if(R.depthTexture&&!M.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");it(M.__webglFramebuffer,R)}else if(k){M.__webglDepthbuffer=[];for(let W=0;W<6;W++)e.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer[W]),M.__webglDepthbuffer[W]=r.createRenderbuffer(),rt(M.__webglDepthbuffer[W],R,!1)}else e.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer=r.createRenderbuffer(),rt(M.__webglDepthbuffer,R,!1);e.bindFramebuffer(r.FRAMEBUFFER,null)}function gt(R,M,k){const W=n.get(R);M!==void 0&&$(W.__webglFramebuffer,R,R.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),k!==void 0&&xt(R)}function At(R){const M=R.texture,k=n.get(R),W=n.get(M);R.addEventListener("dispose",T);const Y=R.textures,J=R.isWebGLCubeRenderTarget===!0,yt=Y.length>1;if(yt||(W.__webglTexture===void 0&&(W.__webglTexture=r.createTexture()),W.__version=M.version,o.memory.textures++),J){k.__webglFramebuffer=[];for(let ot=0;ot<6;ot++)if(M.mipmaps&&M.mipmaps.length>0){k.__webglFramebuffer[ot]=[];for(let at=0;at<M.mipmaps.length;at++)k.__webglFramebuffer[ot][at]=r.createFramebuffer()}else k.__webglFramebuffer[ot]=r.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){k.__webglFramebuffer=[];for(let ot=0;ot<M.mipmaps.length;ot++)k.__webglFramebuffer[ot]=r.createFramebuffer()}else k.__webglFramebuffer=r.createFramebuffer();if(yt)for(let ot=0,at=Y.length;ot<at;ot++){const Ot=n.get(Y[ot]);Ot.__webglTexture===void 0&&(Ot.__webglTexture=r.createTexture(),o.memory.textures++)}if(R.samples>0&&Wt(R)===!1){k.__webglMultisampledFramebuffer=r.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let ot=0;ot<Y.length;ot++){const at=Y[ot];k.__webglColorRenderbuffer[ot]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,k.__webglColorRenderbuffer[ot]);const Ot=s.convert(at.format,at.colorSpace),Q=s.convert(at.type),_t=v(at.internalFormat,Ot,Q,at.colorSpace,R.isXRRenderTarget===!0),Ht=St(R);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ht,_t,R.width,R.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ot,r.RENDERBUFFER,k.__webglColorRenderbuffer[ot])}r.bindRenderbuffer(r.RENDERBUFFER,null),R.depthBuffer&&(k.__webglDepthRenderbuffer=r.createRenderbuffer(),rt(k.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if(J){e.bindTexture(r.TEXTURE_CUBE_MAP,W.__webglTexture),nt(r.TEXTURE_CUBE_MAP,M);for(let ot=0;ot<6;ot++)if(M.mipmaps&&M.mipmaps.length>0)for(let at=0;at<M.mipmaps.length;at++)$(k.__webglFramebuffer[ot][at],R,M,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ot,at);else $(k.__webglFramebuffer[ot],R,M,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0);p(M)&&g(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(yt){for(let ot=0,at=Y.length;ot<at;ot++){const Ot=Y[ot],Q=n.get(Ot);e.bindTexture(r.TEXTURE_2D,Q.__webglTexture),nt(r.TEXTURE_2D,Ot),$(k.__webglFramebuffer,R,Ot,r.COLOR_ATTACHMENT0+ot,r.TEXTURE_2D,0),p(Ot)&&g(r.TEXTURE_2D)}e.unbindTexture()}else{let ot=r.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ot=R.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(ot,W.__webglTexture),nt(ot,M),M.mipmaps&&M.mipmaps.length>0)for(let at=0;at<M.mipmaps.length;at++)$(k.__webglFramebuffer[at],R,M,r.COLOR_ATTACHMENT0,ot,at);else $(k.__webglFramebuffer,R,M,r.COLOR_ATTACHMENT0,ot,0);p(M)&&g(ot),e.unbindTexture()}R.depthBuffer&&xt(R)}function L(R){const M=R.textures;for(let k=0,W=M.length;k<W;k++){const Y=M[k];if(p(Y)){const J=R.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,yt=n.get(Y).__webglTexture;e.bindTexture(J,yt),g(J),e.unbindTexture()}}}const zt=[],Bt=[];function Qt(R){if(R.samples>0){if(Wt(R)===!1){const M=R.textures,k=R.width,W=R.height;let Y=r.COLOR_BUFFER_BIT;const J=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,yt=n.get(R),ot=M.length>1;if(ot)for(let at=0;at<M.length;at++)e.bindFramebuffer(r.FRAMEBUFFER,yt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+at,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,yt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+at,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,yt.__webglMultisampledFramebuffer),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,yt.__webglFramebuffer);for(let at=0;at<M.length;at++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(Y|=r.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(Y|=r.STENCIL_BUFFER_BIT)),ot){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,yt.__webglColorRenderbuffer[at]);const Ot=n.get(M[at]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Ot,0)}r.blitFramebuffer(0,0,k,W,0,0,k,W,Y,r.NEAREST),c===!0&&(zt.length=0,Bt.length=0,zt.push(r.COLOR_ATTACHMENT0+at),R.depthBuffer&&R.resolveDepthBuffer===!1&&(zt.push(J),Bt.push(J),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,Bt)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,zt))}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ot)for(let at=0;at<M.length;at++){e.bindFramebuffer(r.FRAMEBUFFER,yt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+at,r.RENDERBUFFER,yt.__webglColorRenderbuffer[at]);const Ot=n.get(M[at]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,yt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+at,r.TEXTURE_2D,Ot,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,yt.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&c){const M=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[M])}}}function St(R){return Math.min(i.maxSamples,R.samples)}function Wt(R){const M=n.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function Ft(R){const M=o.render.frame;h.get(R)!==M&&(h.set(R,M),R.update())}function Lt(R,M){const k=R.colorSpace,W=R.format,Y=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||k!==Me&&k!==Gn&&(qt.getTransfer(k)===ne?(W!==Ze||Y!==Kn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),M}function ee(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(l.width=R.naturalWidth||R.width,l.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(l.width=R.displayWidth,l.height=R.displayHeight):(l.width=R.width,l.height=R.height),l}this.allocateTextureUnit=z,this.resetTextureUnits=C,this.setTexture2D=O,this.setTexture2DArray=G,this.setTexture3D=X,this.setTextureCube=K,this.rebindTextures=gt,this.setupRenderTarget=At,this.updateRenderTargetMipmap=L,this.updateMultisampleRenderTarget=Qt,this.setupDepthRenderbuffer=xt,this.setupFrameBufferTexture=$,this.useMultisampledRTT=Wt}function c0(r,t){function e(n,i=Gn){let s;const o=qt.getTransfer(i);if(n===Kn)return r.UNSIGNED_BYTE;if(n===kh)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Bh)return r.UNSIGNED_SHORT_5_5_5_1;if(n===wd)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Ad)return r.BYTE;if(n===Td)return r.SHORT;if(n===Vr)return r.UNSIGNED_SHORT;if(n===Oh)return r.INT;if(n===Zi)return r.UNSIGNED_INT;if(n===un)return r.FLOAT;if(n===eo)return r.HALF_FLOAT;if(n===Rd)return r.ALPHA;if(n===Cd)return r.RGB;if(n===Ze)return r.RGBA;if(n===Pd)return r.LUMINANCE;if(n===Ld)return r.LUMINANCE_ALPHA;if(n===Wi)return r.DEPTH_COMPONENT;if(n===Ji)return r.DEPTH_STENCIL;if(n===Vh)return r.RED;if(n===Hh)return r.RED_INTEGER;if(n===Id)return r.RG;if(n===Gh)return r.RG_INTEGER;if(n===Wh)return r.RGBA_INTEGER;if(n===uo||n===fo||n===po||n===mo)if(o===ne)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===uo)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===fo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===po)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===mo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===uo)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===fo)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===po)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===mo)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===nc||n===ic||n===sc||n===rc)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===nc)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ic)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===sc)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===rc)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===oc||n===ac||n===cc)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===oc||n===ac)return o===ne?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===cc)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===lc||n===hc||n===uc||n===dc||n===fc||n===pc||n===mc||n===gc||n===_c||n===xc||n===vc||n===yc||n===Mc||n===Sc)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===lc)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===hc)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===uc)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===dc)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===fc)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===pc)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===mc)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===gc)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===_c)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===xc)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===vc)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===yc)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Mc)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Sc)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===go||n===bc||n===Ec)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===go)return o===ne?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===bc)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ec)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Dd||n===Ac||n===Tc||n===wc)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===go)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Ac)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Tc)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===wc)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===$i?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:e}}class l0 extends ye{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class $e extends se{constructor(){super(),this.isGroup=!0,this.type="Group"}}const h0={type:"move"};class Ho{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new $e,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new $e,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new A,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new A),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new $e,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new A,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new A),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,s=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const _ of t.hand.values()){const p=e.getJointPose(_,n),g=this._getHandJoint(l,_);p!==null&&(g.matrix.fromArray(p.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=p.radius),g.visible=p!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,m=.005;l.inputState.pinching&&d>f+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=f-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(h0)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new $e;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const u0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,d0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class f0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new fe,s=t.properties.get(i);s.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Zn({vertexShader:u0,fragmentShader:d0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new It(new We(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}}class p0 extends ss{constructor(t,e){super();const n=this;let i=null,s=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,m=null;const _=new f0,p=e.getContextAttributes();let g=null,v=null;const x=[],S=[],P=new Nt;let T=null;const w=new ye;w.layers.enable(1),w.viewport=new te;const D=new ye;D.layers.enable(2),D.viewport=new te;const E=[w,D],y=new l0;y.layers.enable(1),y.layers.enable(2);let C=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(H){let $=x[H];return $===void 0&&($=new Ho,x[H]=$),$.getTargetRaySpace()},this.getControllerGrip=function(H){let $=x[H];return $===void 0&&($=new Ho,x[H]=$),$.getGripSpace()},this.getHand=function(H){let $=x[H];return $===void 0&&($=new Ho,x[H]=$),$.getHandSpace()};function N(H){const $=S.indexOf(H.inputSource);if($===-1)return;const rt=x[$];rt!==void 0&&(rt.update(H.inputSource,H.frame,l||o),rt.dispatchEvent({type:H.type,data:H.inputSource}))}function O(){i.removeEventListener("select",N),i.removeEventListener("selectstart",N),i.removeEventListener("selectend",N),i.removeEventListener("squeeze",N),i.removeEventListener("squeezestart",N),i.removeEventListener("squeezeend",N),i.removeEventListener("end",O),i.removeEventListener("inputsourceschange",G);for(let H=0;H<x.length;H++){const $=S[H];$!==null&&(S[H]=null,x[H].disconnect($))}C=null,z=null,_.reset(),t.setRenderTarget(g),f=null,d=null,u=null,i=null,v=null,Rt.stop(),n.isPresenting=!1,t.setPixelRatio(T),t.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(H){s=H,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(H){a=H,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(H){l=H},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(H){if(i=H,i!==null){if(g=t.getRenderTarget(),i.addEventListener("select",N),i.addEventListener("selectstart",N),i.addEventListener("selectend",N),i.addEventListener("squeeze",N),i.addEventListener("squeezestart",N),i.addEventListener("squeezeend",N),i.addEventListener("end",O),i.addEventListener("inputsourceschange",G),p.xrCompatible!==!0&&await e.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(P),i.renderState.layers===void 0){const $={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,e,$),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new _i(f.framebufferWidth,f.framebufferHeight,{format:Ze,type:Kn,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil})}else{let $=null,rt=null,it=null;p.depth&&(it=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,$=p.stencil?Ji:Wi,rt=p.stencil?$i:Zi);const xt={colorFormat:e.RGBA8,depthFormat:it,scaleFactor:s};u=new XRWebGLBinding(i,e),d=u.createProjectionLayer(xt),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),v=new _i(d.textureWidth,d.textureHeight,{format:Ze,type:Kn,depthTexture:new iu(d.textureWidth,d.textureHeight,rt,void 0,void 0,void 0,void 0,void 0,void 0,$),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await i.requestReferenceSpace(a),Rt.setContext(i),Rt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function G(H){for(let $=0;$<H.removed.length;$++){const rt=H.removed[$],it=S.indexOf(rt);it>=0&&(S[it]=null,x[it].disconnect(rt))}for(let $=0;$<H.added.length;$++){const rt=H.added[$];let it=S.indexOf(rt);if(it===-1){for(let gt=0;gt<x.length;gt++)if(gt>=S.length){S.push(rt),it=gt;break}else if(S[gt]===null){S[gt]=rt,it=gt;break}if(it===-1)break}const xt=x[it];xt&&xt.connect(rt)}}const X=new A,K=new A;function q(H,$,rt){X.setFromMatrixPosition($.matrixWorld),K.setFromMatrixPosition(rt.matrixWorld);const it=X.distanceTo(K),xt=$.projectionMatrix.elements,gt=rt.projectionMatrix.elements,At=xt[14]/(xt[10]-1),L=xt[14]/(xt[10]+1),zt=(xt[9]+1)/xt[5],Bt=(xt[9]-1)/xt[5],Qt=(xt[8]-1)/xt[0],St=(gt[8]+1)/gt[0],Wt=At*Qt,Ft=At*St,Lt=it/(-Qt+St),ee=Lt*-Qt;$.matrixWorld.decompose(H.position,H.quaternion,H.scale),H.translateX(ee),H.translateZ(Lt),H.matrixWorld.compose(H.position,H.quaternion,H.scale),H.matrixWorldInverse.copy(H.matrixWorld).invert();const R=At+Lt,M=L+Lt,k=Wt-ee,W=Ft+(it-ee),Y=zt*L/M*R,J=Bt*L/M*R;H.projectionMatrix.makePerspective(k,W,Y,J,R,M),H.projectionMatrixInverse.copy(H.projectionMatrix).invert()}function ct(H,$){$===null?H.matrixWorld.copy(H.matrix):H.matrixWorld.multiplyMatrices($.matrixWorld,H.matrix),H.matrixWorldInverse.copy(H.matrixWorld).invert()}this.updateCamera=function(H){if(i===null)return;_.texture!==null&&(H.near=_.depthNear,H.far=_.depthFar),y.near=D.near=w.near=H.near,y.far=D.far=w.far=H.far,(C!==y.near||z!==y.far)&&(i.updateRenderState({depthNear:y.near,depthFar:y.far}),C=y.near,z=y.far,w.near=C,w.far=z,D.near=C,D.far=z,w.updateProjectionMatrix(),D.updateProjectionMatrix(),H.updateProjectionMatrix());const $=H.parent,rt=y.cameras;ct(y,$);for(let it=0;it<rt.length;it++)ct(rt[it],$);rt.length===2?q(y,w,D):y.projectionMatrix.copy(w.projectionMatrix),dt(H,y,$)};function dt(H,$,rt){rt===null?H.matrix.copy($.matrixWorld):(H.matrix.copy(rt.matrixWorld),H.matrix.invert(),H.matrix.multiply($.matrixWorld)),H.matrix.decompose(H.position,H.quaternion,H.scale),H.updateMatrixWorld(!0),H.projectionMatrix.copy($.projectionMatrix),H.projectionMatrixInverse.copy($.projectionMatrixInverse),H.isPerspectiveCamera&&(H.fov=Qi*2*Math.atan(1/H.projectionMatrix.elements[5]),H.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(H){c=H,d!==null&&(d.fixedFoveation=H),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=H)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(y)};let nt=null;function pt(H,$){if(h=$.getViewerPose(l||o),m=$,h!==null){const rt=h.views;f!==null&&(t.setRenderTargetFramebuffer(v,f.framebuffer),t.setRenderTarget(v));let it=!1;rt.length!==y.cameras.length&&(y.cameras.length=0,it=!0);for(let gt=0;gt<rt.length;gt++){const At=rt[gt];let L=null;if(f!==null)L=f.getViewport(At);else{const Bt=u.getViewSubImage(d,At);L=Bt.viewport,gt===0&&(t.setRenderTargetTextures(v,Bt.colorTexture,d.ignoreDepthValues?void 0:Bt.depthStencilTexture),t.setRenderTarget(v))}let zt=E[gt];zt===void 0&&(zt=new ye,zt.layers.enable(gt),zt.viewport=new te,E[gt]=zt),zt.matrix.fromArray(At.transform.matrix),zt.matrix.decompose(zt.position,zt.quaternion,zt.scale),zt.projectionMatrix.fromArray(At.projectionMatrix),zt.projectionMatrixInverse.copy(zt.projectionMatrix).invert(),zt.viewport.set(L.x,L.y,L.width,L.height),gt===0&&(y.matrix.copy(zt.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),it===!0&&y.cameras.push(zt)}const xt=i.enabledFeatures;if(xt&&xt.includes("depth-sensing")){const gt=u.getDepthInformation(rt[0]);gt&&gt.isValid&&gt.texture&&_.init(t,gt,i.renderState)}}for(let rt=0;rt<x.length;rt++){const it=S[rt],xt=x[rt];it!==null&&xt!==void 0&&xt.update(it,$,l||o)}nt&&nt(H,$),$.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:$}),m=null}const Rt=new nu;Rt.setAnimationLoop(pt),this.setAnimationLoop=function(H){nt=H},this.dispose=function(){}}}const si=new Fe,m0=new Et;function g0(r,t){function e(p,g){p.matrixAutoUpdate===!0&&p.updateMatrix(),g.value.copy(p.matrix)}function n(p,g){g.color.getRGB(p.fogColor.value,Qh(r)),g.isFog?(p.fogNear.value=g.near,p.fogFar.value=g.far):g.isFogExp2&&(p.fogDensity.value=g.density)}function i(p,g,v,x,S){g.isMeshBasicMaterial||g.isMeshLambertMaterial?s(p,g):g.isMeshToonMaterial?(s(p,g),u(p,g)):g.isMeshPhongMaterial?(s(p,g),h(p,g)):g.isMeshStandardMaterial?(s(p,g),d(p,g),g.isMeshPhysicalMaterial&&f(p,g,S)):g.isMeshMatcapMaterial?(s(p,g),m(p,g)):g.isMeshDepthMaterial?s(p,g):g.isMeshDistanceMaterial?(s(p,g),_(p,g)):g.isMeshNormalMaterial?s(p,g):g.isLineBasicMaterial?(o(p,g),g.isLineDashedMaterial&&a(p,g)):g.isPointsMaterial?c(p,g,v,x):g.isSpriteMaterial?l(p,g):g.isShadowMaterial?(p.color.value.copy(g.color),p.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function s(p,g){p.opacity.value=g.opacity,g.color&&p.diffuse.value.copy(g.color),g.emissive&&p.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(p.map.value=g.map,e(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.bumpMap&&(p.bumpMap.value=g.bumpMap,e(g.bumpMap,p.bumpMapTransform),p.bumpScale.value=g.bumpScale,g.side===Le&&(p.bumpScale.value*=-1)),g.normalMap&&(p.normalMap.value=g.normalMap,e(g.normalMap,p.normalMapTransform),p.normalScale.value.copy(g.normalScale),g.side===Le&&p.normalScale.value.negate()),g.displacementMap&&(p.displacementMap.value=g.displacementMap,e(g.displacementMap,p.displacementMapTransform),p.displacementScale.value=g.displacementScale,p.displacementBias.value=g.displacementBias),g.emissiveMap&&(p.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,p.emissiveMapTransform)),g.specularMap&&(p.specularMap.value=g.specularMap,e(g.specularMap,p.specularMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest);const v=t.get(g),x=v.envMap,S=v.envMapRotation;x&&(p.envMap.value=x,si.copy(S),si.x*=-1,si.y*=-1,si.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(si.y*=-1,si.z*=-1),p.envMapRotation.value.setFromMatrix4(m0.makeRotationFromEuler(si)),p.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=g.reflectivity,p.ior.value=g.ior,p.refractionRatio.value=g.refractionRatio),g.lightMap&&(p.lightMap.value=g.lightMap,p.lightMapIntensity.value=g.lightMapIntensity,e(g.lightMap,p.lightMapTransform)),g.aoMap&&(p.aoMap.value=g.aoMap,p.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,p.aoMapTransform))}function o(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,g.map&&(p.map.value=g.map,e(g.map,p.mapTransform))}function a(p,g){p.dashSize.value=g.dashSize,p.totalSize.value=g.dashSize+g.gapSize,p.scale.value=g.scale}function c(p,g,v,x){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.size.value=g.size*v,p.scale.value=x*.5,g.map&&(p.map.value=g.map,e(g.map,p.uvTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function l(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.rotation.value=g.rotation,g.map&&(p.map.value=g.map,e(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function h(p,g){p.specular.value.copy(g.specular),p.shininess.value=Math.max(g.shininess,1e-4)}function u(p,g){g.gradientMap&&(p.gradientMap.value=g.gradientMap)}function d(p,g){p.metalness.value=g.metalness,g.metalnessMap&&(p.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,p.metalnessMapTransform)),p.roughness.value=g.roughness,g.roughnessMap&&(p.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,p.roughnessMapTransform)),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)}function f(p,g,v){p.ior.value=g.ior,g.sheen>0&&(p.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),p.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(p.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,p.sheenColorMapTransform)),g.sheenRoughnessMap&&(p.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,p.sheenRoughnessMapTransform))),g.clearcoat>0&&(p.clearcoat.value=g.clearcoat,p.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(p.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,p.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(p.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Le&&p.clearcoatNormalScale.value.negate())),g.dispersion>0&&(p.dispersion.value=g.dispersion),g.iridescence>0&&(p.iridescence.value=g.iridescence,p.iridescenceIOR.value=g.iridescenceIOR,p.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(p.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,p.iridescenceMapTransform)),g.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),g.transmission>0&&(p.transmission.value=g.transmission,p.transmissionSamplerMap.value=v.texture,p.transmissionSamplerSize.value.set(v.width,v.height),g.transmissionMap&&(p.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,p.transmissionMapTransform)),p.thickness.value=g.thickness,g.thicknessMap&&(p.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=g.attenuationDistance,p.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(p.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(p.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=g.specularIntensity,p.specularColor.value.copy(g.specularColor),g.specularColorMap&&(p.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,p.specularColorMapTransform)),g.specularIntensityMap&&(p.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,p.specularIntensityMapTransform))}function m(p,g){g.matcap&&(p.matcap.value=g.matcap)}function _(p,g){const v=t.get(g).light;p.referencePosition.value.setFromMatrixPosition(v.matrixWorld),p.nearDistance.value=v.shadow.camera.near,p.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function _0(r,t,e,n){let i={},s={},o=[];const a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,x){const S=x.program;n.uniformBlockBinding(v,S)}function l(v,x){let S=i[v.id];S===void 0&&(m(v),S=h(v),i[v.id]=S,v.addEventListener("dispose",p));const P=x.program;n.updateUBOMapping(v,P);const T=t.render.frame;s[v.id]!==T&&(d(v),s[v.id]=T)}function h(v){const x=u();v.__bindingPointIndex=x;const S=r.createBuffer(),P=v.__size,T=v.usage;return r.bindBuffer(r.UNIFORM_BUFFER,S),r.bufferData(r.UNIFORM_BUFFER,P,T),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,x,S),S}function u(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){const x=i[v.id],S=v.uniforms,P=v.__cache;r.bindBuffer(r.UNIFORM_BUFFER,x);for(let T=0,w=S.length;T<w;T++){const D=Array.isArray(S[T])?S[T]:[S[T]];for(let E=0,y=D.length;E<y;E++){const C=D[E];if(f(C,T,E,P)===!0){const z=C.__offset,N=Array.isArray(C.value)?C.value:[C.value];let O=0;for(let G=0;G<N.length;G++){const X=N[G],K=_(X);typeof X=="number"||typeof X=="boolean"?(C.__data[0]=X,r.bufferSubData(r.UNIFORM_BUFFER,z+O,C.__data)):X.isMatrix3?(C.__data[0]=X.elements[0],C.__data[1]=X.elements[1],C.__data[2]=X.elements[2],C.__data[3]=0,C.__data[4]=X.elements[3],C.__data[5]=X.elements[4],C.__data[6]=X.elements[5],C.__data[7]=0,C.__data[8]=X.elements[6],C.__data[9]=X.elements[7],C.__data[10]=X.elements[8],C.__data[11]=0):(X.toArray(C.__data,O),O+=K.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,z,C.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(v,x,S,P){const T=v.value,w=x+"_"+S;if(P[w]===void 0)return typeof T=="number"||typeof T=="boolean"?P[w]=T:P[w]=T.clone(),!0;{const D=P[w];if(typeof T=="number"||typeof T=="boolean"){if(D!==T)return P[w]=T,!0}else if(D.equals(T)===!1)return D.copy(T),!0}return!1}function m(v){const x=v.uniforms;let S=0;const P=16;for(let w=0,D=x.length;w<D;w++){const E=Array.isArray(x[w])?x[w]:[x[w]];for(let y=0,C=E.length;y<C;y++){const z=E[y],N=Array.isArray(z.value)?z.value:[z.value];for(let O=0,G=N.length;O<G;O++){const X=N[O],K=_(X),q=S%P;q!==0&&P-q<K.boundary&&(S+=P-q),z.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=S,S+=K.storage}}}const T=S%P;return T>0&&(S+=P-T),v.__size=S,v.__cache={},this}function _(v){const x={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(x.boundary=4,x.storage=4):v.isVector2?(x.boundary=8,x.storage=8):v.isVector3||v.isColor?(x.boundary=16,x.storage=12):v.isVector4?(x.boundary=16,x.storage=16):v.isMatrix3?(x.boundary=48,x.storage=48):v.isMatrix4?(x.boundary=64,x.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),x}function p(v){const x=v.target;x.removeEventListener("dispose",p);const S=o.indexOf(x.__bindingPointIndex);o.splice(S,1),r.deleteBuffer(i[x.id]),delete i[x.id],delete s[x.id]}function g(){for(const v in i)r.deleteBuffer(i[v]);o=[],i={},s={}}return{bind:c,update:l,dispose:g}}class Na{constructor(t={}){const{canvas:e=hf(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const f=new Uint32Array(4),m=new Int32Array(4);let _=null,p=null;const g=[],v=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ve,this.toneMapping=jn,this.toneMappingExposure=1;const x=this;let S=!1,P=0,T=0,w=null,D=-1,E=null;const y=new te,C=new te;let z=null;const N=new Mt(0);let O=0,G=e.width,X=e.height,K=1,q=null,ct=null;const dt=new te(0,0,G,X),nt=new te(0,0,G,X);let pt=!1;const Rt=new Ia;let H=!1,$=!1;const rt=new Et,it=new A,xt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let gt=!1;function At(){return w===null?K:1}let L=n;function zt(b,U){return e.getContext(b,U)}try{const b={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Aa}`),e.addEventListener("webglcontextlost",ht,!1),e.addEventListener("webglcontextrestored",j,!1),e.addEventListener("webglcontextcreationerror",Z,!1),L===null){const U="webgl2";if(L=zt(U,b),L===null)throw zt(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let Bt,Qt,St,Wt,Ft,Lt,ee,R,M,k,W,Y,J,yt,ot,at,Ot,Q,_t,Ht,Ct,lt,kt,Gt;function ae(){Bt=new Tg(L),Bt.init(),lt=new c0(L,Bt),Qt=new yg(L,Bt,t,lt),St=new o0(L),Wt=new Cg(L),Ft=new q_,Lt=new a0(L,Bt,St,Ft,Qt,lt,Wt),ee=new Sg(x),R=new Ag(x),M=new zf(L),kt=new xg(L,M),k=new wg(L,M,Wt,kt),W=new Lg(L,k,M,Wt),_t=new Pg(L,Qt,Lt),at=new Mg(Ft),Y=new X_(x,ee,R,Bt,Qt,kt,at),J=new g0(x,Ft),yt=new Y_,ot=new t0(Bt),Q=new _g(x,ee,R,St,W,d,c),Ot=new r0(x,W,Qt),Gt=new _0(L,Wt,Qt,St),Ht=new vg(L,Bt,Wt),Ct=new Rg(L,Bt,Wt),Wt.programs=Y.programs,x.capabilities=Qt,x.extensions=Bt,x.properties=Ft,x.renderLists=yt,x.shadowMap=Ot,x.state=St,x.info=Wt}ae();const I=new p0(x,L);this.xr=I,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const b=Bt.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=Bt.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(b){b!==void 0&&(K=b,this.setSize(G,X,!1))},this.getSize=function(b){return b.set(G,X)},this.setSize=function(b,U,B=!0){if(I.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=b,X=U,e.width=Math.floor(b*K),e.height=Math.floor(U*K),B===!0&&(e.style.width=b+"px",e.style.height=U+"px"),this.setViewport(0,0,b,U)},this.getDrawingBufferSize=function(b){return b.set(G*K,X*K).floor()},this.setDrawingBufferSize=function(b,U,B){G=b,X=U,K=B,e.width=Math.floor(b*B),e.height=Math.floor(U*B),this.setViewport(0,0,b,U)},this.getCurrentViewport=function(b){return b.copy(y)},this.getViewport=function(b){return b.copy(dt)},this.setViewport=function(b,U,B,V){b.isVector4?dt.set(b.x,b.y,b.z,b.w):dt.set(b,U,B,V),St.viewport(y.copy(dt).multiplyScalar(K).round())},this.getScissor=function(b){return b.copy(nt)},this.setScissor=function(b,U,B,V){b.isVector4?nt.set(b.x,b.y,b.z,b.w):nt.set(b,U,B,V),St.scissor(C.copy(nt).multiplyScalar(K).round())},this.getScissorTest=function(){return pt},this.setScissorTest=function(b){St.setScissorTest(pt=b)},this.setOpaqueSort=function(b){q=b},this.setTransparentSort=function(b){ct=b},this.getClearColor=function(b){return b.copy(Q.getClearColor())},this.setClearColor=function(){Q.setClearColor.apply(Q,arguments)},this.getClearAlpha=function(){return Q.getClearAlpha()},this.setClearAlpha=function(){Q.setClearAlpha.apply(Q,arguments)},this.clear=function(b=!0,U=!0,B=!0){let V=0;if(b){let F=!1;if(w!==null){const tt=w.texture.format;F=tt===Wh||tt===Gh||tt===Hh}if(F){const tt=w.texture.type,ut=tt===Kn||tt===Zi||tt===Vr||tt===$i||tt===kh||tt===Bh,ft=Q.getClearColor(),mt=Q.getClearAlpha(),Tt=ft.r,wt=ft.g,bt=ft.b;ut?(f[0]=Tt,f[1]=wt,f[2]=bt,f[3]=mt,L.clearBufferuiv(L.COLOR,0,f)):(m[0]=Tt,m[1]=wt,m[2]=bt,m[3]=mt,L.clearBufferiv(L.COLOR,0,m))}else V|=L.COLOR_BUFFER_BIT}U&&(V|=L.DEPTH_BUFFER_BIT),B&&(V|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ht,!1),e.removeEventListener("webglcontextrestored",j,!1),e.removeEventListener("webglcontextcreationerror",Z,!1),yt.dispose(),ot.dispose(),Ft.dispose(),ee.dispose(),R.dispose(),W.dispose(),kt.dispose(),Gt.dispose(),Y.dispose(),I.dispose(),I.removeEventListener("sessionstart",sn),I.removeEventListener("sessionend",rn),$n.stop()};function ht(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function j(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const b=Wt.autoReset,U=Ot.enabled,B=Ot.autoUpdate,V=Ot.needsUpdate,F=Ot.type;ae(),Wt.autoReset=b,Ot.enabled=U,Ot.autoUpdate=B,Ot.needsUpdate=V,Ot.type=F}function Z(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function et(b){const U=b.target;U.removeEventListener("dispose",et),Pt(U)}function Pt(b){Xt(b),Ft.remove(b)}function Xt(b){const U=Ft.get(b).programs;U!==void 0&&(U.forEach(function(B){Y.releaseProgram(B)}),b.isShaderMaterial&&Y.releaseShaderCache(b))}this.renderBufferDirect=function(b,U,B,V,F,tt){U===null&&(U=xt);const ut=F.isMesh&&F.matrixWorld.determinant()<0,ft=Ou(b,U,B,V,F);St.setMaterial(V,ut);let mt=B.index,Tt=1;if(V.wireframe===!0){if(mt=k.getWireframeAttribute(B),mt===void 0)return;Tt=2}const wt=B.drawRange,bt=B.attributes.position;let jt=wt.start*Tt,re=(wt.start+wt.count)*Tt;tt!==null&&(jt=Math.max(jt,tt.start*Tt),re=Math.min(re,(tt.start+tt.count)*Tt)),mt!==null?(jt=Math.max(jt,0),re=Math.min(re,mt.count)):bt!=null&&(jt=Math.max(jt,0),re=Math.min(re,bt.count));const oe=re-jt;if(oe<0||oe===1/0)return;kt.setup(F,V,ft,B,mt);let De,Yt=Ht;if(mt!==null&&(De=M.get(mt),Yt=Ct,Yt.setIndex(De)),F.isMesh)V.wireframe===!0?(St.setLineWidth(V.wireframeLinewidth*At()),Yt.setMode(L.LINES)):Yt.setMode(L.TRIANGLES);else if(F.isLine){let vt=V.linewidth;vt===void 0&&(vt=1),St.setLineWidth(vt*At()),F.isLineSegments?Yt.setMode(L.LINES):F.isLineLoop?Yt.setMode(L.LINE_LOOP):Yt.setMode(L.LINE_STRIP)}else F.isPoints?Yt.setMode(L.POINTS):F.isSprite&&Yt.setMode(L.TRIANGLES);if(F.isBatchedMesh)F._multiDrawInstances!==null?Yt.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances):Yt.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else if(F.isInstancedMesh)Yt.renderInstances(jt,oe,F.count);else if(B.isInstancedBufferGeometry){const vt=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,we=Math.min(B.instanceCount,vt);Yt.renderInstances(jt,oe,we)}else Yt.render(jt,oe)};function ce(b,U,B){b.transparent===!0&&b.side===ln&&b.forceSinglePass===!1?(b.side=Le,b.needsUpdate=!0,Xs(b,U,B),b.side=Pn,b.needsUpdate=!0,Xs(b,U,B),b.side=ln):Xs(b,U,B)}this.compile=function(b,U,B=null){B===null&&(B=b),p=ot.get(B),p.init(U),v.push(p),B.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),b!==B&&b.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),p.setupLights();const V=new Set;return b.traverse(function(F){const tt=F.material;if(tt)if(Array.isArray(tt))for(let ut=0;ut<tt.length;ut++){const ft=tt[ut];ce(ft,B,F),V.add(ft)}else ce(tt,B,F),V.add(tt)}),v.pop(),p=null,V},this.compileAsync=function(b,U,B=null){const V=this.compile(b,U,B);return new Promise(F=>{function tt(){if(V.forEach(function(ut){Ft.get(ut).currentProgram.isReady()&&V.delete(ut)}),V.size===0){F(b);return}setTimeout(tt,10)}Bt.get("KHR_parallel_shader_compile")!==null?tt():setTimeout(tt,10)})};let ge=null;function $t(b){ge&&ge(b)}function sn(){$n.stop()}function rn(){$n.start()}const $n=new nu;$n.setAnimationLoop($t),typeof self<"u"&&$n.setContext(self),this.setAnimationLoop=function(b){ge=b,I.setAnimationLoop(b),b===null?$n.stop():$n.start()},I.addEventListener("sessionstart",sn),I.addEventListener("sessionend",rn),this.render=function(b,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),I.enabled===!0&&I.isPresenting===!0&&(I.cameraAutoUpdate===!0&&I.updateCamera(U),U=I.getCamera()),b.isScene===!0&&b.onBeforeRender(x,b,U,w),p=ot.get(b,v.length),p.init(U),v.push(p),rt.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Rt.setFromProjectionMatrix(rt),$=this.localClippingEnabled,H=at.init(this.clippingPlanes,$),_=yt.get(b,g.length),_.init(),g.push(_),I.enabled===!0&&I.isPresenting===!0){const tt=x.xr.getDepthSensingMesh();tt!==null&&ao(tt,U,-1/0,x.sortObjects)}ao(b,U,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(q,ct),gt=I.enabled===!1||I.isPresenting===!1||I.hasDepthSensing()===!1,gt&&Q.addToRenderList(_,b),this.info.render.frame++,H===!0&&at.beginShadows();const B=p.state.shadowsArray;Ot.render(B,b,U),H===!0&&at.endShadows(),this.info.autoReset===!0&&this.info.reset();const V=_.opaque,F=_.transmissive;if(p.setupLights(),U.isArrayCamera){const tt=U.cameras;if(F.length>0)for(let ut=0,ft=tt.length;ut<ft;ut++){const mt=tt[ut];ja(V,F,b,mt)}gt&&Q.render(b);for(let ut=0,ft=tt.length;ut<ft;ut++){const mt=tt[ut];qa(_,b,mt,mt.viewport)}}else F.length>0&&ja(V,F,b,U),gt&&Q.render(b),qa(_,b,U);w!==null&&(Lt.updateMultisampleRenderTarget(w),Lt.updateRenderTargetMipmap(w)),b.isScene===!0&&b.onAfterRender(x,b,U),kt.resetDefaultState(),D=-1,E=null,v.pop(),v.length>0?(p=v[v.length-1],H===!0&&at.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,g.pop(),g.length>0?_=g[g.length-1]:_=null};function ao(b,U,B,V){if(b.visible===!1)return;if(b.layers.test(U.layers)){if(b.isGroup)B=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(U);else if(b.isLight)p.pushLight(b),b.castShadow&&p.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||Rt.intersectsSprite(b)){V&&it.setFromMatrixPosition(b.matrixWorld).applyMatrix4(rt);const ut=W.update(b),ft=b.material;ft.visible&&_.push(b,ut,ft,B,it.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||Rt.intersectsObject(b))){const ut=W.update(b),ft=b.material;if(V&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),it.copy(b.boundingSphere.center)):(ut.boundingSphere===null&&ut.computeBoundingSphere(),it.copy(ut.boundingSphere.center)),it.applyMatrix4(b.matrixWorld).applyMatrix4(rt)),Array.isArray(ft)){const mt=ut.groups;for(let Tt=0,wt=mt.length;Tt<wt;Tt++){const bt=mt[Tt],jt=ft[bt.materialIndex];jt&&jt.visible&&_.push(b,ut,jt,B,it.z,bt)}}else ft.visible&&_.push(b,ut,ft,B,it.z,null)}}const tt=b.children;for(let ut=0,ft=tt.length;ut<ft;ut++)ao(tt[ut],U,B,V)}function qa(b,U,B,V){const F=b.opaque,tt=b.transmissive,ut=b.transparent;p.setupLightsView(B),H===!0&&at.setGlobalState(x.clippingPlanes,B),V&&St.viewport(y.copy(V)),F.length>0&&Ws(F,U,B),tt.length>0&&Ws(tt,U,B),ut.length>0&&Ws(ut,U,B),St.buffers.depth.setTest(!0),St.buffers.depth.setMask(!0),St.buffers.color.setMask(!0),St.setPolygonOffset(!1)}function ja(b,U,B,V){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[V.id]===void 0&&(p.state.transmissionRenderTarget[V.id]=new _i(1,1,{generateMipmaps:!0,type:Bt.has("EXT_color_buffer_half_float")||Bt.has("EXT_color_buffer_float")?eo:Kn,minFilter:Rn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qt.workingColorSpace}));const tt=p.state.transmissionRenderTarget[V.id],ut=V.viewport||y;tt.setSize(ut.z,ut.w);const ft=x.getRenderTarget();x.setRenderTarget(tt),x.getClearColor(N),O=x.getClearAlpha(),O<1&&x.setClearColor(16777215,.5),gt?Q.render(B):x.clear();const mt=x.toneMapping;x.toneMapping=jn;const Tt=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),p.setupLightsView(V),H===!0&&at.setGlobalState(x.clippingPlanes,V),Ws(b,B,V),Lt.updateMultisampleRenderTarget(tt),Lt.updateRenderTargetMipmap(tt),Bt.has("WEBGL_multisampled_render_to_texture")===!1){let wt=!1;for(let bt=0,jt=U.length;bt<jt;bt++){const re=U[bt],oe=re.object,De=re.geometry,Yt=re.material,vt=re.group;if(Yt.side===ln&&oe.layers.test(V.layers)){const we=Yt.side;Yt.side=Le,Yt.needsUpdate=!0,Ya(oe,B,V,De,Yt,vt),Yt.side=we,Yt.needsUpdate=!0,wt=!0}}wt===!0&&(Lt.updateMultisampleRenderTarget(tt),Lt.updateRenderTargetMipmap(tt))}x.setRenderTarget(ft),x.setClearColor(N,O),Tt!==void 0&&(V.viewport=Tt),x.toneMapping=mt}function Ws(b,U,B){const V=U.isScene===!0?U.overrideMaterial:null;for(let F=0,tt=b.length;F<tt;F++){const ut=b[F],ft=ut.object,mt=ut.geometry,Tt=V===null?ut.material:V,wt=ut.group;ft.layers.test(B.layers)&&Ya(ft,U,B,mt,Tt,wt)}}function Ya(b,U,B,V,F,tt){b.onBeforeRender(x,U,B,V,F,tt),b.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),F.onBeforeRender(x,U,B,V,b,tt),F.transparent===!0&&F.side===ln&&F.forceSinglePass===!1?(F.side=Le,F.needsUpdate=!0,x.renderBufferDirect(B,U,V,F,b,tt),F.side=Pn,F.needsUpdate=!0,x.renderBufferDirect(B,U,V,F,b,tt),F.side=ln):x.renderBufferDirect(B,U,V,F,b,tt),b.onAfterRender(x,U,B,V,F,tt)}function Xs(b,U,B){U.isScene!==!0&&(U=xt);const V=Ft.get(b),F=p.state.lights,tt=p.state.shadowsArray,ut=F.state.version,ft=Y.getParameters(b,F.state,tt,U,B),mt=Y.getProgramCacheKey(ft);let Tt=V.programs;V.environment=b.isMeshStandardMaterial?U.environment:null,V.fog=U.fog,V.envMap=(b.isMeshStandardMaterial?R:ee).get(b.envMap||V.environment),V.envMapRotation=V.environment!==null&&b.envMap===null?U.environmentRotation:b.envMapRotation,Tt===void 0&&(b.addEventListener("dispose",et),Tt=new Map,V.programs=Tt);let wt=Tt.get(mt);if(wt!==void 0){if(V.currentProgram===wt&&V.lightsStateVersion===ut)return Za(b,ft),wt}else ft.uniforms=Y.getUniforms(b),b.onBuild(B,ft,x),b.onBeforeCompile(ft,x),wt=Y.acquireProgram(ft,mt),Tt.set(mt,wt),V.uniforms=ft.uniforms;const bt=V.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(bt.clippingPlanes=at.uniform),Za(b,ft),V.needsLights=Bu(b),V.lightsStateVersion=ut,V.needsLights&&(bt.ambientLightColor.value=F.state.ambient,bt.lightProbe.value=F.state.probe,bt.directionalLights.value=F.state.directional,bt.directionalLightShadows.value=F.state.directionalShadow,bt.spotLights.value=F.state.spot,bt.spotLightShadows.value=F.state.spotShadow,bt.rectAreaLights.value=F.state.rectArea,bt.ltc_1.value=F.state.rectAreaLTC1,bt.ltc_2.value=F.state.rectAreaLTC2,bt.pointLights.value=F.state.point,bt.pointLightShadows.value=F.state.pointShadow,bt.hemisphereLights.value=F.state.hemi,bt.directionalShadowMap.value=F.state.directionalShadowMap,bt.directionalShadowMatrix.value=F.state.directionalShadowMatrix,bt.spotShadowMap.value=F.state.spotShadowMap,bt.spotLightMatrix.value=F.state.spotLightMatrix,bt.spotLightMap.value=F.state.spotLightMap,bt.pointShadowMap.value=F.state.pointShadowMap,bt.pointShadowMatrix.value=F.state.pointShadowMatrix),V.currentProgram=wt,V.uniformsList=null,wt}function Ka(b){if(b.uniformsList===null){const U=b.currentProgram.getUniforms();b.uniformsList=Nr.seqWithValue(U.seq,b.uniforms)}return b.uniformsList}function Za(b,U){const B=Ft.get(b);B.outputColorSpace=U.outputColorSpace,B.batching=U.batching,B.batchingColor=U.batchingColor,B.instancing=U.instancing,B.instancingColor=U.instancingColor,B.instancingMorph=U.instancingMorph,B.skinning=U.skinning,B.morphTargets=U.morphTargets,B.morphNormals=U.morphNormals,B.morphColors=U.morphColors,B.morphTargetsCount=U.morphTargetsCount,B.numClippingPlanes=U.numClippingPlanes,B.numIntersection=U.numClipIntersection,B.vertexAlphas=U.vertexAlphas,B.vertexTangents=U.vertexTangents,B.toneMapping=U.toneMapping}function Ou(b,U,B,V,F){U.isScene!==!0&&(U=xt),Lt.resetTextureUnits();const tt=U.fog,ut=V.isMeshStandardMaterial?U.environment:null,ft=w===null?x.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:Me,mt=(V.isMeshStandardMaterial?R:ee).get(V.envMap||ut),Tt=V.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,wt=!!B.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),bt=!!B.morphAttributes.position,jt=!!B.morphAttributes.normal,re=!!B.morphAttributes.color;let oe=jn;V.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(oe=x.toneMapping);const De=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,Yt=De!==void 0?De.length:0,vt=Ft.get(V),we=p.state.lights;if(H===!0&&($===!0||b!==E)){const Be=b===E&&V.id===D;at.setState(V,b,Be)}let Jt=!1;V.version===vt.__version?(vt.needsLights&&vt.lightsStateVersion!==we.state.version||vt.outputColorSpace!==ft||F.isBatchedMesh&&vt.batching===!1||!F.isBatchedMesh&&vt.batching===!0||F.isBatchedMesh&&vt.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&vt.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&vt.instancing===!1||!F.isInstancedMesh&&vt.instancing===!0||F.isSkinnedMesh&&vt.skinning===!1||!F.isSkinnedMesh&&vt.skinning===!0||F.isInstancedMesh&&vt.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&vt.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&vt.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&vt.instancingMorph===!1&&F.morphTexture!==null||vt.envMap!==mt||V.fog===!0&&vt.fog!==tt||vt.numClippingPlanes!==void 0&&(vt.numClippingPlanes!==at.numPlanes||vt.numIntersection!==at.numIntersection)||vt.vertexAlphas!==Tt||vt.vertexTangents!==wt||vt.morphTargets!==bt||vt.morphNormals!==jt||vt.morphColors!==re||vt.toneMapping!==oe||vt.morphTargetsCount!==Yt)&&(Jt=!0):(Jt=!0,vt.__version=V.version);let mn=vt.currentProgram;Jt===!0&&(mn=Xs(V,U,F));let qs=!1,Jn=!1,co=!1;const _e=mn.getUniforms(),Ln=vt.uniforms;if(St.useProgram(mn.program)&&(qs=!0,Jn=!0,co=!0),V.id!==D&&(D=V.id,Jn=!0),qs||E!==b){_e.setValue(L,"projectionMatrix",b.projectionMatrix),_e.setValue(L,"viewMatrix",b.matrixWorldInverse);const Be=_e.map.cameraPosition;Be!==void 0&&Be.setValue(L,it.setFromMatrixPosition(b.matrixWorld)),Qt.logarithmicDepthBuffer&&_e.setValue(L,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&_e.setValue(L,"isOrthographic",b.isOrthographicCamera===!0),E!==b&&(E=b,Jn=!0,co=!0)}if(F.isSkinnedMesh){_e.setOptional(L,F,"bindMatrix"),_e.setOptional(L,F,"bindMatrixInverse");const Be=F.skeleton;Be&&(Be.boneTexture===null&&Be.computeBoneTexture(),_e.setValue(L,"boneTexture",Be.boneTexture,Lt))}F.isBatchedMesh&&(_e.setOptional(L,F,"batchingTexture"),_e.setValue(L,"batchingTexture",F._matricesTexture,Lt),_e.setOptional(L,F,"batchingColorTexture"),F._colorsTexture!==null&&_e.setValue(L,"batchingColorTexture",F._colorsTexture,Lt));const lo=B.morphAttributes;if((lo.position!==void 0||lo.normal!==void 0||lo.color!==void 0)&&_t.update(F,B,mn),(Jn||vt.receiveShadow!==F.receiveShadow)&&(vt.receiveShadow=F.receiveShadow,_e.setValue(L,"receiveShadow",F.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(Ln.envMap.value=mt,Ln.flipEnvMap.value=mt.isCubeTexture&&mt.isRenderTargetTexture===!1?-1:1),V.isMeshStandardMaterial&&V.envMap===null&&U.environment!==null&&(Ln.envMapIntensity.value=U.environmentIntensity),Jn&&(_e.setValue(L,"toneMappingExposure",x.toneMappingExposure),vt.needsLights&&ku(Ln,co),tt&&V.fog===!0&&J.refreshFogUniforms(Ln,tt),J.refreshMaterialUniforms(Ln,V,K,X,p.state.transmissionRenderTarget[b.id]),Nr.upload(L,Ka(vt),Ln,Lt)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Nr.upload(L,Ka(vt),Ln,Lt),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&_e.setValue(L,"center",F.center),_e.setValue(L,"modelViewMatrix",F.modelViewMatrix),_e.setValue(L,"normalMatrix",F.normalMatrix),_e.setValue(L,"modelMatrix",F.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){const Be=V.uniformsGroups;for(let ho=0,Vu=Be.length;ho<Vu;ho++){const $a=Be[ho];Gt.update($a,mn),Gt.bind($a,mn)}}return mn}function ku(b,U){b.ambientLightColor.needsUpdate=U,b.lightProbe.needsUpdate=U,b.directionalLights.needsUpdate=U,b.directionalLightShadows.needsUpdate=U,b.pointLights.needsUpdate=U,b.pointLightShadows.needsUpdate=U,b.spotLights.needsUpdate=U,b.spotLightShadows.needsUpdate=U,b.rectAreaLights.needsUpdate=U,b.hemisphereLights.needsUpdate=U}function Bu(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(b,U,B){Ft.get(b.texture).__webglTexture=U,Ft.get(b.depthTexture).__webglTexture=B;const V=Ft.get(b);V.__hasExternalTextures=!0,V.__autoAllocateDepthBuffer=B===void 0,V.__autoAllocateDepthBuffer||Bt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),V.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,U){const B=Ft.get(b);B.__webglFramebuffer=U,B.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(b,U=0,B=0){w=b,P=U,T=B;let V=!0,F=null,tt=!1,ut=!1;if(b){const mt=Ft.get(b);mt.__useDefaultFramebuffer!==void 0?(St.bindFramebuffer(L.FRAMEBUFFER,null),V=!1):mt.__webglFramebuffer===void 0?Lt.setupRenderTarget(b):mt.__hasExternalTextures&&Lt.rebindTextures(b,Ft.get(b.texture).__webglTexture,Ft.get(b.depthTexture).__webglTexture);const Tt=b.texture;(Tt.isData3DTexture||Tt.isDataArrayTexture||Tt.isCompressedArrayTexture)&&(ut=!0);const wt=Ft.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(wt[U])?F=wt[U][B]:F=wt[U],tt=!0):b.samples>0&&Lt.useMultisampledRTT(b)===!1?F=Ft.get(b).__webglMultisampledFramebuffer:Array.isArray(wt)?F=wt[B]:F=wt,y.copy(b.viewport),C.copy(b.scissor),z=b.scissorTest}else y.copy(dt).multiplyScalar(K).floor(),C.copy(nt).multiplyScalar(K).floor(),z=pt;if(St.bindFramebuffer(L.FRAMEBUFFER,F)&&V&&St.drawBuffers(b,F),St.viewport(y),St.scissor(C),St.setScissorTest(z),tt){const mt=Ft.get(b.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+U,mt.__webglTexture,B)}else if(ut){const mt=Ft.get(b.texture),Tt=U||0;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,mt.__webglTexture,B||0,Tt)}D=-1},this.readRenderTargetPixels=function(b,U,B,V,F,tt,ut){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ft=Ft.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&ut!==void 0&&(ft=ft[ut]),ft){St.bindFramebuffer(L.FRAMEBUFFER,ft);try{const mt=b.texture,Tt=mt.format,wt=mt.type;if(!Qt.textureFormatReadable(Tt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Qt.textureTypeReadable(wt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=b.width-V&&B>=0&&B<=b.height-F&&L.readPixels(U,B,V,F,lt.convert(Tt),lt.convert(wt),tt)}finally{const mt=w!==null?Ft.get(w).__webglFramebuffer:null;St.bindFramebuffer(L.FRAMEBUFFER,mt)}}},this.readRenderTargetPixelsAsync=async function(b,U,B,V,F,tt,ut){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ft=Ft.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&ut!==void 0&&(ft=ft[ut]),ft){St.bindFramebuffer(L.FRAMEBUFFER,ft);try{const mt=b.texture,Tt=mt.format,wt=mt.type;if(!Qt.textureFormatReadable(Tt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Qt.textureTypeReadable(wt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=b.width-V&&B>=0&&B<=b.height-F){const bt=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,bt),L.bufferData(L.PIXEL_PACK_BUFFER,tt.byteLength,L.STREAM_READ),L.readPixels(U,B,V,F,lt.convert(Tt),lt.convert(wt),0),L.flush();const jt=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);await uf(L,jt,4);try{L.bindBuffer(L.PIXEL_PACK_BUFFER,bt),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,tt)}finally{L.deleteBuffer(bt),L.deleteSync(jt)}return tt}}finally{const mt=w!==null?Ft.get(w).__webglFramebuffer:null;St.bindFramebuffer(L.FRAMEBUFFER,mt)}}},this.copyFramebufferToTexture=function(b,U=null,B=0){b.isTexture!==!0&&(console.warn("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,b=arguments[1]);const V=Math.pow(2,-B),F=Math.floor(b.image.width*V),tt=Math.floor(b.image.height*V),ut=U!==null?U.x:0,ft=U!==null?U.y:0;Lt.setTexture2D(b,0),L.copyTexSubImage2D(L.TEXTURE_2D,B,0,0,ut,ft,F,tt),St.unbindTexture()},this.copyTextureToTexture=function(b,U,B=null,V=null,F=0){b.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture function signature has changed."),V=arguments[0]||null,b=arguments[1],U=arguments[2],F=arguments[3]||0,B=null);let tt,ut,ft,mt,Tt,wt;B!==null?(tt=B.max.x-B.min.x,ut=B.max.y-B.min.y,ft=B.min.x,mt=B.min.y):(tt=b.image.width,ut=b.image.height,ft=0,mt=0),V!==null?(Tt=V.x,wt=V.y):(Tt=0,wt=0);const bt=lt.convert(U.format),jt=lt.convert(U.type);Lt.setTexture2D(U,0),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,U.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,U.unpackAlignment);const re=L.getParameter(L.UNPACK_ROW_LENGTH),oe=L.getParameter(L.UNPACK_IMAGE_HEIGHT),De=L.getParameter(L.UNPACK_SKIP_PIXELS),Yt=L.getParameter(L.UNPACK_SKIP_ROWS),vt=L.getParameter(L.UNPACK_SKIP_IMAGES),we=b.isCompressedTexture?b.mipmaps[F]:b.image;L.pixelStorei(L.UNPACK_ROW_LENGTH,we.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,we.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,ft),L.pixelStorei(L.UNPACK_SKIP_ROWS,mt),b.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,F,Tt,wt,tt,ut,bt,jt,we.data):b.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,F,Tt,wt,we.width,we.height,bt,we.data):L.texSubImage2D(L.TEXTURE_2D,F,Tt,wt,bt,jt,we),L.pixelStorei(L.UNPACK_ROW_LENGTH,re),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,oe),L.pixelStorei(L.UNPACK_SKIP_PIXELS,De),L.pixelStorei(L.UNPACK_SKIP_ROWS,Yt),L.pixelStorei(L.UNPACK_SKIP_IMAGES,vt),F===0&&U.generateMipmaps&&L.generateMipmap(L.TEXTURE_2D),St.unbindTexture()},this.copyTextureToTexture3D=function(b,U,B=null,V=null,F=0){b.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture3D function signature has changed."),B=arguments[0]||null,V=arguments[1]||null,b=arguments[2],U=arguments[3],F=arguments[4]||0);let tt,ut,ft,mt,Tt,wt,bt,jt,re;const oe=b.isCompressedTexture?b.mipmaps[F]:b.image;B!==null?(tt=B.max.x-B.min.x,ut=B.max.y-B.min.y,ft=B.max.z-B.min.z,mt=B.min.x,Tt=B.min.y,wt=B.min.z):(tt=oe.width,ut=oe.height,ft=oe.depth,mt=0,Tt=0,wt=0),V!==null?(bt=V.x,jt=V.y,re=V.z):(bt=0,jt=0,re=0);const De=lt.convert(U.format),Yt=lt.convert(U.type);let vt;if(U.isData3DTexture)Lt.setTexture3D(U,0),vt=L.TEXTURE_3D;else if(U.isDataArrayTexture||U.isCompressedArrayTexture)Lt.setTexture2DArray(U,0),vt=L.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,U.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,U.unpackAlignment);const we=L.getParameter(L.UNPACK_ROW_LENGTH),Jt=L.getParameter(L.UNPACK_IMAGE_HEIGHT),mn=L.getParameter(L.UNPACK_SKIP_PIXELS),qs=L.getParameter(L.UNPACK_SKIP_ROWS),Jn=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,oe.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,oe.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,mt),L.pixelStorei(L.UNPACK_SKIP_ROWS,Tt),L.pixelStorei(L.UNPACK_SKIP_IMAGES,wt),b.isDataTexture||b.isData3DTexture?L.texSubImage3D(vt,F,bt,jt,re,tt,ut,ft,De,Yt,oe.data):U.isCompressedArrayTexture?L.compressedTexSubImage3D(vt,F,bt,jt,re,tt,ut,ft,De,oe.data):L.texSubImage3D(vt,F,bt,jt,re,tt,ut,ft,De,Yt,oe),L.pixelStorei(L.UNPACK_ROW_LENGTH,we),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Jt),L.pixelStorei(L.UNPACK_SKIP_PIXELS,mn),L.pixelStorei(L.UNPACK_SKIP_ROWS,qs),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Jn),F===0&&U.generateMipmaps&&L.generateMipmap(vt),St.unbindTexture()},this.initRenderTarget=function(b){Ft.get(b).__webglFramebuffer===void 0&&Lt.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?Lt.setTextureCube(b,0):b.isData3DTexture?Lt.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?Lt.setTexture2DArray(b,0):Lt.setTexture2D(b,0),St.unbindTexture()},this.resetState=function(){P=0,T=0,w=null,St.reset(),kt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Cn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===Ra?"display-p3":"srgb",e.unpackColorSpace=qt.workingColorSpace===no?"display-p3":"srgb"}}class za{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Mt(t),this.near=e,this.far=n}clone(){return new za(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class so extends se{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Fe,this.environmentIntensity=1,this.environmentRotation=new Fe,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class x0{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=fa,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Je()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return Pa("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,s=this.stride;i<s;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Je()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Je()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Re=new A;class Fa{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Re.fromBufferAttribute(this,e),Re.applyMatrix4(t),this.setXYZ(e,Re.x,Re.y,Re.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Re.fromBufferAttribute(this,e),Re.applyNormalMatrix(t),this.setXYZ(e,Re.x,Re.y,Re.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Re.fromBufferAttribute(this,e),Re.transformDirection(t),this.setXYZ(e,Re.x,Re.y,Re.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=Ke(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Kt(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=Kt(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=Kt(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=Kt(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=Kt(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Ke(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Ke(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Ke(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Ke(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=Kt(e,this.array),n=Kt(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=Kt(e,this.array),n=Kt(n,this.array),i=Kt(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=Kt(e,this.array),n=Kt(n,this.array),i=Kt(i,this.array),s=Kt(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=s,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return new de(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Fa(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const yl=new A,Ml=new te,Sl=new te,v0=new A,bl=new Et,pr=new A,Go=new nn,El=new Et,Wo=new ks;class y0 extends It{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=ec,this.bindMatrix=new Et,this.bindMatrixInverse=new Et,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const t=this.geometry;this.boundingBox===null&&(this.boundingBox=new en),this.boundingBox.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,pr),this.boundingBox.expandByPoint(pr)}computeBoundingSphere(){const t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new nn),this.boundingSphere.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,pr),this.boundingSphere.expandByPoint(pr)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Go.copy(this.boundingSphere),Go.applyMatrix4(i),t.ray.intersectsSphere(Go)!==!1&&(El.copy(i).invert(),Wo.copy(t.ray).applyMatrix4(El),!(this.boundingBox!==null&&Wo.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,Wo)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const t=new te,e=this.geometry.attributes.skinWeight;for(let n=0,i=e.count;n<i;n++){t.fromBufferAttribute(e,n);const s=1/t.manhattanLength();s!==1/0?t.multiplyScalar(s):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===ec?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Ed?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){const n=this.skeleton,i=this.geometry;Ml.fromBufferAttribute(i.attributes.skinIndex,t),Sl.fromBufferAttribute(i.attributes.skinWeight,t),yl.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let s=0;s<4;s++){const o=Sl.getComponent(s);if(o!==0){const a=Ml.getComponent(s);bl.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),e.addScaledVector(v0.copy(yl).applyMatrix4(bl),o)}}return e.applyMatrix4(this.bindMatrixInverse)}}class lu extends se{constructor(){super(),this.isBone=!0,this.type="Bone"}}class hu extends fe{constructor(t=null,e=1,n=1,i,s,o,a,c,l=Pe,h=Pe,u,d){super(null,o,a,c,l,h,i,s,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Al=new Et,M0=new Et;class Oa{constructor(t=[],e=[]){this.uuid=Je(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Et)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){const n=new Et;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const t=this.bones,e=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,o=t.length;s<o;s++){const a=t[s]?t[s].matrixWorld:M0;Al.multiplyMatrices(a,e[s]),Al.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Oa(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4);e.set(this.boneMatrices);const n=new hu(e,t,t,Ze,un);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){const i=this.bones[e];if(i.name===t)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,i=t.bones.length;n<i;n++){const s=t.bones[n];let o=e[s];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),o=new lu),this.bones.push(o),this.boneInverses.push(new Et().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){const t={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;const e=this.bones,n=this.boneInverses;for(let i=0,s=e.length;i<s;i++){const o=e[i];t.bones.push(o.uuid);const a=n[i];t.boneInverses.push(a.toArray())}return t}}class ma extends de{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Ni=new Et,Tl=new Et,mr=[],wl=new en,S0=new Et,fs=new It,ps=new nn;class Bs extends It{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new ma(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,S0)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new en),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ni),wl.copy(t.boundingBox).applyMatrix4(Ni),this.boundingBox.union(wl)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new nn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ni),ps.copy(t.boundingSphere).applyMatrix4(Ni),this.boundingSphere.union(ps)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,o=t*s+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(t,e){const n=this.matrixWorld,i=this.count;if(fs.geometry=this.geometry,fs.material=this.material,fs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ps.copy(this.boundingSphere),ps.applyMatrix4(n),t.ray.intersectsSphere(ps)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Ni),Tl.multiplyMatrices(n,Ni),fs.matrixWorld=Tl,fs.raycast(t,mr);for(let o=0,a=mr.length;o<a;o++){const c=mr[o];c.instanceId=s,c.object=this,e.push(c)}mr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new ma(new Float32Array(this.instanceMatrix.count*3),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new hu(new Float32Array(i*this.count),i,this.count,Vh,un));const s=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=i*t;s[c]=a,s.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class uu extends Qe{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Mt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const jr=new A,Yr=new A,Rl=new Et,ms=new ks,gr=new nn,Xo=new A,Cl=new A;class ka extends se{constructor(t=new ke,e=new uu){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,s=e.count;i<s;i++)jr.fromBufferAttribute(e,i-1),Yr.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=jr.distanceTo(Yr);t.setAttribute("lineDistance",new Ie(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,s=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),gr.copy(n.boundingSphere),gr.applyMatrix4(i),gr.radius+=s,t.ray.intersectsSphere(gr)===!1)return;Rl.copy(i).invert(),ms.copy(t.ray).applyMatrix4(Rl);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,o.start),m=Math.min(h.count,o.start+o.count);for(let _=f,p=m-1;_<p;_+=l){const g=h.getX(_),v=h.getX(_+1),x=_r(this,t,ms,c,g,v);x&&e.push(x)}if(this.isLineLoop){const _=h.getX(m-1),p=h.getX(f),g=_r(this,t,ms,c,_,p);g&&e.push(g)}}else{const f=Math.max(0,o.start),m=Math.min(d.count,o.start+o.count);for(let _=f,p=m-1;_<p;_+=l){const g=_r(this,t,ms,c,_,_+1);g&&e.push(g)}if(this.isLineLoop){const _=_r(this,t,ms,c,m-1,f);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function _r(r,t,e,n,i,s){const o=r.geometry.attributes.position;if(jr.fromBufferAttribute(o,i),Yr.fromBufferAttribute(o,s),e.distanceSqToSegment(jr,Yr,Xo,Cl)>n)return;Xo.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(Xo);if(!(c<t.near||c>t.far))return{distance:c,point:Cl.clone().applyMatrix4(r.matrixWorld),index:i,face:null,faceIndex:null,object:r}}const Pl=new A,Ll=new A;class b0 extends ka{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let i=0,s=e.count;i<s;i+=2)Pl.fromBufferAttribute(e,i),Ll.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Pl.distanceTo(Ll);t.setAttribute("lineDistance",new Ie(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class E0 extends ka{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class du extends Qe{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Mt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Il=new Et,ga=new ks,xr=new nn,vr=new A;class A0 extends se{constructor(t=new ke,e=new du){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,s=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),xr.copy(n.boundingSphere),xr.applyMatrix4(i),xr.radius+=s,t.ray.intersectsSphere(xr)===!1)return;Il.copy(i).invert(),ga.copy(t.ray).applyMatrix4(Il);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){const d=Math.max(0,o.start),f=Math.min(l.count,o.start+o.count);for(let m=d,_=f;m<_;m++){const p=l.getX(m);vr.fromBufferAttribute(u,p),Dl(vr,p,c,i,t,e,this)}}else{const d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let m=d,_=f;m<_;m++)vr.fromBufferAttribute(u,m),Dl(vr,m,c,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Dl(r,t,e,n,i,s,o){const a=ga.distanceSqToPoint(r);if(a<e){const c=new A;ga.closestPointToPoint(r,c),c.applyMatrix4(n);const l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;s.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,object:o})}}class T0 extends fe{constructor(t,e,n,i,s,o,a,c,l){super(t,e,n,i,s,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Vs extends ke{constructor(t=1,e=1,n=1,i=32,s=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:c};const l=this;i=Math.floor(i),s=Math.floor(s);const h=[],u=[],d=[],f=[];let m=0;const _=[],p=n/2;let g=0;v(),o===!1&&(t>0&&x(!0),e>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new Ie(u,3)),this.setAttribute("normal",new Ie(d,3)),this.setAttribute("uv",new Ie(f,2));function v(){const S=new A,P=new A;let T=0;const w=(e-t)/n;for(let D=0;D<=s;D++){const E=[],y=D/s,C=y*(e-t)+t;for(let z=0;z<=i;z++){const N=z/i,O=N*c+a,G=Math.sin(O),X=Math.cos(O);P.x=C*G,P.y=-y*n+p,P.z=C*X,u.push(P.x,P.y,P.z),S.set(G,w,X).normalize(),d.push(S.x,S.y,S.z),f.push(N,1-y),E.push(m++)}_.push(E)}for(let D=0;D<i;D++)for(let E=0;E<s;E++){const y=_[E][D],C=_[E+1][D],z=_[E+1][D+1],N=_[E][D+1];h.push(y,C,N),h.push(C,z,N),T+=6}l.addGroup(g,T,0),g+=T}function x(S){const P=m,T=new Nt,w=new A;let D=0;const E=S===!0?t:e,y=S===!0?1:-1;for(let z=1;z<=i;z++)u.push(0,p*y,0),d.push(0,y,0),f.push(.5,.5),m++;const C=m;for(let z=0;z<=i;z++){const O=z/i*c+a,G=Math.cos(O),X=Math.sin(O);w.x=E*X,w.y=p*y,w.z=E*G,u.push(w.x,w.y,w.z),d.push(0,y,0),T.x=G*.5+.5,T.y=X*.5*y+.5,f.push(T.x,T.y),m++}for(let z=0;z<i;z++){const N=P+z,O=C+z;S===!0?h.push(O,O+1,N):h.push(O+1,O,N),D+=3}l.addGroup(g,D,S===!0?1:2),g+=D}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Vs(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Kr extends Vs{constructor(t=1,e=1,n=32,i=1,s=!1,o=0,a=Math.PI*2){super(0,t,e,n,i,s,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(t){return new Kr(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Hs extends ke{constructor(t=1,e=32,n=16,i=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:s,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],u=new A,d=new A,f=[],m=[],_=[],p=[];for(let g=0;g<=n;g++){const v=[],x=g/n;let S=0;g===0&&o===0?S=.5/e:g===n&&c===Math.PI&&(S=-.5/e);for(let P=0;P<=e;P++){const T=P/e;u.x=-t*Math.cos(i+T*s)*Math.sin(o+x*a),u.y=t*Math.cos(o+x*a),u.z=t*Math.sin(i+T*s)*Math.sin(o+x*a),m.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),p.push(T+S,1-x),v.push(l++)}h.push(v)}for(let g=0;g<n;g++)for(let v=0;v<e;v++){const x=h[g][v+1],S=h[g][v],P=h[g+1][v],T=h[g+1][v+1];(g!==0||o>0)&&f.push(x,S,T),(g!==n-1||c<Math.PI)&&f.push(S,P,T)}this.setIndex(f),this.setAttribute("position",new Ie(m,3)),this.setAttribute("normal",new Ie(_,3)),this.setAttribute("uv",new Ie(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Hs(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Os extends Qe{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Mt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Mt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=wa,this.normalScale=new Nt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fe,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class fn extends Os{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Nt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Te(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Mt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Mt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Mt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class tn extends Qe{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Mt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Mt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=wa,this.normalScale=new Nt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fe,this.combine=Ta,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}function yr(r,t,e){return!r||!e&&r.constructor===t?r:typeof t.BYTES_PER_ELEMENT=="number"?new t(r):Array.prototype.slice.call(r)}function w0(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function R0(r){function t(i,s){return r[i]-r[s]}const e=r.length,n=new Array(e);for(let i=0;i!==e;++i)n[i]=i;return n.sort(t),n}function Ul(r,t,e){const n=r.length,i=new r.constructor(n);for(let s=0,o=0;o!==n;++s){const a=e[s]*t;for(let c=0;c!==t;++c)i[o++]=r[a+c]}return i}function fu(r,t,e,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(t.push(s.time),e.push.apply(e,o)),s=r[i++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(t.push(s.time),o.toArray(e,e.length)),s=r[i++];while(s!==void 0);else do o=s[n],o!==void 0&&(t.push(s.time),e.push(o)),s=r[i++];while(s!==void 0)}class Gs{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){const e=this.parameterPositions;let n=this._cachedIndex,i=e[n],s=e[n-1];t:{e:{let o;n:{i:if(!(t<i)){for(let a=n+2;;){if(i===void 0){if(t<s)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=e[++n],t<i)break e}o=e.length;break n}if(!(t>=s)){const a=e[1];t<a&&(n=2,s=a);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=s,s=e[--n-1],t>=s)break e}o=n,n=0;break n}break t}for(;n<o;){const a=n+o>>>1;t<e[a]?o=a:n=a+1}if(i=e[n],s=e[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){const e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=t*i;for(let o=0;o!==i;++o)e[o]=n[s+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class C0 extends Gs{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Rc,endingEnd:Rc}}intervalChanged_(t,e,n){const i=this.parameterPositions;let s=t-2,o=t+1,a=i[s],c=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Cc:s=t,a=2*e-n;break;case Pc:s=i.length-2,a=e+i[s]-i[s+1];break;default:s=t,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Cc:o=t,c=2*n-e;break;case Pc:o=1,c=n+i[1]-i[0];break;default:o=t-1,c=e}const l=(n-e)*.5,h=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-n),this._offsetPrev=s*h,this._offsetNext=o*h}interpolate_(t,e,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,m=(n-e)/(i-e),_=m*m,p=_*m,g=-d*p+2*d*_-d*m,v=(1+d)*p+(-1.5-2*d)*_+(-.5+d)*m+1,x=(-1-f)*p+(1.5+f)*_+.5*m,S=f*p-f*_;for(let P=0;P!==a;++P)s[P]=g*o[h+P]+v*o[l+P]+x*o[c+P]+S*o[u+P];return s}}class P0 extends Gs{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=(n-e)/(i-e),u=1-h;for(let d=0;d!==a;++d)s[d]=o[l+d]*u+o[c+d]*h;return s}}class L0 extends Gs{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}}class pn{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=yr(e,this.TimeBufferType),this.values=yr(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){const e=t.constructor;let n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:yr(t.times,Array),values:yr(t.values,Array)};const i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new L0(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new P0(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new C0(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Ns:e=this.InterpolantFactoryMethodDiscrete;break;case zs:e=this.InterpolantFactoryMethodLinear;break;case _o:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ns;case this.InterpolantFactoryMethodLinear:return zs;case this.InterpolantFactoryMethodSmooth:return _o}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){const e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){const e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t}return this}trim(t,e){const n=this.times,i=n.length;let s=0,o=i-1;for(;s!==i&&n[s]<t;)++s;for(;o!==-1&&n[o]>e;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let t=!0;const e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);const n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==s;a++){const c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(i!==void 0&&w0(i))for(let a=0,c=i.length;a!==c;++a){const l=i[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){const t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===_o,s=t.length-1;let o=1;for(let a=1;a<s;++a){let c=!1;const l=t[a],h=t[a+1];if(l!==h&&(a!==1||l!==t[0]))if(i)c=!0;else{const u=a*n,d=u-n,f=u+n;for(let m=0;m!==n;++m){const _=e[u+m];if(_!==e[d+m]||_!==e[f+m]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];const u=a*n,d=o*n;for(let f=0;f!==n;++f)e[d+f]=e[u+f]}++o}}if(s>0){t[o]=t[s];for(let a=s*n,c=o*n,l=0;l!==n;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){const t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,i}}pn.prototype.TimeBufferType=Float32Array;pn.prototype.ValueBufferType=Float32Array;pn.prototype.DefaultInterpolation=zs;class os extends pn{constructor(t,e,n){super(t,e,n)}}os.prototype.ValueTypeName="bool";os.prototype.ValueBufferType=Array;os.prototype.DefaultInterpolation=Ns;os.prototype.InterpolantFactoryMethodLinear=void 0;os.prototype.InterpolantFactoryMethodSmooth=void 0;class pu extends pn{}pu.prototype.ValueTypeName="color";class es extends pn{}es.prototype.ValueTypeName="number";class I0 extends Gs{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-e)/(i-e);let l=t*a;for(let h=l+a;l!==h;l+=4)Oe.slerpFlat(s,0,o,l-a,o,l,c);return s}}class ns extends pn{InterpolantFactoryMethodLinear(t){return new I0(this.times,this.values,this.getValueSize(),t)}}ns.prototype.ValueTypeName="quaternion";ns.prototype.InterpolantFactoryMethodSmooth=void 0;class as extends pn{constructor(t,e,n){super(t,e,n)}}as.prototype.ValueTypeName="string";as.prototype.ValueBufferType=Array;as.prototype.DefaultInterpolation=Ns;as.prototype.InterpolantFactoryMethodLinear=void 0;as.prototype.InterpolantFactoryMethodSmooth=void 0;class is extends pn{}is.prototype.ValueTypeName="vector";class D0{constructor(t="",e=-1,n=[],i=Ud){this.name=t,this.tracks=n,this.duration=e,this.blendMode=i,this.uuid=Je(),this.duration<0&&this.resetDuration()}static parse(t){const e=[],n=t.tracks,i=1/(t.fps||1);for(let o=0,a=n.length;o!==a;++o)e.push(N0(n[o]).scale(i));const s=new this(t.name,t.duration,e,t.blendMode);return s.uuid=t.uuid,s}static toJSON(t){const e=[],n=t.tracks,i={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode};for(let s=0,o=n.length;s!==o;++s)e.push(pn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(t,e,n,i){const s=e.length,o=[];for(let a=0;a<s;a++){let c=[],l=[];c.push((a+s-1)%s,a,(a+1)%s),l.push(0,1,0);const h=R0(c);c=Ul(c,1,h),l=Ul(l,1,h),!i&&c[0]===0&&(c.push(s),l.push(l[0])),o.push(new es(".morphTargetInfluences["+e[a].name+"]",c,l).scale(1/n))}return new this(t,-1,o)}static findByName(t,e){let n=t;if(!Array.isArray(t)){const i=t;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===e)return n[i];return null}static CreateClipsFromMorphTargetSequences(t,e,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,c=t.length;a<c;a++){const l=t[a],h=l.name.match(s);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(l)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],e,n));return o}static parseAnimation(t,e){if(!t)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,m,_){if(f.length!==0){const p=[],g=[];fu(f,p,g,m),p.length!==0&&_.push(new u(d,p,g))}},i=[],s=t.name||"default",o=t.fps||30,a=t.blendMode;let c=t.length||-1;const l=t.hierarchy||[];for(let u=0;u<l.length;u++){const d=l[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let m;for(m=0;m<d.length;m++)if(d[m].morphTargets)for(let _=0;_<d[m].morphTargets.length;_++)f[d[m].morphTargets[_]]=-1;for(const _ in f){const p=[],g=[];for(let v=0;v!==d[m].morphTargets.length;++v){const x=d[m];p.push(x.time),g.push(x.morphTarget===_?1:0)}i.push(new es(".morphTargetInfluence["+_+"]",p,g))}c=f.length*o}else{const f=".bones["+e[u].name+"]";n(is,f+".position",d,"pos",i),n(ns,f+".quaternion",d,"rot",i),n(is,f+".scale",d,"scl",i)}}return i.length===0?null:new this(s,c,i,a)}resetDuration(){const t=this.tracks;let e=0;for(let n=0,i=t.length;n!==i;++n){const s=this.tracks[n];e=Math.max(e,s.times[s.times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){const t=[];for(let e=0;e<this.tracks.length;e++)t.push(this.tracks[e].clone());return new this.constructor(this.name,this.duration,t,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function U0(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return es;case"vector":case"vector2":case"vector3":case"vector4":return is;case"color":return pu;case"quaternion":return ns;case"bool":case"boolean":return os;case"string":return as}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function N0(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const t=U0(r.type);if(r.times===void 0){const e=[],n=[];fu(r.keys,e,n,"value"),r.times=e,r.values=n}return t.parse!==void 0?t.parse(r):new t(r.name,r.times,r.values,r.interpolation)}const Xn={enabled:!1,files:{},add:function(r,t){this.enabled!==!1&&(this.files[r]=t)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class z0{constructor(t,e,n){const i=this;let s=!1,o=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){a++,s===!1&&i.onStart!==void 0&&i.onStart(h,o,a),s=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){const u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){const f=l[u],m=l[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return m}return null}}}const F0=new z0;class cs{constructor(t){this.manager=t!==void 0?t:F0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(i,s){n.load(t,i,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}cs.DEFAULT_MATERIAL_NAME="__DEFAULT";const Mn={};class O0 extends Error{constructor(t,e){super(t),this.response=e}}class mu extends cs{constructor(t){super(t)}load(t,e,n,i){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=Xn.get(t);if(s!==void 0)return this.manager.itemStart(t),setTimeout(()=>{e&&e(s),this.manager.itemEnd(t)},0),s;if(Mn[t]!==void 0){Mn[t].push({onLoad:e,onProgress:n,onError:i});return}Mn[t]=[],Mn[t].push({onLoad:e,onProgress:n,onError:i});const o=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const h=Mn[t],u=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=d?parseInt(d):0,m=f!==0;let _=0;const p=new ReadableStream({start(g){v();function v(){u.read().then(({done:x,value:S})=>{if(x)g.close();else{_+=S.byteLength;const P=new ProgressEvent("progress",{lengthComputable:m,loaded:_,total:f});for(let T=0,w=h.length;T<w;T++){const D=h[T];D.onProgress&&D.onProgress(P)}g.enqueue(S),v()}},x=>{g.error(x)})}}});return new Response(p)}else throw new O0(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return l.json();default:if(a===void 0)return l.text();{const u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return l.arrayBuffer().then(m=>f.decode(m))}}}).then(l=>{Xn.add(t,l);const h=Mn[t];delete Mn[t];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(l)}}).catch(l=>{const h=Mn[t];if(h===void 0)throw this.manager.itemError(t),l;delete Mn[t];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(l)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}}class k0 extends cs{constructor(t){super(t)}load(t,e,n,i){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=this,o=Xn.get(t);if(o!==void 0)return s.manager.itemStart(t),setTimeout(function(){e&&e(o),s.manager.itemEnd(t)},0),o;const a=Fs("img");function c(){h(),Xn.add(t,this),e&&e(this),s.manager.itemEnd(t)}function l(u){h(),i&&i(u),s.manager.itemError(t),s.manager.itemEnd(t)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(t),a.src=t,a}}class B0 extends cs{constructor(t){super(t)}load(t,e,n,i){const s=new fe,o=new k0(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){s.image=a,s.needsUpdate=!0,e!==void 0&&e(s)},n,i),s}}class ro extends se{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Mt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}}class Ba extends ro{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(se.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Mt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const qo=new Et,Nl=new A,zl=new A;class Va{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Nt(512,512),this.map=null,this.mapPass=null,this.matrix=new Et,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ia,this._frameExtents=new Nt(1,1),this._viewportCount=1,this._viewports=[new te(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Nl.setFromMatrixPosition(t.matrixWorld),e.position.copy(Nl),zl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(zl),e.updateMatrixWorld(),qo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(qo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(qo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class V0 extends Va{constructor(){super(new ye(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){const e=this.camera,n=Qi*2*t.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=t.distance||e.far;(n!==e.fov||i!==e.aspect||s!==e.far)&&(e.fov=n,e.aspect=i,e.far=s,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class H0 extends ro{constructor(t,e,n=0,i=Math.PI/3,s=0,o=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(se.DEFAULT_UP),this.updateMatrix(),this.target=new se,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new V0}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const Fl=new Et,gs=new A,jo=new A;class G0 extends Va{constructor(){super(new ye(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Nt(4,2),this._viewportCount=6,this._viewports=[new te(2,1,1,1),new te(0,1,1,1),new te(3,1,1,1),new te(1,1,1,1),new te(3,0,1,1),new te(1,0,1,1)],this._cubeDirections=[new A(1,0,0),new A(-1,0,0),new A(0,0,1),new A(0,0,-1),new A(0,1,0),new A(0,-1,0)],this._cubeUps=[new A(0,1,0),new A(0,1,0),new A(0,1,0),new A(0,1,0),new A(0,0,1),new A(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,s=t.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),gs.setFromMatrixPosition(t.matrixWorld),n.position.copy(gs),jo.copy(n.position),jo.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(jo),n.updateMatrixWorld(),i.makeTranslation(-gs.x,-gs.y,-gs.z),Fl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Fl)}}class gu extends ro{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new G0}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class W0 extends Va{constructor(){super(new Da(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Yn extends ro{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(se.DEFAULT_UP),this.updateMatrix(),this.target=new se,this.shadow=new W0}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Ds{static decodeText(t){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(t);let e="";for(let n=0,i=t.length;n<i;n++)e+=String.fromCharCode(t[n]);try{return decodeURIComponent(escape(e))}catch{return e}}static extractUrlBase(t){const e=t.lastIndexOf("/");return e===-1?"./":t.slice(0,e+1)}static resolveURL(t,e){return typeof t!="string"||t===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}}class X0 extends cs{constructor(t){super(t),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(t){return this.options=t,this}load(t,e,n,i){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=this,o=Xn.get(t);if(o!==void 0){if(s.manager.itemStart(t),o.then){o.then(l=>{e&&e(l),s.manager.itemEnd(t)}).catch(l=>{i&&i(l)});return}return setTimeout(function(){e&&e(o),s.manager.itemEnd(t)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const c=fetch(t,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(l){return Xn.add(t,l),e&&e(l),s.manager.itemEnd(t),l}).catch(function(l){i&&i(l),Xn.remove(t),s.manager.itemError(t),s.manager.itemEnd(t)});Xn.add(t,c),s.manager.itemStart(t)}}class q0{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Ol(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Ol();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Ol(){return(typeof performance>"u"?Date:performance).now()}const Ha="\\[\\]\\.:\\/",j0=new RegExp("["+Ha+"]","g"),Ga="[^"+Ha+"]",Y0="[^"+Ha.replace("\\.","")+"]",K0=/((?:WC+[\/:])*)/.source.replace("WC",Ga),Z0=/(WCOD+)?/.source.replace("WCOD",Y0),$0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ga),J0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ga),Q0=new RegExp("^"+K0+Z0+$0+J0+"$"),tx=["material","materials","bones","map"];class ex{constructor(t,e,n){const i=n||Zt.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(t,e)}bind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}}class Zt{constructor(t,e,n){this.path=e,this.parsedPath=n||Zt.parseTrackName(e),this.node=Zt.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new Zt.Composite(t,e,n):new Zt(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(j0,"")}static parseTrackName(t){const e=Q0.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);const n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);tx.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){const n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){const n=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===e||a.uuid===e)return a;const c=n(a.children);if(c)return c}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node;const e=this.parsedPath,n=e.objectName,i=e.propertyName;let s=e.propertyIndex;if(t||(t=Zt.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===l){l=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}const o=t[i];if(o===void 0){const l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[s]!==void 0&&(s=t.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Zt.Composite=ex;Zt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Zt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Zt.prototype.GetterByBindingType=[Zt.prototype._getValue_direct,Zt.prototype._getValue_array,Zt.prototype._getValue_arrayElement,Zt.prototype._getValue_toArray];Zt.prototype.SetterByBindingTypeAndVersioning=[[Zt.prototype._setValue_direct,Zt.prototype._setValue_direct_setNeedsUpdate,Zt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Zt.prototype._setValue_array,Zt.prototype._setValue_array_setNeedsUpdate,Zt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Zt.prototype._setValue_arrayElement,Zt.prototype._setValue_arrayElement_setNeedsUpdate,Zt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Zt.prototype._setValue_fromArray,Zt.prototype._setValue_fromArray_setNeedsUpdate,Zt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];const kl=new Et;class _u{constructor(t,e,n=0,i=1/0){this.ray=new ks(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new La,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return kl.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(kl),this}intersectObject(t,e=!0,n=[]){return _a(t,this,n,e),n.sort(Bl),n}intersectObjects(t,e=!0,n=[]){for(let i=0,s=t.length;i<s;i++)_a(t[i],this,n,e);return n.sort(Bl),n}}function Bl(r,t){return r.distance-t.distance}function _a(r,t,e,n){let i=!0;if(r.layers.test(t.layers)&&r.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){const s=r.children;for(let o=0,a=s.length;o<a;o++)_a(s[o],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Aa}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Aa);class nx{renderer;scene;camera;clock=new q0;updates=[];raf=0;reduced;paused=!1;constructor(t){this.reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches,this.renderer=new Na({canvas:t,antialias:!0,alpha:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setClearColor(0,0),this.scene=new so,this.scene.fog=new za(16118250,80,150),this.camera=new ye(50,1,.1,500),this.camera.position.set(0,34,82),this.onResize(),window.addEventListener("resize",this.onResize)}get prefersReducedMotion(){return this.reduced}onUpdate(t){this.updates.push(t)}start(){const t=()=>{const e=Math.min(this.clock.getDelta(),.1);if(this.paused){this.raf=requestAnimationFrame(t);return}const n=this.clock.elapsedTime,i={dt:e,elapsed:n,renderer:this.renderer,scene:this.scene,camera:this.camera};for(const s of this.updates)s(i);this.renderer.render(this.scene,this.camera),this.raf=requestAnimationFrame(t)};this.raf=requestAnimationFrame(t)}stop(){cancelAnimationFrame(this.raf)}onResize=()=>{const t=this.renderer.domElement,e=t.clientWidth||window.innerWidth,n=t.clientHeight||window.innerHeight;this.renderer.setSize(e,n,!1),this.camera.aspect=e/n,this.camera.updateProjectionMatrix()}}function Wa(){try{const r=document.createElement("canvas");return!!(r.getContext("webgl2")||r.getContext("webgl"))}catch{return!1}}const ix=-18,Yo=16e3,sx=3,rx=.25,ox=.5,Vl=30,ax=.5,cx=.45,lx=.6,xa=32768,hx=.25,Sn=.26,ux=5,dx=1.1;function va(r,t){return r.setRGB((t>>16&255)/255,(t>>8&255)/255,(t&255)/255)}const Mr=xa-1;class xu{constructor(t){this.scene=t,this.geom=new dn(1,1,1),this.material=new tn({color:16777215,flatShading:!0}),this.instances=new Bs(this.geom,this.material,Yo),this.instances.castShadow=!1,this.instances.frustumCulled=!1,this.instances.count=0,this.scene.add(this.instances)}geom;material;instances;active=[];tmpMatrix=new Et;tmpScaleVec=new A;tmpColor=new Mt;dirtyMin=-1;dirtyMax=-1;colorDirty=!1;worldCollider=null;sink=null;hashHeads=new Int32Array(xa);hashKeys=new Int32Array(xa);nextInCell=new Int32Array(Yo);chunkPool=[];tmpDir=new A;spawnDensity=1;collisionHalfRate=!1;collisionPhase=0;cullSphere(t,e,n,i){const s=i*i;for(let o=this.active.length-1;o>=0;o--){const a=this.active[o].position,c=a.x-t,l=a.y-e,h=a.z-n;c*c+l*l+h*h<=s&&this.removeAt(o)}}cullFar(t,e,n){const i=n*n;for(let s=this.active.length-1;s>=0;s--){const o=this.active[s].position,a=o.x-t,c=o.z-e;a*a+c*c>i&&this.removeAt(s)}}cullBox(t,e,n,i){for(let s=this.active.length-1;s>=0;s--){const o=this.active[s].position;o.x>=t&&o.x<=e&&o.z>=n&&o.z<=i&&this.removeAt(s)}}removeAt(t){const e=this.active[t];this.chunkPool.push(e);const n=this.active.length-1;if(t!==n){const i=this.active[n];this.active[t]=i,i.slot=t,this.tmpScaleVec.set(i.scale,i.scale,i.scale),this.tmpMatrix.compose(i.position,i.quaternion,this.tmpScaleVec),this.instances.setMatrixAt(t,this.tmpMatrix),va(this.tmpColor,i.color),this.instances.setColorAt(t,this.tmpColor),this.colorDirty=!0,this.markSlotDirty(t)}this.active.pop(),this.instances.count=this.active.length}setWorldCollider(t){this.worldCollider=t}setDebrisSink(t){this.sink=t}setSpawnDensity(t){this.spawnDensity=t}setCollisionHalfRate(t){this.collisionHalfRate=t}getMesh(){return this.instances}spawn(t,e,n,i,s,o=hx){for(const a of t){if(this.active.length>=Yo)break;if(this.spawnDensity<1&&Math.random()>this.spawnDensity)continue;const c=this.active.length,l=this.chunkPool.pop()??px(),h=this.tmpDir.subVectors(a.worldPosition,e);h.lengthSq()<.01&&h.set((Math.random()-.5)*2,.6+Math.random()*.4,(Math.random()-.5)*2),h.normalize(),h.y+=.35,h.normalize();const d=.8/(1+a.worldPosition.distanceToSquared(e)*.3),f=n*(.75+Math.random()*.5)*(1+d),m=l.velocity.copy(h).multiplyScalar(f);if(m.x+=(Math.random()-.5)*3.2,m.z+=(Math.random()-.5)*3.2,m.y+=Math.random()*1,i){const _=m.x*i.x+m.y*i.y+m.z*i.z;_>0&&(m.x-=_*i.x*1.5,m.y-=_*i.y*1.5,m.z-=_*i.z*1.5)}s&&(m.x+=s.x,m.y+=s.y,m.z+=s.z),l.angularVelocity.set((Math.random()-.5)*14,(Math.random()-.5)*14,(Math.random()-.5)*14),l.slot=c,l.position.copy(a.worldPosition),l.quaternion.identity(),l.scale=a.size,l.color=a.color,l.groundedTime=0,l.totalLife=0,l.collisionDelay=o,l.stuckTime=0,l.rollsLeft=ux,l.atRest=!1,this.active.push(l),va(this.tmpColor,a.color),this.instances.setColorAt(c,this.tmpColor),this.colorDirty=!0,this.markSlotDirty(c)}this.instances.count=this.active.length}update(t){this.collisionPhase^=1,(!this.collisionHalfRate||this.collisionPhase===1)&&this.collidePairs();for(let e=this.active.length-1;e>=0;e--){const n=this.active[e];if(n.totalLife+=t,n.atRest){n.groundedTime+=t,(n.groundedTime>=sx||n.totalLife>=Vl)&&this.removeAt(e);continue}n.velocity.y+=ix*t,n.collisionDelay>0&&(n.collisionDelay-=t);const i=this.worldCollider,s=n.velocity.x*t,o=n.velocity.y*t,a=n.velocity.z*t;let c=0;if(i&&n.collisionDelay<=0){let f=s>Sn||s<-Sn?Math.ceil(Math.abs(s)/Sn):1,m=s/f;for(;f>0;f--){const _=n.position.x+m;if(i.isOccupied(_,n.position.y,n.position.z)){n.velocity.x*=-.35,c++;break}n.position.x=_}for(f=o>Sn||o<-Sn?Math.ceil(Math.abs(o)/Sn):1,m=o/f;f>0;f--){const _=n.position.y+m;if(i.isOccupied(n.position.x,_,n.position.z)){n.velocity.y*=-.35,c++;break}n.position.y=_}for(f=a>Sn||a<-Sn?Math.ceil(Math.abs(a)/Sn):1,m=a/f;f>0;f--){const _=n.position.z+m;if(i.isOccupied(n.position.x,n.position.y,_)){n.velocity.z*=-.35,c++;break}n.position.z=_}}else n.position.x+=s,n.position.y+=o,n.position.z+=a;if(c>=3){if(n.stuckTime+=t,n.stuckTime>=ax){this.removeAt(e);continue}}else n.stuckTime=0;{const f=n.quaternion,m=n.angularVelocity.x*.5*t,_=n.angularVelocity.y*.5*t,p=n.angularVelocity.z*.5*t,g=m*f.w+_*f.z-p*f.y,v=_*f.w-m*f.z+p*f.x,x=p*f.w+m*f.y-_*f.x,S=-m*f.x-_*f.y-p*f.z;f.set(f.x+g,f.y+v,f.z+x,f.w+S).normalize()}const l=.15+n.scale*.5;n.position.y<l&&(n.position.y=l,n.velocity.y*=-.15,n.velocity.x*=.62,n.velocity.z*=.62,n.angularVelocity.multiplyScalar(.6));const h=n.position.y<=l+.05,u=!h&&i!==null&&n.collisionDelay<=0&&i.isOccupied(n.position.x,n.position.y-n.scale*.6,n.position.z),d=n.velocity.lengthSq()<rx&&n.angularVelocity.lengthSq()<ox;if((h||u)&&d){if(u&&!h&&n.rollsLeft>0&&i){const f=Math.max(.18,n.scale*1.2),m=Math.random()*4|0;let _=!1;for(let p=0;p<4&&!_;p++){const g=m+p&3,v=g===0?1:g===1?-1:0,x=g===2?1:g===3?-1:0,S=n.position.x+v*f,P=n.position.z+x*f;if(!i.isOccupied(S,n.position.y,P)&&!i.isOccupied(S,n.position.y-f,P)){const T=dx*(.8+Math.random()*.5);n.velocity.x=v*T,n.velocity.z=x*T,n.velocity.y=.4,n.angularVelocity.x=(Math.random()-.5)*6,n.angularVelocity.z=(Math.random()-.5)*6,n.rollsLeft--,_=!0}}if(_){this.tmpScaleVec.set(n.scale,n.scale,n.scale),this.tmpMatrix.compose(n.position,n.quaternion,this.tmpScaleVec),this.instances.setMatrixAt(n.slot,this.tmpMatrix),this.markSlotDirty(n.slot);continue}}if(this.sink&&this.sink.settle(n.position,n.scale,n.color)){this.removeAt(e);continue}n.atRest=!0,n.velocity.set(0,0,0),n.angularVelocity.set(0,0,0),n.groundedTime=t}else n.groundedTime=0;if(n.totalLife>=Vl){this.sink?.settle(n.position,n.scale,n.color),this.removeAt(e);continue}this.tmpScaleVec.set(n.scale,n.scale,n.scale),this.tmpMatrix.compose(n.position,n.quaternion,this.tmpScaleVec),this.instances.setMatrixAt(n.slot,this.tmpMatrix),this.markSlotDirty(n.slot)}this.flushDirty()}collidePairs(){const t=this.active.length;if(t<2)return;const e=this.hashHeads,n=this.hashKeys,i=this.nextInCell;e.fill(-1);const s=1/lx;for(let o=0;o<t;o++){const a=this.active[o];if(a.atRest||a.collisionDelay>0)continue;const c=Hl(Math.floor(a.position.x*s),Math.floor(a.position.y*s),Math.floor(a.position.z*s));let l=c&Mr;for(;;){if(e[l]===-1){n[l]=c,i[o]=-1,e[l]=o;break}if(n[l]===c){i[o]=e[l],e[l]=o;break}l=l+1&Mr}}for(let o=0;o<t;o++){const a=this.active[o];if(a.atRest||a.collisionDelay>0)continue;const c=Math.floor(a.position.x*s),l=Math.floor(a.position.y*s),h=Math.floor(a.position.z*s);for(let u=-1;u<=1;u++)for(let d=-1;d<=1;d++)for(let f=-1;f<=1;f++){const m=Hl(c+u,l+d,h+f);let _=m&Mr;for(;;){const p=e[_];if(p===-1)break;if(n[_]===m){for(let g=p;g!==-1;g=i[g])g>o&&this.resolvePair(a,this.active[g]);break}_=_+1&Mr}}}}resolvePair(t,e){const n=(t.scale+e.scale)*cx,i=e.position.x-t.position.x,s=e.position.y-t.position.y,o=e.position.z-t.position.z,a=i*i+s*s+o*o;if(a>=n*n||a<1e-8)return;const c=Math.sqrt(a),l=i/c,h=s/c,u=o/c,d=(n-c)*.5;t.position.x-=l*d,t.position.y-=h*d,t.position.z-=u*d,e.position.x+=l*d,e.position.y+=h*d,e.position.z+=u*d;const f=(e.velocity.x-t.velocity.x)*l+(e.velocity.y-t.velocity.y)*h+(e.velocity.z-t.velocity.z)*u;if(f>=0)return;const m=-1.15*f*.5;t.velocity.x-=l*m,t.velocity.y-=h*m,t.velocity.z-=u*m,e.velocity.x+=l*m,e.velocity.y+=h*m,e.velocity.z+=u*m}clear(){for(const t of this.active)this.chunkPool.push(t);this.active.length=0,this.instances.count=0,this.flushDirty()}dispose(){this.clear(),this.scene.remove(this.instances),this.instances.dispose(),this.geom.dispose(),this.material.dispose()}markSlotDirty(t){this.dirtyMin===-1?(this.dirtyMin=t,this.dirtyMax=t):(t<this.dirtyMin&&(this.dirtyMin=t),t>this.dirtyMax&&(this.dirtyMax=t))}flushDirty(){if(this.dirtyMin===-1)return;const t=this.instances.instanceMatrix;if(t.clearUpdateRanges(),t.addUpdateRange(this.dirtyMin*16,(this.dirtyMax-this.dirtyMin+1)*16),t.needsUpdate=!0,this.colorDirty&&this.instances.instanceColor){const e=this.instances.instanceColor;e.clearUpdateRanges(),e.addUpdateRange(this.dirtyMin*3,(this.dirtyMax-this.dirtyMin+1)*3),e.needsUpdate=!0,this.colorDirty=!1}this.dirtyMin=-1,this.dirtyMax=-1}}function Hl(r,t,e){return r*73856093^t*19349663^e*83492791|0}class fx{pool=[];view=[];used=0;begin(){return this.view.length=0,this.used=0,this.view}add(t,e,n,i,s){let o=this.pool[this.used];o||(o={worldPosition:new A,color:0,size:0},this.pool[this.used]=o),this.used++,o.worldPosition.set(t,e,n),o.color=i,o.size=s,this.view.push(o)}}const ie=new fx;function px(){return{slot:0,position:new A,velocity:new A,quaternion:new Oe,angularVelocity:new A,scale:1,color:16777215,groundedTime:0,totalLife:0,collisionDelay:0,stuckTime:0,rollsLeft:0,atRest:!1}}const vu=typeof SharedArrayBuffer<"u";function yu(r){return vu?new Uint8Array(new SharedArrayBuffer(r)):new Uint8Array(r)}function mx(r){return vu?new Int32Array(new SharedArrayBuffer(r*4)):new Int32Array(r)}const Ae=1<<24;class gx{constructor(t,e,n,i){this.chunkX=t,this.chunkY=e,this.chunkZ=n,this.geometry=new ke,this.mesh=new It(this.geometry,i),this.mesh.castShadow=!1,this.mesh.receiveShadow=!1,this.mesh.frustumCulled=!0}mesh;geometry;positions=new Float32Array(0);normals=new Float32Array(0);colors=new Uint8Array(0);indices=new Uint32Array(0);capQuads=0;ensureCapacity(t){if(t<=this.capQuads)return!1;this.capQuads=Math.ceil(t*1.25);const e=new Float32Array(this.capQuads*12),n=new Float32Array(this.capQuads*12),i=new Uint8Array(this.capQuads*12),s=new Uint32Array(this.capQuads*6);return e.set(this.positions),n.set(this.normals),i.set(this.colors),s.set(this.indices),this.positions=e,this.normals=n,this.colors=i,this.indices=s,this.geometry.setAttribute("position",new de(this.positions,3)),this.geometry.setAttribute("normal",new de(this.normals,3)),this.geometry.setAttribute("color",new de(this.colors,3,!0)),this.geometry.setIndex(new de(this.indices,1)),!0}}const he=32,He=he+2,Sr=new Int32Array(He*He*He),_s=new Int32Array(he*he);let Zr=new Float32Array(0),$r=new Float32Array(0),Jr=new Uint8Array(0),xs=0;function _x(r){if(r<=xs)return;xs=Math.ceil(r*1.5)+16;const t=new Float32Array(xs*12),e=new Float32Array(xs*12),n=new Uint8Array(xs*12);t.set(Zr),e.set($r),n.set(Jr),Zr=t,$r=e,Jr=n}function Vi(r){r&=16777215;const t=.93+Math.random()*.14,e=Math.min(255,(r>>16&255)*t|0),n=Math.min(255,(r>>8&255)*t|0),i=Math.min(255,(r&255)*t|0);return e<<16|n<<8|i}const xx=56,Gl=18,zi=96;class vx{pivot;material;glassMaterial;blocks;gridSizeX;gridSizeY;gridSizeZ;aliveFlags;currentAlive;gridIdx;globalToChunk;drawnFlags;chunks;chunksW;chunksH;dirtyChunks=new Set;blockSize;originX;originZ;offX;offZ;diagonalGrounding;maxSpan;crushLoad;floodVisited=null;floodQueue=null;groundedFlags=null;spanOf=null;sweepHead=0;sweepTail=0;groundCursor=0;loadOf=null;loadCursor=-1;cantileverCursor=0;crushedInSweep=!1;constructor(t,e,n,i){this.blocks=t,this.blockSize=e,this.gridSizeX=n.x,this.gridSizeY=n.y,this.gridSizeZ=n.z,this.originX=i?.originX??0,this.originZ=i?.originZ??0,this.offX=n.x*e/2-this.originX,this.offZ=n.z*e/2-this.originZ,this.diagonalGrounding=i?.diagonalGrounding??!1,this.maxSpan=Math.min(255,i?.maxSpan??xx),this.crushLoad=i?.crushLoad??1/0,this.aliveFlags=yu(t.length),this.aliveFlags.fill(1),this.currentAlive=t.length,this.gridIdx=mx(n.x*n.y*n.z),this.gridIdx.fill(-1),this.globalToChunk=new Int32Array(t.length),this.drawnFlags=new Uint8Array(t.length),this.drawnFlags.fill(1);for(let d=0;d<t.length;d++){const f=t[d],m=f.gx+f.gy*n.x+f.gz*n.x*n.y;this.gridIdx[m]=d}this.pivot=new $e,this.pivot.position.set(this.originX,0,this.originZ),this.material=new tn({color:16777215,vertexColors:!0});const s=e;this.material.onBeforeCompile=d=>{d.uniforms.uBlockSize={value:s},d.vertexShader=d.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vCellPos;
varying vec3 vCellNormal;`).replace("#include <begin_vertex>",`#include <begin_vertex>
vCellPos = (modelMatrix * vec4(position, 1.0)).xyz;
vCellNormal = normalize(mat3(modelMatrix) * normal);`),d.fragmentShader=d.fragmentShader.replace("#include <common>",`#include <common>
uniform float uBlockSize;
varying vec3 vCellPos;
varying vec3 vCellNormal;
float cellHash(vec3 c) {
  return fract(sin(dot(c, vec3(127.1, 311.7, 74.7))) * 43758.5453);
}`).replace("#include <color_fragment>",`#include <color_fragment>
{
  vec3 cell = floor((vCellPos - vCellNormal * uBlockSize * 0.5) / uBlockSize);
  diffuseColor.rgb *= 0.93 + 0.14 * cellHash(cell);
}`)},this.glassMaterial=new tn({color:16777215,vertexColors:!0,transparent:!0,opacity:.5,depthWrite:!1}),this.chunksW=Math.ceil(n.x/he),this.chunksH=Math.ceil(n.y/he);const o=Math.ceil(n.z/he),a=this.chunksW*this.chunksH*o,c=new Uint8Array(a);for(let d=0;d<t.length;d++){const f=t[d],m=(f.gx>>5)+(f.gy>>5)*this.chunksW+(f.gz>>5)*this.chunksW*this.chunksH;this.globalToChunk[d]=m,c[m]=1}this.chunks=new Array(a);const l=he*e,h=n.x*e/2,u=n.z*e/2;for(let d=0;d<a;d++){if(c[d]!==1)continue;const f=d%this.chunksW,m=Math.floor(d/this.chunksW)%this.chunksH,_=Math.floor(d/(this.chunksW*this.chunksH)),p=new gx(f,m,_,[this.material,this.glassMaterial]);this.chunks[d]=p,this.pivot.add(p.mesh);const g=f*l-h,v=m*l,x=_*l-u,S=new en(new A(g,v,x),new A(g+l,v+l,x+l));p.geometry.boundingBox=S;const P=new nn;S.getBoundingSphere(P),p.geometry.boundingSphere=P,this.remeshChunk(d)}}eraseDrawn(t){if(this.drawnFlags[t]!==1)return;this.drawnFlags[t]=0;const e=this.blocks[t];this.dirtyChunks.add(this.globalToChunk[t]);const n=e.gx&he-1,i=e.gy&he-1,s=e.gz&he-1;n===0?this.dirtyChunkAt(e.gx-1,e.gy,e.gz):n===he-1&&this.dirtyChunkAt(e.gx+1,e.gy,e.gz),i===0?this.dirtyChunkAt(e.gx,e.gy-1,e.gz):i===he-1&&this.dirtyChunkAt(e.gx,e.gy+1,e.gz),s===0?this.dirtyChunkAt(e.gx,e.gy,e.gz-1):s===he-1&&this.dirtyChunkAt(e.gx,e.gy,e.gz+1)}dirtyChunkAt(t,e,n){if(t<0||e<0||n<0||t>=this.gridSizeX||e>=this.gridSizeY||n>=this.gridSizeZ)return;const i=(t>>5)+(e>>5)*this.chunksW+(n>>5)*this.chunksW*this.chunksH;this.chunks[i]&&this.dirtyChunks.add(i)}remeshChunk(t){const e=this.chunks[t];if(!e)return;const n=e.chunkX*he,i=e.chunkY*he,s=e.chunkZ*he,o=Math.min(he,this.gridSizeX-n),a=Math.min(he,this.gridSizeY-i),c=Math.min(he,this.gridSizeZ-s);Sr.fill(-1);const l=this.drawnFlags;for(let z=-1;z<=c;z++)for(let N=-1;N<=a;N++)for(let O=-1;O<=o;O++){const G=this.indexAtFast(n+O,i+N,s+z);G<0||l[G]!==1||(Sr[O+1+(N+1)*He+(z+1)*He*He]=this.blocks[G].color)}const h=this.blockSize,u=this.gridSizeX*h/2,d=this.gridSizeZ*h/2,f=[u,0,d],m=[o,a,c],_=[1,He,He*He];let p=0,g=0;e.ensureCapacity(Math.max(64,e.capQuads));let v=e.positions,x=e.normals,S=e.colors,P=e.indices;for(let z=0;z<3;z++){const N=(z+1)%3,O=(z+2)%3,G=m[N],X=m[O];for(let K=0;K<2;K++){const q=K===0?1:-1;for(let ct=0;ct<m[z];ct++){const dt=1+He+He*He;for(let nt=0;nt<X;nt++)for(let pt=0;pt<G;pt++){const Rt=dt+ct*_[z]+pt*_[N]+nt*_[O],H=Sr[Rt];_s[nt*G+pt]=H>=0&&Sr[Rt+q*_[z]]<0?H:-1}for(let nt=0;nt<X;nt++)for(let pt=0;pt<G;){const Rt=_s[nt*G+pt];if(Rt<0){pt++;continue}let H=1;for(;pt+H<G&&_s[nt*G+pt+H]===Rt;)H++;let $=1,rt=!0;for(;rt&&nt+$<X;){for(let W=0;W<H;W++)if(_s[(nt+$)*G+pt+W]!==Rt){rt=!1;break}rt&&$++}for(let W=0;W<$;W++)for(let Y=0;Y<H;Y++)_s[(nt+W)*G+pt+Y]=-1;const it=[n,i,s],xt=(it[z]+ct+(q>0?1:0))*h-f[z],gt=(it[N]+pt)*h-f[N],At=(it[N]+pt+H)*h-f[N],L=(it[O]+nt)*h-f[O],zt=(it[O]+nt+$)*h-f[O],Bt=q>0?[[gt,L],[At,L],[At,zt],[gt,zt]]:[[gt,L],[gt,zt],[At,zt],[At,L]],Qt=Rt&16777215,St=Qt>>16&255,Wt=Qt>>8&255,Ft=Qt&255,Lt=(Rt&Ae)!==0;let ee,R,M,k;if(Lt)_x(g+1),ee=Zr,R=$r,M=Jr,k=g*12,g++;else{e.ensureCapacity(p+1)&&(v=e.positions,x=e.normals,S=e.colors,P=e.indices),ee=v,R=x,M=S,k=p*12;const W=p*4,Y=p*6;P[Y]=W,P[Y+1]=W+1,P[Y+2]=W+2,P[Y+3]=W,P[Y+4]=W+2,P[Y+5]=W+3,p++}for(let W=0;W<4;W++){const Y=Bt[W];ee[k+W*3+z]=xt,ee[k+W*3+N]=Y[0],ee[k+W*3+O]=Y[1],R[k+W*3+z]=q,R[k+W*3+N]=0,R[k+W*3+O]=0,M[k+W*3]=St,M[k+W*3+1]=Wt,M[k+W*3+2]=Ft}pt+=H}}}}if(e.ensureCapacity(p+g)&&(v=e.positions,x=e.normals,S=e.colors,P=e.indices),g>0){v.set(Zr.subarray(0,g*12),p*12),x.set($r.subarray(0,g*12),p*12),S.set(Jr.subarray(0,g*12),p*12);for(let z=0;z<g;z++){const N=(p+z)*4,O=(p+z)*6;P[O]=N,P[O+1]=N+1,P[O+2]=N+2,P[O+3]=N,P[O+4]=N+2,P[O+5]=N+3}}const T=p*6;p+=g;const w=e.geometry;w.clearGroups(),w.addGroup(0,T,0),g>0&&w.addGroup(T,g*6,1);const D=w.getAttribute("position"),E=w.getAttribute("normal"),y=w.getAttribute("color"),C=w.getIndex();D.clearUpdateRanges(),D.addUpdateRange(0,p*12),D.needsUpdate=!0,E.clearUpdateRanges(),E.addUpdateRange(0,p*12),E.needsUpdate=!0,y.clearUpdateRanges(),y.addUpdateRange(0,p*12),y.needsUpdate=!0,C.clearUpdateRanges(),C.addUpdateRange(0,p*6),C.needsUpdate=!0,w.setDrawRange(0,p*6),e.mesh.visible=p>0}surfaceMeshes(){const t=[];for(const e of this.chunks)e&&t.push(e.mesh);return t}aliveCount(){return this.currentAlive}totalCount(){return this.blocks.length}isAlive(t){return this.aliveFlags[t]===1}indexAt(t,e,n){return t<0||e<0||n<0||t>=this.gridSizeX||e>=this.gridSizeY||n>=this.gridSizeZ?-1:this.gridIdx[t+e*this.gridSizeX+n*this.gridSizeX*this.gridSizeY]}indexAtFast(t,e,n){return t<0||e<0||n<0||t>=this.gridSizeX||e>=this.gridSizeY||n>=this.gridSizeZ?-1:this.gridIdx[t+e*this.gridSizeX+n*this.gridSizeX*this.gridSizeY]}isOccupied(t,e,n){const i=Math.floor((t+this.offX)/this.blockSize),s=Math.floor(e/this.blockSize),o=Math.floor((n+this.offZ)/this.blockSize);if(i<0||s<0||o<0||i>=this.gridSizeX||s>=this.gridSizeY||o>=this.gridSizeZ)return!1;const a=this.gridIdx[i+s*this.gridSizeX+o*this.gridSizeX*this.gridSizeY];return a>=0&&this.aliveFlags[a]===1}removeBlocksAtWorld(t){const e=this.scratchRemoveBuf;e.length=0;for(let n=0;n+2<t.length;n+=3){const i=Math.floor((t[n]+this.offX)/this.blockSize),s=Math.floor(t[n+1]/this.blockSize),o=Math.floor((t[n+2]+this.offZ)/this.blockSize);if(i<0||s<0||o<0||i>=this.gridSizeX||s>=this.gridSizeY||o>=this.gridSizeZ)continue;const a=this.gridIdx[i+s*this.gridSizeX+o*this.gridSizeX*this.gridSizeY];a>=0&&this.aliveFlags[a]===1&&e.push(a)}return e.length>0&&(this.killBlocks(e),this.hideBlocks(e)),e.length}scratchRemoveBuf=[];sharedGrid(){return{aliveFlags:this.aliveFlags,gridIdx:this.gridIdx,sizeX:this.gridSizeX,sizeY:this.gridSizeY,sizeZ:this.gridSizeZ,blockSize:this.blockSize,originX:this.originX,originZ:this.originZ}}packedCoords(){const t=new Int32Array(this.blocks.length);for(let e=0;e<this.blocks.length;e++){const n=this.blocks[e];t[e]=n.gx|n.gy<<10|n.gz<<20}return t}structuralParams(){return{maxSpan:this.maxSpan,diagonalGrounding:this.diagonalGrounding,crushLoad:this.crushLoad}}getWorldPosition(t,e){const n=this.blocks[t],i=this.offX,s=this.offZ;return e.set(n.gx*this.blockSize-i+this.blockSize/2,n.gy*this.blockSize+this.blockSize/2,n.gz*this.blockSize-s+this.blockSize/2),e}raycastVoxel(t,e,n,i){const s=this.blockSize,o=this.offX,a=this.offZ,c=1e-9,l=-o,h=this.gridSizeX*s-o,u=0,d=this.gridSizeY*s,f=-a,m=this.gridSizeZ*s-a;let _=0,p=n;if(Math.abs(e.x)<c){if(t.x<l||t.x>h)return null}else{const xt=1/e.x,gt=(l-t.x)*xt,At=(h-t.x)*xt;_=Math.max(_,Math.min(gt,At)),p=Math.min(p,Math.max(gt,At))}if(Math.abs(e.y)<c){if(t.y<u||t.y>d)return null}else{const xt=1/e.y,gt=(u-t.y)*xt,At=(d-t.y)*xt;_=Math.max(_,Math.min(gt,At)),p=Math.min(p,Math.max(gt,At))}if(Math.abs(e.z)<c){if(t.z<f||t.z>m)return null}else{const xt=1/e.z,gt=(f-t.z)*xt,At=(m-t.z)*xt;_=Math.max(_,Math.min(gt,At)),p=Math.min(p,Math.max(gt,At))}if(_>p)return null;const g=Math.max(0,_-s),v=Math.min(n,p+s)-g,x=t.x+e.x*g,S=t.y+e.y*g,P=t.z+e.z*g,T=(x+o)/s,w=S/s,D=(P+a)/s;let E=Math.floor(T),y=Math.floor(w),C=Math.floor(D);const z=e.x>0?1:e.x<0?-1:0,N=e.y>0?1:e.y<0?-1:0,O=e.z>0?1:e.z<0?-1:0,G=Math.abs(e.x),X=Math.abs(e.y),K=Math.abs(e.z),q=G<c?1/0:s/G,ct=X<c?1/0:s/X,dt=K<c?1/0:s/K;let nt;z>0?nt=(E+1-T)*s/Math.max(G,c):z<0?nt=(T-E)*s/Math.max(G,c):nt=1/0;let pt;N>0?pt=(y+1-w)*s/Math.max(X,c):N<0?pt=(w-y)*s/Math.max(X,c):pt=1/0;let Rt;O>0?Rt=(C+1-D)*s/Math.max(K,c):O<0?Rt=(D-C)*s/Math.max(K,c):Rt=1/0;let H=0,$=0,rt=0;if(this.cellInBounds(E,y,C)){const xt=this.indexAtFast(E,y,C);if(xt>=0&&this.aliveFlags[xt]===1)return i.point.set(x,S,P),i.blockIdx=xt,i.normal.set(-e.x,-e.y,-e.z).normalize(),i}const it=Math.ceil(v/s)*3+8;for(let xt=0;xt<it;xt++){if(nt<pt&&nt<Rt?(E+=z,H=nt,nt+=q,$=0,rt=-z):pt<Rt?(y+=N,H=pt,pt+=ct,$=1,rt=-N):(C+=O,H=Rt,Rt+=dt,$=2,rt=-O),H>v)return null;const gt=this.indexAtFast(E,y,C);if(!(gt<0||this.aliveFlags[gt]!==1))return i.point.set(t.x+e.x*(g+H),t.y+e.y*(g+H),t.z+e.z*(g+H)),i.blockIdx=gt,i.normal.set(0,0,0),$===0?i.normal.x=rt:$===1?i.normal.y=rt:i.normal.z=rt,i}return null}collectAliveAlongRay(t,e,n,i){i.length=0;const s=this.blockSize,o=this.offX,a=this.offZ,c=(t.x+o)/s,l=t.y/s,h=(t.z+a)/s;let u=Math.floor(c),d=Math.floor(l),f=Math.floor(h);const m=e.x>0?1:e.x<0?-1:0,_=e.y>0?1:e.y<0?-1:0,p=e.z>0?1:e.z<0?-1:0,g=1e-9,v=Math.abs(e.x),x=Math.abs(e.y),S=Math.abs(e.z),P=v<g?1/0:s/v,T=x<g?1/0:s/x,w=S<g?1/0:s/S;let D=m>0?(u+1-c)*s/Math.max(v,g):m<0?(c-u)*s/Math.max(v,g):1/0,E=_>0?(d+1-l)*s/Math.max(x,g):_<0?(l-d)*s/Math.max(x,g):1/0,y=p>0?(f+1-h)*s/Math.max(S,g):p<0?(h-f)*s/Math.max(S,g):1/0;const C=this.indexAtFast(u,d,f);C>=0&&this.aliveFlags[C]===1&&i.push(C);let z=0;for(let N=0;N<4096&&(D<E&&D<y?(u+=m,z=D,D+=P):E<y?(d+=_,z=E,E+=T):(f+=p,z=y,y+=w),!(z>n));N++){const O=this.indexAtFast(u,d,f);O>=0&&this.aliveFlags[O]===1&&i.push(O)}return i}cellInBounds(t,e,n){return t>=0&&e>=0&&n>=0&&t<this.gridSizeX&&e<this.gridSizeY&&n<this.gridSizeZ}findIndicesInRadius(t,e,n){n.length=0;const i=e*e,s=this.offX,o=this.offZ,a=(t.x+s)/this.blockSize,c=(t.y-this.blockSize/2)/this.blockSize,l=(t.z+o)/this.blockSize,h=Math.ceil(e/this.blockSize)+1,u=Math.max(0,Math.floor(a-h)),d=Math.min(this.gridSizeX-1,Math.ceil(a+h)),f=Math.max(0,Math.floor(c-h)),m=Math.min(this.gridSizeY-1,Math.ceil(c+h)),_=Math.max(0,Math.floor(l-h)),p=Math.min(this.gridSizeZ-1,Math.ceil(l+h)),g=this.blockSize/2;for(let v=u;v<=d;v++){const S=v*this.blockSize-s+g-t.x,P=S*S;for(let T=f;T<=m;T++){const D=T*this.blockSize+g-t.y,E=D*D;if(!(P+E>i))for(let y=_;y<=p;y++){const z=y*this.blockSize-o+g-t.z;if(P+E+z*z>i)continue;const O=this.indexAtFast(v,T,y);O<0||this.aliveFlags[O]!==1||n.push(O)}}}return n}beginDisconnectSweep(){const t=this.blocks.length;this.floodVisited||(this.floodVisited=new Uint8Array(t),this.floodQueue=new Int32Array(t),this.groundedFlags=new Uint8Array(t),this.spanOf=new Uint8Array(t)),this.floodVisited.fill(0),this.groundedFlags.fill(0),this.sweepTail=0,this.sweepHead=0,this.groundCursor=0,Number.isFinite(this.crushLoad)?(this.loadOf??=new Float32Array(this.blocks.length),this.loadOf.fill(0),this.loadCursor=this.blocks.length-1):this.loadCursor=-1,this.cantileverCursor=0,this.crushedInSweep=!1}stepGrounding(t){const e=this.blocks,n=this.floodVisited,i=this.floodQueue,s=this.groundedFlags,o=this.spanOf,a=Math.min(this.groundCursor+t,e.length);for(let c=this.groundCursor;c<a;c++){if(this.aliveFlags[c]!==1)continue;const l=e[c];if(l.gy===0)s[c]=1;else{const h=this.indexAtFast(l.gx,l.gy-1,l.gz);if(h>=0&&this.aliveFlags[h]===1&&s[h]===1)s[c]=1;else if(this.diagonalGrounding){const u=(d,f)=>{const m=this.indexAtFast(d,l.gy-1,f);return m>=0&&this.aliveFlags[m]===1&&s[m]===1};if(u(l.gx-1,l.gz)||u(l.gx+1,l.gz)||u(l.gx,l.gz-1)||u(l.gx,l.gz+1))s[c]=1;else continue}else continue}n[c]=1,o[c]=this.maxSpan,i[this.sweepTail++]=c}return this.groundCursor=a,a>=e.length}stepLoad(t){const e=this.blocks,n=this.loadOf,i=this.spanOf,s=this.floodQueue,o=this.maxSpan;let a=this.loadCursor,c=0;for(;a>=0&&c<t;){const l=e[a].gy;let h=a;for(;h>=0&&e[h].gy===l;)h--;if(l===0){a=h;break}let u=0;for(let f=h+1;f<=a;f++){if(this.aliveFlags[f]!==1)continue;const m=e[f];this.aliveAt(m.gx,m.gy-1,m.gz)>=0||this.aliveAt(m.gx-1,m.gy-1,m.gz)>=0||this.aliveAt(m.gx+1,m.gy-1,m.gz)>=0||this.aliveAt(m.gx,m.gy-1,m.gz-1)>=0||this.aliveAt(m.gx,m.gy-1,m.gz+1)>=0?(i[f]=0,s[u++]=f):i[f]=255}let d=0;for(;d<u;){const f=s[d++],m=i[f];if(m>=o||m>=254)continue;const _=e[f];let p=this.aliveAt(_.gx+1,_.gy,_.gz);p>=0&&i[p]===255&&(i[p]=m+1,s[u++]=p),p=this.aliveAt(_.gx-1,_.gy,_.gz),p>=0&&i[p]===255&&(i[p]=m+1,s[u++]=p),p=this.aliveAt(_.gx,_.gy,_.gz+1),p>=0&&i[p]===255&&(i[p]=m+1,s[u++]=p),p=this.aliveAt(_.gx,_.gy,_.gz-1),p>=0&&i[p]===255&&(i[p]=m+1,s[u++]=p)}for(let f=u-1;f>=0;f--){const m=s[f],_=i[m];if(_===0)continue;const p=e[m],g=1+n[m];let v=this.aliveAt(p.gx+1,p.gy,p.gz);if(v>=0&&i[v]<_){n[v]+=g;continue}if(v=this.aliveAt(p.gx-1,p.gy,p.gz),v>=0&&i[v]<_){n[v]+=g;continue}if(v=this.aliveAt(p.gx,p.gy,p.gz+1),v>=0&&i[v]<_){n[v]+=g;continue}v=this.aliveAt(p.gx,p.gy,p.gz-1),v>=0&&i[v]<_&&(n[v]+=g)}for(let f=h+1;f<=a;f++){if(this.aliveFlags[f]!==1||i[f]!==0)continue;const m=e[f],_=1+n[f],p=this.aliveAt(m.gx,m.gy-1,m.gz),g=this.aliveAt(m.gx-1,m.gy-1,m.gz),v=this.aliveAt(m.gx+1,m.gy-1,m.gz),x=this.aliveAt(m.gx,m.gy-1,m.gz-1),S=this.aliveAt(m.gx,m.gy-1,m.gz+1),P=(p>=0?1:0)+(g>=0?1:0)+(v>=0?1:0)+(x>=0?1:0)+(S>=0?1:0),T=_/P;p>=0&&(n[p]+=T),g>=0&&(n[g]+=T),v>=0&&(n[v]+=T),x>=0&&(n[x]+=T),S>=0&&(n[S]+=T)}for(let f=h+1;f<=a;f++)this.aliveFlags[f]===1&&i[f]===255&&(n[f]=this.crushLoad+1);c+=(a-h)*3,a=h}return this.loadCursor=a,a<0}aliveAt(t,e,n){const i=this.indexAtFast(t,e,n);return i>=0&&this.aliveFlags[i]===1?i:-1}lastSweepHadCrush(){return this.crushedInSweep}peakLoad(){if(!this.loadOf)return 0;let t=0;for(let e=0;e<this.loadOf.length;e++)this.aliveFlags[e]===1&&this.loadOf[e]>t&&(t=this.loadOf[e]);return t}stepDisconnectSweep(t){if(this.groundCursor<this.blocks.length&&!this.stepGrounding(t))return!1;const e=this.floodVisited,n=this.floodQueue,i=this.spanOf;let s=this.sweepTail,o=this.sweepHead;const a=Math.min(o+t,this.blocks.length);let c;for(;o<s&&!(o>=a);){const l=n[o++],h=i[l]-1;if(h<0)continue;const u=this.blocks[l];c=this.indexAtFast(u.gx+1,u.gy,u.gz),c>=0&&e[c]===0&&this.aliveFlags[c]===1&&(e[c]=1,i[c]=h,h>0&&(n[s++]=c)),c=this.indexAtFast(u.gx-1,u.gy,u.gz),c>=0&&e[c]===0&&this.aliveFlags[c]===1&&(e[c]=1,i[c]=h,h>0&&(n[s++]=c)),c=this.indexAtFast(u.gx,u.gy+1,u.gz),c>=0&&e[c]===0&&this.aliveFlags[c]===1&&(e[c]=1,i[c]=h,h>0&&(n[s++]=c)),c=this.indexAtFast(u.gx,u.gy-1,u.gz),c>=0&&e[c]===0&&this.aliveFlags[c]===1&&(e[c]=1,i[c]=h,h>0&&(n[s++]=c)),c=this.indexAtFast(u.gx,u.gy,u.gz+1),c>=0&&e[c]===0&&this.aliveFlags[c]===1&&(e[c]=1,i[c]=h,h>0&&(n[s++]=c)),c=this.indexAtFast(u.gx,u.gy,u.gz-1),c>=0&&e[c]===0&&this.aliveFlags[c]===1&&(e[c]=1,i[c]=h,h>0&&(n[s++]=c))}return this.sweepHead=o,this.sweepTail=s,!(o<s||this.cantileverCursor<this.blocks.length&&!this.stepCantilever(t)||this.loadCursor>=0&&!this.stepLoad(t))}stepCantilever(t){const e=this.blocks,n=this.floodVisited,i=this.spanOf,s=Gl,o=this.maxSpan-Gl,a=Math.min(this.cantileverCursor+t,e.length);for(let c=this.cantileverCursor;c<a;c++){if(this.aliveFlags[c]!==1||n[c]!==1||i[c]>=o)continue;const l=e[c];if(this.isAnchor(l.gx,l.gy,l.gz))continue;const h=this.anchorDist(l.gx,l.gy,l.gz,1,0),u=this.anchorDist(l.gx,l.gy,l.gz,-1,0),d=this.anchorDist(l.gx,l.gy,l.gz,0,1),f=this.anchorDist(l.gx,l.gy,l.gz,0,-1);if(h!==0&&u!==0||d!==0&&f!==0)continue;let p=1e9;h>=1&&h<=zi&&h<p&&(p=h),u>=1&&u<=zi&&u<p&&(p=u),d>=1&&d<=zi&&d<p&&(p=d),f>=1&&f<=zi&&f<p&&(p=f),!(p<=s)&&(n[c]=0,this.crushedInSweep=!0)}return this.cantileverCursor=a,a>=e.length}isAnchor(t,e,n){if(e===0)return!0;const i=this.aliveFlags;let s=this.indexAtFast(t,e-1,n);return s>=0&&i[s]===1||(s=this.indexAtFast(t-1,e-1,n),s>=0&&i[s]===1)||(s=this.indexAtFast(t+1,e-1,n),s>=0&&i[s]===1)||(s=this.indexAtFast(t,e-1,n-1),s>=0&&i[s]===1)||(s=this.indexAtFast(t,e-1,n+1),s>=0&&i[s]===1)||(s=this.indexAtFast(t-1,e-1,n-1),s>=0&&i[s]===1)||(s=this.indexAtFast(t-1,e-1,n+1),s>=0&&i[s]===1)||(s=this.indexAtFast(t+1,e-1,n-1),s>=0&&i[s]===1)?!0:(s=this.indexAtFast(t+1,e-1,n+1),s>=0&&i[s]===1)}anchorDist(t,e,n,i,s){for(let o=1;o<=zi;o++){const a=t+i*o,c=n+s*o,l=this.indexAtFast(a,e,c);if(l<0||this.aliveFlags[l]!==1)return 0;if(this.isAnchor(a,e,c))return o}return zi+1}finishDisconnectSweep(t){t.length=0;const e=this.floodVisited,n=this.loadOf,i=this.crushLoad,s=n!==null&&Number.isFinite(i);for(let o=0;o<this.blocks.length;o++)this.aliveFlags[o]===1&&(e[o]===0?t.push(o):s&&n[o]>i&&(t.push(o),this.crushedInSweep=!0));return t}collectDisconnectedFromGround(t){for(this.beginDisconnectSweep();!this.stepDisconnectSweep(this.blocks.length););return this.finishDisconnectSweep(t)}destroyByIndices(t,e=!0){const n=ie.begin(),i=this.blockSize,s=i*.98,o=this.offX,a=this.offZ,c=i/2;for(const l of t){if(this.aliveFlags[l]!==1)continue;this.aliveFlags[l]=0,this.currentAlive--;const h=this.blocks[l];if(e){const u=h.gx*i-o+c,d=h.gy*i+c,f=h.gz*i-a+c;if(h.color&Ae){const m=s*.45;for(let _=0;_<3;_++)ie.add(u+(Math.random()-.5)*i*.6,d+(Math.random()-.5)*i*.6,f+(Math.random()-.5)*i*.6,Vi(h.color),m)}else ie.add(u,d,f,Vi(h.color),s)}this.eraseDrawn(l)}return n}collectAliveIndicesWhere(t,e){const n=[],i=this.blockSize,s=this.offX,o=this.offZ,a=i/2,c=this.blocks.length;for(let l=0;l<c;l++){if(this.aliveFlags[l]!==1)continue;const h=this.blocks[l],u=h.gx*i-s+a,d=h.gz*i-o+a;if(t(u,d)&&(n.push(l),n.length>=e))break}return n}flushUploads(t){if(this.dirtyChunks.size===0)return 0;let e=0;for(const n of this.dirtyChunks){if(e>=t)break;this.remeshChunk(n),this.dirtyChunks.delete(n),e++}return e}killBlocks(t){for(const e of t)this.aliveFlags[e]===1&&(this.aliveFlags[e]=0,this.currentAlive--)}hideBlocks(t){for(const e of t)this.eraseDrawn(e)}makeDestroyedBlocks(t){const e=this.blockSize,n=e*.98,i=this.offX,s=this.offZ,o=e/2,a=ie.begin();for(let c=0;c<t.length;c++){const l=this.blocks[t[c]],h=l.gx*e-i+o,u=l.gy*e+o,d=l.gz*e-s+o;if(l.color&Ae){const f=n*.45;for(let m=0;m<3;m++)ie.add(h+(Math.random()-.5)*e*.6,u+(Math.random()-.5)*e*.6,d+(Math.random()-.5)*e*.6,Vi(l.color),f)}else ie.add(h,u,d,Vi(l.color),n)}return a}dispose(){for(const t of this.chunks)t&&(this.pivot.remove(t.mesh),t.geometry.dispose());this.material.dispose(),this.glassMaterial.dispose()}}const yx={width:214,depth:134,height:334,blockSize:.13125,crushLoad:26e3},Cs=28,Mu=11,Wl=Mu*Cs,Mx=8,vs=4,Sx=[28,64,100,136,172],bx=[28,64,100],Xl=6,bn=6,Ex=172,Su=207,Ax=4,Tx=25,wx=175,Rx=95,Cx=116,Px=24,Lx=3684408,Ix=12105912,ql=4886191,br=5914672,Er=10132122,Dx=9407620,jl=7237230,Ux=10474735|Ae;class ya{cluster;config;shadowBlob;shadowMaterial;shadowGeometry;constructor(t=yx,e){this.config=t,e??=Ox(t),this.cluster=new vx(e,t.blockSize,{x:t.width,y:t.height,z:t.depth},{originX:t.originX,originZ:t.originZ,diagonalGrounding:t.diagonalGrounding,maxSpan:t.maxSpan,crushLoad:t.crushLoad});const n=t.width*t.blockSize/2,i=t.depth*t.blockSize/2;this.shadowGeometry=new We(n*2+6,i*2+6),this.shadowMaterial=new ue({color:0,transparent:!0,opacity:.45,depthWrite:!1}),this.shadowBlob=new It(this.shadowGeometry,this.shadowMaterial),this.shadowBlob.rotation.x=-Math.PI/2,this.shadowBlob.position.y=.02,this.cluster.pivot.add(this.shadowBlob)}get group(){return this.cluster.pivot}isDestroyed(){return this.cluster.aliveCount()===0}damageRatio(){return 1-this.cluster.aliveCount()/this.cluster.totalCount()}updateShadow(){const t=this.cluster.aliveCount(),e=this.cluster.totalCount();this.shadowMaterial.opacity=.45*(t/e)}dispose(){this.cluster.dispose(),this.shadowGeometry.dispose(),this.shadowMaterial.dispose()}}function Nx(r,t){if(r>=Su-3)return 17;if(r>=176&&r<=203){if(t>=4&&t<=13)return((r-176>>2)+1)*2+3;if(t>=16&&t<=25)return 17+((203-r>>2)+1)*2}return-1}function zx(r,t){return r>=Ex&&r<=Su&&t>=Ax&&t<=Tx}function Fx(r,t,e,n){const i=n.width,s=n.depth,o=Math.floor(t/Cs),a=t-o*Cs,c=r<bn||r>=i-bn||e<bn||e>=s-bn,l=a<vs,h=o>=Mu;if(t>Wl+vs-1)return t<=Wl+vs-1+Mx&&c?br:null;if(zx(r,e)){if(r>=192&&r<=193&&e>=14&&e<=15)return jl;if(r<=wx)return l?h?br:Er:null;const u=l&&t>=Cs?o-1:o,d=t-u*Cs,f=Nx(r,e);return f>=5&&d<=f&&d>=f-3?jl:t<vs?Er:l&&e>=14&&e<=15&&r<=203?h?br:Er:null}if(l)return h?br:Er;if(h)return null;if(c){if(o===0&&e>=s-bn&&r>=Rx&&r<=Cx&&a<vs+Px)return null;const u=e<bn||e>=s-bn,d=u?r:e,f=u?i:s,m=d>7&&d<f-8&&d%20>=4&&d%20<=15;if(m&&a>=8&&a<=21)return(u?e<bn?e:s-1-e:r<bn?r:i-1-r)===2?Ux:null;if(m&&(a>=6&&a<=7||a>=22&&a<=23))return ql;const _=d%20;return d>7&&d<f-8&&(_===2||_===3||_===16||_===17)&&a>=8&&a<=21?ql:o===0?Lx:Ix}for(const u of Sx)if(!(r<u||r>=u+Xl)){for(const d of bx)if(e>=d&&e<d+Xl)return Dx}return null}function Ox(r){const t=[];for(let e=0;e<r.height;e++)for(let n=0;n<r.width;n++)for(let i=0;i<r.depth;i++){const s=Fx(n,e,i,r);s!==null&&t.push({gx:n,gy:e,gz:i,color:s})}return t}const kx=.13125,Bx=.2625,Yl=10474735|Ae;function bu(r,t){const e=[];for(let n=0;n<r.height;n++)for(let i=0;i<r.width;i++)for(let s=0;s<r.depth;s++){const o=t(i,n,s);o!==null&&e.push({gx:i,gy:n,gz:s,color:o})}return e}const hi=69,ui=57,Eu=54,Ma=23,Vx=28,Hx=15722714;function Gx(r){return Ma+(26-Math.abs(r-Vx))}function Wx(r,t,e,n,i){if(t<2)return 9077880;const s=r>=2&&r<=hi-3&&e>=4&&e<=ui-5,o=Gx(e);if(t<Ma){if(!s||!(r<4||r>hi-5||e<6||e>ui-7)||e>ui-7&&r>=10&&r<=21&&t<20)return null;const c=e>ui-7,l=e<6,h=r<4||r>hi-5;if(t>=9&&t<=17){const d=c?ui-5-e:l?e-4:r<4?r-2:hi-3-r;if((c||l)&&(r>=30&&r<=39||r>=50&&r<=59)||h&&e>=24&&e<=33)return d===1?Yl:null;if((c||l)&&(r>=28&&r<=41||r>=48&&r<=61)&&(t===9||t===17))return Hx}return n}return r>=14&&r<=19&&e>=26&&e<=31&&t<Eu-1&&t>=o-2?7231048:(r>=2&&r<=3||r>=hi-4&&r<=hi-3)&&e>=6&&e<=ui-7&&t<o-1?n:t<=o&&t>o-2&&t>=Ma-2?i:null}function Xx(r,t,e,n){const i={width:hi,depth:ui,height:Eu,blockSize:kx,originX:r,originZ:t,diagonalGrounding:!0,crushLoad:300};return{config:i,blocks:bu(i,(s,o,a)=>Wx(s,o,a,e,n))}}const di=72,Hn=56,fi=14,Ye=2,Ps={x0:20,x1:41,z0:20,z1:35},qx=9423080|Ae,Ar=9343640,Kl=8027782,jx=8018492,Yx=3620942,Kx=15921126;function Zx(r,t){if(r>=36&&r<=Ps.x1)return 7;if(r>=22&&r<=35){if(t>=21&&t<=27)return(r-22>>1)+1;if(t>=28&&t<=34)return 7+(35-r>>1)+1}return-1}function $x(r,t,e,n,i,s){const o=n*fi,a=Math.floor(t/fi),c=t-a*fi,l=r>=Ps.x0&&r<=Ps.x1&&e>=Ps.z0&&e<=Ps.z1;if(t>=o+Ye){const f=t-(o+Ye),m=r<2||r>=di-2||e<2||e>=Hn-2;if(f<4&&m)return i;if(f<5&&r>=8&&r<=14&&e>=8&&e<=12||f<4&&r>=58&&r<=63&&e>=42&&e<=46)return 10133670;if(f<18&&e>=26&&e<=27&&(r>=22&&r<=23||r>=48&&r<=49))return 2895412;if(f>=8&&f<18&&e===26&&r>=24&&r<=47){const _=((r>>2)+(f>>2))%3;return _===0?i:_===1?Kx:1842724}return null}if(l){if(r<=21)return c<Ye?Ar:null;const m=c<Ye&&t>=fi?a-1:a,_=t-m*fi,p=Zx(r,e);return p>=1&&_<=p?Kl:t<Ye?Ar:null}if(a>=n)return t<o+Ye?Ar:null;if(c<Ye)return Ar;if(r<3||r>=di-3||e<3||e>=Hn-3){if((r<5||r>=di-5)&&(e<5||e>=Hn-5))return i;const m=e<3||e>=Hn-3;return(m?r:e)%8<2?i:a===0&&m&&r>=26&&r<=45&&c<13?null:c<=3||c===fi-1?i:(m?Math.min(e,Hn-1-e):Math.min(r,di-1-r))===1?s:null}const u=(r-11)%16<3&&r>=11&&r<di-8,d=(e-11)%16<3&&e>=11&&e<Hn-8;if(u&&d&&!l)return Kl;if(a>=1&&c>=Ye&&c<=Ye+2){const f=r%16,m=e%14,_=r>6&&r<di-7&&e>6&&e<Hn-7;if(_&&f>=4&&f<=8&&m>=4&&m<=5&&c<=Ye+1)return jx;if(_&&f===6&&m===7)return Yx}return null}function Us(r,t,e,n,i=qx){const s={width:di,depth:Hn,height:e*fi+Ye+18,blockSize:Bx,originX:r,originZ:t,crushLoad:6e3};return{config:s,blocks:bu(s,(o,a,c)=>$x(o,a,c,e,n,i))}}const Jx=[9423080|Ae,8368344|Ae,10539184|Ae,13678736|Ae,13146800|Ae,10137816|Ae,12109984|Ae,14205040|Ae,9486528|Ae];class Qx{constructor(t){this.cluster=t;const e=t.totalCount();this.supported=new Uint8Array(e),this.frontier=new Int32Array(e),this.nextFrontier=new Int32Array(e),this.queuedMark=new Uint8Array(e),this.computeInitial()}supported;frontier;nextFrontier;queuedMark;flippedBuf=[];computeInitial(){const t=this.cluster,e=this.supported;for(let n=0;n<t.gridSizeY;n++)for(let i=0;i<t.gridSizeX;i++)for(let s=0;s<t.gridSizeZ;s++){const o=t.indexAtFast(i,n,s);o<0||!t.isAlive(o)||(e[o]=this.computeSupportFlag(i,n,s)?1:0)}}computeSupportFlag(t,e,n){if(e===0)return!0;const i=this.cluster,s=this.supported,o=i.indexAtFast(t,e-1,n);if(o>=0&&i.isAlive(o)&&s[o]===1)return!0;const a=i.indexAtFast(t-1,e,n);if(a>=0&&i.isAlive(a))return!0;const c=i.indexAtFast(t+1,e,n);if(c>=0&&i.isAlive(c))return!0;const l=i.indexAtFast(t,e,n-1);if(l>=0&&i.isAlive(l))return!0;const h=i.indexAtFast(t,e,n+1);return h>=0&&i.isAlive(h)}markDestroyed(t){for(const e of t)e>=0&&e<this.supported.length&&(this.supported[e]=0)}applyDestruction(t){const e=this.cluster,n=this.supported,i=this.flippedBuf;i.length=0;for(const c of t)n[c]=0;let s=0;const o=this.queuedMark,a=c=>{c<0||e.isAlive(c)&&n[c]!==0&&o[c]!==1&&(o[c]=1,this.frontier[s++]=c)};for(const c of t){const l=e.blocks[c],h=l.gx,u=l.gy,d=l.gz;a(e.indexAtFast(h,u+1,d)),a(e.indexAtFast(h-1,u,d)),a(e.indexAtFast(h+1,u,d)),a(e.indexAtFast(h,u,d-1)),a(e.indexAtFast(h,u,d+1))}for(;s>0;){let c=0;const l=h=>{h<0||e.isAlive(h)&&n[h]===1&&o[h]!==1&&(o[h]=1,this.nextFrontier[c++]=h)};for(let h=0;h<s;h++){const u=this.frontier[h];if(o[u]=0,!e.isAlive(u)||n[u]===0)continue;const d=e.blocks[u];this.computeSupportFlag(d.gx,d.gy,d.gz)||(n[u]=0,i.push(u),l(e.indexAtFast(d.gx,d.gy+1,d.gz)))}for(let h=0;h<c;h++)this.frontier[h]=this.nextFrontier[h];s=c}return i}}const Zl=180,tv=.55,$l=.2,ev=15e4,nv=8,iv=1200,sv=28,rv=2.1;class Au{constructor(t,e,n,i){this.building=t,this.flyingChunks=e,this.bigChunks=n,this.hitFx=i,this.integrity=new Qx(t.cluster)}integrity;idxBuf=[];glassBuf=[];sweepBuf=[];sweepPending=!1;sweepActive=!1;sweepCooldown=0;sweepBudget=ev;sectionCap=1/0;sweepRequest=null;workerSweepInFlight=!1;lastBlast=null;compMark=null;compQueue=[];pendingSections=[];tmpVec=new A;tmpVec2=new A;carveBore(t,e,n,i=8){(this.lastBlast??=new A).copy(t);const s=this.building.cluster;s.findIndicesInRadius(t,e,this.idxBuf);const o=s.destroyByIndices(this.idxBuf);return o.length===0?0:(this.flyingChunks.spawn(o,t,i,n),this.integrity.markDestroyed(this.idxBuf),this.sweepPending=!0,o.length)}suckCells(t){if(t.length===0)return;const e=this.building.cluster;e.killBlocks(t),e.hideBlocks(t),this.integrity.markDestroyed(t),this.sweepPending=!0,this.building.updateShadow()}armSweep(){this.sweepPending=!0}applyExplosion(t,e,n){(this.lastBlast??=new A).copy(t);const i=this.building.cluster;i.findIndicesInRadius(t,e,this.idxBuf);const s=i.destroyByIndices(this.idxBuf);if(s.length===0)return 0;const o=s.length,a=s.length>4e3?s.filter(()=>Math.random()<tv):s;this.flyingChunks.spawn(a,t,8,n),this.hitFx.burst(t,16755268,20),this.cascadeFrom(this.idxBuf,t),i.findIndicesInRadius(t,e*rv,this.glassBuf);let c=0;for(let l=0;l<this.glassBuf.length;l++){const h=this.glassBuf[l];i.blocks[h].color&Ae&&(this.glassBuf[c++]=h)}if(c>0){this.glassBuf.length=c;const l=i.destroyByIndices(this.glassBuf);this.flyingChunks.spawn(l,t,5,n)}return this.sweepPending=!0,this.building.updateShadow(),o}cascadeFrom(t,e){const n=this.building.cluster;let i=this.integrity.applyDestruction(t);for(;i.length>0;){n.killBlocks(i);const s=this.findConnectedComponents(i);for(const o of s)o.length>=Zl?this.spawnBigChunk(o,e):(n.hideBlocks(o),this.flyingChunks.spawn(n.makeDestroyedBlocks(o),e,6));i=this.integrity.applyDestruction(i)}}setSweepBudget(t){this.sweepBudget=t}setSectionCap(t){this.sectionCap=t}sweepBusy(){return this.sweepActive||this.sweepPending||this.workerSweepInFlight}attachSweepWorker(t){this.sweepRequest=t}applySweepResult(t,e){this.workerSweepInFlight=!1,e&&(this.sweepPending=!0);const n=this.building.cluster;this.sweepBuf.length=0;for(let i=0;i<t.length;i++){const s=t[i];n.isAlive(s)&&this.sweepBuf.push(s)}this.processDetached(this.sweepBuf)}update(t){const e=this.building.cluster,n=this.pendingSections.length;let i=n>240?18:n>100?12:nv;this.sectionCap<i&&(i=this.sectionCap);let s=0;for(;this.pendingSections.length>0&&s<i;){const o=this.pendingSections.shift();this.spawnSection(o.component,o.point),s++}if(this.sweepRequest){if(this.sweepCooldown>0&&(this.sweepCooldown-=t),!this.sweepPending||this.sweepCooldown>0||this.workerSweepInFlight)return;this.sweepPending=!1,this.sweepCooldown=$l,this.workerSweepInFlight=!0,this.sweepRequest();return}if(this.sweepActive){e.stepDisconnectSweep(this.sweepBudget)&&(this.sweepActive=!1,this.sweepFloaters());return}this.sweepCooldown>0&&(this.sweepCooldown-=t),!(!this.sweepPending||this.sweepCooldown>0)&&(this.sweepPending=!1,this.sweepCooldown=$l,this.sweepActive=!0,e.beginDisconnectSweep())}sweepFloaters(){const t=this.building.cluster,e=t.finishDisconnectSweep(this.sweepBuf);t.lastSweepHadCrush()&&(this.sweepPending=!0),this.processDetached(e)}processDetached(t){const e=this.building.cluster;if(t.length===0)return;e.killBlocks(t);const n=this.findConnectedComponents(t);for(const i of n)e.getWorldPosition(i[0],this.tmpVec),i.length>=Zl?this.spawnBigChunk(i,this.lastBlast??this.tmpVec.clone()):(e.hideBlocks(i),this.flyingChunks.spawn(e.makeDestroyedBlocks(i),this.tmpVec,2));this.cascadeFrom(t,this.tmpVec),this.building.updateShadow()}disintegrateBlocks(t,e){if(t.length===0)return;(this.lastBlast??=new A).copy(e);const n=this.building.cluster;n.killBlocks(t),n.hideBlocks(t),this.cascadeFrom(t,e),this.sweepPending=!0,this.building.updateShadow()}isDestroyed(){return this.building.isDestroyed()}damageRatio(){return this.building.damageRatio()}findConnectedComponents(t){const e=this.building.cluster,n=e.totalCount();(!this.compMark||this.compMark.length!==n)&&(this.compMark=new Uint8Array(n));const i=this.compMark;for(const a of t)i[a]=1;const s=[],o=this.compQueue;for(const a of t){if(i[a]!==1)continue;const c=[];for(o.length=0,o.push(a),i[a]=2;o.length>0;){const l=o.pop();c.push(l);const h=e.blocks[l];let u=e.indexAtFast(h.gx+1,h.gy,h.gz);u>=0&&i[u]===1&&(i[u]=2,o.push(u)),u=e.indexAtFast(h.gx-1,h.gy,h.gz),u>=0&&i[u]===1&&(i[u]=2,o.push(u)),u=e.indexAtFast(h.gx,h.gy+1,h.gz),u>=0&&i[u]===1&&(i[u]=2,o.push(u)),u=e.indexAtFast(h.gx,h.gy-1,h.gz),u>=0&&i[u]===1&&(i[u]=2,o.push(u)),u=e.indexAtFast(h.gx,h.gy,h.gz+1),u>=0&&i[u]===1&&(i[u]=2,o.push(u)),u=e.indexAtFast(h.gx,h.gy,h.gz-1),u>=0&&i[u]===1&&(i[u]=2,o.push(u))}s.push(c)}for(const a of t)i[a]=0;return s}spawnBigChunk(t,e){const n=this.building.cluster,i=[],s=[t];for(;s.length>0;){const a=s.pop();let c=1/0,l=-1/0,h=1/0,u=-1/0,d=1/0,f=-1/0;for(const x of a){const S=n.blocks[x];S.gx<c&&(c=S.gx),S.gx>l&&(l=S.gx),S.gy<h&&(h=S.gy),S.gy>u&&(u=S.gy),S.gz<d&&(d=S.gz),S.gz>f&&(f=S.gz)}const m=l-c,_=u-h,p=f-d;if(a.length<=iv&&Math.max(m,_,p)<=sv){i.push(a);continue}const g=m>=_&&m>=p?"gx":_>=p?"gy":"gz";a.sort((x,S)=>n.blocks[x][g]-n.blocks[S][g]);const v=a.length>>1;s.push(a.slice(0,v),a.slice(v))}i.sort((a,c)=>n.blocks[a[0]].gy-n.blocks[c[0]].gy);const o=e.clone();for(const a of i)this.pendingSections.push({component:a,point:o})}spawnSection(t,e){const n=this.building.cluster;n.hideBlocks(t);const s=this.building.config.blockSize*.98;let o=0,a=0,c=0;for(const d of t)n.getWorldPosition(d,this.tmpVec),o+=this.tmpVec.x,a+=this.tmpVec.y,c+=this.tmpVec.z;const l=1/t.length,h=new A(o*l,a*l,c*l),u=t.map(d=>{n.getWorldPosition(d,this.tmpVec2);const f=new A(this.tmpVec2.x-h.x,this.tmpVec2.y-h.y,this.tmpVec2.z-h.z),m=n.blocks[d];return{localPos:f,color:Vi(m.color),size:s}});this.bigChunks.spawn(u,h,e)}tearChunk(t,e,n,i,s=!0){const o=this.building.cluster,a=o.findIndicesInRadius(t,e,[]);if(a.length===0)return null;const c=e*e,l=[];for(const v of a){o.getWorldPosition(v,this.tmpVec);const x=this.tmpVec.distanceToSquared(t)/c;x>.45&&(Math.imul(v,2654435761)>>>8&1023)/1023<(x-.45)/.55||l.push(v)}if(l.length===0)return null;const h=l.length;o.killBlocks(l),o.hideBlocks(l);const u=this.building.config.blockSize*.98;let d=0,f=0,m=0;for(const v of l)o.getWorldPosition(v,this.tmpVec),d+=this.tmpVec.x,f+=this.tmpVec.y,m+=this.tmpVec.z;const _=1/h,p=new A(d*_,f*_,m*_),g=l.map(v=>{o.getWorldPosition(v,this.tmpVec2);const x=o.blocks[v];return{localPos:new A(this.tmpVec2.x-p.x,this.tmpVec2.y-p.y,this.tmpVec2.z-p.z),color:Vi(x.color),size:u}});if(s){const v=new A(n.x*i,2+i*.25,n.z*i);this.bigChunks.spawnPulled(g,p,v)}return this.cascadeFrom(l,t),this.building.updateShadow(),{count:h,blocks:g,centroid:p}}}const ov=-12,av=12,En=4,Jl=12,Ql=.3,th=.12,eh=.35,cv=400,lv=1.3,hv=.5,uv=1.4,nh=2.4,dv=8,fv=2,pv=.45,mv=9,gv=1.5,Tr=80,_v=180,ys=new Et().makeScale(0,0,0),ih=3,sh=.15,rh=.9,xv=.5,oh=.15,ah=24,vv=.35,yv=.45,Mv=.05,Sv=1.3,bv=.9,ch=.25,Ev=8,An=.08;class Tu{constructor(t){this.scene=t,this.geom=new dn(1,1,1),this.material=new tn({color:16777215,flatShading:!0})}active=[];worldCollider=null;shatterListener=null;detachListener=null;rubbleSink=null;impactDamager=null;impactDamageBudget=0;impactDamageBudgetPerFrame=3;frameContactBudget=0;contactBudgetPerFrame=dv;tmpInherit=new A;tmpContact=new A;tmpDamage=new A;tmpRayHit=new A;geom;material;tmpQuat=new Oe;tmpScale=new A;tmpMatrix=new Et;tmpColor=new Mt;tmpEuler=new Fe;tmpRotM=new Et;tmpVec=new A;tmpVec2=new A;viewerX=0;viewerZ=0;farSettleSq=0;meshPool=new Map;activeCount(){return this.active.length}applyUpdraft(t,e,n,i){for(const s of this.active){const o=s.group.position;o.y<e&&t(o.x,o.z)&&(s.velocity.y+=n*i)}}setViewerPosition(t,e){this.viewerX=t,this.viewerZ=e}setFarSettleDistance(t){this.farSettleSq=t>0?t*t:0}acquireMesh(t){let e=64;for(;e<t;)e<<=1;const i=this.meshPool.get(e)?.pop();if(i)return i.count=t,i;const s=new Bs(this.geom,this.material,e);return s.castShadow=!1,s.frustumCulled=!0,s.count=t,s.userData.poolCap=e,s}releaseMesh(t){const e=t.userData.poolCap;let n=this.meshPool.get(e);n||(n=[],this.meshPool.set(e,n)),n.push(t)}setWorldCollider(t){this.worldCollider=t}setShatterListener(t){this.shatterListener=t}setDetachListener(t){this.detachListener=t}setImpactDamager(t){this.impactDamager=t}setRubbleSink(t){this.rubbleSink=t}getMeshes(){const t=[];for(const e of this.active)t.push(e.mesh);return t}raycastSections(t,e,n){let i=1/0,s=null;for(const o of this.active){const a=o.mesh.boundingSphere?.radius??1,c=o.group.position.x-t.x,l=o.group.position.y-t.y,h=o.group.position.z-t.z,u=c*e.x+l*e.y+h*e.z;if(u+a<0)continue;const d=c*c+l*l+h*h-u*u;if(d>a*a)continue;const f=Math.sqrt(a*a-d),m=Math.max(0,u-f);m>n||m>=i||(i=m,s=o.mesh)}return s?(this.tmpRayHit.copy(e).multiplyScalar(i).add(t),{point:this.tmpRayHit,distance:i,target:s}):null}spawn(t,e,n){this.detachListener?.(e,t.length);const i=this.tmpVec.subVectors(e,n);i.y=0,i.lengthSq()<1e-4&&i.set(Math.random()-.5,0,Math.random()-.5),i.normalize().multiplyScalar(1.2+Math.random()*.8);const s=new A(i.x,-.5-Math.random()*1,i.z),o=new A((Math.random()-.5)*2,(Math.random()-.5)*.8,(Math.random()-.5)*2);this.spawnBody(t,e,s,o,n)}spawnPulled(t,e,n){const i=new A((Math.random()-.5)*1.6,(Math.random()-.5)*.8,(Math.random()-.5)*1.6);this.spawnBody(t,e,n,i)}spawnBody(t,e,n,i,s){const o=new $e;o.position.copy(e);const a=this.acquireMesh(t.length),c=new Array(t.length),l=new A(1/0,1/0,1/0),h=new A(-1/0,-1/0,-1/0);for(let f=0;f<t.length;f++){const m=t[f];this.tmpScale.set(m.size,m.size,m.size),this.tmpMatrix.compose(m.localPos,this.tmpQuat.identity(),this.tmpScale),a.setMatrixAt(f,this.tmpMatrix),va(this.tmpColor,m.color),a.setColorAt(f,this.tmpColor);const _=m.size*.5;m.localPos.x-_<l.x&&(l.x=m.localPos.x-_),m.localPos.y-_<l.y&&(l.y=m.localPos.y-_),m.localPos.z-_<l.z&&(l.z=m.localPos.z-_),m.localPos.x+_>h.x&&(h.x=m.localPos.x+_),m.localPos.y+_>h.y&&(h.y=m.localPos.y+_),m.localPos.z+_>h.z&&(h.z=m.localPos.z+_),c[f]={localPos:m.localPos,color:m.color,size:m.size,slot:f,detached:!1}}a.instanceMatrix.needsUpdate=!0,a.instanceColor&&(a.instanceColor.needsUpdate=!0),a.computeBoundingSphere(),o.add(a),this.scene.add(o);let u=null;if(s&&t.length>=cv){const f=h.y-l.y,m=Math.max(h.x-l.x,h.z-l.z);if(f>m*lv){const _=this.tmpVec2.subVectors(s,e);_.y=0,_.lengthSq()>.01&&(_.normalize(),u=new A(0,1,0).cross(_).normalize(),i.multiplyScalar(.25).addScaledVector(u,hv),n.set(_.x*.6,Math.min(n.y,-.2),_.z*.6))}}const d={group:o,mesh:a,blocks:c,velocity:n,angularVelocity:i,localMin:l,localMax:h,toppleAxis:u,remaining:t.length,initialCount:t.length,structuralDamage:0,probes:[],age:0};this.computeContactProbes(d),this.active.push(d)}computeContactProbes(t){t.probes.length=0;const e=Math.max(t.localMax.x-t.localMin.x,t.localMax.z-t.localMin.z,.001),n=Math.min(5,Math.max(1,Math.ceil(e/.9))),i=n/Math.max(.001,t.localMax.x-t.localMin.x),s=n/Math.max(.001,t.localMax.z-t.localMin.z),o=new Int32Array(n*n).fill(-1),a=new Float32Array(n*n).fill(1/0);let c=-1,l=1/0;for(let h=0;h<t.blocks.length;h++){const u=t.blocks[h];if(u.detached)continue;const d=Math.min(n-1,Math.max(0,Math.floor((u.localPos.x-t.localMin.x)*i))),f=Math.min(n-1,Math.max(0,Math.floor((u.localPos.z-t.localMin.z)*s))),m=d+f*n;u.localPos.y<a[m]&&(a[m]=u.localPos.y,o[m]=h),u.localPos.y<l&&(l=u.localPos.y,c=h)}for(let h=0;h<o.length;h++)o[h]>=0&&t.probes.push(o[h]);c>=0&&!t.probes.includes(c)&&t.probes.push(c)}debugSections(){return this.active.map(t=>({remaining:t.remaining,initialCount:t.initialCount,y:t.group.position.y,vy:t.velocity.y}))}setContactBudgetPerFrame(t){this.contactBudgetPerFrame=t}setImpactDamageBudgetPerFrame(t){this.impactDamageBudgetPerFrame=t}update(t,e){this.impactDamageBudget=this.impactDamageBudgetPerFrame,this.frameContactBudget=this.contactBudgetPerFrame,this.collideSections();t:for(let n=this.active.length-1;n>=0;n--){const i=this.active[n];if(this.farSettleSq>0){const c=i.group.position.x-this.viewerX,l=i.group.position.z-this.viewerZ;if(c*c+l*l>this.farSettleSq){this.flushRemaining(i,e),this.dispose_chunk(i),this.active.splice(n,1);continue}}i.age+=t,i.velocity.y+=ov*t,i.toppleAxis&&(i.angularVelocity.addScaledVector(i.toppleAxis,uv*t),i.angularVelocity.lengthSq()>nh*nh&&(i.toppleAxis=null));const s=i.velocity.length()*t,o=s>ch?Math.min(Ev,Math.ceil(s/ch)):1,a=t/o;for(let c=0;c<o;c++){i.group.position.addScaledVector(i.velocity,a),i.group.rotation.x+=i.angularVelocity.x*a,i.group.rotation.y+=i.angularVelocity.y*a,i.group.rotation.z+=i.angularVelocity.z*a,this.tmpRotM.makeRotationFromEuler(i.group.rotation);const l=this.resolveContact(i,e);if(l==="removed"){this.active.splice(n,1);continue t}if(l==="stop")break}i.age>av&&(this.flushRemaining(i,e),this.dispose_chunk(i),this.active.splice(n,1))}}probesAllClear(t){if(!this.worldCollider)return!0;let e=1/0;for(let n=0;n<t.probes.length;n++){const i=t.blocks[t.probes[n]];if(i.detached)continue;this.tmpVec.copy(i.localPos).applyMatrix4(this.tmpRotM);const s=t.group.position.y+this.tmpVec.y-i.size*.5;if(s<e&&(e=s),this.worldCollider.isOccupied(t.group.position.x+this.tmpVec.x,s-.02,t.group.position.z+this.tmpVec.z))return!1}return e===1/0||!this.worldCollider.isOccupied(t.group.position.x,e,t.group.position.z)}resolveContact(t,e){let n=1/0,i=t.group.position.x,s=t.group.position.z,o=0,a=0,c=0,l=!1,h=0,u=0;for(let p=0;p<t.probes.length;p++){const g=t.blocks[t.probes[p]];if(g.detached)continue;h++,this.tmpVec.copy(g.localPos).applyMatrix4(this.tmpRotM);const v=t.group.position.x+this.tmpVec.x,x=t.group.position.z+this.tmpVec.z,S=t.group.position.y+this.tmpVec.y-g.size*.5;S<n&&(n=S,i=v,s=x),this.worldCollider&&this.worldCollider.isOccupied(v,S-.02,x)&&(u++,l||(l=!0,o=v,a=S,c=x))}!l&&this.worldCollider&&n<1/0&&this.worldCollider.isOccupied(t.group.position.x,n,t.group.position.z)&&(l=!0,o=t.group.position.x,a=n,c=t.group.position.z);const d=n<.15;if(!d&&!l)return"none";const f=h>0?u/h:1;l&&(i=o,s=c,n=Math.min(n,a)),t.toppleAxis=null;const m=-t.velocity.y;if(l&&!d&&f<vv&&m>=En&&this.frameContactBudget>0){this.frameContactBudget--,this.tmpDamage.set(o,Math.max(a,.15),c);const p=this.damageBuildingAt(t,this.tmpDamage,m),g=this.shearOffAt(t,e,o,a,c,m);t.structuralDamage+=g,this.computeContactProbes(t);const v=ih*p+g,x=Math.min(rh,Math.max(sh,t.remaining/(t.remaining+v)));return t.velocity.y*=x,t.velocity.x*=.8+.2*x,t.velocity.z*=.8+.2*x,this.tmpVec2.set(o-t.group.position.x,a-t.group.position.y,c-t.group.position.z).cross(t.velocity),this.tmpVec2.lengthSq()>1e-6&&(this.tmpVec2.normalize().multiplyScalar(bv),t.angularVelocity.add(this.tmpVec2)),t.remaining<Tr?(this.flushRemaining(t,e),this.dispose_chunk(t),"removed"):t.structuralDamage>=oh*t.initialCount?(this.partialFracture(t,e,n,m,!0),this.dispose_chunk(t),"removed"):"through"}if(l&&!d){this.tmpDamage.set(i,Math.max(n,.15),s);const p=this.damageBuildingAt(t,this.tmpDamage,m);if(this.probesAllClear(t)){const g=p>0?Math.min(rh,Math.max(sh,t.remaining/(t.remaining+ih*p))):.55;if(t.velocity.y*=g,t.velocity.x*=.7+.3*g,t.velocity.z*=.7+.3*g,t.angularVelocity.multiplyScalar(.6+.4*g),m>=En&&this.frameContactBudget>0){if(this.frameContactBudget--,m>=Jl||t.structuralDamage>=oh*t.initialCount)return this.partialFracture(t,e,n,m,!0),this.dispose_chunk(t),"removed";if(t.structuralDamage+=this.crushContactBand(t,e,n,m),this.computeContactProbes(t),t.remaining<Tr)return this.flushRemaining(t,e),this.dispose_chunk(t),"removed"}return"through"}}const _=m>=En||t.age>=eh&&this.rubbleSink!==null;return _&&this.frameContactBudget<=0?(t.velocity.y=Math.abs(t.velocity.y)*.05,t.velocity.x*=.8,t.velocity.z*=.8,"stop"):(_&&this.frameContactBudget--,m>=Jl?(this.shatterOnImpact(t,e,n,m),this.dispose_chunk(t),"removed"):m>=En?(this.partialFracture(t,e,n,m),this.dispose_chunk(t),"removed"):t.age>=eh&&this.rubbleSink?(this.restIntoRubble(t,e),this.dispose_chunk(t),"removed"):(t.velocity.y=Math.abs(t.velocity.y)*.1,t.velocity.x*=.7,t.velocity.z*=.7,t.angularVelocity.multiplyScalar(.7),"stop"))}restIntoRubble(t,e){const n=this.rubbleSink;this.tmpRotM.makeRotationFromEuler(t.group.rotation);const i=[];for(const o of t.blocks){if(o.detached)continue;o.detached=!0;const a=o.localPos.clone().applyMatrix4(this.tmpRotM).add(t.group.position);i.push({pos:a,color:o.color,size:o.size})}t.remaining=0,i.sort((o,a)=>o.pos.y-a.pos.y);const s=ie.begin();for(const o of i)n?.settle(o.pos,o.size,o.color)||ie.add(o.pos.x,o.pos.y,o.pos.z,o.color,o.size);if(s.length>0){const o=this.tmpContact.copy(t.group.position).setY(.15);e.spawn(s,o,1.5,void 0,void 0,An)}}meltLayer(t,e,n,i){const s=i*gv,o=n+s;this.tmpEuler.copy(t.group.rotation);const a=[];let c=0,l=!1;for(let h=0;h<t.blocks.length&&!(c>=_v);h++){const u=t.blocks[h];if(u.detached)continue;this.tmpVec.copy(u.localPos).applyEuler(this.tmpEuler);const d=t.group.position.x+this.tmpVec.x,f=t.group.position.y+this.tmpVec.y,m=t.group.position.z+this.tmpVec.z;f-u.size*.5>o||(u.detached=!0,t.remaining--,t.mesh.setMatrixAt(u.slot,ys),l=!0,a.push({worldPosition:new A(d,Math.max(f,.2),m),color:u.color,size:u.size}),c++)}if(l&&(t.mesh.instanceMatrix.needsUpdate=!0),a.length>0){const h=this.tmpVec2.set(t.group.position.x,Math.max(n,.15),t.group.position.z);e.spawn(a,h,2.5,void 0,void 0,An)}t.velocity.y=Math.max(0,-t.velocity.y)*.15,t.velocity.x*=.6,t.velocity.z*=.6,t.angularVelocity.multiplyScalar(.7)}damageBuildingAt(t,e,n){if(!this.impactDamager||n<3||this.impactDamageBudget<=0)return 0;this.impactDamageBudget--;const i=(t.blocks[0]?.size??.129)/.98,s=Math.min(3,.4+.07*n+.42*Math.cbrt(t.remaining)*i);return this.impactDamager(e,s,n)}collideSections(){const t=this.active.length;for(let e=0;e<t;e++){const n=this.active[e],i=(n.mesh.boundingSphere?.radius??1)*.7;for(let s=e+1;s<t;s++){const o=this.active[s];if(n.age<.3&&o.age<.3)continue;const a=(o.mesh.boundingSphere?.radius??1)*.7,c=i+a,l=o.group.position.x-n.group.position.x,h=o.group.position.y-n.group.position.y,u=o.group.position.z-n.group.position.z,d=l*l+h*h+u*u;if(d>=c*c||d<1e-6)continue;const f=Math.sqrt(d),m=l/f,_=h/f,p=u/f,g=Math.min(.06,(c-f)*.25);n.group.position.x-=m*g,n.group.position.y-=_*g,n.group.position.z-=p*g,o.group.position.x+=m*g,o.group.position.y+=_*g,o.group.position.z+=p*g;const v=(o.velocity.x-n.velocity.x)*m+(o.velocity.y-n.velocity.y)*_+(o.velocity.z-n.velocity.z)*p;if(v<0){const x=-.55*v;n.velocity.x-=m*x,n.velocity.y-=_*x,n.velocity.z-=p*x,o.velocity.x+=m*x,o.velocity.y+=_*x,o.velocity.z+=p*x}}}}shearOffAt(t,e,n,i,s,o){const a=Math.min(Sv,yv+Mv*o),c=a*a,l=ie.begin();for(const f of t.blocks){if(f.detached)continue;this.tmpVec.copy(f.localPos).applyMatrix4(this.tmpRotM);const m=t.group.position.x+this.tmpVec.x,_=t.group.position.y+this.tmpVec.y,p=t.group.position.z+this.tmpVec.z,g=m-n,v=_-i,x=p-s;g*g+v*v+x*x>c||(f.detached=!0,t.remaining--,t.mesh.setMatrixAt(f.slot,ys),ie.add(m,Math.max(_,.2),p,f.color,f.size))}if(l.length===0)return 0;t.mesh.instanceMatrix.needsUpdate=!0;const h=this.tmpContact.set(n,Math.max(i,.15),s),u=Math.min(5,1.2+.35*o),d=this.tmpInherit.set(t.velocity.x,t.velocity.y*.3,t.velocity.z);return e.spawn(l,h,u,void 0,d,An),l.length>=ah&&this.shatterListener?.(h,l.length,o),l.length}crushContactBand(t,e,n,i){this.tmpRotM.makeRotationFromEuler(t.group.rotation);const s=xv*(Ql+th*(i-En)),o=n+s,a=ie.begin();for(const u of t.blocks){if(u.detached)continue;this.tmpVec.copy(u.localPos).applyMatrix4(this.tmpRotM);const d=t.group.position.y+this.tmpVec.y;d-u.size*.5>o||(u.detached=!0,t.remaining--,t.mesh.setMatrixAt(u.slot,ys),ie.add(t.group.position.x+this.tmpVec.x,Math.max(d,.2),t.group.position.z+this.tmpVec.z,u.color,u.size))}if(a.length===0)return 0;t.mesh.instanceMatrix.needsUpdate=!0;const c=this.tmpContact.set(t.group.position.x,Math.max(n,.15),t.group.position.z),l=Math.min(5,1+.4*(i-En)),h=this.tmpInherit.set(t.velocity.x,t.velocity.y*.2,t.velocity.z);return e.spawn(a,c,l,void 0,h,An),a.length>=ah&&this.shatterListener?.(c,a.length,i),a.length}partialFracture(t,e,n,i,s=!1){this.tmpRotM.makeRotationFromEuler(t.group.rotation);const o=Ql+th*(i-En),a=n+o,c=ie.begin(),l=[];for(const f of t.blocks){if(f.detached)continue;f.detached=!0,this.tmpVec.copy(f.localPos).applyMatrix4(this.tmpRotM);const m=t.group.position.y+this.tmpVec.y;m-f.size*.5<=a?ie.add(t.group.position.x+this.tmpVec.x,Math.max(m,.2),t.group.position.z+this.tmpVec.z,f.color,f.size):l.push(f)}t.remaining=0;const h=this.tmpContact.set(t.group.position.x,Math.max(n,.15),t.group.position.z);if(c.length>0){const f=Math.min(7,1.5+(i-En)*.5),m=this.tmpInherit.set(t.velocity.x,t.velocity.y*.2,t.velocity.z);e.spawn(c,h,f,void 0,m,An),this.shatterListener?.(h,c.length,i)}if(l.length===0)return;const u=l[0].size/.98,d=Av(l,u);for(const f of d)if(f.length>=Tr)this.respawnComponent(t,f,s?.5:-.1);else{this.tmpRotM.makeRotationFromEuler(t.group.rotation);const m=ie.begin();for(const _ of f)this.tmpVec.copy(_.localPos).applyMatrix4(this.tmpRotM),ie.add(t.group.position.x+this.tmpVec.x,Math.max(t.group.position.y+this.tmpVec.y,.2),t.group.position.z+this.tmpVec.z,_.color,_.size);this.tmpInherit.set(t.velocity.x*.8,0,t.velocity.z*.8),e.spawn(m,h,2,void 0,this.tmpInherit,An)}}respawnComponent(t,e,n=-.1){this.tmpEuler.copy(t.group.rotation);const i=e.map(f=>f.localPos.clone().applyEuler(this.tmpEuler).add(t.group.position));let s=0,o=0,a=0;for(const f of i)s+=f.x,o+=f.y,a+=f.z;const c=1/i.length,l=new A(s*c,o*c,a*c),h=e.map((f,m)=>({localPos:i[m].sub(l),color:f.color,size:f.size})),u=new A(t.velocity.x*.8,t.velocity.y*n,t.velocity.z*.8),d=new A((Math.random()-.5)*1.2,(Math.random()-.5)*.4,(Math.random()-.5)*1.2);this.spawnBody(h,l,u,d)}shatterOnImpact(t,e,n,i){this.tmpRotM.makeRotationFromEuler(t.group.rotation);const s=ie.begin();for(const l of t.blocks)l.detached||(this.tmpVec.copy(l.localPos).applyMatrix4(this.tmpRotM).add(t.group.position),ie.add(this.tmpVec.x,Math.max(this.tmpVec.y,.2),this.tmpVec.z,l.color,l.size),l.detached=!0);if(t.remaining=0,s.length===0)return;const o=this.tmpContact.set(t.group.position.x,Math.max(n,.15),t.group.position.z),a=Math.min(mv,fv+(i-En)*pv),c=this.tmpInherit.set(t.velocity.x,t.velocity.y*.2,t.velocity.z);e.spawn(s,o,a,void 0,c,An),this.shatterListener?.(o,s.length,i)}flushRemaining(t,e){if(t.remaining===0)return;this.tmpEuler.copy(t.group.rotation);const n=[];for(const s of t.blocks){if(s.detached)continue;const o=s.localPos.clone().applyEuler(this.tmpEuler).add(t.group.position);o.y=Math.max(o.y,.2),n.push({worldPosition:o,color:s.color,size:s.size}),s.detached=!0}t.remaining=0;const i=t.group.position.clone();i.y=.15,e.spawn(n,i,3,void 0,void 0,An)}dispose_chunk(t){this.releaseMesh(t.mesh),this.scene.remove(t.group)}shatterAt(t,e,n){const i=e*e;let s=!1;for(let o=this.active.length-1;o>=0;o--){const a=this.active[o],c=a.mesh.boundingSphere;if(c){const u=a.group.position.x+c.center.x,d=a.group.position.y+c.center.y,f=a.group.position.z+c.center.z,m=u-t.x,_=d-t.y,p=f-t.z,g=c.radius+e;if(m*m+_*_+p*p>g*g)continue}this.tmpEuler.copy(a.group.rotation);const l=[];let h=!1;for(const u of a.blocks){if(u.detached)continue;this.tmpVec.copy(u.localPos).applyEuler(this.tmpEuler);const d=a.group.position.x+this.tmpVec.x,f=a.group.position.y+this.tmpVec.y,m=a.group.position.z+this.tmpVec.z,_=d-t.x,p=f-t.y,g=m-t.z;_*_+p*p+g*g>i||(u.detached=!0,a.remaining--,a.mesh.setMatrixAt(u.slot,ys),h=!0,l.push({worldPosition:new A(d,Math.max(f,.2),m),color:u.color,size:u.size}))}h&&(a.mesh.instanceMatrix.needsUpdate=!0,s=!0,n.spawn(l,t,8,void 0,void 0,An),this.computeContactProbes(a)),a.remaining<Tr&&(this.flushRemaining(a,n),this.dispose_chunk(a),this.active.splice(o,1))}return s}vanishWithinRadius(t,e){const n=e*e;for(let i=this.active.length-1;i>=0;i--){const s=this.active[i],o=s.mesh.boundingSphere;if(o){const c=s.group.position.x+o.center.x,l=s.group.position.y+o.center.y,h=s.group.position.z+o.center.z,u=c-t.x,d=l-t.y,f=h-t.z,m=o.radius+e;if(u*u+d*d+f*f>m*m)continue}this.tmpEuler.copy(s.group.rotation);let a=!1;for(const c of s.blocks){if(c.detached)continue;this.tmpVec.copy(c.localPos).applyEuler(this.tmpEuler);const l=s.group.position.x+this.tmpVec.x,h=s.group.position.y+this.tmpVec.y,u=s.group.position.z+this.tmpVec.z,d=l-t.x,f=h-t.y,m=u-t.z;d*d+f*f+m*m>n||(c.detached=!0,s.remaining--,s.mesh.setMatrixAt(c.slot,ys),a=!0)}a&&(s.mesh.instanceMatrix.needsUpdate=!0,this.computeContactProbes(s)),s.remaining<=0&&(this.dispose_chunk(s),this.active.splice(i,1))}}clear(){for(const t of this.active)this.dispose_chunk(t);this.active=[]}dispose(){this.clear();for(const t of this.meshPool.values())for(const e of t)e.dispose();this.meshPool.clear(),this.geom.dispose(),this.material.dispose()}}const Xa=16384,Qr=Xa-1,zr=new Int32Array(Xa),wu=new Int32Array(Xa);let wr=new Int32Array(2048),Ko=new Int32Array(2048),Zo=new Int32Array(2048),Ee=new Uint8Array(2048);const on=[];function ri(r,t,e){return r+512+(t+512)*1024+(e+512)*1024*1024}function Fi(r){let t=r&Qr;for(;;){const e=zr[t];if(e===-1)return-1;if(wu[t]===r)return e;t=t+1&Qr}}function Av(r,t){const e=r.length;wr.length<e&&(wr=new Int32Array(e*2),Ko=new Int32Array(e*2),Zo=new Int32Array(e*2),Ee=new Uint8Array(e*2)),zr.fill(-1),Ee.fill(0,0,e);const n=1/t,i=r[0].localPos;for(let o=0;o<e;o++){const a=r[o].localPos,c=Math.round((a.x-i.x)*n),l=Math.round((a.y-i.y)*n),h=Math.round((a.z-i.z)*n);wr[o]=c,Ko[o]=l,Zo[o]=h;const u=ri(c,l,h);let d=u&Qr;for(;zr[d]!==-1;)d=d+1&Qr;zr[d]=o,wu[d]=u}const s=[];for(let o=0;o<e;o++){if(Ee[o]===1)continue;Ee[o]=1,on.length=0,on.push(o);const a=[];for(;on.length>0;){const c=on.pop();a.push(r[c]);const l=wr[c],h=Ko[c],u=Zo[c];let d=Fi(ri(l+1,h,u));d>=0&&Ee[d]===0&&(Ee[d]=1,on.push(d)),d=Fi(ri(l-1,h,u)),d>=0&&Ee[d]===0&&(Ee[d]=1,on.push(d)),d=Fi(ri(l,h+1,u)),d>=0&&Ee[d]===0&&(Ee[d]=1,on.push(d)),d=Fi(ri(l,h-1,u)),d>=0&&Ee[d]===0&&(Ee[d]=1,on.push(d)),d=Fi(ri(l,h,u+1)),d>=0&&Ee[d]===0&&(Ee[d]=1,on.push(d)),d=Fi(ri(l,h,u-1)),d>=0&&Ee[d]===0&&(Ee[d]=1,on.push(d))}s.push(a)}return s}const lh=8192,Rr=new Et().makeScale(0,0,0),Tv=[],wv=[[1,0],[-1,0],[0,1],[0,-1]],Rv=12,Cv=1,Pv=800,Lv=new Mt(10064266);class Ru{constructor(t,e,n,i,s=0,o=0){this.scene=t,this.cell=e,this.sizeX=Math.ceil(n*2/e),this.sizeY=Math.ceil(i/e),this.sizeZ=this.sizeX,this.originX=s-n,this.originZ=o-n,this.grid=yu(this.sizeX*this.sizeY*this.sizeZ),this.geom=new dn(1,1,1),this.material=new tn({color:16777215,flatShading:!0})}grid;sizeX;sizeY;sizeZ;cell;originX;originZ;batches=[];records=[];geom;material;tmpMatrix=new Et;tmpQuat=new Oe;tmpEuler=new Fe;tmpScale=new A;tmpPos=new A;tmpColor=new Mt;external=null;gravityDirty=!1;clock=0;decayCursor=0;settleCount=0;dirtyColumns=new Set;forceNextSweep=!1;setExternalCollider(t){this.external=t,this.gravityDirty=!0,this.forceNextSweep=!0}getMeshes(){return this.batches.map(t=>t.mesh)}count(){return this.records.length}sharedGrid(){return{grid:this.grid,sizeX:this.sizeX,sizeY:this.sizeY,sizeZ:this.sizeZ,cell:this.cell,originX:this.originX,originZ:this.originZ}}isOccupied(t,e,n){const i=Math.floor((t-this.originX)/this.cell),s=Math.floor(e/this.cell),o=Math.floor((n-this.originZ)/this.cell);return i<0||s<0||o<0||i>=this.sizeX||s>=this.sizeY||o>=this.sizeZ?!1:this.grid[this.cellIdx(i,s,o)]===1}settle(t,e,n){e=Math.min(e,this.cell)*(.7+Math.random()*.55);let i=Math.floor((t.x-this.originX)/this.cell),s=Math.floor((t.z-this.originZ)/this.cell),o=Math.floor(t.y/this.cell);if(i<0||s<0||i>=this.sizeX||s>=this.sizeZ||o>=this.sizeY)return!1;for(o<0&&(o=0);o<this.sizeY&&this.grid[this.cellIdx(i,o,s)]===1;)o++;if(o>=this.sizeY)return!1;o=this.dropInColumn(i,o,s);const a=Math.random()<.3?1:2;let c=24;for(;c-- >0;){let f=i,m=s,_=o;const p=i+s&3;for(let g=0;g<4;g++){const v=wv[g+p&3],x=i+v[0],S=s+v[1];if(x<0||S<0||x>=this.sizeX||S>=this.sizeZ||this.grid[this.cellIdx(x,o,S)]===1)continue;const P=this.dropInColumn(x,o,S);P<=o-a&&P<_&&(_=P,f=x,m=S)}if(_===o)break;i=f,s=m,o=_}this.grid[this.cellIdx(i,o,s)]=1;const{batch:l,slot:h}=this.allocSlot();this.tmpScale.set(e,e,e),this.tmpEuler.set((Math.random()-.5)*.35,Math.random()*Math.PI,(Math.random()-.5)*.35),this.tmpQuat.setFromEuler(this.tmpEuler),this.tmpPos.set(this.originX+(i+.5+(Math.random()-.5)*.4)*this.cell,(o+.45)*this.cell,this.originZ+(s+.5+(Math.random()-.5)*.4)*this.cell),this.tmpMatrix.compose(this.tmpPos,this.tmpQuat,this.tmpScale);const u=this.batches[l];u.mesh.setMatrixAt(h,this.tmpMatrix),this.tmpColor.setHex(n).lerp(Lv,.35),u.mesh.setColorAt(h,this.tmpColor),u.colorDirty=!0,this.markDirty(u,h);const d=this.settleCount++%10<5?Cv:Rv;return this.records.push({batch:l,slot:h,cx:i,cy:o,cz:s,color:n,size:e,settledAt:this.clock,despawnAge:d}),this.gravityDirty=!0,this.dirtyColumns.add(i+s*this.sizeX),!0}blast(t,e){const n=e*e,i=ie.begin();this.gravityDirty=!0;for(let s=this.records.length-1;s>=0;s--){const o=this.records[s],a=this.originX+(o.cx+.5)*this.cell,c=(o.cy+.5)*this.cell,l=this.originZ+(o.cz+.5)*this.cell,h=a-t.x,u=c-t.y,d=l-t.z;if(h*h+u*u+d*d>n)continue;this.grid[this.cellIdx(o.cx,o.cy,o.cz)]=0;const f=this.batches[o.batch];f.mesh.setMatrixAt(o.slot,Rr),this.markDirty(f,o.slot),f.freeSlots.push(o.slot),this.dirtyColumns.add(o.cx+o.cz*this.sizeX),this.records[s]=this.records[this.records.length-1],this.records.pop(),ie.add(a,c,l,o.color,o.size)}return i}liftWhere(t,e){const n=ie.begin();let i=0;for(let s=this.records.length-1;s>=0&&i<e;s--){const o=this.records[s],a=this.originX+(o.cx+.5)*this.cell,c=this.originZ+(o.cz+.5)*this.cell;if(!t(a,c))continue;const l=(o.cy+.5)*this.cell;this.grid[this.cellIdx(o.cx,o.cy,o.cz)]=0;const h=this.batches[o.batch];h.mesh.setMatrixAt(o.slot,Rr),this.markDirty(h,o.slot),h.freeSlots.push(o.slot),this.dirtyColumns.add(o.cx+o.cz*this.sizeX),this.records[s]=this.records[this.records.length-1],this.records.pop(),ie.add(a,l,c,o.color,o.size),i++}return n}decayTick(t){if(this.clock+=t,this.records.length===0)return;let e=Math.min(Pv,this.records.length),n=this.decayCursor,i=!1;for(;e-- >0&&!(n>=this.records.length&&(n=0,this.records.length===0));){const s=this.records[n];if(this.clock-s.settledAt>s.despawnAge){this.grid[this.cellIdx(s.cx,s.cy,s.cz)]=0;const o=this.batches[s.batch];o.mesh.setMatrixAt(s.slot,Rr),this.markDirty(o,s.slot),o.freeSlots.push(s.slot),this.dirtyColumns.add(s.cx+s.cz*this.sizeX),this.records[n]=this.records[this.records.length-1],this.records.pop(),i=!0}else n++}this.decayCursor=n>=this.records.length?0:n,i&&(this.gravityDirty=!0)}collectUnsupported(t,e=!1){if(!this.gravityDirty&&!e)return Tv;this.gravityDirty=!1;const n=e||this.forceNextSweep;this.forceNextSweep=!1;const i=n?null:this.dirtyColumns;this.dirtyColumns=new Set;let s=!1;const o=ie.begin();for(let a=this.records.length-1;a>=0;a--){const c=this.records[a];if(i&&!i.has(c.cx+c.cz*this.sizeX)||this.isColumnGrounded(c))continue;s=!0,this.grid[this.cellIdx(c.cx,c.cy,c.cz)]=0;const l=this.batches[c.batch];l.mesh.setMatrixAt(c.slot,Rr),this.markDirty(l,c.slot),l.freeSlots.push(c.slot),this.dirtyColumns.add(c.cx+c.cz*this.sizeX),this.records[a]=this.records[this.records.length-1],this.records.pop(),o.length<t&&ie.add(this.originX+(c.cx+.5)*this.cell,(c.cy+.5)*this.cell,this.originZ+(c.cz+.5)*this.cell,c.color,c.size)}return s&&(this.gravityDirty=!0),o}dropInColumn(t,e,n){for(;e>0;){const i=e-1;if(this.grid[this.cellIdx(t,i,n)]===1||this.external?.isOccupied(this.originX+(t+.5)*this.cell,(i+.5)*this.cell,this.originZ+(n+.5)*this.cell))break;e=i}return e}isColumnGrounded(t){if(t.cy===0)return!0;let e=t.cy-1;for(;e>=0&&this.grid[this.cellIdx(t.cx,e,t.cz)]===1;)e--;return e<0?!0:this.external?this.external.isOccupied(this.originX+(t.cx+.5)*this.cell,(e+.5)*this.cell,this.originZ+(t.cz+.5)*this.cell):!1}clear(){this.grid.fill(0),this.records.length=0,this.dirtyColumns.clear();for(const t of this.batches)this.scene.remove(t.mesh),t.mesh.dispose();this.batches.length=0}dispose(){this.clear(),this.geom.dispose(),this.material.dispose()}markDirty(t,e){t.dirtyMin===-1?(t.dirtyMin=e,t.dirtyMax=e):(e<t.dirtyMin&&(t.dirtyMin=e),e>t.dirtyMax&&(t.dirtyMax=e))}flushDirty(){for(const t of this.batches){if(t.dirtyMin===-1)continue;const e=t.mesh.instanceMatrix;if(e.clearUpdateRanges(),e.addUpdateRange(t.dirtyMin*16,(t.dirtyMax-t.dirtyMin+1)*16),e.needsUpdate=!0,t.colorDirty&&t.mesh.instanceColor){const n=t.mesh.instanceColor;n.clearUpdateRanges(),n.addUpdateRange(t.dirtyMin*3,(t.dirtyMax-t.dirtyMin+1)*3),n.needsUpdate=!0,t.colorDirty=!1}t.dirtyMin=-1,t.dirtyMax=-1}}cellIdx(t,e,n){return t+e*this.sizeX+n*this.sizeX*this.sizeY}allocSlot(){for(let e=0;e<this.batches.length;e++){const n=this.batches[e];if(n.freeSlots.length>0)return{batch:e,slot:n.freeSlots.pop()};if(n.cursor<lh){const i=n.cursor++;return n.mesh.count=n.cursor,{batch:e,slot:i}}}const t=new Bs(this.geom,this.material,lh);return t.castShadow=!1,t.frustumCulled=!1,t.count=1,this.scene.add(t),this.batches.push({mesh:t,freeSlots:[],cursor:1,dirtyMin:-1,dirtyMax:-1,colorDirty:!1}),{batch:this.batches.length-1,slot:0}}}class Cu{constructor(t){this.scene=t}particles=[];burst(t,e,n=14){const i=new Hs(.08,6,6);for(let s=0;s<n;s++){const o=new ue({color:e,transparent:!0,opacity:1}),a=new It(i.clone(),o);a.position.copy(t),this.scene.add(a);const c=new A((Math.random()-.5)*6,Math.random()*4+1,(Math.random()-.5)*6);this.particles.push({mesh:a,velocity:c,life:0,maxLife:.7+Math.random()*.4,material:o})}}update(t){const e=[];for(const n of this.particles){n.life+=t,n.velocity.y-=6*t,n.mesh.position.addScaledVector(n.velocity,t);const i=n.life/n.maxLife;n.material.opacity=Math.max(0,1-i),n.life<n.maxLife?e.push(n):(this.scene.remove(n.mesh),n.mesh.geometry.dispose(),n.material.dispose())}this.particles=e}clear(){for(const t of this.particles)this.scene.remove(t.mesh),t.mesh.geometry.dispose(),t.material.dispose();this.particles=[]}}class Pu extends so{constructor(t=null){super();const e=new dn;e.deleteAttribute("uv");const n=new Os({side:Le}),i=new Os,s=new gu(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const o=new It(e,n);o.position.set(-.757,13.219,.717),o.scale.set(31.713,28.305,28.591),this.add(o);const a=new It(e,i);a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),this.add(a);const c=new It(e,i);c.position.set(-5.607,-.754,-.758),c.rotation.set(0,.994,0),c.scale.set(1.97,1.534,3.955),this.add(c);const l=new It(e,i);l.position.set(6.167,.857,7.803),l.rotation.set(0,.561,0),l.scale.set(3.927,6.285,3.687),this.add(l);const h=new It(e,i);h.position.set(-2.017,.018,6.124),h.rotation.set(0,.333,0),h.scale.set(2.002,4.566,2.064),this.add(h);const u=new It(e,i);u.position.set(2.291,-.756,-2.621),u.rotation.set(0,-.286,0),u.scale.set(1.546,1.552,1.496),this.add(u);const d=new It(e,i);d.position.set(-2.193,-.369,-5.547),d.rotation.set(0,.516,0),d.scale.set(3.875,3.487,2.986),this.add(d);const f=new It(e,Oi(50));f.position.set(-16.116,14.37,8.208),f.scale.set(.1,2.428,2.739),this.add(f);const m=new It(e,Oi(50));m.position.set(-16.109,18.021,-8.207),m.scale.set(.1,2.425,2.751),this.add(m);const _=new It(e,Oi(17));_.position.set(14.904,12.198,-1.832),_.scale.set(.15,4.265,6.331),this.add(_);const p=new It(e,Oi(43));p.position.set(-.462,8.89,14.52),p.scale.set(4.38,5.441,.088),this.add(p);const g=new It(e,Oi(20));g.position.set(3.235,11.486,-12.541),g.scale.set(2.5,2,.1),this.add(g);const v=new It(e,Oi(100));v.position.set(0,20,0),v.scale.set(1,.1,1),this.add(v)}dispose(){const t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(const e of t)e.dispose()}}function Oi(r){const t=new ue;return t.color.setScalar(r),t}const hh=-30,ki=.7,Iv=new A(0,0,1),Ms=new A,Ss=new Et,uh=new Oe,$o=new Oe,Cr=new A,Jo=new A;class Lu{group=new $e;rockets=[];trail;cap=300;tx;ty;tz;tl;cursor=0;flashes=[];flashLife=[];constructor(t){for(let s=0;s<4;s++)this.rockets.push(this.makeRocket());this.group.add(...this.rockets.map(s=>s.mesh));const e=new dn(1,1,1),n=new ue({color:10129280,transparent:!0,opacity:.5});this.trail=new Bs(e,n,this.cap),this.trail.frustumCulled=!1,this.trail.count=this.cap,this.tx=new Float32Array(this.cap),this.ty=new Float32Array(this.cap),this.tz=new Float32Array(this.cap),this.tl=new Float32Array(this.cap);for(let s=0;s<this.cap;s++)Ss.compose(Jo.set(0,-9999,0),$o,Cr.setScalar(0)),this.trail.setMatrixAt(s,Ss);this.group.add(this.trail);const i=new Hs(1,12,8);for(let s=0;s<3;s++){const o=new ue({color:16764794,transparent:!0,opacity:0}),a=new It(i,o);a.visible=!1,this.flashes.push(a),this.flashLife.push(0),this.group.add(a)}t.add(this.group)}makeRocket(){const t=new $e,e=new It(new Vs(.28,.28,2,10),new tn({color:3816770}));e.rotation.x=Math.PI/2;const n=new It(new Kr(.28,.8,10),new tn({color:11549218}));n.rotation.x=Math.PI/2,n.position.z=1.4;const i=new It(new Kr(.24,1,8),new ue({color:16757575}));return i.rotation.x=-Math.PI/2,i.position.z=-1.35,t.add(e,n,i),t.visible=!1,{mesh:t,pos:new A,vel:new A,t:0,active:!1,onImpact:null,target:new A,trailAcc:0}}get anyActive(){return this.rockets.some(t=>t.active)}launch(t,e,n){const i=this.rockets.find(s=>!s.active);i&&(i.pos.copy(t),i.target.copy(e),i.vel.set((e.x-t.x)/ki,(e.y-t.y-.5*hh*ki*ki)/ki,(e.z-t.z)/ki),i.t=0,i.active=!0,i.onImpact=n,i.trailAcc=0,i.mesh.visible=!0)}spawnTrail(t,e,n){const i=this.cursor;this.cursor=(this.cursor+1)%this.cap,this.tx[i]=t,this.ty[i]=e,this.tz[i]=n,this.tl[i]=.5}flash(t){for(let e=0;e<this.flashes.length;e++)if(!(this.flashLife[e]>0)){this.flashes[e].position.copy(t),this.flashes[e].visible=!0,this.flashLife[e]=.35;return}}update(t){for(const n of this.rockets)if(n.active){if(n.t+=t,n.vel.y+=hh*t,n.pos.addScaledVector(n.vel,t),n.t>=ki){n.active=!1,n.mesh.visible=!1,this.flash(n.target);const i=n.onImpact;n.onImpact=null,i&&i(n.target);continue}for(n.mesh.position.copy(n.pos),Ms.copy(n.vel).normalize(),uh.setFromUnitVectors(Iv,Ms),n.mesh.quaternion.copy(uh),n.trailAcc+=t;n.trailAcc>.02;)n.trailAcc-=.02,this.spawnTrail(n.pos.x-Ms.x*1.3,n.pos.y-Ms.y*1.3,n.pos.z-Ms.z*1.3)}let e=!1;for(let n=0;n<this.cap;n++){const i=this.tl[n];if(i<=0)continue;e=!0;const s=i-t;if(this.tl[n]=s,s<=0)Ss.compose(Jo.set(0,-9999,0),$o,Cr.setScalar(0));else{const o=1-s/.5;Cr.setScalar(.5+o*1.8),Ss.compose(Jo.set(this.tx[n],this.ty[n],this.tz[n]),$o,Cr)}this.trail.setMatrixAt(n,Ss)}e&&(this.trail.instanceMatrix.needsUpdate=!0);for(let n=0;n<this.flashes.length;n++){const i=this.flashLife[n];if(i<=0)continue;const s=i-t;this.flashLife[n]=s;const o=this.flashes[n],a=1-Math.max(s,0)/.35;o.scale.setScalar(1.5+a*7),o.material.opacity=Math.max(0,1-a)*.9,s<=0&&(o.visible=!1)}}}function dh(r,t){if(t===Nd)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(t===da||t===Xh){let e=r.getIndex();if(e===null){const o=[],a=r.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);r.setIndex(o),e=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=e.count-2,i=[];if(t===da)for(let o=1;o<=n;o++)i.push(e.getX(0)),i.push(e.getX(o)),i.push(e.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(e.getX(o)),i.push(e.getX(o+1)),i.push(e.getX(o+2))):(i.push(e.getX(o+2)),i.push(e.getX(o+1)),i.push(e.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",t),r}class Iu extends cs{constructor(t){super(t),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(e){return new Fv(e)}),this.register(function(e){return new Ov(e)}),this.register(function(e){return new jv(e)}),this.register(function(e){return new Yv(e)}),this.register(function(e){return new Kv(e)}),this.register(function(e){return new Bv(e)}),this.register(function(e){return new Vv(e)}),this.register(function(e){return new Hv(e)}),this.register(function(e){return new Gv(e)}),this.register(function(e){return new zv(e)}),this.register(function(e){return new Wv(e)}),this.register(function(e){return new kv(e)}),this.register(function(e){return new qv(e)}),this.register(function(e){return new Xv(e)}),this.register(function(e){return new Uv(e)}),this.register(function(e){return new Zv(e)}),this.register(function(e){return new $v(e)})}load(t,e,n,i){const s=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const l=Ds.extractUrlBase(t);o=Ds.resolveURL(l,this.path)}else o=Ds.extractUrlBase(t);this.manager.itemStart(t);const a=function(l){i?i(l):console.error(l),s.manager.itemError(t),s.manager.itemEnd(t)},c=new mu(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(t,function(l){try{s.parse(l,o,function(h){e(h),s.manager.itemEnd(t)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(t){return this.dracoLoader=t,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(t){return this.ktx2Loader=t,this}setMeshoptDecoder(t){return this.meshoptDecoder=t,this}register(t){return this.pluginCallbacks.indexOf(t)===-1&&this.pluginCallbacks.push(t),this}unregister(t){return this.pluginCallbacks.indexOf(t)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(t),1),this}parse(t,e,n,i){let s;const o={},a={},c=new TextDecoder;if(typeof t=="string")s=JSON.parse(t);else if(t instanceof ArrayBuffer)if(c.decode(new Uint8Array(t,0,4))===Du){try{o[Vt.KHR_BINARY_GLTF]=new Jv(t)}catch(u){i&&i(u);return}s=JSON.parse(o[Vt.KHR_BINARY_GLTF].content)}else s=JSON.parse(c.decode(t));else s=t;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new uy(s,{path:e||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(s.extensionsUsed)for(let h=0;h<s.extensionsUsed.length;++h){const u=s.extensionsUsed[h],d=s.extensionsRequired||[];switch(u){case Vt.KHR_MATERIALS_UNLIT:o[u]=new Nv;break;case Vt.KHR_DRACO_MESH_COMPRESSION:o[u]=new Qv(s,this.dracoLoader);break;case Vt.KHR_TEXTURE_TRANSFORM:o[u]=new ty;break;case Vt.KHR_MESH_QUANTIZATION:o[u]=new ey;break;default:d.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,i)}parseAsync(t,e){const n=this;return new Promise(function(i,s){n.parse(t,e,i,s)})}}function Dv(){let r={};return{get:function(t){return r[t]},add:function(t,e){r[t]=e},remove:function(t){delete r[t]},removeAll:function(){r={}}}}const Vt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Uv{constructor(t){this.parser=t,this.name=Vt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const t=this.parser,e=this.parser.json.nodes||[];for(let n=0,i=e.length;n<i;n++){const s=e[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&t._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(t){const e=this.parser,n="light:"+t;let i=e.cache.get(n);if(i)return i;const s=e.json,c=((s.extensions&&s.extensions[this.name]||{}).lights||[])[t];let l;const h=new Mt(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],Me);const u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Yn(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new gu(h),l.distance=u;break;case"spot":l=new H0(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,wn(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=e.createUniqueName(c.name||"light_"+t),i=Promise.resolve(l),e.cache.add(n,i),i}getDependency(t,e){if(t==="light")return this._loadLight(e)}createNodeAttachment(t){const e=this,n=this.parser,s=n.json.nodes[t],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(e.cache,a,c)})}}class Nv{constructor(){this.name=Vt.KHR_MATERIALS_UNLIT}getMaterialType(){return ue}extendParams(t,e,n){const i=[];t.color=new Mt(1,1,1),t.opacity=1;const s=e.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;t.color.setRGB(o[0],o[1],o[2],Me),t.opacity=o[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(t,"map",s.baseColorTexture,ve))}return Promise.all(i)}}class zv{constructor(t){this.parser=t,this.name=Vt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(t,e){const i=this.parser.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(e.emissiveIntensity=s),Promise.resolve()}}class Fv{constructor(t){this.parser=t,this.name=Vt.KHR_MATERIALS_CLEARCOAT}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:fn}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(e.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&s.push(n.assignTexture(e,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(e.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(e,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(e,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;e.clearcoatNormalScale=new Nt(a,a)}return Promise.all(s)}}class Ov{constructor(t){this.parser=t,this.name=Vt.KHR_MATERIALS_DISPERSION}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:fn}extendMaterialParams(t,e){const i=this.parser.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return e.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}}class kv{constructor(t){this.parser=t,this.name=Vt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:fn}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(e.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&s.push(n.assignTexture(e,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(e.iridescenceIOR=o.iridescenceIor),e.iridescenceThicknessRange===void 0&&(e.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(e.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(e.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(e,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(s)}}class Bv{constructor(t){this.parser=t,this.name=Vt.KHR_MATERIALS_SHEEN}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:fn}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];e.sheenColor=new Mt(0,0,0),e.sheenRoughness=0,e.sheen=1;const o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;e.sheenColor.setRGB(a[0],a[1],a[2],Me)}return o.sheenRoughnessFactor!==void 0&&(e.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&s.push(n.assignTexture(e,"sheenColorMap",o.sheenColorTexture,ve)),o.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(e,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(s)}}class Vv{constructor(t){this.parser=t,this.name=Vt.KHR_MATERIALS_TRANSMISSION}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:fn}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(e.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&s.push(n.assignTexture(e,"transmissionMap",o.transmissionTexture)),Promise.all(s)}}class Hv{constructor(t){this.parser=t,this.name=Vt.KHR_MATERIALS_VOLUME}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:fn}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];e.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&s.push(n.assignTexture(e,"thicknessMap",o.thicknessTexture)),e.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return e.attenuationColor=new Mt().setRGB(a[0],a[1],a[2],Me),Promise.all(s)}}class Gv{constructor(t){this.parser=t,this.name=Vt.KHR_MATERIALS_IOR}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:fn}extendMaterialParams(t,e){const i=this.parser.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return e.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class Wv{constructor(t){this.parser=t,this.name=Vt.KHR_MATERIALS_SPECULAR}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:fn}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];e.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&s.push(n.assignTexture(e,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return e.specularColor=new Mt().setRGB(a[0],a[1],a[2],Me),o.specularColorTexture!==void 0&&s.push(n.assignTexture(e,"specularColorMap",o.specularColorTexture,ve)),Promise.all(s)}}class Xv{constructor(t){this.parser=t,this.name=Vt.EXT_MATERIALS_BUMP}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:fn}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return e.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&s.push(n.assignTexture(e,"bumpMap",o.bumpTexture)),Promise.all(s)}}class qv{constructor(t){this.parser=t,this.name=Vt.KHR_MATERIALS_ANISOTROPY}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:fn}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(e.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(e.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&s.push(n.assignTexture(e,"anisotropyMap",o.anisotropyTexture)),Promise.all(s)}}class jv{constructor(t){this.parser=t,this.name=Vt.KHR_TEXTURE_BASISU}loadTexture(t){const e=this.parser,n=e.json,i=n.textures[t];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],o=e.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return e.loadTextureImage(t,s.source,o)}}class Yv{constructor(t){this.parser=t,this.name=Vt.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(t){const e=this.name,n=this.parser,i=n.json,s=i.textures[t];if(!s.extensions||!s.extensions[e])return null;const o=s.extensions[e],a=i.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(t,o.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(e)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(t)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(t){const e=new Image;e.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",e.onload=e.onerror=function(){t(e.height===1)}})),this.isSupported}}class Kv{constructor(t){this.parser=t,this.name=Vt.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(t){const e=this.name,n=this.parser,i=n.json,s=i.textures[t];if(!s.extensions||!s.extensions[e])return null;const o=s.extensions[e],a=i.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(t,o.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(e)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(t)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(t){const e=new Image;e.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",e.onload=e.onerror=function(){t(e.height===1)}})),this.isSupported}}class Zv{constructor(t){this.name=Vt.EXT_MESHOPT_COMPRESSION,this.parser=t}loadBufferView(t){const e=this.parser.json,n=e.bufferViews[t];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(e.extensionsRequired&&e.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){const c=i.byteOffset||0,l=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):o.ready.then(function(){const f=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}}class $v{constructor(t){this.name=Vt.EXT_MESH_GPU_INSTANCING,this.parser=t}createNodeMesh(t){const e=this.parser.json,n=e.nodes[t];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=e.meshes[n.mesh];for(const l of i.primitives)if(l.mode!==Ge.TRIANGLES&&l.mode!==Ge.TRIANGLE_STRIP&&l.mode!==Ge.TRIANGLE_FAN&&l.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],c={};for(const l in o)a.push(this.parser.getDependency("accessor",o[l]).then(h=>(c[l]=h,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(t)),Promise.all(a).then(l=>{const h=l.pop(),u=h.isGroup?h.children:[h],d=l[0].count,f=[];for(const m of u){const _=new Et,p=new A,g=new Oe,v=new A(1,1,1),x=new Bs(m.geometry,m.material,d);for(let S=0;S<d;S++)c.TRANSLATION&&p.fromBufferAttribute(c.TRANSLATION,S),c.ROTATION&&g.fromBufferAttribute(c.ROTATION,S),c.SCALE&&v.fromBufferAttribute(c.SCALE,S),x.setMatrixAt(S,_.compose(p,g,v));for(const S in c)if(S==="_COLOR_0"){const P=c[S];x.instanceColor=new ma(P.array,P.itemSize,P.normalized)}else S!=="TRANSLATION"&&S!=="ROTATION"&&S!=="SCALE"&&m.geometry.setAttribute(S,c[S]);se.prototype.copy.call(x,m),this.parser.assignFinalMaterial(x),f.push(x)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const Du="glTF",bs=12,fh={JSON:1313821514,BIN:5130562};class Jv{constructor(t){this.name=Vt.KHR_BINARY_GLTF,this.content=null,this.body=null;const e=new DataView(t,0,bs),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(t.slice(0,4))),version:e.getUint32(4,!0),length:e.getUint32(8,!0)},this.header.magic!==Du)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-bs,s=new DataView(t,bs);let o=0;for(;o<i;){const a=s.getUint32(o,!0);o+=4;const c=s.getUint32(o,!0);if(o+=4,c===fh.JSON){const l=new Uint8Array(t,bs+o,a);this.content=n.decode(l)}else if(c===fh.BIN){const l=bs+o;this.body=t.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class Qv{constructor(t,e){if(!e)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Vt.KHR_DRACO_MESH_COMPRESSION,this.json=t,this.dracoLoader=e,this.dracoLoader.preload()}decodePrimitive(t,e){const n=this.json,i=this.dracoLoader,s=t.extensions[this.name].bufferView,o=t.extensions[this.name].attributes,a={},c={},l={};for(const h in o){const u=Sa[h]||h.toLowerCase();a[u]=o[h]}for(const h in t.attributes){const u=Sa[h]||h.toLowerCase();if(o[h]!==void 0){const d=n.accessors[t.attributes[h]],f=qi[d.componentType];l[u]=f.name,c[u]=d.normalized===!0}}return e.getDependency("bufferView",s).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(const m in f.attributes){const _=f.attributes[m],p=c[m];p!==void 0&&(_.normalized=p)}u(f)},a,l,Me,d)})})}}class ty{constructor(){this.name=Vt.KHR_TEXTURE_TRANSFORM}extendTexture(t,e){return(e.texCoord===void 0||e.texCoord===t.channel)&&e.offset===void 0&&e.rotation===void 0&&e.scale===void 0||(t=t.clone(),e.texCoord!==void 0&&(t.channel=e.texCoord),e.offset!==void 0&&t.offset.fromArray(e.offset),e.rotation!==void 0&&(t.rotation=e.rotation),e.scale!==void 0&&t.repeat.fromArray(e.scale),t.needsUpdate=!0),t}}class ey{constructor(){this.name=Vt.KHR_MESH_QUANTIZATION}}class Uu extends Gs{constructor(t,e,n,i){super(t,e,n,i)}copySampleValue_(t){const e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=t*i*3+i;for(let o=0;o!==i;o++)e[o]=n[s+o];return e}interpolate_(t,e,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,h=i-e,u=(n-e)/h,d=u*u,f=d*u,m=t*l,_=m-l,p=-2*f+3*d,g=f-d,v=1-p,x=g-d+u;for(let S=0;S!==a;S++){const P=o[_+S+a],T=o[_+S+c]*h,w=o[m+S+a],D=o[m+S]*h;s[S]=v*P+x*T+p*w+g*D}return s}}const ny=new Oe;class iy extends Uu{interpolate_(t,e,n,i){const s=super.interpolate_(t,e,n,i);return ny.fromArray(s).normalize().toArray(s),s}}const Ge={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},qi={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},ph={9728:Pe,9729:ze,9984:Fh,9985:Ur,9986:ws,9987:Rn},mh={33071:Wn,33648:Br,10497:Ki},Qo={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Sa={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},On={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},sy={CUBICSPLINE:void 0,LINEAR:zs,STEP:Ns},ta={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function ry(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new Os({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Pn})),r.DefaultMaterial}function oi(r,t,e){for(const n in e.extensions)r[n]===void 0&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[n]=e.extensions[n])}function wn(r,t){t.extras!==void 0&&(typeof t.extras=="object"?Object.assign(r.userData,t.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+t.extras))}function oy(r,t,e){let n=!1,i=!1,s=!1;for(let l=0,h=t.length;l<h;l++){const u=t[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const o=[],a=[],c=[];for(let l=0,h=t.length;l<h;l++){const u=t[l];if(n){const d=u.POSITION!==void 0?e.getDependency("accessor",u.POSITION):r.attributes.position;o.push(d)}if(i){const d=u.NORMAL!==void 0?e.getDependency("accessor",u.NORMAL):r.attributes.normal;a.push(d)}if(s){const d=u.COLOR_0!==void 0?e.getDependency("accessor",u.COLOR_0):r.attributes.color;c.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){const h=l[0],u=l[1],d=l[2];return n&&(r.morphAttributes.position=h),i&&(r.morphAttributes.normal=u),s&&(r.morphAttributes.color=d),r.morphTargetsRelative=!0,r})}function ay(r,t){if(r.updateMorphTargets(),t.weights!==void 0)for(let e=0,n=t.weights.length;e<n;e++)r.morphTargetInfluences[e]=t.weights[e];if(t.extras&&Array.isArray(t.extras.targetNames)){const e=t.extras.targetNames;if(r.morphTargetInfluences.length===e.length){r.morphTargetDictionary={};for(let n=0,i=e.length;n<i;n++)r.morphTargetDictionary[e[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function cy(r){let t;const e=r.extensions&&r.extensions[Vt.KHR_DRACO_MESH_COMPRESSION];if(e?t="draco:"+e.bufferView+":"+e.indices+":"+ea(e.attributes):t=r.indices+":"+ea(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)t+=":"+ea(r.targets[n]);return t}function ea(r){let t="";const e=Object.keys(r).sort();for(let n=0,i=e.length;n<i;n++)t+=e[n]+":"+r[e[n]]+";";return t}function ba(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function ly(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const hy=new Et;class uy{constructor(t={},e={}){this.json=t,this.extensions={},this.plugins={},this.options=e,this.cache=new Dv,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=!1,s=-1;typeof navigator<"u"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,i=navigator.userAgent.indexOf("Firefox")>-1,s=i?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||n||i&&s<98?this.textureLoader=new B0(this.options.manager):this.textureLoader=new X0(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new mu(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(t){this.extensions=t}setPlugins(t){this.plugins=t}parse(t,e){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return oi(s,a,i),wn(a,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(const c of a.scenes)c.updateMatrixWorld();t(a)})}).catch(e)}_markDefs(){const t=this.json.nodes||[],e=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=e.length;i<s;i++){const o=e[i].joints;for(let a=0,c=o.length;a<c;a++)t[o[a]].isBone=!0}for(let i=0,s=t.length;i<s;i++){const o=t[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(t,e){e!==void 0&&(t.refs[e]===void 0&&(t.refs[e]=t.uses[e]=0),t.refs[e]++)}_getNodeRef(t,e,n){if(t.refs[e]<=1)return n;const i=n.clone(),s=(o,a)=>{const c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(const[l,h]of o.children.entries())s(h,a.children[l])};return s(n,i),i.name+="_instance_"+t.uses[e]++,i}_invokeOne(t){const e=Object.values(this.plugins);e.push(this);for(let n=0;n<e.length;n++){const i=t(e[n]);if(i)return i}return null}_invokeAll(t){const e=Object.values(this.plugins);e.unshift(this);const n=[];for(let i=0;i<e.length;i++){const s=t(e[i]);s&&n.push(s)}return n}getDependency(t,e){const n=t+":"+e;let i=this.cache.get(n);if(!i){switch(t){case"scene":i=this.loadScene(e);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(e)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(e)});break;case"accessor":i=this.loadAccessor(e);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(e)});break;case"buffer":i=this.loadBuffer(e);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(e)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(e)});break;case"skin":i=this.loadSkin(e);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(e)});break;case"camera":i=this.loadCamera(e);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(t,e)}),!i)throw new Error("Unknown type: "+t);break}this.cache.add(n,i)}return i}getDependencies(t){let e=this.cache.get(t);if(!e){const n=this,i=this.json[t+(t==="mesh"?"es":"s")]||[];e=Promise.all(i.map(function(s,o){return n.getDependency(t,o)})),this.cache.add(t,e)}return e}loadBuffer(t){const e=this.json.buffers[t],n=this.fileLoader;if(e.type&&e.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+e.type+" buffer type is not supported.");if(e.uri===void 0&&t===0)return Promise.resolve(this.extensions[Vt.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,o){n.load(Ds.resolveURL(e.uri,i.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+e.uri+'".'))})})}loadBufferView(t){const e=this.json.bufferViews[t];return this.getDependency("buffer",e.buffer).then(function(n){const i=e.byteLength||0,s=e.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(t){const e=this,n=this.json,i=this.json.accessors[t];if(i.bufferView===void 0&&i.sparse===void 0){const o=Qo[i.type],a=qi[i.componentType],c=i.normalized===!0,l=new a(i.count*o);return Promise.resolve(new de(l,o,c))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(o){const a=o[0],c=Qo[i.type],l=qi[i.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,m=i.normalized===!0;let _,p;if(f&&f!==u){const g=Math.floor(d/f),v="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+g+":"+i.count;let x=e.cache.get(v);x||(_=new l(a,g*f,i.count*f/h),x=new x0(_,f/h),e.cache.add(v,x)),p=new Fa(x,c,d%f/h,m)}else a===null?_=new l(i.count*c):_=new l(a,d,i.count*c),p=new de(_,c,m);if(i.sparse!==void 0){const g=Qo.SCALAR,v=qi[i.sparse.indices.componentType],x=i.sparse.indices.byteOffset||0,S=i.sparse.values.byteOffset||0,P=new v(o[1],x,i.sparse.count*g),T=new l(o[2],S,i.sparse.count*c);a!==null&&(p=new de(p.array.slice(),p.itemSize,p.normalized));for(let w=0,D=P.length;w<D;w++){const E=P[w];if(p.setX(E,T[w*c]),c>=2&&p.setY(E,T[w*c+1]),c>=3&&p.setZ(E,T[w*c+2]),c>=4&&p.setW(E,T[w*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return p})}loadTexture(t){const e=this.json,n=this.options,s=e.textures[t].source,o=e.images[s];let a=this.textureLoader;if(o.uri){const c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(t,s,a)}loadTextureImage(t,e,n){const i=this,s=this.json,o=s.textures[t],a=s.images[e],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(e,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);const d=(s.samplers||{})[o.sampler]||{};return h.magFilter=ph[d.magFilter]||ze,h.minFilter=ph[d.minFilter]||Rn,h.wrapS=mh[d.wrapS]||Ki,h.wrapT=mh[d.wrapT]||Ki,i.associations.set(h,{textures:t}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(t,e){const n=this,i=this.json,s=this.options;if(this.sourceCache[t]!==void 0)return this.sourceCache[t].then(u=>u.clone());const o=i.images[t],a=self.URL||self.webkitURL;let c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(u){l=!0;const d=new Blob([u],{type:o.mimeType});return c=a.createObjectURL(d),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+t+" is missing URI and bufferView");const h=Promise.resolve(c).then(function(u){return new Promise(function(d,f){let m=d;e.isImageBitmapLoader===!0&&(m=function(_){const p=new fe(_);p.needsUpdate=!0,d(p)}),e.load(Ds.resolveURL(u,s.path),m,void 0,f)})}).then(function(u){return l===!0&&a.revokeObjectURL(c),wn(u,o),u.userData.mimeType=o.mimeType||ly(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[t]=h,h}assignTexture(t,e,n,i){const s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),s.extensions[Vt.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[Vt.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const c=s.associations.get(o);o=s.extensions[Vt.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,c)}}return i!==void 0&&(o.colorSpace=i),t[e]=o,o})}assignFinalMaterial(t){const e=t.geometry;let n=t.material;const i=e.attributes.tangent===void 0,s=e.attributes.color!==void 0,o=e.attributes.normal===void 0;if(t.isPoints){const a="PointsMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new du,Qe.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(t.isLine){const a="LineBasicMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new uu,Qe.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(i||s||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),s&&(c.vertexColors=!0),o&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}t.material=n}getMaterialType(){return Os}loadMaterial(t){const e=this,n=this.json,i=this.extensions,s=n.materials[t];let o;const a={},c=s.extensions||{},l=[];if(c[Vt.KHR_MATERIALS_UNLIT]){const u=i[Vt.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),l.push(u.extendParams(a,s,e))}else{const u=s.pbrMetallicRoughness||{};if(a.color=new Mt(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],Me),a.opacity=d[3]}u.baseColorTexture!==void 0&&l.push(e.assignTexture(a,"map",u.baseColorTexture,ve)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(e.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),l.push(e.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(t)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(t,a)})))}s.doubleSided===!0&&(a.side=ln);const h=s.alphaMode||ta.OPAQUE;if(h===ta.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===ta.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==ue&&(l.push(e.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new Nt(1,1),s.normalTexture.scale!==void 0)){const u=s.normalTexture.scale;a.normalScale.set(u,u)}if(s.occlusionTexture!==void 0&&o!==ue&&(l.push(e.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==ue){const u=s.emissiveFactor;a.emissive=new Mt().setRGB(u[0],u[1],u[2],Me)}return s.emissiveTexture!==void 0&&o!==ue&&l.push(e.assignTexture(a,"emissiveMap",s.emissiveTexture,ve)),Promise.all(l).then(function(){const u=new o(a);return s.name&&(u.name=s.name),wn(u,s),e.associations.set(u,{materials:t}),s.extensions&&oi(i,u,s),u})}createUniqueName(t){const e=Zt.sanitizeNodeName(t||"");return e in this.nodeNamesUsed?e+"_"+ ++this.nodeNamesUsed[e]:(this.nodeNamesUsed[e]=0,e)}loadGeometries(t){const e=this,n=this.extensions,i=this.primitiveCache;function s(a){return n[Vt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,e).then(function(c){return gh(c,a,e)})}const o=[];for(let a=0,c=t.length;a<c;a++){const l=t[a],h=cy(l),u=i[h];if(u)o.push(u.promise);else{let d;l.extensions&&l.extensions[Vt.KHR_DRACO_MESH_COMPRESSION]?d=s(l):d=gh(new ke,l,e),i[h]={primitive:l,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(t){const e=this,n=this.json,i=this.extensions,s=n.meshes[t],o=s.primitives,a=[];for(let c=0,l=o.length;c<l;c++){const h=o[c].material===void 0?ry(this.cache):this.getDependency("material",o[c].material);a.push(h)}return a.push(e.loadGeometries(o)),Promise.all(a).then(function(c){const l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let f=0,m=h.length;f<m;f++){const _=h[f],p=o[f];let g;const v=l[f];if(p.mode===Ge.TRIANGLES||p.mode===Ge.TRIANGLE_STRIP||p.mode===Ge.TRIANGLE_FAN||p.mode===void 0)g=s.isSkinnedMesh===!0?new y0(_,v):new It(_,v),g.isSkinnedMesh===!0&&g.normalizeSkinWeights(),p.mode===Ge.TRIANGLE_STRIP?g.geometry=dh(g.geometry,Xh):p.mode===Ge.TRIANGLE_FAN&&(g.geometry=dh(g.geometry,da));else if(p.mode===Ge.LINES)g=new b0(_,v);else if(p.mode===Ge.LINE_STRIP)g=new ka(_,v);else if(p.mode===Ge.LINE_LOOP)g=new E0(_,v);else if(p.mode===Ge.POINTS)g=new A0(_,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+p.mode);Object.keys(g.geometry.morphAttributes).length>0&&ay(g,s),g.name=e.createUniqueName(s.name||"mesh_"+t),wn(g,s),p.extensions&&oi(i,g,p),e.assignFinalMaterial(g),u.push(g)}for(let f=0,m=u.length;f<m;f++)e.associations.set(u[f],{meshes:t,primitives:f});if(u.length===1)return s.extensions&&oi(i,u[0],s),u[0];const d=new $e;s.extensions&&oi(i,d,s),e.associations.set(d,{meshes:t});for(let f=0,m=u.length;f<m;f++)d.add(u[f]);return d})}loadCamera(t){let e;const n=this.json.cameras[t],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?e=new ye(lf.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(e=new Da(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(e.name=this.createUniqueName(n.name)),wn(e,n),Promise.resolve(e)}loadSkin(t){const e=this.json.skins[t],n=[];for(let i=0,s=e.joints.length;i<s;i++)n.push(this._loadNodeShallow(e.joints[i]));return e.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",e.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),o=i,a=[],c=[];for(let l=0,h=o.length;l<h;l++){const u=o[l];if(u){a.push(u);const d=new Et;s!==null&&d.fromArray(s.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',e.joints[l])}return new Oa(a,c)})}loadAnimation(t){const e=this.json,n=this,i=e.animations[t],s=i.name?i.name:"animation_"+t,o=[],a=[],c=[],l=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){const f=i.channels[u],m=i.samplers[f.sampler],_=f.target,p=_.node,g=i.parameters!==void 0?i.parameters[m.input]:m.input,v=i.parameters!==void 0?i.parameters[m.output]:m.output;_.node!==void 0&&(o.push(this.getDependency("node",p)),a.push(this.getDependency("accessor",g)),c.push(this.getDependency("accessor",v)),l.push(m),h.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){const d=u[0],f=u[1],m=u[2],_=u[3],p=u[4],g=[];for(let v=0,x=d.length;v<x;v++){const S=d[v],P=f[v],T=m[v],w=_[v],D=p[v];if(S===void 0)continue;S.updateMatrix&&S.updateMatrix();const E=n._createAnimationTracks(S,P,T,w,D);if(E)for(let y=0;y<E.length;y++)g.push(E[y])}return new D0(s,void 0,g)})}createNodeMesh(t){const e=this.json,n=this,i=e.nodes[t];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const o=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=i.weights.length;c<l;c++)a.morphTargetInfluences[c]=i.weights[c]}),o})}loadNode(t){const e=this.json,n=this,i=e.nodes[t],s=n._loadNodeShallow(t),o=[],a=i.children||[];for(let l=0,h=a.length;l<h;l++)o.push(n.getDependency("node",a[l]));const c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(o),c]).then(function(l){const h=l[0],u=l[1],d=l[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,hy)});for(let f=0,m=u.length;f<m;f++)h.add(u[f]);return h})}_loadNodeShallow(t){const e=this.json,n=this.extensions,i=this;if(this.nodeCache[t]!==void 0)return this.nodeCache[t];const s=e.nodes[t],o=s.name?i.createUniqueName(s.name):"",a=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(t)});return c&&a.push(c),s.camera!==void 0&&a.push(i.getDependency("camera",s.camera).then(function(l){return i._getNodeRef(i.cameraCache,s.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(t)}).forEach(function(l){a.push(l)}),this.nodeCache[t]=Promise.all(a).then(function(l){let h;if(s.isBone===!0?h=new lu:l.length>1?h=new $e:l.length===1?h=l[0]:h=new se,h!==l[0])for(let u=0,d=l.length;u<d;u++)h.add(l[u]);if(s.name&&(h.userData.name=s.name,h.name=o),wn(h,s),s.extensions&&oi(n,h,s),s.matrix!==void 0){const u=new Et;u.fromArray(s.matrix),h.applyMatrix4(u)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=t,h}),this.nodeCache[t]}loadScene(t){const e=this.extensions,n=this.json.scenes[t],i=this,s=new $e;n.name&&(s.name=i.createUniqueName(n.name)),wn(s,n),n.extensions&&oi(e,s,n);const o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(i.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let h=0,u=c.length;h<u;h++)s.add(c[h]);const l=h=>{const u=new Map;for(const[d,f]of i.associations)(d instanceof Qe||d instanceof fe)&&u.set(d,f);return h.traverse(d=>{const f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=l(s),s})}_createAnimationTracks(t,e,n,i,s){const o=[],a=t.name?t.name:t.uuid,c=[];On[s.path]===On.weights?t.traverse(function(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}):c.push(a);let l;switch(On[s.path]){case On.weights:l=es;break;case On.rotation:l=ns;break;case On.position:case On.scale:l=is;break;default:switch(n.itemSize){case 1:l=es;break;case 2:case 3:default:l=is;break}break}const h=i.interpolation!==void 0?sy[i.interpolation]:zs,u=this._getArrayFromAccessor(n);for(let d=0,f=c.length;d<f;d++){const m=new l(c[d]+"."+On[s.path],e.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(m),o.push(m)}return o}_getArrayFromAccessor(t){let e=t.array;if(t.normalized){const n=ba(e.constructor),i=new Float32Array(e.length);for(let s=0,o=e.length;s<o;s++)i[s]=e[s]*n;e=i}return e}_createCubicSplineTrackInterpolant(t){t.createInterpolant=function(n){const i=this instanceof ns?iy:Uu;return new i(this.times,this.values,this.getValueSize()/3,n)},t.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function dy(r,t,e){const n=t.attributes,i=new en;if(n.POSITION!==void 0){const a=e.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(i.set(new A(c[0],c[1],c[2]),new A(l[0],l[1],l[2])),a.normalized){const h=ba(qi[a.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=t.targets;if(s!==void 0){const a=new A,c=new A;for(let l=0,h=s.length;l<h;l++){const u=s[l];if(u.POSITION!==void 0){const d=e.json.accessors[u.POSITION],f=d.min,m=d.max;if(f!==void 0&&m!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(m[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(m[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(m[2]))),d.normalized){const _=ba(qi[d.componentType]);c.multiplyScalar(_)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}r.boundingBox=i;const o=new nn;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=o}function gh(r,t,e){const n=t.attributes,i=[];function s(o,a){return e.getDependency("accessor",o).then(function(c){r.setAttribute(a,c)})}for(const o in n){const a=Sa[o]||o.toLowerCase();a in r.attributes||i.push(s(n[o],a))}if(t.indices!==void 0&&!r.index){const o=e.getDependency("accessor",t.indices).then(function(a){r.setIndex(a)});i.push(o)}return qt.workingColorSpace!==Me&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${qt.workingColorSpace}" not supported.`),wn(r,t),dy(r,t,e),Promise.all(i).then(function(){return t.targets!==void 0?oy(r,t.targets,e):r})}const kn=16,Es=36,Bn=4.2,fy=2,Pr=180,na=7,an=110;class py{cars=[];foots=[];roads=[];parkSpots=[];mainCX=0;mainCZ=0;mainHD=0;loaded=!1;constructor(t,e,n,i,s=[],o=0,a=0){this.mainCX=o,this.mainCZ=a,this.mainHD=i,this.foots.push({cx:o,cz:a,hw:n,hd:i});for(const c of s)this.foots.push(c);this.roads.push({x0:-Pr,z0:kn-Bn,x1:Pr,z1:kn+Bn},{x0:Es-Bn,z0:-Pr,x1:Es+Bn,z1:Pr}),this.addGround(t),this.loadProps(t,e)}addGround(t){const e=new tn({color:3815998}),n=new tn({color:12170150}),i=new ue({color:14207082}),s=(u,d,f)=>{const m=u.x1-u.x0,_=u.z1-u.z0,p=new It(new We(m,_),d);p.rotation.x=-Math.PI/2,p.position.set((u.x0+u.x1)/2,f,(u.z0+u.z1)/2),t.add(p)};for(const u of this.foots)s({x0:u.cx-u.hw-3,z0:u.cz-u.hd-3,x1:u.cx+u.hw+3,z1:u.cz+u.hd+3},n,.02);for(const u of this.roads)s({x0:u.x0-1.6,z0:u.z0-1.6,x1:u.x1+1.6,z1:u.z1+1.6},n,.025),s(u,e,.04);const o=130;for(let u=-o;u<o;u+=5){if(Math.abs(u-Es)<Bn)continue;const d=new It(new We(1.8,.3),i);d.rotation.x=-Math.PI/2,d.position.set(u,.06,kn),t.add(d)}for(let u=-o;u<o;u+=5){if(Math.abs(u-kn)<Bn)continue;const d=new It(new We(.3,1.8),i);d.rotation.x=-Math.PI/2,d.position.set(Es,.06,u),t.add(d)}const a=new ue({color:15130834}),c=this.mainCZ+this.mainHD+1;s({x0:this.mainCX-2.4,z0:c,x1:this.mainCX+2.4,z1:kn},e,.045);const l={x0:this.mainCX-20,z0:c+1.5,x1:this.mainCX-6,z1:Math.min(kn-4.5,c+11)};s({x0:l.x0-.6,z0:l.z0-.6,x1:l.x1+.6,z1:l.z1+.6},n,.03),s(l,e,.045);const h=(l.x1-l.x0)/4;for(let u=1;u<4;u++){const d=l.x0+u*h,f=new It(new We(.18,l.z1-l.z0-1),a);f.rotation.x=-Math.PI/2,f.position.set(d,.06,(l.z0+l.z1)/2),t.add(f)}this.parkSpots.push({x:l.x0+h*.5,z:(l.z0+l.z1)/2},{x:l.x0+h*2.5,z:(l.z0+l.z1)/2})}async loadProps(t,e){const n=new Iu,i=s=>n.loadAsync(`models/${s}`).then(o=>o.scene);try{const[s,o,a,c,l,h,u]=await Promise.all([i("tree.glb"),i("tree_pine.glb"),i("tree_small.glb"),i("car.glb"),i("car_suv.glb"),i("car_van.glb"),i("streetlight.glb")]);this.scatterTrees(t,[s,o,a],e?16:30),this.placeStreetlights(t,u),this.spawnCars(t,[c,l,h],e?5:9),this.placeParkedCars(t,[l,c]),this.loaded=!0}catch(s){console.error("[hero] prop models failed to load",s)}}scatterTrees(t,e,n){let i=0,s=0;for(;i<n&&s<n*14;){s++;const o=12+Math.pow(Math.random(),.7)*34,a=Math.random()*Math.PI*2,c=Math.cos(a)*o,l=Math.sin(a)*o;if(this.nearBuilding(c,l,2)||this.onRoad(c,l,1.5))continue;const u=e[i%e.length].clone(!0),d=.85+Math.random()*.5;u.scale.setScalar(d),u.rotation.y=Math.random()*Math.PI*2,u.position.set(c,0,l),t.add(u),i++}}placeStreetlights(t,e){const n=(i,s)=>{if(this.nearBuilding(i,s,1))return;const o=e.clone(!0);o.position.set(i,0,s),o.rotation.y=Math.random()*Math.PI*2,t.add(o)};for(let i=-24;i<=30;i+=13)n(i,kn-Bn-1.4);for(let i=-20;i<=8;i+=13)n(Es-Bn-1.4,i)}spawnCars(t,e,n){const i=[13777711,3108818,14722346,3122532,12567496,9067716];for(let s=0;s<n;s++){const o=s%2===0?1:-1,c=e[s%e.length].clone(!0),l=i[s%i.length];c.traverse(d=>{const f=d;if(f.isMesh&&f.material?.name==="carbody"){const m=f.material.clone();m.color.setHex(l),f.material=m}}),c.rotation.y=o>0?Math.PI/2:-Math.PI/2;const h=kn+o*fy,u=-an+s*47%(2*an);c.position.set(u,0,h),t.add(c),this.cars.push({obj:c,dir:o,half:2.4,x:u,speed:na})}}placeParkedCars(t,e){const n=[4478313,13093584];this.parkSpots.forEach((i,s)=>{const o=e[s%e.length].clone(!0);o.traverse(a=>{const c=a;if(c.isMesh&&c.material?.name==="carbody"){const l=c.material.clone();l.color.setHex(n[s%n.length]),c.material=l}}),o.rotation.y=0,o.position.set(i.x,0,i.z),t.add(o)})}driveCars(t){for(const i of this.cars){let s=1/0;for(const a of this.cars){if(a===i||a.dir!==i.dir)continue;const c=(a.x-i.x)*i.dir;c>0&&(s=Math.min(s,c-(i.half+a.half)))}let o=na;s<5.5?o=0:s<11&&(o=na*(s-5.5)/(11-5.5)),i.speed+=(o-i.speed)*Math.min(1,t*3),i.x+=i.dir*i.speed*t,i.dir>0&&i.x>an?this.laneStartClear(i,-an)?i.x=-an:(i.x=an,i.speed=0):i.dir<0&&i.x<-an&&(this.laneStartClear(i,an)?i.x=an:(i.x=-an,i.speed=0)),i.obj.position.x=i.x}}laneStartClear(t,e){for(const n of this.cars)if(!(n===t||n.dir!==t.dir)&&Math.abs(n.x-e)<t.half+n.half+8)return!1;return!0}nearBuilding(t,e,n){for(const i of this.foots)if(Math.abs(t-i.cx)<i.hw+3+n&&Math.abs(e-i.cz)<i.hd+3+n)return!0;return!1}onRoad(t,e,n){for(const i of this.roads)if(t>i.x0-n&&t<i.x1+n&&e>i.z0-n&&e<i.z1+n)return!0;return!1}update(t){this.loaded&&this.driveCars(t)}}const my=6.05,gy=24,_y=4.5,_h=11,xh=2719929,vh=0,yh=-8,xy=4e6,vy=.8,yy=new A(0,-4.5,0),ia=new A,sa=new A,My=new A(0,1,0),ra=new A;class Sy{constructor(t){this.app=t,this.reduced=t.prefersReducedMotion,this.hitFx=new Cu(t.scene),this.flyingChunks=new xu(t.scene),this.bigChunks=new Tu(t.scene);const e=this.cfg,n=e.height*e.blockSize,i=e.width*e.blockSize/2,s=e.depth*e.blockSize/2,o=Math.max(i,s)+10;this.rubble=new Ru(t.scene,e.blockSize,o,n+2,e.originX??0,e.originZ??0);const a={isOccupied:(d,f,m)=>this.building.cluster.isOccupied(d,f,m)},c={isOccupied:(d,f,m)=>this.building.cluster.isOccupied(d,f,m)||this.rubble.isOccupied(d,f,m)},l={settle:(d,f,m)=>this.rubble.settle(d,f,m)};this.rubble.setExternalCollider(a),this.flyingChunks.setWorldCollider(c),this.flyingChunks.setDebrisSink(l),this.bigChunks.setWorldCollider(c),this.bigChunks.setRubbleSink(l),this.bigChunks.setImpactDamager((d,f)=>this.controller.applyExplosion(d,f)),this.spawnBuilding(),this.center.set(e.originX??0,n*.5,e.originZ??0),this.rockets=new Lu(t.scene),this.buildLights(),t.scene.add(this.makeGround());const h=this.spawnNeighbours();this.scenery=new py(t.scene,window.innerWidth<=720,i,s,h,this.center.x,this.center.z),window.addEventListener("pointerdown",this.onDown),window.addEventListener("pointerup",this.onUp),this.bindRotateButton("rot-left",1),this.bindRotateButton("rot-right",-1);const u=document.getElementById("btn-reset");u&&u.addEventListener("click",()=>{this.rebuilding||this.rebuild()}),t.onUpdate(this.update)}building;controller;flyingChunks;bigChunks;rubble;hitFx;rockets;scenery;gen0=Us(vh,yh,_h,xh);cfg=this.gen0.config;firstSpawn=!0;center=new A;reduced;orbit=.5;rotDir=0;shake=0;emptyTimer=-1;rebuilding=!1;rubbleTimer=0;rubbleForceTimer=0;ray=new _u;ndc=new Nt;downX=0;downY=0;downT=0;spawnNeighbours(){const t=[Us(52,2,7,9080728),Xx(6,34,14207398,9062964)],e=[];for(const n of t){const i=new ya(n.config,n.blocks);this.app.scene.add(i.group);const s=n.config;e.push({cx:s.originX??0,cz:s.originZ??0,hw:s.width*s.blockSize/2,hd:s.depth*s.blockSize/2})}return e}spawnBuilding(){const t=this.firstSpawn?this.gen0:Us(vh,yh,_h,xh);this.firstSpawn=!1,this.building=new ya(t.config,t.blocks),this.app.scene.add(this.building.group),this.controller=new Au(this.building,this.flyingChunks,this.bigChunks,this.hitFx),this.controller.setSweepBudget(xy)}rebuild(){this.rebuilding=!0;const t=document.getElementById("loader");t&&t.classList.add("show"),requestAnimationFrame(()=>requestAnimationFrame(()=>{this.flyingChunks.clear(),this.bigChunks.clear(),this.rubble.clear(),this.app.scene.remove(this.building.group),this.building.dispose(),this.spawnBuilding(),t&&t.classList.remove("show"),this.emptyTimer=-1,this.rebuilding=!1}))}buildLights(){const t=new Ba(14674687,12038308,1),e=new Yn(16774370,1.2);e.position.set(-30,55,40);const n=new Yn(13523504,.28);n.position.set(40,16,-25),this.app.scene.add(t,e,n);const i=new qr(this.app.renderer);this.app.scene.environment=i.fromScene(new Pu,.04).texture}makeGround(){const t=new It(new We(800,800),new tn({color:7314250}));return t.rotation.x=-Math.PI/2,t}bindRotateButton(t,e){const n=document.getElementById(t);if(!n)return;const i=o=>{o.preventDefault(),this.rotDir=e},s=()=>{this.rotDir===e&&(this.rotDir=0)};n.addEventListener("pointerdown",i),n.addEventListener("pointerup",s),n.addEventListener("pointerleave",s),n.addEventListener("pointercancel",s)}onDown=t=>{this.downX=t.clientX,this.downY=t.clientY,this.downT=performance.now()};onUp=t=>{if(t.button!==0||this.rebuilding)return;const e=t.target;if(e&&e.closest("a, button")||window.scrollY>window.innerHeight*.6||Math.hypot(t.clientX-this.downX,t.clientY-this.downY)>12||performance.now()-this.downT>500)return;const n=this.app.renderer.domElement.getBoundingClientRect();this.ndc.set((t.clientX-n.left)/n.width*2-1,-((t.clientY-n.top)/n.height)*2+1),this.ray.setFromCamera(this.ndc,this.app.camera);const i=this.ray.intersectObjects(this.building.cluster.surfaceMeshes(),!1)[0];if(!i)return;const s=i.point.clone(),o=this.app.camera.position;ia.subVectors(this.center,o).normalize(),sa.crossVectors(ia,My).normalize();const a=new A().subVectors(s,this.center),c=-sa.dot(a)>=0?1:-1,l=ia.clone().multiplyScalar(-1),h=this.center.y,u=new A().copy(s).addScaledVector(sa,-c*(16+Math.random()*14)).addScaledVector(l,14+Math.random()*10);u.y=2+Math.random()*Math.max(h-2,4),this.rockets.launch(u,s,d=>{this.controller.applyExplosion(d,my),this.shake=Math.min(this.shake+1.1,1.7)})};update=({dt:t,elapsed:e,camera:n})=>{this.controller.update(t),this.bigChunks.update(t,this.flyingChunks),this.flyingChunks.update(t),this.rebuilding||this.driveRubbleGravity(t),this.rubble.flushDirty(),this.hitFx.update(t),this.rockets.update(t),this.scenery.update(t),this.building.cluster.flushUploads(gy),!this.reduced&&!this.rebuilding&&this.driveRegen(t),this.driveCamera(t,e,n)};driveRubbleGravity(t){if(this.rubbleTimer+=t,this.rubbleForceTimer+=t,this.rubbleTimer<.1)return;this.rubbleTimer=0;const e=this.rubbleForceTimer>=.5;e&&(this.rubbleForceTimer=0);const n=this.rubble.collectUnsupported(3e3,e);n.length>0&&this.flyingChunks.spawn(n,n[0].worldPosition,.8,void 0,yy)}driveRegen(t){if(this.emptyTimer>=0){this.emptyTimer-=t,this.emptyTimer<=0&&this.rebuild();return}this.building.isDestroyed()&&(this.emptyTimer=_y)}driveCamera(t,e,n){this.orbit+=this.rotDir*vy*t;const i=window.innerWidth<=720,s=i?205:82,o=i?this.center.y+14:this.center.y+6,a=this.app.scene.fog;a&&(a.near=i?215:80,a.far=i?360:150);let c=0,l=0;if(this.shake>0){this.shake=Math.max(0,this.shake-t*2.2);const h=this.shake*this.shake;c=Math.sin(e*60)*h*1.4,l=Math.cos(e*71)*h*1.1}n.position.set(this.center.x+Math.sin(this.orbit)*s+c,o+l,this.center.z+Math.cos(this.orbit)*s),i?ra.set(this.center.x,this.center.y*2.62,this.center.z):ra.copy(this.center),n.lookAt(ra)}}const oo=[{code:"en",native:"English",flag:"🇬🇧"},{code:"pl",native:"Polski",flag:"🇵🇱"},{code:"zh",native:"中文",flag:"🇨🇳"},{code:"es",native:"Español",flag:"🇪🇸"},{code:"hi",native:"हिन्दी",flag:"🇮🇳"},{code:"ar",native:"العربية",flag:"🇸🇦",dir:"rtl"},{code:"fr",native:"Français",flag:"🇫🇷"},{code:"pt",native:"Português",flag:"🇧🇷"},{code:"ko",native:"한국어",flag:"🇰🇷"},{code:"ja",native:"日本語",flag:"🇯🇵"}],Mh={"nav.game":{en:"Game",pl:"Gra",zh:"游戏",es:"Juego",hi:"गेम",ar:"اللعبة",fr:"Jeu",pt:"Jogo",ko:"게임",ja:"ゲーム"},"nav.arsenal":{en:"Arsenal",pl:"Arsenał",zh:"武器库",es:"Arsenal",hi:"शस्त्रागार",ar:"الترسانة",fr:"Arsenal",pt:"Arsenal",ko:"무기고",ja:"武器庫"},"nav.full":{en:"Full game",pl:"Pełna gra",zh:"完整版",es:"Juego completo",hi:"पूरा गेम",ar:"اللعبة الكاملة",fr:"Jeu complet",pt:"Jogo completo",ko:"정식 버전",ja:"製品版"},"nav.studio":{en:"Studio",pl:"Studio",zh:"工作室",es:"Estudio",hi:"स्टूडियो",ar:"الاستوديو",fr:"Studio",pt:"Estúdio",ko:"스튜디오",ja:"スタジオ"},"nav.contact":{en:"Contact",pl:"Kontakt",zh:"联系",es:"Contacto",hi:"संपर्क",ar:"اتصل",fr:"Contact",pt:"Contato",ko:"연락처",ja:"お問い合わせ"},"hero.eyebrow":{en:"Voxel Destruction · Endstreet Studio",pl:"Voxel Destruction · Endstreet Studio",zh:"体素破坏 · Endstreet Studio",es:"Destrucción vóxel · Endstreet Studio",hi:"वॉक्सेल विध्वंस · Endstreet Studio",ar:"تدمير فوكسل · Endstreet Studio",fr:"Destruction voxel · Endstreet Studio",pt:"Destruição voxel · Endstreet Studio",ko:"복셀 파괴 · Endstreet Studio",ja:"ボクセル破壊 · Endstreet Studio"},"hero.title":{en:'Bring the city <span class="accent">down.</span>',pl:'Zrównaj miasto <span class="accent">z ziemią.</span>',zh:'把城市 <span class="accent">夷为平地。</span>',es:'Arrasa la ciudad <span class="accent">por completo.</span>',hi:'शहर को <span class="accent">ज़मीन पर ला दो।</span>',ar:'اهدم <span class="accent">المدينة بالكامل.</span>',fr:'Rasez la ville <span class="accent">entière.</span>',pt:'Ponha a cidade <span class="accent">abaixo.</span>',ko:'도시를 <span class="accent">무너뜨려라.</span>',ja:'街を <span class="accent">崩し尽くせ。</span>'},"hero.sub":{en:"It isn't scripted — it's real destruction physics. <strong>Aim with the mouse and click — a rocket flies.</strong>",pl:"To nie animacja — to prawdziwa fizyka destrukcji. <strong>Wyceluj myszką i kliknij — poleci rakieta.</strong>",zh:"这不是脚本动画，而是真实的破坏物理。<strong>用鼠标瞄准并点击——火箭就会射出。</strong>",es:"No es una animación: es física de destrucción real. <strong>Apunta con el ratón y haz clic: sale un cohete.</strong>",hi:"यह स्क्रिप्टेड नहीं है — यह असली विध्वंस भौतिकी है। <strong>माउस से निशाना लगाओ और क्लिक करो — रॉकेट छूटेगा।</strong>",ar:"ليست حركة مبرمجة — إنها فيزياء تدمير حقيقية. <strong>صوّب بالفأرة وانقر — ينطلق صاروخ.</strong>",fr:"Ce n'est pas scripté — c'est de la vraie physique de destruction. <strong>Visez à la souris et cliquez — une roquette part.</strong>",pt:"Não é animação — é física de destruição real. <strong>Mire com o mouse e clique — um foguete dispara.</strong>",ko:"스크립트가 아닙니다 — 진짜 파괴 물리입니다. <strong>마우스로 조준하고 클릭하면 로켓이 날아갑니다.</strong>",ja:"スクリプトではなく、本物の破壊物理です。<strong>マウスで狙ってクリック — ロケットが飛びます。</strong>"},"hero.cta1":{en:"Play now",pl:"Zagraj teraz",zh:"立即游玩",es:"Jugar ahora",hi:"अभी खेलें",ar:"العب الآن",fr:"Jouer",pt:"Jogar agora",ko:"지금 플레이",ja:"今すぐプレイ"},"hero.cta2":{en:"See the arsenal",pl:"Zobacz arsenał",zh:"查看武器库",es:"Ver el arsenal",hi:"शस्त्रागार देखें",ar:"شاهد الترسانة",fr:"Voir l'arsenal",pt:"Ver o arsenal",ko:"무기고 보기",ja:"武器庫を見る"},"hero.install":{en:"📲 Install on your phone",pl:"📲 Zainstaluj na telefonie",zh:"📲 安装到手机",es:"📲 Instalar en el móvil",hi:"📲 फ़ोन पर इंस्टॉल करें",ar:"📲 ثبّته على هاتفك",fr:"📲 Installer sur mobile",pt:"📲 Instalar no celular",ko:"📲 휴대폰에 설치",ja:"📲 スマホにインストール"},"hero.reset":{en:"⟳ Reset building",pl:"⟳ Reset budynku",zh:"⟳ 重置建筑",es:"⟳ Reiniciar edificio",hi:"⟳ इमारत रीसेट",ar:"⟳ إعادة المبنى",fr:"⟳ Réinitialiser",pt:"⟳ Reiniciar prédio",ko:"⟳ 건물 초기화",ja:"⟳ ビルをリセット"},"hero.rotate":{en:"rotate",pl:"obróć",zh:"旋转",es:"girar",hi:"घुमाएँ",ar:"دوران",fr:"pivoter",pt:"girar",ko:"회전",ja:"回転"},"hero.scroll":{en:"scroll ↓",pl:"przewiń ↓",zh:"向下滚动 ↓",es:"desplaza ↓",hi:"स्क्रॉल ↓",ar:"مرّر ↓",fr:"faites défiler ↓",pt:"role ↓",ko:"스크롤 ↓",ja:"スクロール ↓"},"game.kicker":{en:"The game",pl:"O grze",zh:"关于游戏",es:"El juego",hi:"गेम के बारे में",ar:"عن اللعبة",fr:"Le jeu",pt:"O jogo",ko:"게임 소개",ja:"ゲームについて"},"game.h2":{en:"Every building truly comes apart",pl:"Każdy budynek naprawdę leci w gruzy",zh:"每座建筑都真实地崩塌",es:"Cada edificio se desmorona de verdad",hi:"हर इमारत सचमुच टूट कर बिखरती है",ar:"كل مبنى ينهار فعلاً",fr:"Chaque bâtiment s'effondre pour de vrai",pt:"Cada prédio se despedaça de verdade",ko:"모든 건물이 진짜로 무너집니다",ja:"すべてのビルが本当に崩れる"},"game.lead":{en:"Voxpolia is a voxel destruction shooter. Knock out a load-bearing wall and everything above cascades down — section by section, all the way to the ground. No scripted animations: where you shoot is what matters.",pl:"Voxpolia to wokselowa strzelanka o destrukcji miasta. Wybij ścianę nośną, a wszystko nad nią runie kaskadą — sekcja po sekcji, aż na ziemię. Żadnych skryptowanych animacji: liczy się to, gdzie strzelisz.",zh:"Voxpolia 是一款体素破坏射击游戏。打掉一面承重墙，上方的一切就会层层坍塌，一直塌到地面。没有脚本动画：关键在于你打哪里。",es:"Voxpolia es un shooter de destrucción vóxel. Derriba un muro de carga y todo lo de encima cae en cascada, sección tras sección, hasta el suelo. Sin animaciones scriptadas: lo que importa es dónde disparas.",hi:"Voxpolia एक वॉक्सेल विध्वंस शूटर है। किसी भार वहन करने वाली दीवार को गिराओ और उसके ऊपर का सब कुछ खंड-दर-खंड ज़मीन तक ढह जाता है। कोई स्क्रिप्टेड एनिमेशन नहीं: मायने यह रखता है कि तुम कहाँ गोली मारते हो।",ar:"Voxpolia لعبة تصويب بتدمير فوكسل. أسقِط جداراً حاملاً وينهار كل ما فوقه تدريجياً — قسماً بعد قسم حتى الأرض. لا حركات مبرمجة: المهم أين تطلق النار.",fr:"Voxpolia est un shooter de destruction voxel. Détruisez un mur porteur et tout ce qui est au-dessus s'effondre en cascade, section par section, jusqu'au sol. Aucune animation scriptée : ce qui compte, c'est où vous tirez.",pt:"Voxpolia é um shooter de destruição voxel. Derrube uma parede de sustentação e tudo acima desaba em cascata — seção por seção, até o chão. Sem animações roteirizadas: o que importa é onde você atira.",ko:"Voxpolia는 복셀 파괴 슈터입니다. 내력벽을 무너뜨리면 그 위의 모든 것이 한 층씩 지면까지 붕괴합니다. 스크립트 애니메이션은 없습니다: 어디를 쏘느냐가 전부입니다.",ja:"Voxpolia はボクセル破壊シューターです。耐力壁を撃ち抜けば、その上のすべてが層ごとに地面まで崩れ落ちます。スクリプト演出はなし——どこを撃つかがすべてです。"},"game.f1":{en:"Destruction driven by a real structural model",pl:"Destrukcja oparta na realnym modelu konstrukcji",zh:"基于真实结构模型的破坏",es:"Destrucción basada en un modelo estructural real",hi:"असली संरचनात्मक मॉडल पर आधारित विध्वंस",ar:"تدمير مبني على نموذج إنشائي حقيقي",fr:"Destruction régie par un vrai modèle structurel",pt:"Destruição baseada em um modelo estrutural real",ko:"실제 구조 모델 기반 파괴",ja:"本物の構造モデルに基づく破壊"},"game.f2":{en:"A whole city to level",pl:"Całe miasto do zrównania z ziemią",zh:"整座城市任你夷平",es:"Una ciudad entera por arrasar",hi:"ढहाने के लिए पूरा शहर",ar:"مدينة كاملة لتسويتها بالأرض",fr:"Une ville entière à raser",pt:"Uma cidade inteira para arrasar",ko:"통째로 밀어버릴 도시",ja:"丸ごと更地にできる街"},"game.f3":{en:"An arsenal that changes how you destroy",pl:"Arsenał, który zmienia styl destrukcji",zh:"改变破坏方式的武器库",es:"Un arsenal que cambia tu forma de destruir",hi:"एक शस्त्रागार जो विध्वंस का अंदाज़ बदल दे",ar:"ترسانة تغيّر أسلوب تدميرك",fr:"Un arsenal qui change votre façon de détruire",pt:"Um arsenal que muda o seu jeito de destruir",ko:"파괴 방식을 바꾸는 무기고",ja:"破壊のスタイルを変える武器庫"},"game.f4":{en:"Play in the browser — no install",pl:"Graj w przeglądarce — bez instalacji",zh:"浏览器直玩，无需安装",es:"Juega en el navegador, sin instalar",hi:"ब्राउज़र में खेलो — कोई इंस्टॉल नहीं",ar:"العب في المتصفح — بلا تثبيت",fr:"Jouez dans le navigateur, sans installation",pt:"Jogue no navegador — sem instalar",ko:"브라우저에서 바로 — 설치 불필요",ja:"ブラウザで即プレイ——インストール不要"},"game.play":{en:"▶ Play now — free",pl:"▶ Zagraj za darmo",zh:"▶ 立即免费游玩",es:"▶ Juega gratis",hi:"▶ मुफ़्त खेलें",ar:"▶ العب مجاناً",fr:"▶ Jouer gratuitement",pt:"▶ Jogar de graça",ko:"▶ 무료로 플레이",ja:"▶ 無料でプレイ"},"game.playnote":{en:"In the browser, no install",pl:"W przeglądarce, bez instalacji",zh:"浏览器内运行，无需安装",es:"En el navegador, sin instalar",hi:"ब्राउज़र में, बिना इंस्टॉल",ar:"في المتصفح، بلا تثبيت",fr:"Dans le navigateur, sans installation",pt:"No navegador, sem instalar",ko:"브라우저에서, 설치 없이",ja:"ブラウザで、インストール不要"},"cs.live":{en:"live",pl:"na żywo",zh:"实时",es:"en vivo",hi:"लाइव",ar:"مباشر",fr:"en direct",pt:"ao vivo",ko:"실시간",ja:"ライブ"},"cs.bazooka":{en:"Bazooka",pl:"Bazooka",zh:"Bazooka",es:"Bazooka",hi:"Bazooka",ar:"Bazooka",fr:"Bazooka",pt:"Bazooka",ko:"Bazooka",ja:"Bazooka"},"cs.gatling":{en:"Gatling",pl:"Działko",zh:"Gatling",es:"Gatling",hi:"Gatling",ar:"Gatling",fr:"Gatling",pt:"Gatling",ko:"Gatling",ja:"Gatling"},"cs.c4":{en:"C4",pl:"C4",zh:"C4",es:"C4",hi:"C4",ar:"C4",fr:"C4",pt:"C4",ko:"C4",ja:"C4"},"cs.caption":{en:"Same tower, three weapons — three different ways down.",pl:"Ten sam budynek, trzy bronie — trzy różne efekty destrukcji.",zh:"同一座楼，三种武器——三种不同的崩塌。",es:"La misma torre, tres armas: tres formas distintas de caer.",hi:"वही इमारत, तीन हथियार — गिरने के तीन अलग तरीके।",ar:"نفس البرج، ثلاثة أسلحة — ثلاث طرق مختلفة للانهيار.",fr:"La même tour, trois armes — trois effondrements différents.",pt:"A mesma torre, três armas — três quedas diferentes.",ko:"같은 건물, 세 가지 무기 — 세 가지 붕괴 방식.",ja:"同じビル、3つの武器——3通りの崩れ方。"},"arsenal.kicker":{en:"Arsenal",pl:"Arsenał",zh:"武器库",es:"Arsenal",hi:"शस्त्रागार",ar:"الترسانة",fr:"Arsenal",pt:"Arsenal",ko:"무기고",ja:"武器庫"},"arsenal.h2":{en:"Tools of destruction",pl:"Narzędzia destrukcji",zh:"破坏工具",es:"Herramientas de destrucción",hi:"विध्वंस के औज़ार",ar:"أدوات التدمير",fr:"Outils de destruction",pt:"Ferramentas de destruição",ko:"파괴의 도구",ja:"破壊の道具"},"arsenal.lead":{en:"Three tools, each with its own style. Upgrade them mid-run and watch the scale of destruction grow.",pl:"Trzy narzędzia, każde z własnym stylem. Ulepszaj je w trakcie gry i patrz, jak rośnie skala destrukcji.",zh:"三种工具，各有风格。在游戏中升级它们，见证破坏规模不断升级。",es:"Tres herramientas, cada una con su estilo. Mejóralas durante la partida y ve cómo crece la destrucción.",hi:"तीन औज़ार, हर एक का अपना अंदाज़। खेल के दौरान इन्हें अपग्रेड करो और विध्वंस का पैमाना बढ़ते देखो।",ar:"ثلاث أدوات، لكلٍّ أسلوبها. طوّرها أثناء اللعب وشاهد حجم التدمير يتضاعف.",fr:"Trois outils, chacun avec son style. Améliorez-les en cours de partie et voyez la destruction monter en puissance.",pt:"Três ferramentas, cada uma com seu estilo. Melhore-as durante a partida e veja a escala da destruição crescer.",ko:"세 가지 도구, 각각의 스타일. 플레이 중에 업그레이드하며 파괴 규모가 커지는 것을 지켜보세요.",ja:"3つの道具、それぞれのスタイル。プレイ中に強化して、破壊の規模が増していくのを見届けよう。"},"wpn.bazooka.name":{en:"Bazooka",pl:"Bazooka",zh:"Bazooka",es:"Bazooka",hi:"Bazooka",ar:"Bazooka",fr:"Bazooka",pt:"Bazooka",ko:"Bazooka",ja:"Bazooka"},"wpn.bazooka.tier":{en:"Tiers 1–3",pl:"Poziomy 1–3",zh:"等级 1–3",es:"Niveles 1–3",hi:"स्तर 1–3",ar:"المستويات ١–٣",fr:"Niveaux 1–3",pt:"Níveis 1–3",ko:"등급 1–3",ja:"ティア 1–3"},"wpn.bazooka.desc":{en:"One shell, one huge crater. Higher tiers mean a wider radius and a stronger shockwave. The backbone of every teardown.",pl:"Pojedynczy pocisk, ogromny krater. Wyższe poziomy = większy promień i mocniejsza fala uderzeniowa. Podstawa każdej destrukcji.",zh:"一发炮弹，一个巨坑。等级越高，范围越大、冲击波越强。每次拆楼的中坚力量。",es:"Un proyectil, un cráter enorme. Los niveles altos amplían el radio y refuerzan la onda expansiva. La base de toda demolición.",hi:"एक गोला, एक विशाल गड्ढा। ऊँचे स्तर यानी बड़ा दायरा और तेज़ शॉकवेव। हर विध्वंस की रीढ़।",ar:"قذيفة واحدة، حفرة هائلة. المستويات الأعلى تعني نطاقاً أوسع وموجة صدمة أقوى. عماد كل عملية هدم.",fr:"Un obus, un cratère énorme. Les niveaux supérieurs élargissent le rayon et renforcent le souffle. La base de toute démolition.",pt:"Um projétil, uma cratera enorme. Níveis maiores ampliam o raio e reforçam a onda de choque. A base de toda demolição.",ko:"한 발, 거대한 크레이터. 등급이 높을수록 반경이 넓고 충격파가 강해집니다. 모든 파괴의 기본기.",ja:"一発で巨大なクレーター。ティアが上がるほど範囲は広く、衝撃波は強く。あらゆる解体の基本。"},"wpn.gatling.name":{en:"Gatling",pl:"Gatling",zh:"Gatling",es:"Gatling",hi:"Gatling",ar:"Gatling",fr:"Gatling",pt:"Gatling",ko:"Gatling",ja:"Gatling"},"wpn.gatling.tier":{en:"Tiers 1–3",pl:"Poziomy 1–3",zh:"等级 1–3",es:"Niveles 1–3",hi:"स्तर 1–3",ar:"المستويات ١–٣",fr:"Niveaux 1–3",pt:"Níveis 1–3",ko:"등급 1–3",ja:"ティア 1–3"},"wpn.gatling.desc":{en:"A hail of rounds that chews through structure metre by metre. Hold fire on a single floor and the tower folds like a house of cards.",pl:"Grad pocisków, który wygryza konstrukcję metr po metrze. Utrzymaj ogień na jednej kondygnacji, a wieża złoży się jak domek z kart.",zh:"弹雨逐米啃穿结构。对准一层持续开火，整座楼便像纸牌屋一样坍塌。",es:"Una lluvia de balas que devora la estructura metro a metro. Mantén el fuego en una planta y la torre se derrumba como un castillo de naipes.",hi:"गोलियों की बौछार जो ढाँचे को मीटर-दर-मीटर चबा जाती है। एक ही मंज़िल पर फ़ायर बनाए रखो और इमारत ताश के महल की तरह ढह जाती है।",ar:"وابل من الطلقات يقضم البنية متراً بمتر. ثبّت النار على طابق واحد فينهار البرج كبيت من ورق.",fr:"Une pluie de balles qui ronge la structure mètre par mètre. Concentrez le tir sur un étage et la tour s'écroule comme un château de cartes.",pt:"Uma saraivada de balas que corrói a estrutura metro a metro. Mantenha o fogo em um andar e a torre desaba como um castelo de cartas.",ko:"구조물을 미터 단위로 갉아먹는 총알 세례. 한 층에 집중 사격하면 건물이 카드탑처럼 무너집니다.",ja:"構造を1メートルずつ削り取る弾幕。1つの階に撃ち続ければ、ビルはトランプの城のように崩れる。"},"wpn.c4.name":{en:"C4",pl:"C4",zh:"C4",es:"C4",hi:"C4",ar:"C4",fr:"C4",pt:"C4",ko:"C4",ja:"C4"},"wpn.c4.tier":{en:"Tiers 1–3",pl:"Poziomy 1–3",zh:"等级 1–3",es:"Niveles 1–3",hi:"स्तर 1–3",ar:"المستويات ١–٣",fr:"Niveaux 1–3",pt:"Níveis 1–3",ko:"등급 1–3",ja:"ティア 1–3"},"wpn.c4.desc":{en:"Plant the charge exactly where you want and blow it at the perfect moment. Controlled demolition for those who like precision.",pl:"Podłóż ładunek dokładnie tam, gdzie chcesz, i odpal w idealnym momencie. Kontrolowana rozbiórka dla tych, którzy lubią precyzję.",zh:"把炸药精确布置在你想要的位置，在完美时机引爆。为追求精准的人准备的定向爆破。",es:"Coloca la carga justo donde quieras y detónala en el momento perfecto. Demolición controlada para los que aman la precisión.",hi:"चार्ज को ठीक वहीं लगाओ जहाँ चाहो और सही पल पर उड़ा दो। सटीकता पसंद करने वालों के लिए नियंत्रित विध्वंस।",ar:"ازرع الشحنة في المكان الذي تريده تماماً وفجّرها في اللحظة المثالية. هدم موجّه لمن يحبون الدقة.",fr:"Placez la charge exactement où vous voulez et déclenchez-la au moment parfait. Démolition contrôlée pour les amateurs de précision.",pt:"Posicione a carga exatamente onde quiser e detone no momento perfeito. Demolição controlada para quem gosta de precisão.",ko:"원하는 위치에 정확히 설치하고 완벽한 순간에 터뜨리세요. 정밀함을 즐기는 이를 위한 계획 폭파.",ja:"狙った場所に正確に仕掛け、絶妙なタイミングで起爆。精密さを好む人のための制御解体。"},"wpn.mystery.tier":{en:"🔒 Hidden weapon",pl:"🔒 Broń ukryta",zh:"🔒 隐藏武器",es:"🔒 Arma oculta",hi:"🔒 छिपा हथियार",ar:"🔒 سلاح مخفي",fr:"🔒 Arme cachée",pt:"🔒 Arma secreta",ko:"🔒 히든 무기",ja:"🔒 隠し武器"},"wpn.mystery.name":{en:"???",pl:"???",zh:"???",es:"???",hi:"???",ar:"؟؟؟",fr:"???",pt:"???",ko:"???",ja:"???"},"wpn.mystery.desc":{en:"A hidden reward — its power is a surprise. Unlock it by destroying 60% of the city. With the bazooka, gatling and C4 maxed out, 40% is enough.",pl:"Ukryta nagroda — jej moc to niespodzianka. Odblokujesz ją, gdy zniszczysz 60% miasta. A z bazooką, działkiem i C4 na maksymalnym poziomie wystarczy 40%.",zh:"隐藏奖励——它的威力是个惊喜。摧毁全城的 60% 即可解锁。若 Bazooka、Gatling 与 C4 都已满级，40% 就够了。",es:"Una recompensa oculta: su poder es una sorpresa. Desbloquéala destruyendo el 60% de la ciudad. Con la bazooka, la gatling y el C4 al máximo, basta con el 40%.",hi:"एक छिपा इनाम — इसकी ताक़त एक सरप्राइज़ है। शहर का 60% नष्ट करके इसे अनलॉक करो। Bazooka, Gatling और C4 पूरे स्तर पर हों तो 40% ही काफ़ी है।",ar:"مكافأة مخفية — قوّتها مفاجأة. افتحها بتدمير ٦٠٪ من المدينة. وإذا كانت Bazooka وGatling وC4 بأقصى مستوى، يكفي ٤٠٪.",fr:"Une récompense cachée — sa puissance est une surprise. Débloquez-la en détruisant 60 % de la ville. Avec la bazooka, la gatling et le C4 au max, 40 % suffisent.",pt:"Uma recompensa secreta — o poder dela é surpresa. Desbloqueie destruindo 60% da cidade. Com bazooka, gatling e C4 no máximo, 40% já bastam.",ko:"숨겨진 보상 — 그 위력은 비밀입니다. 도시의 60%를 파괴하면 해금됩니다. 바주카·개틀링·C4를 모두 최대로 올리면 40%면 충분합니다.",ja:"隠された報酬——その威力はお楽しみ。街の60%を破壊で解放。Bazooka・Gatling・C4 をすべて最大にすれば40%で十分。"},"wpn.drag":{en:"drag to rotate",pl:"przeciągnij, aby obrócić",zh:"拖动以旋转",es:"arrastra para girar",hi:"घुमाने के लिए खींचें",ar:"اسحب للتدوير",fr:"faites glisser pour tourner",pt:"arraste para girar",ko:"드래그하여 회전",ja:"ドラッグで回転"},"stat.power":{en:"Power",pl:"Siła",zh:"威力",es:"Potencia",hi:"शक्ति",ar:"القوة",fr:"Puissance",pt:"Potência",ko:"위력",ja:"威力"},"stat.radius":{en:"Radius",pl:"Promień",zh:"范围",es:"Radio",hi:"दायरा",ar:"النطاق",fr:"Rayon",pt:"Raio",ko:"반경",ja:"範囲"},"stat.rate":{en:"Fire rate",pl:"Tempo ognia",zh:"射速",es:"Cadencia",hi:"फ़ायर दर",ar:"معدل الإطلاق",fr:"Cadence",pt:"Cadência",ko:"연사력",ja:"連射速度"},"stat.precision":{en:"Precision",pl:"Precyzja",zh:"精度",es:"Precisión",hi:"सटीकता",ar:"الدقة",fr:"Précision",pt:"Precisão",ko:"정밀도",ja:"精度"},"full.kicker":{en:"In the full game",pl:"W pełnej grze",zh:"完整版中",es:"En el juego completo",hi:"पूरे गेम में",ar:"في اللعبة الكاملة",fr:"Dans le jeu complet",pt:"No jogo completo",ko:"정식 버전에서는",ja:"製品版では"},"full.h2":{en:"Just the first district",pl:"To dopiero pierwsza dzielnica",zh:"这只是第一个街区",es:"Solo el primer distrito",hi:"यह तो बस पहला इलाक़ा है",ar:"مجرد الحيّ الأول",fr:"Ce n'est que le premier quartier",pt:"Apenas o primeiro bairro",ko:"이건 첫 번째 구역일 뿐",ja:"これはまだ最初の地区"},"full.lead":{en:"What you destroy now is a slice of the Voxpolia world. Here is what we are building toward launch.",pl:"To, co niszczysz teraz, to wycinek świata Voxpolii. Oto, co szykujemy na premierę.",zh:"你现在破坏的只是 Voxpolia 世界的一角。这是我们正为正式版打造的内容。",es:"Lo que destruyes ahora es una parte del mundo de Voxpolia. Esto es lo que preparamos para el lanzamiento.",hi:"तुम अभी जो नष्ट कर रहे हो, वह Voxpolia की दुनिया का एक हिस्सा है। लॉन्च के लिए हम यह तैयार कर रहे हैं।",ar:"ما تدمّره الآن هو جزء من عالم Voxpolia. وهذا ما نجهّزه للإطلاق.",fr:"Ce que vous détruisez ici est un fragment du monde de Voxpolia. Voici ce que nous préparons pour la sortie.",pt:"O que você destrói agora é uma fatia do mundo de Voxpolia. Veja o que estamos preparando para o lançamento.",ko:"지금 파괴하는 건 Voxpolia 세계의 일부일 뿐입니다. 정식 출시를 위해 준비 중인 것들을 소개합니다.",ja:"今あなたが壊しているのは Voxpolia の世界のほんの一部。ローンチに向けて用意しているものを紹介します。"},"full.i1.t":{en:"A whole city",pl:"Całe miasto",zh:"整座城市",es:"Una ciudad entera",hi:"पूरा शहर",ar:"مدينة كاملة",fr:"Une ville entière",pt:"Uma cidade inteira",ko:"도시 전체",ja:"街まるごと"},"full.i1.d":{en:"More districts, each with its own silhouette and way to fall — and so much more.",pl:"Kolejne dzielnice, każda z własną sylwetką i sposobem na destrukcję — i o wiele, wiele więcej.",zh:"更多街区，每个都有独特的轮廓和坍塌方式——以及远不止于此。",es:"Más distritos, cada uno con su silueta y su forma de caer, y mucho, mucho más.",hi:"और भी इलाक़े, हर एक की अपनी बनावट और गिरने का अंदाज़ — और भी बहुत कुछ।",ar:"أحياء أخرى، لكلٍّ ملامحه وطريقته في الانهيار — وأكثر من ذلك بكثير.",fr:"Davantage de quartiers, chacun avec sa silhouette et sa façon de tomber — et bien plus encore.",pt:"Mais bairros, cada um com sua silhueta e seu jeito de cair — e muito, muito mais.",ko:"더 많은 구역, 각기 다른 실루엣과 붕괴 방식 — 그리고 훨씬 더 많은 것들.",ja:"さらなる地区、それぞれ独自のシルエットと崩れ方——そしてもっとたくさん。"},"full.i2.t":{en:"More weapons",pl:"Więcej broni",zh:"更多武器",es:"Más armas",hi:"और हथियार",ar:"أسلحة أكثر",fr:"Plus d'armes",pt:"Mais armas",ko:"더 많은 무기",ja:"さらなる武器"},"full.i2.d":{en:"New tools of destruction and a heavier arsenal, going well beyond what you play now.",pl:"Nowe narzędzia zniszczenia i cięższy arsenał, wykraczający daleko poza to, co grasz teraz.",zh:"全新的破坏工具与更重型的武器库，远超你现在所玩的内容。",es:"Nuevas herramientas de destrucción y un arsenal más pesado, mucho más allá de lo que juegas ahora.",hi:"विध्वंस के नए औज़ार और भारी शस्त्रागार, जो अभी तुम जो खेल रहे हो उससे कहीं आगे है।",ar:"أدوات تدمير جديدة وترسانة أثقل، تتجاوز بكثير ما تلعبه الآن.",fr:"De nouveaux outils de destruction et un arsenal plus lourd, bien au-delà de ce que vous jouez aujourd'hui.",pt:"Novas ferramentas de destruição e um arsenal mais pesado, muito além do que você joga agora.",ko:"새로운 파괴 도구와 더 강력한 무기고 — 지금 플레이하는 것을 훨씬 뛰어넘습니다.",ja:"新たな破壊の道具と、より重厚な武器庫。いま遊べる範囲をはるかに超えて。"},"full.i3.t":{en:"Vehicles",pl:"Pojazdy",zh:"载具",es:"Vehículos",hi:"वाहन",ar:"المركبات",fr:"Véhicules",pt:"Veículos",ko:"차량",ja:"乗り物"},"full.i3.d":{en:"Get behind the wheel of destructible cars and drive into the city — ramming is a demolition tool too.",pl:"Wsiądź za kierownicę niszczalnych aut i wjedź w miasto — taran to też narzędzie destrukcji.",zh:"坐上可破坏的汽车，直接冲进城市——撞击也是一种破坏手段。",es:"Ponte al volante de coches destructibles y embiste la ciudad: chocar también es una herramienta de demolición.",hi:"नष्ट होने वाली गाड़ियों का स्टीयरिंग थामो और शहर में घुस जाओ — टक्कर मारना भी विध्वंस का ज़रिया है।",ar:"اجلس خلف مقود سيارات قابلة للتدمير واقتحم المدينة — الاصطدام أيضاً أداة هدم.",fr:"Prenez le volant de voitures destructibles et foncez dans la ville — le bélier est aussi un outil de démolition.",pt:"Assuma o volante de carros destrutíveis e avance pela cidade — atropelar também é ferramenta de demolição.",ko:"부서지는 차량의 운전대를 잡고 도시로 돌진하세요 — 들이받는 것도 훌륭한 파괴 수단입니다.",ja:"壊せる車のハンドルを握り、街へ突っ込め——体当たりも立派な破壊手段。"},"full.i4.t":{en:"Challenges & goals",pl:"Wyzwania i cele",zh:"挑战与目标",es:"Retos y objetivos",hi:"चुनौतियाँ और लक्ष्य",ar:"تحديات وأهداف",fr:"Défis et objectifs",pt:"Desafios e metas",ko:"도전과 목표",ja:"チャレンジと目標"},"full.i4.d":{en:"Timed rounds, destruction objectives and a score for style — a reason to come back and destroy better.",pl:"Rundy na czas, cele do zniszczenia i wynik za styl — powód, by wracać i niszczyć lepiej.",zh:"限时回合、破坏目标，以及为风格打分——让你不断回来、破坏得更漂亮的理由。",es:"Rondas contrarreloj, objetivos de destrucción y puntos por estilo: un motivo para volver y destruir mejor.",hi:"समयबद्ध राउंड, विध्वंस के लक्ष्य और स्टाइल के लिए स्कोर — बार-बार लौटकर और बेहतर तबाही मचाने की वजह।",ar:"جولات موقوتة، وأهداف تدمير، ونقاط على الأسلوب — سبب للعودة والتدمير بشكل أفضل.",fr:"Manches chronométrées, objectifs de destruction et score de style — une raison de revenir et de mieux détruire.",pt:"Rodadas cronometradas, objetivos de destruição e pontos por estilo — um motivo para voltar e destruir melhor.",ko:"제한 시간 라운드, 파괴 목표, 그리고 스타일 점수 — 다시 돌아와 더 멋지게 부술 이유.",ja:"タイム制ラウンド、破壊目標、そしてスタイルによるスコア——また戻ってもっと上手く壊したくなる。"},"studio.kicker":{en:"Studio",pl:"Studio",zh:"工作室",es:"Estudio",hi:"स्टूडियो",ar:"الاستوديو",fr:"Studio",pt:"Estúdio",ko:"스튜디오",ja:"スタジオ"},"studio.h2":{en:"Who makes it",pl:"Kto to robi",zh:"幕后团队",es:"Quién lo hace",hi:"इसे कौन बनाता है",ar:"من يصنعها",fr:"Qui le fait",pt:"Quem faz",ko:"만드는 사람",ja:"制作者"},"studio.body":{en:"<strong>Endstreet Studio</strong> is one person and one obsession: destruction that's real, not a canned animation.",pl:"<strong>Endstreet Studio</strong> to jedna osoba i jedna obsesja: destrukcja ma być prawdziwa, a nie gotowa animacja.",zh:"<strong>Endstreet Studio</strong> 是一个人和一个执念：破坏必须是真实的，而不是预设动画。",es:"<strong>Endstreet Studio</strong> es una persona y una obsesión: destrucción real, no una animación enlatada.",hi:"<strong>Endstreet Studio</strong> एक इंसान और एक जुनून है: विध्वंस असली हो, कोई बनी-बनाई एनिमेशन नहीं।",ar:"<strong>Endstreet Studio</strong> شخص واحد وهوسٌ واحد: تدمير حقيقي لا مجرد حركة معلّبة.",fr:"<strong>Endstreet Studio</strong>, c'est une personne et une obsession : une destruction réelle, pas une animation préfabriquée.",pt:"<strong>Endstreet Studio</strong> é uma pessoa e uma obsessão: destruição real, não uma animação enlatada.",ko:"<strong>Endstreet Studio</strong>는 한 사람과 하나의 집착입니다: 미리 만든 애니메이션이 아니라 진짜 파괴.",ja:"<strong>Endstreet Studio</strong> は一人と一つの執念です。作り物のアニメではなく、本物の破壊を。"},"studio.body2":{en:"The code, the custom physics, every weapon and building model — all hand-built here, voxel by voxel, from scratch. No off-the-shelf engine, no scripted animations, and a game you launch straight in the browser. This is only the first district — a whole city lies ahead.",pl:"Kod, autorska fizyka, każdy model broni i budynku — wszystko robione tu ręcznie, woksel po wokselu, od zera. Bez gotowego silnika, bez skryptowanych animacji, a gra odpalana wprost w przeglądarce. To dopiero pierwsza dzielnica — przede mną całe miasto.",zh:"代码、自研物理、每一件武器和建筑模型——全都在这里手工打造，逐个体素、从零开始。没有现成引擎，没有脚本动画，游戏可直接在浏览器里运行。这只是第一个街区——前方是一整座城市。",es:"El código, la física propia, cada modelo de arma y edificio — todo hecho a mano aquí, vóxel a vóxel, desde cero. Sin motor prefabricado, sin animaciones guionizadas, y un juego que abres directamente en el navegador. Esto es solo el primer distrito — por delante queda una ciudad entera.",hi:"कोड, अपनी भौतिकी, हर हथियार और इमारत का मॉडल — सब यहीं हाथ से बना, वॉक्सेल-दर-वॉक्सेल, शुरू से। कोई तैयार इंजन नहीं, कोई स्क्रिप्टेड एनिमेशन नहीं, और गेम जिसे सीधे ब्राउज़र में चलाते हो। यह तो बस पहला इलाक़ा है — आगे पूरा शहर बाक़ी है।",ar:"الكود، والفيزياء الخاصة، وكل نموذج سلاح ومبنى — كلها مصنوعة هنا يدوياً، فوكسل تلو الآخر، من الصفر. لا محرّك جاهز، ولا حركات مبرمَجة، ولعبة تشغّلها مباشرة في المتصفح. هذا مجرد الحيّ الأول — وأمامي مدينة كاملة.",fr:"Le code, la physique maison, chaque modèle d'arme et de bâtiment — tout est fait main ici, voxel par voxel, à partir de zéro. Sans moteur tout fait, sans animations scriptées, et un jeu que l'on lance directement dans le navigateur. Ce n'est que le premier quartier — une ville entière m'attend.",pt:"O código, a física própria, cada modelo de arma e prédio — tudo feito à mão aqui, voxel a voxel, do zero. Sem motor pronto, sem animações roteirizadas, e um jogo que você abre direto no navegador. Este é só o primeiro bairro — uma cidade inteira está por vir.",ko:"코드, 직접 만든 물리, 모든 무기와 건물 모델까지 — 전부 여기서 손으로, 복셀 단위로, 처음부터 만들었습니다. 기성 엔진도, 스크립트 애니메이션도 없이, 브라우저에서 바로 실행하는 게임. 이건 첫 번째 구역일 뿐 — 앞으로 도시 전체가 남아 있습니다.",ja:"コードも独自の物理も、あらゆる武器とビルのモデルも——すべてここで手作業、ボクセル単位で、一から。既製エンジンもスクリプト演出もなし、ブラウザで直接動くゲーム。これはまだ最初の地区——この先には街まるごとが待っています。"},"studio.sign":{en:"— Daniel, Endstreet",pl:"— Daniel, Endstreet",zh:"— Daniel，Endstreet",es:"— Daniel, Endstreet",hi:"— Daniel, Endstreet",ar:"— Daniel، Endstreet",fr:"— Daniel, Endstreet",pt:"— Daniel, Endstreet",ko:"— Daniel, Endstreet",ja:"— Daniel, Endstreet"},"contact.kicker":{en:"Contact",pl:"Kontakt",zh:"联系",es:"Contacto",hi:"संपर्क",ar:"اتصل",fr:"Contact",pt:"Contato",ko:"연락처",ja:"お問い合わせ"},"contact.h2":{en:"Follow Voxpolia",pl:"Śledź Voxpolię",zh:"关注 Voxpolia",es:"Sigue a Voxpolia",hi:"Voxpolia को फ़ॉलो करें",ar:"تابع Voxpolia",fr:"Suivez Voxpolia",pt:"Siga a Voxpolia",ko:"Voxpolia 팔로우",ja:"Voxpolia をフォロー"},"contact.note":{en:"Playable in the browser now. Store links go live at launch.",pl:"Grasz teraz w przeglądarce. Linki do sklepów podłączymy przy premierze.",zh:"现在即可在浏览器中游玩。商店链接将在正式版上线时开放。",es:"Ya se puede jugar en el navegador. Los enlaces a las tiendas se activarán en el lanzamiento.",hi:"अभी ब्राउज़र में खेल सकते हो। स्टोर लिंक लॉन्च पर लाइव होंगे।",ar:"يمكن اللعب في المتصفح الآن. روابط المتاجر ستُفعّل عند الإطلاق.",fr:"Jouable dans le navigateur dès maintenant. Les liens vers les boutiques arriveront à la sortie.",pt:"Já dá para jogar no navegador. Os links das lojas entram no ar no lançamento.",ko:"지금 브라우저에서 플레이할 수 있습니다. 스토어 링크는 출시와 함께 공개됩니다.",ja:"今すぐブラウザでプレイ可能。ストアリンクはローンチ時に公開します。"},"aria.rotLeft":{en:"Rotate building left",pl:"Obróć budynek w lewo",zh:"向左旋转建筑",es:"Girar edificio a la izquierda",hi:"इमारत बाएँ घुमाएँ",ar:"أدر المبنى يساراً",fr:"Pivoter le bâtiment à gauche",pt:"Girar prédio à esquerda",ko:"건물 왼쪽으로 회전",ja:"ビルを左に回転"},"aria.rotRight":{en:"Rotate building right",pl:"Obróć budynek w prawo",zh:"向右旋转建筑",es:"Girar edificio a la derecha",hi:"इमारत दाएँ घुमाएँ",ar:"أدر المبنى يميناً",fr:"Pivoter le bâtiment à droite",pt:"Girar prédio à direita",ko:"건물 오른쪽으로 회전",ja:"ビルを右に回転"}},Nu="es11-lang",by=oo.map(r=>r.code);function Sh(r){return r!=null&&by.includes(r)}function Ey(){try{const t=localStorage.getItem(Nu);if(Sh(t))return t}catch{}const r=navigator.language?.toLowerCase().slice(0,2)??"";return Sh(r)?r:"en"}let Fr="en";function oa(r,t){return r[t]??r.en}function zu(r){Fr=r;const t=oo.find(e=>e.code===r);document.documentElement.lang=r,document.documentElement.dir=t?.dir??"ltr";for(const e of document.querySelectorAll("[data-i18n]")){const n=Mh[e.dataset.i18n];n&&(e.hasAttribute("data-i18n-html")?e.innerHTML=oa(n,r):e.textContent=oa(n,r))}for(const e of document.querySelectorAll("[data-i18n-aria]")){const n=Mh[e.dataset.i18nAria];n&&e.setAttribute("aria-label",oa(n,r))}Ay();try{localStorage.setItem(Nu,r)}catch{}}let Ea=null;function Ay(){const r=oo.find(t=>t.code===Fr);Ea&&r&&(Ea.querySelector(".lang-cur").textContent=`${r.flag} ${Fr.toUpperCase()}`);for(const t of document.querySelectorAll(".lang-item"))t.setAttribute("aria-current",t.dataset.lang===Fr?"true":"false")}function Ty(){const r=document.getElementById("lang-switch");if(!r)return;r.replaceChildren();const t=document.createElement("button");t.type="button",t.className="lang-btn",t.setAttribute("aria-haspopup","true"),t.setAttribute("aria-expanded","false"),t.innerHTML='<span class="lang-cur"></span><span class="lang-caret">▾</span>';const e=document.createElement("div");e.className="lang-menu",e.setAttribute("role","menu");for(const s of oo){const o=document.createElement("button");o.type="button",o.className="lang-item",o.dataset.lang=s.code,o.setAttribute("role","menuitem"),o.innerHTML=`<span class="lang-flag">${s.flag}</span> ${s.native}`,o.addEventListener("click",()=>{zu(s.code),i()}),e.appendChild(o)}const n=()=>{r.classList.add("open"),t.setAttribute("aria-expanded","true")},i=()=>{r.classList.remove("open"),t.setAttribute("aria-expanded","false")};t.addEventListener("click",s=>{s.stopPropagation(),r.classList.contains("open")?i():n()}),document.addEventListener("click",s=>{r.contains(s.target)||i()}),document.addEventListener("keydown",s=>{s.key==="Escape"&&i()}),r.append(t,e),Ea=t}function wy(){Ty(),zu(Ey())}const Ry=.35,Cy=Math.PI/2+.15,bh=.01,Py=.35,Ly=2.5;class Iy{constructor(t,e,n){this.canvas=t,this.fixedRadius=n?.fixedRadius??null,this.fixedY=n?.fixedY??.09,this.silhouette=n?.silhouette??!1,this.renderer=new Na({canvas:t,antialias:!0,alpha:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.outputColorSpace=ve,this.renderer.toneMapping=Nh,this.renderer.toneMappingExposure=1.05,this.scene.background=null;const i=new qr(this.renderer);this.scene.environment=i.fromScene(new Pu,.04).texture,this.scene.add(new Ba(16777215,13619926,.7));const s=new Yn(16777215,2.4);s.position.set(4,6,5);const o=new Yn(11193599,.5);o.position.set(-5,2,-3);const a=new Yn(16777215,1);a.position.set(-3,4,-6),this.scene.add(s,o,a),this.camera=new ye(38,1,.01,100),this.bindPointer(),this.resize(),new ResizeObserver(()=>this.resize()).observe(t),new IntersectionObserver(c=>{this.visible=c[0].isIntersecting,this.visible?this.start():this.stop()},{threshold:.05}).observe(t),this.load(e)}renderer;scene=new so;camera;target=new A;radius=4;az=Math.PI*.15;pol=Math.PI*.42;dragging=!1;idleTimer=0;lastPX=0;lastPY=0;visible=!1;running=!1;prevT=0;currentModel=null;currentShadow=null;currentUrl="";fixedRadius;fixedY;silhouette;async load(t){if(t!==this.currentUrl){this.currentUrl=t;try{const e=await new Iu().loadAsync(t);if(t!==this.currentUrl)return;this.clearModel();const n=e.scene,i=new en().setFromObject(n),s=i.getSize(new A),o=i.getCenter(new A);if(n.position.sub(o),n.position.y+=s.y/2,this.silhouette){const a=new ue({color:1315344});n.traverse(c=>{const l=c;l.isMesh&&(l.material=a)})}this.scene.add(n),this.currentModel=n,this.fixedRadius!=null?(this.target.set(0,this.fixedY,0),this.radius=this.fixedRadius):(this.target.set(0,s.y*.5,0),this.radius=Math.max(s.x,s.y,s.z)*2.1||4),this.currentShadow=this.makeContactShadow(Math.max(s.x,s.z)*.9),this.scene.add(this.currentShadow),this.renderOnce()}catch(e){console.error("[weaponViewer] load failed",t,e)}}}clearModel(){this.currentModel&&(this.scene.remove(this.currentModel),this.currentModel.traverse(t=>{const e=t;e.geometry&&e.geometry.dispose();const n=e.material;Array.isArray(n)?n.forEach(i=>i.dispose()):n?.dispose()}),this.currentModel=null),this.currentShadow&&(this.scene.remove(this.currentShadow),this.currentShadow.geometry.dispose(),this.currentShadow.material.dispose(),this.currentShadow=null)}makeContactShadow(t){const e=document.createElement("canvas");e.width=e.height=128;const n=e.getContext("2d"),i=n.createRadialGradient(64,64,4,64,64,64);i.addColorStop(0,"rgba(20,15,10,0.32)"),i.addColorStop(1,"rgba(20,15,10,0)"),n.fillStyle=i,n.fillRect(0,0,128,128);const s=new T0(e),o=new It(new We(t*3.2,t*3.2),new ue({map:s,transparent:!0,depthWrite:!1}));return o.rotation.x=-Math.PI/2,o.position.y=.002,o}bindPointer(){this.canvas.addEventListener("pointerdown",e=>{this.dragging=!0,this.idleTimer=0,this.lastPX=e.clientX,this.lastPY=e.clientY,this.canvas.setPointerCapture(e.pointerId)}),this.canvas.addEventListener("pointermove",e=>{this.dragging&&(this.az-=(e.clientX-this.lastPX)*bh,this.pol=Math.min(Cy,Math.max(Ry,this.pol-(e.clientY-this.lastPY)*bh)),this.lastPX=e.clientX,this.lastPY=e.clientY)});const t=e=>{if(this.dragging){this.dragging=!1,this.idleTimer=0;try{this.canvas.releasePointerCapture(e.pointerId)}catch{}}};this.canvas.addEventListener("pointerup",t),this.canvas.addEventListener("pointercancel",t)}resize(){const t=this.canvas.clientWidth||1,e=this.canvas.clientHeight||1;this.renderer.setSize(t,e,!1),this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.renderOnce()}start(){this.running||(this.running=!0,this.prevT=performance.now(),this.renderer.setAnimationLoop(()=>this.frame()))}stop(){this.running=!1,this.renderer.setAnimationLoop(null)}frame(){const t=performance.now(),e=Math.min((t-this.prevT)/1e3,.1);this.prevT=t,this.dragging||(this.idleTimer+=e,this.idleTimer>=Ly&&(this.az+=Py*e)),this.renderOnce()}renderOnce(){const t=Math.sin(this.pol);this.camera.position.set(this.target.x+this.radius*t*Math.sin(this.az),this.target.y+this.radius*Math.cos(this.pol),this.target.z+this.radius*t*Math.cos(this.az)),this.camera.lookAt(this.target),this.renderer.render(this.scene,this.camera)}}function Dy(r,t){const e=Math.max(0,Math.min(5,t));r.replaceChildren();for(let n=0;n<5;n++){const i=document.createElement("span");n<e&&(i.className="on"),r.appendChild(i)}}function Eh(r){return new URL(r,document.baseURI).href}function Uy(){for(const r of document.querySelectorAll(".weapon")){let t={};try{t=JSON.parse(r.dataset.stats??"{}")}catch{}let e=null;try{e=r.dataset.models?JSON.parse(r.dataset.models):null}catch{e=null}const n=Object.keys(t).sort(),i=[...r.querySelectorAll(".wstat-bar")],s=r.querySelector(".wlevels"),o=r.querySelector("canvas.weapon-canvas"),a=n[0]??"1",c=e?.[a]??o?.dataset.model,l=r.dataset.frameRadius?Number(r.dataset.frameRadius):void 0,h=r.dataset.silhouette==="1",u=o&&c?new Iy(o,Eh(c),l||h?{fixedRadius:l,silhouette:h}:void 0):null,d=f=>{const m=t[f]??[];i.forEach((_,p)=>Dy(_,m[p]??0)),s?.querySelectorAll(".wlvl-btn").forEach(_=>{_.classList.toggle("is-on",_.dataset.lvl===f)}),u&&e?.[f]&&u.load(Eh(e[f]))};if(s&&n.length>1){s.replaceChildren();for(const f of n){const m=document.createElement("button");m.type="button",m.className="wlvl-btn",m.dataset.lvl=f,m.textContent=`LVL ${f}`,m.addEventListener("click",()=>d(f)),s.appendChild(m)}}d(a)}}const Ah=8,Th=14181162,wh=Jx[7],Ny=4e6,zy=24,Fy=new A(0,-4.5,0),Oy=6.05,ky=2.05,By=9.2,Rh=[16742972,4179180,9098810],As=3,Vy=.9,Hy=2.2,Gy=.6,Wy=.45,Ch=.07,Vn=new A,ai=new A,Lr=new A,Xy=new A(0,1,0),Ir=new A,Ph=new A,qy=new A(0,1,0),Ts=new A;class jy{tracers=[];tLife=[];tCur=0;blasts=[];bLife=[];bMax=[];bSize=[];bCur=0;constructor(t){const e=new Vs(.16,.16,1,6);for(let i=0;i<18;i++){const s=new It(e,new ue({color:10481919,transparent:!0,opacity:0,blending:Or,depthWrite:!1}));s.visible=!1,this.tracers.push(s),this.tLife.push(0),t.add(s)}const n=new Hs(1,16,12);for(let i=0;i<6;i++){const s=new It(n,new ue({color:16761446,transparent:!0,opacity:0,blending:Or,depthWrite:!1}));s.visible=!1,this.blasts.push(s),this.bLife.push(0),this.bMax.push(1),this.bSize.push(1),t.add(s)}}tracer(t,e,n=10481919){const i=this.tCur;this.tCur=(this.tCur+1)%this.tracers.length;const s=this.tracers[i];Ir.subVectors(e,t);const o=Ir.length()||.01;s.position.copy(t).addScaledVector(Ir,.5),s.quaternion.setFromUnitVectors(qy,Ir.normalize()),s.scale.set(1,o,1),s.material.color.setHex(n),s.material.opacity=.95,s.visible=!0,this.tLife[i]=.09}blast(t,e,n=16756810){const i=this.bCur;this.bCur=(this.bCur+1)%this.blasts.length;const s=this.blasts[i];s.position.copy(t),s.scale.setScalar(e*.3),s.material.color.setHex(n),s.material.opacity=.9,s.visible=!0,this.bLife[i]=.45,this.bMax[i]=.45,this.bSize[i]=e}update(t){for(let e=0;e<this.tracers.length;e++){if(this.tLife[e]<=0)continue;this.tLife[e]-=t;const n=this.tracers[e];if(this.tLife[e]<=0){n.visible=!1;continue}n.material.opacity=this.tLife[e]/.09*.95}for(let e=0;e<this.blasts.length;e++){if(this.bLife[e]<=0)continue;this.bLife[e]-=t;const n=this.blasts[e];if(this.bLife[e]<=0){n.visible=!1;continue}const i=1-this.bLife[e]/this.bMax[e];n.scale.setScalar(this.bSize[e]*(.3+i*.95)),n.material.opacity=(1-i)*.9}}}class Yy{constructor(t,e){this.canvas=t,this.onWeapon=e,this.reduced=matchMedia("(prefers-reduced-motion: reduce)").matches,this.renderer=new Na({canvas:t,antialias:!0,alpha:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.outputColorSpace=ve,this.scene.background=null;const n=this.cfg;this.heightM=n.height*n.blockSize,this.halfW=n.width*n.blockSize/2,this.halfD=n.depth*n.blockSize/2,this.framingDist=Math.max(this.heightM,this.halfW*2)*1.75,this.center.set(0,this.heightM*.5,0),this.hitFx=new Cu(this.scene),this.flyingChunks=new xu(this.scene),this.bigChunks=new Tu(this.scene),this.rockets=new Lu(this.scene),this.fx=new jy(this.scene),this.rubble=new Ru(this.scene,n.blockSize,Math.max(this.halfW,this.halfD)+10,this.heightM+2,0,0);const i={isOccupied:(a,c,l)=>this.building.cluster.isOccupied(a,c,l)},s={isOccupied:(a,c,l)=>this.building.cluster.isOccupied(a,c,l)||this.rubble.isOccupied(a,c,l)},o={settle:(a,c,l)=>this.rubble.settle(a,c,l)};this.rubble.setExternalCollider(i),this.flyingChunks.setWorldCollider(s),this.flyingChunks.setDebrisSink(o),this.bigChunks.setWorldCollider(s),this.bigChunks.setRubbleSink(o),this.bigChunks.setImpactDamager((a,c)=>this.controller.applyExplosion(a,c)),this.spawnBuilding(),this.buildLights(),this.scene.add(this.makeGround()),this.camera=new ye(42,1,.5,2e3),this.resize(),new ResizeObserver(()=>this.resize()).observe(t),new IntersectionObserver(a=>{a[0].isIntersecting?this.start():this.stop()},{threshold:.12}).observe(t),this.announce()}renderer;scene=new so;camera;flyingChunks;bigChunks;rubble;hitFx;rockets;fx;gatRay=new _u;building;controller;gen0=Us(0,0,Ah,Th,wh);cfg=this.gen0.config;firstSpawn=!0;center=new A;heightM;halfW;halfD;framingDist;weapon=0;nextWeapon=0;level=2;phase="intact";phaseT=0;orbit=.6;turnAccum=0;shake=0;shots=[];shotIdx=0;fireT=0;fireEnd=0;burstT=0;gatIdx=0;gatTotal=0;rubbleTimer=0;rubbleForceTimer=0;running=!1;prevT=0;reduced;pick(t){this.weapon=(t%As+As)%As,this.nextWeapon=(this.weapon+1)%As,this.restart()}setLevel(t){this.level=Math.max(1,Math.min(3,t)),this.restart()}restart(){this.shots=[],this.shotIdx=0,this.fireT=0,this.gatIdx=0,this.gatTotal=0,this.turnAccum=0,this.announce(),this.rebuild(),this.setPhase("intact")}lvlMul(){return 1+(this.level-1)*.28}spawnBuilding(){const t=this.firstSpawn?this.gen0:Us(0,0,Ah,Th,wh);this.firstSpawn=!1,this.building=new ya(t.config,t.blocks),this.scene.add(this.building.group),this.controller=new Au(this.building,this.flyingChunks,this.bigChunks,this.hitFx),this.controller.setSweepBudget(Ny)}rebuild(){this.flyingChunks.clear(),this.bigChunks.clear(),this.rubble.clear(),this.scene.remove(this.building.group),this.building.dispose(),this.spawnBuilding()}buildLights(){const t=new Ba(14674687,12038308,1.05),e=new Yn(16774370,1.25);e.position.set(-24,48,34);const n=new Yn(13523504,.3);n.position.set(34,14,-22),this.scene.add(t,e,n)}makeGround(){const t=new It(new We(600,600),new tn({color:14209734}));return t.rotation.x=-Math.PI/2,t}start(){this.running||(this.running=!0,this.prevT=performance.now(),this.renderer.setAnimationLoop(()=>this.frame()))}stop(){this.running=!1,this.renderer.setAnimationLoop(null)}frame(){const t=performance.now(),e=Math.min((t-this.prevT)/1e3,.05);this.prevT=t,this.controller.update(e),this.bigChunks.update(e,this.flyingChunks),this.flyingChunks.update(e),this.rubble.decayTick(e),this.driveRubbleGravity(e),this.rubble.flushDirty(),this.hitFx.update(e),this.rockets.update(e),this.fx.update(e),this.building.cluster.flushUploads(zy),this.reduced||this.driveScript(e),this.driveGatling(e),this.driveCamera(e),this.renderer.render(this.scene,this.camera)}driveRubbleGravity(t){if(this.rubbleTimer+=t,this.rubbleForceTimer+=t,this.rubbleTimer<.1)return;this.rubbleTimer=0;const e=this.rubbleForceTimer>=.5;e&&(this.rubbleForceTimer=0);const n=this.rubble.collectUnsupported(3e3,e);n.length>0&&this.flyingChunks.spawn(n,n[0].worldPosition,.8,void 0,Fy)}driveScript(t){switch(this.phaseT+=t,this.phase){case"intact":this.phaseT>=Vy&&(this.planFire(),this.setPhase("firing"));break;case"firing":for(this.fireT+=t;this.shotIdx<this.shots.length&&this.fireT>=this.shots[this.shotIdx].at;)this.execShot(this.shots[this.shotIdx]),this.shotIdx++;this.fireT>=this.fireEnd&&this.gatIdx>=this.gatTotal&&this.setPhase("watch");break;case"watch":this.turnAccum>=Math.PI*2&&this.phaseT>=Hy&&(this.rebuild(),this.setPhase("gap"));break;case"gap":this.phaseT>=Gy&&(this.weapon=this.nextWeapon,this.nextWeapon=(this.weapon+1)%As,this.announce(),this.turnAccum=0,this.setPhase("intact"));break}}setPhase(t){this.phase=t,this.phaseT=0}announce(){this.onWeapon?.(this.weapon)}aim(t,e){ai.set(this.camera.position.x-this.center.x,0,this.camera.position.z-this.center.z).normalize(),Lr.crossVectors(Xy,ai).normalize();const n=Math.min(this.halfW,this.halfD)*.55;return new A(this.center.x+ai.x*n+Lr.x*t,e,this.center.z+ai.z*n+Lr.z*t)}planFire(){this.shots=[],this.shotIdx=0,this.fireT=0,this.gatIdx=0,this.gatTotal=0;const t=this.heightM,e=this.halfW,n=this.lvlMul();if(this.weapon===0){const i=[[0,-.62*e,t*.26],[.85,.62*e,t*.26],[1.7,0,t*.3],[2.55,-.42*e,t*.52],[3.4,.42*e,t*.52],[4.25,0,t*.24]];for(const[s,o,a]of i){const c=this.aim(o,a);this.shots.push({at:s,kind:"rocket",x:c.x,y:c.y,z:c.z,r:Oy*n})}this.fireEnd=5.4}else if(this.weapon===1)this.gatTotal=40+this.level*8,this.burstT=0,this.fireEnd=this.gatTotal*Ch+.6;else{const i=[[0,-.55*e,3],[.75,.55*e,3],[1.5,0,3],[2.25,-.32*e,t*.42],[3,.32*e,t*.42]];for(const[s,o,a]of i){const c=this.aim(o,a);this.shots.push({at:s,kind:"c4",x:c.x,y:c.y,z:c.z,r:By*n})}this.fireEnd=4.2}}execShot(t){if(Vn.set(t.x,t.y,t.z),t.kind==="rocket"){ai.set(this.camera.position.x-this.center.x,0,this.camera.position.z-this.center.z).normalize();const e=Vn.clone().addScaledVector(ai,22).setY(this.heightM*.95+6);this.rockets.launch(e,Vn.clone(),n=>{this.controller.applyExplosion(n,t.r),this.fx.blast(n,t.r*1.15,16756806),this.shake=Math.min(this.shake+1.3,1.9)})}else this.controller.applyExplosion(Vn.clone(),t.r),this.fx.blast(Vn.clone(),t.r*1.25,16764762),this.hitFx.burst(Vn.clone(),Rh[2],28),this.shake=Math.min(this.shake+1.4,2)}driveGatling(t){if(this.gatIdx>=this.gatTotal||(this.burstT-=t,this.burstT>0))return;this.burstT=Ch;const e=this.gatTotal/3,n=Math.min(2,Math.floor(this.gatIdx/e)),i=[.52,.36,.2][n],s=this.gatIdx%e/(e-1),o=n%2===0?1:-1,a=(s*2-1)*o*this.halfW*.82,c=this.heightM*i+(Math.random()-.5)*2,l=this.aim(a,c);Ts.copy(this.center).addScaledVector(ai,this.framingDist*.15).addScaledVector(Lr,o*this.framingDist*.95),Ts.y=c+3,Ph.subVectors(l,Ts).normalize(),this.gatRay.set(Ts,Ph),this.gatRay.far=this.framingDist*2;const h=this.gatRay.intersectObjects(this.building.cluster.surfaceMeshes(),!1)[0],u=h?h.point:l;this.controller.applyExplosion(u,ky*this.lvlMul()),this.fx.tracer(Ts,u,11072767),this.hitFx.burst(u,Rh[1],10),this.shake=Math.min(this.shake+.18,1),this.gatIdx++}driveCamera(t){const e=t*Wy;this.orbit+=e,this.turnAccum+=e;const n=this.framingDist;let i=0,s=0;if(this.shake>0){this.shake=Math.max(0,this.shake-t*2.4);const o=this.shake*this.shake;i=Math.sin(performance.now()*.06)*o*1.1,s=Math.cos(performance.now()*.071)*o*.9}this.camera.position.set(this.center.x+Math.sin(this.orbit)*n+i,this.heightM*.6+s,this.center.z+Math.cos(this.orbit)*n),Vn.set(this.center.x,this.heightM*.42,this.center.z),this.camera.lookAt(Vn)}resize(){const t=this.canvas.clientWidth||1,e=this.canvas.clientHeight||1;this.renderer.setSize(t,e,!1),this.camera.aspect=t/e,this.camera.updateProjectionMatrix()}}function Ky(){const r=document.querySelector("canvas.collapse-canvas");if(!r)return;const t=[...document.querySelectorAll(".cs-chip")],e=new Yy(r,n=>{t.forEach((i,s)=>i.classList.toggle("is-on",s===n))});t.forEach((n,i)=>n.addEventListener("click",()=>e.pick(i)))}const gi=document.getElementById("stage"),Lh=document.getElementById("topbar"),Dr=document.getElementById("loader"),Ih=document.getElementById("year");Ih&&(Ih.textContent=String(new Date().getFullYear()));wy();Wa()&&Uy();Wa()&&Ky();const Zy=window.matchMedia("(prefers-reduced-motion: reduce)").matches,Dh=document.querySelectorAll(".reveal");if(Zy||!("IntersectionObserver"in window))Dh.forEach(r=>r.classList.add("in"));else{const r=new IntersectionObserver(t=>{for(const e of t)e.isIntersecting&&(e.target.classList.add("in"),r.unobserve(e.target))},{threshold:.15,rootMargin:"0px 0px -8% 0px"});Dh.forEach(t=>r.observe(t))}let Hi=null;gi&&Wa()?(Dr&&Dr.classList.add("show"),requestAnimationFrame(()=>requestAnimationFrame(()=>{try{Hi=new nx(gi),new Sy(Hi),Hi.start()}catch(r){console.error("[endstreet] 3D init failed, staying on static site",r),gi.style.display="none",Hi=null}Dr&&Dr.classList.remove("show")}))):gi&&(gi.style.display="none");let aa=!1;function Fu(){aa||(aa=!0,requestAnimationFrame(()=>{const r=window.scrollY,t=window.innerHeight;if(Lh&&Lh.classList.toggle("scrolled",r>24),gi&&Hi){const e=Math.max(0,1-r/(t*.85));gi.style.opacity=String(e),Hi.paused=e<=.01}aa=!1}))}window.addEventListener("scroll",Fu,{passive:!0});Fu();
