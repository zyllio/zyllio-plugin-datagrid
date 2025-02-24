(()=>{"use strict";var n=function(n,e,t,r){return new(t||(t=Promise))((function(o,i){function l(n){try{s(r.next(n))}catch(n){i(n)}}function a(n){try{s(r.throw(n))}catch(n){i(n)}}function s(n){var e;n.done?o(n.value):(e=n.value,e instanceof t?e:new t((function(n){n(e)}))).then(l,a)}s((r=r.apply(n,e||[])).next())}))};console.log("Plugin Datagrid started 2");class e extends HTMLElement{set data(n){console.log("set data ",n),void 0===this._data&&(this._data=n)}set selection(n){console.log("set selection ",n),this._selection=n}constructor(){super(),this.search="",this.shadow=this.attachShadow({mode:"open"}),this.htmlElement=document.createElement("div"),this.htmlElement.className="content",this.styleElement=document.createElement("style")}connectedCallback(){return n(this,void 0,void 0,(function*(){this.shadow.appendChild(this.styleElement),this.shadow.appendChild(this.htmlElement),this.styleElement.innerHTML=":host {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 4px;\r\n  overflow: hidden;\r\n  width: 100%;\r\n  padding: 10px 10px;\r\n  box-sizing: border-box;\r\n  font-family: var(--theme-font-family);\r\n  --gray: #8d8d8d;\r\n  --cell-width: 150px;\r\n  --scrollbar-background: #fff;\r\n  --scrollbar-foreground: #b1b1b1;\r\n}\r\n\r\n.content {\r\n  overflow-x: auto;\r\n  /* overflow-y: auto; */\r\n  /* Fixed headers */\r\n  /* max-height: 600px; */\r\n  /* Hauteur fixe avec scroll */\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: flex-end;\r\n  gap: 10px;\r\n}\r\n\r\n.toolbar {\r\n  position: sticky;\r\n  left: 0;\r\n  display: flex;\r\n  justify-content: flex-end;\r\n  align-items: center;\r\n  gap: 10px;\r\n}\r\n\r\nzyllio-sdk-search {\r\n  width: 100%;\r\n  max-width: 420px;\r\n  height: 39px;\r\n}\r\n\r\ntable {\r\n  font-size: 16px;\r\n  border-collapse: collapse;\r\n  table-layout: fixed;\r\n}\r\n\r\nthead {\r\n  position: sticky;\r\n  top: 0;\r\n  background: white;\r\n  /* Fond blanc pour éviter la superposition */\r\n  z-index: 10;\r\n}\r\n\r\nth {\r\n  border: 1px solid var(--gray);\r\n  border-top: none;\r\n}\r\n\r\n.header {\r\n  width: var(--cell-width);\r\n  color: var(--gray);\r\n  font-weight: normal;\r\n  padding: 12px 6px;\r\n  text-align: left;\r\n  box-sizing: border-box;\r\n}\r\n\r\ntd {\r\n  border: 1px solid var(--gray);\r\n  text-align: left;\r\n  width: var(--cell-width);\r\n  /* No overflow for menus */\r\n}\r\n\r\nth:first-child {\r\n  border-left: none;\r\n}\r\n\r\nth:first-child .header {\r\n  width: 30px;\r\n}\r\n\r\nth:last-child {\r\n  border-right: none;\r\n}\r\n\r\ntd:last-child {\r\n  border-right: none;\r\n}\r\n\r\ntd:first-child {\r\n  text-align: center;\r\n  border-left: none;\r\n  color: var(--gray);\r\n  font-size: 0.7em;\r\n  width: 30px;\r\n}\r\n\r\n.cell {\r\n  position: relative;\r\n  width: var(--cell-width);\r\n  box-sizing: border-box;\r\n}\r\n\r\n.cell.selected {\r\n  outline: 2px solid var(--theme-secondary-color) !important;\r\n}\r\n\r\n.text:focus-visible {\r\n  outline: none;\r\n}\r\n\r\n.menu {\r\n  position: absolute;\r\n  display: none;\r\n  gap: 4px;\r\n  z-index: 1000;\r\n  background-color: #ffffff;\r\n  border-radius: 17px;\r\n  padding: 4px;\r\n  box-shadow: 2px 2px 5px #00000059;\r\n  color: #fff;\r\n  border: 1px solid #e3e3e3;\r\n}\r\n\r\n.cell.selected .menu {\r\n  display: flex;\r\n}\r\n\r\n.option {\r\n  display: inline-block;\r\n  padding: 6px 10px;\r\n  background-color: #eaeaea;\r\n  border-radius: 20px;\r\n  white-space: nowrap;\r\n  color: #000;\r\n  font-size: 0.9em;\r\n  cursor: pointer;\r\n}\r\n\r\n.text {\r\n  word-wrap: break-word;\r\n  overflow: hidden;\r\n  white-space: nowrap;\r\n  overflow: hidden;\r\n  text-align: left;\r\n  padding: 12px 6px;\r\n}\r\n\r\n.no-data {\r\n  padding: 10px;\r\n}\r\n\r\n.button {\r\n  position: sticky;\r\n  bottom: 0;\r\n  left: 0;\r\n  display: inline-flex;\r\n  width: 39px;\r\n  height: 39px;\r\n  box-sizing: border-box;\r\n  background-color: var(--theme-secondary-color);\r\n  color: var(--theme-secondary-text-color);\r\n  border-radius: 10px;  \r\n  align-items: center;\r\n  justify-content: center;\r\n  cursor: pointer;\r\n  margin-top: auto;\r\n}\r\n\r\n::-webkit-scrollbar {\r\n  -webkit-appearance: none;\r\n  width: 8px;\r\n  height: 8px;\r\n}\r\n\r\n::-webkit-scrollbar-button {\r\n  display: none;\r\n}\r\n\r\n::-webkit-scrollbar-track {}\r\n\r\n::-webkit-scrollbar-track-piece {\r\n  background-color: var(--scrollbar-background);\r\n}\r\n\r\n::-webkit-scrollbar-corner {\r\n  background-color: var(--scrollbar-background);\r\n}\r\n\r\n::-webkit-scrollbar-thumb {\r\n  background-color: var(--scrollbar-foreground);\r\n  border-radius: 10px !important;\r\n}",yield this.refresh()}))}refresh(){return n(this,void 0,void 0,(function*(){this.htmlElement.innerHTML=yield this.getHtmlContent(),setTimeout((()=>{this.postRefresh()}))}))}getFilteredData(){return this._data.items.filter((n=>Object.values(n).some((n=>n.toLowerCase().includes(this.search.toLowerCase())))))}getHtmlContent(){return n(this,void 0,void 0,(function*(){const n=this.getColumns(),e=this.getFilteredData();return`\n\n      <div class="toolbar">        \n        <zyllio-sdk-search value="${this.search}" ></zyllio-sdk-search>\n      </div>\n\n      <table>\n        <thead><tr>\n          <th><div class="header" ></div></th></th>\n          ${n.map((n=>`<th><div class="header" >${n.name}</div></th>`)).join("")}\n        </tr></thead>\n\n        <tbody>\n        ${e.map(((e,t)=>`\n          \n          <tr>\n            <td>${t+1}</td>\n            ${n.map(((n,r)=>`\n\n              <td>\n                <div class="cell" data-row="${t}" data-id="${e._id}" data-column-name="${n.name}" data-column="${r}" >\n                  <div class="text" ${this.isOptionsColumn(n)?"":"contenteditable"} >${e[n.name]}</div>\n                  ${this.isOptionsColumn(n)?`<div class="menu" >\n                      ${n.options.split(",").map((n=>`<div class="option" >${n}</div>`))}                      \n                    </div>`:""}\n                </div>\n              </td> \n            \n              `)).join("")}\n          <tr>\n\n        `)).join("")} \n\n        ${0===e.length?'<tr><td></td><td colspan="100" class="no-data" ><div>Aucune donnée disponible</div></td></tr>':""}\n        </tbody>         \n      </table>\n\n      \x3c!-- \n  <svg class="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>\n  --\x3e      \n    `}))}isOptionsColumn(n){return"options-1"===n.type||"options-n"===n.type}postRefresh(){return n(this,void 0,void 0,(function*(){this.shadow.querySelectorAll("div[data-row]").forEach((n=>{n.addEventListener("click",(n=>{}))})),this.shadow.querySelectorAll("div[data-row] .text").forEach((n=>{n.addEventListener("keydown",(n=>{this.onCellkeydown(n)})),n.addEventListener("blur",(n=>{this.onCellBlur(n)}))})),this.shadow.querySelectorAll(".option").forEach((n=>{n.addEventListener("click",(n=>{this.onOptionClick(n)}))})),this.shadow.querySelector("zyllio-sdk-search").onblur=()=>{this.search=this.shadow.querySelector("zyllio-sdk-search").value,this.refresh()}}))}onCellkeydown(n){if("Enter"===n.key){n.preventDefault();const e=document.createElement("br"),t=window.getSelection(),r=t.getRangeAt(0);r.deleteContents(),r.insertNode(e),r.setStartAfter(e),r.collapse(!0),t.removeAllRanges(),t.addRange(r)}}onOptionClick(n){n.stopPropagation();const e=n.target,t=e.closest(".cell"),r=e.innerText,o=t.dataset.columnName;this._selection[o]=r,t.querySelector(".text").textContent=r,console.log("Updating (from option click)... ",this._selection),this.dispatchEvent(new CustomEvent("selected",{detail:{selection:this._selection}})),this.dispatchEvent(new CustomEvent("trigger-action",{detail:{action:"update-action"}})),t.classList.remove("selected")}onCellBlur(n){const e=n.target.closest(".cell"),t=n.target.innerText,r=e.dataset.columnName,o=e.dataset.id,i=this._data.items.find((n=>n._id===o));i[r]=t,console.log("Updating (from onblur)... ",i),this.dispatchEvent(new CustomEvent("selected",{detail:{selection:i}})),this.dispatchEvent(new CustomEvent("trigger-action",{detail:{action:"update-action"}}))}onCellClick(n){if(n.classList.contains("selected"))return;this.shadow.querySelectorAll("div[data-row]").forEach((n=>{n.classList.remove("selected")})),n.classList.add("selected");const e=this._data.items.find((e=>e._id===n.dataset.id));console.log("selecting (from onclick)... ",e),this.dispatchEvent(new CustomEvent("selected",{detail:{selection:e}}))}getColumns(){return this._data.table.columns.filter((n=>"relation-1"!==n.type&&"relation-n"!==n.type))}}zySdk.services.registry.registerComponent({id:"custom-datagrid",metadataVersion:2,icon:'\n  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="24" viewBox="0 0 24 24" fill="#cccccc">    \n    <path d="M10,4V8H14V4H10M16,4V8H20V4H16M16,10V14H20V10H16M16,16V20H20V16H16M14,20V16H10V20H14M8,20V16H4V20H8M8,14V10H4V14H8M8,8V4H4V8H8M10,14H14V10H10V14M4,2H20A2,2 0 0,1 22,4V20A2,2 0 0,1 20,22H4C2.92,22 2,21.1 2,20V4A2,2 0 0,1 4,2Z" />\n  </svg> \n',label:"Data grid",category:"Plugins",subCategory:"Plugins",hidden:!1,properties:[{id:"selection",name:"Selection",type:"row-variable",tootip:"",default:"",write:!0},{id:"data",name:"Table",type:"table",tootip:"The table being used to populate",default:"",main:!0},{id:"filter",name:"Filter",type:"filter",tootip:"Filter the table rows",default:""},{id:"update-action",name:"Update action",type:"action",tootip:"",default:""}],styles:[]},e)})();
//# sourceMappingURL=plugin.js.map