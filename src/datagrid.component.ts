console.log('Plugin Datagrid started')

import { ColumnModel, ListColumnItemsModel } from "@zyllio/zy-sdk";
import { DataGridMetadata } from "./datagrid.metadata";

import CssContent from './datagrid.component.css';

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
        <thead><tr>
          <th></th>
          ${columns.map(column => `<th>${column.name}</th>`).join('')}
        </tr></thead>

        <tbody>
        ${this.data.items.map((item, rowIndex) => `
          
          <tr>
            <td>${rowIndex + 1}</td>
            ${columns.map((column, columnIndex) => `

              <td>
                <div class="cell"  data-row="${rowIndex}" data-column="${columnIndex}" >
                  <div class="text" contenteditable >${item[column.name]}</div>
                  ${ (column.type === 'options-1' || column.type === 'options-n') ? 
                    `<div class="menu" >
                      ${column.options!.split(',').map((option) => `<div class="option" >${option}</div>`) }                      
                    </div>` : '' }
                </div>
              </td> 
            
              `).join('')}
          <tr>

        `).join('')} 
        </tbody>         
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

    this.shadow.querySelectorAll('.option').forEach(option => {
      option.addEventListener('click', (event) => {
        this.onOptionClick(event)
      })
    })
  }

  onOptionClick(event: Event) {

    event.stopPropagation()

    const option = event.target as HTMLElement

    const cell = option.closest('.cell')!

    const text = cell.querySelector('.text')!

    text.textContent = option.innerText

    cell.classList.remove('selected')
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

    const cell = (event.target as HTMLElement).closest('.cell') as HTMLElement

    if (cell.classList.contains('selected')) {
      return
    }

    const rowIndex = cell.dataset.row

    const columnIndex = cell.dataset.column

    console.log('Cell clicked:', { rowIndex, columnIndex });

    this.shadow.querySelectorAll('div[data-row]').forEach(cell => {
      cell.classList.remove('selected')
    })

    cell.classList.add('selected')
  }

  getColumns(): ColumnModel[] {
    // return Object.keys(this.data.items[0]).filter(k => k !== '_id' && k !== '_index')
    return this.data.table.columns.filter(c => c.type !== 'relation-1' && c.type !== 'relation-n')
  }
}

zySdk.services.registry.registerComponent(DataGridMetadata, DataGridComponent)