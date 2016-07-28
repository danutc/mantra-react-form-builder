import React from 'react';
import DateTimeField from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';

class DateTime extends React.Component {
  constructor(props) {
    super(props);
    const {description, value, defaultValue, required, format, onChange} = props;
    this.state = {
      datetime: defaultValue || moment().format(this.props.format)
    };

    this.onChange = (dateObject) => {
      let datetime = dateObject.format(this.props.format);
      this.setState({ datetime });
      onChange({ datetime });
    };

    this.onChange.bind(this);
  }

  render() {

    return <DateTimeField
      onChange={this.onChange}
      dateFormat={this.props.format.replace('LT ', '')}
      defaultValue={this.state.datetime}
    />;
  }
}

export default DateTime;
