import React from 'react';

export default class Label extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { value } = this.props;
    return (
      <h2 className="label-array">
        { value }
      </h2>
    )
  }
} 