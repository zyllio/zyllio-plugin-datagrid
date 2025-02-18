import { ComponentMetadataModel } from "@zyllio/zy-sdk";

const IconData = `
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="24" viewBox="0 0 24 24" fill="#cccccc">    
    <path d="M10,4V8H14V4H10M16,4V8H20V4H16M16,10V14H20V10H16M16,16V20H20V16H16M14,20V16H10V20H14M8,20V16H4V20H8M8,14V10H4V14H8M8,8V4H4V8H8M10,14H14V10H10V14M4,2H20A2,2 0 0,1 22,4V20A2,2 0 0,1 20,22H4C2.92,22 2,21.1 2,20V4A2,2 0 0,1 4,2Z" />
  </svg> 
`;

export const DataGridMetadata: ComponentMetadataModel = {
  id: 'custom-datagrid',
  metadataVersion: 2,
  icon: IconData,
  label: 'Data grid',
  category: 'Plugins',
  subCategory: 'Plugins',
  hidden: false,
  properties: [{
    id: 'selection',
    name: 'Selection',
    type: 'row-variable',
    tootip: '',
    default: '',
    write: true
  }, {
    id: 'data',
    name: 'Table',
    type: 'table',
    tootip: 'The table being used to populate',
    default: '',
    main: true
  }, {
    id: 'filter',
    name: 'Filter',
    type: 'filter',
    tootip: 'Filter the table rows',
    default: ''
  }, {
    id: 'update-action',
    name: 'Update action',
    type: 'action',
    tootip: '',
    default: ''
  }, {
    id: 'create-action',
    name: 'Create action',
    type: 'action',
    tootip: '',
    default: ''
  }, {
    id: 'delete-action',
    name: 'Delete action',
    type: 'action',
    tootip: '',
    default: ''
  }],
  styles: [
  ]
}