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
    var {form} = this.props;
    var {schema, ui, widgets, validation, onChange, onError} = form;

    console.log('before rendering'); 
      console.log(JSON.stringify(schema));

    var validateFn = eval(validation) || ((data, errors) => {console.log(data);});
    var onChangeFn = eval(onChange) || ((data) => console.log(data));
    var onErrorFn = eval(onError) || ((errors) => console.log(errors));

    return (
      <div>
        <Form schema={schema}
          onSubmit={(form) => { console.log(form); } }
          uiSchema={ui}
          widgets={widgets}
          validate={validateFn}
          onChange={onChangeFn}
          onError={onErrorFn}
          />
      </div>
    );
  }
}

export default FormPreviewTab;
