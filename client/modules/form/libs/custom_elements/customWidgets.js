import assert from 'assert';
import React from 'react';
import Wysiwyg from './wysiwyg';
import PaymentStatus from './paymentStatus';

let WysiwygWidget = (props) => {
  const {description, value, defaultValue, required} = props;
  const _onChange = props.onChange;

  return React.createElement(Wysiwyg, {
    onChange: function onChange (editorState) {
      return _onChange(editorState.getCurrentContent().getPlainText());
    },
    value: 'test',
    required: required,
    placeholder: description,
    defaultValue: defaultValue
  })
}

let PaymentStatusWidget = (props) => {
    const _onChange = props.onChange;

    return React.createElement(PaymentStatus, {
        onChange(state) {
          const {balance, total, result, purchase} = state;
          return _onChange({balance, total, result, purchase});
        }
    })
};

const widgetsMap = {
    'wysiwyg': WysiwygWidget,
    'paymentStatus': PaymentStatusWidget
};

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
