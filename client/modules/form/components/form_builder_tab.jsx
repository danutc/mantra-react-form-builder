import React from 'react';
import FormEditableField from '../containers/form_editable_field.js';

class FormBuilderTab extends React.Component {
  constructor(props) {
    super(props);
  }

  renderEditableField() {
    if (this.props.formFields) {
      return _.map(this.props.formFields, function (value, id) {
        if (typeof value.ui === 'object'
          && value.ui['ui:widget']
          && typeof value.widget === 'object') {
          value.ui['ui:widget'] = value.widget[value.ui['ui:widget']];
        }
        return (
          <FormEditableField key={id} id={id} uiSchema={value['ui']}
            schema={value['def']} edit={value['edit']} editSchema={value['editSchema']}
            />
        );

      });
    } else {
      return null;
    }
  }

  render() {
    return (
      <div>
        {this.renderEditableField() }
      </div>
    );
  }
}

export default FormBuilderTab;
