console.log('Plugin Datagrid started')

import { ColumnModel, ListColumnItemModel, ListColumnItemsModel } from "@zyllio/zy-sdk";
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

  search = ''

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
  }

  async refresh() {

    this.htmlElement.innerHTML = await this.getHtmlContent()

    await this.postRefresh()
  }

  getFilteredData(): ListColumnItemModel[] {

    const result = this.data.items
      .filter(item => Object.values(item).some(value => value.toLowerCase().includes(this.search.toLowerCase())))

    return result
  }

  async getHtmlContent(): Promise<string> {

    console.log("this.data ", this.data);

    const columns = this.getColumns()

    const filteredData = this.getFilteredData()

    return `

      <div class="toolbar">        
        <zyllio-sdk-search value="${this.search}" ></zyllio-sdk-search>
      </div>

      <table>
        <thead><tr>
          <th><div class="header" ></div></th></th>
          ${columns.map(column => `<th><div class="header" >${column.name}</div></th>`).join('')}
        </tr></thead>

        <tbody>
        ${filteredData.map((item, rowIndex) => `
          
          <tr>
            <td>${rowIndex + 1}</td>
            ${columns.map((column, columnIndex) => `

              <td>
                <div class="cell"  data-row="${rowIndex}" data-column="${columnIndex}" >
                  <div class="text" contenteditable >${item[column.name]}</div>
                  ${(column.type === 'options-1' || column.type === 'options-n') ?
        `<div class="menu" >
                      ${column.options!.split(',').map((option) => `<div class="option" >${option}</div>`)}                      
                    </div>` : ''}
                </div>
              </td> 
            
              `).join('')}
          <tr>

        `).join('')} 

        ${ (filteredData.length === 0) ? `<tr><td></td><td colspan="100" class="no-data" ><div>Aucune donnée disponible</div></td></tr>`: '' }
        </tbody>         
      </table>
      
      <div class="button" >Ajouter</div>
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

      cell.addEventListener('blur', (event: Event) => {
        this.onBlurClick(event)
      })
    })

    this.shadow.querySelectorAll('.option').forEach(option => {
      option.addEventListener('click', (event) => {
        this.onOptionClick(event)
      })
    })

    this.shadow.querySelector<HTMLElement>('zyllio-sdk-search')!.onblur = () => {

      this.search = this.shadow.querySelector<HTMLInputElement>('zyllio-sdk-search')!.value

      this.refresh()
    }

    this.shadow.querySelector<HTMLElement>('.button')!.onclick = () => {

      this.dispatchEvent(new CustomEvent('trigger-action', {
        detail: { action: 'create-action' }
      }))
    }
  }

  onOptionClick(event: Event) {

    event.stopPropagation()

    const option = event.target as HTMLElement

    const cell = option.closest('.cell')!

    const text = cell.querySelector('.text')!

    text.textContent = option.innerText

    this.dispatchEvent(new CustomEvent('trigger-action', {
      detail: { action: 'update-action' }
    }))

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

  onBlurClick(event: Event) {
    this.dispatchEvent(new CustomEvent('trigger-action', {
      detail: { action: 'update-action' }
    }))
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

    this.dispatchEvent(new CustomEvent('selected', {
      detail: { selection: this.data.items[0] }
    }))
  }

  getColumns(): ColumnModel[] {
    return this.data.table.columns.filter(c => c.type !== 'relation-1' && c.type !== 'relation-n')
  }
}

zySdk.services.registry.registerComponent(DataGridMetadata, DataGridComponent)