import React from 'react'

import SubItemNoCell from './components/SubItemNoCell'

import StateCell from "@/components/SetTableCell/StateCell"
import RemoveButton from '@/components/SetTableCell/RemoveButton'
import InputCellEditor from '@/components/SetTableCell/InputCellEditor'
import ImagesCell from "@/components/SetTableCell/ImagesCell"
import AuthSet from '@/components/SetTableCell/AuthSet'


export const isContains = [{
  value: 'Contains',
  label: '包含',
}, {
  value: 'Equals',
  label: '等于',
}]

export const batchOperate = [{
    label: '分类',
    key: '1',

  },
  {
    label: '删除',
    key: '2',

  },
  {
    label: '单位',
    key: '3',

  },
  {
    label: '供应商',
    key: '4',

  },
  {
    label: '默认仓库',
    key: '5',

  },
  {
    label: '负库存状态',
    key: '6',

  }
]

export const itemColumnDefs = [{
    headerName: "",
    width: 50,
    headerComponent: AuthSet,
    cellClass: 'grid_serial',
    pinned: 'left',
    cellRenderer: params => params.rowIndex + 1

  },
  {
    headerName: '',
    width: 40,
    headerCheckboxSelection: true,
    checkboxSelection: true,
    showDisabledCheckboxes: true,
    pinned: 'left',
    cellRenderer: params => {}
  },
  {
    headerName: '',
    field: 'picPath',
    width: 44,
    resizable: false,
    sortable: true,
    pinned: 'left',
    cellStyle: {
      padding: 0
    },
    cellRendererSelector: (params) => {
      return {
        component: ImagesCell,
      };
    },

  },
  {
    headerName: '商品名称',
    field: 'itemName',
    resizable: true,
    filter: true,
    sortable: true,
    pinned: 'left',
  },
  {
    headerName: '商品编码',
    field: 'itemNo',
    resizable: true,
    filter: true,
    sortable: true
  },
  {
    headerName: '体积',
    field: 'volume',
    resizable: true,
    width: 80,
    filter: true,
    sortable: true
  },
  {
    headerName: '件数',
    field: 'packageQty',
    resizable: true,
    filter: true,
    width: 80,
    sortable: true
  },
  {
    headerName: '类型',
    field: 'cate',
    resizable: true,
    filter: true,
    width: 80,
    sortable: true
  },
  {
    headerName: '供应商',
    field: 'suppName',
    resizable: true,
    filter: true,
    sortable: true
  },
  {
    headerName: '采购价',
    field: 'costPrice',
    resizable: true,
    filter: true,
    width: 120,
    sortable: true
  },
  {
    headerName: '销售价',
    field: 'price',
    resizable: true,
    filter: true,
    width: 120,
    sortable: true
  },
  {
    headerName: '安全库存',
    field: 'safeQty',
    resizable: true,
    filter: true,
    width: 140,
    sortable: true
  },
  {
    headerName: '状态',
    field: 'status',
    resizable: true,
    filter: true,
    sortable: true,
    cellRendererSelector: (params) => {
      return {
        component: StateCell,
      };
    }

  },
  {
    headerName: '备注',
    field: 'remark',
    resizable: true,
    filter: true,
    sortable: true
  }
];

export const subColumnItem = [{
    headerName: '',
    maxWidth: 50,
    cellClass: 'grid_serial',
    cellRenderer: params => params.rowIndex + 1
  },
  {
    headerName: '',
    field: 'picPath',
    width: 40,
    resizable: false,
    sortable: true,
    cellStyle: {
      padding: 0
    },
    cellRendererSelector: (params) => {
      return {
        component: ImagesCell,
      };
    },
  },
  {
    headerName: '商品名称',
    field: 'itemName',
    resizable: true,
    filter: true,
    sortable: true
  },
  {
    headerName: '商品编码',
    field: 'itemNo',
    resizable: true,
    filter: true,
    sortable: true
  },
  {
    headerName: '体积',
    field: 'volume',
    resizable: true,
    filter: true,
    sortable: true
  },
  {
    headerName: '件数',
    field: 'packageQty',
    resizable: true,
    filter: true,
    sortable: true
  },
  {
    headerName: '供应商',
    field: 'suppName',
    resizable: true,
    filter: true,
    sortable: true
  },
  {
    headerName: '采购价',
    field: 'costPrice',
    resizable: true,
    filter: true,
    sortable: true
  },
  {
    headerName: '销售价',
    field: 'price',
    resizable: true,
    filter: true,
    sortable: true
  },
  {
    headerName: '安全库存',
    field: 'safeQty',
    resizable: true,
    filter: true,
    sortable: true
  },
  {
    headerName: '状态',
    field: 'status',
    resizable: true,
    filter: true,
    sortable: true,
    cellRendererSelector: (params) => {
      return {
        component: StateCell,
      };
    }
  },
  {
    headerName: '备注',
    field: 'remark',
    resizable: true,
    filter: true,
    sortable: true
  }
];

export const editSubColumnItem = [{
    headerName: "",
    width: 50,
    editable: false,
    cellClass: 'grid_serial',
    cellRenderer: params => params.rowIndex + 1
  },
  {
    headerName: '',
    width: 40,
    editable: false,
    headerCheckboxSelection: true,
    checkboxSelection: true,
    showDisabledCheckboxes: true,
    cellRenderer: params => {}
  },
  {
    headerName: '',
    field: 'picPath',
    width: 40,
    resizable: false,
    editable: false,
    cellStyle: {
      padding: 0
    },
    cellRendererSelector: (params) => {
      return {
        component: ImagesCell,
      };
    },
  },
  {
    headerName: '商品名称',
    field: 'itemName',
    resizable: true,

  },
  {
    headerName: '商品编码',
    field: 'itemNo',
    resizable: true,
    cellRenderer: params => {
      console.log(params);
      return `${params.value || ''}  `
    }
  },
  {
    headerName: '体积',
    field: 'volume',
    width: 70,

  },
  {
    headerName: '件数',
    field: 'packageQty',
    width: 70,

  },
  {
    headerName: '数量',
    field: 'num',
    width: 70,

  },
  {
    headerName: '状态',
    field: 'status',
    width: 70,
    cellRendererSelector: (params) => {
      return {
        component: StateCell,
      };
    }
  },


];

export const subColumnEditItem = [{
    headerName: "",
    width: 40,
    cellClass: 'grid_serial',
    editable: false,
    cellRenderer: (params) => {
      return (params.rowIndex + 1)
    }
  },
  {
    headerName: '图片',
    field: 'picPath',
    width: 60,
    resizable: false,
    editable: false,
    cellStyle: {
      padding: 0
    },
    cellRendererSelector: (params) => {
      return {
        component: ImagesCell,
      };
    }
  },
  {
    headerName: '商品名称',
    field: 'itemName',
    resizable: true,
    editable: false,
  },
  {
    headerName: '商品编码',
    field: 'itemNo',
    resizable: true,
    editable: true,
    cellEditor: InputCellEditor,

  },
  {
    headerName: '数量',
    field: 'itemNum',
    resizable: true,
    editable: true,
    cellEditor: InputCellEditor,

  },
  {
    headerName: '件数',
    field: 'packageQty',
    resizable: true,
    editable: false,
    width: 160,

  },
  {
    headerName: '操作',
    field: 'status',
    pinned: "right",
    editable: false,
    width: 90,
    cellRendererSelector: (params) => {
      return {
        component: SubItemNoCell
      };
    }
  }
];

export const subColumnEditItem1 = [{
    headerName: "",
    width: 70,
    headerComponent: AuthSet,
    cellClass: 'grid_serial',
    cellRenderer: (params) => {
      return (params.rowIndex + 1)
    }
  },
  {
    field: 'key',
    headerName: '',
    width: 40,
    headerCheckboxSelection: true,
    checkboxSelection: true,
    showDisabledCheckboxes: true,
    cellRenderer: params => {}
  },
  {
    headerName: '',
    field: 'picPath',
    width: 60,
    resizable: false,
    sortable: true,
    cellStyle: {
      padding: 0
    },
    cellRendererSelector: (params) => {
      return {
        component: ImagesCell,
      };
    }
  },
  {
    headerName: '商品名称',
    field: 'itemName',
    resizable: true,
    filter: true,
    sortable: true
  },
  {
    headerName: '商品编码',
    field: 'itemNo',
    resizable: true,
    filter: true,
    sortable: true,
  },
  {
    headerName: '体积',
    field: 'volume',
    resizable: true,
    filter: true,
    sortable: true
  },
  {
    headerName: '件数',
    field: 'packageQty',
    resizable: true,
    filter: true,
    sortable: true
  },
  {
    headerName: '数量',
    field: 'packageQty',
    resizable: true,
    filter: true,
    sortable: true,
    editable: true,
  },
  {
    headerName: '状态',
    field: 'status',
    resizable: true,
    filter: true,
    sortable: true,
    cellRendererSelector: (params) => {
      return {
        component: StateCell,
      };
    }
  },
  {
    headerName: '操作',
    field: '',
    width: 80,
    pinned: 'right',
    cellRendererSelector: (params) => {
      return {
        component: RemoveButton,
      };
    },
  }
];