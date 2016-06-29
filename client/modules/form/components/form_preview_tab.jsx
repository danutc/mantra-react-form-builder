import React from 'react';
import Form from "react-jsonschema-form";

//--------------------------------------------------------------------------------
// Preview tab component
//--------------------------------------------------------------------------------
class FormPreviewTab extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var {schema, ui, widgets, validation, onChange, onError} = this.props;

    var validateFn = eval(validation) || console.log;
    var onChangeFn = eval(onChange) || console.log;
    var onErrorFn = eval(onError) || console.log;

    return (
      <div>
        <Form schema={schema}
          onSubmit={(form) => { console.log(form); } }
          uiSchema={ui}
          widgets={widgets}
          validate={(formData, errors) => { validateFn(formData, errors); } }
          onChange={(value) => { onChangeFn(value); } }
          />
      </div>
    );
  }
}

export default FormPreviewTab;
