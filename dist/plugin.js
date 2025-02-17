(()=>{"use strict";var n=function(n,e,t,o){return new(t||(t=Promise))((function(i,r){function l(n){try{d(o.next(n))}catch(n){r(n)}}function a(n){try{d(o.throw(n))}catch(n){r(n)}}function d(n){var e;n.done?i(n.value):(e=n.value,e instanceof t?e:new t((function(n){n(e)}))).then(l,a)}d((o=o.apply(n,e||[])).next())}))};console.log("Plugin Datagrid started");class e extends HTMLElement{constructor(){super(),this.shadow=this.attachShadow({mode:"open"}),this.htmlElement=document.createElement("div"),this.htmlElement.className="content",this.styleElement=document.createElement("style")}connectedCallback(){return n(this,void 0,void 0,(function*(){this.shadow.appendChild(this.styleElement),this.shadow.appendChild(this.htmlElement),this.styleElement.innerHTML="\n\n  :host {\n    display: block;\n    overflow: hidden;\n    width: 100%;\n    padding: 10px 10px;\n    box-sizing: border-box;\n    font-family: var(--theme-font-family);\n    --gray: #aeaeae;\n    --cell-width: 150px;\n    --scrollbar-background: #fff;\n    --scrollbar-foreground: #b1b1b1;\n  }\n  \n  .content {\n    overflow-x: auto;\n    overflow-y: auto; /* Fixed headers */\n    max-height: 600px; /* Hauteur fixe avec scroll */\n  }\n\n  table {\n    font-size: 16px;\n    border-collapse: collapse;\n    table-layout: fixed;\n  }\n\n  thead {\n    position: sticky;\n    top: 0;\n    background: white; /* Fond blanc pour éviter la superposition */\n    z-index: 10;\n  }\n\n  th { \n    border: 1px solid var(--gray); \n    text-align: left;    \n  }\n\n  td { \n    border: 1px solid var(--gray); \n    text-align: left;\n    width: var(--cell-width); \n    /* No overflow for menus */\n  }\n\n  th {\n    border-top: none;\n    color: var(--gray);\n    font-weight: normal;\n    padding: 12px 6px;\n  }\n\n  th:first-child { \n    border-left: none;\n  }\n\n  th:last-child { \n    border-right: none; \n  }\n\n  td:last-child { \n    border-right: none; \n  }\n\n  td:first-child { \n    text-align: center;\n    border-left: none;\n    color: var(--gray);\n    font-size: 0.7em;\n    width: 30px;\n  }\n\n  .cell {\n    position: relative;    \n    width: var(--cell-width); \n    \n    box-sizing: border-box;\n  }\n\n  .cell.selected {\n    outline: 2px solid var(--theme-secondary-color) !important;\n  }\n\n  .text:focus-visible { \n    outline: none;   \n  }\n\n  .menu {\n    position: absolute;\n    display: none;\n    gap: 4px;    \n    z-index: 1000;\n    background-color: #ffffff;\n    border-radius: 17px;\n    padding: 4px;\n    box-shadow: 2px 2px 5px #00000059;\n    color: #fff;\n    border: 1px solid #e3e3e3;\n  }\n\n  .cell.selected .menu {    \n    display: flex;\n  }\n\n  .option {  \n    display: inline-block;  \n    padding: 6px 10px;\n    background-color: #9898dc;\n    border-radius: 20px;\n    white-space: nowrap;    \n    font-size: 0.9em;\n    cursor: pointer;\n  }\n\n  .text {word-wrap: break-word;\n    overflow: hidden; \n    white-space: nowrap;\n    overflow: hidden; \n    text-align: left;\n    padding: 12px 6px; \n  }\n\n  ::-webkit-scrollbar {\n    -webkit-appearance: none;\n    width: 8px;\n    height: 8px;\n  }\n\n  ::-webkit-scrollbar-button {\n    display: none;\n  }\n\n  ::-webkit-scrollbar-track {}\n\n  ::-webkit-scrollbar-track-piece {\n    background-color: var(--scrollbar-background);\n  }\n\n  ::-webkit-scrollbar-corner {\n    background-color: var(--scrollbar-background);\n  }\n\n  ::-webkit-scrollbar-thumb {\n    background-color: var(--scrollbar-foreground);\n    border-radius: 10px !important;\n  }\n\n",yield this.refresh(),yield this.postRefresh()}))}refresh(){return n(this,void 0,void 0,(function*(){this.htmlElement.innerHTML=yield this.getHtmlContent()}))}getHtmlContent(){return n(this,void 0,void 0,(function*(){console.log("this.data ",this.data);const n=this.getColumns();return`\n\n      <table>\n        <thead><tr>\n          <th></th>\n          ${n.map((n=>`<th>${n}</th>`)).join("")}\n        </tr></thead>\n\n        <tbody>\n        ${this.data.items.map(((e,t)=>`\n          \n          <tr>\n            <td>${t+1}</td>\n            ${n.map(((n,o)=>`\n\n              <td>\n                <div class="cell"  data-row="${t}" data-column="${o}" >\n                  <div class="text" contenteditable >${e[n]}</div>\n                  <div class="menu" >\n                    <div class="option" >Accepté</div>\n                    <div class="option" >Rejeté</div>\n                    <div class="option" >En attente</div>\n                  </div>\n                </div>\n              </td> \n            \n              `)).join("")}\n          <tr>\n\n        `)).join("")} \n        </tbody>         \n      </table>\n    `}))}postRefresh(){return n(this,void 0,void 0,(function*(){this.shadow.querySelectorAll("div[data-row]").forEach((n=>{n.addEventListener("click",(n=>{this.onCellClick(n)})),n.addEventListener("keydown",(n=>{this.onCellkeydown(n)}))})),this.shadow.querySelectorAll(".option").forEach((n=>{n.addEventListener("click",(n=>{this.onOptionClick(n)}))}))}))}onOptionClick(n){n.stopPropagation();const e=n.target,t=e.closest(".cell");t.querySelector(".text").textContent=e.innerText,t.classList.remove("selected")}onCellkeydown(n){if("Enter"===n.key){n.preventDefault();const e=document.createElement("br"),t=window.getSelection(),o=t.getRangeAt(0);o.deleteContents(),o.insertNode(e),o.setStartAfter(e),o.collapse(!0),t.removeAllRanges(),t.addRange(o)}}onCellClick(n){const e=n.target.closest(".cell");if(e.classList.contains("selected"))return;const t=e.dataset.row,o=e.dataset.column;console.log("Cell clicked:",{rowIndex:t,columnIndex:o}),this.shadow.querySelectorAll("div[data-row]").forEach((n=>{n.classList.remove("selected")})),e.classList.add("selected")}getColumns(){return Object.keys(this.data.items[0]).filter((n=>"_id"!==n&&"_index"!==n))}}zySdk.services.registry.registerComponent({id:"custom-datagrid",metadataVersion:2,icon:'\n  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="24" viewBox="0 0 24 24" fill="#cccccc">    \n    <path d="M10,4V8H14V4H10M16,4V8H20V4H16M16,10V14H20V10H16M16,16V20H20V16H16M14,20V16H10V20H14M8,20V16H4V20H8M8,14V10H4V14H8M8,8V4H4V8H8M10,14H14V10H10V14M4,2H20A2,2 0 0,1 22,4V20A2,2 0 0,1 20,22H4C2.92,22 2,21.1 2,20V4A2,2 0 0,1 4,2Z" />\n  </svg> \n',label:"Data grid",category:"Plugins",subCategory:"Plugins",hidden:!1,properties:[{id:"selection",name:"Selection",type:"row-variable",tootip:"",default:"",write:!0},{id:"data",name:"Table",type:"table",tootip:"The table being used to populate",default:"",main:!0}],styles:[]},e)})();
//# sourceMappingURL=plugin.js.map