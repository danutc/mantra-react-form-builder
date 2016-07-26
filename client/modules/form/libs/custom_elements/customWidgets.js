import assert from 'assert'
import React from 'react'
import Wysiwyg from './wysiwyg'

let WysiwygWidget = (props) => {
  const {description, value, defaultValue, required, onChange} = props

  return React.createElement(Wysiwyg, {
    onChange: function onChange (editorState) {
      console.log(editorState.getCurrentContent().getPlainText())
    },
    value: 'test',
    required: required,
    placeholder: description,
    defaultValue: defaultValue
  })
}

const widgetsMap = {
  'wysiwyg': WysiwygWidget
}

export default function deepSchemaLookup (inputSchema) {
  assert(typeof inputSchema === 'object', 'inputSchema should be an object')

  Object.keys(inputSchema).forEach((value) => {
    let node = inputSchema[value]
    if (typeof node === 'object') {
      inputSchema[value] = deepSchemaLookup(node)
    } else if (typeof node === 'string'
      && node.indexOf('widgetLoader::') !== -1
      && widgetsMap.hasOwnProperty(node.replace('widgetLoader::', ''))
    ) {
      inputSchema[value] = widgetsMap[node.replace('widgetLoader::', '')]
    }
  })

  return inputSchema
}
