import React from 'react';
import FormTextEditor from '../containers/form_text_editor.js';

var onChangeSnippets = 'function onChange(data) {\n\tconsole.log(data);\n}\n';

class FormChangeTab extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var {onChange} = this.props;

    return (
      <div>
        <FormTextEditor id="form-change-editor" defaultValue={onChangeSnippets} type="onChange" onChange={onChange} />
      </div>
    );
  }
}

export default FormChangeTab;
