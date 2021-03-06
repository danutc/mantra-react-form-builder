import React from 'react'
import deepmerge from 'deepmerge'

// --------------------------------------------------------------------------------
// Common properties for each object
// --------------------------------------------------------------------------------
var commonEditFormSchema = {
  type: 'object',
  title: 'General',

  properties: {
    label: { type: 'string', title: 'Label' },
    class: { type: 'string', title: 'Class' },
    name: { type: 'string', title: 'Name' },
    defaultValue: { type: 'string', title: 'Default Value' },
    placeHolder: { type: 'string', title: 'Place Holder' },
    hint: { type: 'string', title: 'Hint' },
    depth: { type: 'number', title: 'Depth of the element' }
  }
}

var checkboxEditFormSchema = deepmerge(commonEditFormSchema, {
  properties: {
    checked: { type: 'boolean', 'title': 'Checked by default'},
    defaultValue: undefined,
    placeHolder: undefined,
    hint: undefined
  }
})

// --------------------------------------------------------------------------------
// Element Definition
// --------------------------------------------------------------------------------
const elements = {
  'label': {
    def: {
      type: 'label'
    },
    edit: 'false'
  },
  'object': {
    def: {
      type: 'string', title: ' '
    },
    ui: {
      'ui:widget': 'object'
    },
    widget: { 'object': 'widgetLoader::object' },
    edit: false,
    editSchema: commonEditFormSchema
  },
  // need to put def inside items to formalize the recursion when creating the preivew form
  'array': {
    def: {
      type: 'string', title: ' '
    },
    ui: {
      'ui:widget': 'array'
    },
    widget: { 'array': 'widgetLoader::array' },
    edit: false,
    editSchema: commonEditFormSchema
  },
  'input': {
    def: { type: 'string', title: 'Input' },
    edit: false,
    editSchema: commonEditFormSchema
  },

  'checkbox': {
    def: { type: 'boolean', title: 'Checkbox', default: false },
    edit: false,
    editSchema: checkboxEditFormSchema
  },

  'radio': {
    def: { type: 'boolean', title: 'Radio', default: false },
    ui: { 'ui:widget': 'radio' },
    edit: false,
    editSchema: commonEditFormSchema
  },
  'textarea': {
    def: { type: 'string', title: 'Textarea' },
    ui: { 'ui:widget': 'textarea' },
    edit: false,
    editSchema: commonEditFormSchema
  },
  'date': {
    def: { type: 'string', title: 'Date', format: 'date' },
    edit: false,
    editSchema: commonEditFormSchema
  },
  'email': {
    def: { type: 'string', title: 'Email', format: 'email' },
    edit: false,
    editSchema: commonEditFormSchema
  },
  'uri': {
    def: { type: 'string', title: 'Uri', format: 'uri' },
    edit: false,
    editSchema: commonEditFormSchema
  },
  'wysiwyg': {
    def: { type: 'string', title: 'Wysiwyg' },
    ui: {
      'ui:widget': 'wysiwyg'
    },
    widget: { 'wysiwyg': 'widgetLoader::wysiwyg' },
    edit: false,
    editSchema: commonEditFormSchema
  },
  'dateTime': {
    def: { type: 'string', title: 'Date Time', format: 'LT ddd DD/MM/YYYY' },
    ui: {
      'ui:widget': 'dateTime'
    },
    widget: { 'dateTime': 'widgetLoader::dateTime' },
    edit: false,
    editSchema: commonEditFormSchema
  },
  'paymentStatus': {
    def: {
      type: 'string',
      title: ' ',
      default: {
        total: 0,
        balance: 0,
        paymentStatus: '',
        purchase: false
      }
    },
    ui: {
      'ui:widget': 'paymentStatus'
    },
    widget: { 'paymentStatus': 'widgetLoader::paymentStatus' },
    edit: false
  }
}

const DEFAULT_FORM = {
  'schema': {
    'title': 'A registration form',
    'type': 'object'
  },
  'ui': {},
  'widgets': {}
}

export default elements
