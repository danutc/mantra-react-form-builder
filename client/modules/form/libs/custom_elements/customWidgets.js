import assert from 'assert'
import React from 'react'
import Label from './label';
import Wysiwyg from './wysiwyg'
import DateTime from './dateTime'
import PaymentStatus from './paymentStatus';

let Array = (props) => {
  const {value} = props;
  return React.createElement(Label, {
    value: value
  })
}

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
      const {balance, total, paymentStatus, purchase} = state;
      return _onChange({balance, total, paymentStatus, purchase});
    }
  })
};

let DateTimeWidget = (props) => {
  const {description, value, defaultValue, required} = props;
  const format = props.schema.format;
  const _onChange = props.onChange;

  return React.createElement(DateTime, {
    onChange: function onChange (state) {
      return _onChange(state.datetime);
    },
    value,
    required,
    placeholder: description,
    defaultValue,
    format
  })
}

const widgetsMap = {
  'wysiwyg': WysiwygWidget,
  'paymentStatus': PaymentStatusWidget,
  'dateTime': DateTimeWidget,
  'array': Array
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
