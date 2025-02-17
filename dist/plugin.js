(()=>{"use strict";var n=function(n,r,e,t){return new(e||(e=Promise))((function(o,i){function l(n){try{d(t.next(n))}catch(n){i(n)}}function a(n){try{d(t.throw(n))}catch(n){i(n)}}function d(n){var r;n.done?o(n.value):(r=n.value,r instanceof e?r:new e((function(n){n(r)}))).then(l,a)}d((t=t.apply(n,r||[])).next())}))};console.log("Plugin Datagrid started");class r extends HTMLElement{constructor(){super(),this.shadow=this.attachShadow({mode:"open"}),this.htmlElement=document.createElement("div"),this.htmlElement.className="content",this.styleElement=document.createElement("style")}connectedCallback(){return n(this,void 0,void 0,(function*(){this.shadow.appendChild(this.styleElement),this.shadow.appendChild(this.htmlElement),this.styleElement.innerHTML=" :host {\r\n   display: block;\r\n   overflow: hidden;\r\n   width: 100%;\r\n   padding: 10px 10px;\r\n   box-sizing: border-box;\r\n   font-family: var(--theme-font-family);\r\n   --gray: #aeaeae; \r\n   --cell-width: 150px;\r\n   --scrollbar-background: #fff;\r\n   --scrollbar-foreground: #b1b1b1;\r\n }\r\n\r\n .content {\r\n   overflow-x: auto;\r\n   overflow-y: auto;\r\n   /* Fixed headers */\r\n   max-height: 600px;\r\n   /* Hauteur fixe avec scroll */\r\n }\r\n\r\n table {\r\n   font-size: 16px;\r\n   border-collapse: collapse;\r\n   table-layout: fixed;\r\n }\r\n\r\n thead {\r\n   position: sticky;\r\n   top: 0;\r\n   background: white;\r\n   /* Fond blanc pour éviter la superposition */\r\n   z-index: 10;\r\n }\r\n\r\n th {\r\n   border: 1px solid var(--gray);\r\n   text-align: left;\r\n }\r\n\r\n td {\r\n   border: 1px solid var(--gray);\r\n   text-align: left;\r\n   width: var(--cell-width);\r\n   /* No overflow for menus */\r\n }\r\n\r\n th {\r\n   border-top: none;\r\n   color: var(--gray);\r\n   font-weight: normal;\r\n   padding: 12px 6px;\r\n }\r\n\r\n th:first-child {\r\n   border-left: none;\r\n }\r\n\r\n th:last-child {\r\n   border-right: none;\r\n }\r\n\r\n td:last-child {\r\n   border-right: none;\r\n }\r\n\r\n td:first-child {\r\n   text-align: center;\r\n   border-left: none;\r\n   color: var(--gray);\r\n   font-size: 0.7em;\r\n   width: 30px;\r\n }\r\n\r\n .cell {\r\n   position: relative;\r\n   width: var(--cell-width);\r\n\r\n   box-sizing: border-box;\r\n }\r\n\r\n .cell.selected {\r\n   outline: 2px solid var(--theme-secondary-color) !important;\r\n }\r\n\r\n .text:focus-visible {\r\n   outline: none;\r\n }\r\n\r\n .menu {\r\n   position: absolute;\r\n   display: none;\r\n   gap: 4px;\r\n   z-index: 1000;\r\n   background-color: #ffffff;\r\n   border-radius: 17px;\r\n   padding: 4px;\r\n   box-shadow: 2px 2px 5px #00000059;\r\n   color: #fff;\r\n   border: 1px solid #e3e3e3;\r\n }\r\n\r\n .cell.selected .menu {\r\n   display: flex;\r\n }\r\n\r\n .option {\r\n   display: inline-block;\r\n   padding: 6px 10px;\r\n   background-color: #9898dc;\r\n   border-radius: 20px;\r\n   white-space: nowrap;\r\n   font-size: 0.9em;\r\n   cursor: pointer;\r\n }\r\n\r\n .text {\r\n   word-wrap: break-word;\r\n   overflow: hidden;\r\n   white-space: nowrap;\r\n   overflow: hidden;\r\n   text-align: left;\r\n   padding: 12px 6px;\r\n }\r\n\r\n ::-webkit-scrollbar {\r\n   -webkit-appearance: none;\r\n   width: 8px;\r\n   height: 8px;\r\n }\r\n\r\n ::-webkit-scrollbar-button {\r\n   display: none;\r\n }\r\n\r\n ::-webkit-scrollbar-track {}\r\n\r\n ::-webkit-scrollbar-track-piece {\r\n   background-color: var(--scrollbar-background);\r\n }\r\n\r\n ::-webkit-scrollbar-corner {\r\n   background-color: var(--scrollbar-background);\r\n }\r\n\r\n ::-webkit-scrollbar-thumb {\r\n   background-color: var(--scrollbar-foreground);\r\n   border-radius: 10px !important;\r\n }",yield this.refresh(),yield this.postRefresh()}))}refresh(){return n(this,void 0,void 0,(function*(){this.htmlElement.innerHTML=yield this.getHtmlContent()}))}getHtmlContent(){return n(this,void 0,void 0,(function*(){console.log("this.data ",this.data);const n=this.getColumns();return`\n\n      <table>\n        <thead><tr>\n          <th></th>\n          ${n.map((n=>`<th>${n}</th>`)).join("")}\n        </tr></thead>\n\n        <tbody>\n        ${this.data.items.map(((r,e)=>`\n          \n          <tr>\n            <td>${e+1}</td>\n            ${n.map(((n,t)=>`\n\n              <td>\n                <div class="cell"  data-row="${e}" data-column="${t}" >\n                  <div class="text" contenteditable >${r[n]}</div>\n                  <div class="menu" >\n                    <div class="option" >Accepté</div>\n                    <div class="option" >Rejeté</div>\n                    <div class="option" >En attente</div>\n                  </div>\n                </div>\n              </td> \n            \n              `)).join("")}\n          <tr>\n\n        `)).join("")} \n        </tbody>         \n      </table>\n    `}))}postRefresh(){return n(this,void 0,void 0,(function*(){this.shadow.querySelectorAll("div[data-row]").forEach((n=>{n.addEventListener("click",(n=>{this.onCellClick(n)})),n.addEventListener("keydown",(n=>{this.onCellkeydown(n)}))})),this.shadow.querySelectorAll(".option").forEach((n=>{n.addEventListener("click",(n=>{this.onOptionClick(n)}))}))}))}onOptionClick(n){n.stopPropagation();const r=n.target,e=r.closest(".cell");e.querySelector(".text").textContent=r.innerText,e.classList.remove("selected")}onCellkeydown(n){if("Enter"===n.key){n.preventDefault();const r=document.createElement("br"),e=window.getSelection(),t=e.getRangeAt(0);t.deleteContents(),t.insertNode(r),t.setStartAfter(r),t.collapse(!0),e.removeAllRanges(),e.addRange(t)}}onCellClick(n){const r=n.target.closest(".cell");if(r.classList.contains("selected"))return;const e=r.dataset.row,t=r.dataset.column;console.log("Cell clicked:",{rowIndex:e,columnIndex:t}),this.shadow.querySelectorAll("div[data-row]").forEach((n=>{n.classList.remove("selected")})),r.classList.add("selected")}getColumns(){return Object.keys(this.data.items[0]).filter((n=>"_id"!==n&&"_index"!==n))}}zySdk.services.registry.registerComponent({id:"custom-datagrid",metadataVersion:2,icon:'\n  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="24" viewBox="0 0 24 24" fill="#cccccc">    \n    <path d="M10,4V8H14V4H10M16,4V8H20V4H16M16,10V14H20V10H16M16,16V20H20V16H16M14,20V16H10V20H14M8,20V16H4V20H8M8,14V10H4V14H8M8,8V4H4V8H8M10,14H14V10H10V14M4,2H20A2,2 0 0,1 22,4V20A2,2 0 0,1 20,22H4C2.92,22 2,21.1 2,20V4A2,2 0 0,1 4,2Z" />\n  </svg> \n',label:"Data grid",category:"Plugins",subCategory:"Plugins",hidden:!1,properties:[{id:"selection",name:"Selection",type:"row-variable",tootip:"",default:"",write:!0},{id:"data",name:"Table",type:"table",tootip:"The table being used to populate",default:"",main:!0}],styles:[]},r)})();
//# sourceMappingURL=plugin.js.map