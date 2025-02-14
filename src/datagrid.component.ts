console.log('Plugin Datagrid started')

import { ListColumnItemsModel } from "@zyllio/zy-sdk";
import { DataGridMetadata } from "./datagrid.metadata";

const CssContent = `

  :host {
    display: block;
    overflow: hidden;
    width: 100%;
    padding: 10px 10px;
    box-sizing: border-box;
    font-family: var(--theme-font-family);
    --gray: #aeaeae;
    --cell-width: 150px;
    --theme-primary-04:rgb(126, 126, 126);
  }
  
  .content {
    overflow-x: auto;
  }

  table {
    font-size: 16px;
    border-collapse: collapse;
    table-layout: fixed;
  }

  td, th { 
    border: 1px solid var(--gray); 
    padding: 12px 6px;
    text-align: left;
    width: var(--cell-width); 
  }

  .cell {
    word-wrap: break-word;
    overflow: hidden; 
    white-space: nowrap;
    width: var(--cell-width); 
    text-align: left;
  }

  th {
    border-top: none;
    color: var(--gray);
    font-weight: normal;
  }

  th:first-child { 
    border-left: none;
    width: 50px; 
    font-size: 0.8em;
  }

  th:last-child { 
    border-right: none; 
  }

  td:last-child { 
    border-right: none; 
  }

  td:first-child { 
    text-align: center;
    border-left: none;
  }

::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-button {
  display: none;
}

::-webkit-scrollbar-track {}

::-webkit-scrollbar-track-piece {
  background-color: var(--theme-primary-04);
}

::-webkit-scrollbar-corner {
  background-color: var(--theme-primary-04);
}

::-webkit-scrollbar-thumb {
  background-color: var(--theme-primary-06);
  border-radius: 10px !important;
}
`;


class DataGridComponent extends HTMLElement {

  shadow: ShadowRoot

  htmlElement: HTMLElement

  styleElement: HTMLElement

  data!: ListColumnItemsModel

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' })

    this.htmlElement = document.createElement('div')
    this.htmlElement.className = 'content';
    this.styleElement = document.createElement('style')
  }

  connectedCallback() {

    this.shadow.appendChild(this.styleElement)
    this.shadow.appendChild(this.htmlElement)

    this.styleElement.innerHTML = CssContent


    this.refresh()
  }

  /*static get observedAttributes() {
    return ['table']
  }

  attributeChangedCallback() {
    this.refresh()
  }*/

  async refresh() {

    this.htmlElement.innerHTML = await this.getHtmlContent()
  }

  async getHtmlContent(): Promise<string> {

    console.log("this.data ", this.data);

    const columns = this.getColumns()

    return `
      <table>
        <tr>
          <th></th>
          ${columns.map(column => `<th>${column}</th>`).join('')}
        </tr>
        ${this.data.items.map((item, index) => `
          
          <tr>
            <td>${index + 1}</td>
            ${columns.map((column) => `<td><div class="cell" >${item[column]}</div></td> `).join('')}
          <tr>

        `).join('')}          
      </table>
    `
  }

  getColumns(): string[] {
    return Object.keys(this.data.items[0]).filter(k => k !== '_id' && k !== '_index')
  }
}

zySdk.services.registry.registerComponent(DataGridMetadata, DataGridComponent)