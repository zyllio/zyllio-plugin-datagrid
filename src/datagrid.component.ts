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
    --scrollbar-background: #fff;
    --scrollbar-foreground: #b1b1b1;
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
    text-align: left;
    width: var(--cell-width); 
  }

  th {
    border-top: none;
    color: var(--gray);
    font-weight: normal;
    padding: 12px 6px;
  }

  th:first-child { 
    border-left: none;
    width: 50px; 
    
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
    color: var(--gray);
    font-size: 0.7em;
  }

  .cell {
    position: relative;
    word-wrap: break-word;
    overflow: hidden; 
    white-space: nowrap;
    width: var(--cell-width); 
    text-align: left;
    padding: 12px 6px;
  }

  .cell.selected::before {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    content: '';
    background-color: var(--theme-secondary-color);
    opacity: 0.3;
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
  background-color: var(--scrollbar-background);
}

::-webkit-scrollbar-corner {
  background-color: var(--scrollbar-background);
}

::-webkit-scrollbar-thumb {
  background-color: var(--scrollbar-foreground);
  border-radius: 10px !important;
}
`;

type SelectionModel = {
  row: number,
  column: number
} | undefined


class DataGridComponent extends HTMLElement {

  shadow: ShadowRoot

  htmlElement: HTMLElement

  styleElement: HTMLElement

  data!: ListColumnItemsModel

  selection: SelectionModel

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' })

    this.htmlElement = document.createElement('div')
    this.htmlElement.className = 'content';
    this.styleElement = document.createElement('style')
  }

  async connectedCallback() {

    this.shadow.appendChild(this.styleElement)
    this.shadow.appendChild(this.htmlElement)

    this.styleElement.innerHTML = CssContent

    await this.refresh()

    await this.postRefresh()
  }

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
        ${this.data.items.map((item, rowIndex) => `
          
          <tr>
            <td>${rowIndex + 1}</td>
            ${columns.map((column, columnIndex) => `<td><div class="cell" data-row="${rowIndex}" data-column="${columnIndex}" >${item[column]}</div></td> `).join('')}
          <tr>

        `).join('')}          
      </table>
    `
  }

  async postRefresh() {

    this.shadow.querySelectorAll('div[data-row]').forEach(cell => {
      cell.addEventListener('click', (event) => {
        this.onCellClick(event)
      })

      cell.addEventListener('keydown', (event: Event) => {
        this.onCellkeydown(event as KeyboardEvent)
      })

    })
  }

  onCellkeydown(event: KeyboardEvent) {

    // Empêche le comportement par défaut (ajout d'un <div>)
    if (event.key === 'Enter') {

      event.preventDefault()

      const br = document.createElement('br')

      const selection = window.getSelection()!

      const range = selection.getRangeAt(0)

      range.deleteContents()
      range.insertNode(br)
      range.setStartAfter(br)
      range.collapse(true)

      selection.removeAllRanges()
      selection.addRange(range)
    }
  }

  onCellClick(event: Event) {

    const cell = event.target as HTMLElement

    if (cell.classList.contains('selected')) {
      cell.setAttribute('contenteditable', '')
      return
    }

    const rowIndex = cell.dataset.row

    const columnIndex = cell.dataset.column

    const value = cell.textContent; // Contenu de la cellule

    console.log('Cell clicked:', { rowIndex, columnIndex, value });

    this.shadow.querySelectorAll('div[data-row]').forEach(cell => {
      cell.classList.remove('selected')
      cell.removeAttribute('contenteditable')
    })

    cell.classList.add('selected')
  }

  getColumns(): string[] {
    return Object.keys(this.data.items[0]).filter(k => k !== '_id' && k !== '_index')
  }

  /*static get observedAttributes() {
    return ['table']
  }

  attributeChangedCallback() {
    this.refresh()
  }*/
}

zySdk.services.registry.registerComponent(DataGridMetadata, DataGridComponent)