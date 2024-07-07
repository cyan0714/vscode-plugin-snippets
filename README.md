# Shiyan Snippets

## Require

vscode version: >= 1.84.0  
node version: >= 18.15.0

## How to import vscode?

### Method 1

1. git clone https://github.com/cyan0714/vscode-plugin-snippets.git
2. npm install @vscode/vsce -g
3. excute `vsce package` in terminal, it will generate \*.vsix in project
4. import the \*.vsix to vscode  
   ![flow](https://github.com/cyan0714/vscode-plugin-snippets/blob/master/imgs/flow.png?raw=true)

### Method 2

1. download the \*.vsix to your computer
2. import the \*.vsix to vscode directly  
   ![flow](https://github.com/cyan0714/vscode-plugin-snippets/blob/master/imgs/flow.png?raw=true)

## All Snippets

### JavaScript

#### json
```js
console.log(JSON.parse(JSON.stringify($1)))
```

#### fn
```js
$1($2) {", "  $3", "},
```

#### api
```js
import {$1} from '@/api/$2';
```

#### cpn
```js
import $1 from '@/component/$1';
```

### CSS

#### single-row-ellipsis(sre)
```css
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
```

#### double-row-ellipsis(dre)
```css
display: -webkit-box;
word-break: break-all;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
overflow: hidden;
text-overflow: ellipsis;
```

#### flex(fl)
```css
display: flex;
```

#### flex-xy-center(fcc)
```css
display: flex;
justify-content: center;
align-items: center;
```

#### flex-x-center(fx)
```css
display: flex;
justify-content: center;
```

#### flex-y-center(fy)
```css
display: flex;
align-items: center;
```

#### flex-between(fb)
```css
display: flex;
justify-content: space-between;
align-items: center;
```

#### absolute-center-center(acc)
```css
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
```

#### hide-scrollbar(hs)
```scss
&::-webkit-scrollbar {
  display: none
}
```

#### shadow(shadow)
```css
box-shadow: 0 3px 6px rgba(140,149,159,0.15);
```

#### border(border)
```css
border: 1px solid #d0d7de;
```

#### border-radius(rad)
```css
border-radius: 8px;
```

#### scss variable

```json
"$mainBg": {
  "prefix": "main",
  "body": [
    "\\$mainBg",
  ],
  "description": "scss variable"
},
"$mainColor": {
  "prefix": "main",
  "body": [
    "\\$mainColor",
  ],
  "description": "scss variable"
},
"$mainBorder": {
  "prefix": "main",
  "body": [
    "\\$mainBorder",
  ],
  "description": "scss variable"
},
"$mainShadow": {
  "prefix": "main",
  "body": [
    "\\$mainShadow",
  ],
  "description": "scss variable"
},
"$mainMarginX": {
  "prefix": "main",
  "body": [
    "\\$mainMarginX",
  ],
  "description": "scss variable"
},
"$mainMarginY": {
  "prefix": "main",
  "body": [
    "\\$mainMarginY",
  ],
  "description": "scss variable"
},
"$mainMargin": {
  "prefix": "main",
  "body": [
    "\\$mainMargin",
  ],
  "description": "scss variable"
},
"$mainPaddingX": {
  "prefix": "main",
  "body": [
    "\\$mainPaddingX",
  ],
  "description": "scss variable"
},
"$mainPaddingY": {
  "prefix": "main",
  "body": [
    "\\$mainPaddingY",
  ],
  "description": "scss variable"
},
"$mainPadding": {
  "prefix": "main",
  "body": [
    "\\$mainPadding",
  ],
  "description": "scss variable"
}
```

### AVUE

#### avue-crud-page(acp)
```js
<template>
  <basic-container>
    <avue-crud :option="option"
                :table-loading="loading"
                :data="data"
                :page.sync="page"
                ref="crud"
                @search-change="searchChange"
                @search-reset="searchReset"
                @selection-change="selectionChange"
                @current-change="currentChange"
                @size-change="sizeChange"
                @refresh-change="refreshChange"
                @on-load="onLoad"
                @row-save="rowSave"
                @row-update="rowUpdate"
                @row-del="rowDel">
      <!-- <template slot="xxx" slot-scope="scope">
      </template> -->
    </avue-crud>
  </basic-container>
</template>

<script>
import { getList, remove, detail, addOrEdit } from '@/api/info/t';
export default {
  data() {
    return {
      option: {
        index: true,
        indexLabel: '序号',
        // selection: true,
        border: true,
        addBtn: false,
        editBtn: false,
        columnBtn: false,
        viewBtn: false,
        delBtn: false,
        // menu: false,
        searchMenuSpan: 6,
        column: [
          {
            label: '物料编号',
            prop: 'materialCode',
            search: true,
          },
          // {
          //   label: '物料分类',
          //   prop: 'categoryCode',
          //   search: true,
          //   type: 'tree',
          //   props: {
          //     label: 'categoryName',
          //     value: 'categoryCode'
          //   },
          //   dicUrl: '/api/purchar/cg-materiel-category/list',
          // },
        ],
      },
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      query: {},
      data: [],
      selectionList: [],
    }
  },
  computed: {},
  mounted() {
  },
  methods: {
    rowSave(form, done, loading) {
      addOrEdit(form)
        .then(res => {
          if (res.data.code === 200) {
            this.$message.success(`新增成功!`);
            done(form);
            this.onLoad(this.page);
          }
        })
        .catch(() => {
          loading();
        });
    },
    rowUpdate(form, index, done, loading) {
      addOrEdit(form)
        .then(res => {
          if (res.data.code === 200) {
            this.$message.success(`修改成功!`);
            done(form);
            this.onLoad(this.page);
          }
        })
        .catch(() => {
          loading();
        });
    },
    rowDel(form, index) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          remove(form.id).then(res => {
            if (res.data.code === 200) {
              this.$message.success(`删除成功!`);
              this.onLoad(this.page);
            }
          });
        })
        .catch(() => { });
    },
    searchReset() {
      this.query = {};
      this.onLoad(this.page);
    },
    searchChange(params, done) {
      this.query = params;
      this.page.currentPage = 1;
      this.onLoad(this.page, params);
      done();
    },
    handleComfirm() {
      // this.$emit("update:dialogVisible", false)
    },
    handleCancel() {
      // this.$emit("update:dialogVisible", false)
    },
    selectionChange(list) {
      this.selectionList = list;
    },
    currentChange(currentPage) {
      this.page.currentPage = currentPage;
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
    },
    refreshChange() {
      this.onLoad(this.page, this.query);
    },
    onLoad(page, params = {}) {
      this.loading = true;
      getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
        const data = res.data.data;
        this.data = data.records;
        this.page.total = data.total;
        this.loading = false;
      });
    }
  }
}
</script>

<style scoped lang="scss">
</style>
```

#### avue-form-crud-page(afcp)
```js
<template>
  <basic-container>
    <avue-form ref="form" :option="optionForm" v-model="form">
      <template slot="menuForm">
        <el-button icon="el-icon-search" type="primary" @click="searchChange">搜 索</el-button>
        <el-button icon="el-icon-delete" @click="searchReset">清 空</el-button>
      </template>
    </avue-form>
    <avue-crud :option="optionTable"
                :table-loading="loading"
                :data="data"
                :page.sync="page"
                ref="crud"
                @selection-change="selectionChange"
                @current-change="currentChange"
                @size-change="sizeChange"
                @refresh-change="refreshChange"
                @on-load="onLoad">
      <!-- <template slot="xxx" slot-scope="scope">
      </template> -->
    </avue-crud>
  </basic-container>
</template>

<script>
// import { getList } from '';
export default {
  data() {
    return {
      form: {},
      optionForm: {
        submitBtn: false,
        resetBtn: false,
        emptyBtn: false,
        labelWidth: 140,
        columnBtn: false,
        span: 6,
        column: [
          {
            label: '需求单编号',
            prop: 'needsNo',
          },
          {
            label: '分包状态',
            prop: 'purcharStatus',
            type: 'radio',
            dicData: [
              {
                label: '已分包',
                value: 1
              },
              {
                label: '未分包',
                value: 2
              }
            ]
          },
          {
            label: '提报部门',
            prop: 'deptId',
            type: 'tree',
            props: {
              label: 'title',
              value: 'value'
            },
            dicUrl: '/api/blade-system/dept/tree',
          },
          {
            label: "业务分类",
            prop: "businessType",
            search: true,
            type: "select",
            dicUrl: "/api/blade-system/dict-biz/dictionary?code=business_type",
            props: {
              label: "dictValue",
              value: "dictKey"
            },
          },
        ]
      },
      optionTable: {
        index: true,
        selection: true,
        border: true,
        addBtn: false,
        columnBtn: false,
        menu: false, // 是否有操作栏
        column: [
          {
            label: '物料编号',
            prop: 'materialCode',
            search: true,
          },
          // {
          //   label: '物料分类',
          //   prop: 'categoryCode',
          //   search: true,
          //   type: 'tree',
          //   props: {
          //     label: 'categoryName',
          //     value: 'categoryCode'
          //   },
          //   dicUrl: '/api/purchar/cg-materiel-category/list',
          // },
        ],
      },
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      query: {},
      data: [],
      selectionList: [],
    }
  },
  computed: {},
  mounted() {
  },
  methods: {
    searchReset() {
      this.$refs.form.resetForm()
      this.query = {};
      this.onLoad(this.page);
    },
    searchChange() {
      this.query = this.form;
      this.page.currentPage = 1;
      this.onLoad(this.page);
    },
    handleConfirm() {
      // this.emit("update:dialogVisible", false)
    },
    handleCancel() {
      // this.emit("update:dialogVisible", false)
    },
    selectionChange(list) {
      this.selectionList = list;
    },
    currentChange(currentPage) {
      this.page.currentPage = currentPage;
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
    },
    refreshChange() {
      this.onLoad(this.page);
    },
    onLoad(page, params = {}) {
      this.loading = true;
      getList(page.currentPage, page.pageSize, this.query).then(res => {
        const data = res.data.data;
        this.data = data.records;
        this.page.total = data.total;
        this.loading = false;
      });
    }
  }
}
</script>

<style scoped lang="scss">
</style>

```

#### avue-edit-page(aep)
```js
<template>
  <basic-container>
    <avue-crud
      :option="option"
      :table-loading="loading"
      :data="data"
      :page.sync="page"
      ref="crud"
      @search-change="searchChange"
      @search-reset="searchReset"
      @selection-change="selectionChange"
      @current-change="currentChange"
      @size-change="sizeChange"
      @refresh-change="refreshChange"
      @on-load="onLoad"
      @row-save="rowSave"
      @row-del="rowDel">
      <template #menu="{ size, row, type }">
        <el-button icon="el-icon-document" :size="size" :type="type" @click="modItem(row,'detail')">查看</el-button>
        <el-button icon="el-icon-edit" :size="size" :type="type" @click="modItem(row,'edit')">编辑</el-button>
      </template>
    </avue-crud>
     <el-dialog
      title="详情"
      width="80%"
      append-to-body
      :visible.sync="dialogVisible">
      <avue-form :option="formDataOption" v-model="formData" ref="formData"></avue-form>
      <span slot="footer" v-if="dialogTitle === '修改'" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="rowUpdate">确 定</el-button>
      </span>
    </el-dialog>
  </basic-container>
</template>

<script>
import { getList, remove, detail, addOrEdit } from '@/api/info/t';
export default {
  data() {
    return {
      dialogTitle: '修改',
      dialogVisible: false,
      formData: {},
      formDataOption: {
        submitBtn: false,
        emptyBtn: false,
        span: 12,
        detail: false,
        labelWidth: 120,
        column: [
          {
            label: '负责人姓名',
            prop: 'companionName',
          },
          {
            label: '客户名称',
            prop: 'customerId',
            dicUrl: '/api/house/jf-customer/list',
            props: {
              label: 'customerName',
              value: 'id',
            },
            type: 'select',
          },
          {
            label: '电表度数',
            prop: 'electricityNum',
            type: 'number',
            minRow: 0
          },
          {
            label: '水表度数',
            prop: 'waterNum',
            type: 'number',
            minRow: 0
          },
          {
            label: '资源名称',
            prop: 'houseId',
            dicUrl: '/api/house/jf-house/list',
            props: {
              label: 'houseName',
              value: 'id',
            },
            type: 'select',
          },
          {
            label: '验房时间',
            type: 'date',
            prop: 'inspectionDate',
            value: 'yyyy-MM-dd',
            valueFormat: 'yyyy-MM-dd',
          },
          {
            label: '验房状态',
            prop: 'inspectionStatus',
            type: 'select',
            dicUrl: '/api/blade-system/dict-biz/dictionary?code=inspection_status',
            props: {
              label: 'dictValue',
              value: 'dictKey',
            },
          },
          {
            label: '备注',
            prop: 'backup',
          },
          {
            label: '附件',
            prop: 'fileList',
            type: 'upload',
            dataType: 'object',
            props: {
              label: 'fileName',
              value: 'fileUrl',
            },
            span: 24,
            propsHttp: {
              url: 'link',
              name: 'originalName',
              res: 'data',
            },
            action: '/api/blade-resource/oss/endpoint/put-file',
          },
        ],
      },
      option: {
        index: true,
        indexLabel: '序号',
        // selection: true,
        border: true,
        // addBtn: false,
        // editBtn: true,
        columnBtn: false,
        viewBtn: false,
        editBtn: false,
        // menu: false, // 是否有操作栏
        searchMenuSpan: 6, // 搜索按钮是否单独成行
        column: [
          {
            label: '负责人姓名',
            prop: 'companionName',
          },
          {
            label: '客户名称',
            prop: 'customerId',
            dicUrl: '/api/house/jf-customer/list',
            props: {
              label: 'customerName',
              value: 'id',
            },
            type: 'select',
            search: true,
            filterable: true,
          },
          {
            label: '电表度数',
            prop: 'electricityNum',
            type: 'number',
            minRow: 0
          },
          {
            label: '水表度数',
            prop: 'waterNum',
            type: 'number',
            minRow: 0
          },
          {
            label: '资源名称',
            prop: 'houseId',
            dicUrl: '/api/house/jf-house/list',
            props: {
              label: 'houseName',
              value: 'id',
            },
            type: 'select',
            search: true,
            filterable: true,
          },
          {
            label: '验房时间',
            type: 'date',
            prop: 'inspectionDate',
            format: 'yyyy-MM-dd',
            valueFormat: 'yyyy-MM-dd',
          },
          {
            label: '验房状态',
            prop: 'inspectionStatus',
            type: 'select',
            dicUrl: '/api/blade-system/dict-biz/dictionary?code=inspection_status',
            props: {
              label: 'dictValue',
              value: 'dictKey',
            },
            search: true,
            filterable: true,
          },
          {
            label: '备注',
            prop: 'backup',
          },
          {
            label: '附件',
            prop: 'fileList',
            type: 'upload',
            dataType: 'object',
            props: {
              label: 'fileName',
              value: 'fileUrl',
            },
            span: 24,
            propsHttp: {
              url: 'link',
              name: 'originalName',
              res: 'data',
            },
            action: '/api/blade-resource/oss/endpoint/put-file',
            hide: true
          },
        ],
      },
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      query: {},
      data: [],
      selectionList: [],
    };
  },
  computed: {},
  created() {
  },
  mounted() {},
  methods: {
    // 点击查看或修改
    modItem(row,type) {
      if(type === 'detail') {
        this.formDataOption.detail = true
        this.dialogTitle = '详情'
      } else {
        this.formDataOption.detail = false
        this.dialogTitle = '修改'
      }
      this.dialogVisible = true
      detail(row.id).then(res => {
        this.formData = res.data.data
      });
    },

    // 新增
    rowSave(form, done, loading) {
      if (form.fileList.length > 0) {
        form.fileList.forEach( item => {
          item.fileType = 1 // 验房文件类型为1
        })
      }
      addOrEdit(form)
        .then(res => {
          if (res.data.code === 200) {
            this.$message.success(`新增成功!`);
            done(form);
            this.onLoad(this.page);
          }
        })
        .catch(() => {
          loading();
        });
    },

    // 确认修改
    rowUpdate() {
      this.$refs.formData.validate((vaild, done) => {
        if (vaild) {
          if(this.formData.fileList.length > 0) {
            this.formData.fileList.forEach( item => {
              item.fileType = 1 // 验房文件类型为1
            })
          }
          let params = {
            ...this.formData
          }
          addOrEdit(params).then(() => {
              this.onLoad(this.page);
              this.$message({
                type: "success",
                message: "操作成功!"
              });
              done()
              this.dialogVisible = false
              this.$refs.formData.clearValidate()
          }, error => {
              window.console.log(error);
              done();
          })
        }
      })
    },
    rowDel(form, index) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          remove(form.id).then(res => {
            if (res.data.code === 200) {
              this.$message.success(`删除成功!`);
              this.onLoad(this.page);
            }
          });
        })
        .catch(() => {});
    },
    searchReset() {
      this.query = {};
      this.onLoad(this.page);
    },
    searchChange(params, done) {
      this.query = params;
      this.page.currentPage = 1;
      this.onLoad(this.page, params);
      done();
    },
    handleComfirm() {
      // this.emit("update:dialogVisible", false)
    },
    handleCancel() {
      // this.emit("update:dialogVisible", false)
    },
    selectionChange(list) {
      this.selectionList = list;
    },
    currentChange(currentPage) {
      this.page.currentPage = currentPage;
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
    },
    refreshChange() {
      this.onLoad(this.page, this.query);
    },
    onLoad(page, params = {}) {
      this.loading = true;
      getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
        const data = res.data.data;
        this.data = data.records;
        this.page.total = data.total;
        this.loading = false;
      });
    },
  },
};
</script>

<style scoped lang="scss"></style>

```

#### avue-slot-status(ass)
```js
<template slot="status" slot-scope="{ row }">
  <el-switch v-model="row.status" active-color="#409EFF" :active-value="0" :inactive-value="1" @change="changeStatus(row, row.status)"/>
</template>
```

#### avue-radio(ar)
```js
{
  label: "是否当月销售当月开票",
  prop: "currentSaleInvoice",
  type: "radio",
  dicData: [
    {
      label: "是",
      value: 0,
    },
    {
      label: "否",
      value: 1,
    },
  ],
  width: 150,
  cell: true,
},
```

#### avue-dict(ad)
```js
{
  label: '',
  prop: '',
  type: 'select',
  dicUrl: '/api/blade-system/dict-biz/dictionary?code=',
  props: {
    label: 'dictValue',
    value: 'dictKey',
  },
}
```

#### avue-date(ad)
```js
{
  label: '验房时间',
  type: 'date',
  prop: 'inspectionDate',
  format: 'yyyy-MM-dd',
  valueFormat: 'yyyy-MM-dd',
},
```

#### avue-slot-menuLeft(asm)
```js
<template slot="menuLeft">
  <el-button
    type="primary"
    plain
    icon="el-icon-plus"
    size="mini"
    @click="handleAdd"
    >新增</el-button
  >
</template>
```

#### avue-slot-menu(asm)
```js
<template slot-scope="{ row, type, size }" slot="menu">
  <el-button icon="el-icon-document" :size="size" :type="type" @click="modItem(row,'detail')">查看</el-button>
  <el-button icon="el-icon-edit" :size="size" :type="type" @click="modItem(row,'edit')">编辑</el-button>
  <el-button icon="el-icon-delete" :size="size" :type="type" @click="rowDel(row)">删除</el-button>
</template>
```

#### avue-attachment(aa)
```js
{
  label: '附件',
  prop: 'fileList',
  type: 'upload',
  dataType: 'object',
  props: {
    label: 'fileName',
    value: 'fileUrl',
  },
  span: 24,
  propsHttp: {
    url: 'link',
    name: 'originalName',
    res: 'data',
  },
  action: '/api/blade-resource/oss/endpoint/put-file',
},
```

#### avue-change-status(acs)
```js
changeStatus(row) {
  let params = {
      id: row.id,
      status: row.status
  }
  this.$confirm('确认要执行此操作吗？').then(() => {
      return setStatus(params);
  }).then(() => {
      this.$message.success("操作成功");
  }).catch(() => {
      row.status = row.status === 0 ? 1 : 0;
  });
},
```

#### avue-crud-api(aca)
```js
import request from '@/router/axios';

// 分页查询
export const getList = (current, size, params) => {
  return request({
    url: '/api/house/jf-t/pages',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    },
  });
};

// 删除
export const remove = id => {
  return request({
    url: `/api/house/jf-t/delete/${id}`,
    method: 'delete',
  });
};

// 详情
export const detail = id => {
  return request({
    url: `/api/house/jf-t/${id}`,
    method: 'get',
  });
}

// 新增/修改
export const addOrEdit = data => {
  return request({
    url: `/api/house/jf-t/addOrEdit`,
    method: 'post',
    data,
  });
}
```

### Element-UI

#### el-button-danger(ebd)
```html
<el-button type="danger"></el-button>
```

#### el-button-success(ebs)
```html
<el-button type="success"></el-button>
```

#### el-button-warning(ebw)
```html
<el-button type="warning"></el-button>
```

#### el-button-primary(ebp)
```html
<el-button type="primary"></el-button>
```

#### el-button-info(ebi)
```html
<el-button type="info"></el-button>
```

#### el-checkbox(ec)
```html
<el-checkbox v-model="checked">备选项</el-checkbox>
```

#### el-confirm(ec)
```js
const operation = '删除'
this.$confirm(`是否确认${ operation }?`, '提示', {
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  type: 'warning'
}).then(() => {
  this.$message({
    type: 'success',
    message: `${ operation }成功!`
  });
}).catch(() => {
});
```

#### el-confirm-cancel(ecc)
```js
this.confirm(`是否审核通过?`, '提示', {
  confirmButtonText: '通过',
  cancelButtonText: '不通过',
  distinguishCancelAndClose: true,
  type: 'warning',
})
  .then(() => {
    approve({
      id: row.id,
      status: 1,
    }).then(res => {
      if (res.data.code == 200) {
        this.message({
          type: 'success',
          message: `操作成功!`,
        });
        this.onLoad(this.page);
      }
    });
  })
  .catch((action) => {
    if (action === 'cancel') {
      approve({
        id: row.id,
        status: 2,
      }).then(res => {
        if (res.data.code == 200) {
          this.message({
            type: 'success',
            message: `操作成功!`,
          });
          this.onLoad(this.page);
        }
      });
    }
  });
```

#### el-date-picker(edp)
```html
<el-date-picker
  v-model="value1"
  type="datetimerange"
  value-format="yyyy-MM-dd HH:mm:ss"
  range-separator="至"
  start-placeholder="开始日期"
  end-placeholder="结束日期">
</el-date-picker>
```

#### el-descriptions(ed)
```html
<el-descriptions :column="1">
    <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
    <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
    <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
    <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
</el-descriptions>
```

#### el-dialog(ed)
```html
<el-dialog
  title="提示"
  width="30%"
  destroy-on-close
  append-to-body
  :visible.sync="dialogVisible">
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
```

#### element-form-table-template(eftt)
```js
<template>
  <div class="popup-container">
    <el-dialog title="提示" width="80%" :visible.sync="isShowDlg" :before-close="handleCancel">
      <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="100px">
        <el-form-item label="label" prop="xxx">
          <el-input v-model="queryParams.xxx" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="list" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column label="序号" type="index" width="55" align="center" />
        <el-table-column label="列名" align="center" prop="columnName" />
      </el-table>

      <pagination
        v-if="total > 0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList" />

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleComfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'commonDlg',
  components: {},
  data() {
    return {
      list: [],
      multipleSelection: [],
      total: 0,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      },
    }
  },
  props: {
    isShowDlg: {
      type: Boolean,
      default: false
    }
  },
  computed: {},
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getList(this.queryParams).then(res => {
        this.list = res.data.records
        this.total = Number(res.data.total);
      })
    },
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    handleReset() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleComfirm() {
      // this.emit("confirm", this.multipleSelection)
      this.emit("update:isShowDlg", false)
    },
    handleCancel() {
      this.emit("update:isShowDlg", false)
    }
  }
}
</script>

<style scoped lang="scss">
.popup-container {
}
</style>
```

#### el-confirm-fn(ecf)
```js
handleConfirm(operation, api, id) {
  this.confirm(`是否确认${ operation || '' }?`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    api(id).then(res => {
      if (res.data.code === 200) {
        this.message({
          type: 'success',
          message: `${operation || '操作'}成功!`
        });
        this.refreshChange()
      }
    })
  }).catch(() => {
  });
},
        
```

#### el-input(ei)
```html
<el-input v-model="input" placeholder="请输入内容"></el-input>
```

#### el-message(eme)
```js
this.$message.error('错了哦，这是一条错误消息')
```

#### el-message(ems)
```js
this.$message.success('操作成功！')
```

#### el-message(emw)
```js
this.$message.warning('警告哦，这是一条警告消息')
```

#### el-radio(er)
```html
<el-radio v-model="radio" label="1">备选项</el-radio>
```

#### el-select(es)
```html
<el-select v-model="value" placeholder="请选择">
  <el-option
    v-for="item in options"
    :key="item.value"
    :label="item.label"
    :value="item.value">
  </el-option>
</el-select>
```

#### el-select-options(eso)
```js
options: [
  {
    value: '选项1',
    label: '黄金糕'
  },
  {
    value: '选项2',
    label: '双皮奶'
  },
  {
    value: '选项3',
    label: '蚵仔煎'
  },
],
```

#### el-validate(ev)
```js
this.refs[formName].validate((valid) => {
  if (valid) {
     
  }
})       
```

### Vue

#### bind-img(bi)
```html
<img :src="require(`@/imgs/${}`)" alt="">
```

#### bind-background(bb)
```js
backgroundStyle(imgUrl) {
  return {
    backgroundImage: `url(${imgUrl})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
  };
},
```

#### vue-template(vue)
```json
<template>
  <div class="$TM_FILENAME_BASE"></div>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  },
  props: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="scss">
.$TM_FILENAME_BASE {

}
</style>
```

#### v-for(vf)
```html
<div v-for="(item, index) in list"
   :class="['list-item', currentIndex === index ? 'list-item-actived' : '']"
   :key="index"
   @click="handleClick(index)">
</div>
```

### Szhn

#### szhn-date-picker-datetime(sdpp)

#### szhn-date-picker-datetimerange(sdpp)

#### szhn-select(ss)

#### szhn-radio-group(srg)

#### szhn-table-page(stp)

#### szhn-table-page-dialog(stpd)