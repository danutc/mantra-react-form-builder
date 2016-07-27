import React from 'react';
import DateTimeField from 'react-bootstrap-datetimepicker';
import moment from 'moment';
import 'react-bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css';

class DateTime extends React.Component {
  constructor(props) {
    super(props);
    const {description, value, defaultValue, required, format} = props;
    this.format = format;
    this.state = {
      datetime: defaultValue || ''
    };

    this.onChange = (seconds) => {
      let {onChange} = this.props;
      let datetime = moment(new Date(parseInt(seconds, 10))).format(this.format);
      this.setState({ datetime }, () => onChange(this.state));
    };

    this.onChange.bind(this);
  }

  render() {
    return <DateTimeField
      onChange={this.onChange}
      defaultText={this.state.datetime}
      inputFormat={this.format}
      defaultText={this.format}
    />;
  }
}

export default DateTime;
