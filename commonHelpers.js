import"./assets/modulepreload-polyfill-ec808ebb.js";import{f as l,i}from"./assets/vendor-651d7991.js";function n(e){return e<10?`0${e}`:e}document.addEventListener("DOMContentLoaded",function(){let e;l("#datetime-picker",{enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){e=t[0],e<new Date?(document.querySelector("[data-start]").disabled=!0,i.warning({title:"Warning",message:"Please choose a date in the future"})):document.querySelector("[data-start]").disabled=!1}});function u(){const t=new Date,a=e-t;if(a<=0)clearInterval(o),document.querySelector("[data-days]").textContent="00",document.querySelector("[data-hours]").textContent="00",document.querySelector("[data-minutes]").textContent="00",document.querySelector("[data-seconds]").textContent="00",i.success({title:"Success",message:"Countdown finished!"});else{const{days:r,hours:s,minutes:c,seconds:d}=m(a);document.querySelector("[data-days]").textContent=n(r),document.querySelector("[data-hours]").textContent=n(s),document.querySelector("[data-minutes]").textContent=n(c),document.querySelector("[data-seconds]").textContent=n(d)}}let o;document.querySelector("[data-start]").addEventListener("click",function(){o=setInterval(u,1e3),this.disabled=!0})});function m(e){const r=Math.floor(e/864e5),s=Math.floor(e%864e5/36e5),c=Math.floor(e%864e5%36e5/6e4),d=Math.floor(e%864e5%36e5%6e4/1e3);return{days:r,hours:s,minutes:c,seconds:d}}
//# sourceMappingURL=commonHelpers.js.map
