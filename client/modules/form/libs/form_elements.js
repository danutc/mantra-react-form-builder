import React from 'react'
import deepmerge from 'deepmerge';

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
    hint: { type: 'string', title: 'Hint' }
  }
};

var checkboxEditFormSchema = deepmerge(commonEditFormSchema, {
  properties: {
    checked: { type: 'boolean', 'title': 'Checked by default'},
    defaultValue: undefined,
    placeHolder: undefined,
    hint: undefined
  }
});

// --------------------------------------------------------------------------------
// Element Definition
// --------------------------------------------------------------------------------
const elements = {
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
  'datetime': {
    def: { type: 'string', title: 'Date Time', format: 'date-time' },
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
  'paymentStatus': {
    def: { type: 'string', title: ' ', default: {
      total: 0,
      balance: 0,
      result: '',
      purchase: false}
    },
    ui: {
      'ui:widget': 'paymentStatus'
    },
    widget: { 'paymentStatus': 'widgetLoader::paymentStatus' },
    edit: false
  }
}

export default elements
