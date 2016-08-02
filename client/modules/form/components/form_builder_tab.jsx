import React from 'react';
import FormEditableField from '../containers/form_editable_field.js';
import ReactDOM from 'react-dom';

class FormBuilderTab extends React.Component {
  constructor(props) {
    super(props);
    this._keyPressDetect = this._keyPressDetect.bind(this);
    this.renderNested = this.renderNested.bind(this);
  }

  renderNested(formFields) {
    let _this = this;
    if (formFields) {
      return _.map(formFields, function (value, id) {
        if (value && typeof value.ui === 'object'
          && value.ui['ui:widget']
          && typeof value.widget === 'object') {
          value.ui['ui:widget'] = value.widget[value.ui['ui:widget']];
        }

        if (id.indexOf('FAKE_ELEMENT_') == -1) {

          let ext = value['def']['ext']
          return (
            <FormEditableField key={id} name={id} ext={ext} id={id} uiSchema={value['ui']}
              schema={value['def']} edit={value['edit']} editSchema={value['editSchema']}
              />
          );
        }
      });
    } else {
      return null;
    }
  }

  renderEditableField() {
    let {formFields} = this.props
    return this.renderNested(formFields)
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.playground).onkeydown = this._keyPressDetect;
  }

  _keyPressDetect(event) {

    let { changeOrder } = this.props;

    if (event.keyCode == 38) {
      changeOrder(-1)
    } else if (event.keyCode == 40) {
      changeOrder(1)
    }
  }

  render() {
    return (
      <div ref="playground">
        {this.renderEditableField() }
      </div>
    );
  }
}

export default FormBuilderTab;
