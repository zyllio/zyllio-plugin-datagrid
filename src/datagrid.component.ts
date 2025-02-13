console.log('Plugin Datagrid started')

import { DataGridMetadata } from "./datagrid.metadata";

const CssContent = `
  :host {
    display: block;
    overflow: hidden;
    width: 100%;
    height: 50px;
    padding: 10px 10px;
    box-sizing: border-box;
  }
  
  .content {
    height: 100%; 
    background-color: var(--theme-tertiary-color);
    border-radius: var(--border-radius);
  }
`;

const HtmlContent = `
  <div>DATAGRID</div>                       
`;

class DataGridComponent extends HTMLElement {

  shadow: ShadowRoot

  htmlElement: HTMLElement

  styleElement: HTMLElement

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
    this.htmlElement.innerHTML = HtmlContent

    this.refresh()
  }

  static get observedAttributes() {
    return ['value'];
  }

  attributeChangedCallback() {
    this.refresh()
  }

  async refresh() {

    const value = this.getAttribute('value')

    
  }
}

zySdk.services.registry.registerComponent(DataGridMetadata, DataGridComponent)